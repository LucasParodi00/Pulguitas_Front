import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { convertirMoneda } from '@/lib/utils/conversorMoneda';

interface IProductoCard {
    titulo: string;
    descripcion: string;
    variantes: IProductoVariante[];
}

interface IProductoVariante {
    titulo: string;
    precio: number;
}

export const ProductoCard = ({ titulo, descripcion, variantes }: IProductoCard) => {
    return (
        <div className="text-xs font-extralight">
            <Card>
                <CardHeader>
                    <CardTitle className="font-normal">{titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        {variantes.map(item => (
                            <ProductoVariantes titulo={item.titulo} precio={item.precio} />
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <p>{descripcion}</p>
                </CardFooter>
            </Card>
        </div>
    );
};

export const ProductoVariantes = ({ titulo, precio }: IProductoVariante) => {
    return (
        <div>
            <p>{titulo}</p>
            <span>{convertirMoneda(precio)}</span>
        </div>
    );
};
