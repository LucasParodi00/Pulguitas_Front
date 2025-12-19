//const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const API_URL = 'https://devlightsapi.varlok.com';
export type Service = 'productos' | 'ordenes' | 'servicios' | 'turnos';

export const getBaseUrl = (service: Service): string => {
    switch (service) {
        case 'productos':
            return `${API_URL}/productos`;
        case 'ordenes':
            return `${API_URL}/ordenes`;
        case 'servicios':
            return `${API_URL}/servicios`;
        case 'turnos':
            return `${API_URL}/servicios/turno`;
        default:
            throw new Error('Servicio no encontrado');
    }
};
