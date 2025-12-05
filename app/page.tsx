'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/ContactForm';
import PricingCard from '@/components/PricingCard';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { supabase, Product } from '@/lib/supabase';
import { Bot, Users, Zap, MessageSquare, Clock, Shield, ChevronDown, Sparkles, Cpu, Rocket, Star, Store } from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // Create floating code blocks
    createCodeBlocks();

    // Load featured products
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(3);

    if (!error && data) {
      setFeaturedProducts(data);
    }
  };

  const createCodeBlocks = () => {
    const codeBlocks = document.createElement('div');
    codeBlocks.className = 'code-blocks';
    
    const codeSnippets = [
      'function aiAssistant() {\n  return "24/7 Support";\n}',
      'const discord = {\n  bot: true,\n  moderation: "auto"\n};',
      'if (customer.question) {\n  ai.respond();\n}',
      'class KIAgent {\n  constructor() {\n    this.active = true;\n  }\n}',
      'const paypal = {\n  checkout: "secure",\n  currency: "EUR"\n};',
      'async function processPayment() {\n  return await paypal.pay();\n}'
    ];
    
    codeSnippets.forEach((code, index) => {
      const block = document.createElement('div');
      block.className = 'code-block';
      block.innerHTML = code.replace(/\n/g, '<br>');
      codeBlocks.appendChild(block);
    });
    
    document.body.appendChild(codeBlocks);
    
    // Create geometric shapes
    createGeometricShapes();
    
    // Create floating particles
    createFloatingParticles();
  };

  const createGeometricShapes = () => {
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'geometric-shapes';
    
    const shapes = [
      'shape-triangle',
      'shape-square', 
      'shape-circle',
      'shape-hexagon'
    ];
    
    shapes.forEach(shapeClass => {
      const shape = document.createElement('div');
      shape.className = `shape ${shapeClass}`;
      shapesContainer.appendChild(shape);
    });
    
    document.body.appendChild(shapesContainer);
  };

  const createFloatingParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    scrollToSection('contact');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Brauche ich technische Kenntnisse?",
      answer: "Nein, überhaupt nicht! Ich richte alles für dich ein. Du musst nur kurz erklären, was dein Unternehmen/Projekt macht und welche Fragen häufig gestellt werden. Den Rest übernehme ich komplett."
    },
    {
      question: "Wo läuft der KI-Assistent?",
      answer: "Je nach Paket auf deiner Website (als Chat-Widget) und/oder auf deinem Discord-Server. Du bekommst von mir den fertigen Code zum Einbauen bzw. eine Bot-Einladung für Discord."
    },
    {
      question: "Wie hoch sind die laufenden Kosten?",
      answer: "Das hängt vom Paket ab. Basic startet bei 20€/Monat, Premium bei 40€/Monat. Darin sind die KI-Kosten, Hosting und meine Betreuung enthalten. Keine versteckten Kosten."
    },
    {
      question: "Kann ich die Antworten später ändern?",
      answer: "Ja, auf jeden Fall! Bei Premium sind monatliche Anpassungen inklusive. Bei Basic kann ich gegen kleinen Aufpreis Änderungen vornehmen. Du bist nicht festgefahren."
    },
    {
      question: "Wie schnell antwortet der KI-Assistent?",
      answer: "In der Regel innerhalb von 1-3 Sekunden. Der Bot läuft 24/7 und ist immer verfügbar - auch nachts, am Wochenende oder im Urlaub."
    },
    {
      question: "Was passiert bei Fragen, die der Bot nicht beantworten kann?",
      answer: "Der Bot sammelt diese Anfragen (Name, E-Mail, Frage) und leitet sie an dich weiter. So verpasst du trotzdem keine wichtigen Kundenanfragen."
    }
  ];

  return (
    <div className="min-h-screen relative">
      <Header />

      {/* GitHub-Style Background */}
      <div className="github-bg"></div>
      <div className="github-grid"></div>
      <div className="tech-grid"></div>
      <div className="scan-lines"></div>
      
      {/* Connection Lines */}
      <div className="connection-lines">
        <div className="connection-line"></div>
        <div className="connection-line"></div>
        <div className="connection-line"></div>
      </div>
      
      {/* Gradient Orbs */}
      <div className="gradient-orbs">
        <div className="gradient-orb"></div>
        <div className="gradient-orb"></div>
        <div className="gradient-orb"></div>
        <div className="gradient-orb"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-32 pt-40 px-4 text-center overflow-hidden">
        <div className="relative max-w-6xl mx-auto z-10">
          <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="relative inline-block">
              <Cpu className="h-20 w-20 text-sky-400 mx-auto mb-6 animate-gentle-float" />
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 gradient-text transition-all duration-1000 delay-200 tracking-tight leading-[1.1] ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            Dein eigener<br />
            KI-Assistent<br />
            & Discord-Bot
          </h1>

          <p className={`text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            der <span className="text-sky-400 font-semibold">24/7 für dich arbeitet</span>
          </p>

          <p className={`text-base md:text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            Ich richte dir einen individuellen KI-Assistenten ein, der Fragen von Kunden oder Community-Mitgliedern automatisch beantwortet – auf deiner Website oder deinem Discord-Server.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1000 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-75'}`}>
            <Link href="/shop">
              <Button className="btn-primary text-base px-8 py-6 hover-lift font-semibold">
                <Store className="w-5 h-5 mr-2" />
                Zum Shop
              </Button>
            </Link>

            <Button
              onClick={() => scrollToSection('pricing')}
              variant="outline"
              className="border-2 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 text-base px-8 py-6 hover-lift font-semibold transition-all duration-200"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Pakete & Preise
            </Button>
          </div>
        </div>
      </section>

      {/* What the AI Assistant does */}
      <section className="py-24 md:py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16 gradient-text tracking-tight">
            Was der KI-Assistent für dich macht
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <Card className="glass-card hover-lift transition-all duration-300 animate-fade-in-left opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Häufige Fragen beantworten</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-400 text-center text-sm leading-relaxed">
                  Öffnungszeiten, Preise, Leistungen, Terminvereinbarung – alles automatisch und sofort beantwortet.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift transition-all duration-300 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Regeln & Infos erklären</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-400 text-center text-sm leading-relaxed">
                  Perfekt für Discord-Server: Erklärt Regeln, Belohnungssysteme, Events und hilft neuen Mitgliedern.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift transition-all duration-300 animate-fade-in-right opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Anfragen sammeln</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-400 text-center text-sm leading-relaxed">
                  Sammelt Kontaktdaten und Anfragen, die der Bot nicht beantworten kann, und leitet sie an dich weiter.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 md:py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16 gradient-text tracking-tight">
            Für wen ist das geeignet?
          </h2>
          <div className="grid lg:grid-cols-2 gap-16">
            <Card className="glass-card hover-lift transition-all duration-300 animate-fade-in-left opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Unternehmen & Selbstständige</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="text-slate-300 space-y-2.5 text-sm">
                  <p className="flex items-start gap-3">
                    <span className="text-sky-400 mt-0.5">•</span>
                    <span><strong className="text-white">Friseur:</strong> Terminanfragen, Preise, Öffnungszeiten</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-sky-400 mt-0.5">•</span>
                    <span><strong className="text-white">Nagelstudio:</strong> Behandlungen, Verfügbarkeit, Preisliste</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-sky-400 mt-0.5">•</span>
                    <span><strong className="text-white">Werkstatt:</strong> Services, Kostenvoranschläge, Termine</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-sky-400 mt-0.5">•</span>
                    <span><strong className="text-white">Coaching:</strong> Erstberatung, Pakete, Buchungsprozess</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-sky-400 mt-0.5">•</span>
                    <span><strong className="text-white">Agenturen:</strong> Leistungen, Prozesse, Erstgespräch</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift transition-all duration-300 animate-fade-in-right opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Discord-Server & Communities</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="text-slate-300 space-y-2.5 text-sm">
                  <p className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span><strong className="text-white">Gaming-Server:</strong> Regeln, Events, Belohnungen</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span><strong className="text-white">FiveM-Projekte:</strong> Whitelist-Info, Server-Regeln, Jobs</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span><strong className="text-white">Clan-Server:</strong> Rekrutierung, Training, Organisation</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span><strong className="text-white">Community-Server:</strong> FAQ, Rollen, Veranstaltungen</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span><strong className="text-white">Roleplay-Server:</strong> Charaktererstellung, Regeln, Support</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16 gradient-text tracking-tight">
            Wie läuft das ab?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
              <div className="relative w-20 h-20 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale transition-all duration-200 shadow-lg shadow-sky-500/30">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Du erzählst mir kurz, was du machst</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Unternehmen/Projekt, Website/Discord, typische Fragen deiner Kunden oder Community-Mitglieder.
              </p>
            </div>

            <div className="text-center animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
              <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale transition-all duration-200 shadow-lg shadow-cyan-500/30">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Ich richte deinen KI-Assistenten ein</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Angepasster Name, passender Ton, alle wichtigen Inhalte. Optional auch Discord-Bot mit Zusatzfunktionen.
              </p>
            </div>

            <div className="text-center animate-fade-in-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale transition-all duration-200 shadow-lg shadow-blue-500/30">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Du bekommst alles fertig</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Einbau-Code für deine Website und/oder Bot-Einladung für Discord. Agent läuft sofort 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-24 md:py-32 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 gradient-text tracking-tight">
              Featured Produkte
            </h2>
            <p className="text-slate-400 text-center mb-16 text-base">
              Entdecke unsere beliebtesten KI-Assistenten und Tools
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/shop">
                <Button className="btn-primary text-base px-8 py-6 hover-lift font-semibold">
                  <Store className="w-5 h-5 mr-2" />
                  Alle Produkte ansehen
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 gradient-text tracking-tight">
            Pakete & Preise
          </h2>
          <p className="text-slate-400 text-center mb-16 text-base animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            Wähle das Paket, das am besten zu dir passt
          </p>
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 animate-scale-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
            <PricingCard
              title="KI-Agent Basic"
              price="ab 120€ Setup + 25€/Monat"
              description="Für kleine Unternehmen oder Discord-Server"
              features={[
                "Ein KI-Assistent",
                "Ein Kanal (Website ODER Discord)",
                "Einmalige Einrichtung mit deinen Infos",
                "Eine Änderungsrunde inklusive",
                "E-Mail-Support bei Problemen",
                "24/7 Verfügbarkeit"
              ]}
              planType="basic"
            />

            <PricingCard
              title="KI-Agent Premium"
              price="ab 40€/Monat"
              description="Für Businesses & Communities, die es ernst meinen"
              features={[
                "Ein KI-Assistent",
                "Zwei Kanäle (Website UND Discord)",
                "Umfangreichere Inhalte & FAQs",
                "3 Anpassungen pro Monat inklusive",
                "Erweiterte Discord-Bot Features",
                "Prioritäts-Support",
                "Monatliche Optimierungen"
              ]}
              planType="premium"
              isPopular={true}
            />

            <PricingCard
              title="Custom & Enterprise"
              price="Individuelle Preise"
              description="Für komplexere Anforderungen"
              features={[
                "Mehrere KI-Assistenten",
                "Komplexe Automatisierungen",
                "API-Integrationen",
                "Ticketsystem & Moderation",
                "Datenbank-Anbindungen",
                "Individuelle Entwicklung",
                "Persönliche Beratung"
              ]}
              onContactClick={scrollToContact}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16 gradient-text tracking-tight">
            Häufige Fragen
          </h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <Card key={index} className="glass-card hover-lift transition-all duration-300 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{animationDelay: `${(index + 1) * 100}ms`}}>
                <CardHeader
                  className="cursor-pointer hover:bg-slate-800/30 transition-all duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-all duration-200 flex-shrink-0 ${
                        openFaq === index ? 'rotate-180 text-sky-400' : ''
                      }`}
                    />
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent className="pt-0 pb-6">
                    <p className="text-slate-400 leading-relaxed animate-fade-in-up text-sm">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 px-4 relative">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 gradient-text tracking-tight">
            Lass uns sprechen
          </h2>
          <p className="text-slate-400 text-center mb-12 text-base animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            Ich melde mich innerhalb von 24 Stunden bei dir zurück
          </p>
          <div className="animate-scale-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-950/50 border-t border-slate-800/50 backdrop-blur-xl relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              KI-Assistent & Discord-Bots
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            Automatische Kundenbeantwortung 24/7 – für dein Business und deine Community
          </p>
        </div>
      </footer>
    </div>
  );
}