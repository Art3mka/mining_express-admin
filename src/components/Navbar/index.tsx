import { useContext } from "react";
import { UserContext } from "../../services/context/contextProvider";
import './index.scss'

const Navbar = () => {
    const { user } = useContext(UserContext)
    const {login} = user

    return (
        <header className="topbar" data-navbarbg="skin6">
            <nav className="navbar top-navbar navbar-expand-md navbar-light">
                <div className="navbar-header" data-logobg="skin6">
                    <h3>{`${login ?? ''}`}</h3>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
