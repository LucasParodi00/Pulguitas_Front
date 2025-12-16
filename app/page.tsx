import { Carrusel } from '@/components/common/Carrusel';
import { Banner, imagenes, imagenesCollage, ImagenesCollage } from '@/features/inicio/componentes/Banners';
import { Beneficios } from '@/features/inicio/componentes/Beneficios';
import { CardToAction } from '@/features/inicio/componentes/CardToAction';
import { CarruselProductos } from '@/features/productos/componentes/CarruselProductos';
import { ListaProductos } from '@/features/productos/componentes/ListaProductos';

export default function Home() {
    return (
        <div className="">
            <main>
                <Carrusel />
                <Beneficios />
                <CarruselProductos
                    titulo="Promociones"
                    subtitulo="Mira nuestras promociones semanales!"
                    itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
                />
                <Banner data={imagenes} />
                <CardToAction />
                <ImagenesCollage data={imagenesCollage} />
            </main>
        </div>
    );
}
