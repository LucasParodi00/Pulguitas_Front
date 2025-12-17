'use client';

import { Productos } from '@/features/productos/componentes/Productos';
import { useParams } from 'next/navigation';

const Page = () => {
    const params = useParams();
    const categoria = params.categoria as string;

    return <Productos categoriaInicial={categoria} />;
};

export default Page;
