export interface IProducto {
    _id: string;
    nombre: string;
    categoria: string;
    mascotas: string[];
    presentaciones: IPresentaciones[] | [];
    descripcion: string;
    activo: boolean;
    promocion: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

export interface IPresentaciones {
    nombre: string;
    precio: number;
    stock: number;
    promocion: boolean;
    descuento: number;
    descuentoDesde: Date;
    descuentoHasta: Date;
    sku: string;
    _id: string;
}
