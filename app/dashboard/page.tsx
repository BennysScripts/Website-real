'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, Order, OrderItem, Product } from '@/lib/supabase';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Clock, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

type OrderWithItems = Order & {
  order_items: (OrderItem & { product: Product })[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/auth/login');
      return;
    }

    loadOrders();
  };

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (*)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading orders:', error);
    } else {
      setOrders(data as OrderWithItems[]);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Package className="w-5 h-5 text-sky-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'In Bearbeitung';
      case 'completed':
        return 'Abgeschlossen';
      case 'shipped':
        return 'Versendet';
      default:
        return status;
    }
  };

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
          <h1 className="text-4xl font-extrabold mb-8 gradient-text">Meine Bestellungen</h1>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="glass-card h-48 animate-pulse"></Card>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">Noch keine Bestellungen</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <Card key={order.id} className="glass-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="ml-2">Bestellung #{order.id.slice(0, 8)}</span>
                        </CardTitle>
                        <p className="text-sm text-slate-400 mt-1">
                          {new Date(order.created_at).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400">
                          {getStatusText(order.status)}
                        </span>
                        <p className="text-2xl font-bold text-white mt-2">
                          {order.total.toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {order.order_items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm text-slate-300 py-2 border-t border-slate-800">
                          <span>{item.quantity}x {item.product.name}</span>
                          <span>{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-400">
                        <strong className="text-white">Lieferadresse:</strong> {order.shipping_address.name}, {order.shipping_address.street}, {order.shipping_address.postal_code} {order.shipping_address.city}
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        <strong className="text-white">Zahlungsmethode:</strong> {order.payment_method}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
