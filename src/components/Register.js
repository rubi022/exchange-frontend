import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  if (user) return <Navigate to="/" />;

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
      let result = await fetch(
        "https://cp.btfd.cc/api/v2/barong/identity/users",

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
        const data = await result.json();

        localStorage.setItem("user-info", JSON.stringify(data));
        navigate("/email-verification");
      }
    }
  };

  return (
    <div className="col-sm-6 offset-sm-3 resgister-div">
      <div className="card card-sign">

        <div class="card-header">

          <div className="row">
            <div className="col-md-6 card-top-link">
              <Link
                to="/register"
                className="card-header-sign-link"
                aria-current="page"
              >
                SIGN UP{" "}
              </Link>
            </div>

            <div className="col-md-6 card-top-link">
              <Link to="/login" className="card-header-sign-link ">
                SIGN IN
              </Link>
            </div>
          </div>


        </div>
        <br />

        <form action="" className="register-form" onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Email"
          />
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Password"
          />
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control form-control-lg"
            placeholder="Confirm Password"
          />
          <br />

          {/* <button  onClick={signUp} className="btn btn-sign">Sign Up</button> */}

          <input type="submit" value="Sign Up" className="btn btn-sign" />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
