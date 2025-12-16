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

    // Mapeo de clases completas para Tailwind
    // IMPORTANTE: Las clases deben estar escritas completas para que Tailwind las detecte
    const getBasisClass = () => {
        const { mobile = 1, tablet = 2, desktop = 4 } = itemsPerView;

        // Clases mobile
        const mobileClass =
            {
                1: 'basis-full',
                2: 'basis-1/2',
                3: 'basis-1/3',
                4: 'basis-1/4',
                5: 'basis-1/5',
                6: 'basis-1/6',
            }[mobile] || 'basis-full';

        // Clases tablet
        const tabletClass = {
            1: 'md:basis-full',
            2: 'md:basis-1/2',
            3: 'md:basis-1/3',
            4: 'md:basis-1/4',
            5: 'md:basis-1/5',
            6: 'md:basis-1/6',
        }[tablet];

        // Clases desktop
        const desktopClass = {
            1: 'lg:basis-full',
            2: 'lg:basis-1/2',
            3: 'lg:basis-1/3',
            4: 'lg:basis-1/4',
            5: 'lg:basis-1/5',
            6: 'lg:basis-1/6',
        }[desktop];

        return cn(mobileClass, tabletClass, desktopClass);
    };

    if (loading) {
        return (
            <div className={cn('w-full', className)}>
                <div className="flex gap-4 animate-pulse">
                    {Array.from({ length: itemsPerView.desktop || 4 }).map((_, i) => (
                        <div key={i} className="flex-1 h-64 bg-gray-200 rounded-lg" />
                    ))}
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
        <div className={cn('relative w-full', className)}>
            <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                    loop: items.length > (itemsPerView.desktop || 4),
                    align: 'start',
                }}
                plugins={plugins}
            >
                <CarouselContent className={cn('-ml-2 md:-ml-4', gap)}>
                    {items.map((item, index) => (
                        <CarouselItem key={index} className={cn('pl-2 md:pl-4', getBasisClass())}>
                            {renderItem(item, index)}
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {showControls && items.length > (itemsPerView.desktop || 4) && (
                    <>
                        <CarouselPrevious className="left-0 -translate-x-12" />
                        <CarouselNext className="right-0 translate-x-12" />
                    </>
                )}
            </Carousel>

            {showIndicators && count > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                'w-2 h-2 rounded-full transition-all duration-300',
                                current === index ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400',
                            )}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
