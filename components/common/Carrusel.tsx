'use client';

import { IImagenesBanner } from '@/features/inicio/componentes/Banners';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ICarrusel {
    data?: IImagenesBanner[];
    autoplayDelay?: number;
    showIndicators?: boolean;
    showControls?: boolean;
    className?: string;
}

const imagenesBannerDefault: IImagenesBanner[] = [
    {
        titulo: 'Promociones especiales.',
        src: '/carrusel/1.png',
        altura: 450,
        ancho: 1300,
        href: '',
    },
    {
        titulo: 'Servicios',
        src: '/carrusel/2.png',
        altura: 450,
        ancho: 1300,
        href: '',
    },
    {
        titulo: 'Peluqueria y Belleza',
        src: '/carrusel/peluqueria.png',
        altura: 450,
        ancho: 1300,
        href: '',
    },
    {
        titulo: 'Servicio veterinario',
        src: '/carrusel/veterinaria.png',
        altura: 450,
        ancho: 1300,
        href: '',
    },
];

export const Carrusel = ({
    data = imagenesBannerDefault,
    autoplayDelay = 4000,
    showIndicators = true,
    showControls = true,
    className,
}: ICarrusel) => {
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

    return (
        <div className={cn('relative w-full rounded-4xl overflow-hidden my-10', className)}>
            <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                    loop: true,
                    align: 'start',
                }}
                plugins={[
                    Autoplay({
                        delay: autoplayDelay,
                        stopOnInteraction: true,
                        stopOnMouseEnter: true,
                    }),
                ]}
            >
                <CarouselContent>
                    {data.map((item, index) => (
                        <CarouselItem key={index} className="p-0">
                            <div className="relative w-full overflow-hidden rounded-lg" style={{ height: `${item.altura}px` }}>
                                {item.href ? (
                                    <a href={item.href} className="block w-full h-full" aria-label={item.titulo}>
                                        <Image
                                            src={item.src}
                                            alt={item.titulo ?? 'Imagen Carrusel'}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            priority={index === 0}
                                            sizes="100vw"
                                            quality={90}
                                        />
                                    </a>
                                ) : (
                                    <Image
                                        src={item.src}
                                        alt={item.titulo ?? 'Imagen Carrusel'}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                        sizes="100vw"
                                        quality={90}
                                    />
                                )}

                                {/* Overlay con título opcional */}
                                {item.titulo && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                        <h3 className="text-white text-2xl font-semibold">{item.titulo}</h3>
                                    </div>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Controles de navegación */}
                {showControls && (
                    <>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </>
                )}
            </Carousel>

            {/* Indicadores de diapositivas */}
            {showIndicators && count > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                'w-2 h-2 rounded-full transition-all duration-300',
                                current === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75',
                            )}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
