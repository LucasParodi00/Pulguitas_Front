import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { FormularioLogin } from '@/features/auth/componentes/FormularioLogin';
import { Suspense } from 'react';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Suspense fallback={<LoadingSpinner />}>
                <FormularioLogin />
            </Suspense>
        </div>
    );
};

export default LoginPage;
