'use client';

import LegalLayout from '@/components/LegalLayout';
import { useTranslation } from '@/hooks/useTranslation';

export default function PrivacyPage() {
  const { language } = useTranslation();

  return (
    <LegalLayout title={language === 'DE' ? 'Datenschutzerklärung' : 'Privacy Policy'}>
      {language === 'DE' ? (
        <>
          <section>
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li><strong>Wer ist verantwortlich?</strong> Die Datenverarbeitung erfolgt durch den Websitebetreiber (Impressum).</li>
              <li><strong>Wie erfassen wir Daten?</strong> Ihre Daten werden erhoben, wenn Sie uns diese mitteilen (z.B. per E-Mail oder Chat-Eingabe). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z.B. technische Daten wie Browser, Betriebssystem).</li>
              <li><strong>Wofür nutzen wir Daten?</strong> Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden (dies findet hier jedoch NICHT statt).</li>
            </ul>
          </section>

          <section>
            <h2>2. Hosting & Content Delivery Networks (CDN)</h2>
            <p>Wir hosten die Inhalte dieser Website bei folgenden Anbietern:</p>

            <h3 className="mt-4">GitHub Pages</h3>
            <p>
              Anbieter ist die GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA. Wenn Sie unsere Website besuchen, erfasst GitHub Ihre IP-Adresse und weitere Informationen in Logfiles, um die Sicherheit und Funktionsfähigkeit des Dienstes zu gewährleisten.<br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse).<br />
              <strong>Drittlandtransfer:</strong> GitHub verfügt über eine Zertifizierung nach dem EU-US Data Privacy Framework (DPF) und verwendet Standardvertragsklauseln.
            </p>

            <h3 className="mt-4">Vercel</h3>
            <p>
              Teile der Infrastruktur oder Deployments können über Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA, abgewickelt werden.<br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.<br />
              <strong>Drittlandtransfer:</strong> Auch Vercel ist nach dem EU-US DPF zertifiziert.
            </p>
          </section>

          <section>
            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3>Verantwortliche Stelle</h3>
            <p>
              Swiftgateai<br />
              Inh. Luis Amadeus Guenther<br />
              Moellhoven 86D<br />
              45357 Essen<br />
              Telefon: +49 176 72601048<br />
              E-Mail: <a href="mailto:hello@swiftgateai.de">hello@swiftgateai.de</a>
            </p>

            <h3>Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern keine anderen rechtlich zulässigen Gründe für die Speicherung vorliegen.
            </p>
          </section>

          <section>
            <h2>4. Datenerfassung auf dieser Website</h2>

            <h3>Cookies & Lokale Speicherung</h3>
            <p>
              Unsere Website verwendet <strong>keine Tracking-Cookies</strong>. Wir analysieren Ihr Verhalten nicht.
            </p>
            <p className="mt-2">
              Wir nutzen jedoch den <strong>Local Storage</strong> Ihres Browsers, um Ihre Präferenzen (z.B. gewählte Sprache, Dark Mode, Schriftgröße) lokal auf Ihrem Gerät zu speichern. Diese Daten werden nicht an unsere Server übertragen.
              <br /><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (technische Notwendigkeit).
            </p>

            <h3>Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (Browsertyp, OS, Referrer URL, IP-Adresse etc.). Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
            </p>

            <h3>E-Mail Kontakt / Telefon</h3>
            <p>
              Wenn Sie uns kontaktieren (per E-Mail, Telefon), wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung bei uns gespeichert. Wir geben diese Daten nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          <section>
            <h2>5. Nutzung von KI-Tools (Künstliche Intelligenz)</h2>
            <p>
              Unsere Website bietet optional einen KI-gestützten Chatbot sowie KI-Services an.
            </p>
            <p className="mt-2">
              <strong>Verarbeitung bei Nutzung:</strong><br />
              Nur wenn Sie aktiv eine Nachricht in das Chat-Fenster eingeben und senden, wird dieser Text an einen externen KI-Dienstleister (z.B. als API-Call) übermittelt, um eine Antwort zu generieren. Es erfolgt keine dauerhafte Speicherung der Chat-Verläufe auf unseren eigenen Servern; die Historie wird lediglich temporär in Ihrem Browser (Session) vorgehalten.
            </p>
            <p className="mt-2">
              <strong>Eingesetzte Technologien / Empfänger:</strong><br />
              Wir nutzen modernste Large Language Models (LLMs) über sichere Schnittstellen. Aktuell können Daten an Anbieter wie <strong>OpenAI</strong> (USA) oder vergleichbare Dienstleister weitergeleitet werden.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong><br />
              Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung/Vorvertragliche Maßnahmen, wenn Sie eine Leistung anfragen) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktive Nutzung).
            </p>
            <p className="mt-2">
              <strong>Drittlandtransfer:</strong><br />
              Die Datenübermittlung in die USA erfolgt auf Basis des EU-US Data Privacy Frameworks (DPF) oder Standardvertragsklauseln, um ein angemessenes Datenschutzniveau sicherzustellen.
            </p>
          </section>

          <section>
            <h2>6. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf <strong>Auskunft</strong>, <strong>Berichtigung</strong>, <strong>Löschung</strong>, <strong>Einschränkung der Verarbeitung</strong> sowie auf <strong>Datenübertragbarkeit</strong>. Zudem steht Ihnen ein <strong>Widerspruchsrecht</strong> und ein <strong>Beschwerderecht</strong> bei der zuständigen Aufsichtsbehörde zu (Landesbeauftragte für Datenschutz NRW).
            </p>
          </section>
        </>
      ) : (
        <>
          <section>
            <h2>1. Privacy at a Glance</h2>
            <h3>General Notes</h3>
            <p>
              The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data involves all data with which you can be personally identified.
            </p>

            <h3>Data Collection on this Website</h3>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li><strong>Who is responsible?</strong> Data processing is carried out by the website operator (see Legal Notice).</li>
              <li><strong>How do we collect data?</strong> Data is collected when you provide it to us (e.g., via email or chat input). Other data is collected automatically via IT systems (e.g., browser, OS).</li>
              <li><strong>What do we use data for?</strong> Primarily to ensure the proper functioning of the website. We do NOT analyze your user behavior (Tracking).</li>
            </ul>
          </section>

          <section>
            <h2>2. Hosting & Content Delivery Networks (CDN)</h2>
            <p>We host the content of this website with the following providers:</p>

            <h3 className="mt-4">GitHub Pages</h3>
            <p>
              Provider is GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA. GitHub collects your IP address and other log file info to ensure security and functionality.<br />
              <strong>Legal Basis:</strong> Art. 6 Para. 1 lit. f GDPR (Legitimate Interest).<br />
              <strong>Third Country Transfer:</strong> GitHub is certified under the EU-US Data Privacy Framework (DPF) and uses SCCs.
            </p>

            <h3 className="mt-4">Vercel</h3>
            <p>
              Parts of the infrastructure may be handled via Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA.<br />
              <strong>Legal Basis:</strong> Art. 6 Para. 1 lit. f GDPR.<br />
              <strong>Third Country Transfer:</strong> Vercel is also DPF certified.
            </p>
          </section>

          <section>
            <h2>3. General Notes and Mandatory Information</h2>

            <h3>Responsible Body</h3>
            <p>
              Swiftgateai<br />
              Owner: Luis Amadeus Guenther<br />
              Moellhoven 86D<br />
              45357 Essen<br />
              Germany<br />
              Phone: +49 176 72601048<br />
              Email: <a href="mailto:hello@swiftgateai.de">hello@swiftgateai.de</a>
            </p>

            <h3>Storage Duration</h3>
            <p>
              Unless a specific storage period is mentioned within this privacy policy, your personal data will remain with us until the purpose for data processing ceases to apply. If you assert a legitimate request for deletion or revoke your consent, your data will be deleted unless there are other legally permissible reasons for storage.
            </p>
          </section>

          <section>
            <h2>4. Data Collection on this Website</h2>

            <h3>Cookies & Local Storage</h3>
            <p>
              Our website uses <strong>NO tracking cookies</strong>. We do not analyze your behavior.
            </p>
            <p className="mt-2">
              However, we use your browser&apos;s <strong>Local Storage</strong> to save your preferences locally on your device (e.g., selected language, dark mode, font size). This data is not transmitted to our servers.
              <br /><strong>Legal Basis:</strong> Art. 6 Para. 1 lit. f GDPR (Technical Necessity).
            </p>

            <h3>Server Log Files</h3>
            <p>
              The provider of the pages automatically collects and stores information in so-called server log files (Browser, OS, IP address, etc.). This data is not merged with other data sources.
            </p>

            <h3>Email / Phone Contact</h3>
            <p>
              If you contact us (by email, phone), your inquiry including all resulting personal data (name, request) will be stored by us for the purpose of processing your request. We do not pass on this data without your consent.
            </p>
          </section>

          <section>
            <h2>5. Use of AI Tools (Artificial Intelligence)</h2>
            <p>
              Our website optionally offers an AI-supported chatbot and AI services.
            </p>
            <p className="mt-2">
              <strong>Processing upon Use:</strong><br />
              Only when you actively enter a message into the chat window and send it, will this text be transmitted to an external AI service provider (e.g., via API call) to generate a response. There is no permanent storage of chat histories on our own servers; the history is only kept temporarily in your browser (session).
            </p>
            <p className="mt-2">
              <strong>Technologies Used / Recipients:</strong><br />
              We use state-of-the-art Large Language Models (LLMs) via secure interfaces. Currently, data may be forwarded to providers such as <strong>OpenAI</strong> (USA) or comparable service providers.
            </p>
            <p className="mt-2">
              <strong>Legal Basis:</strong><br />
              Art. 6 Para. 1 lit. b GDPR (Contract Performance/Pre-contractual Measures) or Art. 6 Para. 1 lit. a GDPR (Consent via active use).
            </p>
            <p className="mt-2">
              <strong>Third Country Transfer:</strong><br />
              Data transfer to the USA is based on the EU-US Data Privacy Framework (DPF) or Standard Contractual Clauses to ensure an adequate level of data protection.
            </p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>
              You have the right at any time to <strong>information</strong>, <strong>correction</strong>, <strong>deletion</strong>, <strong>restriction of processing</strong>, and <strong>data portability</strong>. You also have the right to <strong>object</strong> and to lodge a <strong>complaint</strong> with the competent supervisory authority.
            </p>
          </section>
        </>
      )}
    </LegalLayout>
  );
}
