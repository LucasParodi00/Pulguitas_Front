import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Stethoscope, ShoppingBag, Heart, MapPin, CheckCircle2, Clock } from 'lucide-react';

const Page = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
                        alt="Perro feliz en veterinaria"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                </div>
                <div className="relative z-10 container px-4 text-center text-white">
                    <Badge className="mb-4 bg-primary/80 hover:bg-primary text-white border-none px-4 py-1 text-sm">
                        Desde 2021 en Corrientes
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Cuidando lo que más amas</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-100">
                        Somos tu centro integral de bienestar animal. Combinamos la calidez de la atención local con la excelencia
                        médica veterinaria.
                    </p>
                </div>
            </section>

            {/* --- NUESTRA HISTORIA --- */}
            <section className="py-20 container px-4 mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tighter text-primary">Nuestra Historia</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Nacimos en 2021 en el corazón de <strong>Corrientes, Argentina</strong>, con una misión clara: ofrecer
                            un servicio que nosotros mismos quisiéramos para nuestras mascotas. Lo que comenzó como un sueño
                            familiar, hoy es un referente en el cuidado animal.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Entendemos que una mascota no es solo un animal, es parte de la familia. Por eso, hemos integrado en
                            un solo lugar todo lo necesario: desde la mejor nutrición hasta diagnósticos médicos avanzados.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium pt-4">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span>Orgullosamente correntinos</span>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <Image
                            src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?q=80&w=2070&auto=format&fit=crop"
                            alt="Equipo veterinario"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <Separator className="my-8" />

            {/* --- NUESTROS SERVICIOS (DUALIDAD PETSHOP / VETERINARIA) --- */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="container px-4 mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Soluciones Integrales</h2>
                        <p className="text-muted-foreground">
                            Dividimos nuestra pasión en dos grandes áreas para cubrir todas las necesidades de tu compañero.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card Petshop */}
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                                    <ShoppingBag className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <CardTitle className="text-2xl">Petshop Premium</CardTitle>
                                <CardDescription>Todo para el día a día y el disfrute.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                                        <span>
                                            <strong>Alimentos Balanceados:</strong> Marcas líderes y dietas prescriptas.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                                        <span>
                                            <strong>Farmacia Veterinaria:</strong> Medicamentos completos y pipetas.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                                        <span>
                                            <strong>Juguetes y Accesorios:</strong> Diversión y confort garantizado.
                                        </span>
                                    </li>
                                </ul>
                                <div className="mt-6 h-48 relative rounded-md overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop"
                                        alt="Estantería Petshop"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card Veterinaria */}
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                                    <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <CardTitle className="text-2xl">Clínica Veterinaria</CardTitle>
                                <CardDescription>Tecnología y ciencia al servicio de la salud.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5" />
                                        <span>
                                            <strong>Diagnóstico por Imágenes:</strong> Radiografía digital y ecografías.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5" />
                                        <span>
                                            <strong>Consulta Clínica:</strong> Atención general y especialidades.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5" />
                                        <span>
                                            <strong>Laboratorio:</strong> Análisis clínicos rápidos y precisos.
                                        </span>
                                    </li>
                                </ul>
                                <div className="mt-6 h-48 relative rounded-md overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
                                        alt="Consulta Veterinaria"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* --- VALORES / FEATURE SECTION --- */}
            <section className="py-20 container px-4 mx-auto">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 rounded-lg bg-card border">
                        <Heart className="w-10 h-10 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Amor por los Animales</h3>
                        <p className="text-muted-foreground text-sm">
                            Tratamos a cada paciente con el cariño y respeto que merece.
                        </p>
                    </div>
                    <div className="p-6 rounded-lg bg-card border">
                        <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Trayectoria</h3>
                        <p className="text-muted-foreground text-sm">
                            Desde 2021 construyendo confianza con las familias de Corrientes.
                        </p>
                    </div>
                    <div className="p-6 rounded-lg bg-card border">
                        <Stethoscope className="w-10 h-10 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Profesionalismo</h3>
                        <p className="text-muted-foreground text-sm">
                            Equipo capacitado y equipamiento moderno para diagnósticos certeros.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Tu mascota necesita atención?</h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Visítanos en nuestra sucursal o agenda un turno online para el servicio veterinario.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="font-semibold">
                            Agendar Turno
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10 text-primary-foreground"
                        >
                            Ver Catálogo Online
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
