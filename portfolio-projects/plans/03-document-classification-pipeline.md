# Portfolio Projekt 3: Automatisierte Dokumentenklassifizierung & Datenextraktion

## Kategorie
Workflow Automation / Document AI

## Branche
Versicherung / Recht / Finanzwesen / Verwaltung

## Challenge
Eine Versicherungsgesellschaft verarbeitet täglich 300+ eingehende Dokumente: Schadensmeldungen, Vertragsänderungen, Kündigungen, Rechnungen und allgemeine Korrespondenz. Die manuelle Sichtung und Zuordnung dauert durchschnittlich 8 Minuten pro Dokument. Fehlerquote bei der Klassifizierung: 15%. Bearbeitungsrückstände von bis zu 3 Tagen.

## Lösung
Eine KI-gestützte Dokumenten-Pipeline, die:
- Eingehende Dokumente (als Text) automatisch entgegennimmt
- Den Dokumenttyp klassifiziert (Schadenmeldung, Kündigung, Rechnung, etc.)
- Schlüsseldaten extrahiert (Name, Vertragsnummer, Datum, Beträge)
- Eine Dringlichkeitsbewertung vornimmt
- Strukturierte Daten als JSON zurückgibt
- Dokumente automatisch an die richtige Abteilung routet

## Technische Architektur (n8n Workflow)

```
[Webhook Trigger: Document Input]
    → [Text Preprocessing]
        - Whitespace normalization
        - Length check
    → [Document Classification via Ollama]
        - Type: claim/cancellation/invoice/contract_change/correspondence
        - Confidence score
    → [Key Data Extraction via Ollama]
        - Structured extraction based on document type
        - Different extraction schemas per type
    → [Urgency Assessment via Ollama]
        - Priority: critical/high/medium/low
        - Reasoning
    → [Data Validation & Formatting]
        - Schema validation
        - Missing field detection
    → [Switch: Route by Document Type]
        → Claim → [Format for Claims Department]
        → Cancellation → [Format for Retention Team]
        → Invoice → [Format for Finance]
        → Other → [Format for General Processing]
    → [Webhook Response: Structured Result]
```

### Nodes im Detail

1. **Webhook Trigger**: POST `/webhook/document-classify`
   - Input: `{ "document_text": "...", "source": "email|upload|scan", "sender": "..." }`

2. **Document Classification**: Ollama (qwen2.5:1.5b)
   - Output: `{ "type": "claim", "confidence": 0.94, "language": "de" }`

3. **Key Data Extraction**: Ollama (qwen2.5:1.5b)
   - Dynamischer Prompt je nach Dokumenttyp
   - Claim → Name, Datum, Schadensart, Betrag, Vertragsnr.
   - Invoice → Rechnungsnr., Betrag, Fälligkeitsdatum, Absender
   - Cancellation → Name, Vertragsnr., Kündigungsdatum, Grund

4. **Urgency Assessment**: Ollama (qwen2.5:1.5b)
   - Berücksichtigt: Fristen, Beträge, Schadensart, Wortwahl

5. **Validation Node**: Code Node
   - Prüft Vollständigkeit der extrahierten Daten
   - Markiert fehlende Pflichtfelder

## Tech Stack
- n8n (Workflow Orchestration)
- Ollama + Qwen 2.5 (Klassifizierung, Extraktion, Bewertung)
- Webhook API (REST)
- Code Nodes (Validation & Formatting)

## Erwartete Ergebnisse
- **90% Reduktion manueller Sortierarbeit**
- **Bearbeitungszeit pro Dokument: 8 Min → 4 Sekunden**
- **Fehlerquote: 15% → 3%** bei der Klassifizierung
- **Rückstandsabbau**: 3 Tage → Echtzeit-Verarbeitung
- **DSGVO-konform**: Keine Dokumentdaten verlassen den Server

## Metriken für Portfolio
| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Verarbeitungszeit/Dokument | 8 Minuten | < 5 Sekunden |
| Klassifizierungsgenauigkeit | 85% | 97% |
| Täglicher Dokumentrückstand | 150+ Dokumente | 0 |
| Personalaufwand Sortierung | 3 FTE | 0.3 FTE |
| Kosten pro Dokument | 2.40 EUR | 0.08 EUR |
