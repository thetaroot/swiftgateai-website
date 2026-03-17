# Portfolio Projekt 6: KI-gestützte E-Mail-Analyse & Antwortautomatisierung

## Kategorie
Workflow Automation / AI & Communication

## Branche
Dienstleistung / E-Commerce / Beratung

## Challenge
Ein Dienstleistungsunternehmen erhält täglich 150+ geschäftliche E-Mails. Die Bearbeitung dauert durchschnittlich 12 Minuten pro E-Mail (Lesen, Verstehen, Priorisieren, Antworten). Dringende Anfragen werden oft erst Stunden später erkannt. Standard-Antworten werden jedes Mal neu formuliert. Es gibt keine einheitliche Tonalität in der Kundenkommunikation.

## Lösung
Ein KI-E-Mail-Assistent, der:
- Eingehende E-Mails über Webhook entgegennimmt
- Sentiment und Dringlichkeit analysiert
- Die E-Mail kategorisiert (Anfrage, Beschwerde, Bestellung, Info)
- Schlüsselinformationen extrahiert (Absender-Intent, Action Items)
- Einen professionellen Antwortentwurf generiert
- Eskalation bei negativem Sentiment oder hoher Dringlichkeit triggert

## Technische Architektur (n8n Workflow)

```
[Webhook Trigger: Incoming Email]
    → [Email Preprocessing]
        - Clean HTML, extract plain text
        - Extract sender, subject, timestamp
    → [Sentiment Analysis via Ollama]
        - Sentiment: positive/neutral/negative/angry
        - Sentiment score: -1.0 to +1.0
    → [Email Classification via Ollama]
        - Type: inquiry/complaint/order/info/spam
        - Urgency: immediate/today/this_week/low
    → [Key Information Extraction via Ollama]
        - Sender intent (what do they want?)
        - Action items (what needs to happen?)
        - Entities (names, dates, amounts, products)
    → [Switch: Priority Routing]
        → Urgent + Negative → [Draft Response + Escalation Alert]
        → Urgent + Neutral/Positive → [Draft Response + Priority Flag]
        → Normal → [Draft Response]
        → Spam/Low → [Auto-Archive Suggestion]
    → [Response Draft Generation via Ollama]
        - Professional tone matching company style
        - Address specific concerns
        - Include next steps
    → [Webhook Response: Analysis + Draft]
```

### Nodes im Detail

1. **Webhook Trigger**: POST `/webhook/email-analysis`
   - Input: `{ "from": "...", "subject": "...", "body": "...", "timestamp": "..." }`

2. **Sentiment Analysis**: Ollama (qwen2.5:1.5b)
   - Output: `{ "sentiment": "negative", "score": -0.7, "indicators": ["frustrated tone", "deadline mention"] }`

3. **Email Classification**: Ollama (qwen2.5:1.5b)
   - Output: `{ "type": "complaint", "urgency": "immediate", "topic": "delivery_delay" }`

4. **Information Extraction**: Ollama (qwen2.5:1.5b)
   - Output: `{ "intent": "wants refund for late delivery", "action_items": ["process refund", "apologize"], "entities": { "order_id": "ORD-2024-1234", "amount": "89.99 EUR" } }`

5. **Response Draft**: Ollama (qwen2.5:1.5b)
   - Kontextbezogener Antwortentwurf
   - Berücksichtigt Sentiment, Kategorie und extrahierte Daten
   - Professioneller, empathischer Ton

6. **Escalation Node**: Formatiert Alert für dringende Fälle

## Tech Stack
- n8n (Workflow Orchestration)
- Ollama + Qwen 2.5 (Sentiment, Classification, Extraction, Drafting)
- Webhook API (REST)
- Code Nodes (Preprocessing & Formatting)

## Erwartete Ergebnisse
- **75% schnellere E-Mail-Bearbeitung**: 12 Min → 3 Min (nur Review)
- **Sofortige Priorisierung**: Dringende E-Mails in < 5 Sekunden erkannt
- **Konsistente Kommunikation**: Einheitlicher Ton in allen Antworten
- **Zero Missed Urgencies**: Keine dringende E-Mail bleibt unerkannt
- **DSGVO-konform**: E-Mail-Inhalte bleiben auf eigenem Server

## Metriken für Portfolio
| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Bearbeitungszeit/E-Mail | 12 Minuten | 3 Minuten |
| Erkennung dringender E-Mails | 2-4 Stunden | < 5 Sekunden |
| Konsistenz der Antworten | Variabel | 95% Styleguide-konform |
| E-Mails pro Mitarbeiter/Tag | 40 | 120 |
| Kundenzufriedenheit (CSAT) | 3.5/5 | 4.4/5 |
