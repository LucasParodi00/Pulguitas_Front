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
        <div className="grid grid-cols-4 gap-5 px-10">
            {beneficios.map((item, index) => {
                const Icon = item.icono;

                return (
                    <div key={index} className="flex gap-5 items-center p-5  rounded-xl border hover:bg-muted/50 duration-400">
                        <div className="bg-green-100 p-4 rounded-full ">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold">{item.titulo}</p>
                            <span className="text-sm text-muted-foreground">{item.subtitulo}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
