import React, { Dispatch, SetStateAction } from 'react';
import { Sidenav, Nav } from 'rsuite';
import { Link, useResolvedPath } from 'react-router-dom';
import {
    AltRoute as AltRouteIcon,
    Commute as CommuteIcon,
    ManageAccounts as ManageAccountsIcon,
    Storage as StorageIcon,
    Grading as GradingIcon
} from '@mui/icons-material';

import './sidebar.scss';

interface ICustomSidebar {
    appearance: 'default' | 'inverse' | 'subtle' | undefined;
    onSelect?: Dispatch<SetStateAction<string>>;
    activeKey?: string;
}

const CustomSidebar = ({
    appearance,
    onSelect,
    activeKey,
    ...navProps
}: ICustomSidebar) => {
    return (
        <div className='sidebar'>
            <Sidenav className='sidebar-container' appearance={appearance}>
                <Sidenav.Body>
                    <Nav {...navProps}>
                        <Nav.Item className='nav__item' eventKey="1">
                            <StorageIcon />
                            <CustomLink to="/">Главная</CustomLink>
                        </Nav.Item>
                        <Nav.Item className='nav__item' eventKey="2">
                            <ManageAccountsIcon />
                            <CustomLink to="/drivers">Водители</CustomLink>
                        </Nav.Item>
                        <Nav.Item className='nav__item' eventKey="3">
                            <GradingIcon />
                            <CustomLink to="/orders">Заказы</CustomLink>
                        </Nav.Item>
                        <Nav.Item className='nav__item' eventKey="4">
                            <AltRouteIcon />
                            <CustomLink to="/routes">Маршруты</CustomLink>
                        </Nav.Item>
                        <Nav.Item className='nav__item' eventKey="5">
                            <CommuteIcon />
                            <CustomLink to="/trips">Рейсы</CustomLink>
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
};

const CustomLink = ({ to, children, ...props }: { to: any; children: any }) => {
    const resolvedPath = useResolvedPath(to);

    return (
        <Link className='sidebar__link' to={to} aria-expanded="false">
            <span>{children}</span>
        </Link>
    );
};

const Sidebar = () => {
    const [activeKey, setActiveKey] = React.useState('0');

    return (
        <aside className='sidebar__wrap' data-sidebarbg="skin6">
            <CustomSidebar
                appearance="inverse"
                onSelect={setActiveKey}
                activeKey={activeKey}
            />
        </aside>
    );
};

export default Sidebar;
