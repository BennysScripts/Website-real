'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    await addToCart(product);
    toast.success(`${product.name} wurde zum Warenkorb hinzugefügt`);
  };

  return (
    <Card className="glass-card hover-lift overflow-hidden group">
      <Link href={`/shop/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-slate-800">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {product.featured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="pb-3">
        <Link href={`/shop/${product.id}`}>
          <CardTitle className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-slate-400 line-clamp-2 mt-2">
          {product.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold text-white">
            {product.price.toFixed(2)} €
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {product.stock > 0 ? `${product.stock} verfügbar` : 'Ausverkauft'}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          In den Warenkorb
        </Button>
      </CardFooter>
    </Card>
  );
}
