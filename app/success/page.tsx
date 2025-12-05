'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck as CheckCircle, Sparkles } from 'lucide-react';

export default function Success() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className={`max-w-2xl mx-auto bg-gray-900/50 border-gray-700 backdrop-blur-sm hover-lift transition-all duration-1000 ${isVisible ? 'animate-bounce-in' : 'opacity-0 scale-75'}`}>
        <CardHeader className="text-center">
          <div className={`flex items-center justify-center space-x-2 mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <CheckCircle className="h-16 w-16 text-green-400 animate-pulse-glow" />
            <Sparkles className="h-8 w-8 text-cyan-400 animate-glow-pulse hover-rotate" />
          </div>
          <CardTitle className={`text-3xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
            Danke für deine Buchung!
          </CardTitle>
        </CardHeader>
        <CardContent className={`text-center space-y-6 transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 p-6 rounded-lg border border-green-500/20 hover-glow">
            <h3 className="text-xl font-semibold text-white mb-3">Was passiert jetzt?</h3>
            <div className="text-gray-300 space-y-3 text-left">
              <p className="animate-slide-in-left delay-1000 opacity-0 [animation-fill-mode:forwards]">✅ <strong>Ich melde mich innerhalb von 24 Stunden</strong> bei dir per E-Mail</p>
              <p className="animate-slide-in-left delay-1200 opacity-0 [animation-fill-mode:forwards]">✅ <strong>Wir besprechen dein Projekt</strong> und alle Details in einem kurzen Gespräch</p>
              <p className="animate-slide-in-left delay-1400 opacity-0 [animation-fill-mode:forwards]">✅ <strong>Ich richte deinen KI-Assistenten ein</strong> – normalerweise innerhalb von 2-3 Werktagen</p>
              <p className="animate-slide-in-left delay-1600 opacity-0 [animation-fill-mode:forwards]">✅ <strong>Du bekommst alles fertig geliefert</strong> mit Anleitung und Support</p>
            </div>
          </div>
          
          <div className={`bg-gray-800/50 p-4 rounded-lg hover-glow transition-all duration-1000 delay-1800 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-75'}`}>
            <p className="text-gray-300 text-sm">
              <strong>Wichtig:</strong> Schau auch in deinen Spam-Ordner, falls du nichts von mir hörst. 
              Bei Fragen kannst du mich jederzeit über das Kontaktformular erreichen.
            </p>
          </div>

          <Link href="/">
            <Button className={`bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 px-8 py-3 hover-lift animate-gradient-shift animate-pulse-glow transition-all duration-1000 delay-2000 ${isVisible ? 'animate-bounce-in' : 'opacity-0 scale-75'}`}>
              Zurück zur Startseite
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}