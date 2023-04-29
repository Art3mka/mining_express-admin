import { ReactNode, createContext, useState } from "react";

interface ContextProviderProps {
    children: ReactNode;
}

type ContextUser = {
    email: string,
    auth: boolean
}

export type UserContextProvider = {
    user: any;
    setUser: any;
}

export const UserContext = createContext({} as UserContextProvider);

const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<ContextUser | null>();
    const UserProvider = UserContext.Provider;
    

    return (
        <UserProvider value={{user, setUser}}>
            {children}
        </UserProvider>
    );
};

export default ContextProvider;
