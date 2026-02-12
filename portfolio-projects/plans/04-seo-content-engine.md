# Portfolio Projekt 4: KI-gesteuerte SEO Content Engine

## Kategorie
Content & AI / Marketing Automation

## Branche
Marketing-Agentur / E-Commerce / SaaS

## Challenge
Ein mittelständisches E-Commerce-Unternehmen möchte seinen organischen Traffic steigern, hat aber nur einen Content-Manager. Dieser schafft 2 Blogartikel pro Woche. Die Konkurrenz publiziert 3x so viel. SEO-optimierte Inhalte zu erstellen dauert pro Artikel 4-6 Stunden (Recherche, Schreiben, Optimierung). Es fehlt an Konsistenz in Ton und Struktur.

## Lösung
Eine KI-Content-Pipeline, die:
- Ein Thema/Keyword entgegennimmt
- Eine SEO-optimierte Artikelstruktur generiert (Titel, Meta, Headings)
- Einen vollständigen Blogartikel in gewünschter Sprache erstellt
- SEO-Elemente automatisch einfügt (Meta Description, Alt-Tags, Internal Links)
- Den Content in verschiedenen Formaten ausgibt (HTML, Markdown, Plain Text)
- Qualitätsmetriken berechnet (Lesbarkeit, Keyword-Dichte)

## Technische Architektur (n8n Workflow)

```
[Webhook Trigger: Content Request]
    → [Input Validation]
        - Keyword, Sprache, Länge, Ton prüfen
    → [SEO Structure Generation via Ollama]
        - Title Tag (max 60 chars)
        - Meta Description (max 155 chars)
        - H1, H2, H3 Struktur
        - Target Keywords
    → [Article Generation via Ollama]
        - Section by section generation
        - Consistent tone & style
        - Keyword integration
    → [SEO Optimization via Ollama]
        - Readability check
        - Keyword density analysis
        - Suggestions for improvement
    → [Content Formatter]
        - Markdown output
        - HTML output
        - Quality metrics
    → [Webhook Response: Complete Article Package]
```

### Nodes im Detail

1. **Webhook Trigger**: POST `/webhook/content-engine`
   - Input: `{ "keyword": "...", "language": "de|en", "tone": "professional|casual|technical", "word_count": 1000, "industry": "..." }`

2. **SEO Structure Generator**: Ollama (qwen2.5:1.5b)
   - Output: Titel, Meta, Heading-Struktur, Keyword-Varianten

3. **Article Writer**: Ollama (qwen2.5:1.5b)
   - Generiert Abschnitt für Abschnitt basierend auf Struktur
   - System Prompt mit Stil-Guidelines und SEO-Regeln

4. **SEO Optimizer**: Ollama (qwen2.5:1.5b)
   - Analysiert den fertigen Artikel
   - Keyword-Dichte, Lesbarkeit, Verbesserungsvorschläge

5. **Content Formatter**: Code Node
   - Markdown → HTML Konvertierung
   - Qualitätsmetriken berechnen (Wortanzahl, Keyword-Dichte, Flesch-Score)

## Tech Stack
- n8n (Workflow Orchestration)
- Ollama + Qwen 2.5 (Content Generation & SEO Analysis)
- Webhook API (REST)
- Code Nodes (Formatting & Metrics)

## Erwartete Ergebnisse
- **10x Content Output**: Von 2 auf 20 Artikel pro Woche
- **Zeitersparnis: 5h → 30 Min** pro Artikel (Review + Feinschliff)
- **Konsistente Qualität**: Einheitlicher Ton und SEO-Struktur
- **SEO-Score-Verbesserung**: Durchschnittlich 40% bessere On-Page-SEO
- **Kosten pro Artikel: 200 EUR → 20 EUR**

## Metriken für Portfolio
| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Artikel pro Woche | 2 | 20 |
| Zeitaufwand pro Artikel | 5 Stunden | 30 Minuten |
| Content-Kosten/Monat | 3.200 EUR | 800 EUR |
| Organischer Traffic (6 Mo.) | +5%/Monat | +25%/Monat |
| SEO On-Page Score | 62/100 | 89/100 |
