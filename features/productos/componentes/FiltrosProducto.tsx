'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FilterX } from 'lucide-react';
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
        setFiltros(prev => ({
            ...prev,
            [campo]: valor,
        }));
    };

    const handleAplicar = () => {
        onAplicarFiltros(filtros);
    };

    const handleLimpiar = () => {
        setFiltros({
            marca: 'all',
            categoria: 'all',
            mascota: 'all',
        });
        onLimpiarFiltros();
    };

    const hayFiltrosActivos = filtros.marca !== 'all' || filtros.categoria !== 'all' || filtros.mascota !== 'all';

    return (
        <Card className="my-2">
            <CardContent className="">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 justify-center items-end">
                    {/* Select Marca */}
                    <div className="space-y-1">
                        <Label htmlFor="marca" className="text-sm font-medium">
                            Marca
                        </Label>
                        <Select value={filtros.marca} onValueChange={value => handleFiltroChange('marca', value)}>
                            <SelectTrigger id="marca" className="w-full">
                                <SelectValue placeholder="Todas las marcas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="marca1">Agility</SelectItem>
                                <SelectItem value="marca2">Sieger</SelectItem>
                                <SelectItem value="marca3">Purina CatShaw</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="categoria" className="text-sm font-medium">
                            Categoría
                        </Label>
                        <Select value={filtros.categoria} onValueChange={value => handleFiltroChange('categoria', value)}>
                            <SelectTrigger id="categoria" className="w-full">
                                <SelectValue placeholder="Todas las categorías" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Todas las categorias</SelectLabel>
                                    <SelectItem value="balanceados">Alimentos - Balanceados</SelectItem>
                                    <SelectItem value="juguete">Juguetes</SelectItem>
                                    <SelectItem value="accesorio">Accesorios</SelectItem>
                                    <SelectItem value="medicamento">Medicamentos</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="mascota" className="text-sm font-medium ">
                            Mascota
                        </Label>
                        <Select value={filtros.mascota} onValueChange={value => handleFiltroChange('mascota', value)}>
                            <SelectTrigger id="mascota" className="w-full">
                                <SelectValue placeholder="Todas las mascotas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="perro">Perro</SelectItem>
                                <SelectItem value="gato">Gato</SelectItem>
                                <SelectItem value="ave">Ave</SelectItem>
                                <SelectItem value="pez">Pez</SelectItem>
                                <SelectItem value="roedor">Roedor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={handleAplicar} className="flex-1 sm:flex-none">
                            Aplicar Filtros
                        </Button>
                        {hayFiltrosActivos && (
                            <Button onClick={handleLimpiar} variant="outline" size="icon" className="shrink-0 bg-transparent">
                                <FilterX className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
