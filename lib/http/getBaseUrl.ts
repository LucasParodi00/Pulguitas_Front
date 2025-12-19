const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export type Service = 'productos' | 'ordenes';

export const getBaseUrl = (service: Service): string => {
    switch (service) {
        case 'productos':
            return `${API_URL}/productos`;
        case 'ordenes':
            return `${API_URL}/ordenes`;
        default:
            throw new Error('Servicio no encontrado');
    }
};
