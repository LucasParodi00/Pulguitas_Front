'use client';
import { ErrorCard } from '@/components/common/ErrorCard';
import { LoadingData } from '@/components/common/LoadingData';
import ServicioCard from '@/features/servicios/componentes/ServicioCard';
import { useListarServicios } from '@/features/servicios/hook/useServicio';

const Page = () => {
    const { data, isLoading, isError } = useListarServicios();

    if (isLoading) {
        return <LoadingData />;
    }

    if (isError || !data) {
        return <ErrorCard variante="error" titulo="Error" />;
    }
    return (
        <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestros Servicios Veterinarios</h2>
                <p className="mt-4 text-lg text-gray-600">Cuidado profesional y amoroso para tus mascotas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {data.data.map(service => service.activo && <ServicioCard key={service._id} service={service} />)}
            </div>

            {data?.data.length === 0 && <p className="text-center text-gray-500">No hay servicios disponibles por el momento.</p>}
        </section>
    );
};

export default Page;
