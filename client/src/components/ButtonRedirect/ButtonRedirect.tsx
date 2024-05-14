'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function ButtonRedirect() {
    const router = useRouter();
    const handleNavigate = () => {
        router.push('/login');
    };
    return (
        <li>
            <Button onClick={handleNavigate}>Chuyển trang</Button>
        </li>
    );
}
