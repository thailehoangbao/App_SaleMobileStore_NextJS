import { Button } from '@/components/ui/button';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
    return (
        <div>
            <div className="text-center">
                <h1 className="font-medium">Thông Tin Đăng Ký</h1>
            </div>
            <div className="flex justify-center align-middle">
                <RegisterForm />
            </div>
        </div>
    );
}
