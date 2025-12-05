'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, Product, CartItem } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type CartContextType = {
  items: (CartItem & { product: Product })[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  itemCount: number;
  loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<(CartItem & { product: Product })[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCart();

    const channel = supabase
      .channel('cart-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cart_items' }, () => {
        loadCart();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error loading cart:', error);
      setItems([]);
    } else {
      setItems(data as (CartItem & { product: Product })[]);
    }

    setLoading(false);
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Bitte melde dich an, um Produkte hinzuzufügen');
      router.push('/auth/login');
      return;
    }

    const existingItem = items.find(item => item.product_id === product.id);

    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: product.id,
          quantity
        });

      if (error) {
        console.error('Error adding to cart:', error);
        toast.error('Fehler beim Hinzufügen zum Warenkorb');
      } else {
        await loadCart();
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error removing from cart:', error);
      toast.error('Fehler beim Entfernen aus dem Warenkorb');
    } else {
      toast.success('Produkt aus dem Warenkorb entfernt');
      await loadCart();
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) {
      console.error('Error updating quantity:', error);
    } else {
      await loadCart();
    }
  };

  const clearCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Error clearing cart:', error);
    } else {
      await loadCart();
    }
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      itemCount,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
