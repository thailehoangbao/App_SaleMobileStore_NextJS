'use client';
import { AccountRes, AccountResType } from '@/components/schemaValidations/account.schema';
import { isClient } from '@/lib/http';
// import { sessionTokenClient } from '@/lib/http';
import { ReactNode, createContext, useContext, useState } from 'react';

type User = AccountResType['data'];

export const AppContext = createContext<{
    user: User | null;
    setUser: (user: User | null ) => void;
    isAuthenticated: boolean;
}>({
    // sessionToken: '',
    // setSessionToken: (sessionToken: string) => {},
    user : null ,
    setUser : () => {},
    isAuthenticated: false,
});

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        return new Error('useAppcontext must be used within an AppProvider');
    }
    return context;
};

export default function AppProvider({
    children,
    // innititalSessionToken = '',
    // user : _user
}: {
    children: ReactNode;
    // innititalSessionToken?: string;
    // user : User | undefined;
}) {
    const [user, setUserState] = useState<User | null>(() => {
        if(isClient()) {
            const _user = localStorage.getItem('user');
            return _user ? JSON.parse(_user) : null;
        }
        return null;
    });
    const isAuthenticated = Boolean(user);
    const setUser = (user: User | null) => {
        setUserState(user);
        localStorage.setItem('user', JSON.stringify(user));
    }
    // const [sessionToken, setSessionToken] = useState(innititalSessionToken);
    // return <AppContext.Provider value={{ sessionToken, setSessionToken }}>{children}</AppContext.Provider>;
    // useState(() => {
    //     if (typeof window !== 'undefined') {
    //         sessionTokenClient.value = innititalSessionToken;
    //     }
    // })
    return <AppContext.Provider value={{user,setUser,isAuthenticated}}>{children}</AppContext.Provider>;
}
