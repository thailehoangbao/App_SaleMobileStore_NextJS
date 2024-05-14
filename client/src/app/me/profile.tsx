'use client';
import React, { useEffect } from 'react';
// import { useAppContext } from '../AppProvider';
import accountApiRequest from '@/apiRequest/account';
import { sessionTokenClient } from '@/lib/http';
import { AccountResType } from '@/components/schemaValidations/account.schema';
type PayloadType = {
    payload: AccountResType | Response;
    status: number;
};

export default function Profile() {
    // const { sessionToken } = useAppContext();
    useEffect(() => {
        const fetchApi = async () => {
            const result : PayloadType = await accountApiRequest.meClient();
            // console.log(result ,"res")
        };

        fetchApi();
    }, []);

    return <div>profile</div>;
}
