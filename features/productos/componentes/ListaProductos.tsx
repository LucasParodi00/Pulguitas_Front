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
        <div className="py-6 w-full space-y-8">
            {/* Grid optimizado para evitar columnas muy estrechas en móviles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {data?.data.map(item => (
                    <ProductoCard key={item._id} producto={item} />
                ))}
            </div>

            {/* Paginador centrado */}
            {data?.pagination && data.pagination.totalPages > 1 && (
                <div className="flex justify-center w-full pt-4">
                    <Paginador
                        currentPage={data.pagination.currentPage}
                        totalPages={data.pagination.totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
};
