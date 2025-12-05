'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase, Product } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

export const dynamic = 'force-dynamic';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();

    if (error) {
      console.error('Error loading product:', error);
      toast.error('Fehler beim Laden des Produkts');
    } else {
      setProduct(data);
    }
    setLoading(false);
  };

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product, quantity);
      toast.success(`${quantity}x ${product.name} zum Warenkorb hinzugefügt`);
      router.push('/cart');
    }
  };

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

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 text-center">
          <p className="text-slate-400">Produkt nicht gefunden</p>
        </div>
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
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-800">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}
            </div>

            <div>
              <Card className="glass-card">
                <CardContent className="p-8">
                  <span className="text-sm text-sky-400 font-semibold uppercase tracking-wide">
                    {product.category.replace(/-/g, ' ')}
                  </span>
                  <h1 className="text-4xl font-extrabold text-white mt-2 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {product.description}
                  </p>

                  <div className="flex items-baseline space-x-3 mb-6">
                    <span className="text-5xl font-extrabold text-white">
                      {product.price.toFixed(2)} €
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 mb-8">
                    {product.stock > 0 ? (
                      <span className="text-green-400">✓ {product.stock} auf Lager</span>
                    ) : (
                      <span className="text-red-400">Ausverkauft</span>
                    )}
                  </p>

                  <div className="flex items-center space-x-4 mb-8">
                    <label className="text-slate-300 font-semibold">Menge:</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center text-lg font-bold">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                        className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 disabled:opacity-50"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    In den Warenkorb
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
