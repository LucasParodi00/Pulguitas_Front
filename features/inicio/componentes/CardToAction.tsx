import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Stethoscope, ArrowRight, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const CardToAction = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-10 lg:grid-cols-2 items-center">
                    {/* Contenido de Texto */}
                    <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                        <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                            <Badge variant="secondary" className="text-sm px-3 py-1">
                                Veterinaria
                            </Badge>
                            <Badge variant="secondary" className="text-sm px-3 py-1">
                                Petshop Integral
                            </Badge>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter">
                            Cuidamos lo que <br className="hidden lg:block" />
                            <span className="text-primary">más amas.</span>
                        </h1>

                        <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                            Desde alimentos premium y juguetes hasta cirugías y vacunación. Somos el centro integral para la salud
                            y felicidad de tu mascota.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 px-8 text-base shadow-lg hover:translate-y-[-2px] transition-all w-full sm:w-auto"
                            >
                                <Link href="/productos">
                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                    Productos
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-12 px-8 text-base w-full sm:w-auto hover:bg-secondary/50"
                            >
                                <Link href="/servicios">
                                    <Stethoscope className="mr-2 h-5 w-5 text-primary" />
                                    Reservar Turno
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start pt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" /> Envíos a domicilio
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" /> Urgencias 24hs
                            </div>
                        </div>
                    </div>

                    {/* Imagen Hero */}
                    <div className="relative order-1 lg:order-2 w-full max-w-[400px] lg:max-w-none mx-auto aspect-square">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary rounded-full blur-3xl opacity-50 transform translate-x-10 translate-y-10" />

                        <div className="relative rounded-3xl overflow-hidden border bg-background shadow-2xl h-full w-full">
                            <Image
                                src="/cardToAction.png"
                                alt="Perro feliz en la veterinaria"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
