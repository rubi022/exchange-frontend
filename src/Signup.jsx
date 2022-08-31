import React from 'react';
import { ToastContainer } from 'react-toastify';

function Signup() {
  return (
    <div className="body">
    <ToastContainer />
    <div className="text-center">
      <main class="form-signin w-100 m-auto">
        <form>
          {/* <img class="mb-4" src="" alt="" width="72" height="57" /> */}
          <h2 class="h3 mb-3 fw-normal" style={{ color: "white" }}>
            Please sign up
          </h2>

          <div class="form-floating">
            <input
              type="email"
              name="email"
              class="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
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
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              name="refid"
              class="form-control"
              id="refid"
              placeholder="Ref ID"
            />
            <label for="floatingPassword">Refferal Code</label>
          </div>

          <div class="checkbox mb-3">
            <label style={{ color: "white" }}>
              I have read and agree to coins.st{" "}
              <a href="/"> Terms of Service</a> and{" "}
              <a href="/">Privacy Policy</a>.
            </label>
          </div>
          <button
            class="w-100 btn btn-lg btn-primary btnnn"
            type="button"
            style={{ textTransformation: "Capatalize" }}
          >
            Create Account
          </button>
          <p class="mt-5 mb-3 text-muted">
            <h1
              class="h3 mb-3 fw-normal"
              style={{ fontWeight: "bold !important", fontSize: "61.8px" }}
            >
              coins.st
            </h1>
            &copy; 2017–2022
          </p>
        </form>
      </main>
    </div>
  </div>
  );
}

export default Signup;
