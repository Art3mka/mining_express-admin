import { Route, Routes } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Drivers from '../Drivers';
import Orders from '../Orders';
import Trips from '../Trips';
import RoutesPage from '../Routes';
import './index.scss';

const Home = () => {

    return (
        <div className="App">
            <Navbar />
            <div className="wrapper">
                <Sidebar />
                <div className="container">
                    <div className="row">
                        <Routes>
                            <Route path="/drivers" element={<Drivers />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/trips" element={<Trips />} />
                            <Route path="/routes" element={<RoutesPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
