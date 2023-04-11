import React, { useState } from "react";

//unique id generator
import { v4 as uuidv4 } from "uuid";

// import { Navigate, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerImg from "../usingImages/registerImg.svg";
import { defaultAPI } from "../api/api";

const Register = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [refid, setRefid] = useState("");

  // const navigate = useNavigate();
  // if (user) return <Navigate to="/" />;

  // const [formErrors, setFormErrors] = useState({})

  const onSubmit = async (e) => {
    e.preventDefault();

    let item = { email, password, confirmPassword };
    // console.log(item)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!item.email || !item.password || !item.confirmPassword) {
      toast("Oops! You misssed a field!", { position: "top-center" });
    } else if (!regex.test(item.email)) {
      toast.warn("This is not a valid email!", { position: "top-center" });
    } else if (item.password !== item.confirmPassword) {
      toast.warn("Password didn't match!", { position: "top-center" });
    } else {
      const lang = "EN";
      let username = "";
      let id = uuidv4();
      let refids = "ID" + id.slice(0, 8);
      refids = refids.toUpperCase();
      setRefid(refids)
      item = { username, email, password, refid, lang };
      // console.log(item)

      let result = await fetch(
        `${defaultAPI.api.authUrl}/identity/users`,

        {
          method: "POST", 
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!result.ok) {
        result = await result.json();
        let errorMessage = "";

        if (result.errors[0] === "password.requirements") {
          errorMessage = "Password requirements not matched!";
        } else if (result.errors[0] === "email.taken") {
          errorMessage = "Email is taken!";
        }

        toast.warn(`${errorMessage}`, { position: "top-center" });
      } else {
        toast.success("Registered! Please login", { position: "top-center" });

        const data = await result.json();

        localStorage.setItem("user-info", JSON.stringify(data));
        // navigate("/email-verification");
      }
    }
  };

  return (
    <div className="container">
      <div className="row resgister-div">
        <div className="col-sm-6 offset-sm-3">
          <div className="card card-sign">
            <div className="row">
              <div className="col-md-6" style={{display:"flex ", backgroundColor:"#E6E6E6"}}>
                <img src={registerImg} alt="" className="loginImg" style={{display:"flex",alignSelf:"center"}}/>
              </div>

              <div className="col-md-6">
                <br />
                <h4 className="font-weight-bold text-primary">Create An Account</h4>

                <br />

                <form action="" className="register-form" onSubmit={onSubmit}>
                  <label forHTML="email"><strong>Email</strong></label>
                  <input
                 style={{backgroundColor:"#F2F2F2",border:"none"}}
                    type="email"
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control "
                    // placeholder="Email"
                  />
                  <br />

                  <label forHTML="password"><strong>Password</strong></label>
                  <input
                  style={{backgroundColor:"#F2F2F2",border:"none"}}
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    // placeholder="Password"
                  />
                  <br />

                  <label forHTML="conpassword"><strong>Confirm Password</strong></label>
                  <input
                  style={{backgroundColor:"#F2F2F2",border:"none"}}
                    id="conpassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                    // placeholder="Confirm Password"
                  />
                        <input
                    value={refid}
                    type="hidden"
                  />

                  {/* <br /> */}
                  <div className="contariner " style={{ marginTop: "1rem" }}>
                    <input
                      // style={{marginTop:"1rem"}}
                      value="true"
                      checked="checked"
                      // checked={keepLogged}
                      // onChange={(e) => setKeepLogged(e.target.checked)}
                      type="checkbox"
                    />{" "}
                    <span style={{ marginLeft: "10px", color: "black" }}>
                   <strong>
                   I have read <Link to="/terms">terms</Link> and{" "}
                      <Link to="/policy">policy</Link>
                   </strong>
                    </span>
                  </div>

                  {/* <button  onClick={signUp} className="btn btn-sign">Sign Up</button> */}

                  <br />
                  {/* <div className="btn"> */}
                  {/* <Link
                    to="/register"
                    className="btn btn-group-top-reg active"
                    aria-current="page"
                  >
                    SIGN UP{" "}
                  </Link> */}
                  <div class="d-grid gap-2">
                  <button
                    type="submit"
                    value="Sign Up"
                    className="btn btn-primary"
                  >
                    Sign Up
                  </button>
                 
                  </div>
              
                  <br />
                  {/* <input type="submit" value="Sign Up" className="btn btn-primary" /> */}

                  {/* </div> */}
                  {/* &nbsp;&nbsp;&nbsp; <span>or</span>  &nbsp;&nbsp;&nbsp; */}
                  <strong>Have a account?</strong>
                  <Link to="/login" >
                  {' '} <strong>  SIGN IN</strong>
                  </Link>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
