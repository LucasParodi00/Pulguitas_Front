// components/ServiceCard.tsx
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Activity } from 'lucide-react'; // Iconos recomendados
import { IService } from '../types/servicio.type';

interface ServiceCardProps {
    service: IService;
}

export default function ServicioCard({ service }: ServiceCardProps) {
    return (
        <Link href={`/servicios/${service._id}`} className="block h-full group">
            <Card
                className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden border-t-4"
                // Aquí usamos el color dinámico de tu API
                style={{ borderTopColor: service.color }}
            >
                <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                            {service.nombre}
                        </CardTitle>
                        {/* Badge opcional para el tipo de atención */}
                        <Badge variant="secondary" className="text-xs">
                            <Activity className="w-3 h-3 mr-1" />
                            {service.tipoAtencionRequerida}
                        </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2">{service.descripcion}</CardDescription>
                </CardHeader>

                <CardContent>
                    {/* Aquí podrías poner una imagen si tuvieras, o más detalles */}
                    <div className="w-full h-24 bg-gray-50 rounded-md flex items-center justify-center text-gray-400 text-sm italic">
                        Icono o Imagen del servicio
                    </div>
                </CardContent>

                <CardFooter className="flex items-center text-sm text-gray-500 gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{service.duracionMinutos} minutos</span>
                </CardFooter>
            </Card>
        </Link>
    );
}
