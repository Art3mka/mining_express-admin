import { Button } from "@mui/material";
import "./index.scss";
import Table from "../../components/Table";
import { useState } from "react";
import CreateDriver from "./CreateDriver";
import CreateOrder from "./CreateOrder";

interface IHomeProps {}
const Home = () => {
    const [openStock, setOpenStock] = useState(false);
    const [openGroup, setOpenGroup] = useState(false);

    const handleOpenDriver = () => setOpenStock(true);
    const handleCloseDriver = () => setOpenStock(false);

    const handleOpenOrder = () => setOpenGroup(true);
    const handleCloseOrder = () => setOpenGroup(false);
    return (
        <>
            <header className="topbar" data-navbarbg="skin6">
                <nav className="navbar top-navbar navbar-expand-md navbar-light">
                    <div className="navbar-header" data-logobg="skin6"></div>
                </nav>
            </header>
            <div className="wrapper">
                <aside className="left-sidebar" data-sidebarbg="skin6">
                    <div className="scroll-sidebar">
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav" className="in">
                                <li className="sidebar-item selected">
                                    <a
                                        className="sidebar-link waves-effect waves-dark sidebar-link active"
                                        href="index.html"
                                        aria-expanded="false"
                                    >
                                        <span className="hide-menu">
                                            Главная
                                        </span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a
                                        className="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="pages-profile.html"
                                        aria-expanded="false"
                                    >
                                        <i className="mdi me-2 mdi-account-check"></i>
                                        <span className="hide-menu">
                                            Profile
                                        </span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a
                                        className="sidebar-link waves-effect waves-dark sidebar-link"
                                        href="table-basic.html"
                                        aria-expanded="false"
                                    >
                                        <i className="mdi me-2 mdi-table"></i>
                                        <span className="hide-menu">Table</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
                <div className="container">
                    <div className="row">
                        <div className="card">
                            <div className="card-body">
                                <Table />
                                <CreateDriver
                                    open={openStock}
                                    close={handleCloseDriver}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleOpenDriver}
                                >
                                    Добавить водителя
                                </Button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <CreateOrder
                                    open={openGroup}
                                    close={handleCloseOrder}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleOpenOrder}
                                >
                                    Добавить заказ
                                </Button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                               <CreateOrder
                                    open={openGroup}
                                    close={handleCloseOrder}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={handleOpenOrder}
                                >
                                    Contained
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
