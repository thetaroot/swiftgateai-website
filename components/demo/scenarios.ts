// ─── Types ───

export interface DemoStep {
  type: 'user_message' | 'thinking' | 'delegation' | 'agent_action' | 'ai_response' | 'app_update';
  content: string;
  agent?: 'ceo' | 'communications' | 'calendar' | 'tasks' | 'knowledge' | 'system';
  app?: 'inbox' | 'calendar' | 'crm' | 'tasks' | 'knowledge';
  delay: number;
}

export interface DemoScenario {
  id: string;
  steps: DemoStep[];
}

export interface SharedContext {
  contacts: { name: string; company: string; email: string; role?: string }[];
  lastScenario: string | null;
  mentionedDates: string[];
  mentionedTopics: string[];
}

export interface CrossoverPattern {
  after: string;
  trigger: RegExp;
  steps: DemoStep[];
  contextUpdate: Partial<SharedContext>;
}

// ─── Crossover Patterns (all 0 tokens, pre-scripted) ───

export const crossoverPatterns: CrossoverPattern[] = [
  // 1. inbox → calendar
  {
    after: 'inbox',
    trigger: /termin.*hoffmann|meeting.*hoffmann|plane.*termin|schedule.*hoffmann/i,
    steps: [
      { type: 'thinking', content: 'Crossover erkannt — Calendar Agent wird aktiviert', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: 'Delegiert an Calendar Agent', agent: 'calendar', delay: 800 },
      { type: 'agent_action', content: 'Verfügbare Slots werden geprüft...', agent: 'calendar', app: 'calendar', delay: 1000 },
      { type: 'app_update', content: 'Freier Slot gefunden: Mittwoch 14:00–15:00', app: 'calendar', delay: 800 },
      { type: 'agent_action', content: 'Meeting-Einladung wird erstellt...', agent: 'calendar', app: 'calendar', delay: 1000 },
      { type: 'app_update', content: 'Meeting erstellt: "Erstgespräch Dr. Hoffmann — KI-Qualitätskontrolle"', app: 'calendar', delay: 800 },
      { type: 'ai_response', content: 'Termin eingerichtet: **Mittwoch, 14:00–15:00** mit Dr. Stefan Hoffmann (Technik GmbH).\n\nAgenda:\n1. Vorstellung unseres Beratungsansatzes\n2. KI-gestützte Qualitätskontrolle — Möglichkeiten\n3. Nächste Schritte & Timeline\n\nEinladung wurde an hoffmann@technik-gmbh.de gesendet. Soll ich Briefing-Notizen vorbereiten?', delay: 600 },
    ],
    contextUpdate: { mentionedDates: ['Mittwoch 14:00'], mentionedTopics: ['Hoffmann-Meeting'] },
  },
  // 2. inbox → tasks
  {
    after: 'inbox',
    trigger: /aufgabe.*hoffmann|task.*hoffmann|erstelle.*aufgabe.*angebot/i,
    steps: [
      { type: 'thinking', content: 'Crossover erkannt — Task Agent wird aktiviert', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: 'Delegiert an Task Agent', agent: 'tasks', delay: 800 },
      { type: 'agent_action', content: 'Neue Aufgabe wird in Vikunja angelegt...', agent: 'tasks', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: 'Task erstellt: "Angebot für Technik GmbH erstellen"', app: 'tasks', delay: 800 },
      { type: 'app_update', content: 'Deadline gesetzt: Freitag EOD · Priorität: Hoch', app: 'tasks', delay: 700 },
      { type: 'ai_response', content: 'Aufgabe erstellt:\n\n**Angebot für Technik GmbH erstellen**\n- Deadline: Freitag EOD\n- Priorität: Hoch\n- Kontext: Bezug auf Dr. Hoffmanns Anfrage zur KI-gestützten Qualitätskontrolle\n\nSoll ich relevante Case Studies aus dem Firmenwissen anhängen?', delay: 600 },
    ],
    contextUpdate: { mentionedTopics: ['Hoffmann-Angebot'] },
  },
  // 3. calendar → tasks
  {
    after: 'calendar',
    trigger: /vorbereitung.*meeting|vorbereitung.*hoffmann|erstelle.*vorbereitung/i,
    steps: [
      { type: 'thinking', content: 'Crossover erkannt — Task Agent wird aktiviert', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: 'Delegiert an Task Agent', agent: 'tasks', delay: 800 },
      { type: 'agent_action', content: 'Vorbereitungs-Tasks werden erstellt...', agent: 'tasks', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: 'Hauptaufgabe: "Hoffmann-Meeting vorbereiten"', app: 'tasks', delay: 800 },
      { type: 'app_update', content: 'Subtask 1: Firmenprofil Technik GmbH zusammenfassen', app: 'tasks', delay: 600 },
      { type: 'app_update', content: 'Subtask 2: Relevante Case Studies auswählen', app: 'tasks', delay: 600 },
      { type: 'app_update', content: 'Subtask 3: Preiskalkulation erstellen', app: 'tasks', delay: 600 },
      { type: 'ai_response', content: 'Vorbereitungs-Tasks erstellt:\n\n**Hoffmann-Meeting vorbereiten**\n1. ☐ Firmenprofil Technik GmbH zusammenfassen\n2. ☐ Relevante Case Studies auswählen\n3. ☐ Preiskalkulation erstellen\n\nDeadline: Dienstag EOD (1 Tag vor Meeting). Soll ich direkt mit dem Firmenprofil starten?', delay: 600 },
    ],
    contextUpdate: { mentionedTopics: ['Meeting-Vorbereitung'] },
  },
  // 4. calendar → crm
  {
    after: 'calendar',
    trigger: /hoffmann.*kontakt|kontakt.*hoffmann|zeig.*hoffmann/i,
    steps: [
      { type: 'thinking', content: 'Crossover erkannt — CRM wird abgefragt', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: 'Delegiert an Communications Agent (CRM)', agent: 'communications', delay: 800 },
      { type: 'agent_action', content: 'CRM-Kontakt wird geladen...', agent: 'communications', app: 'crm', delay: 1000 },
      { type: 'app_update', content: 'Kontakt gefunden: Dr. Stefan Hoffmann', app: 'crm', delay: 800 },
      { type: 'ai_response', content: '**Dr. Stefan Hoffmann**\nTechnik GmbH · CTO\n\n- E-Mail: hoffmann@technik-gmbh.de\n- Telefon: +49 201 555-4321\n- Branche: Fertigungsindustrie\n- Mitarbeiter: 280\n- Status: Kontaktiert\n- Letzte Interaktion: Anfrage KI-Qualitätskontrolle (heute)\n\nSoll ich das Firmenprofil mit weiteren Details anreichern?', delay: 600 },
    ],
    contextUpdate: { contacts: [{ name: 'Dr. Stefan Hoffmann', company: 'Technik GmbH', email: 'hoffmann@technik-gmbh.de', role: 'CTO' }] },
  },
  // 5. crm → inbox
  {
    after: 'crm',
    trigger: /mail.*sarah|schreib.*sarah|follow.?up.*mail|e-?mail.*klein/i,
    steps: [
      { type: 'thinking', content: 'Crossover erkannt — Communications Agent wird aktiviert', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: 'Delegiert an Communications Agent', agent: 'communications', delay: 800 },
      { type: 'agent_action', content: 'E-Mail-Entwurf wird erstellt...', agent: 'communications', app: 'inbox', delay: 1200 },
      { type: 'delegation', content: 'Knowledge Agent lädt Firmenwissen...', agent: 'knowledge', delay: 800 },
      { type: 'agent_action', content: 'Kommunikationsstil und Kontakthistorie geladen', agent: 'knowledge', app: 'knowledge', delay: 1000 },
      { type: 'app_update', content: 'E-Mail-Entwurf bereit: Follow-up Sarah Klein', app: 'inbox', delay: 800 },
      { type: 'ai_response', content: 'Follow-up E-Mail vorbereitet:\n\n**An:** sarah.klein@novadigital.de\n**Betreff:** Ihr Interesse an KI-Automatisierung — nächste Schritte\n\nSehr geehrte Frau Klein,\n\nvielen Dank für Ihre Anfrage über unser Kontaktformular. Gerne stelle ich Ihnen unseren Beratungsansatz in einem persönlichen Gespräch vor.\n\nIch schlage folgende Termine vor: [...]\n\nMit freundlichen Grüßen\n\n*Entwurf basiert auf Firmenwissen und bisherigem Kommunikationsstil.* Soll ich absenden?', delay: 600 },
    ],
    contextUpdate: { mentionedTopics: ['Follow-up Sarah Klein'] },
  },
  // 6. tasks → calendar
  {
    after: 'tasks',
    trigger: /review.*termin|plane.*review|termin.*tasks|termin.*offene/i,
    steps: [
      { type: 'thinking', content: 'Crossover erkannt — Calendar Agent wird aktiviert', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: 'Delegiert an Calendar Agent', agent: 'calendar', delay: 800 },
      { type: 'agent_action', content: 'Verfügbare Slots für Review werden gesucht...', agent: 'calendar', app: 'calendar', delay: 1000 },
      { type: 'app_update', content: 'Slot gefunden: Donnerstag 10:00–11:00', app: 'calendar', delay: 800 },
      { type: 'app_update', content: 'Review-Termin erstellt mit Agenda aus offenen Tasks', app: 'calendar', delay: 800 },
      { type: 'ai_response', content: 'Review-Termin eingerichtet:\n\n**Donnerstag, 10:00–11:00** — Sprint Review\n\nAgenda (aus offenen Tasks):\n1. Angebotsentwurf Technik GmbH — Status\n2. CRM-Daten Bereinigung — Blocker\n3. Sprint-Velocity & Planung nächste Woche\n\nKalendereinladung wurde erstellt. Soll ich Briefing-Notizen vorbereiten?', delay: 600 },
    ],
    contextUpdate: { mentionedDates: ['Donnerstag 10:00'] },
  },
  // 7. knowledge → inbox
  {
    after: 'knowledge',
    trigger: /antworte.*kunde|antwort.*mail|schreib.*antwort.*info/i,
    steps: [
      { type: 'thinking', content: 'Crossover erkannt — Communications Agent wird aktiviert', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: 'Delegiert an Communications Agent', agent: 'communications', delay: 800 },
      { type: 'delegation', content: 'Knowledge Agent stellt Fakten zusammen...', agent: 'knowledge', delay: 800 },
      { type: 'agent_action', content: 'Preismodell und FAQ-Daten werden in E-Mail integriert...', agent: 'communications', app: 'inbox', delay: 1200 },
      { type: 'app_update', content: 'E-Mail-Entwurf mit RAG-Daten erstellt', app: 'inbox', delay: 800 },
      { type: 'ai_response', content: 'E-Mail-Antwort vorbereitet mit Daten aus dem Firmenwissen:\n\n**Betreff:** Re: Anfrage Preismodell\n\nDer Entwurf enthält:\n- Preisphasen für Mittelständler (aus *Preismodell_2026.pdf*)\n- FAQ-Antworten zu Betriebskosten (aus *FAQ_Vertrieb.pdf*)\n- Individuelles Angebot basierend auf Firmengröße\n\n*3 Quellen referenziert, Konfidenz: 94%*\n\nSoll ich den Entwurf anpassen oder direkt absenden?', delay: 600 },
    ],
    contextUpdate: { mentionedTopics: ['Kundenantwort mit RAG-Daten'] },
  },
];

