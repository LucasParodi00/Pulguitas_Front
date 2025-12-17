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
    infoDescuento?: IPromocionProducto;
    sku: string;
    _id: string;
}

export interface IPromocionProducto {
    tieneDescuento: boolean;
    porcentajeDescuento: number;
    precioOriginal: number;
    precioFinal: number;
    ahorro: number;
    vigenciaDesde: Date;
    vigenciaHasta: Date;
}
