'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCrearTurno } from '../hook/useServicio';
import { ISlot } from '../types/turnos.type';
import { toast } from 'sonner';

const formSchema = z.object({
    nombreCliente: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'Máximo 100 caracteres'),
    emailCliente: z.string().email('Debe ser un email válido').optional().or(z.literal('')), // Permite string vacío si es opcional
    telefonoCliente: z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Formato de teléfono inválido'),
    nombreMascota: z.string().min(2, 'Mínimo 2 caracteres').max(50, 'Máximo 50 caracteres'),
    especieMascota: z.string().min(2, 'Mínimo 2 caracteres'),
    notas: z.string().max(500, 'Máximo 500 caracteres').optional(),
});

interface TurnoConfirmationFormProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSlot: ISlot | null;
    tipoConsultaId: string;
}

export default function TurnoConfirmationForm({ isOpen, onClose, selectedSlot, tipoConsultaId }: TurnoConfirmationFormProps) {
    const { mutate, isPending } = useCrearTurno();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombreCliente: '',
            emailCliente: '',
            telefonoCliente: '',
            nombreMascota: '',
            especieMascota: '',
            notas: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!selectedSlot) return;

        // Asegurar formato ISO 8601
        let startISO: string;

        console.log(values);
        if (typeof selectedSlot.start === 'string') {
            // Si ya es string, intentar parsearlo y reconvertirlo para asegurar formato
            const date = new Date(selectedSlot.start);
            startISO = date.toISOString();
        } else {
            // Si es Date, convertir a ISO
            startISO = selectedSlot.start;
        }

        mutate(
            {
                ...values,
                start: startISO,
                consultorioId: selectedSlot.consultorioId,
                tipoConsultaId: tipoConsultaId,
            },
            {
                onSuccess: () => {
                    form.reset();
                    onClose();
                    toast.success('¡Turno reservado exitosamente!');
                },
                onError: (error: any) => {
                    console.error('❌ Error:', error);
                    const mensaje = error?.response?.data?.error?.message || 'Error al reservar el turno';
                    toast.error(mensaje);
                },
            },
        );
    };

    if (!selectedSlot) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Confirmar Reserva</DialogTitle>
                    <DialogDescription>
                        Completá los datos para agendar tu turno el{' '}
                        <span className="font-bold text-primary">
                            {format(parseISO(selectedSlot.start), "EEEE d 'de' MMMM", { locale: es })}
                        </span>{' '}
                        a las <span className="font-bold text-primary">{selectedSlot.horaInicio} hs</span>.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        {/* Sección Cliente */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nombreCliente"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tu Nombre *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Juan Pérez" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="telefonoCliente"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="3794..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="emailCliente"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email (Opcional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="juan@ejemplo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Separador Visual */}
                        <div className="border-t pt-4 mt-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-3">Datos del Paciente</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="nombreMascota"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre Mascota *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Firulais" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="especieMascota"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Especie *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Perro, Gato, etc." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="notas"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notas Adicionales</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Es agresivo con otros perros, primera vez, etc."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Confirmar Turno
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
