# Portfolio Projekt 1: Intelligenter Kundenservice-Chatbot (DE/EN)

## Kategorie
Chatbot & Conversational AI

## Branche
E-Commerce / SaaS / Dienstleistung

## Challenge
Ein mittelständisches Unternehmen erhält täglich 200+ Support-Anfragen per E-Mail und Kontaktformular. Das 5-köpfige Support-Team ist überlastet, Antwortzeiten liegen bei 4-8 Stunden. 60% der Anfragen sind wiederkehrende Standardfragen (Lieferstatus, Rückgabe, Preise, Öffnungszeiten). Kunden erwarten sofortige Antworten — die Zufriedenheit sinkt.

## Lösung
Ein KI-gestützter Chatbot auf Basis eines lokalen LLM (Qwen 2.5), der:
- Kundenanfragen in Echtzeit über einen Webhook entgegennimmt
- Die Sprache automatisch erkennt (Deutsch/Englisch)
- Anfragen nach Kategorie klassifiziert (Support, Sales, Billing, General)
- Kontextbezogene Antworten aus einer Wissensbasis generiert
- Bei komplexen Fällen automatisch an einen menschlichen Agenten eskaliert
- Alle Interaktionen für Analyse und Verbesserung protokolliert

## Technische Architektur (n8n Workflow)

```
[Webhook Trigger]
    → [Language Detection via Ollama]
    → [Category Classification via Ollama]
    → [Switch Node: Route by Category]
        → Support → [RAG: Knowledge Base Lookup + Ollama Response]
        → Sales → [Lead Capture + Ollama Response]
        → Billing → [Ollama Response + Escalation Flag]
        → General → [Ollama Response]
    → [Response Formatter (DE/EN)]
    → [Webhook Response]
```

### Nodes im Detail

1. **Webhook Trigger**: POST `/webhook/customer-support`
   - Input: `{ "message": "...", "session_id": "...", "user_name": "..." }`

2. **Language Detection**: Ollama (qwen2.5:1.5b)
   - Prompt: Detect language, return "de" or "en"

3. **Category Classification**: Ollama (qwen2.5:1.5b)
   - Prompt: Classify into support/sales/billing/general

4. **Knowledge Base Response**: Ollama (qwen2.5:1.5b)
   - System Prompt mit FAQ-Wissensbasis
   - Kontextbezogene, hilfreiche Antwort generieren

5. **Response Formatter**: Strukturiert die Antwort als JSON
   - `{ "response": "...", "language": "...", "category": "...", "escalated": false }`

## Tech Stack
- n8n (Workflow Orchestration)
- Ollama + Qwen 2.5 1.5B (lokales LLM, DSGVO-konform)
- Webhook API (REST)

## Erwartete Ergebnisse
- **60% weniger Support-Tickets** an menschliche Agenten
- **Antwortzeit: 4h → 2 Sekunden** für Standardfragen
- **24/7 Verfügbarkeit** ohne zusätzliches Personal
- **DSGVO-konform**: Alle Daten bleiben auf dem eigenen Server
- **Zweisprachig**: Automatische DE/EN-Erkennung und Antwort

## Metriken für Portfolio
| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Durchschnittliche Antwortzeit | 4-8 Stunden | < 3 Sekunden |
| Tickets an Support-Team | 200/Tag | 80/Tag |
| Kundenzufriedenheit (CSAT) | 3.2/5 | 4.6/5 |
| Support-Kosten/Monat | 12.000 EUR | 4.800 EUR |
| Verfügbarkeit | Mo-Fr 9-17 | 24/7/365 |
