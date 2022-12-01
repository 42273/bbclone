import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { createContext, ReactNode, useState, useEffect } from "react";
import { AccountShcemaProps } from "../lib/model/account";
import Account from "../lib/model/account"

export interface ContextType {
    login: () => void;
    userData: AccountShcemaProps | null;
    isLogin: boolean;
    logout: () => void;
    categoryFilter: string;
    setCatetoryFilter: (filter: string) => void
}

export const Ctx = createContext<ContextType | null>(null)
//이거부르기
// export default Counter
export const Provider = (props: { children: ReactNode }) => {
    const [userData, setUserData] = useState<AccountShcemaProps | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const session = useSession()
    const [categoryFilter, setCatetoryFilter] = useState<string>("");

    useEffect(() => {
        if (session.status === "authenticated") {
            console.log(session.data);
            setIsLogin(true);
            // setUserData(session.data);
            if (!userData) {
                // Account.findOne({email:session.data.user?.email}).then(data=>setUserData(data));
            }
        }
    }, [session])

    const login = () => {
        console.log(session)
    }

    const logout = () => {
        setIsLogin(false);
        setUserData(null);
        signOut();
    }

    return <Ctx.Provider value={{ logout, isLogin, login, userData, categoryFilter, setCatetoryFilter }}>
        {props.children}
    </Ctx.Provider>
};


