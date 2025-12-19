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
        return (
            <div className="w-full p-4 md:p-8 text-center text-red-500 bg-red-50 rounded-lg m-4">
                Error al cargar los productos
            </div>
        );
    }

    return (
        <section className="w-full py-8 md:py-12">
            {/* Contenedor con padding para que no toque los bordes en mobile */}
            <div className="container mx-auto px-4 mb-6">
                <div className="flex flex-col gap-1">
                    {titulo && <h2 className="text-xl md:text-2xl font-bold text-gray-900">{titulo}</h2>}
                    {subtitulo && <h4 className="text-sm md:text-base text-gray-500">{subtitulo}</h4>}
                </div>
            </div>

            <div className="container mx-auto px-4">
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
            </div>
        </section>
    );
};
