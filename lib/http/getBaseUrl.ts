const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export type Service = 'productos';

export const getBaseUrl = (service: Service): string => {
    switch (service) {
        case 'productos':
            return `${API_URL}/productos`;

        default:
            throw new Error('Servicio no encontrado');
    }
};
