import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';

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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bodyF`}>
                <Navbar />
                <div className="w-[1200px] m-auto ">
                    <div className="">{children}</div>
                </div>
                <div>dasdas{/*  Aca va a ir el footer */}</div>
            </body>
        </html>
    );
}
