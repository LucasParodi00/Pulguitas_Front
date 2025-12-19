'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FilterX, Search } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface IFiltros {
    marca: string;
    categoria: string;
    mascota: string;
}

interface FiltrosProductosProps {
    filtrosIniciales?: Partial<IFiltros>;
    onAplicarFiltros: (filtros: IFiltros) => void;
    onLimpiarFiltros: () => void;
}

export const FiltrosProductos = ({ filtrosIniciales = {}, onAplicarFiltros, onLimpiarFiltros }: FiltrosProductosProps) => {
    const [filtros, setFiltros] = useState<IFiltros>({
        marca: filtrosIniciales.marca || 'all',
        categoria: filtrosIniciales.categoria || 'all',
        mascota: filtrosIniciales.mascota || 'all',
    });

    const handleFiltroChange = (campo: keyof IFiltros, valor: string) => {
        setFiltros(prev => ({ ...prev, [campo]: valor }));
    };

    const handleAplicar = () => onAplicarFiltros(filtros);

    const handleLimpiar = () => {
        setFiltros({ marca: 'all', categoria: 'all', mascota: 'all' });
        onLimpiarFiltros();
    };

    const hayFiltrosActivos = filtros.marca !== 'all' || filtros.categoria !== 'all' || filtros.mascota !== 'all';

    return (
        <Card className="my-4 border-none shadow-sm bg-gray-50/50">
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    {/* Select Marca */}
                    <div className="space-y-2">
                        <Label htmlFor="marca" className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                            Marca
                        </Label>
                        <Select value={filtros.marca} onValueChange={value => handleFiltroChange('marca', value)}>
                            <SelectTrigger id="marca" className="w-full bg-white">
                                <SelectValue placeholder="Todas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las marcas</SelectItem>
                                <SelectItem value="marca1">Agility</SelectItem>
                                <SelectItem value="marca2">Sieger</SelectItem>
                                <SelectItem value="marca3">Purina CatChow</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="categoria"
                            className="text-xs font-semibold uppercase text-muted-foreground tracking-wide"
                        >
                            Categoría
                        </Label>
                        <Select value={filtros.categoria} onValueChange={value => handleFiltroChange('categoria', value)}>
                            <SelectTrigger id="categoria" className="w-full bg-white">
                                <SelectValue placeholder="Todas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categorías</SelectLabel>
                                    <SelectItem value="all">Todas</SelectItem>
                                    <SelectItem value="balanceados">Alimentos - Balanceados</SelectItem>
                                    <SelectItem value="juguete">Juguetes</SelectItem>
                                    <SelectItem value="accesorio">Accesorios</SelectItem>
                                    <SelectItem value="medicamento">Medicamentos</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mascota" className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                            Mascota
                        </Label>
                        <Select value={filtros.mascota} onValueChange={value => handleFiltroChange('mascota', value)}>
                            <SelectTrigger id="mascota" className="w-full bg-white">
                                <SelectValue placeholder="Todas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="perro">Perro</SelectItem>
                                <SelectItem value="gato">Gato</SelectItem>
                                <SelectItem value="ave">Ave</SelectItem>
                                <SelectItem value="pez">Pez</SelectItem>
                                <SelectItem value="roedor">Roedor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-2 w-full pt-2 sm:pt-0">
                        <Button onClick={handleAplicar} className="flex-1 shadow-sm">
                            <Search className="w-4 h-4 mr-2" />
                            Aplicar
                        </Button>
                        {hayFiltrosActivos && (
                            <Button
                                onClick={handleLimpiar}
                                variant="outline"
                                size="icon"
                                className="shrink-0 bg-white border-dashed text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-red-50"
                                title="Limpiar filtros"
                            >
                                <FilterX className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
