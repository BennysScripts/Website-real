'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Store, User, Home, LogOut, LogIn } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/button';
import { toast } from 'sonner';

export default function Header() {
  const router = useRouter();
  const { itemCount } = useCart();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Erfolgreich abgemeldet');
    router.push('/');
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">KI-Shop</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                <Home className="h-5 w-5 mr-2" />
                Home
              </Button>
            </Link>

            <Link href="/shop">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                <Store className="h-5 w-5 mr-2" />
                Shop
              </Button>
            </Link>

            {user && (
              <>
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white hover:bg-slate-800">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                    <User className="h-5 w-5 mr-2" />
                    Dashboard
                  </Button>
                </Link>

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Abmelden
                </Button>
              </>
            )}

            {!user && (
              <Link href="/auth/login">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Anmelden
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
