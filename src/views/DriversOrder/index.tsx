import { Button } from "@mui/material";
import CreateOrder from "../Orders/CreateOrder";
import { useState } from "react";

interface DriversProps {
    
}
 
const Drivers = () => {
    const [openGroup, setOpenGroup] = useState(false);

    const handleOpenOrder = () => setOpenGroup(true);
    const handleCloseOrder = () => setOpenGroup(false);
    return ( <div className="card">
    <div className="card-body">
        <CreateOrder
            open={openGroup}
            close={handleCloseOrder}
        />
        <Button
            variant="contained"
            onClick={handleOpenOrder}
        >
            Добавить заказ
        </Button>
    </div>
</div> );
}
 
export default Drivers;