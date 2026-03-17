# Fehlende Assets für vollständige SEO-Optimierung

Diese Dateien müssen noch erstellt und hinzugefügt werden:

## Favicon & Icons (Priorität: HOCH)

### 1. Favicon
- **Datei:** `favicon.ico`
- **Größe:** 32x32px oder 48x48px
- **Format:** ICO
- **Tool:** https://favicon.io oder https://realfavicongenerator.net

### 2. SVG Icon
- **Datei:** `icon.svg`
- **Größe:** Skalierbar
- **Format:** SVG
- **Inhalt:** SwiftGate AI Logo

### 3. Apple Touch Icon
- **Datei:** `apple-touch-icon.png`
- **Größe:** 180x180px
- **Format:** PNG
- **Background:** Sollte nicht transparent sein

### 4. PWA Icons
- **Datei 1:** `icon-192.png` (192x192px)
- **Datei 2:** `icon-512.png` (512x512px)
- **Format:** PNG
- **Background:** Transparent oder Markenfarbe #0C2312

## Open Graph Image (Priorität: HOCH)

### OG Image
- **Datei:** `og-image.jpg`
- **Größe:** 1200x630px
- **Format:** JPG (optimiert)
- **Inhalt:**
  - SwiftGate AI Logo
  - Tagline: "Professionelle Webentwicklung & KI-Lösungen"
  - Markenfarben: #0C2312, #F5F3ED, #1A4D2E
- **Tool:** Canva, Figma, oder https://www.opengraph.xyz

## Design-Richtlinien

### Farben
- Primary: `#0C2312` (Dunkelgrün)
- Secondary: `#1A4D2E` (Grün)
- Accent: `#8B7355` (Braun)
- Text: `#F5F3ED` (Hellbeige)

### Logo-Anforderungen
- Minimalistisch und modern
- Funktioniert auf dunklem und hellem Hintergrund
- Skalierbar (für verschiedene Icon-Größen)

## Nach dem Hinzufügen der Assets

1. Build durchführen: `npm run build`
2. Testen mit: https://realfavicongenerator.net/favicon_checker
3. OG Image testen: https://www.opengraph.xyz
4. Mobile Preview: https://search.google.com/test/mobile-friendly

## Automatische Tools

### Favicon Generator
```bash
# Tool: favicon.io
# 1. Logo hochladen
# 2. Alle Größen automatisch generieren
# 3. Download und entpacken in /public/
```

### OG Image Generator
```bash
# Tool: Canva
# 1. Template "Facebook Post" (1200x630px)
# 2. Design mit Markenfarben
# 3. Export als JPG (optimiert)
```

## Priorität

1. **HOCH:** favicon.ico, og-image.jpg
2. **MITTEL:** apple-touch-icon.png, icon-192.png, icon-512.png
3. **NIEDRIG:** icon.svg

Sobald diese Assets hinzugefügt wurden, ist die SEO-Optimierung zu 100% abgeschlossen.
