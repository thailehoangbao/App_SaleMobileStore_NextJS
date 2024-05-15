'use client';
import React, { useEffect } from 'react';
import accountApiRequest from '@/apiRequest/account';
import { AccountResType } from '@/components/schemaValidations/account.schema';
type PayloadType = {
    payload: AccountResType | Response;
    status: number;
};

export default function Profile() {
    useEffect(() => {
        const fetchApi = async () => {
            const result : PayloadType = await accountApiRequest.meClient();
        };

        fetchApi();
    }, []);

    return <div>profile</div>;
}
