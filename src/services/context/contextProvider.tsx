import { ReactNode, createContext, useEffect, useState } from 'react';
import { getAllTrips, getRoutes } from '../api/api';
import { IRoutes } from '../../components/TripsTable/types';
import { ITrip } from '../types';

interface ContextProviderProps {
    children: ReactNode;
}

type ContextUser = {
    email: string;
    auth: boolean;
};

export type UserContextProvider = {
    user: any;
    setUser: any;
    routesData?: IRoutes[];
    tripsData: ITrip[];
};

interface RoutesData {
    routeId: string;
    routeName: string;
}

export const UserContext = createContext({} as UserContextProvider);

const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<ContextUser | null>();
    const [routesData, setRoutesData] = useState<IRoutes[]>([]);
    const [tripsData, setTripsData] = useState<ITrip[]>([]);

    console.log('tripsData :>> ', tripsData);

    const UserProvider = UserContext.Provider;

    const getRoutesData = async () => {
        try {
            const result = await getRoutes();
            const data = result.map(({ routeId, routeName }: RoutesData) => ({
                label: routeName,
                value: routeId,
            }));
            setRoutesData(data);
            //закидываем  данные о маршрутах
            return data;
        } catch (error) {
            console.error('error');
        }
    };

    const getTripsData = async () => {
        try {
            const data = await getAllTrips();
            setTripsData(data);

            return data;
        } catch (error) {
            console.error('error');
        }
    };

    //загружает данные о маршрутах
    useEffect(() => {
        getRoutesData();
    }, []);

    useEffect(() => {
        getTripsData();
    }, []);

    return (
        <UserProvider value={{ user, setUser, routesData, tripsData }}>
            {children}
        </UserProvider>
    );
};

export default ContextProvider;
