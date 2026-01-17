'use client';

import Obfuscate from 'react-obfuscate';
import LegalNavigation from '@/components/LegalNavigation';
import Footer from '@/components/Footer';

export default function Impressum() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F5F1ED]">
      <LegalNavigation />
      <div className="flex-1 pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-[#8B7355] mb-12">Impressum</h1>

          <div className="space-y-8 text-[#4A3428]">
            {/* Angaben gemäß § 5 DDG */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">Angaben gemäß § 5 DDG</h2>
              <div className="space-y-2">
                <p className="font-semibold">Swiftgateai</p>
                <p>Inh. Luis Amadeus Guenther</p>
                <p>Moellhoven 86D</p>
                <p>45357 Essen</p>
                <p>Deutschland</p>
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">Kontakt</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Telefon:</span>{' '}
                  <Obfuscate
                    tel="+4917672601048"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  />
                </p>
                <p>
                  <span className="font-semibold">E-Mail:</span>{' '}
                  <Obfuscate
                    email="hello@swiftgateai.de"
                    headers={{
                      subject: 'Anfrage über SwiftGate AI - Impressum',
                    }}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  />
                </p>
              </div>
            </section>

            {/* Umsatzsteuer-ID */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">Umsatzsteuer-ID / Wirtschafts-Identifikationsnummer</h2>
              <p className="mb-3">
                Kleinunternehmer gemäß § 19 UStG, daher wird keine Umsatzsteuer ausgewiesen.
              </p>
              <p className="text-sm text-[#8B7355]">
                <strong>Wirtschafts-Identifikationsnummer (W-IdNr.):</strong> Die W-IdNr. wird bei Zuteilung hier angegeben.
              </p>
            </section>

            {/* Aufsichtsbehörde */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">Zuständige Kammer</h2>
              <p>Mitglied der IHK für Essen, Mülheim an der Ruhr, Oberhausen</p>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">Verantwortlich für den Inhalt nach § 18 MStV</h2>
              <div className="space-y-2">
                <p>Luis Amadeus Guenther</p>
                <p>Moellhoven 86D</p>
                <p>45357 Essen</p>
              </div>
            </section>

            {/* Verbraucherstreitbeilegung */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            {/* Haftungsausschluss */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">Haftung für Inhalte</h2>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
                erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            {/* Haftung für Links */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">Haftung für Links</h2>
              <p className="mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
                Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            {/* Urheberrecht */}
            <section>
              <h2 className="text-2xl font-semibold text-[#8B7355] mb-4">Urheberrecht</h2>
              <p className="mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
                des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
                privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
                Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                umgehend entfernen.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
