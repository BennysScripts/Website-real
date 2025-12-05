# KI-Assistent & Discord-Bot Landingpage

Eine moderne deutschsprachige Landingpage mit Stripe-Integration für den Verkauf von KI-Assistenten und Discord-Bot Services.

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Environment Variablen einrichten  
Erstelle eine `.env.local` Datei im Root-Verzeichnis und füge folgende Variablen hinzu:

```env
# PayPal Configuration (WICHTIG: Ersetze mit deinen echten Werten!)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=dein_paypal_client_id
PAYPAL_CLIENT_SECRET=dein_paypal_client_secret

# PayPal Plan IDs (erstelle diese in deinem PayPal Dashboard)
PAYPAL_PLAN_BASIC=P-basic_plan_id
PAYPAL_PLAN_PREMIUM=P-premium_plan_id

# Base URL (für lokale Entwicklung)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Entwicklungsserver starten
```bash
npm run dev
```

Die Seite ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

## 🛠️ PayPal Setup

### Schritt 1: PayPal Developer Account erstellen
1. Gehe zu [developer.paypal.com](https://developer.paypal.com) und erstelle einen Account
2. Erstelle eine neue App im PayPal Developer Dashboard

### Schritt 2: API-Credentials holen
1. Gehe zu **My Apps & Credentials** in deinem PayPal Developer Dashboard
2. Kopiere die **Client ID** und das **Client Secret**
3. Füge sie in deine `.env.local` ein

### Schritt 3: Subscription Plans erstellen
1. Gehe zu **Subscriptions** in deinem PayPal Dashboard
2. Erstelle zwei Subscription Plans:
   - **KI-Agent Basic**: z.B. 20€/Monat
   - **KI-Agent Premium**: z.B. 40€/Monat
3. Kopiere die **Plan IDs** (beginnen mit `P-...`)
4. Füge sie in deine `.env.local` ein

### Schritt 4: Webhook einrichten (optional)
Für erweiterte Funktionalität kannst du einen Webhook für `/api/paypal/webhook` einrichten.

## 🎨 Design anpassen

### Farben ändern
Die Hauptfarben findest du in:
- `app/page.tsx` - Gradient-Klassen wie `from-blue-500 to-cyan-500`
- `tailwind.config.ts` - Globale CSS-Variablen

### Texte anpassen
Alle Texte sind direkt in den Komponenten:
- **Haupttexte**: `app/page.tsx`
- **Preise**: `app/page.tsx` in der Pricing-Sektion
- **FAQ**: `app/page.tsx` im `faqData` Array
- **Meta-Tags**: `app/layout.tsx`

### Preise anzeigen
Die Preistexte sind statisch in `app/page.tsx`. Du kannst sie einfach anpassen:
```typescript
<PricingCard
  title="KI-Agent Basic"
  price="ab 120€ Setup + 25€/Monat"  // <- Hier ändern
  // ...
/>
```

## 📁 Projektstruktur

```
├── app/
│   ├── api/
│   │   ├── checkout/route.ts          # PayPal Checkout API
│   │   └── contact/route.ts           # Kontaktformular API
│   ├── success/page.tsx               # Erfolgs-Seite nach Zahlung
│   ├── cancel/page.tsx                # Abbruch-Seite
│   ├── layout.tsx                     # Layout & Meta-Tags
│   └── page.tsx                       # Hauptseite (Landingpage)
├── components/
│   ├── ContactForm.tsx                # Kontaktformular
│   └── PricingCard.tsx                # Preis-Karten Komponente
└── .env.local                         # Environment Variablen
```

## 🔧 Wichtige Anpassungen

### Kontaktformular
Das Kontaktformular in `components/ContactForm.tsx` loggt aktuell nur in die Konsole. 
Um echte E-Mails zu versenden, kannst du:
- **Resend.com** oder **SendGrid** integrieren
- Die `app/api/contact/route.ts` erweitern

### Domain für Production
Vergiss nicht, die `NEXT_PUBLIC_BASE_URL` für Production zu ändern:
```env
NEXT_PUBLIC_BASE_URL=https://deine-domain.de
```

### Build für Production
```bash
npm run build
npm run start
```

## 💡 Tipps

- **Sandbox-Modus**: PayPal läuft standardmäßig im Sandbox-Modus für Tests
- **Live-Modus**: Schalte auf Live-Credentials um für echte Zahlungen
- **Mobile-Optimierung**: Die Seite ist bereits responsive, teste aber verschiedene Bildschirmgrößen
- **SEO**: Meta-Tags sind in `app/layout.tsx` definiert und können angepasst werden

## 🆘 Support

Bei Fragen zur Implementierung:
1. Prüfe die Konsole im Browser auf Fehler
2. Prüfe die Network-Tab bei PayPal-Checkout-Problemen
3. Stelle sicher, dass alle Environment-Variablen korrekt gesetzt sind

Happy Coding! 🚀