import { CalendarClock, CreditCard, LucideIcon, Store, Truck, Zap } from 'lucide-react';

interface ICardBeneficios {
    icono: LucideIcon;
    titulo: string;
    subtitulo: string;
    onClick?: () => void;
}

const beneficios: ICardBeneficios[] = [
    { icono: Zap, titulo: 'Entrega Flash', subtitulo: 'en 1h' },
    { icono: Truck, titulo: 'Envío gratis', subtitulo: 'dentro de las 4 avenidas.' },
    { icono: Store, titulo: 'Retiro gratuito', subtitulo: 'en sucursal' },
    { icono: CreditCard, titulo: 'Medios de pago', subtitulo: 'y promociones' },
];
export const Beneficios = () => {
    return (
        <div className="w-full px-4 md:px-6 py-8">
            <div className="w-full max-w-7xl mx-auto">
                {/* Grid: 1 col (movil) -> 2 cols (tablet) -> 4 cols (desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {beneficios.map((item, index) => {
                        const Icon = item.icono;
                        return (
                            <div
                                key={index}
                                className="flex gap-4 items-center p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:bg-muted/50 transition-colors"
                            >
                                <div className="bg-green-100 p-3 rounded-full shrink-0">
                                    <Icon className="w-6 h-6 text-green-700" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm md:text-base">{item.titulo}</p>
                                    <span className="text-xs md:text-sm text-muted-foreground">{item.subtitulo}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
