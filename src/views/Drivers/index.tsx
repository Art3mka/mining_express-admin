import { Button } from "@mui/material";
import CreateDriver from "./CreateDriver";
import { useEffect, useState } from "react";
import { getAuth, getDrivers } from "../../services/api/api";
import DriversTable from "../../components/DriversTable";
import "./index.scss";


const Drivers = () => {
    const [openStock, setOpenStock] = useState(false);
    const [token, setToken] = useState({accessToken: ''});
    const [orderData, setOrderData] = useState();

    const handleOpenDriver = () => setOpenStock(true);
    const handleCloseDriver = () => setOpenStock(false);

    const getToken = async () => {
        const token = await getAuth({login: 'me-admin', password: 'express-admin' })        
        setToken(token)

        return token
    }
    const getOrdersData = async () => {        
        const data = await getDrivers(token?.accessToken)
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
                <DriversTable data={orderData}/>
                <CreateDriver open={openStock} close={handleCloseDriver} />
                <Button className="btn" variant="contained" onClick={handleOpenDriver}>
                    Добавить водителя
                </Button>
            </div>
        </div>
    );
};

export default Drivers;
