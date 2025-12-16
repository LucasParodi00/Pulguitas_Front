'use client';

import { CarruselGenerico } from '@/components/common/CarruselGenerico';
import { useListarProductos } from '../hooks/useProductos';
import { IProducto } from '../types/producto.type';
import { ProductoCard } from './ProductoCard';

interface CarruselProductosProps {
    subtitulo?: string;
    titulo?: string;
    params?: Record<string, any>;
    itemsPerView?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
    autoplay?: boolean;
}

export const CarruselProductos = ({
    titulo = 'Productos',
    subtitulo = '',
    params = {},
    itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
    autoplay = false,
}: CarruselProductosProps) => {
    const { data, isLoading, isError } = useListarProductos(params);

    if (isError) {
        return <div className="w-full p-8 text-center text-red-500">Error al cargar los productos</div>;
    }

    return (
        <section className="w-full py-8 ">
            <div className="my-5">
                {titulo && <h2 className="text-2xl font-semibold">{titulo}</h2>}
                {subtitulo && <h4 className="text-sm">{subtitulo}</h4>}
            </div>

            <CarruselGenerico<IProducto>
                items={data?.data || []}
                renderItem={producto => <ProductoCard producto={producto} />}
                itemsPerView={itemsPerView}
                autoplay={autoplay}
                autoplayDelay={3000}
                showControls={true}
                showIndicators={false}
                loading={isLoading}
                emptyMessage="No hay productos disponibles"
            />
        </section>
    );
};
