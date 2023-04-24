import { Button } from "@mui/material";
import CreateOrder from "./CreateOrder";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getAuth, getOrders } from "../../services/api/api";
import "./index.scss";

const Orders = () => {
    const [openGroup, setOpenGroup] = useState(false);
    const [token, setToken] = useState({accessToken: ''});
    const [orderData, setOrderData] = useState();
    const handleOpenOrder = () => setOpenGroup(true);
    const handleCloseOrder = () => setOpenGroup(false);

    const getToken = async () => {
        const token = await getAuth({login: 'me-admin', password: 'express-admin' })        
        setToken(token)

        return token
    }
    const getOrdersData = async () => {        
        const data = await getOrders(token?.accessToken)
        setOrderData(data)

        return data.data
    }

    useEffect(() => {
        getToken()
    }, [])
    useEffect(() => {
        getOrdersData()
    }, [token])

    return (
        <div className="card">
            <div className="card-body">
                <Table data={orderData}/>
                <CreateOrder open={openGroup} close={handleCloseOrder} />
                <Button className="btn" variant="contained" onClick={handleOpenOrder}>
                    Добавить заказ
                </Button>
            </div>
        </div>
    );
};

export default Orders;
