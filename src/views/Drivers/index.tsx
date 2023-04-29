import { Button } from "@mui/material";
import CreateDriver from "./CreateDriver";
import { useContext, useEffect, useState } from "react";
import { getAuth, getDrivers } from "../../services/api/api";
import DriversTable from "../../components/DriversTable";
import "./index.scss";
import { UserContext } from "../../services/context/contextProvider";


const Drivers = () => {
    const [openStock, setOpenStock] = useState(false);
    const [orderData, setOrderData] = useState();
    const { user } = useContext(UserContext)
    const {token} = user
    console.log('create driver', token.accessToken);

    const handleOpenDriver = () => setOpenStock(true);
    const handleCloseDriver = () => setOpenStock(false);

    const getOrdersData = async () => {  
              
        const data = await getDrivers(token?.accessToken)
        setOrderData(data)
        console.log(data);
        
        return data.data
    }

    useEffect(() => {
        getOrdersData()
    }, [])

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
