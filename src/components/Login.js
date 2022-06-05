import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { setWithExpiry } from "../helper/utils";
import loginImg from '../usingImages/loginImg.svg';
import Cookies from 'js-cookie';
import { defaultAPI } from "../api/api";

// import React, { useState, useEffect } from "react";

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogged, setKeepLogged] = useState(false);
  if (user) return <Navigate to="/" />;
  // const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    let item = { email, password };
    let result = await fetch(
      `${defaultAPI.api.authUrl}/identity/sessions`,

      {
        method: "POST",
        withCredentials: 'true',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    result = await result.json();
    // console.log({ result });
    if (result?.errors)
      return toast.error("Authentication failed", {
        position: "top-center",
      });
    console.log("result", result);
    if (keepLogged) setWithExpiry("user-info", result, 86400000);
    //  localStorage.setItem("user-info", JSON.stringify(result));
    // Cookies.set('_barong_session', '4af227c8260cca0fc50de31800798b88', { expires: 7, httpOnly: true });
    Cookies.set('_barong_session', '4af227c8260cca0fc50de31800798b88', { expires: 7 });

    setUser(result);
    // navigate('/product');
  }
  return (


    <div className="container">





      <div className="row resgister-div">


        <div className="col-sm-6 offset-sm-3 ">
          <ToastContainer />
          <div className="card card-sign">
            <div className="row">
              <div className="col-md-6">

                <img src={loginImg} alt="" className="loginImg" />

              </div>
              <div className="col-md-6">




                <br />

                <form action="" className="login-form" onSubmit={onSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                  <br />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                  <br />
                  <input
                    checked={keepLogged}
                    onChange={(e) => setKeepLogged(e.target.checked)}
                    type="checkbox"
                  />{" "}
                  <span style={{ marginLeft: "10px", color: "black" }}>
                    Keep me logged in
                  </span>
                  <br />
                  <br />

                  <div className="btn-group">

                    <input type="submit" value="Login" className="btn btn-sign" />
                    &nbsp;&nbsp;&nbsp;  <span>or</span> &nbsp;&nbsp;&nbsp;

                    <Link
                      to="/register"
                      className="btn btn-light"
                      aria-current="page"
                    >
                      SIGN UP
                    </Link>
                    {/* <Link to="/login" className="btn btn-group-top-log "> */}
                    {/* <Link to="/login" className="btn btn-primary">

                  SIGN IN
                </Link> */}



                  </div>
                  {/* <button onClick={(e) => onSubmit(e)} className="btn btn-sign">
            Login
          </button> */}
                </form>
              </div>


            </div>

          </div>
        </div>

      </div>


    </div>


  );
};

export default Login;
