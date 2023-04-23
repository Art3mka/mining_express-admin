import { Button } from "@mui/material";
import CreateOrder from "./CreateOrder";
import { useState } from "react";
import Table from "../../components/Table";
import "./index.scss";

const Orders = () => {
    const [openGroup, setOpenGroup] = useState(false);

    const handleOpenOrder = () => setOpenGroup(true);
    const handleCloseOrder = () => setOpenGroup(false);
    return (
        <div className="card">
            <div className="card-body">
                <Table />
                <CreateOrder open={openGroup} close={handleCloseOrder} />
                <Button className="button" variant="contained" onClick={handleOpenOrder}>
                    Добавить заказ
                </Button>
            </div>
        </div>
    );
};

export default Orders;
