import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import ProfilePage from "./components/dashboard/ProfilePage";
import Trade from "./components/dashboard/Trade";
import Balance from "./components/dashboard/Balance";
import VerifyEmail from "./components/VerifyEmail";
import { useCallback, useEffect, useState } from "react";
import { getWithExpiry } from "./helper/utils";
import Market from "./components/dashboard/Market";
import Portfolio from "./components/portfolio/Portfolio";
import Overview from "./components/portfolio/PortfolioItems/Overview";

function App() {
  const [user, setUser] = useState();
  const value = getWithExpiry("user-info");
  // console.log({ value });
  const loadUser = useCallback(() => {
    setUser(value);
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      {/* <Navbar setUser={setUser} user={user} /> */}
      <Routes>
        <Route
          exact
          path="/"
          element={<ProfilePage user={user} setUser={setUser} />}
        />
        <Route path="trade" element={<Trade user={user} setUser={setUser} />} />
        <Route
          path="market"
          element={<Market user={user} setUser={setUser} />}
        />
        <Route
          path="balance"
          element={<Balance user={user} setUser={setUser} />}
        />
        <Route path="register" element={<Register user={user} />} />
        <Route path="login" element={<Login user={user} setUser={setUser} />} />
        <Route
          path="email-verification"
          element={<VerifyEmail user={user} />}
        />
        <Route
          path="email-verification"
          element={<VerifyEmail user={user} />}
        />
        <Route path="/portfolio/" element={<Portfolio />} />
        <Route path="/overview/" element={<Overview />} />
      </Routes>
    </div>
  );
}

export default App;
