import { IService } from './servicio.type';

export interface ISlot {
    horaInicio: string;
    horaFin: string;
    start: string; // ISO date
    end: string; // ISO date
    consultorioId: string;
}

export interface IConsultorio {
    consultorioId: string;
    nombreConsultorio: string;
    slots: ISlot[];
}

export interface IDiaDisponibilidad {
    fecha: string;
    fechaISO: string; // "2025-12-01"
    diaSemana: number;
    consultorios: IConsultorio[];
    tieneDisponibilidad: boolean;
}

export interface IDataDisponibilidad {
    tipoConsulta: {
        id: string;
        nombre: string;
        duracionMinutos: number;
    };
    mes: number;
    anio: number;
    dias: IDiaDisponibilidad[];
    totalDiasDisponible: number;
}

export interface ICrearTurnoDto {
    consultorioId: string;
    tipoConsultaId: string;
    usuarioId?: string; // Opcional
    nombreCliente: string;
    emailCliente?: string;
    telefonoCliente: string;
    nombreMascota: string;
    especieMascota: string;
    start: string; // ISO
    notas?: string;
}

export interface IConsultorioPopulated {
    _id: string;
    nombre: string;
    tipoAtencion: string;
}

export interface ITipoServicioPopulated {
    _id: string;
    nombre: string;
    duracionMinutos: number;
    color: string;
}

// Interfaz principal basada en tu JSON
export interface ITurno {
    _id: string;
    consultorioId: IConsultorioPopulated;
    tipoServicioId: ITipoServicioPopulated; // O usa IService si coinciden los campos
    nombreCliente: string;
    emailCliente: string;
    telefonoCliente: string;
    nombreMascota: string;
    especieMascota: string;
    start: string; // ISO Date
    end: string; // ISO Date
    estado: 'pendiente' | 'confirmado' | 'cancelado' | 'realizado';
    notas: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
