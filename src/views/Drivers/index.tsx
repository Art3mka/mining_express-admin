import { Button } from '@mui/material';
import CreateDriver from './CreateDriver';
import { useContext, useEffect, useState } from 'react';
import { getDrivers } from '../../services/api/api';
import DriversTable from '../../components/DriversTable';
import './index.scss';
import { UserContext } from '../../services/context/contextProvider';

const Drivers = () => {
    const [openCreateDriverForm, setOpenCreateDriverForm] = useState(false);
    const [driverData, setDriverData] = useState();
    const { user } = useContext(UserContext);
    const { token } = user;

    const handleOpenDriver = () => setOpenCreateDriverForm(true);
    const handleCloseDriver = () => setOpenCreateDriverForm(false);

    const getOrdersData = async () => {
        const data = await getDrivers(token?.accessToken);
        console.log(data);
        setDriverData(data);
    };

    useEffect(() => {
        getOrdersData();
    }, [openCreateDriverForm]);

    return (
        <div className="card">
            <div className="card-body">
                <DriversTable data={driverData} />
                <CreateDriver
                    open={openCreateDriverForm}
                    close={handleCloseDriver}
                />
                <Button
                    className="btn"
                    variant="contained"
                    onClick={handleOpenDriver}
                >
                    Добавить водителя
                </Button>
            </div>
        </div>
    );
};

export default Drivers;
