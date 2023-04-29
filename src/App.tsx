import React, { useContext } from "react";
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import { Route, Routes } from "react-router-dom";
import Drivers from "./views/Drivers";
import Orders from "./views/Orders";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RoutesPage from "./views/Routes";
import "./index.scss";
import Login from "./components/Login";
import Trips from "./views/Trips";
import ContextProvider, { UserContext } from "./services/context/contextProvider";

const App = () => {
    const { user } = useContext(UserContext)
    console.log('user', user);
    return (
        <>
            {!user?.token?.accessToken ? (
                <Routes>
                    <Route path='/login' element={<Login />} />
                </Routes>
            ) : (
                <div className='App'>
                    <Navbar />
                    <div className='wrapper'>
                        <Sidebar />
                        <div className='container'>
                            <div className='row'>
                                <Routes>
                                    <Route path='/' element={<RoutesPage />} />
                                    <Route
                                        path='/drivers'
                                        element={<Drivers />}
                                    />
                                    <Route
                                        path='/orders'
                                        element={<Orders />}
                                    />
                                    <Route
                                        path='/trips'
                                        element={<Trips />}
                                    />
                                    <Route
                                        path='/routes'
                                        element={<RoutesPage />}
                                    />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </>
    );
};

export default App;
