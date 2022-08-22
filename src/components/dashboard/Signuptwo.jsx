import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { defaultAPI } from "../../api/api";
import "./css/Sign.css";

function Signuptwo() {
  //States
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [refid, setRefid] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    let items = { email, password };
    let username;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email || !password) {
      toast("Oops! you missed a field", { position: "top-center" });
    } else if (!regex.test(items.email)) {
      toast.warn("This is not a valid email!", { position: "top-center" });
    } else {
      username = "";
      let id = uuidv4();
      let refids = "ID" + id.slice(0, 8);
      refids = refids.toUpperCase();
      setRefid(refids);
      items = { email, password, username, refid };
    }
    let result;
    if(refid != ""){
    result = await fetch(
      `${defaultAPI.api.authUrl}/identity/users?email=${email}&password=${password}&refid=${refid}`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  }else{
    result = await fetch(
      `${defaultAPI.api.authUrl}/identity/users?email=${email}&password=${password}`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  }
    if (!result.ok) {
      result = await result.json();
      let errorMessage = "";

      if (result.errors[0] === "password.requirements") {
        errorMessage = "Password requirements not matched!";
      } else if (result.errors[0] === "email.taken") {
        errorMessage = "Email is taken!";
      } else if(result.errors[0]==="identity.user.invalid_referral_format" || result.errors[0]==="identity.user.referral_doesnt_exist"){
        errorMessage = "Please enter a valid refferal code!"
      }
      if (errorMessage != "")
        toast.warn(`${errorMessage}`, { position: "top-center" });
    } else {
      toast.success("Registered! Please login", { position: "top-center" });

      const data = await result.json();

      localStorage.setItem("user-info", JSON.stringify(data));
    }
  };

  return (
    <div className="body">
      <ToastContainer />
      <div className="text-center">
        <main class="form-signin w-100 m-auto">
          <form>
            {/* <img class="mb-4" src="" alt="" width="72" height="57" /> */}
            <h2 class="h3 mb-3 fw-normal" >
              Please sign up
            </h2>

            <div class="form-floating">
              <input
                type="email"
                name="email"
                class="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="floatingEmail">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                name="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating">
              <input
                type="hidden"
                name="refid"
                class="form-control"
                id="refid"
                placeholder="Ref ID"
                onChange={(e) => setRefid(e.target.value)}
              />
              <label for="floatingPassword"></label>
            </div>

            <div class="checkbox mb-3">
              <label >
                I have read and agree to coins.st{" "}
                <a href="#"> Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </label>
            </div>
            <button
              class="w-100 btn btn-lg btn-primary btnnn"
              type="button"
              onClick={registerUser}
              style={{ textTransformation: "Capatalize" }}
            >
              Create Account
            </button>
            <p class="mt-5 mb-3 text-muted">
              <h1
                class="h3 mb-3 fw-normal"
                style={{ fontWeight: "bold !important", fontSize: "61.8px", color: "#212529" }}
              >
                coins.st
              </h1>
              &copy; 2017–2022 © {this.getYear()}
            </p>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Signuptwo;
