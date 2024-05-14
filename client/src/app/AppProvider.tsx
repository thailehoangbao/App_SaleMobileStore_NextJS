'use client';
import { AccountRes, AccountResType } from '@/components/schemaValidations/account.schema';
import { sessionTokenClient } from '@/lib/http';
import { ReactNode, createContext, useContext, useState } from 'react';

type User = AccountResType['data'];

export const AppContext = createContext<{
    user: User | undefined;
    setUser: (user: User | undefined ) => void;
}>({
    // sessionToken: '',
    // setSessionToken: (sessionToken: string) => {},
    user : undefined ,
    setUser : () => {}
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
    innititalSessionToken = '',
    user : _user
}: {
    children: ReactNode;
    innititalSessionToken?: string;
    user : User | undefined;
}) {
    const [user, setUser] = useState<User | undefined>(_user);
    // const [sessionToken, setSessionToken] = useState(innititalSessionToken);
    // return <AppContext.Provider value={{ sessionToken, setSessionToken }}>{children}</AppContext.Provider>;
    useState(() => {
        if (typeof window !== 'undefined') {
            sessionTokenClient.value = innititalSessionToken;
        }
    })
    return <AppContext.Provider value={{user,setUser}}>{children}</AppContext.Provider>;
}
