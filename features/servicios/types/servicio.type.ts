// types/service.ts
export interface IService {
    _id: string;
    nombre: string;
    descripcion: string;
    duracionMinutos: number;
    tipoAtencionRequerida: string;
    activo: boolean;
    color: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
