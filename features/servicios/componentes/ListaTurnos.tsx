'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Calendar, Clock, PawPrint, User, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ITurno } from '../types/turnos.type';

interface TurnosTableProps {
    data: ITurno[];
    isLoading: boolean;
}

export function TurnosTable({ data, isLoading }: TurnosTableProps) {
    const getStatusBadge = (estado: string) => {
        const styles: Record<string, string> = {
            pendiente: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200',
            confirmado: 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200',
            cancelado: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200',
            realizado: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200',
        };

        return (
            <Badge variant="outline" className={`capitalize ${styles[estado] || ''}`}>
                {estado}
            </Badge>
        );
    };

    if (isLoading) {
        return <div className="p-4 text-center text-muted-foreground">Cargando turnos...</div>;
    }

    if (!data || data.length === 0) {
        return (
            <div className="p-10 text-center border rounded-md bg-slate-50 text-muted-foreground">No hay turnos registrados.</div>
        );
    }

    return (
        <div className="rounded-md border bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Horario</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Detalle Servicio</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(turno => (
                        <TableRow key={turno._id}>
                            {/* FECHA */}
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center text-sm font-medium">
                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                        {format(new Date(turno.start), 'dd MMM yyyy', { locale: es })}
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="mr-2 h-3 w-3" />
                                        {format(new Date(turno.start), 'HH:mm')} - {format(new Date(turno.end), 'HH:mm')}
                                    </div>
                                </div>
                            </TableCell>

                            {/* PACIENTE */}
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                                        <PawPrint className="h-4 w-4 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{turno.nombreMascota}</p>
                                        <p className="text-xs text-muted-foreground capitalize">{turno.especieMascota}</p>
                                    </div>
                                </div>
                            </TableCell>

                            {/* CLIENTE */}
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium flex items-center gap-1">
                                        <User className="h-3 w-3 text-muted-foreground" />
                                        {turno.nombreCliente}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{turno.telefonoCliente}</span>
                                </div>
                            </TableCell>

                            {/* SERVICIO */}
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-2 w-2 rounded-full"
                                            style={{ backgroundColor: turno.tipoServicioId.color }}
                                        />
                                        <span className="text-sm font-medium">{turno.tipoServicioId.nombre}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        {turno.consultorioId.nombre}
                                    </div>
                                </div>
                            </TableCell>

                            {/* ESTADO */}
                            <TableCell>{getStatusBadge(turno.estado)}</TableCell>

                            {/* ACCIONES */}
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Abrir menú</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                                        <DropdownMenuItem>Editar turno</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Cancelar cita</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
