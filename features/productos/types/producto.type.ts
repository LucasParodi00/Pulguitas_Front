export interface IProducto {
    _id: string;
    nombre: string;
    categoria: string;
    mascota: string[];
    presentaciones: IPresentaciones[] | [];
    descripcion: string;
    activo: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

export interface IPresentaciones {
    nombre: string;
    precio: number;
    stock: number;
    sku: string;
    _id: string;
}
