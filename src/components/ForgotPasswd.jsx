import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import loginImg from "../usingImages/loginImg.svg";
import { Link } from "react-router-dom";
import { defaultAPI } from "../api/api";

function ForgotPasswd({ user }) {
  if (user) return <Navigate to="/" />;

    const emailRef = useRef();

  return (
    <div>
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
                  <strong>Forgot password</strong>

                  <br />
                  <br />
                  <form action="" className="login-form">
                    <label htmlFor="emailTb">Enter your email</label>
                    <input
                    ref={emailRef}
                      id="emailTb"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                    <br />

                    <br />

                    <div className="btn-group">
                      
                      <button type="button" className="btn btn-sign" onClick={() => {
                          const email =emailRef.current.value;
                          if(emailRef.current.value !="")
                          fetch(`${defaultAPI.api.authUrl}/identity/users/password/generate_code`, {
                              method: "POST",
                              headers:{
                                  "Content-Type": "application/json",
                                  Accept: "application/json"
                              },
                              body: JSON.stringify(email)
                          }).then(
                              toast.success("Done!", {
                                  position: "top-center"
                              })
                          ).catch((err)=>{
                            toast.error("Done!", {
                                position: "top-center"
                            })
                          })
                      }}>
                        Forgot Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswd;
