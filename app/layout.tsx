import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { ReactQueryProvider } from '@/provider/ReactQueryProvider';
import { CartProvider } from '@/features/carrito/provider/carrito.provider';
import { AuthProvider } from '@/features/auth/provider/auth.provider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Pulguitas',
    description: 'Tienda PetShop Online y Atencion personalizadas para mascotas.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
                <AuthProvider>
                    <CartProvider>
                        <ReactQueryProvider>
                            <Navbar />
                            <div className="max-w-[1300px] m-auto">{children}</div>
                        </ReactQueryProvider>
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
