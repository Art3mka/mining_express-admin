import { ReactNode, createContext, useEffect, useState } from "react";
import { getRoutes } from "../api/api";
import { IRoutes } from "../../components/TripsTable/types";

interface ContextProviderProps {
    children: ReactNode;
}

type ContextUser = {
    email: string,
    auth: boolean,
}

export type UserContextProvider = {
    user: any;
    setUser: any;
    routesData?: IRoutes[];
}

interface RoutesData {
    routeId: string;
    routeName: string;
}

export const UserContext = createContext({} as UserContextProvider);

const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<ContextUser | null>();
    const [routesData, setRoutesData] = useState<IRoutes[]>([]);
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

    //загружает данные о маршрутах
    useEffect(() => {
        getRoutesData();
    }, []);
    

    return (
        <UserProvider value={{user, setUser, routesData}}>
            {children}
        </UserProvider>
    );
};

export default ContextProvider;
