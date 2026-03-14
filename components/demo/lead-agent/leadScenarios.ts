// ─── Types ───

export type LeadStepType =
  | 'incoming_message'
  | 'ai_analyzing'
  | 'rag_search'
  | 'rag_result'
  | 'crm_lookup'
  | 'crm_result'
  | 'score_update'
  | 'crm_update'
  | 'notification'
  | 'auto_reply'
  | 'pipeline_move'
  | 'filter_action'
  | 'analytics_update';

export interface LeadStep {
  type: LeadStepType;
  content: string;
  delay: number;
  channel?: 'email' | 'instagram' | 'whatsapp' | 'web';
  score?: number;
  scoreLabel?: 'HOT' | 'WARM' | 'COLD';
  scoreReasons?: string[];
  notifyChannel?: 'slack' | 'email' | 'sms';
  notifyPreview?: string;
  pipelineStage?: 'new' | 'qualified' | 'contacted';
  ragDocs?: { title: string; match: number }[];
  leadData?: {
    name: string;
    company?: string;
    role?: string;
    email?: string;
    phone?: string;
    channel: 'email' | 'instagram' | 'whatsapp' | 'web';
    initials: string;
    employees?: string;
    industry?: string;
  };
  // For incoming messages — channel-specific display
  emailMeta?: { from: string; to: string; subject: string };
  igMeta?: { handle: string; avatar: string; followers?: string };
  waMeta?: { phone: string; name: string };
}

export interface LeadScenario {
  id: string;
  steps: LeadStep[];
}


// ─── Scenarios ───

