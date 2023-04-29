import { useEffect, useState } from "react";
import RoutesTable from "../../components/RoutesTable";
import { getRoutes } from "../../services/api/api";

interface RoutesProps {}

const Routes = () => {
    const [routesData, setOrderData] = useState();
    const getRoutesData = async () => {
        const data = await getRoutes()
        console.log(data);
        setOrderData(data)
        return data
    }

    useEffect(() => {
        getRoutesData()
    }, [])

    return (
        <div className='card'>
            <div className='card-body'>
                <RoutesTable data={routesData} />
            </div>
        </div>
    );
};

export default Routes;
