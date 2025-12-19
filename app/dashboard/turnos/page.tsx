'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useListarTurnos } from '@/features/servicios/hook/useServicio';
import { TurnosTable } from '@/features/servicios/componentes/ListaTurnos';

export default function AdminTurnosPage() {
    // 1. Definimos la configuración de paginación
    const LIMIT = 10; // Cantidad de items por página
    const [currentPage, setCurrentPage] = useState(1);

    // 2. Calculamos el offset basado en la página actual
    // Si estoy en pág 1: (1-1)*10 = 0. Si estoy en pág 2: (2-1)*10 = 10.
    const currentOffset = (currentPage - 1) * LIMIT;

    // 3. Pasamos offset y limit al hook (lo que tu API espera)
    const {
        data: response,
        isLoading,
        isError,
    } = useListarTurnos({
        offset: currentOffset,
        limit: LIMIT,
    });

    // 4. Manejadores de cambio de página
    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        // Verificamos si hay más páginas disponibles usando totalPages de tu respuesta
        if (response?.pagination && currentPage < response.pagination.totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    if (isError) {
        return <div className="p-8 text-red-500">Error al cargar turnos.</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Turnos</h1>
                    <p className="text-muted-foreground">Listado de citas programadas.</p>
                </div>
            </div>

            <TurnosTable data={response?.data || []} isLoading={isLoading} />

            {/* Controles de Paginación */}
            {response?.pagination && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="text-sm text-muted-foreground mr-4">
                        {/* Mostramos info amigable al usuario */}
                        Página {response.pagination.currentPage} de {response.pagination.totalPages}
                        <span className="ml-2 text-xs text-slate-400">(Total: {response.pagination.totalData})</span>
                    </div>

                    <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1 || isLoading}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Anterior
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage >= response.pagination.totalPages || isLoading}
                    >
                        Siguiente
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            )}
        </div>
    );
}
