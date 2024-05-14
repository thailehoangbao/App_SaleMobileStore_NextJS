import React from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
    return (
        <div>
            <div className="text-center">
                <h1 className="font-medium">Thông Tin Đăng Nhập</h1>
            </div>
            <div className="flex justify-center align-middle">
                <LoginForm />
            </div>
        </div>
    );
}
