import { createContext, useContext } from "react";
import { useUser, UseUser } from "./useUser";

interface Props {
    children: React.ReactNode;
}

const UserContext = createContext<UseUser>(undefined!);

const UserProvider = ({ children }: Props) => {

    const userUserData = useUser();

    return (
        <UserContext.Provider
            value={{ ...userUserData }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserContext };
