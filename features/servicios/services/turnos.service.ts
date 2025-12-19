import { apiFetch } from '@/lib/http/apiFetch';
import { IResponseSucces, IRespuestaApiPaginada } from '@/lib/types/http.type';
import { ICrearTurnoDto, IDataDisponibilidad, ITurno } from '../types/turnos.type';

export const turnoService = {
    obtenerDisponibilidad: async (
        tipoConsultaId: string,
        mes: number,
        anio: number,
    ): Promise<IResponseSucces<IDataDisponibilidad>> => {
        const queryParams = new URLSearchParams({
            tipoConsultaId,
            mes: mes.toString(),
            anio: anio.toString(),
        });

        return apiFetch({
            service: 'servicios',
            path: `/disponibilidad?${queryParams.toString()}`,
        });
    },

    crearTurno: async (data: ICrearTurnoDto) => {
        console.log('TURNO :', data);

        return apiFetch({
            service: 'turnos',
            method: 'POST',
            body: data,
        });
    },
    listar: async (params = {}): Promise<IRespuestaApiPaginada<ITurno>> => {
        return apiFetch({
            service: 'turnos',
            params,
        });
    },
};