// ─── Scenarios ───

export const scenarios: Record<string, DemoScenario> = {
  inbox: {
    id: 'inbox',
    steps: [
      { type: 'user_message', content: 'Gibt es neue Anfragen?', delay: 0 },
      { type: 'thinking', content: 'Anfrage analysiert — Posteingang wird geprüft', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: 'Delegiert an Communications Agent', agent: 'communications', delay: 1000 },
      { type: 'agent_action', content: 'Posteingang wird gescannt: E-Mail, Website-Formular, WhatsApp Business...', agent: 'communications', app: 'inbox', delay: 1200 },
      { type: 'app_update', content: '3 neue Anfragen gefunden', app: 'inbox', delay: 1000 },
      { type: 'app_update', content: 'E-Mail: Dr. Stefan Hoffmann (Technik GmbH) — "Anfrage: KI-gestützte Qualitätskontrolle in Fertigungslinie"', app: 'inbox', delay: 800 },
      { type: 'app_update', content: 'Website-Formular: Sarah Klein (Nova Digital) — "Beratungstermin gewünscht"', app: 'inbox', delay: 800 },
      { type: 'app_update', content: 'WhatsApp Business: Martin Weber — "Rückfrage zum Angebot #247"', app: 'inbox', delay: 800 },
      { type: 'delegation', content: 'CRM-Abgleich: Absender werden geprüft...', agent: 'communications', delay: 800 },
      { type: 'agent_action', content: 'Dr. Hoffmann: Neuer Kontakt → CRM-Eintrag erstellt · Sarah Klein: Bestehender Lead · Martin Weber: Bestandskunde', agent: 'communications', app: 'crm', delay: 1200 },
      { type: 'delegation', content: 'Knowledge Agent durchsucht Firmenwissen', agent: 'knowledge', delay: 1000 },
      { type: 'agent_action', content: 'Case Studies für Fertigungsindustrie geladen · Kommunikationsstil abgerufen · Preismodell Mittelstand bereit', agent: 'knowledge', app: 'knowledge', delay: 1400 },
      { type: 'agent_action', content: 'Personalisierte Antworten werden erstellt...', agent: 'communications', app: 'inbox', delay: 1200 },
      { type: 'app_update', content: '3 Antwort-Entwürfe vorbereitet — jeweils basierend auf Firmenwissen und Kontakthistorie', app: 'inbox', delay: 1000 },
      { type: 'ai_response', content: '3 neue Anfragen verarbeitet:\n\n1. **Dr. Stefan Hoffmann** (Technik GmbH, CTO) fragt nach KI-gestützter Qualitätskontrolle in der Fertigungslinie — Antwort mit relevanten Case Studies und unserem Beratungsansatz vorbereitet. Neuer CRM-Eintrag angelegt.\n\n2. **Sarah Klein** (Nova Digital, Head of Operations) möchte einen Beratungstermin — Antwort mit verfügbaren Slots und Erstgespräch-Agenda vorbereitet.\n\n3. **Martin Weber** hat eine Rückfrage zu Angebot #247 — Antwort mit aktualisierten Konditionen aus dem Firmenwissen vorbereitet.\n\nAlle Entwürfe basieren auf unserem Kommunikationsstil und Firmenwissen. Soll ich einen **Termin mit Dr. Hoffmann** vorschlagen?', delay: 600 },
    ],
  },

  calendar: {
    id: 'calendar',
    steps: [
      { type: 'user_message', content: 'Wie sieht meine Woche aus?', delay: 0 },
      { type: 'thinking', content: 'Anfrage analysiert — Kalenderübersicht angefragt', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: 'Delegiert an Calendar Agent', agent: 'calendar', delay: 1000 },
      { type: 'agent_action', content: 'Kalender wird synchronisiert (iCloud CalDAV)...', agent: 'calendar', app: 'calendar', delay: 1200 },
      { type: 'app_update', content: 'Wochenansicht geladen — 8 Termine gefunden', app: 'calendar', delay: 1000 },
      { type: 'agent_action', content: 'Auslastung berechnet: 78% — Konfliktprüfung läuft...', agent: 'calendar', app: 'calendar', delay: 800 },
      { type: 'app_update', content: 'Konflikt erkannt: Di 15:00 Partnergespräch überschneidet sich mit Deep-Work-Block', app: 'calendar', delay: 900 },
      { type: 'agent_action', content: 'Lösungsvorschlag: Deep Work auf Di 09:00 verschieben', agent: 'calendar', app: 'calendar', delay: 800 },
      { type: 'delegation', content: 'Task Agent wird konsultiert', agent: 'tasks', delay: 800 },
      { type: 'agent_action', content: 'Offene Tasks mit Kalender abgeglichen — Reisezeiten einkalkuliert', agent: 'tasks', app: 'tasks', delay: 1200 },
      { type: 'app_update', content: 'Mittwoch 14:00–17:00 als freier Block identifiziert', app: 'calendar', delay: 1000 },
      { type: 'app_update', content: 'Empfehlung: Angebotserstellung für Technik GmbH in freien Block einplanen', app: 'calendar', delay: 800 },
      { type: 'agent_action', content: 'Briefing-Notizen für Hoffmann-Meeting werden vorbereitet...', agent: 'knowledge', app: 'knowledge', delay: 1000 },
      { type: 'app_update', content: 'Briefing bereit: Firmenprofil Technik GmbH + Gesprächsleitfaden', app: 'calendar', delay: 800 },
      { type: 'ai_response', content: 'Ihre Woche im Überblick:\n\n**Mo:** 09:00 Team Standup · 14:00 Client Call Müller GmbH\n**Di:** 09:00 Deep Work *(verschoben)* · 15:00 Partnergespräch Nova Digital\n**Mi:** 09:30 Sprint Review · 14:00–17:00 **frei**\n**Do:** 11:00 Investoren-Update · 15:00 Tech Review\n**Fr:** 10:00 Weekly Retro · 14:00 Offsite Planning\n\nAuslastung: **78%**. Einen Terminkonflikt am Dienstag habe ich aufgelöst (Deep Work verschoben). Der freie Block am **Mittwoch Nachmittag** eignet sich ideal für die Angebotserstellung Technik GmbH.\n\nBriefing-Notizen für das Hoffmann-Meeting liegen bereit. Alle Termine optimiert.', delay: 600 },
    ],
  },

  tasks: {
    id: 'tasks',
    steps: [
      { type: 'user_message', content: 'Was steht heute an?', delay: 0 },
      { type: 'thinking', content: 'Anfrage analysiert — Aufgabenübersicht angefragt', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: 'Delegiert an Task Agent', agent: 'tasks', delay: 1000 },
      { type: 'agent_action', content: 'Projektboard wird geladen (Vikunja)...', agent: 'tasks', app: 'tasks', delay: 1200 },
      { type: 'app_update', content: '2 Projekte geladen — 9 Tasks insgesamt', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: '3 Tasks überfällig · 2 in Bearbeitung · 4 geplant', app: 'tasks', delay: 800 },
      { type: 'agent_action', content: 'Abhängigkeiten und Prioritäten werden analysiert...', agent: 'tasks', app: 'tasks', delay: 1200 },
      { type: 'app_update', content: 'Blocker erkannt: "Systemarchitektur" blockiert "Angebotsentwurf Technik GmbH"', app: 'tasks', delay: 900 },
      { type: 'delegation', content: 'Calendar Agent prüft heutige Zeitfenster', agent: 'calendar', delay: 800 },
      { type: 'agent_action', content: 'Zeitfenster für Tasks identifiziert: 3h produktive Zeit verfügbar', agent: 'calendar', app: 'calendar', delay: 1000 },
      { type: 'agent_action', content: 'Automatische Priorisierung basierend auf Deadlines und Abhängigkeiten...', agent: 'tasks', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: 'Standup-Zusammenfassung erstellt', app: 'tasks', delay: 800 },
      { type: 'app_update', content: 'Priorisierung abgeschlossen — Eskalation für Blocker empfohlen', app: 'tasks', delay: 800 },
      { type: 'ai_response', content: 'Sprint-Status aktualisiert:\n\n**Überfällig:**\n- Angebotsentwurf Technik GmbH (2 Tage) — **Blocker:** wartet auf Systemarchitektur\n- CRM-Daten Bereinigung (1 Tag)\n- Investoren-Deck Aktualisierung (heute fällig)\n\n**In Bearbeitung:**\n- Systemarchitektur (60% fertig)\n- Design Mockups Website Relaunch\n\n**Mein Vorschlag:**\n1. Systemarchitektur finalisieren → entsperrt Angebotsentwurf\n2. Investoren-Deck in der Deep-Work-Phase aktualisieren\n3. CRM-Bereinigung läuft automatisch im Hintergrund\n\n**1 Blocker erfordert Aufmerksamkeit.** Soll ich die Eskalation einleiten?', delay: 600 },
    ],
  },

  crm: {
    id: 'crm',
    steps: [
      { type: 'user_message', content: 'Zeig mir den Status unserer Leads.', delay: 0 },
      { type: 'thinking', content: 'Anfrage analysiert — CRM-Übersicht angefragt', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: 'Delegiert an Communications Agent (CRM)', agent: 'communications', delay: 1000 },
      { type: 'agent_action', content: 'CRM-Pipeline wird geladen (Twenty CRM)...', agent: 'communications', app: 'crm', delay: 1200 },
      { type: 'app_update', content: 'Pipeline geladen: 12 aktive Leads', app: 'crm', delay: 1000 },
      { type: 'app_update', content: 'Neuer Lead identifiziert: Sarah Klein, Nova Digital', app: 'crm', delay: 800 },
      { type: 'delegation', content: 'Knowledge Agent recherchiert Firmendaten', agent: 'knowledge', delay: 800 },
      { type: 'agent_action', content: 'LinkedIn-Profil, Firmengröße und Branchendaten abgerufen', agent: 'knowledge', app: 'knowledge', delay: 1400 },
      { type: 'app_update', content: 'Kontakt angereichert: Nova Digital — E-Commerce Agentur, 45 MA, Head of Operations', app: 'crm', delay: 1000 },
      { type: 'agent_action', content: 'Lead-Score wird berechnet...', agent: 'communications', app: 'crm', delay: 800 },
      { type: 'app_update', content: 'Lead-Score: 78/100 — Kategorie: Enterprise, Automation-Interesse', app: 'crm', delay: 800 },
      { type: 'agent_action', content: 'Follow-up Reminder wird erstellt...', agent: 'tasks', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: 'Follow-up für Sarah Klein am Donnerstag erstellt', app: 'crm', delay: 800 },
      { type: 'ai_response', content: 'CRM-Pipeline Übersicht:\n\n**Neue Leads (3):** Sarah Klein (Nova Digital), Martin Weber, Firma Schulz\n**Kontaktiert (4):** Dr. Hoffmann (Technik GmbH) + 3 weitere\n**Angebot (2):** Müller GmbH, DataFlow AG\n**Gewonnen (3):** Bauer & Partner, MedTech Solutions, LogiServ\n\nNeuer Lead im Fokus: **Sarah Klein, Nova Digital** — E-Commerce Agentur, 45 Mitarbeiter, Head of Operations. Lead-Score: **78/100** (Enterprise, Automation-Interesse).\n\nKontakt angereichert und Follow-up am **Donnerstag** erstellt. Soll ich eine **Follow-up Mail an Sarah Klein** verfassen?', delay: 600 },
    ],
  },

  knowledge: {
    id: 'knowledge',
    steps: [
      { type: 'user_message', content: 'Wie funktioniert unser Onboarding-Prozess für Enterprise-Kunden?', delay: 0 },
      { type: 'thinking', content: 'Anfrage analysiert — Wissensabfrage erkannt', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: 'Delegiert an Knowledge Agent', agent: 'knowledge', delay: 1000 },
      { type: 'agent_action', content: 'Vektordatenbank wird durchsucht (Qdrant)...', agent: 'knowledge', app: 'knowledge', delay: 1200 },
      { type: 'app_update', content: 'Semantische Suche: "Enterprise Onboarding Prozess"', app: 'knowledge', delay: 1000 },
      { type: 'app_update', content: 'Treffer 1: Onboarding_Enterprise.pdf — 95% Relevanz', app: 'knowledge', delay: 800 },
      { type: 'app_update', content: 'Treffer 2: Prozesshandbuch_v3.md — 91% Relevanz', app: 'knowledge', delay: 700 },
      { type: 'app_update', content: 'Treffer 3: Checkliste_Kickoff.pdf — 87% Relevanz', app: 'knowledge', delay: 700 },
      { type: 'app_update', content: 'Treffer 4: FAQ_Onboarding.md — 82% Relevanz', app: 'knowledge', delay: 600 },
      { type: 'agent_action', content: 'Informationen aus 4 Dokumenten werden synthetisiert...', agent: 'knowledge', app: 'knowledge', delay: 1400 },
      { type: 'app_update', content: 'Antwort mit Quellenverweisen erstellt — Konfidenz: 93%', app: 'knowledge', delay: 1000 },
      { type: 'agent_action', content: 'Dokumenten-Status wird geprüft...', agent: 'knowledge', app: 'knowledge', delay: 800 },
      { type: 'ai_response', content: 'Enterprise Onboarding-Prozess (4 Quellen, Konfidenz: **93%**):\n\n**Phase 1 — Kickoff (Woche 1)**\nInitialworkshop · Stakeholder-Mapping · Prozessanalyse · Datenzugang klären\n\n**Phase 2 — Integration (Woche 2–4)**\nAPI-Anbindungen · Datenimport · Agenten-Konfiguration · Testumgebung\n\n**Phase 3 — Training (Woche 5–6)**\nTeam-Schulung · Dokumentation · Feedback-Runden · Feintuning\n\n**Phase 4 — Go-Live (Woche 7–8)**\nSoft Launch · Monitoring · Eskalationspfade · Übergabe an Support\n\n**Quellen:** Onboarding_Enterprise.pdf · Prozesshandbuch_v3.md · Checkliste_Kickoff.pdf · FAQ_Onboarding.md\n\n*Hinweis: Das Onboarding-Dokument wurde zuletzt vor **47 Tagen** aktualisiert. Soll ich eine Überarbeitung einplanen?*', delay: 600 },
    ],
  },
};

