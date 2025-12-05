'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Circle as XCircle, MessageSquare } from 'lucide-react';

export default function Cancel() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className={`max-w-2xl mx-auto bg-gray-900/50 border-gray-700 backdrop-blur-sm hover-lift transition-all duration-1000 ${isVisible ? 'animate-bounce-in' : 'opacity-0 scale-75'}`}>
        <CardHeader className="text-center">
          <XCircle className={`h-16 w-16 text-orange-400 mx-auto mb-6 animate-float hover-rotate transition-all duration-1000 delay-300 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} />
          <CardTitle className={`text-3xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient-shift transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
            Bezahlvorgang abgebrochen
          </CardTitle>
        </CardHeader>
        <CardContent className={`text-center space-y-6 transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-300 text-lg animate-glow-pulse">
            Du hast den Bezahlvorgang abgebrochen. Das ist kein Problem!
          </p>
          
          <div className={`bg-gray-800/50 p-6 rounded-lg space-y-4 hover-glow transition-all duration-1000 delay-1000 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-75'}`}>
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-6 w-6 text-cyan-400 animate-float hover-rotate" />
              <h3 className="text-lg font-semibold text-white">Hast du Fragen?</h3>
            </div>
            <p className="text-gray-300 text-left animate-slide-in-left delay-1200 opacity-0 [animation-fill-mode:forwards]">
              Falls du unsicher warst oder Fragen zu den Paketen hast, melde dich gerne 
              über das Kontaktformular. Ich erkläre dir gerne alles in Ruhe und ohne Druck.
            </p>
            <p className="text-gray-300 text-left animate-slide-in-left delay-1400 opacity-0 [animation-fill-mode:forwards]">
              <strong>Zum Beispiel:</strong> Welches Paket passt zu dir? Wie genau läuft der Setup ab? 
              Gibt es eine Demo? Ich helfe dir gerne weiter!
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1600 ${isVisible ? 'animate-bounce-in' : 'opacity-0 scale-75'}`}>
            <Link href="/#contact">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 px-6 py-3 hover-lift animate-gradient-shift animate-pulse-glow">
                Fragen stellen
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3 hover-lift hover-glow">
                Zurück zur Startseite
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}