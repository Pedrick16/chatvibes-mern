
import { Link } from 'react-router-dom'
import heart1 from '../img/heart.png'
import './styles/RegisterPage.scss'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



const RegisterPage = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })



    const registerUser = async(e) => {
        e.preventDefault()
        const {name, email, password, password2} = data

        try {
            const { data } = await axios.post('/register',{
                name, email, password
            })

            if(password != password2)
            {
                toast.error('password did not match')
              
            }else{
                if(data.error)
                {
                    toast.error(data.error)
                }
                else
                {
                    setData({})
                    toast.success('Login successful. Welcome!')
                    navigate('/')
                }

            }
           

           

        } catch (error) {
            console.log(error)
        }


    }
 

 

  return (
    <div className='__register-main'>
        <div className="__banner-register">
            <h2>ChatVibes</h2>
            <img src={heart1} alt="" height={150} width={200} />
            
        </div>

        <div className="__register-form-container">
            <div className="__register-form">

                <div className="__register-header">
                    <p>Register</p>
                    

                </div>
                <div className="__register-section">
                    <form onSubmit={registerUser} >
                    <div className=" mb-3">
                            <label className='mb-1'>Name</label>
                            <input type="text" name="name"  onChange={(e) => setData({...data, name:e.target.value})}   className='form-control' placeholder='Enter your Name' required/>
                        </div>
                        <div className=" mb-3">
                            <label className='mb-1'>Email</label>
                            <input type="email" name="email"  onChange={(e) => setData({...data, email:e.target.value})}   className='form-control' placeholder='Enter your Email' required/>
                        </div>
                        <div className=" mb-3">
                            <label htmlFor="" className='mb-1'>Password</label>
                            <input type="password" name="password" onChange={(e) => setData({...data, password:e.target.value})}  className='form-control' placeholder='Enter your Password' required/>
                        </div>
                        <div className=" mb-3">
                            <label htmlFor="" className='mb-1'>Confirm Password</label>
                            <input type="password" name="password2"  onChange={(e) => setData({...data, password2:e.target.value})}  className='form-control' placeholder='Enter your Confirm Password' required/>
                            <span className=' text-danger'></span>
                        </div>

                        <button type='submit' className='btn btn-primary form-control'>Register</button>



                    </form>
                </div>
                <div className="__register-footer pt-2">
                
                    <hr />
                    <p>Already have an account? Login <Link to="/">here</Link></p>
                    
                </div>

            </div>
        </div>


    </div>

 
  )
}

export default RegisterPage