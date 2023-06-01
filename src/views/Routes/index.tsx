import { useEffect, useState, useContext } from "react";
import RoutesTable from "../../components/RoutesTable";
import { getRoutes } from "../../services/api/api";
import { UserContext } from "../../services/context/contextProvider";

interface RoutesProps {}

const Routes = () => {

    const { user, routesData } = useContext(UserContext);
    // const { token } = user;

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
