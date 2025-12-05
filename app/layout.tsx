'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const hasPayPalCredentials = paypalClientId && paypalClientId !== 'your_paypal_client_id_here';

  return (
    <html lang="de">
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
        <CartProvider>
          {hasPayPalCredentials ? (
            <PayPalScriptProvider options={{
              clientId: paypalClientId,
              currency: 'EUR',
              locale: 'de_DE',
              vault: true,
              intent: 'subscription'
            }}>
              <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
                {children}
              </div>
            </PayPalScriptProvider>
          ) : (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
              {children}
            </div>
          )}
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}