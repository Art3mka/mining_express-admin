import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({to, children, ...props}: {to: any, children: any}) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "sidebar-item active" : "sidebar-item"}>
        <Link
            className={isActive? 'sidebar-link waves-effect waves-dark sidebar-link active' : 'sidebar-link waves-effect waves-dark sidebar-link'}
            to={to}
            aria-expanded='false'
        >
            <span className='hide-menu'>{children}</span>
        </Link>
    </li>
    )
}

const Sidebar = () => {
    
    return (
        <aside className='left-sidebar' data-sidebarbg='skin6'>
            <div className='scroll-sidebar'>
                <nav className='sidebar-nav'>
                    <ul id='sidebarnav' className='in'>
                        <CustomLink to='/'>Главная</CustomLink>
                        <CustomLink to='/drivers'>Водители</CustomLink>
                        <CustomLink to='/orders'>Заказы</CustomLink>
                        <CustomLink to='/routes'>Маршруты</CustomLink>
                        <CustomLink to='/trips'>Рейсы</CustomLink>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