// ─── Keyword Patterns (for free-text routing to API) ───

export const keywordPatterns: Record<string, RegExp> = {
  inbox: /e-?mail|nachricht|inbox|antwort|posteingang|mail|message|reply|anfrage/i,
  calendar: /termin|kalender|meeting|datum|schedule|appointment|woche/i,
  crm: /kunde|kontakt|crm|firma|lead|pipeline|customer|company/i,
  tasks: /aufgabe|task|projekt|todo|erstell|board|sprint/i,
  knowledge: /wissen|dokument|suche|datenbank|rag|knowledge|search|preis|faq/i,
};

// ─── Agent Dashboard Log Entry Pool ───

export const logEntryPool: { agent: string; action: string; icon: string }[] = [
  { agent: 'communications', action: 'Posteingang synchronisiert — 0 neue E-Mails', icon: '📧' },
  { agent: 'calendar', action: 'Nächster Termin in 2h 15min — kein Konflikt', icon: '📅' },
  { agent: 'tasks', action: 'Sprint-Board geprüft — 3 Tasks in Bearbeitung', icon: '✅' },
  { agent: 'system', action: 'Server-Health: CPU 12%, RAM 64%, alle Container aktiv', icon: '🔧' },
  { agent: 'knowledge', action: 'Vektordatenbank: 2.847 Dokumente indexiert', icon: '🧠' },
  { agent: 'ceo', action: 'Warteschleife — keine offenen Delegierungen', icon: '👔' },
  { agent: 'communications', action: 'WhatsApp Business: Verbindung aktiv, 0 ungelesen', icon: '💬' },
  { agent: 'calendar', action: 'CalDAV-Sync abgeschlossen — keine Änderungen', icon: '🔄' },
  { agent: 'tasks', action: 'Automatische Bereinigung: 2 erledigte Tasks archiviert', icon: '📦' },
  { agent: 'system', action: 'TLS-Zertifikate: Gültig bis 2026-08-15', icon: '🔒' },
  { agent: 'knowledge', action: 'Backup: Vektordatenbank erfolgreich gesichert', icon: '💾' },
  { agent: 'ceo', action: 'Tagesbericht: 7 Aufgaben erledigt, 0 Eskalationen', icon: '📊' },
  { agent: 'communications', action: 'CRM-Sync: 12 aktive Leads, 0 Änderungen', icon: '👥' },
  { agent: 'system', action: 'Docker: 18/18 Container laufen, Uptime 99.97%', icon: '🐳' },
  { agent: 'knowledge', action: 'RAG-Pipeline: Letzte Indexierung vor 3h — aktuell', icon: '🔍' },
];
