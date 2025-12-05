'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, total, itemCount, loading } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
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
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-slate-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Dein Warenkorb ist leer</h1>
            <p className="text-slate-400 mb-8">Entdecke unsere Produkte und füge sie hinzu!</p>
            <Button
              onClick={() => router.push('/shop')}
              className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600"
            >
              Zum Shop
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-8 gradient-text">Warenkorb</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <Card key={item.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-slate-400 text-sm mb-2">
                          {item.product.price.toFixed(2)} € pro Stück
                        </p>

                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 bg-slate-800 border-slate-700"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-white font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="h-8 w-8 bg-slate-800 border-slate-700"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-bold text-white mb-2">
                          {(item.product.price * item.quantity).toFixed(2)} €
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="glass-card sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Zusammenfassung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-slate-300">
                    <span>Zwischensumme ({itemCount} Artikel):</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Versand:</span>
                    <span>Kostenlos</span>
                  </div>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex justify-between text-2xl font-bold text-white">
                      <span>Gesamt:</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => router.push('/checkout')}
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 mt-6"
                  >
                    Zur Kasse
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => router.push('/shop')}
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Weiter einkaufen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
