'use client';
import { AccountRes, AccountResType } from '@/components/schemaValidations/account.schema';
import { isClient } from '@/lib/http';
import { ReactNode, createContext, useContext, useState } from 'react';

type User = AccountResType['data'];

export const AppContext = createContext<{
    user: User | null;
    setUser: (user: User | null ) => void;
    isAuthenticated: boolean;
}>({
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
}: {
    children: ReactNode;

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

    return <AppContext.Provider value={{user,setUser,isAuthenticated}}>{children}</AppContext.Provider>;
}
