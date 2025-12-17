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
        return <LoadingData />;
    }

    if (error && !data) {
        return <ErrorCard titulo="Error" descripcion={error.message} />;
    }

    if (data?.data.length === 0) {
        return <ErrorCard titulo="Atencion" descripcion={'No se encontraron productos.'} variante="info" />;
    }
    return (
        <div>
            <FiltrosProductos
                filtrosIniciales={{
                    marca: params.marca,
                    categoria: params.categoria,
                    mascota: params.mascota,
                }}
                onAplicarFiltros={handleAplicarFiltros}
                onLimpiarFiltros={handleLimpiarFiltros}
            />
            <ListaProductos data={data} onPageChange={handlePageChange} />
        </div>
    );
};
