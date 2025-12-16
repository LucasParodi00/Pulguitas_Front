import { AlertCircle, LucideIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import clsx from 'clsx';

interface IErrorCard {
    titulo: string;
    descripcion?: string;
    Icono?: LucideIcon;
    variante?: 'error' | 'success' | 'warning' | 'info';
}

export const ErrorCard = ({ titulo = 'Error', descripcion, Icono, variante = 'error' }: IErrorCard) => {
    const variantes = {
        error: 'border-red-500 text-red-700 bg-red-50',
        success: 'border-green-500 text-green-700 bg-green-50',
        warning: 'border-yellow-500 text-yellow-900 bg-yellow-50',
        info: 'border-blue-500 text-blue-700 bg-blue-50',
    };

    return (
        <Alert className={clsx(variantes[variante])}>
            {Icono ? <Icono /> : <AlertCircle />}
            <AlertTitle>{titulo}</AlertTitle>
            <AlertDescription>{descripcion}</AlertDescription>
        </Alert>
    );
};
