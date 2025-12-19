'use client';

import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner'; // O "@/components/ui/use-toast" dependiendo de tu versión

// --- 1. DEFINICIÓN DEL ESQUEMA DE VALIDACIÓN (ZOD) ---
const formSchema = z.object({
    name: z.string().min(2, {
        message: 'El nombre debe tener al menos 2 caracteres.',
    }),
    email: z.string().email({
        message: 'Por favor ingresa un email válido.',
    }),
    phone: z.string().min(10, {
        message: 'Ingresa un número válido (mínimo 10 dígitos).',
    }),
    subject: z.string({
        message: 'Por favor selecciona un motivo de contacto.',
    }),
    message: z
        .string()
        .min(10, {
            message: 'El mensaje debe tener al menos 10 caracteres.',
        })
        .max(500, {
            message: 'El mensaje no puede exceder los 500 caracteres.',
        }),
});

const Page = () => {
    // --- 2. INICIALIZACIÓN DEL FORMULARIO ---
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    // --- 3. MANEJO DEL ENVÍO ---
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Aquí iría tu lógica de envío al backend o API
        console.log(values);

        toast('¡Mensaje enviado!', {
            description: 'Nos pondremos en contacto contigo a la brevedad.',
        });

        form.reset();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* --- HERO HEADER --- */}
            <section className="relative h-[300px] w-full mb-12 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <Image
                    src="https://images.pexels.com/photos/6235242/pexels-photo-6235242.jpeg"
                    alt="Contacto Veterinaria"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="relative z-20 text-center text-white px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
                    <p className="text-lg opacity-90">Estamos aquí para ayudarte a ti y a tu mascota</p>
                </div>
            </section>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* --- COLUMNA IZQUIERDA: INFORMACIÓN --- */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-6">Información de la Clínica</h2>
                            <p className="text-muted-foreground mb-8 text-lg">
                                Ya sea para agendar una consulta veterinaria, consultar por stock de alimentos o simplemente
                                saludar, nuestras puertas están abiertas.
                            </p>

                            <div className="space-y-6">
                                {/* Item Dirección */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Ubicación</h3>
                                        <p className="text-muted-foreground">Av. 3 de Abril 1234</p>
                                        <p className="text-muted-foreground">Corrientes Capital, CP 3400</p>
                                    </div>
                                </div>

                                {/* Item Teléfono */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Teléfono / WhatsApp</h3>
                                        <p className="text-muted-foreground">+54 379 444-5555</p>
                                        <p className="text-sm text-muted-foreground text-green-600 font-medium">
                                            Disponible para urgencias
                                        </p>
                                    </div>
                                </div>

                                {/* Item Horarios */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Clock className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Horarios de Atención</h3>
                                        <p className="text-muted-foreground">Lun - Vie: 8:00hs a 20:00hs</p>
                                        <p className="text-muted-foreground">Sábados: 9:00hs a 13:00hs</p>
                                        <p className="text-muted-foreground">Domingos: Cerrado (Guardia telefónica)</p>
                                    </div>
                                </div>

                                {/* Item Email */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Correo Electrónico</h3>
                                        <p className="text-muted-foreground">info@tuveterinaria.com.ar</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mapa Embedido (Placeholder visual) */}
                        <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden relative border shadow-sm">
                            <Image
                                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2831&auto=format&fit=crop"
                                alt="Mapa de corrientes"
                                fill
                                className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <Button variant="secondary" className="shadow-lg">
                                    <MapPin className="mr-2 h-4 w-4" /> Ver en Google Maps
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: FORMULARIO --- */}
                    <div>
                        <Card className="shadow-xl border-t-4 border-t-primary">
                            <CardHeader>
                                <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
                                <CardDescription>Completa el formulario y te responderemos en menos de 24hs.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Campo Nombre */}
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nombre completo</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Juan Pérez" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Campo Email */}
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="juan@ejemplo.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Campo Teléfono */}
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Teléfono</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="3794..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Campo Selección de Motivo */}
                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Motivo de consulta</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecciona un tema" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="turno_veterinaria">Turno Veterinario</SelectItem>
                                                            <SelectItem value="consulta_producto">
                                                                Consulta sobre Producto (Petshop)
                                                            </SelectItem>
                                                            <SelectItem value="urgencia">Urgencia / Consulta Médica</SelectItem>
                                                            <SelectItem value="otros">Otros</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Campo Mensaje */}
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mensaje</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Hola, quisiera saber si tienen stock de..."
                                                            className="resize-none min-h-[120px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button type="submit" className="w-full text-lg h-12">
                                            <Send className="mr-2 h-4 w-4" /> Enviar Mensaje
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
