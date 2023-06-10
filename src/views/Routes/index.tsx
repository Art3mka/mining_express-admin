import { useContext } from "react";
import RoutesTable from "../../components/RoutesTable";
import { UserContext } from "../../services/context/contextProvider";


const Routes = () => {

    const { routesData } = useContext(UserContext);

    console.log(routesData)

    return (
        <div className='card'>
            <div className='card-body'>
                <RoutesTable data={routesData} />
            </div>
        </div>
    );
};

export default Routes;
