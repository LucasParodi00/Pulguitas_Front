'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { format, parseISO, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, Clock, CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useObtenerDisponibilidad } from '@/features/servicios/hook/useServicio';
import { ISlot } from '@/features/servicios/types/turnos.type';
import TurnoConfirmationForm from '@/features/servicios/componentes/FormularioTurno';

export default function PageTurnos() {
    const params = useParams();
    const serviceId = params.id as string;
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 11, 1));

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);

    const mesQuery = currentDate.getMonth() + 1;
    const anioQuery = currentDate.getFullYear();

    const { data, isLoading, isFetching } = useObtenerDisponibilidad(serviceId, mesQuery, anioQuery);
    const disponibilidad = data?.data;

    const diasHabilitados = useMemo(() => {
        if (!disponibilidad?.dias) return [];

        return disponibilidad.dias.filter(dia => dia.consultorios.length > 0).map(dia => parseISO(dia.fechaISO));
    }, [disponibilidad]);

    const slotsDelDia = useMemo(() => {
        if (!selectedDate || !disponibilidad?.dias) return [];
        const diaEncontrado = disponibilidad.dias.find(d => isSameDay(parseISO(d.fechaISO), selectedDate));

        if (!diaEncontrado) return [];

        const todosLosSlots = diaEncontrado.consultorios.flatMap(c =>
            c.slots.map(slot => ({
                ...slot,
                consultorioId: c.consultorioId,
            })),
        );

        return todosLosSlots.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
    }, [selectedDate, disponibilidad]);

    const handleBooking = () => {
        if (!selectedSlot) return;

        setIsConfirmationOpen(true);

        console.log('Enviando al backend:', selectedSlot.start);

        toast.success(`Turno reservado a las ${selectedSlot.horaInicio} hs`);
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- COLUMNA IZQUIERDA: CALENDARIO --- */}
                <div className="lg:col-span-5 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Selecciona una fecha</CardTitle>
                            <CardDescription>
                                {/* Nombre del servicio dinámico */}
                                {disponibilidad?.tipoConsulta?.nombre || 'Cargando servicio...'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center relative">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={date => {
                                    setSelectedDate(date);
                                    setSelectedSlot(null); // Reseteamos el slot al cambiar de día
                                }}
                                month={currentDate}
                                onMonthChange={setCurrentDate} // Actualiza la query al navegar meses
                                locale={es}
                                // Deshabilitamos días que no estén en nuestra lista de diasHabilitados
                                disabled={[
                                    date => !diasHabilitados.some(d => isSameDay(d, date)),
                                    // Opcional: Bloquear días pasados
                                    // { before: new Date() }
                                ]}
                                className="rounded-md border p-4 pointer-events-auto"
                                // Estilo visual para días disponibles
                                modifiers={{ disponible: diasHabilitados }}
                                modifiersStyles={{
                                    disponible: {
                                        fontWeight: 'bold',
                                        color: 'var(--primary)',
                                        textDecoration: 'underline decoration-2 underline-offset-4',
                                    },
                                }}
                            />

                            {/* Overlay de carga cuando cambiamos de mes */}
                            {isFetching && (
                                <div className="absolute inset-0 bg-white/50 flex items-center justify-center backdrop-blur-sm z-10 rounded-md">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* --- COLUMNA DERECHA: GRILLA DE HORARIOS --- */}
                <div className="lg:col-span-7">
                    <Card className="h-full border-none shadow-none lg:border lg:shadow-sm flex flex-col relative overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Horarios Disponibles
                            </CardTitle>
                            <CardDescription>
                                {selectedDate
                                    ? format(selectedDate, "EEEE d 'de' MMMM", { locale: es })
                                    : 'Selecciona un día en el calendario para ver los horarios.'}
                            </CardDescription>
                        </CardHeader>

                        <Separator className="mb-6 mx-6 w-auto" />

                        <CardContent className="flex-1">
                            {/* ESTADO 1: Nada seleccionado */}
                            {!selectedDate && (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-400 h-full">
                                    <CalendarIcon className="w-16 h-16 mb-4 opacity-20" />
                                    <p>Esperando selección de fecha...</p>
                                </div>
                            )}

                            {/* ESTADO 2: Día seleccionado pero sin slots */}
                            {selectedDate && slotsDelDia.length === 0 && (
                                <div className="text-center py-12 px-4 text-amber-600 bg-amber-50 rounded-lg border border-amber-100 mx-2">
                                    <p className="font-semibold">Sin disponibilidad</p>
                                    <p className="text-sm mt-1">No hay turnos libres para este día.</p>
                                </div>
                            )}

                            {/* ESTADO 3: Slots disponibles */}
                            {selectedDate && slotsDelDia.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    {slotsDelDia.map((slot, idx) => {
                                        const isSelected = selectedSlot?.start === slot.start;

                                        return (
                                            <Button
                                                key={`${slot.start}-${idx}`}
                                                variant={isSelected ? 'default' : 'outline'}
                                                className={`h-auto py-3 flex flex-col items-center gap-1 transition-all hover:border-primary ${
                                                    isSelected ? 'ring-2 ring-offset-2 ring-primary scale-105' : ''
                                                }`}
                                                // CORRECCIÓN: Guardamos todo el objeto slot
                                                onClick={() => setSelectedSlot(slot)}
                                            >
                                                {/* CORRECCIÓN: Usamos horaInicio string para mostrar, ignoramos timezone */}
                                                <span className="text-lg font-bold">{slot.horaInicio}</span>
                                            </Button>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>

                        {/* --- BARRA INFERIOR DE ACCIÓN (STICKY) --- */}
                        {selectedSlot && (
                            <div className="p-6 bg-gray-50 border-t mt-auto sticky bottom-0 z-20 animate-in slide-in-from-bottom-full duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="text-center sm:text-left">
                                        <p className="text-sm text-gray-500 font-medium">Estás reservando para el:</p>
                                        <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                                            {/* CORRECCIÓN: Mostramos horaInicio limpia */}
                                            <span className="font-bold text-primary text-2xl">{selectedSlot.horaInicio} hs</span>
                                            <span className="text-sm text-gray-600">
                                                del {format(parseISO(selectedSlot.start), 'dd/MM/yyyy')}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto font-bold text-md shadow-lg shadow-primary/20"
                                        onClick={handleBooking}
                                    >
                                        Continuar
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
            <TurnoConfirmationForm
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                selectedSlot={selectedSlot}
                tipoConsultaId={serviceId}
            />
        </div>
    );
}
