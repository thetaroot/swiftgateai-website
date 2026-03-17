'use client';

import LegalLayout from '@/components/LegalLayout';
import { useTranslation } from '@/hooks/useTranslation';

export default function ImpressumPage() {
  const { language } = useTranslation();

  return (
    <LegalLayout title={language === 'DE' ? 'Impressum' : 'Legal Notice'}>
      {language === 'DE' ? (
        <>
          <section>
            <h2>Angaben gemäß § 5 DDG</h2>
            <p className="not-prose">
              <strong>Swiftgateai</strong><br />
              Inh. Luis Amadeus Guenther<br />
              Moellhoven 86D<br />
              45357 Essen<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2>Kontakt</h2>
            <p className="not-prose">
              Telefon: +49 176 72601048<br />
              E-Mail: <a href="mailto:hello@swiftgateai.de">hello@swiftgateai.de</a>
            </p>
          </section>

          <section>
            <h2>Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              <em>Folgt in Kürze / Beantragt</em><br />
              <span className="text-sm opacity-80">(Hinweis: Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet.)</span>
            </p>
          </section>

          <section>
            <h2>Redaktionell verantwortlich</h2>
            <p className="not-prose">
              Luis Amadeus Guenther<br />
              Moellhoven 86D<br />
              45357 Essen
            </p>
          </section>

          <section>
            <h2>EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </section>

          <div className="border-t border-[#34150F]/20 pt-8 mt-12">
            <h3>Haftung & Urheberrecht</h3>
            <div className="text-sm space-y-4">
              <p><strong>Haftung für Inhalte:</strong> Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
              <p><strong>Haftung für Links:</strong> Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
              <p><strong>Urheberrecht:</strong> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung.</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <section>
            <h2>Information pursuant to § 5 DDG</h2>
            <p className="not-prose">
              <strong>Swiftgateai</strong><br />
              Owner: Luis Amadeus Guenther<br />
              Moellhoven 86D<br />
              45357 Essen<br />
              Germany
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p className="not-prose">
              Phone: +49 176 72601048<br />
              Email: <a href="mailto:hello@swiftgateai.de">hello@swiftgateai.de</a>
            </p>
          </section>

          <section>
            <h2>VAT ID</h2>
            <p>
              Sales tax identification number according to § 27 a of the Sales Tax Law:<br />
              <em>Pending / Applied for</em><br />
              <span className="text-sm opacity-80">(Note: Small business status according to § 19 UStG, therefore no VAT is shown.)</span>
            </p>
          </section>

          <section>
            <h2>Editorially Responsible</h2>
            <p className="not-prose">
              Luis Amadeus Guenther<br />
              Moellhoven 86D<br />
              45357 Essen<br />
              Germany
            </p>
          </section>

          <section>
            <h2>EU Dispute Resolution</h2>
            <p>
              The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br />
              Our email address can be found above in the site notice.
            </p>
          </section>

          <section>
            <h2>Consumer Dispute Resolution</h2>
            <p>We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
          </section>

          <div className="border-t border-[#34150F]/20 pt-8 mt-12">
            <h3>Liability & Copyright</h3>
            <div className="text-sm space-y-4">
              <p><strong>Liability for Contents:</strong> As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 Para.1 TMG.</p>
              <p><strong>Liability for Links:</strong> Our offer contains links to external third-party websites, on whose contents we have no influence. The respective provider or operator of the pages is always responsible for the content of the linked pages.</p>
              <p><strong>Copyright:</strong> The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright law require the written consent.</p>
            </div>
          </div>
        </>
      )}
    </LegalLayout>
  );
}
