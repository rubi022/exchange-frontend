import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import ProfilePage from './components/dashboard/ProfilePage'
import Trade from './components/dashboard/Trade'
import Balance from './components/dashboard/Balance'
import VerifyEmail from './components/VerifyEmail'
import { useCallback, useEffect, useState } from 'react'
import { getWithExpiry } from './helper/utils'
import Market from './components/dashboard/Market'
import ForgotPasswd from './components/ForgotPasswd'
import ChangePassword from './components/ChangePassword'
import Order from './components/dashboard/Order'
import History from './components/dashboard/History'
import React from "react";
import Signuptwo from './components/dashboard/Signuptwo'

function App() {
    const [user, setUser] = useState()
    const value = getWithExpiry('user-info')
    // console.log({ value });
    const loadUser = useCallback(() => {
        setUser(value)
    }, [])

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <div className="App">
            {/* <Navbar setUser={setUser} user={user} /> */}
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<ProfilePage user={user} setUser={setUser} />}
                />
                <Route exact path='/forgot_password' element={<ForgotPasswd user={user}/>}/>
                <Route exact path='/accounts/password_reset' element={<ChangePassword user={user}/>}/>
                <Route
                    path="trade"
                    element={<Trade user={user} setUser={setUser} />}
                />
                <Route
                    path="market"
                    element={<Market user={user} setUser={setUser} />}
                />
                <Route
                    path="balance"
                    element={<Balance user={user} setUser={setUser} />}
                />
                {/* <Route
                    path="wallets"
                    element={<Balance user={user} setUser={setUser} />}
                /> */}
                <Route
                    path="orders"
                    element={<Order user={user} setUser={setUser} />}
                />
                <Route
                    path="history"
                    element={<History user={user} setUser={setUser} />}
                />
                <Route path="register" element={<Register user={user} />} />
                <Route
                    path="login"
                    element={<Login user={user} setUser={setUser} />}
                />
                <Route
                    path="email-verification"
                    element={<VerifyEmail user={user} />}
                />
                <Route 
                    path='signup'
                    element={<Register user={user} setUser={setUser}/>}
                />
                <Route 
                    path='signup2'
                    element={<Signuptwo user={user} setUser={setUser}/>}
                />
                
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </div>
    )
}

export default App
