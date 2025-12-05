/*
  # E-Commerce Shop System

  ## Neue Tabellen
  
  1. **products** - Produktkatalog
     - `id` (uuid, primary key)
     - `name` (text) - Produktname
     - `description` (text) - Produktbeschreibung
     - `price` (decimal) - Preis in Euro
     - `image_url` (text) - Bild-URL
     - `category` (text) - Kategorie
     - `stock` (integer) - Lagerbestand
     - `featured` (boolean) - Featured-Produkt
     - `created_at` (timestamptz) - Erstellungsdatum
  
  2. **cart_items** - Warenkorb-Einträge
     - `id` (uuid, primary key)
     - `user_id` (uuid) - Referenz zu auth.users
     - `product_id` (uuid) - Referenz zu products
     - `quantity` (integer) - Anzahl
     - `created_at` (timestamptz) - Erstellungsdatum
  
  3. **orders** - Bestellungen
     - `id` (uuid, primary key)
     - `user_id` (uuid) - Referenz zu auth.users
     - `status` (text) - Bestellstatus
     - `total` (decimal) - Gesamtbetrag
     - `shipping_address` (jsonb) - Lieferadresse
     - `payment_method` (text) - Zahlungsmethode
     - `created_at` (timestamptz) - Bestelldatum
  
  4. **order_items** - Bestellpositionen
     - `id` (uuid, primary key)
     - `order_id` (uuid) - Referenz zu orders
     - `product_id` (uuid) - Referenz zu products
     - `quantity` (integer) - Anzahl
     - `price` (decimal) - Preis zum Bestellzeitpunkt
     - `created_at` (timestamptz) - Erstellungsdatum

  ## Sicherheit
  
  - RLS aktiviert für alle Tabellen
  - Produkte sind öffentlich lesbar
  - Warenkorb nur für eigenen Benutzer
  - Bestellungen nur für eigenen Benutzer
*/

-- Products table (öffentlich lesbar)
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products sind öffentlich lesbar"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Benutzer können eigene Warenkorb-Einträge sehen"
  ON cart_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Benutzer können Warenkorb-Einträge hinzufügen"
  ON cart_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Benutzer können eigene Warenkorb-Einträge aktualisieren"
  ON cart_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Benutzer können eigene Warenkorb-Einträge löschen"
  ON cart_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  total decimal(10,2) NOT NULL,
  shipping_address jsonb NOT NULL,
  payment_method text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Benutzer können eigene Bestellungen sehen"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Benutzer können Bestellungen erstellen"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Benutzer können Bestellpositionen ihrer Bestellungen sehen"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Benutzer können Bestellpositionen erstellen"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Sample products
INSERT INTO products (name, description, price, image_url, category, stock, featured) VALUES
  ('KI-Assistent Basic', 'Grundlegender KI-Assistent für kleine Unternehmen mit automatischer Kundenbeantwortung', 120.00, 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', 'ki-assistenten', 100, true),
  ('KI-Assistent Premium', 'Premium KI-Assistent mit erweiterten Features und Discord-Integration', 199.00, 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800', 'ki-assistenten', 100, true),
  ('Discord Bot Standard', 'Professioneller Discord Bot mit Moderation und Auto-Response', 89.00, 'https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=800', 'discord-bots', 100, false),
  ('Chat Widget Pro', 'Modernes Chat-Widget für deine Website mit KI-Integration', 149.00, 'https://images.pexels.com/photos/7869090/pexels-photo-7869090.jpeg?auto=compress&cs=tinysrgb&w=800', 'widgets', 100, true),
  ('Support Bot Enterprise', 'Enterprise Support Bot mit Multi-Channel Support', 299.00, 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800', 'support-bots', 50, false),
  ('Analytics Dashboard', 'Umfassendes Analytics Dashboard für deine KI-Assistenten', 79.00, 'https://images.pexels.com/photos/7433845/pexels-photo-7433845.jpeg?auto=compress&cs=tinysrgb&w=800', 'tools', 100, false)
ON CONFLICT DO NOTHING;
