export interface IRespuestaApiPaginada<T> {
    success: boolean;
    message: string;
    data: T[];
    pagination: IPaginador;
    timestamp: string | Date;
}

export interface IPaginador {
    totalData: number;
    limit: number;
    offset: number;
    currentPage: number;
    totalPages: number;
}

export interface IResponseErrorType {
    message: string;
    statusCode: number;
}

export interface IHttpQueyParams {
    page?: number;
    offset?: number;
    params?: {};
}
