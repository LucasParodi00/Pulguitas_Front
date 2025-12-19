'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CarruselGenericoProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    itemsPerView?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
    autoplay?: boolean;
    autoplayDelay?: number;
    showControls?: boolean;
    showIndicators?: boolean;
    className?: string;
    gap?: string;
    loading?: boolean;
    emptyMessage?: string;
}

export function CarruselGenerico<T>({
    items,
    renderItem,
    itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
    autoplay = false,
    autoplayDelay = 3000,
    showControls = true,
    showIndicators = false,
    className,
    gap = 'gap-4',
    loading = false,
    emptyMessage = 'No hay items para mostrar',
}: CarruselGenericoProps<T>) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollTo = useCallback(
        (index: number) => {
            api?.scrollTo(index);
        },
        [api],
    );

    // Lógica optimizada para las clases de ancho
    const getBasisClass = () => {
        const { mobile = 1, tablet = 2, desktop = 4 } = itemsPerView;

        // Diccionarios de clases (Tailwind necesita clases completas para el tree-shaking)
        const mobileClasses: Record<number, string> = {
            1: 'basis-full',
            2: 'basis-1/2',
            3: 'basis-1/3',
            4: 'basis-1/4',
            5: 'basis-1/5',
        };

        const tabletClasses: Record<number, string> = {
            1: 'md:basis-full',
            2: 'md:basis-1/2',
            3: 'md:basis-1/3',
            4: 'md:basis-1/4',
            5: 'md:basis-1/5',
        };

        const desktopClasses: Record<number, string> = {
            1: 'lg:basis-full',
            2: 'lg:basis-1/2',
            3: 'lg:basis-1/3',
            4: 'lg:basis-1/4',
            5: 'lg:basis-1/5',
        };

        return cn(
            mobileClasses[mobile] || 'basis-full',
            tabletClasses[tablet] || 'md:basis-1/2',
            desktopClasses[desktop] || 'lg:basis-1/4',
        );
    };

    if (loading) {
        return (
            <div className={cn('w-full', className)}>
                {/* Skeleton loader responsive: muestra menos items en móvil */}
                <div className="flex gap-4 animate-pulse overflow-hidden">
                    <div className="flex-1 h-64 bg-gray-200 rounded-lg shrink-0 w-full md:w-1/2 lg:w-1/4" />
                    <div className="hidden md:block flex-1 h-64 bg-gray-200 rounded-lg" />
                    <div className="hidden lg:block flex-1 h-64 bg-gray-200 rounded-lg" />
                    <div className="hidden lg:block flex-1 h-64 bg-gray-200 rounded-lg" />
                </div>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return <div className={cn('w-full p-8 text-center text-gray-500', className)}>{emptyMessage}</div>;
    }

    const plugins = autoplay
        ? [
              Autoplay({
                  delay: autoplayDelay,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
              }),
          ]
        : [];

    return (
        <div className={cn('relative w-full group', className)}>
            <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                    loop: items.length > (itemsPerView.desktop || 4),
                    align: 'start',
                }}
                plugins={plugins}
            >
                <CarouselContent className={cn('-ml-4', gap)}>
                    {' '}
                    {/* Ajuste de margen negativo estandarizado */}
                    {items.map((item, index) => (
                        <CarouselItem key={index} className={cn('pl-4', getBasisClass())}>
                            {renderItem(item, index)}
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* CONTROLES: Ocultos en mobile (hidden), visibles en md (md:flex). 
            Se muestran solo al hacer hover en desktop para limpieza visual */}
                {showControls && items.length > (itemsPerView.desktop || 4) && (
                    <>
                        <CarouselPrevious className="hidden md:flex -left-12 lg:-left-4 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50" />
                        <CarouselNext className="hidden md:flex -right-12 lg:-right-4 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50" />
                    </>
                )}
            </Carousel>

            {/* INDICADORES: Mejorados visualmente */}
            {showIndicators && count > 1 && (
                <div className="flex justify-center gap-2 mt-6 flex-wrap px-4">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                'h-2 rounded-full transition-all duration-300',
                                current === index ? 'bg-primary w-8' : 'bg-gray-300 w-2 hover:bg-gray-400',
                            )}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
