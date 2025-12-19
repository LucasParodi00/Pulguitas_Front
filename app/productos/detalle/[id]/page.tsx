'use client';
import { ErrorCard } from '@/components/common/ErrorCard';
import { LoadingData } from '@/components/common/LoadingData';
import { DetalleProducto } from '@/features/productos/componentes/DetalleProducto';
import { useObtenerUnProducto } from '@/features/productos/hooks/useProductos';
import { useParams } from 'next/navigation';

const Page = () => {
    const params = useParams();

    const id = params.id as string;

    const { data, isLoading, error } = useObtenerUnProducto(id);
    console.log('DATOS', data);

    if (isLoading) {
        return <LoadingData />;
    }

    if (error || !data || !data.data) {
        return <ErrorCard titulo="Error" variante="error" descripcion={error?.message} />;
    }
    return <DetalleProducto producto={data.data} />;
};

export default Page;
