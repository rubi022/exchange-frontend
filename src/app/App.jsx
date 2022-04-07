import '../fake-db'
import React from 'react'
// import { Store } from './redux/Store'
// import { Provider } from 'react-redux'
// import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
// import { useRoutes } from 'react-router-dom'
// import { AuthProvider } from 'app/contexts/JWTAuthContext'
// import { SettingsProvider } from 'app/contexts/SettingsContext'
import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Register from "./components/Register";

// import Login from "./components/Login";
import JwtLogin from "../app/views/sessions/login/JwtLogin";
import JWTRegister from "../app/views/sessions/register/JwtRegister";
import Analytics from "../app/views/dashboard/Analytics";

// import LandingPage from "./components/LandingPage";
// import VerifyEmail from "./components/VerifyEmail";
import { useCallback, useEffect, useState } from "react";
import { getWithExpiry } from "../../src/app/utils/setExpiry";

const App = () => {

    const [user, setUser] = useState();
    const value = getWithExpiry("user-info");
    console.log({ value });
    const loadUser = useCallback(() => {
      setUser(value);
    }, []);
  
    useEffect(() => {
      loadUser();
    }, []);
  
    // const all_pages = useRoutes(AllPages())

    return (
        // <Provider store={Store}>
        //     <SettingsProvider>
        //         <MatxTheme>
        //             <AuthProvider>{all_pages}</AuthProvider>
        //         </MatxTheme>
        //     </SettingsProvider>
        // </Provider>

<Routes>
{/* <MatxTheme> */}
{/* <Route exact path="/" element={<Analytics user={user} />} /> */}
{/* <Route path="register" element={<JWTRegister user={user} />} /> */}
<Route path="login" element={<JwtLogin user={user} setUser={setUser} />} />
{/* <Route
  path="email-verification"
  element={<VerifyEmail user={user} />}
/> */}
{/* </MatxTheme> */}
</Routes>
    )
}

export default App
