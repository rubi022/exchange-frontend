import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { setWithExpiry } from "../helper/utils";
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
      "https://cp.btfd.cc/api/v2/barong/identity/sessions",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    result = await result.json();
    console.log({ result });
    if (result?.errors)
      return toast.error("Authentication failed", {
        position: "top-center",
      });
    console.log("result", result);
    if (keepLogged) setWithExpiry("user-info", result, 86400000);
    //  localStorage.setItem("user-info", JSON.stringify(result));

    setUser(result);
    // navigate('/product');
  }
  return (
    <div className="col-sm-6 offset-sm-3 resgister-div">
      <ToastContainer />
      <div className="card card-sign">

        <div class="card-header">

          <div className="row">
            <div className="col-md-6 card-top-link">
              <Link
                to="/register"
                className="card-header-sign-link"
                aria-current="page"
              >
                SIGN UP
              </Link>
            </div>

            <div className="col-md-6 card-top-link">
              <Link to="/login" className="card-header-sign-link ">
                SIGN IN
              </Link>
            </div>
          </div>

          {/* <div className="btn-group btn-full-width-top-register-div">
        
        
          </div> */}
        </div>

        <br />

        <form action="" className="login-form" onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Email"
            required
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Password"
            required
          />
          <br />
          <input
            checked={keepLogged}
            onChange={(e) => setKeepLogged(e.target.checked)}
            type="checkbox"
          />{" "}
          <span style={{ marginLeft: "10px", color: "black", fontWeight: "bold" }}>
            Keep me logged in
          </span>
          <br />
          <br />
          {/* <button onClick={(e) => onSubmit(e)} className="btn btn-sign">
            Login
          </button> */}
          <input type="submit" value="Login" className="btn btn-sign" />
        </form>
      </div>
    </div>
  );
};

export default Login;
