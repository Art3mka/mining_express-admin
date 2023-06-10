import React, { Dispatch, SetStateAction, useState } from 'react';
import { Sidenav, Nav } from 'rsuite';
import styles from './sidebar.module.scss'


import { Link, useMatch, useResolvedPath } from "react-router-dom";






interface ICustomSidebar {
    appearance: "default" | "inverse" | "subtle" | undefined,
    onSelect?: Dispatch<SetStateAction<string>>
    activeKey?: string
}

const CustomSidebar = ({ appearance, onSelect, activeKey, ...navProps }: ICustomSidebar) => {

    return (

        <div className={styles.sidebar}>
            <Sidenav className={styles.govno}
                appearance={appearance}

            >
                <Sidenav.Body>
                    <Nav {...navProps}>
                        <Nav.Item className={styles.nav__item} eventKey="1">
                            <CustomLink to='/'>Главная</CustomLink>
                        </Nav.Item>
                        <Nav.Item className={styles.nav__item} eventKey="2">
                            <CustomLink to='/drivers'>Водители</CustomLink>
                        </Nav.Item>
                        <Nav.Item className={styles.nav__item} eventKey="3">
                            <CustomLink to='/orders'>Заказы</CustomLink>
                        </Nav.Item>
                        <Nav.Item className={styles.nav__item} eventKey="4">
                            <CustomLink to='/routes'>Маршруты</CustomLink>
                        </Nav.Item>
                        <Nav.Item className={styles.nav__item} eventKey="5">
                            <CustomLink to='/trips'>Рейсы</CustomLink>
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
};




















const CustomLink = ({ to, children, ...props }: { to: any, children: any }) => {
    const resolvedPath = useResolvedPath(to)

    return (
            <Link
                className={styles.sidebar__link}
                to={to}
                aria-expanded='false'
            >
                <span >{children}</span>
            </Link>
    )
}

const Sidebar = () => {

    const [activeKey, setActiveKey] = React.useState('0');

    return (
        <aside className={styles.sidebar__wrap} data-sidebarbg='skin6'>
            <CustomSidebar
                appearance="inverse"
                onSelect={setActiveKey}
                activeKey={activeKey}
            />
        </aside>
    );
};

export default Sidebar;
