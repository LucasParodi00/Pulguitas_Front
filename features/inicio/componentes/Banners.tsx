import { ArrowRight, Clock1, LucideIcon, Store, UserSearch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface IImagenesBanner {
    src: string;
    titulo?: string;
    href: string;
    icono?: LucideIcon;
    ancho: number;
    altura: number;
    subtitulo?: string;
}

interface IBanner {
    data: IImagenesBanner[];
}

export const imagenes: IImagenesBanner[] = [
    {
        src: '/banner1.png',
        titulo: 'Ver tienda',
        href: '/productos',
        icono: Store,
        ancho: 430,
        altura: 270,
    },
    {
        src: '/banner2.png',
        titulo: 'Reservar Turno',
        href: '/turnos',
        icono: Clock1,
        ancho: 430,
        altura: 270,
    },
    {
        src: '/banner3.png',
        titulo: 'Conocenos',
        href: '/nosotros',
        icono: UserSearch,
        ancho: 430,
        altura: 270,
    },
];

export const imagenesCollage: IImagenesBanner[] = [
    {
        src: '/conocenos.png',
        altura: 310,
        ancho: 230,
        href: '/nosotros',
        titulo: 'Pulguitas.',
        subtitulo: 'Conocenos',
    },
    {
        src: '/adopciones.png',
        altura: 310,
        ancho: 230,
        href: '/adopciones',
        titulo: 'Adopciones',
        subtitulo: '',
    },
    {
        src: '/belleza.png',
        altura: 310,
        ancho: 230,
        href: '/servicios',
        titulo: 'Baño y Belleza',
        subtitulo: 'Reserva un turno.',
    },
    {
        src: '/veterinaria.png',
        altura: 310,
        ancho: 230,
        href: '/adopciones',
        titulo: 'Veterinaria',
        subtitulo: 'Consulta nuestros turnos disponibles.',
    },
    {
        src: '/envios.png',
        altura: 310,
        ancho: 230,
        href: '/adopciones',
        titulo: 'Envios',
        subtitulo: 'Envios Programados.',
    },
];

export const Banner = ({ data }: IBanner) => {
    return (
        <div className="py-10">
            <div>
                <h2 className="text-2xl font-semibold">Destacados! </h2>
                <h4 className="text-sm">Encontra lo mejor para ellos.</h4>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
                {data.map(item => {
                    const Icono = item.icono ?? Store;
                    return (
                        <Link key={item.titulo} href={item.href} className="overflow-hidden">
                            <div className="rounded-4xl overflow-hidden border-2 border-gray-300 bg-white hover:bg-muted duration-300 ">
                                <Image src={item.src} alt={item.titulo ?? 'Imagen Banner'} width={430} height={270} />
                                {item.titulo && (
                                    <div className="px-5 flex gap-5 items-center py-4">
                                        {item.icono && (
                                            <div className="bg-green-200 rounded-full p-2">
                                                <Icono size={30} />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-xl">{item.titulo}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export const ImagenesCollage = ({ data }: IBanner) => {
    return (
        <div className="py-10">
            <div>
                <h2 className="text-2xl font-semibold">Conoce el mundo Pulguitas! </h2>
                <h4 className="text-sm">Encontra lo mejor para ellos.</h4>
            </div>
            <section className="w-full max-w-7xl mx-auto p-4">
                {/* GRID CONTAINER:
         - grid-cols-1: 1 columna en móvil.
         - md:grid-cols-3: 3 columnas en escritorio.
         - auto-rows-[250px]: Cada fila tiene una altura base de 250px.
      */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
                    {data.map((item, index) => {
                        // LÓGICA DE POSICIONAMIENTO:
                        // Si es el primer elemento (index === 0), le decimos que ocupe 2 filas (row-span-2).
                        // Esto crea el efecto de la columna izquierda alta.
                        const isLarge = index === 0;

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`
                group relative overflow-hidden rounded-3xl bg-black border border-gray-200 duration-1000
                ${isLarge ? 'md:row-span-2' : 'md:col-span-1'}
              `}
                            >
                                {/* Fondo de Imagen con Next/Image */}
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        src={item.src}
                                        alt={item.titulo ?? 'Banner'}
                                        fill
                                        className="object-cover transition-all  group-hover:scale-105 opacity-80  group-hover:opacity-100 duration-500 ease-in-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Overlay / Decoración (Círculos de color) */}
                                {/* Puedes cambiar los colores bg-purple-500, bg-green-500 dinámicamente si quieres */}
                                <div
                                    className={`
                 absolute -right-4 -top-4 w-32 h-32 rounded-full opacity-80 blur-2xl transition-opacity
                 ${index % 2 === 0 ? 'bg-purple-500/40' : 'bg-green-500/40'}
              `}
                                />

                                {/* Contenido de Texto (Posicionado abajo a la izquierda como la referencia) */}
                                <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/60 to-transparent text-white">
                                    <div className="flex items-center gap-2 mb-1">
                                        {/* Renderizamos el icono dinámicamente */}

                                        <h3 className="text-2xl font-bold">{item.titulo}</h3>
                                    </div>

                                    {item.subtitulo && (
                                        <div className="flex items-center gap-1 text-sm font-medium opacity-90 group-hover:underline">
                                            {item.subtitulo}
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};
