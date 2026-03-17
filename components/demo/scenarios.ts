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

export const getCrossoverPatterns = (lang: 'DE' | 'EN'): CrossoverPattern[] => [
  // 1. inbox → calendar
  {
    after: 'inbox',
    trigger: lang === 'DE' ? /termin.*hoffmann|meeting.*hoffmann|plane.*termin|schedule.*hoffmann/i : /appointment.*hoffmann|meeting.*hoffmann|schedule.*appointment|schedule.*hoffmann/i,
    steps: [
      { type: 'thinking', content: lang === 'DE' ? 'Crossover erkannt — Calendar Agent wird aktiviert' : 'Crossover detected — Activating Calendar Agent', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Calendar Agent' : 'Delegated to Calendar Agent', agent: 'calendar', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Verfügbare Slots werden geprüft...' : 'Checking available slots...', agent: 'calendar', app: 'calendar', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Freier Slot gefunden: Mittwoch 14:00–15:00' : 'Free slot found: Wednesday 2:00 PM – 3:00 PM', app: 'calendar', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Meeting-Einladung wird erstellt...' : 'Creating meeting invitation...', agent: 'calendar', app: 'calendar', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Meeting erstellt: "Erstgespräch Dr. Hoffmann — KI-Qualitätskontrolle"' : 'Meeting created: "Introductory Meeting Dr. Hoffmann — AI Quality Control"', app: 'calendar', delay: 800 },
      { type: 'ai_response', content: lang === 'DE' 
        ? 'Termin eingerichtet: **Mittwoch, 14:00–15:00** mit Dr. Stefan Hoffmann (Technik GmbH).\n\nAgenda:\n1. Vorstellung unseres Beratungsansatzes\n2. KI-gestützte Qualitätskontrolle — Möglichkeiten\n3. Nächste Schritte & Timeline\n\nEinladung wurde an hoffmann@technik-gmbh.de gesendet. Soll ich Briefing-Notizen vorbereiten?' 
        : 'Appointment scheduled: **Wednesday, 2:00 PM – 3:00 PM** with Dr. Stefan Hoffmann (Technik GmbH).\n\nAgenda:\n1. Presentation of our consulting approach\n2. AI-powered quality control — possibilities\n3. Next steps & timeline\n\nInvitation sent to hoffmann@technik-gmbh.de. Should I prepare briefing notes?', delay: 600 },
    ],
    contextUpdate: { mentionedDates: [lang === 'DE' ? 'Mittwoch 14:00' : 'Wednesday 2:00 PM'], mentionedTopics: ['Hoffmann-Meeting'] },
  },
  // 2. inbox → tasks
  {
    after: 'inbox',
    trigger: lang === 'DE' ? /aufgabe.*hoffmann|task.*hoffmann|erstelle.*aufgabe.*angebot/i : /task.*hoffmann|create.*task.*proposal/i,
    steps: [
      { type: 'thinking', content: lang === 'DE' ? 'Crossover erkannt — Task Agent wird aktiviert' : 'Crossover detected — Activating Task Agent', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Task Agent' : 'Delegated to Task Agent', agent: 'tasks', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Neue Aufgabe wird in Vikunja angelegt...' : 'Creating new task in Vikunja...', agent: 'tasks', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Task erstellt: "Angebot für Technik GmbH erstellen"' : 'Task created: "Create proposal for Technik GmbH"', app: 'tasks', delay: 800 },
      { type: 'app_update', content: lang === 'DE' ? 'Deadline gesetzt: Freitag EOD · Priorität: Hoch' : 'Deadline set: Friday EOD · Priority: High', app: 'tasks', delay: 700 },
      { type: 'ai_response', content: lang === 'DE'
        ? 'Aufgabe erstellt:\n\n**Angebot für Technik GmbH erstellen**\n- Deadline: Freitag EOD\n- Priorität: Hoch\n- Kontext: Bezug auf Dr. Hoffmanns Anfrage zur KI-gestützten Qualitätskontrolle\n\nSoll ich relevante Case Studies aus dem Firmenwissen anhängen?'
        : 'Task created:\n\n**Create proposal for Technik GmbH**\n- Deadline: Friday EOD\n- Priority: High\n- Context: Referring to Dr. Hoffmann\'s inquiry about AI-powered quality control\n\nShould I attach relevant case studies from the corporate knowledge base?', delay: 600 },
    ],
    contextUpdate: { mentionedTopics: ['Hoffmann-Proposal'] },
  },
  // 3. calendar → tasks
  {
    after: 'calendar',
    trigger: lang === 'DE' ? /vorbereitung.*meeting|vorbereitung.*hoffmann|erstelle.*vorbereitung/i : /preparation.*meeting|prepare.*hoffmann|create.*preparation/i,
    steps: [
      { type: 'thinking', content: lang === 'DE' ? 'Crossover erkannt — Task Agent wird aktiviert' : 'Crossover detected — Activating Task Agent', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Task Agent' : 'Delegated to Task Agent', agent: 'tasks', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Vorbereitungs-Tasks werden erstellt...' : 'Creating preparation tasks...', agent: 'tasks', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Hauptaufgabe: "Hoffmann-Meeting vorbereiten"' : 'Main task: "Prepare Hoffmann meeting"', app: 'tasks', delay: 800 },
      { type: 'app_update', content: lang === 'DE' ? 'Subtask 1: Firmenprofil Technik GmbH zusammenfassen' : 'Subtask 1: Summarize Technik GmbH company profile', app: 'tasks', delay: 600 },
      { type: 'app_update', content: lang === 'DE' ? 'Subtask 2: Relevante Case Studies auswählen' : 'Subtask 2: Select relevant case studies', app: 'tasks', delay: 600 },
      { type: 'app_update', content: lang === 'DE' ? 'Subtask 3: Preiskalkulation erstellen' : 'Subtask 3: Create price calculation', app: 'tasks', delay: 600 },
      { type: 'ai_response', content: lang === 'DE'
        ? 'Vorbereitungs-Tasks erstellt:\n\n**Hoffmann-Meeting vorbereiten**\n1. ☐ Firmenprofil Technik GmbH zusammenfassen\n2. ☐ Relevante Case Studies auswählen\n3. ☐ Preiskalkulation erstellen\n\nDeadline: Dienstag EOD (1 Tag vor Meeting). Soll ich direkt mit dem Firmenprofil starten?'
        : 'Preparation tasks created:\n\n**Prepare Hoffmann meeting**\n1. ☐ Summarize Technik GmbH company profile\n2. ☐ Select relevant case studies\n3. ☐ Create price calculation\n\nDeadline: Tuesday EOD (1 day before meeting). Should I start with the company profile right away?', delay: 600 },
    ],
    contextUpdate: { mentionedTopics: ['Meeting-Preparation'] },
  },
  // 4. calendar → crm
  {
    after: 'calendar',
    trigger: lang === 'DE' ? /hoffmann.*kontakt|kontakt.*hoffmann|zeig.*hoffmann/i : /hoffmann.*contact|contact.*hoffmann|show.*hoffmann/i,
    steps: [
      { type: 'thinking', content: lang === 'DE' ? 'Crossover erkannt — CRM wird abgefragt' : 'Crossover detected — Querying CRM', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Communications Agent (CRM)' : 'Delegated to Communications Agent (CRM)', agent: 'communications', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'CRM-Kontakt wird geladen...' : 'Loading CRM contact...', agent: 'communications', app: 'crm', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Kontakt gefunden: Dr. Stefan Hoffmann' : 'Contact found: Dr. Stefan Hoffmann', app: 'crm', delay: 800 },
      { type: 'ai_response', content: lang === 'DE'
        ? '**Dr. Stefan Hoffmann**\nTechnik GmbH · CTO\n\n- E-Mail: hoffmann@technik-gmbh.de\n- Telefon: +49 201 555-4321\n- Branche: Fertigungsindustrie\n- Mitarbeiter: 280\n- Status: Kontaktiert\n- Letzte Interaktion: Anfrage KI-Qualitätskontrolle (heute)\n\nSoll ich das Firmenprofil mit weiteren Details anreichern?'
        : '**Dr. Stefan Hoffmann**\nTechnik GmbH · CTO\n\n- E-Mail: hoffmann@technik-gmbh.de\n- Phone: +49 201 555-4321\n- Industry: Manufacturing\n- Employees: 280\n- Status: Contacted\n- Last interaction: AI Quality Control inquiry (today)\n\nShould I enrich the company profile with further details?', delay: 600 },
    ],
    contextUpdate: { contacts: [{ name: 'Dr. Stefan Hoffmann', company: 'Technik GmbH', email: 'hoffmann@technik-gmbh.de', role: 'CTO' }] },
  },
  // 5. crm → inbox
  {
    after: 'crm',
    trigger: lang === 'DE' ? /mail.*sarah|schreib.*sarah|follow.?up.*mail|e-?mail.*klein/i : /mail.*sarah|write.*sarah|follow.?up.*mail|e-?mail.*klein/i,
    steps: [
      { type: 'thinking', content: lang === 'DE' ? 'Crossover erkannt — Communications Agent wird aktiviert' : 'Crossover detected — Activating Communications Agent', agent: 'ceo', delay: 600 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Communications Agent' : 'Delegated to Communications Agent', agent: 'communications', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'E-Mail-Entwurf wird erstellt...' : 'Creating email draft...', agent: 'communications', app: 'inbox', delay: 1200 },
      { type: 'delegation', content: lang === 'DE' ? 'Knowledge Agent lädt Firmenwissen...' : 'Knowledge Agent loading company insights...', agent: 'knowledge', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Kommunikationsstil und Kontakthistorie geladen' : 'Communication style and contact history loaded', agent: 'knowledge', app: 'knowledge', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'E-Mail-Entwurf bereit: Follow-up Sarah Klein' : 'Email draft ready: Follow-up Sarah Klein', app: 'inbox', delay: 800 },
      { type: 'ai_response', content: lang === 'DE'
        ? 'Follow-up E-Mail vorbereitet:\n\n**An:** sarah.klein@novadigital.de\n**Betreff:** Ihr Interesse an KI-Automatisierung — nächste Schritte\n\nSehr geehrte Frau Klein,\n\nvielen Dank für Ihre Anfrage über unser Kontaktformular. Gerne stelle ich Ihnen unseren Beratungsansatz in einem persönlichen Gespräch vor.\n\nIch schlage folgende Termine vor: [...]\n\nMit freundlichen Grüßen\n\n*Entwurf basiert auf Firmenwissen und bisherigem Kommunikationsstil.* Soll ich absenden?'
        : 'Follow-up email prepared:\n\n**To:** sarah.klein@novadigital.de\n**Subject:** Your interest in AI automation — next steps\n\nDear Ms. Klein,\n\nThank you for your inquiry via our contact form. I would be happy to present our consulting approach to you in a personal meeting.\n\nI suggest the following dates: [...]\n\nKind regards\n\n*Draft based on corporate knowledge and previous communication style.* Should I send it?', delay: 600 },
    ],
    contextUpdate: { mentionedTopics: ['Follow-up Sarah Klein'] },
  },
];

// ─── Scenarios ───

export const getScenarios = (lang: 'DE' | 'EN'): Record<string, DemoScenario> => ({
  inbox: {
    id: 'inbox',
    steps: [
      { type: 'user_message', content: lang === 'DE' ? 'Gibt es neue Anfragen?' : 'Are there any new inquiries?', delay: 0 },
      { type: 'thinking', content: lang === 'DE' ? 'Anfrage analysiert — Posteingang wird geprüft' : 'Inquiry analyzed — Checking inbox', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Communications Agent' : 'Delegated to Communications Agent', agent: 'communications', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'Posteingang wird gescannt: E-Mail, Website-Formular, WhatsApp Business...' : 'Scanning inbox: Email, Website form, WhatsApp Business...', agent: 'communications', app: 'inbox', delay: 1200 },
      { type: 'app_update', content: lang === 'DE' ? '3 neue Anfragen gefunden' : '3 new inquiries found', app: 'inbox', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'E-Mail: Dr. Stefan Hoffmann (Technik GmbH) — "Anfrage: KI-gestützte Qualitätskontrolle in Fertigungslinie"' : 'Email: Dr. Stefan Hoffmann (Technik GmbH) — "Inquiry: AI-powered quality control in production line"', app: 'inbox', delay: 800 },
      { type: 'app_update', content: lang === 'DE' ? 'Website-Formular: Sarah Klein (Nova Digital) — "Beratungstermin gewünscht"' : 'Website Form: Sarah Klein (Nova Digital) — "Consultation requested"', app: 'inbox', delay: 800 },
      { type: 'app_update', content: lang === 'DE' ? 'WhatsApp Business: Martin Weber — "Rückfrage zum Angebot #247"' : 'WhatsApp Business: Martin Weber — "Inquiry regarding proposal #247"', app: 'inbox', delay: 800 },
      { type: 'delegation', content: lang === 'DE' ? 'CRM-Abgleich: Absender werden geprüft...' : 'CRM reconciliation: Checking senders...', agent: 'communications', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Dr. Hoffmann: Neuer Kontakt → CRM-Eintrag erstellt · Sarah Klein: Bestehender Lead · Martin Weber: Bestandskunde' : 'Dr. Hoffmann: New contact → CRM entry created · Sarah Klein: Existing lead · Martin Weber: Existing customer', agent: 'communications', app: 'crm', delay: 1200 },
      { type: 'delegation', content: lang === 'DE' ? 'Knowledge Agent durchsucht Firmenwissen' : 'Knowledge Agent searching corporate knowledge base', agent: 'knowledge', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'Case Studies für Fertigungsindustrie geladen · Kommunikationsstil abgerufen · Preismodell Mittelstand bereit' : 'Case studies for manufacturing industry loaded · Communication style retrieved · SME pricing model ready', agent: 'knowledge', app: 'knowledge', delay: 1400 },
      { type: 'agent_action', content: lang === 'DE' ? 'Personalisierte Antworten werden erstellt...' : 'Creating personalized responses...', agent: 'communications', app: 'inbox', delay: 1200 },
      { type: 'app_update', content: lang === 'DE' ? '3 Antwort-Entwürfe vorbereitet — jeweils basierend auf Firmenwissen und Kontakthistorie' : '3 response drafts prepared — each based on company knowledge and contact history', app: 'inbox', delay: 1000 },
      { type: 'ai_response', content: lang === 'DE'
        ? '3 neue Anfragen verarbeitet:\n\n1. **Dr. Stefan Hoffmann** (Technik GmbH, CTO) fragt nach KI-gestützter Qualitätskontrolle in der Fertigungslinie — Antwort mit relevanten Case Studies und unserem Beratungsansatz vorbereitet. Neuer CRM-Eintrag angelegt.\n\n2. **Sarah Klein** (Nova Digital, Head of Operations) möchte einen Beratungstermin — Antwort mit verfügbaren Slots und Erstgespräch-Agenda vorbereitet.\n\n3. **Martin Weber** hat eine Rückfrage zu Angebot #247 — Antwort mit aktualisierten Konditionen aus dem Firmenwissen vorbereitet.\n\nAlle Entwürfe basieren auf unserem Kommunikationsstil und Firmenwissen. Soll ich einen **Termin mit Dr. Hoffmann** vorschlagen?'
        : '3 new inquiries processed:\n\n1. **Dr. Stefan Hoffmann** (Technik GmbH, CTO) inquiries about AI-powered quality control in the production line — response prepared with relevant case studies and our consulting approach. New CRM entry created.\n\n2. **Sarah Klein** (Nova Digital, Head of Operations) requests a consultation — response prepared with available slots and introductory meeting agenda.\n\n3. **Martin Weber** has an inquiry regarding proposal #247 — response prepared with updated conditions from corporate knowledge base.\n\nAll drafts are based on our communication style and company knowledge. Should I suggest an **appointment with Dr. Hoffmann**?', delay: 600 },
    ],
  },

  calendar: {
    id: 'calendar',
    steps: [
      { type: 'user_message', content: lang === 'DE' ? 'Wie sieht meine Woche aus?' : 'What does my week look like?', delay: 0 },
      { type: 'thinking', content: lang === 'DE' ? 'Anfrage analysiert — Kalenderübersicht angefragt' : 'Inquiry analyzed — Calendar overview requested', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Calendar Agent' : 'Delegated to Calendar Agent', agent: 'calendar', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'Kalender wird synchronisiert (iCloud CalDAV)...' : 'Syncing calendar (iCloud CalDAV)...', agent: 'calendar', app: 'calendar', delay: 1200 },
      { type: 'app_update', content: lang === 'DE' ? 'Wochenansicht geladen — 8 Termine gefunden' : 'Week view loaded — 8 appointments found', app: 'calendar', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'Auslastung berechnet: 78% — Konfliktprüfung läuft...' : 'Capacity calculated: 78% — Conflict check running...', agent: 'calendar', app: 'calendar', delay: 800 },
      { type: 'app_update', content: lang === 'DE' ? 'Konflikt erkannt: Di 15:00 Partnergespräch überschneidet sich mit Deep-Work-Block' : 'Conflict detected: Tue 3:00 PM partner call overlaps with Deep Work block', app: 'calendar', delay: 900 },
      { type: 'agent_action', content: lang === 'DE' ? 'Lösungsvorschlag: Deep Work auf Di 09:00 verschieben' : 'Suggested solution: Move Deep Work to Tue 9:00 AM', agent: 'calendar', app: 'calendar', delay: 800 },
      { type: 'delegation', content: lang === 'DE' ? 'Task Agent wird konsultiert' : 'Consulting Task Agent', agent: 'tasks', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Offene Tasks mit Kalender abgeglichen — Reisezeiten einkalkuliert' : 'Comparing open tasks with calendar — accounting for travel times', agent: 'tasks', app: 'tasks', delay: 1200 },
      { type: 'app_update', content: lang === 'DE' ? 'Mittwoch 14:00–17:00 als freier Block identifiziert' : 'Wednesday 2:00 PM – 5:00 PM identified as free block', app: 'calendar', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Empfehlung: Angebotserstellung für Technik GmbH in freien Block einplanen' : 'Recommendation: Schedule proposal creation for Technik GmbH in free block', app: 'calendar', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Briefing-Notizen für Hoffmann-Meeting werden vorbereitet...' : 'Preparing briefing notes for Hoffmann meeting...', agent: 'knowledge', app: 'knowledge', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Briefing bereit: Firmenprofil Technik GmbH + Gesprächsleitfaden' : 'Briefing ready: Technik GmbH company profile + conversation guide', app: 'calendar', delay: 800 },
      { type: 'ai_response', content: lang === 'DE'
        ? 'Ihre Woche im Überblick:\n\n**Mo:** 09:00 Team Standup · 14:00 Client Call Müller GmbH\n**Di:** 09:00 Deep Work *(verschoben)* · 15:00 Partnergespräch Nova Digital\n**Mi:** 09:30 Sprint Review · 14:00–17:00 **frei**\n**Do:** 11:00 Investoren-Update · 15:00 Tech Review\n**Fr:** 10:00 Weekly Retro · 14:00 Offsite Planning\n\nAuslastung: **78%**. Einen Terminkonflikt am Dienstag habe ich aufgelöst (Deep Work verschoben). Der freie Block am **Mittwoch Nachmittag** eignet sich ideal für die Angebotserstellung Technik GmbH.\n\nBriefing-Notizen für das Hoffmann-Meeting liegen bereit. Alle Termine optimiert.'
        : 'Your week at a glance:\n\n**Mon:** 9:00 AM Team Standup · 2:00 PM Client Call Müller GmbH\n**Tue:** 9:00 AM Deep Work *(moved)* · 3:00 PM Partner Meeting Nova Digital\n**Wed:** 9:30 AM Sprint Review · 2:00 PM – 5:00 PM **free**\n**Thu:** 11:00 AM Investor Update · 3:00 PM Tech Review\n**Fri:** 10:00 AM Weekly Retro · 2:00 PM Offsite Planning\n\nCapacity: **78%**. I resolved a scheduling conflict on Tuesday (moved Deep Work). The free block on **Wednesday afternoon** is ideal for creating the Technik GmbH proposal.\n\nBriefing notes for the Hoffmann meeting are ready. All appointments optimized.', delay: 600 },
    ],
  },

  tasks: {
    id: 'tasks',
    steps: [
      { type: 'user_message', content: lang === 'DE' ? 'Was steht heute an?' : 'What\'s on the agenda today?', delay: 0 },
      { type: 'thinking', content: lang === 'DE' ? 'Anfrage analysiert — Aufgabenübersicht angefragt' : 'Inquiry analyzed — Task overview requested', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Task Agent' : 'Delegated to Task Agent', agent: 'tasks', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'Projektboard wird geladen (Vikunja)...' : 'Loading project board (Vikunja)...', agent: 'tasks', app: 'tasks', delay: 1200 },
      { type: 'app_update', content: lang === 'DE' ? '2 Projekte geladen — 9 Tasks insgesamt' : '2 projects loaded — 9 tasks total', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? '3 Tasks überfällig · 2 in Bearbeitung · 4 geplant' : '3 tasks overdue · 2 in progress · 4 planned', app: 'tasks', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Abhängigkeiten und Prioritäten werden analysiert...' : 'Analyzing dependencies and priorities...', agent: 'tasks', app: 'tasks', delay: 1200 },
      { type: 'app_update', content: lang === 'DE' ? 'Blocker erkannt: "Systemarchitektur" blockiert "Angebotsentwurf Technik GmbH"' : 'Blocker detected: "System Architecture" blocks "Proposal Draft Technik GmbH"', app: 'tasks', delay: 900 },
      { type: 'delegation', content: lang === 'DE' ? 'Calendar Agent prüft heutige Zeitfenster' : 'Calendar Agent checking today\'s time slots', agent: 'calendar', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Zeitfenster für Tasks identifiziert: 3h produktive Zeit verfügbar' : 'Time slots for tasks identified: 3h productive time available', agent: 'calendar', app: 'calendar', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'Automatische Priorisierung basierend auf Deadlines und Abhängigkeiten...' : 'Automatic prioritization based on deadlines and dependencies...', agent: 'tasks', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Standup-Zusammenfassung erstellt' : 'Standup summary created', app: 'tasks', delay: 800 },
      { type: 'app_update', content: lang === 'DE' ? 'Priorisierung abgeschlossen — Eskalation für Blocker empfohlen' : 'Prioritization complete — Escalation recommended for blocker', app: 'tasks', delay: 800 },
      { type: 'ai_response', content: lang === 'DE'
        ? 'Sprint-Status aktualisiert:\n\n**Überfällig:**\n- Angebotsentwurf Technik GmbH (2 Tage) — **Blocker:** wartet auf Systemarchitektur\n- CRM-Daten Bereinigung (1 Tag)\n- Investoren-Deck Aktualisierung (heute fällig)\n\n**In Bearbeitung:**\n- Systemarchitektur (60% fertig)\n- Design Mockups Website Relaunch\n\n**Mein Vorschlag:**\n1. Systemarchitektur finalisieren → entsperrt Angebotsentwurf\n2. Investoren-Deck in der Deep-Work-Phase aktualisieren\n3. CRM-Bereinigung läuft automatisch im Hintergrund\n\n**1 Blocker erfordert Aufmerksamkeit.** Soll ich die Eskalation einleiten?'
        : 'Sprint status updated:\n\n**Overdue:**\n- Proposal draft Technik GmbH (2 days) — **Blocker:** waiting for System Architecture\n- CRM data cleanup (1 day)\n- Investor deck update (due today)\n\n**In Progress:**\n- System Architecture (60% done)\n- Design mockups Website Relaunch\n\n**My suggestion:**\n1. Finalize System Architecture → unlocks proposal draft\n2. Update investor deck during Deep Work phase\n3. CRM cleanup runs automatically in the background\n\n**1 blocker requires attention.** Should I initiate the escalation?', delay: 600 },
    ],
  },

  crm: {
    id: 'crm',
    steps: [
      { type: 'user_message', content: lang === 'DE' ? 'Zeig mir den Status unserer Leads.' : 'Show me the status of our leads.', delay: 0 },
      { type: 'thinking', content: lang === 'DE' ? 'Anfrage analysiert — CRM-Übersicht angefragt' : 'Inquiry analyzed — CRM overview requested', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Communications Agent (CRM)' : 'Delegated to Communications Agent (CRM)', agent: 'communications', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'CRM-Pipeline wird geladen (Twenty CRM)...' : 'Loading CRM pipeline (Twenty CRM)...', agent: 'communications', app: 'crm', delay: 1200 },
      { type: 'app_update', content: lang === 'DE' ? 'Pipeline geladen: 12 aktive Leads' : 'Pipeline loaded: 12 active leads', app: 'crm', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Neuer Lead identifiziert: Sarah Klein, Nova Digital' : 'New lead identified: Sarah Klein, Nova Digital', app: 'crm', delay: 800 },
      { type: 'delegation', content: lang === 'DE' ? 'Knowledge Agent recherchiert Firmendaten' : 'Knowledge Agent researching company data', agent: 'knowledge', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'LinkedIn-Profil, Firmengröße und Branchendaten abgerufen' : 'LinkedIn profile, company size, and industry data retrieved', agent: 'knowledge', app: 'knowledge', delay: 1400 },
      { type: 'app_update', content: lang === 'DE' ? 'Kontakt angereichert: Nova Digital — E-Commerce Agentur, 45 MA, Head of Operations' : 'Contact enriched: Nova Digital — E-commerce agency, 45 employees, Head of Operations', app: 'crm', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'Lead-Score wird berechnet...' : 'Calculating lead score...', agent: 'communications', app: 'crm', delay: 800 },
      { type: 'app_update', content: lang === 'DE' ? 'Lead-Score: 78/100 — Kategorie: Enterprise, Automation-Interesse' : 'Lead score: 78/100 — Category: Enterprise, Automation interest', app: 'crm', delay: 800 },
      { type: 'agent_action', content: lang === 'DE' ? 'Follow-up Reminder wird erstellt...' : 'Creating follow-up reminder...', agent: 'tasks', app: 'tasks', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Follow-up für Sarah Klein am Donnerstag erstellt' : 'Follow-up for Sarah Klein created for Thursday', app: 'crm', delay: 800 },
      { type: 'ai_response', content: lang === 'DE'
        ? 'CRM-Pipeline Übersicht:\n\n**Neue Leads (3):** Sarah Klein (Nova Digital), Martin Weber, Firma Schulz\n**Kontaktiert (4):** Dr. Hoffmann (Technik GmbH) + 3 weitere\n**Angebot (2):** Müller GmbH, DataFlow AG\n**Gewonnen (3):** Bauer & Partner, MedTech Solutions, LogiServ\n\nNeuer Lead im Fokus: **Sarah Klein, Nova Digital** — E-Commerce Agentur, 45 Mitarbeiter, Head of Operations. Lead-Score: **78/100** (Enterprise, Automation-Interesse).\n\nKontakt angereichert und Follow-up am **Donnerstag** erstellt. Soll ich eine **Follow-up Mail an Sarah Klein** verfassen?'
        : 'CRM pipeline overview:\n\n**New Leads (3):** Sarah Klein (Nova Digital), Martin Weber, Schulz Co.\n**Contacted (4):** Dr. Hoffmann (Technik GmbH) + 3 others\n**Proposal (2):** Müller GmbH, DataFlow AG\n**Won (3):** Bauer & Partner, MedTech Solutions, LogiServ\n\nNew lead in focus: **Sarah Klein, Nova Digital** — E-commerce agency, 45 employees, Head of Operations. Lead score: **78/100** (Enterprise, Automation interest).\n\nContact enriched and follow-up created for **Thursday**. Should I draft a **follow-up email to Sarah Klein**?', delay: 600 },
    ],
  },

  knowledge: {
    id: 'knowledge',
    steps: [
      { type: 'user_message', content: lang === 'DE' ? 'Wie funktioniert unser Onboarding-Prozess für Enterprise-Kunden?' : 'How does our onboarding process for enterprise customers work?', delay: 0 },
      { type: 'thinking', content: lang === 'DE' ? 'Anfrage analysiert — Wissensabfrage erkannt' : 'Inquiry analyzed — Knowledge query detected', agent: 'ceo', delay: 800 },
      { type: 'delegation', content: lang === 'DE' ? 'Delegiert an Knowledge Agent' : 'Delegated to Knowledge Agent', agent: 'knowledge', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'Vektordatenbank wird durchsucht (Qdrant)...' : 'Searching vector database (Qdrant)...', agent: 'knowledge', app: 'knowledge', delay: 1200 },
      { type: 'app_update', content: lang === 'DE' ? 'Semantische Suche: "Enterprise Onboarding Prozess"' : 'Semantic search: "Enterprise onboarding process"', app: 'knowledge', delay: 1000 },
      { type: 'app_update', content: lang === 'DE' ? 'Treffer 1: Onboarding_Enterprise.pdf — 95% Relevanz' : 'Hit 1: Onboarding_Enterprise.pdf — 95% relevance', app: 'knowledge', delay: 800 },
      { type: 'app_update', content: lang === 'DE' ? 'Treffer 2: Prozesshandbuch_v3.md — 91% Relevanz' : 'Hit 2: Process_Manual_v3.md — 91% relevance', app: 'knowledge', delay: 700 },
      { type: 'app_update', content: lang === 'DE' ? 'Treffer 3: Checkliste_Kickoff.pdf — 87% Relevanz' : 'Hit 3: Checklist_Kickoff.pdf — 87% relevance', app: 'knowledge', delay: 700 },
      { type: 'app_update', content: lang === 'DE' ? 'Treffer 4: FAQ_Onboarding.md — 82% Relevanz' : 'Hit 4: FAQ_Onboarding.md — 82% relevance', app: 'knowledge', delay: 600 },
      { type: 'agent_action', content: lang === 'DE' ? 'Informationen aus 4 Dokumenten werden synthetisiert...' : 'Synthesizing information from 4 documents...', agent: 'knowledge', app: 'knowledge', delay: 1400 },
      { type: 'app_update', content: lang === 'DE' ? 'Antwort mit Quellenverweisen erstellt — Konfidenz: 93%' : 'Response created with citations — Confidence: 93%', app: 'knowledge', delay: 1000 },
      { type: 'agent_action', content: lang === 'DE' ? 'Dokumenten-Status wird geprüft...' : 'Checking document status...', agent: 'knowledge', app: 'knowledge', delay: 800 },
      { type: 'ai_response', content: lang === 'DE'
        ? 'Enterprise Onboarding-Prozess (4 Quellen, Konfidenz: **93%**):\n\n**Phase 1 — Kickoff (Woche 1)**\nInitialworkshop · Stakeholder-Mapping · Prozessanalyse · Datenzugang klären\n\n**Phase 2 — Integration (Woche 2–4)**\nAPI-Anbindungen · Datenimport · Agenten-Konfiguration · Testumgebung\n\n**Phase 3 — Training (Woche 5–6)**\nTeam-Schulung · Dokumentation · Feedback-Runden · Feintuning\n\n**Phase 4 — Go-Live (Woche 7–8)**\nSoft Launch · Monitoring · Eskalationspfade · Übergabe an Support\n\n**Quellen:** Onboarding_Enterprise.pdf · Prozesshandbuch_v3.md · Checkliste_Kickoff.pdf · FAQ_Onboarding.md\n\n*Hinweis: Das Onboarding-Dokument wurde zuletzt vor **47 Tagen** aktualisiert. Soll ich eine Überarbeitung einplanen?*'
        : 'Enterprise onboarding process (4 sources, confidence: **93%**):\n\n**Phase 1 — Kickoff (Week 1)**\nInitial workshop · Stakeholder mapping · Process analysis · Clarify data access\n\n**Phase 2 — Integration (Week 2–4)**\nAPI connections · Data import · Agent configuration · Test environment\n\n**Phase 3 — Training (Week 5–6)**\nTeam training · Documentation · Feedback rounds · Fine-tuning\n\n**Phase 4 — Go-Live (Week 7–8)**\nSoft launch · Monitoring · Escalation paths · Handover to support\n\n**Sources:** Onboarding_Enterprise.pdf · Process_Manual_v3.md · Checklist_Kickoff.pdf · FAQ_Onboarding.md\n\n*Note: The onboarding document was last updated **47 days ago**. Should I schedule a revision?*', delay: 600 },
    ],
  },
});

// ─── Keyword Patterns (for free-text routing to API) ───

export const getKeywordPatterns = (lang: 'DE' | 'EN'): Record<string, RegExp> => ({
  inbox: lang === 'DE' ? /e-?mail|nachricht|inbox|antwort|posteingang|mail|message|reply|anfrage/i : /e-?mail|message|inbox|reply|inquiry|mail/i,
  calendar: lang === 'DE' ? /termin|kalender|meeting|datum|schedule|appointment|woche/i : /appointment|calendar|meeting|date|schedule|week/i,
  crm: lang === 'DE' ? /kunde|kontakt|crm|firma|lead|pipeline|customer|company/i : /customer|contact|crm|company|lead|pipeline/i,
  tasks: lang === 'DE' ? /aufgabe|task|projekt|todo|erstell|board|sprint/i : /task|project|todo|create|board|sprint/i,
  knowledge: lang === 'DE' ? /wissen|dokument|suche|datenbank|rag|knowledge|search|preis|faq/i : /knowledge|document|search|database|rag|pricing|faq/i,
});

// ─── Agent Dashboard Log Entry Pool ───

export const getLogEntryPool = (lang: 'DE' | 'EN'): { agent: string; action: string; icon: string }[] => [
  { agent: 'communications', action: lang === 'DE' ? 'Posteingang synchronisiert — 0 neue E-Mails' : 'Inbox synchronized — 0 new emails', icon: '📧' },
  { agent: 'calendar', action: lang === 'DE' ? 'Nächster Termin in 2h 15min — kein Konflikt' : 'Next appointment in 2h 15min — no conflict', icon: '📅' },
  { agent: 'tasks', action: lang === 'DE' ? 'Sprint-Board geprüft — 3 Tasks in Bearbeitung' : 'Sprint board checked — 3 tasks in progress', icon: '✅' },
  { agent: 'system', action: lang === 'DE' ? 'Server-Health: CPU 12%, RAM 64%, alle Container aktiv' : 'Server health: CPU 12%, RAM 64%, all containers active', icon: '🔧' },
  { agent: 'knowledge', action: lang === 'DE' ? 'Vektordatenbank: 2.847 Dokumente indexiert' : 'Vector database: 2,847 documents indexed', icon: '🧠' },
  { agent: 'ceo', action: lang === 'DE' ? 'Warteschleife — keine offenen Delegierungen' : 'Holding queue — no open delegations', icon: '👔' },
  { agent: 'communications', action: lang === 'DE' ? 'WhatsApp Business: Verbindung aktiv, 0 ungelesen' : 'WhatsApp Business: Connection active, 0 unread', icon: '💬' },
  { agent: 'calendar', action: lang === 'DE' ? 'CalDAV-Sync abgeschlossen — keine Änderungen' : 'CalDAV sync complete — no changes', icon: '🔄' },
  { agent: 'tasks', action: lang === 'DE' ? 'Automatische Bereinigung: 2 erledigte Tasks archiviert' : 'Auto-cleanup: 2 completed tasks archived', icon: '📦' },
  { agent: 'system', action: lang === 'DE' ? 'TLS-Zertifikate: Gültig bis 2026-08-15' : 'TLS certificates: Valid until 2026-08-15', icon: '🔒' },
  { agent: 'knowledge', action: lang === 'DE' ? 'Backup: Vektordatenbank erfolgreich gesichert' : 'Backup: Vector database successfully secured', icon: '💾' },
  { agent: 'ceo', action: lang === 'DE' ? 'Tagesbericht: 7 Aufgaben erledigt, 0 Eskalationen' : 'Daily report: 7 tasks completed, 0 escalations', icon: '📊' },
  { agent: 'communications', action: lang === 'DE' ? 'CRM-Sync: 12 aktive Leads, 0 Änderungen' : 'CRM sync: 12 active leads, 0 changes', icon: '👥' },
  { agent: 'system', action: lang === 'DE' ? 'Docker: 18/18 Container laufen, Uptime 99.97%' : 'Docker: 18/18 containers running, uptime 99.97%', icon: '🐳' },
  { agent: 'knowledge', action: lang === 'DE' ? 'RAG-Pipeline: Letzte Indexierung vor 3h — aktuell' : 'RAG pipeline: Last indexed 3h ago — up to date', icon: '🔍' },
];
