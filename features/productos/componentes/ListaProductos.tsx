'use client';
import { ProductoCard } from './ProductoCard';
import { Paginador } from '@/components/common/Paginador';
import { IProducto } from '../types/producto.type';
import { IRespuestaApiPaginada } from '@/lib/types/http.type';

interface IListarProductos {
    data?: IRespuestaApiPaginada<IProducto>;
    onPageChange: (page: number) => void;
}

export const ListaProductos = ({ data, onPageChange }: IListarProductos) => {
    return (
        <div className="py-5 w-full">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                {data?.data.map(item => (
                    <ProductoCard key={item._id} producto={item} />
                ))}
            </div>
            {data?.pagination && (
                <Paginador
                    currentPage={data.pagination.currentPage}
                    totalPages={data.pagination.totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};
