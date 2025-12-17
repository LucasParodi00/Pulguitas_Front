interface IListarProductosParams {
    limit: number;
    offset: number;
    page?: number;
    categoria?: string;
    mascota?: string;
    marca?: string;
    tienePromocion?: boolean;
}
