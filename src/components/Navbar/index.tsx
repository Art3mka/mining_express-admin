import { useContext } from 'react';
import { UserContext } from '../../services/context/contextProvider';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import './index.scss';
import { IconButton } from '@mui/material';

const Navbar = () => {
    const { user } = useContext(UserContext)
    const userLogin = user?.login

    return (
        <header className="topbar" data-navbarbg="skin6">
            <nav className="navbar top-navbar navbar-expand-md navbar-light">
                <div className="navbar-header" data-logobg="skin6">
                    <h3>{`${userLogin}`}</h3>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
