'use client';
import { useEffect, useEffectEvent, useState } from 'react';
import { useListarProductos } from '../hooks/useProductos';
import { LoadingData } from '@/components/common/LoadingData';
import { ErrorCard } from '@/components/common/ErrorCard';
import { ProductoCard } from './ProductoCard';
import { useQueryParams } from '@/hook/useQueryParams';
import { Paginador } from '@/components/common/Paginador';

interface IListarProductosParams {
    limit: number;
    offset: number;
    categoria?: string;
    page?: number;
}

export const ListaProductos = () => {
    const queryParams = useQueryParams();

    const [params, setParams] = useState<IListarProductosParams>({
        limit: 30,
        offset: 0,
        ...queryParams,
    });

    const { data, isLoading, error } = useListarProductos(params);

    useEffect(() => {
        setParams(prev => ({
            ...prev,
            ...queryParams,
        }));
    }, [queryParams]);

    const handlePageChange = (page: number) => {
        const newOffset = (page - 1) * params.limit;
        setParams(prev => ({
            ...prev,
            offset: newOffset,
        }));
    };

    if (isLoading) {
        return <LoadingData />;
    }

    if (error && !data) {
        return <ErrorCard titulo="Error" descripcion={error.message} />;
    }

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
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};
