'use client';
import { ErrorCard } from '@/components/common/ErrorCard';
import { LoadingData } from '@/components/common/LoadingData';
import { FiltrosProductos } from '@/features/productos/componentes/FiltrosProducto';
import { ListaProductos } from '@/features/productos/componentes/ListaProductos';
import { useListarProductos } from '@/features/productos/hooks/useProductos';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface IListarProductosParams {
    limit: number;
    offset: number;
    categoria?: string;
    marca?: string;
    mascota?: string;
}

interface IFiltros {
    marca: string;
    categoria: string;
    mascota: string;
}

interface ProductosContentProps {
    categoriaInicial?: string;
}

export const Productos = ({ categoriaInicial }: ProductosContentProps) => {
    const searchParams = useSearchParams();

    const [params, setParams] = useState<IListarProductosParams>({
        limit: 30,
        offset: 0,
        categoria: categoriaInicial,
        marca: searchParams.get('marca') || undefined,
        mascota: searchParams.get('mascota') || undefined,
    });

    const { data, isLoading, error } = useListarProductos(params);

    useEffect(() => {
        setParams(prev => ({
            ...prev,
            categoria: categoriaInicial,
            marca: searchParams.get('marca') || undefined,
            mascota: searchParams.get('mascota') || undefined,
        }));
    }, [categoriaInicial, searchParams]);

    const handlePageChange = (page: number) => {
        const newOffset = (page - 1) * params.limit;
        setParams(prev => ({
            ...prev,
            offset: newOffset,
        }));
    };

    const handleAplicarFiltros = (filtros: IFiltros) => {
        setParams(prev => ({
            ...prev,
            offset: 0,
            marca: filtros.marca || undefined,
            categoria: filtros.categoria || categoriaInicial,
            mascota: filtros.mascota || undefined,
        }));
    };

    const handleLimpiarFiltros = () => {
        setParams({
            limit: 30,
            offset: 0,
            categoria: categoriaInicial,
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <LoadingData texto="Cargando catálogo..." />
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="max-w-md mx-auto py-10">
                <ErrorCard titulo="Hubo un problema" descripcion={error.message} variante="error" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pb-12">
            <FiltrosProductos
                filtrosIniciales={{
                    marca: params.marca,
                    categoria: params.categoria,
                    mascota: params.mascota,
                }}
                onAplicarFiltros={handleAplicarFiltros}
                onLimpiarFiltros={handleLimpiarFiltros}
            />

            {data?.data.length === 0 ? (
                <div className="max-w-2xl mx-auto mt-8">
                    <ErrorCard
                        titulo="Sin resultados"
                        descripcion="No encontramos productos con esos filtros. Intenta limpiar los filtros para ver todo el catálogo."
                        variante="info"
                    />
                </div>
            ) : (
                <ListaProductos data={data} onPageChange={handlePageChange} />
            )}
        </div>
    );
};
