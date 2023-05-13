import { useContext } from 'react';
import { UserContext } from '../../services/context/contextProvider';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import './index.scss';
import { IconButton } from '@mui/material';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const { login } = user;

    return (
        <header className="topbar" data-navbarbg="skin6">
            <nav className="navbar top-navbar navbar-expand-md navbar-light">
                <div className="nav-wrapper">
                    <div className="navbar-header" data-logobg="skin6">
                        <h3>{`${login ?? ''}`}</h3>
                    </div>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="search"
                            color="inherit"
                        >
                            <LogoutOutlinedIcon className='iconColor'/>
                        </IconButton>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
