import { Link, Navigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { setWithExpiry } from "../helper/utils";
import loginImg from "../usingImages/loginImg.svg";
import Cookies from "js-cookie";
import { defaultAPI } from "../api/api";

// import React, { useState, useEffect } from "react";

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const otp = useRef();
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
        withCredentials: "true",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      } 
    );

    result = await result.json();
    console.log(result.errors);
    // console.log({ result });
    if (result?.errors) {
      if (result.errors == "identity.session.missing_otp") {
        setIsOtp(true);
        return toast.warning("Enter 2FA code", {
          position: "top-center",
        });
      } else {
        return toast.error("Authentication failed", {
          position: "top-center",
        });
      }
    }

    // console.log("result", result);
    if (keepLogged) setWithExpiry("user-info", result, 86400000);
    //  localStorage.setItem("user-info", JSON.stringify(result));
    // Cookies.set('_barong_session', '4af227c8260cca0fc50de31800798b88', { expires: 7, httpOnly: true });
    Cookies.set("_barong_session", result["csrf_token"], {
      expires: 7,
    });
    // Cookies.set("_barong_session", "4af227c8260cca0fc50de31800798b88", {
    //   expires: 7,
    // });
    console.log(result["csrf_token"])
    setUser(result);
    // navigate('/product');
  }
  async function authUsingOtp(emaill, passwordd, otpp){
    let data = {emaill, passwordd, otpp};
    let result = await fetch(
      `${defaultAPI.api.authUrl}/identity/sessions?email=${emaill}&password=${passwordd}&otp_code=${otpp}`,
      {
        method: "POST",
        withCredentials: "true",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }
    );
    result = await result.json();
    if (
      result.errors == "identity.session.invalid_otp" ||
      result.errors == "totp.error"
    ) {
      toast.error("Authentication failed", {
        position: "top-center",
      });
      return;
    }

    if (keepLogged) setWithExpiry("user-info", result, 86400000);

    Cookies.set("_barong_session", result["csrf_token"], {
      expires: 7,
    });

    
    setUser(result);
    return <Navigate to="/" />;
  };
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
                  <label forHTML="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    // placeholder="Email"
                    required
                  />
                  <br />
                  <label forHTML="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    // placeholder="Password"
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
                  {isOtp ? (
                    <div>
                      <br />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="2FA code"
                        ref={otp}
                        required
                      />
                      <br />
                      <button
                        type="button"
                        className="btn btn-sign"
                        onClick={() => {
                          authUsingOtp(email, password, otp.current.value);
                          
                        }}
                      >
                        Login
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Link to="/forgot_password">Forgot Password?</Link>
                      <div className="btn-group">
                        <br />
                        <input
                          type="submit"
                          value="Login"
                          className="btn btn-sign"
                        />
                        &nbsp;&nbsp;&nbsp; <span>or</span> &nbsp;&nbsp;&nbsp;
                        <Link
                          to="/register"
                          className="btn btn-light"
                          aria-current="page"
                        >
                          SIGN UP
                        </Link>
                      </div>
                    </div>
                  )}
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
