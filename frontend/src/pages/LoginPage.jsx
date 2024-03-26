import "./styles/LoginPage.scss";
import heart1 from "../img/heart.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ email: "", password: "" });
        navigate("/room");
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="__login-main">
      <div className="__banner-login">
        <h2>ChatVibes</h2>
        <img src={heart1} alt="" height={150} width={200} />
      </div>

      <div className="__login-form-container">
        <div className="__login-form">
          <div className="__login-header">
            <p>Login</p>
          </div>
          <div className="__login-section">
            <form onSubmit={(e) => loginUser(e)}>
              <div className=" mb-3">
                <label className="mb-1">email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="form-control"
                  placeholder="Enter your Email"
                />
              </div>
              <div className=" mb-3">
                <label htmlFor="" className="mb-1">
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="form-control"
                  placeholder="Enter your Password"
                />
                <span className=" text-danger"></span>
              </div>

              <button type="submit" className="btn btn-primary form-control">
                Login
              </button>
            </form>
          </div>
          <div className="__login-footer pt-2">
            <Link className=" text-decoration-none">Forgot password? </Link>
            <hr />
            <p>Don't have an account? </p>
            <Link to="/register">
              <button type="submit" className="__btn btn btn-success">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
