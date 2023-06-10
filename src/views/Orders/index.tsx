import { Button } from '@mui/material';
import CreateOrder from './CreateOrder';
import { useContext, useEffect, useState } from 'react';
import Table from '../../components/Table';
import { getOrders } from '../../services/api/api';
import { UserContext } from '../../services/context/contextProvider';
import './index.scss';

const Orders = () => {
    const [openGroup, setOpenEditOrder] = useState(false);
    const [orderData, setOrderData] = useState();
    const handleOpenOrder = () => setOpenEditOrder(true);
    const handleCloseOrder = () => setOpenEditOrder(false);
    const { user } = useContext(UserContext);
    const { token } = user;

    const getOrdersData = async () => {
        const data = await getOrders(token);
        setOrderData(data);
    };

    useEffect(() => {
        getOrdersData();
    }, [openGroup]);

    return (
        <div className="card">
            <div className="card-body">
                <Table data={orderData} />
                <CreateOrder open={openGroup} close={handleCloseOrder} />
                <Button
                    className="btn"
                    variant="contained"
                    onClick={handleOpenOrder}
                >
                    Добавить заказ
                </Button>
            </div>
        </div>
    );
};

export default Orders;
