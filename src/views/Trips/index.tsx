import { useEffect, useState } from "react";
import TripsTable from "../../components/TripsTable";
import { getAllTrips } from "../../services/api/api";
import { ITrip } from "../../services/types";

const Trips = () => {
    const [orderData, setOrderData] = useState<ITrip[]>([]);

    const getTripsData = async () => {
        const data = await getAllTrips()
        console.log('trips', data);
        setOrderData(data)
        return data
    }

    useEffect(() => {
        getTripsData()
    }, [])

    return (
        <div className='card'>
            <div className='card-body'>
                <TripsTable data={orderData} />
            </div>
        </div>
    );
};

export default Trips;
