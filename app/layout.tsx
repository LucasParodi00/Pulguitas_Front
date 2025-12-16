import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { ReactQueryProvider } from '@/provider/ReactQueryProvider';

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
                <ReactQueryProvider>
                    <Navbar />
                    <div className="max-w-[1300px] m-auto">{children}</div>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
