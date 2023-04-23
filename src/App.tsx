import React from "react";
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import { Route, Routes } from "react-router-dom";
import Drivers from "./views/Drivers";
import Orders from "./views/Orders";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./index.scss";
import Home from "./views/Home";

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <div className="wrapper">
                <Sidebar />
                <div className="container">
                    <div className="row">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/drivers" element={<Drivers />} />
                            <Route path="/orders" element={<Orders />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
