import { RutasProtegidas } from '@/features/auth/componentes/RutasProtegidas';
import CheckoutPage from '@/features/carrito/componentes/Checkout';

const Page = () => {
    return (
        <RutasProtegidas>
            <CheckoutPage />
        </RutasProtegidas>
    );
};

export default Page;
