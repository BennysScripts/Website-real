'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen">
      <div className="github-bg"></div>
      <div className="github-grid"></div>
      <div className="tech-grid"></div>
      <div className="gradient-orbs">
        <div className="gradient-orb"></div>
        <div className="gradient-orb"></div>
        <div className="gradient-orb"></div>
        <div className="gradient-orb"></div>
      </div>

      <Header />

      <main className="relative pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-3xl font-extrabold text-white mb-4">
                Bestellung erfolgreich!
              </h1>

              <p className="text-slate-300 mb-2">
                Vielen Dank für deine Bestellung.
              </p>

              {orderId && (
                <p className="text-slate-400 text-sm mb-8">
                  Bestellnummer: {orderId.slice(0, 8)}
                </p>
              )}

              <p className="text-slate-400 mb-8">
                Du erhältst in Kürze eine Bestätigung per E-Mail.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push('/dashboard')}
                  className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600"
                >
                  Meine Bestellungen
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push('/shop')}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Weiter einkaufen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
