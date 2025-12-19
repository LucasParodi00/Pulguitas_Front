import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { FormularioRegistro } from '@/features/auth/componentes/FormularioRegistro';
import { Suspense } from 'react';

const RegistroPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Suspense fallback={<LoadingSpinner />}>
                <FormularioRegistro />
            </Suspense>
        </div>
    );
};

export default RegistroPage;
