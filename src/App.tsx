import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { UserContext } from './services/context/contextProvider';

import Drivers from './views/Drivers';
import Orders from './views/Orders';
import RoutesPage from './views/Routes';
import Home from './views/Home';
import Trips from './views/Trips';
import Login from './components/Login';
import Notification from './components/Notification';

import './App.css';
import { useToaster } from 'rsuite';
import { NotificationPlacementEnum } from './type';

const App = () => {
    const [isValid, setIsValid] = useState(false);
    const toaster = useToaster();
    const { setUser, notification } = useContext(UserContext);
    const { type: typeMessage, title: textMessage } = notification;

    const token = JSON.parse(
        JSON.stringify(localStorage.getItem(`token`)) || '{}'
    );
    const login = JSON.parse(
        JSON.stringify(localStorage.getItem(`login`)) || '{}'
    );

    useEffect(() => {
        const decodedToken = getDecodedToken(token);
        if (decodedToken !== undefined) {
            const isValid = getIsValid(decodedToken.exp);
            if (isValid === true) {
                setUser({ token, login });
            }
            setIsValid(isValid);
        }
    }, [token, login, setUser]);

    const getIsValid = (expDateUnix: any) => {
        const curUnix = +new Date() / 1000;
        if (expDateUnix > curUnix) {
            return true;
        } else {
            console.log(false);
            return false;
        }
    };

    const getDecodedToken = (token: any) => {
        try {
            const decodedToken: JwtPayload = jwtDecode(token);
            return decodedToken;
        } catch (error) {
            console.log(error);
        }
    };

    setTimeout(() => {
        toaster.clear();
    }, 5000);

    useEffect(() => {
        toaster.clear();
    }, []);

    useEffect(() => {
        if (notification.type) {
            toaster.push(<Notification type={typeMessage} title={textMessage}/>, {
                placement: NotificationPlacementEnum.BOTTOM_END,
            });
        }
    }, [notification.type, textMessage, toaster, typeMessage]);

    return (
        <>
            <Routes>
                <Route path="/" element={isValid ? <Home /> : <Login />}>
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
