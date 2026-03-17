# Portfolio Projekt 5: KI-gestützte CRM-Datenanreicherung & Scoring

## Kategorie
Integration / Data Analytics

## Branche
B2B / SaaS / Vertrieb

## Challenge
Ein B2B-Unternehmen hat 5.000+ Kontakte im CRM, aber 60% der Datensätze sind unvollständig. Fehlende Branchen-Tags, veraltete Unternehmensinformationen, keine einheitliche Bewertung. Das Sales-Team verschwendet Zeit mit der manuellen Datenpflege und kann nicht priorisieren, welche Kontakte am wertvollsten sind. Kampagnen-Targeting ist ungenau.

## Lösung
Ein automatisiertes CRM-Anreicherungssystem, das:
- Kontakte aus dem Twenty CRM periodisch oder on-demand abruft
- Vorhandene Daten per KI analysiert und ergänzt
- Branche, Unternehmensgröße und Engagement-Level klassifiziert
- Einen Customer-Value-Score berechnet
- Angereicherte Daten zurück ins CRM schreibt
- Anomalien und Duplikate erkennt

## Technische Architektur (n8n Workflow)

```
[Webhook Trigger: Enrich Request OR Schedule Trigger]
    → [Fetch Contacts from Twenty CRM]
        - GraphQL API call
        - Filter: incomplete or outdated records
    → [Loop: For Each Contact]
        → [AI Data Analysis via Ollama]
            - Analyze existing data points
            - Infer missing fields
            - Classify industry & company size
        → [Customer Value Scoring]
            - Engagement indicators
            - Company fit score
            - Purchase likelihood
        → [Data Quality Check]
            - Completeness score
            - Duplicate detection
            - Anomaly flagging
    → [Batch Update Twenty CRM]
        - Write enriched data back
        - Update tags and scores
    → [Summary Report Generation]
        - Stats: enriched, flagged, duplicates
    → [Webhook Response: Enrichment Report]
```

### Nodes im Detail

1. **Webhook/Schedule Trigger**:
   - POST `/webhook/crm-enrich` (on-demand)
   - Input: `{ "batch_size": 50, "filter": "incomplete" }`

2. **Fetch CRM Data**: HTTP Request → Twenty CRM GraphQL API
   - Query: Kontakte mit fehlenden Feldern

3. **AI Enrichment**: Ollama (qwen2.5:1.5b)
   - Analysiert Name, E-Mail-Domain, bisherige Notizen
   - Inferiert: Branche, Rolle, Unternehmensgröße, Sprache

4. **Value Scoring**: Code Node
   - Gewichtete Formel aus:
     - Datenvollständigkeit (20%)
     - Unternehmensgröße (25%)
     - Branchenrelevanz (25%)
     - Interaktionshistorie (30%)
   - Score: 0-100

5. **CRM Update**: HTTP Request → Twenty CRM API
   - Batch-Update mit angereicherten Daten

6. **Report Generator**: Ollama + Code Node
   - Zusammenfassung der Anreicherung
   - Statistiken und Empfehlungen

## Tech Stack
- n8n (Workflow Orchestration)
- Ollama + Qwen 2.5 (Data Analysis & Classification)
- Twenty CRM (GraphQL API)
- Code Nodes (Scoring Algorithm & Reporting)

## Erwartete Ergebnisse
- **Datenvollständigkeit: 40% → 92%** der CRM-Kontakte
- **15h/Woche weniger manuelle Datenpflege**
- **45% besseres Kampagnen-Targeting** durch akkurate Tags
- **Automatisches Scoring**: Priorisierung ohne Bauchgefühl
- **Duplikaterkennung**: 200+ Duplikate identifiziert und gemerged

## Metriken für Portfolio
| Metrik | Vorher | Nachher |
|--------|--------|---------|
| CRM-Datenvollständigkeit | 40% | 92% |
| Manuelle Datenpflege | 15h/Woche | 2h/Woche |
| Kampagnen-Response-Rate | 2.1% | 5.8% |
| Lead Scoring Accuracy | Manuell/Subjektiv | 87% Precision |
| Duplikate im System | ~200 unerkannt | 98% identifiziert |
