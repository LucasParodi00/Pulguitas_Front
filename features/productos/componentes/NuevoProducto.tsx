'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Plus, Trash2, Save } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useActualizarProducto, useCrearProducto } from '../hooks/useProductos';

// --- ESQUEMAS CORREGIDOS ---

export const CATEGORIAS = ['balanceados', 'juguetes', 'accesorios', 'medicamentos', 'otros'] as const;
export const MASCOTAS_OPTIONS = ['Perro', 'Gato', 'Ave', 'Roedor', 'Otro'];
const promocionSchema = z
    .object({
        descuento: z.number().min(1, 'Descuento mínimo 1%').max(100, 'Descuento máximo 100%'),
        desdeDescuento: z.date(),
        hastaDescuento: z.date(),
    })
    .refine(data => data.hastaDescuento > data.desdeDescuento, {
        message: 'La fecha fin debe ser posterior a la fecha de inicio',
        path: ['hastaDescuento'],
    });

const presentacionSchema = z.object({
    nombre: z.string().min(1, 'El nombre de la presentación es requerido'),
    precio: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
    stock: z.number().min(0, 'El stock no puede ser negativo'),
    sku: z.string().optional(),
    tienePromocion: z.boolean().optional(),
    promocion: promocionSchema.optional(),
});

export const formSchema = z.object({
    nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    descripcion: z.string().optional(),
    categoria: z.string().min(1, 'La categoría es requerida'),
    mascotas: z.array(z.string()).refine(value => value.length > 0, {
        message: 'Debes seleccionar al menos una mascota.',
    }),
    activo: z.boolean().default(true).optional(),
    presentaciones: z.array(presentacionSchema).min(1, 'Debes agregar al menos una presentación'),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface INuevoProducto {
    onClose?: () => void;
    productoAEditar?: any;
}

export const NuevoProducto = ({ onClose, productoAEditar }: INuevoProducto) => {
    const crearMutation = useCrearProducto();
    const actualizarMutation = useActualizarProducto();

    const isEditing = !!productoAEditar;
    const isSaving = crearMutation.isPending || actualizarMutation.isPending;

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: '',
            categoria: '',
            descripcion: '',
            activo: true,
            mascotas: [],
            presentaciones: [{ nombre: 'Unidad', precio: 0, stock: 0, tienePromocion: false }],
        },
        mode: 'onChange',
    });

    const { fields, append, remove } = useFieldArray({
        name: 'presentaciones',
        control: form.control,
    });

    useEffect(() => {
        if (productoAEditar) {
            const valoresFormateados = {
                ...productoAEditar,
                presentaciones: productoAEditar.presentaciones.map((p: any) => ({
                    ...p,
                    tienePromocion: !!p.promocion,
                    promocion: p.promocion
                        ? {
                              ...p.promocion,
                              desdeDescuento: new Date(p.promocion.desdeDescuento),
                              hastaDescuento: new Date(p.promocion.hastaDescuento),
                          }
                        : undefined,
                })),
            };
            form.reset(valoresFormateados);
        } else {
            form.reset({
                nombre: '',
                categoria: '',
                descripcion: '',
                activo: true,
                mascotas: [],
                presentaciones: [{ nombre: 'Unidad', precio: 0, stock: 0, tienePromocion: false }],
            });
        }
    }, [productoAEditar, form]);

    const onSubmit = (data: ProductFormValues) => {
        const payload: any = {
            ...data,
            presentaciones: data.presentaciones.map(p => {
                const { tienePromocion, promocion, ...rest } = p;
                return tienePromocion && promocion ? { ...rest, promocion } : { ...rest, promocion: undefined };
            }),
        };

        if (isEditing) {
            actualizarMutation.mutate(
                { id: productoAEditar._id, data: payload },
                {
                    onSuccess: () => onClose?.(),
                },
            );
        } else {
            crearMutation.mutate(payload, {
                onSuccess: () => onClose?.(),
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold tracking-tight">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? 'Guardando...' : 'Guardar Producto'}
                            <Save className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* --- DATOS GENERALES --- */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información General</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Producto</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: Royal Canin Adulto" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoria"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoría</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona una categoría" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {CATEGORIAS.map(cat => (
                                                    <SelectItem key={cat} value={cat} className="capitalize">
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descripción detallada del producto..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="mascotas"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Mascotas dirigidas</FormLabel>
                                        <FormDescription>Selecciona para qué tipo de mascotas es este producto.</FormDescription>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {MASCOTAS_OPTIONS.map(item => (
                                            <FormField
                                                key={item}
                                                control={form.control}
                                                name="mascotas"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={(field.value || []).includes(item)}
                                                                    onCheckedChange={checked => {
                                                                        const currentValue = field.value || [];
                                                                        return checked
                                                                            ? field.onChange([...currentValue, item])
                                                                            : field.onChange(
                                                                                  currentValue.filter(
                                                                                      (value: string) => value !== item,
                                                                                  ),
                                                                              );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">{item}</FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="activo"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Producto Activo</FormLabel>
                                        <FormDescription>Si está desactivado no aparecerá en la tienda.</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* --- PRESENTACIONES --- */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Presentaciones y Precios</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ nombre: '', precio: 0, stock: 0, tienePromocion: false })}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Agregar Presentación
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <Card key={field.id} className="relative">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-medium">Presentación #{index + 1}</CardTitle>
                                {fields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-4 top-4 text-destructive hover:text-destructive"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`presentaciones.${index}.nombre`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`presentaciones.${index}.sku`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SKU</FormLabel>
                                                <FormControl>
                                                    <Input {...field} value={field.value || ''} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`presentaciones.${index}.stock`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stock</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        value={field.value}
                                                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name={`presentaciones.${index}.precio`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Precio ($)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    {...field}
                                                    value={field.value}
                                                    onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Separator className="my-2" />

                                <FormField
                                    control={form.control}
                                    name={`presentaciones.${index}.tienePromocion`}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Aplicar Promoción</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {form.watch(`presentaciones.${index}.tienePromocion`) && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/30 p-4 rounded-md border border-dashed">
                                        <FormField
                                            control={form.control}
                                            name={`presentaciones.${index}.promocion.descuento`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>% Descuento</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            max="100"
                                                            {...field}
                                                            value={field.value || ''}
                                                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`presentaciones.${index}.promocion.desdeDescuento`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Desde</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="datetime-local"
                                                            {...field}
                                                            value={
                                                                field.value
                                                                    ? new Date(field.value).toISOString().slice(0, 16)
                                                                    : ''
                                                            }
                                                            onChange={e => field.onChange(new Date(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`presentaciones.${index}.promocion.hastaDescuento`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Hasta</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="datetime-local"
                                                            {...field}
                                                            value={
                                                                field.value
                                                                    ? new Date(field.value).toISOString().slice(0, 16)
                                                                    : ''
                                                            }
                                                            onChange={e => field.onChange(new Date(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </form>
        </Form>
    );
};
