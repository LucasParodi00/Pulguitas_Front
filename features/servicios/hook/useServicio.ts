'use client';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { servicioService } from '../services/sercio.service';
import { IService } from '../types/servicio.type';
import { turnoService } from '../services/turnos.service';

// --- LISTAR ---
export const useListarServicios = (params = {}) => {
    return useQuery({
        queryKey: ['servicios', params],
        queryFn: () => servicioService.listar(params),
        staleTime: 1000 * 60 * 5, // 5 minutos de cache fresco
        placeholderData: keepPreviousData,
    });
};

// --- OBTENER UNO ---
export const useObtenerUnServicio = (id: string, params = {}) => {
    return useQuery({
        queryKey: ['servicios', id, params],
        queryFn: () => servicioService.obtenerUno(id, params),
        placeholderData: keepPreviousData,
        enabled: !!id, // Solo se ejecuta si hay ID
    });
};

// --- CREAR ---
export const useCrearServicio = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: servicioService.crear,
        onSuccess: () => {
            // Invalidamos la lista para que se refresque sola
            queryClient.invalidateQueries({ queryKey: ['servicios'] });
            toast.success('Servicio creado correctamente');
        },
        onError: error => {
            console.error(error);
            toast.error('Error al crear el servicio');
        },
    });
};

export const useActualizarServicio = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<IService> }) => servicioService.actualizar(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['servicios'] });
            toast.success('Servicio actualizado correctamente');
        },
        onError: error => {
            console.error(error);
            toast.error('Error al actualizar el servicio');
        },
    });
};

export const useEliminarServicio = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: servicioService.eliminar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['servicios'] });
            toast.success('Servicio eliminado correctamente');
        },
        onError: error => {
            console.error(error);
            toast.error('Error al eliminar el servicio');
        },
    });
};

export const useObtenerDisponibilidad = (tipoConsultaId: string, mes: number, anio: number) => {
    return useQuery({
        queryKey: ['disponibilidad', tipoConsultaId, mes, anio],
        queryFn: () => turnoService.obtenerDisponibilidad(tipoConsultaId, mes, anio),
        placeholderData: keepPreviousData,
        enabled: !!tipoConsultaId,
    });
};

export const useCrearTurno = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: turnoService.crearTurno,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['disponibilidad'] });
        },
        onError: error => {
            console.error(error);
            toast.error('Error al reservar el turno. Intente nuevamente.');
        },
    });
};

export const useListarTurnos = (params: Record<string, any> = {}) => {
    return useQuery({
        queryKey: ['turnos', params],
        queryFn: () => turnoService.listar(params),
        placeholderData: keepPreviousData, // Mantiene la data vieja mientras carga la nueva página
        staleTime: 1000 * 60 * 2, // 2 minutos de cache
    });
};
