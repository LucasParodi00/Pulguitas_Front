import { RutasProtegidas } from '@/features/auth/componentes/RutasProtegidas';
import CheckoutPage from '@/features/carrito/componentes/Checkout';

const Page = () => {
    return (
        // <RutasProtegidas>
        <div>
            <CheckoutPage />
        </div>
        // </RutasProtegidas>
    );
};

export default Page;
