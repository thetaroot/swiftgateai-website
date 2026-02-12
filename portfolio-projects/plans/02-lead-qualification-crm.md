# Portfolio Projekt 2: Automatische Lead-Qualifizierung & CRM-Integration

## Kategorie
AI & Automation / CRM Integration

## Branche
B2B SaaS / Agentur / Beratung

## Challenge
Ein B2B-Unternehmen generiert monatlich 500+ Leads über Website-Formulare, LinkedIn und Events. Das Sales-Team verbringt 40% seiner Zeit mit der manuellen Bewertung und Einordnung von Leads. Viele qualifizierte Leads gehen verloren, weil sie zu spät kontaktiert werden. Es gibt keine einheitliche Bewertungslogik — jeder Vertriebler bewertet anders.

## Lösung
Ein KI-gestütztes Lead-Scoring-System, das:
- Eingehende Leads automatisch über Webhook entgegennimmt
- Unternehmensgröße, Branche und Bedarf per KI analysiert
- Einen Lead-Score (0-100) und eine Priorität (hot/warm/cold) vergibt
- Qualifizierte Leads automatisch im CRM (Twenty) anlegt
- Das Sales-Team bei Hot-Leads sofort benachrichtigt
- Eine personalisierte Erstantwort generiert

## Technische Architektur (n8n Workflow)

```
[Webhook Trigger: New Lead]
    → [Data Validation & Cleaning]
    → [AI Lead Analysis via Ollama]
        - Company size estimation
        - Industry classification
        - Need/intent scoring
        - Budget indicator
    → [Lead Scoring Algorithm]
        - Score 0-100 berechnen
        - Priority: hot (80+) / warm (40-79) / cold (0-39)
    → [Switch: Priority Level]
        → Hot → [Create CRM Contact + Notify Sales + Generate Response]
        → Warm → [Create CRM Contact + Queue for Follow-up]
        → Cold → [Create CRM Contact + Add to Nurture]
    → [Webhook Response: Score + Next Steps]
```

### Nodes im Detail

1. **Webhook Trigger**: POST `/webhook/lead-qualification`
   - Input: `{ "name": "...", "email": "...", "company": "...", "message": "...", "source": "..." }`

2. **AI Lead Analysis**: Ollama (qwen2.5:1.5b)
   - Structured Output: Branche, geschätzte Größe, Kaufabsicht, Dringlichkeit

3. **Lead Scoring**: Code Node
   - Gewichtete Formel aus KI-Analyse + Quelldaten
   - Transparente Score-Begründung

4. **CRM Integration**: HTTP Request → Twenty CRM API
   - Kontakt anlegen mit Score, Tags, Notes
   - Custom Fields für AI-Analyse-Ergebnisse

5. **Response Generator**: Ollama (qwen2.5:1.5b)
   - Personalisierte Erstantwort basierend auf Lead-Daten

## Tech Stack
- n8n (Workflow Orchestration)
- Ollama + Qwen 2.5 (Lead-Analyse & Response Generation)
- Twenty CRM (Kontaktverwaltung via REST API)
- Webhook API

## Erwartete Ergebnisse
- **70% weniger manuelle Bewertungszeit** im Sales-Team
- **Lead Response Time: 24h → 30 Sekunden**
- **35% höhere Conversion Rate** durch sofortige Hot-Lead-Bearbeitung
- **Einheitliches Scoring**: Konsistente, nachvollziehbare Bewertungskriterien
- **Zero Data Leakage**: Lokales LLM, keine externen API-Calls

## Metriken für Portfolio
| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Lead Response Time | 24 Stunden | < 30 Sekunden |
| Manuelle Bewertungszeit | 20h/Woche | 6h/Woche |
| Lead-to-Opportunity Rate | 12% | 28% |
| Sales-Cycle Length | 45 Tage | 32 Tage |
| Verlorene Hot-Leads | ~30/Monat | < 5/Monat |