export const getLeadScenarios = (lang: 'DE' | 'EN'): Record<string, LeadScenario> => ({
  email: {
    id: 'email',
    steps: [
      {
        type: 'incoming_message',
        content: lang === 'DE'
          ? 'Sehr geehrte Damen und Herren,\n\nwir betreiben 3 Fertigungslinien und suchen nach KI-Lösungen zur Qualitätskontrolle und Prozessoptimierung. Unser jährliches IT-Budget liegt bei ca. 500.000€.\n\nKönnen Sie uns ein Beratungsgespräch anbieten?\n\nMit freundlichen Grüßen,\nThomas Berger\nCTO, Berger Manufacturing GmbH'
          : 'Dear team,\n\nWe operate 3 production lines and are looking for AI solutions for quality control and process optimization. Our annual IT budget is approximately €500,000.\n\nCould you offer us a consultation?\n\nBest regards,\nThomas Berger\nCTO, Berger Manufacturing GmbH',
        delay: 0,
        channel: 'email',
        emailMeta: {
          from: 'thomas.berger@berger-manufacturing.de',
          to: 'hello@swiftgateai.de',
          subject: lang === 'DE' ? 'Anfrage: KI-Automatisierung Fertigungslinie' : 'Inquiry: AI Automation for Production Line',
        },
      },
      {
        type: 'ai_analyzing',
        content: lang === 'DE' ? 'Eingehende E-Mail erkannt — Lead-Analyse gestartet...' : 'Incoming email detected — Lead analysis started...',
        delay: 1200,
      },
      {
        type: 'crm_lookup',
        content: lang === 'DE' ? 'CRM-Datenbank wird durchsucht...' : 'Searching CRM database...',
        delay: 1000,
      },
      {
        type: 'crm_result',
        content: lang === 'DE' ? 'Kein bestehender Kontakt gefunden — Neuer Lead' : 'No existing contact found — New lead',
        delay: 800,
      },
      {
        type: 'rag_search',
        content: lang === 'DE' ? 'Wissensdatenbank wird durchsucht: "Fertigungsindustrie", "Qualitätskontrolle", "KI-Automatisierung"' : 'Searching knowledge base: "manufacturing", "quality control", "AI automation"',
        delay: 1000,
      },
      {
        type: 'rag_result',
        content: lang === 'DE' ? 'Relevante Dokumente gefunden' : 'Relevant documents found',
        delay: 1000,
        ragDocs: [
          { title: lang === 'DE' ? 'Case Study: KI-Qualitätskontrolle Müller AG' : 'Case Study: AI Quality Control Müller AG', match: 94 },
          { title: lang === 'DE' ? 'Preismodell Fertigungsindustrie' : 'Pricing Model Manufacturing', match: 87 },
          { title: lang === 'DE' ? 'Beratungsansatz Enterprise-Kunden' : 'Consulting Approach Enterprise Clients', match: 82 },
        ],
      },
      {
        type: 'score_update',
        content: lang === 'DE' ? 'Lead-Score berechnet' : 'Lead score calculated',
        delay: 1000,
        score: 85,
        scoreLabel: 'HOT',
        scoreReasons: lang === 'DE'
          ? ['CTO-Level Entscheider (+25)', 'Konkretes Budget genannt (+20)', 'Fertigungsindustrie = Zielbranche (+20)', 'Professionelle Anfrage (+15)', 'Klarer Bedarf identifiziert (+5)']
          : ['CTO-level decision maker (+25)', 'Specific budget mentioned (+20)', 'Manufacturing = target industry (+20)', 'Professional inquiry (+15)', 'Clear need identified (+5)'],
      },
      {
        type: 'crm_update',
        content: lang === 'DE' ? 'CRM-Kontakt erstellt' : 'CRM contact created',
        delay: 800,
        leadData: {
          name: 'Thomas Berger',
          company: 'Berger Manufacturing GmbH',
          role: 'CTO',
          email: 'thomas.berger@berger-manufacturing.de',
          channel: 'email',
          initials: 'TB',
          employees: '~200',
          industry: lang === 'DE' ? 'Fertigungsindustrie' : 'Manufacturing',
        },
      },
      {
        type: 'pipeline_move',
        content: lang === 'DE' ? 'Pipeline: Neu → Qualifiziert' : 'Pipeline: New → Qualified',
        delay: 600,
        pipelineStage: 'qualified',
      },
      {
        type: 'notification',
        content: lang === 'DE' ? 'Sales-Team benachrichtigt' : 'Sales team notified',
        delay: 800,
        notifyChannel: 'slack',
        notifyPreview: lang === 'DE'
          ? '🔥 Neuer HOT Lead (85/100)\nThomas Berger, CTO @ Berger Manufacturing GmbH\nBudget: ~500k€/Jahr | Fertigungsindustrie\n→ Anfrage: KI-Qualitätskontrolle\n@sales Bitte innerhalb 24h kontaktieren'
          : '🔥 New HOT Lead (85/100)\nThomas Berger, CTO @ Berger Manufacturing GmbH\nBudget: ~€500k/year | Manufacturing\n→ Inquiry: AI quality control\n@sales Please contact within 24h',
      },
      {
        type: 'auto_reply',
        content: lang === 'DE'
          ? 'Sehr geehrter Herr Berger,\n\nvielen Dank für Ihre Anfrage zur KI-Automatisierung. Wir freuen uns über Ihr Interesse und die konkreten Anforderungen für Ihre Fertigungslinien.\n\nBasierend auf unserer Erfahrung mit vergleichbaren Projekten in der Fertigungsindustrie können wir Ihnen einen maßgeschneiderten Beratungsansatz anbieten.\n\nUnser Beraterteam wird sich innerhalb von 24h bei Ihnen melden.\n\nMit freundlichen Grüßen,\nSwiftGate AI Team'
          : 'Dear Mr. Berger,\n\nThank you for your inquiry about AI automation. We appreciate your interest and the specific requirements for your production lines.\n\nBased on our experience with comparable projects in the manufacturing industry, we can offer you a tailored consulting approach.\n\nOur consulting team will reach out within 24h.\n\nBest regards,\nSwiftGate AI Team',
        delay: 1200,
        channel: 'email',
      },
      {
        type: 'analytics_update',
        content: lang === 'DE' ? '1 bewertet · 3.2s · 100%' : '1 scored · 3.2s · 100%',
        delay: 600,
      },
    ],
  },

  instagram: {
    id: 'instagram',
    steps: [
      {
        type: 'incoming_message',
        content: lang === 'DE'
          ? 'hey! hab euren post über ki-automation gesehen 🤖 was kostet sowas ungefähr für ein kleines design-studio? wir sind 8 leute und ertrinken in admin-arbeit lol'
          : 'hey! saw your post about ai automation 🤖 what does something like that roughly cost for a small design studio? we\'re 8 people and drowning in admin work lol',
        delay: 0,
        channel: 'instagram',
        igMeta: { handle: '@sarah_designs', avatar: 'SW', followers: '2.4k' },
      },
      {
        type: 'ai_analyzing',
        content: lang === 'DE' ? 'Instagram DM erkannt — Lead-Analyse gestartet...' : 'Instagram DM detected — Lead analysis started...',
        delay: 1200,
      },
      {
        type: 'crm_lookup',
        content: lang === 'DE' ? 'CRM wird nach @sarah_designs durchsucht...' : 'Searching CRM for @sarah_designs...',
        delay: 800,
      },
      {
        type: 'crm_result',
        content: lang === 'DE' ? 'Kein bestehender Kontakt — Profil-Daten werden abgerufen' : 'No existing contact — Retrieving profile data',
        delay: 800,
      },
      {
        type: 'rag_search',
        content: lang === 'DE' ? 'Wissensdatenbank: "Preismodell", "kleine Teams", "Design-Studio"' : 'Knowledge base: "pricing model", "small teams", "design studio"',
        delay: 1000,
      },
      {
        type: 'rag_result',
        content: lang === 'DE' ? 'Relevante Dokumente gefunden' : 'Relevant documents found',
        delay: 800,
        ragDocs: [
          { title: lang === 'DE' ? 'Preisliste Starter-Pakete' : 'Pricing Starter Packages', match: 91 },
          { title: lang === 'DE' ? 'FAQ: Kosten & Einstieg' : 'FAQ: Costs & Getting Started', match: 78 },
        ],
      },
      {
        type: 'score_update',
        content: lang === 'DE' ? 'Lead-Score berechnet' : 'Lead score calculated',
        delay: 1000,
        score: 62,
        scoreLabel: 'WARM',
        scoreReasons: lang === 'DE'
          ? ['Kleines Team, begrenztes Budget (+5)', 'Aktives Interesse gezeigt (+15)', 'Kein Entscheider-Titel (+0)', 'Informelle Anfrage (+10)', 'Konkreter Schmerzpunkt genannt (+15)', 'Instagram-Kanal (+10)']
          : ['Small team, limited budget (+5)', 'Active interest shown (+15)', 'No decision-maker title (+0)', 'Informal inquiry (+10)', 'Specific pain point mentioned (+15)', 'Instagram channel (+10)'],
      },
      {
        type: 'crm_update',
        content: lang === 'DE' ? 'Lead hinzugefügt' : 'Lead added',
        delay: 800,
        leadData: {
          name: 'Sarah Weber',
          company: 'Weber Design Studio',
          channel: 'instagram',
          initials: 'SW',
          employees: '8',
          industry: 'Design',
        },
      },
      {
        type: 'pipeline_move',
        content: lang === 'DE' ? 'Pipeline: Neu' : 'Pipeline: New',
        delay: 600,
        pipelineStage: 'new',
      },
      {
        type: 'notification',
        content: lang === 'DE' ? 'Marketing-Team benachrichtigt' : 'Marketing team notified',
        delay: 800,
        notifyChannel: 'email',
        notifyPreview: lang === 'DE'
          ? '🌡️ Neuer WARM Lead (62/100)\nSarah Weber — Weber Design Studio\nKanal: Instagram DM | 8 Mitarbeiter\n→ Interesse an KI-Automatisierung, Preisanfrage\nFollow-up Sequenz empfohlen'
          : '🌡️ New WARM Lead (62/100)\nSarah Weber — Weber Design Studio\nChannel: Instagram DM | 8 employees\n→ Interest in AI automation, pricing inquiry\nFollow-up sequence recommended',
      },
      {
        type: 'auto_reply',
        content: lang === 'DE'
          ? 'Hey Sarah! 👋 Danke für deine Nachricht!\n\nFür ein Studio mit 8 Leuten starten wir normalerweise mit einem kostenlosen Beratungsgespräch, um zu schauen wo KI am meisten Zeit spart.\n\nSchau dir gerne unsere Infos an: swiftgateai.de/contact 🚀'
          : 'Hey Sarah! 👋 Thanks for reaching out!\n\nFor a studio with 8 people, we usually start with a free consultation to see where AI can save the most time.\n\nCheck out more info here: swiftgateai.de/contact 🚀',
        delay: 1200,
        channel: 'instagram',
      },
      {
        type: 'analytics_update',
        content: lang === 'DE' ? '2 bewertet · 3.0s · 100%' : '2 scored · 3.0s · 100%',
        delay: 600,
      },
    ],
  },

  whatsapp: {
    id: 'whatsapp',
    steps: [
      {
        type: 'incoming_message',
        content: lang === 'DE'
          ? 'Guten Tag, wir haben auf der Hannover Messe Ihren Stand gesehen. Unser Board tagt in 2 Wochen und ich brauche dringend eine Machbarkeitsstudie für KI-gestützte Logistikoptimierung. Budget: 2M€ Jahresvertrag. Können Sie bis Freitag ein Proposal liefern?'
          : 'Good afternoon, we saw your booth at the Hannover trade fair. Our board meets in 2 weeks and I urgently need a feasibility study for AI-powered logistics optimization. Budget: €2M annual contract. Can you deliver a proposal by Friday?',
        delay: 0,
        channel: 'whatsapp',
        waMeta: { phone: '+49 172 •••• 4821', name: 'Dr. Michael Richter' },
      },
      {
        type: 'ai_analyzing',
        content: lang === 'DE' ? 'WhatsApp Business erkannt — PRIORITÄTS-Analyse...' : 'WhatsApp Business detected — PRIORITY analysis...',
        delay: 800,
      },
      {
        type: 'crm_lookup',
        content: lang === 'DE' ? 'CRM + Firmendatenbank wird durchsucht...' : 'Searching CRM + company database...',
        delay: 800,
      },
      {
        type: 'crm_result',
        content: lang === 'DE' ? 'Firma gefunden: LogiTech Solutions AG — Logistik, 1.200 MA, börsennotiert' : 'Company found: LogiTech Solutions AG — Logistics, 1,200 employees, publicly traded',
        delay: 1000,
        leadData: {
          name: 'Dr. Michael Richter',
          company: 'LogiTech Solutions AG',
          role: 'COO',
          phone: '+49 172 •••• 4821',
          channel: 'whatsapp',
          initials: 'MR',
          employees: '1.200',
          industry: lang === 'DE' ? 'Logistik' : 'Logistics',
        },
      },
      {
        type: 'rag_search',
        content: lang === 'DE' ? 'Wissensdatenbank: "Logistik", "Machbarkeitsstudie", "Enterprise-Vertrag"' : 'Knowledge base: "logistics", "feasibility study", "enterprise contract"',
        delay: 1000,
      },
      {
        type: 'rag_result',
        content: lang === 'DE' ? 'Relevante Dokumente gefunden' : 'Relevant documents found',
        delay: 800,
        ragDocs: [
          { title: lang === 'DE' ? 'Enterprise-Proposal-Vorlage' : 'Enterprise Proposal Template', match: 96 },
          { title: lang === 'DE' ? 'Case Study: KI-Logistik DataFlow AG' : 'Case Study: AI Logistics DataFlow AG', match: 93 },
          { title: lang === 'DE' ? 'Preismodell Enterprise (>500 MA)' : 'Pricing Model Enterprise (>500 emp)', match: 89 },
          { title: lang === 'DE' ? 'Machbarkeitsstudie Referenz-Template' : 'Feasibility Study Reference Template', match: 85 },
        ],
      },
      {
        type: 'score_update',
        content: lang === 'DE' ? 'Lead-Score berechnet' : 'Lead score calculated',
        delay: 1000,
        score: 94,
        scoreLabel: 'HOT',
        scoreReasons: lang === 'DE'
          ? ['C-Level Entscheider (COO) (+30)', 'Budget 2M€/Jahr genannt (+25)', 'Dringender Zeitdruck (+15)', 'Enterprise-Unternehmen (+15)', 'Persönlicher Kontakt (Messe) (+9)']
          : ['C-level decision maker (COO) (+30)', '€2M/year budget mentioned (+25)', 'Urgent timeline (+15)', 'Enterprise company (+15)', 'Personal contact (trade fair) (+9)'],
      },
      {
        type: 'crm_update',
        content: lang === 'DE' ? 'PRIORITÄTS-CRM-Eintrag erstellt' : 'PRIORITY CRM entry created',
        delay: 800,
        leadData: {
          name: 'Dr. Michael Richter',
          company: 'LogiTech Solutions AG',
          role: 'COO',
          phone: '+49 172 •••• 4821',
          channel: 'whatsapp',
          initials: 'MR',
          employees: '1.200',
          industry: lang === 'DE' ? 'Logistik' : 'Logistics',
        },
      },
      {
        type: 'pipeline_move',
        content: lang === 'DE' ? 'Pipeline: Neu → Qualifiziert (Express)' : 'Pipeline: New → Qualified (Express)',
        delay: 600,
        pipelineStage: 'qualified',
      },
      {
        type: 'notification',
        content: lang === 'DE' ? 'SOFORT-ALARM: CEO + Sales' : 'IMMEDIATE ALERT: CEO + Sales',
        delay: 800,
        notifyChannel: 'sms',
        notifyPreview: lang === 'DE'
          ? '🚨 ENTERPRISE HOT LEAD (94/100)\nDr. Michael Richter, COO\nLogiTech Solutions AG (1.200 MA, börsennotiert)\n\nBudget: 2M€/Jahr | Deadline: Freitag\n→ Machbarkeitsstudie KI-Logistik\n\n⚡ CEO-Eskalation: Persönlicher Rückruf in <2h'
          : '🚨 ENTERPRISE HOT LEAD (94/100)\nDr. Michael Richter, COO\nLogiTech Solutions AG (1,200 emp, publicly traded)\n\nBudget: €2M/year | Deadline: Friday\n→ Feasibility study AI logistics\n\n⚡ CEO escalation: Personal callback in <2h',
      },
      {
        type: 'auto_reply',
        content: lang === 'DE'
          ? 'Sehr geehrter Dr. Richter,\n\nvielen Dank für Ihre Anfrage. Ihr Anliegen hat höchste Priorität.\n\nUnser CEO wird sich persönlich innerhalb der nächsten 2 Stunden bei Ihnen melden, um die Machbarkeitsstudie und den Zeitplan für das Proposal bis Freitag zu besprechen.\n\nMit freundlichen Grüßen,\nSwiftGate AI'
          : 'Dear Dr. Richter,\n\nThank you for your inquiry. Your request has been given the highest priority.\n\nOur CEO will personally reach out within the next 2 hours to discuss the feasibility study and timeline for the proposal by Friday.\n\nBest regards,\nSwiftGate AI',
        delay: 1200,
        channel: 'whatsapp',
      },
      {
        type: 'analytics_update',
        content: lang === 'DE' ? '3 bewertet · 2.8s · 100%' : '3 scored · 2.8s · 100%',
        delay: 600,
      },
    ],
  },

  spam: {
    id: 'spam',
    steps: [
      {
        type: 'incoming_message',
        content: lang === 'DE'
          ? '🔥 10x Your Revenue with Our AI-Powered Lead Gen Platform!!!\n\nHi there!\n\nAre you tired of manual lead generation? Our revolutionary platform uses CUTTING-EDGE AI to generate 1000s of qualified leads per day!\n\nSpecial offer: 50% OFF for the first 100 customers! Act NOW!\n\nClick here: [suspicious-link.com/offer]\n\nBest,\nThe BulkMail Team'
          : '🔥 10x Your Revenue with Our AI-Powered Lead Gen Platform!!!\n\nHi there!\n\nAre you tired of manual lead generation? Our revolutionary platform uses CUTTING-EDGE AI to generate 1000s of qualified leads per day!\n\nSpecial offer: 50% OFF for the first 100 customers! Act NOW!\n\nClick here: [suspicious-link.com/offer]\n\nBest,\nThe BulkMail Team',
        delay: 0,
        channel: 'email',
        emailMeta: {
          from: 'sales@bulkmail.io',
          to: 'hello@swiftgateai.de',
          subject: '🔥 10x Your Revenue with AI Lead Gen!!!',
        },
      },
      {
        type: 'ai_analyzing',
        content: lang === 'DE' ? 'Eingehende E-Mail erkannt — Spam-Indikatoren gefunden...' : 'Incoming email detected — Spam indicators found...',
        delay: 800,
      },
      {
        type: 'crm_lookup',
        content: lang === 'DE' ? 'Absender wird geprüft: sales@bulkmail.io' : 'Checking sender: sales@bulkmail.io',
        delay: 800,
      },
      {
        type: 'crm_result',
        content: lang === 'DE' ? 'Absender nicht in CRM — Domain auf Spam-Liste' : 'Sender not in CRM — Domain on spam list',
        delay: 800,
      },
      {
        type: 'score_update',
        content: lang === 'DE' ? 'Lead-Score berechnet' : 'Lead score calculated',
        delay: 800,
        score: 12,
        scoreLabel: 'COLD',
        scoreReasons: lang === 'DE'
          ? ['Bulk-Absender Domain (-30)', 'Marketing-Sprache erkannt (-20)', 'Verdächtiger Link (-20)', 'Kein persönlicher Bezug (-15)', 'Generische Anrede (-3)']
          : ['Bulk sender domain (-30)', 'Marketing language detected (-20)', 'Suspicious link (-20)', 'No personal context (-15)', 'Generic greeting (-3)'],
      },
      {
        type: 'filter_action',
        content: lang === 'DE' ? 'Automatisch archiviert — Klassifizierung: Bulk Marketing Spam' : 'Auto-archived — Classification: Bulk Marketing Spam',
        delay: 800,
      },
      {
        type: 'filter_action',
        content: lang === 'DE' ? 'Keine Benachrichtigung · Keine Antwort · Kein CRM-Eintrag' : 'No notification · No reply · No CRM entry',
        delay: 600,
      },
      {
        type: 'analytics_update',
        content: lang === 'DE' ? '4 bewertet · 2.9s · 75%' : '4 scored · 2.9s · 75%',
        delay: 600,
      },
    ],
  },
});

