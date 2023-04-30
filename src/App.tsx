import React, { useContext, useState } from 'react';
import './App.css';
import 'rsuite/dist/rsuite.min.css';
import { Route, Routes } from 'react-router-dom';
import Drivers from './views/Drivers';
import Orders from './views/Orders';
import RoutesPage from './views/Routes';
import Login from './components/Login';
import Trips from './views/Trips';
import { UserContext } from './services/context/contextProvider';
import Home from './views/Home';
import './index.css'

const App = () => {
    const { user } = useContext(UserContext);
    console.log('user', user);

    let localToken = null
    localStorage.getItem(`token`) ? localToken = localStorage.getItem(`token`) : localToken = null

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={user?.token?.accessToken ? <Home /> : <Login />}
                >
                    <Route path="/drivers" element={<Drivers />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/trips" element={<Trips />} />
                    <Route path="/routes" element={<RoutesPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;



// user?.token?.accessToken