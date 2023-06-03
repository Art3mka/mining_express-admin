import React, { useContext, useEffect, useState } from 'react';
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
import jwtDecode, { JwtPayload } from 'jwt-decode';

const App = () => {

    const [isValid, setIsValid] = useState(false)

    const { user, setUser } = useContext(UserContext);
    console.log('user', user || '');
    // console.log(localStorage)

    const token = JSON.parse(JSON.stringify(localStorage.getItem(`token`)) || '{}');
    const login = JSON.parse(JSON.stringify(localStorage.getItem(`login`)) || '{}');

    useEffect(() => {
        const decodedToken = getDecodedToken(token)
        // console.log(decodedToken)
        if (decodedToken !== undefined) {
            const isValid = getIsValid(decodedToken.exp)
            if (isValid === true) {
                setUser({token, login})
            }
            setIsValid(isValid)
        }
    }, [token, login])

    const getIsValid = (expDateUnix: any) => {
        const curUnix = +new Date()/1000
        if (expDateUnix>curUnix) {
            // console.log(true)
            return true
        } else {
            console.log(false)
            return false
        }
    }

    const getDecodedToken = (token: any) => {
        try {     
            const decodedToken: JwtPayload = jwtDecode(token);
            return decodedToken
    
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={isValid ? <Home /> : <Login />}
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

