import { Button } from "@mui/material";
import Table from "../../components/Table";
import CreateDriver from "./CreateDriver";
import { useState } from "react";
import "./index.scss";


const Drivers = () => {
    const [openStock, setOpenStock] = useState(false);

    const handleOpenDriver = () => setOpenStock(true);
    const handleCloseDriver = () => setOpenStock(false);
    return (
        <div className="card">
            <div className="card-body">
                <Table />
                <CreateDriver open={openStock} close={handleCloseDriver} />
                <Button className="button" variant="contained" onClick={handleOpenDriver}>
                    Добавить водителя
                </Button>
            </div>
        </div>
    );
};

export default Drivers;
