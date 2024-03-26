const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken');



const test = (req, res) => {
    res.json('test is working')
}


//register end point
const registerUser = async(request, response) => {
    try {
        const {name, email, password} = request.body;
        //check if name was entered
        if(!name)
        {
            return response.json({error:'name is required'})
        }
        //check if password is good
        if(!password || password.length < 6)
        {
            return response.json({error:'Password is required and should be at least 6 characters long'})
        }
        //check email
        const exist = await User.findOne({email})
        if(exist)
        {
            return response.json({error:'email is taken already'})
        }

        //hashed password
        const hashedPassword = await hashPassword(password)


        const user = await User.create({
            name, email, password:hashedPassword,
        })

        return response.json(user)



    
        
    } catch (error) {
        console.log(error)
        
    }

}

//login end point
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Corrected 'request' to 'req'
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: "No user found" }); // Corrected 'response' to 'res'
        }
        
        // Check if password matches
        const match = await comparePassword(password, user.password);
        if (match) {
            // Generate and send a JWT token for successful login
            const accessToken = jwt.sign({email:email},"jwt-access-token-secret-key", {expiresIn:'1m'})
            const refreshToken = jwt.sign({email:email},"jwt-refresh-token-secret-key", {expiresIn:'5m'})
            res.cookie('accessToken', accessToken,{maxAge:60000})

            res.cookie('refreshToken', refreshToken,{maxAge:300000, httpOnly:true, secure:true, sameSite:'strict'})
            res.json("Login Sucessful") 
            
        } else {
            return res.json({ error: "Passwords don't match" });
        }
    } catch (error) {
        console.error(error);
        return res.json({ error: "Server error" });
    }
};

const verifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
       if(renewToken(req, res)){
            next()
       }
    }else{
        jwt.verify(accessToken, 'jwt-access-token-secret-key', (err,decoded) => {
            if(err) {
                return res.json({valid:false, message:"Invalid Token"})
            } else {
                req.email = decoded.email
                next()
            }
        })
    }
}

const renewToken = (req, res) => {
    const refreshToken =  req.cookies.refreshToken;
    let exist = false;
    if(!refreshToken){
        return res.json({valid:false, message:"No refresh token"})
    }else{
        jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err,decoded) => {
            if(err) {
                return res.json({valid:false, message:"Invalid refresh Token"})
            } else {

                const accessToken = jwt.sign({email:decoded.email},"jwt-access-token-secret-key", {expiresIn:'1m'})
                res.cookie('accessToken', accessToken,{maxAge:60000})
                exist = true;

                
               
            }
        })
    }
    return exist
    
}

const getProfile = (request, response) => {
    const {token} =  request.cookies
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) =>  {
            if (err) throw err;
            response.json(user)
        })
    }
    else
    {
        response.json(null)
    }
}

const logoutUser = (request, response) => {
    response.clearCookie('token').json({ message: "Logout successful" });
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser

}