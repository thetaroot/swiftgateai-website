'use client';

import LegalNavigation from '@/components/LegalNavigation';
import Footer from '@/components/Footer';

export default function Datenschutz() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F5F1ED]">
      <LegalNavigation />
      <div className="flex-1 pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-[#8B7355] mb-12">Datenschutzerklärung</h1>

          <div className="space-y-8 text-[#4A3428]">
            {/* Einleitung */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-xl font-semibold text-[#8B7355] mb-3 mt-6">Allgemeine Hinweise</h3>
              <p className="mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema
                Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
            </section>

            {/* Verantwortlicher */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">2. Verantwortliche Stelle</h2>
              <p className="mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="space-y-2 bg-[#E8E5D9] p-4 rounded-lg">
                <p className="font-semibold">Swiftgateai</p>
                <p>Inh. Luis Amadeus Guenther</p>
                <p>Moellhoven 86D</p>
                <p>45357 Essen</p>
                <p>Deutschland</p>
                <p className="mt-4">
                  <span className="font-semibold">Telefon:</span>{' '}
                  <a href="tel:+4917672601048" className="hover:underline">+49 176 72601048</a>
                </p>
                <p>
                  <span className="font-semibold">E-Mail:</span>{' '}
                  <a href="mailto:gunther.luis@icloud.com" className="hover:underline">gunther.luis@icloud.com</a>
                </p>
              </div>
              <p className="mt-4">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam
                mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten
                (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>
            </section>

            {/* Datenerfassung */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">3. Datenerfassung auf dieser Website</h2>

              <h3 className="text-xl font-semibold text-[#8B7355] mb-3 mt-6">Hosting</h3>
              <p className="mb-4">
                Diese Website wird auf GitHub Pages gehostet. Der Betreiber der Seiten ist GitHub Inc.,
                88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.
              </p>
              <p className="mb-4">
                <strong>Datenübermittlung in die USA:</strong> Die Server von GitHub Pages befinden sich in den USA.
                Die Datenübermittlung erfolgt auf Grundlage der <strong>Standard-Vertragsklauseln (Standard Contractual Clauses, SCCs)</strong> der
                EU-Kommission, die ein angemessenes Datenschutzniveau gewährleisten. GitHub verpflichtet sich damit,
                die europäischen Datenschutzstandards auch bei der Speicherung, Verarbeitung und Verwaltung der Daten
                in den USA einzuhalten.
              </p>
              <p className="mb-4">
                Zusätzlich verfügt GitHub über eine Zertifizierung nach dem EU-US Data Privacy Framework (DPF).
                Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                an der technisch fehlerfreien Darstellung und Optimierung der Website).
              </p>
              <p className="mb-4">
                Weitere Informationen zum Datenschutz bei GitHub Pages finden Sie in der Datenschutzerklärung
                von GitHub:{' '}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#1A4D2E]"
                >
                  https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement
                </a>
              </p>

              <h3 className="text-xl font-semibold text-[#8B7355] mb-3 mt-6">Server-Log-Dateien</h3>
              <p className="mb-4">
                Der Provider der Seiten (GitHub Pages) erhebt und speichert automatisch Informationen in
                sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="mb-4">
                Diese Daten sind notwendig für die technische Bereitstellung der Website.
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              </p>
              <p className="mb-4">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                technisch fehlerfreien Darstellung und Optimierung der Website).
              </p>

              <h3 className="text-xl font-semibold text-[#8B7355] mb-3 mt-6">Diese Website nutzt NICHT:</h3>
              <ul className="list-none space-y-2 mb-4 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✗</span>
                  <span>Cookies (außer technisch notwendigen Session-Cookies)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✗</span>
                  <span>Analyse-Tools (Google Analytics, Matomo, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✗</span>
                  <span>Tracking-Technologien</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✗</span>
                  <span>Werbedienste oder Retargeting-Pixel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✗</span>
                  <span>Social Media Plugins</span>
                </li>
              </ul>
              <p className="text-sm text-[#8B7355] italic">
                Diese Website ist bewusst datenschutzfreundlich gestaltet und verzichtet auf unnötige Datenerhebung.
              </p>
            </section>

            {/* SSL/TLS Verschlüsselung */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">4. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="mb-4">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte,
                wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
                TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile
                des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
              <p>
                Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns
                übermitteln, nicht von Dritten mitgelesen werden.
              </p>
            </section>

            {/* Kontaktformular */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">5. Kontaktaufnahme</h2>
              <p className="mb-4">
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus
                hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres
                Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre
                Einwilligung weiter.
              </p>
              <p className="mb-4">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern
                Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
                auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
                Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
                sofern diese abgefragt wurde.
              </p>
              <p>
                Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns
                zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für
                die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens).
                Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
              </p>
            </section>

            {/* Rechte der betroffenen Personen */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">6. Ihre Rechte</h2>
              <p className="mb-4">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
                unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft
                und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder
                Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten
                können Sie sich jederzeit an uns wenden.
              </p>

              <h3 className="text-xl font-semibold text-[#8B7355] mb-3 mt-6">Recht auf Datenübertragbarkeit</h3>
              <p className="mb-4">
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung
                eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
                maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten
                an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
              </p>

              <h3 className="text-xl font-semibold text-[#8B7355] mb-3 mt-6">Auskunft, Löschung und Berichtigung</h3>
              <p className="mb-4">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
                unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
                Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung
                dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich
                jederzeit an uns wenden.
              </p>

              <h3 className="text-xl font-semibold text-[#8B7355] mb-3 mt-6">Recht auf Einschränkung der Verarbeitung</h3>
              <p className="mb-4">
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
                verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der
                Verarbeitung besteht in folgenden Fällen:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>
                  Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
                  benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben
                  Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </li>
                <li>
                  Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können
                  Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
                </li>
                <li>
                  Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung,
                  Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt
                  der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </li>
                <li>
                  Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung
                  zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht,
                  wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer
                  personenbezogenen Daten zu verlangen.
                </li>
              </ul>
            </section>

            {/* Widerspruchsrecht */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">7. Widerspruchsrecht</h2>
              <div className="bg-[#E8E5D9] p-6 rounded-lg">
                <p className="mb-4">
                  <strong>
                    Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß
                    Art. 6 Abs. 1 lit. f DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art. 21 DSGVO
                    Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit dafür
                    Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben oder sich der Widerspruch
                    gegen Direktwerbung richtet.
                  </strong>
                </p>
                <p>
                  <strong>
                    Im letzteren Fall haben Sie ein generelles Widerspruchsrecht, das ohne Angabe einer
                    besonderen Situation von uns umgesetzt wird. Möchten Sie von Ihrem Widerrufs- oder
                    Widerspruchsrecht Gebrauch machen, genügt eine E-Mail an gunther.luis@icloud.com.
                  </strong>
                </p>
              </div>
            </section>

            {/* Beschwerderecht */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">8. Beschwerderecht bei der zuständigen Aufsichtsbehörde</h2>
              <p className="mb-4">
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
                Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht
                unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
              </p>
              <p>
                Die für uns zuständige Datenschutzbehörde ist die Landesbeauftragte für Datenschutz und
                Informationsfreiheit Nordrhein-Westfalen.
              </p>
            </section>

            {/* Stand */}
            <section className="border-t pt-6 mt-8">
              <p className="text-sm text-[#8B7355]">
                <strong>Stand:</strong> Januar 2025
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
