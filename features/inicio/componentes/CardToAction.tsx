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
                    <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
                        <div className="flex gap-5">
                            <Badge variant="secondary">Veterinara</Badge>
                            <Badge variant={'secondary'}> Petshop Integral</Badge>
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
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
                                className="h-12 px-8 text-base shadow-lg hover:translate-y-[-2px] transition-all"
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
                                className="h-12 px-8 text-base hover:bg-secondary/50 transition-all"
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

                    <div className="relative mx-auto lg:ml-auto w-full max-w-[500px] aspect-square lg:max-w-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary rounded-full blur-3xl opacity-50 transform translate-x-10 translate-y-10" />

                        <div className="relative rounded-3xl overflow-hidden border bg-background shadow-2xl h-full w-full">
                            <Image
                                src="/cardToAction.png"
                                alt="Perro feliz en la veterinaria"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
