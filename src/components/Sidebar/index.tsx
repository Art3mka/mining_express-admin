import { Link } from "react-router-dom";

interface Props {}

const Sidebar = () => {
    
    return (
        <aside className='left-sidebar' data-sidebarbg='skin6'>
            <div className='scroll-sidebar'>
                <nav className='sidebar-nav'>
                    <ul id='sidebarnav' className='in'>
                        <li className='sidebar-item selected'>
                            <Link
                                className='sidebar-link waves-effect waves-dark sidebar-link active'
                                to='/'
                                aria-expanded='false'
                            >
                                <span className='hide-menu'>Главная</span>
                            </Link>
                        </li>
                        <li className='sidebar-item'>
                            <Link
                                className='sidebar-link waves-effect waves-dark sidebar-link'
                                to='/drivers'
                                aria-expanded='false'
                            >
                                <span className='hide-menu'>Водители</span>
                            </Link>
                        </li>
                        <li className='sidebar-item'>
                            <Link
                                className='sidebar-link waves-effect waves-dark sidebar-link'
                                to='/orders'
                                aria-expanded='false'
                            >
                                <span className='hide-menu'>Заказы</span>
                            </Link>
                        </li>
                        <li className='sidebar-item'>
                            <Link
                                className='sidebar-link waves-effect waves-dark sidebar-link'
                                to='/routes'
                                aria-expanded='false'
                            >
                                <span className='hide-menu'>Маршруты</span>
                            </Link>
                        </li>
                        <li className='sidebar-item'>
                            <Link
                                className='sidebar-link waves-effect waves-dark sidebar-link'
                                to='/trips'
                                aria-expanded='false'
                            >
                                <span className='hide-menu'>Рейсы</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
