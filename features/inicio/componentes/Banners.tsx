import { ArrowRight, Clock1, CreditCard, LucideIcon, Store, Truck, UserSearch, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export interface IImagenesBanner {
    src: string;
    titulo?: string;
    href: string;
    icono?: LucideIcon;
    ancho?: number; // Opcional porque usamos layout responsive
    altura?: number; // Opcional porque usamos layout responsive
    subtitulo?: string;
}

interface IBanner {
    data: IImagenesBanner[];
}

interface ICardBeneficios {
    icono: LucideIcon;
    titulo: string;
    subtitulo: string;
    onClick?: () => void;
}

// --- DATOS (CONSTANTES) ---

export const imagenes: IImagenesBanner[] = [
    {
        src: '/banner1.png',
        titulo: 'Ver tienda',
        href: '/productos',
        icono: Store,
    },
    {
        src: '/banner2.png',
        titulo: 'Reservar Turno',
        href: '/turnos',
        icono: Clock1,
    },
    {
        src: '/banner3.png',
        titulo: 'Conocenos',
        href: '/nosotros',
        icono: UserSearch,
    },
];

export const imagenesCollage: IImagenesBanner[] = [
    {
        src: '/conocenos.png',
        href: '/nosotros',
        titulo: 'Pulguitas.',
        subtitulo: 'Conocenos',
    },
    {
        src: '/adopciones.png',
        href: '/adopciones',
        titulo: 'Adopciones',
        subtitulo: '',
    },
    {
        src: '/belleza.png',
        href: '/servicios',
        titulo: 'Baño y Belleza',
        subtitulo: 'Reserva un turno.',
    },
    {
        src: '/veterinaria.png',
        href: '/adopciones',
        titulo: 'Veterinaria',
        subtitulo: 'Consulta nuestros turnos.',
    },
    {
        src: '/envios.png',
        href: '/adopciones',
        titulo: 'Envios',
        subtitulo: 'Envios Programados.',
    },
];

export const Banner = ({ data }: IBanner) => {
    return (
        <section className="py-8 md:py-12 px-4 md:px-6 w-full max-w-7xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold">Destacados!</h2>
                <h4 className="text-sm md:text-base text-muted-foreground">Encontra lo mejor para ellos.</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {data.map(item => {
                    const Icono = item.icono ?? Store;
                    return (
                        <Link key={item.titulo} href={item.href} className="group block h-full">
                            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                                {/* Contenedor de Imagen con Aspect Ratio */}
                                <div className="relative w-full aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={item.src}
                                        alt={item.titulo ?? 'Imagen Banner'}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {item.titulo && (
                                    <div className="p-4 md:p-5 flex gap-4 items-center mt-auto">
                                        {item.icono && (
                                            <div className="bg-green-100 text-green-700 rounded-full p-2.5 shrink-0 group-hover:bg-green-200 transition-colors">
                                                <Icono size={24} />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-lg md:text-xl font-medium group-hover:text-primary transition-colors">
                                                {item.titulo}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export const ImagenesCollage = ({ data }: IBanner) => {
    return (
        <div className="py-10 px-4 md:px-6">
            <div className="w-full max-w-7xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">Conoce el mundo Pulguitas!</h2>
                    <h4 className="text-sm text-muted-foreground">Encontra lo mejor para ellos.</h4>
                </div>

                {/* Bento Grid Responsivo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                    {data.map((item, index) => {
                        // El primer elemento ocupa 2 filas en pantallas medianas hacia arriba
                        const isLarge = index === 0;

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`
                  group relative overflow-hidden rounded-3xl bg-black border border-gray-200 
                  ${isLarge ? 'md:row-span-2 row-span-2' : 'col-span-1'}
                `}
                            >
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        src={item.src}
                                        alt={item.titulo ?? 'Banner'}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>

                                {/* Decoración de fondo */}
                                <div
                                    className={`
                    absolute -right-4 -top-4 w-32 h-32 rounded-full opacity-60 blur-3xl transition-opacity
                    ${index % 2 === 0 ? 'bg-purple-500/50' : 'bg-green-500/50'}
                  `}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full text-white z-10">
                                    <h3 className="text-xl md:text-2xl font-bold mb-1">{item.titulo}</h3>

                                    {item.subtitulo && (
                                        <div className="flex items-center gap-2 text-sm font-medium text-gray-200 group-hover:text-white group-hover:translate-x-1 transition-all">
                                            {item.subtitulo}
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
