'use client';

import { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  planType?: 'basic' | 'premium';
  isPopular?: boolean;
  onContactClick?: () => void;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  planType,
  isPopular = false,
  onContactClick
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);

  const hasPayPalCredentials = typeof window !== 'undefined' &&
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID &&
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID !== 'your_paypal_client_id_here';

  const handleBooking = () => {
    if (!planType || !hasPayPalCredentials) {
      onContactClick?.();
      return;
    }
    setShowPayPal(true);
  };

  const createSubscription = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planType }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('PayPal error:', error);
    }
  };

  return (
    <Card className={`relative glass-card hover-lift group overflow-hidden transition-all duration-300 ${
      isPopular ? 'ring-2 ring-sky-500/50 scale-[1.02] shadow-2xl shadow-sky-500/20' : ''
    }`}>
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isPopular ? 'from-sky-500/10 to-cyan-500/10' : 'from-slate-500/5 to-slate-600/5'
      }`}></div>

      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <span className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5 shadow-lg">
            <Crown className="w-3.5 h-3.5" />
            Beliebt
          </span>
        </div>
      )}
      
      <CardHeader className="text-center relative z-10 pb-6">
        <div className="mb-6">
          {isPopular ? (
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl blur-xl opacity-50 animate-gentle-float"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center ring-1 ring-white/10">
              <span className="text-white font-bold text-2xl">AI</span>
            </div>
          )}
        </div>
        <CardTitle className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
          isPopular ? 'text-white' : 'text-slate-100'
        }`}>{title}</CardTitle>
        <div className={`text-3xl font-extrabold mb-2 transition-all duration-300 ${
          isPopular ? 'bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent' : 'text-white'
        }`}>
          {price}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10 pt-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3 group/item">
              <div className="relative mt-0.5">
                <Check className="h-5 w-5 text-sky-400 flex-shrink-0 transition-all duration-200 group-hover/item:scale-110" />
              </div>
              <span className="text-slate-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">{feature}</span>
            </li>
          ))}
        </ul>
        
        {!showPayPal ? (
          <Button
            onClick={handleBooking}
            disabled={isLoading}
            className={`w-full mt-6 py-6 text-base font-semibold transition-all duration-200 relative overflow-hidden group/btn ${
              isPopular
                ? 'bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
            } ${isLoading ? 'opacity-70' : ''}`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {planType && hasPayPalCredentials ? `${title} buchen` : 'Anfrage senden'}
            </span>
          </Button>
        ) : hasPayPalCredentials ? (
          <div className="mt-6 animate-fade-in-up">
            <div className="mb-4 text-center">
              <p className="text-slate-400 text-sm">Sicher bezahlen mit PayPal:</p>
            </div>
            <PayPalButtons
              style={{
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'subscribe'
              }}
              createSubscription={async (data, actions) => {
                let planId = '';
                if (planType === 'basic') {
                  planId = process.env.NEXT_PUBLIC_PAYPAL_PLAN_BASIC || 'P-basic';
                } else if (planType === 'premium') {
                  planId = process.env.NEXT_PUBLIC_PAYPAL_PLAN_PREMIUM || 'P-premium';
                }
                
                return actions.subscription.create({
                  plan_id: planId,
                });
              }}
              onApprove={async (data, actions) => {
                console.log('Subscription approved:', data.subscriptionID);
                window.location.href = '/success';
              }}
              onError={(err) => {
                console.error('PayPal error:', err);
                alert('Fehler bei der PayPal-Zahlung. Bitte versuche es erneut.');
              }}
              onCancel={() => {
                setShowPayPal(false);
              }}
            />
            <Button
              variant="outline"
              onClick={() => setShowPayPal(false)}
              className="w-full mt-4 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all duration-200"
            >
              Zurück
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}