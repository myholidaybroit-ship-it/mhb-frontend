import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./page.module.css";

export const metadata = {
  title: "Terms of Use · MyHolidayBro",
  description:
    "Read the MyHolidayBro Terms of Use — booking, payment, cancellation, refund, insurance and liability terms that govern your use of the website and our services.",
};

const SECTIONS = [
  { id: "agreement", title: "Agreement" },
  { id: "eligibility", title: "Eligibility & use of the website" },
  { id: "representations", title: "User representations" },
  { id: "holiday-contract", title: "Your holiday contract" },
  { id: "documents", title: "Passports, visas, health & documents" },
  { id: "insurance", title: "Insurance" },
  { id: "payment", title: "Paying for your holiday" },
  { id: "convenience-fees", title: "Convenience fees" },
  { id: "price", title: "Your holiday price" },
  { id: "change-booking", title: "If you change your booking" },
  { id: "cancellation", title: "If you cancel your holiday" },
  { id: "we-change", title: "If we change or cancel your holiday" },
  { id: "refunds", title: "Mode and duration of refunds" },
  { id: "flights", title: "Flights" },
  { id: "behaviour", title: "Behaviour" },
  { id: "complaints", title: "Complaints" },
  { id: "liability", title: "Our liability to you" },
  { id: "privacy", title: "Data protection & privacy" },
  { id: "special-requests", title: "Special requests & medical" },
  { id: "disclaimer", title: "Disclaimer" },
  { id: "limit-liability", title: "Limitation of liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "force-majeure", title: "Force majeure" },
  { id: "ownership", title: "Ownership & prohibited activities" },
  { id: "jurisdiction", title: "Jurisdiction & applicable law" },
  { id: "misc", title: "Miscellaneous" },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <div className={styles.crumbInner}>
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span className={styles.crumbCurrent}>Terms of Use</span>
          </div>
        </nav>

        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.kicker}>Legal</span>
            <h1 className={styles.title}>
              Terms of <span className={styles.accent}>Use</span>
            </h1>
            <p className={styles.subtitle}>
              These Terms of Use form a binding agreement between you and MyHolidayBro
              when you use this website or any of our services. Please read them carefully.
            </p>
            <span className={styles.meta}>Last updated · January 2026</span>
          </div>
        </header>

        {/* Body — sticky TOC + sections */}
        <section className={styles.bodyWrap}>
          <div className={styles.bodyInner}>
            {/* TOC */}
            <aside className={styles.toc} aria-label="On this page">
              <span className={styles.tocLabel}>On this page</span>
              <ul className={styles.tocList}>
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Long-form content */}
            <article className={styles.content}>
              <Block id="agreement" title="Agreement">
                <p>
                  These Terms of Use constitute a legally binding agreement made between you,
                  whether personally or on behalf of an entity (&ldquo;You&rdquo;,
                  &ldquo;User&rdquo;) and our affiliated entities (hereinafter referred to as
                  &ldquo;MyHolidayBro&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
                  &ldquo;our&rdquo;). The information, data and material
                  (&ldquo;Information&rdquo;) contained on this website (&ldquo;Site&rdquo;)
                  has been prepared solely for the purpose of providing information about
                  MyHolidayBro and its partners and the services that they offer.
                </p>
                <p>
                  You agree that by accessing the Site, you have read, understood and agree
                  to be bound by all of these Terms of Use. If you do not agree, you are
                  expressly prohibited from using the Site and must discontinue use
                  immediately.
                </p>
                <p>
                  MyHolidayBro reserves the right to alter, change, modify, add or remove
                  portions of these Terms at any time. Changes are effective when posted on
                  the Site. It is your responsibility to review the Terms regularly; continued
                  use of the Site is deemed acceptance of amended Terms.
                </p>
              </Block>

              <Block id="eligibility" title="Eligibility & use of the website">
                <p>
                  You warrant that you are at least 18 years of age and possess the legal
                  authority to enter into this agreement. If you are making travel
                  reservations on behalf of another person, you agree to inform them of these
                  Terms and to be financially responsible for all use of the Website. You
                  also warrant that all information supplied is true, current, complete and
                  accurate, and that the traveller is not an unaccompanied minor.
                </p>
              </Block>

              <Block id="representations" title="User representations">
                <ul>
                  <li>All registration information you submit will be true, accurate, current and complete.</li>
                  <li>You will maintain the accuracy of such information and update it as necessary.</li>
                  <li>You have the legal capacity and agree to comply with the Terms of Use.</li>
                  <li>You are not under 18 years of age — or, if a minor, you have parental permission.</li>
                  <li>You will not access the Site through automated means (bots, scripts, scrapers).</li>
                  <li>You will not use the Site for any illegal or unauthorised purpose.</li>
                  <li>Your use of the Site will not violate any applicable law or regulation.</li>
                </ul>
                <p>
                  If you provide information that is untrue, inaccurate, not current or
                  incomplete, we may suspend or terminate your account and refuse current or
                  future use of the Site.
                </p>
              </Block>

              <Block id="holiday-contract" title="Your holiday contract">
                <p>
                  When a booking is made, the &ldquo;lead name&rdquo; on the booking
                  guarantees they have authority to accept these terms on behalf of the party.
                  After we receive your booking and appropriate payments, if the arrangements
                  are available, we will issue a confirmation invoice. A binding agreement
                  comes into existence when we dispatch this invoice to the lead name or your
                  tour operator / travel agent.
                </p>
                <p>
                  Please check the details on your invoice carefully. In the event of any
                  discrepancy, contact us immediately as it may not be possible to make
                  changes later.
                </p>
              </Block>

              <Block id="documents" title="Passports, visas, health requirements & travel documents">
                <p>
                  It is your responsibility to ensure you are in possession of all necessary
                  travel and health documents before departure. A full and valid passport is
                  required for destinations we feature (including children) and visas may be
                  required for overseas destinations. By availing our services you agree that
                  MyHolidayBro can only help you apply for the visa and is not responsible
                  for any issues — including delay, clarification or rejection by the embassy.
                </p>
              </Block>

              <Block id="insurance" title="Insurance">
                <p>
                  We consider adequate travel insurance to be essential. It is your
                  responsibility to ensure the cover you purchase is suitable for your
                  particular needs. MyHolidayBro cannot be held responsible for denied entry
                  if you cannot provide details of insurance, and we will not be liable for
                  losses that would otherwise have been covered by adequate insurance.
                </p>
              </Block>

              <Block id="payment" title="Paying for your holiday">
                <p>
                  To confirm your chosen arrangements, you may pay a partial amount (as
                  chosen by the tour operator) or pay in full. If you choose to pay a partial
                  sum, the remainder is due within <strong>3 days</strong> of paying the
                  partial amount. If we do not receive the balance in full and on time we may
                  treat your booking as cancelled and cancellation charges will apply.
                </p>
                <p>
                  Cancellation fees, processing fees and insurance premiums are due
                  immediately on invoicing. Travel documents are sent within{" "}
                  <strong>14 days</strong> after receipt of final payment. Bookings made less
                  than <strong>30 days</strong> before arrival require full payment
                  immediately on receipt of written confirmation.
                </p>
                <p>
                  We accept payment by <strong>credit card, debit card, internet banking and
                  bank transfers</strong>.
                </p>
              </Block>

              <Block id="convenience-fees" title="Convenience fees">
                <p>
                  Convenience fees are applicable for all payments made after the date of
                  booking, except for transfers into our bank account. We reserve the right
                  to withdraw waivers for convenience fees on payments made on the day of
                  booking.
                </p>
                <p>
                  <strong>Credit-card fraud contingency:</strong> If you do not supply the
                  correct credit / debit card billing address or cardholder information, the
                  issue of tickets may be delayed and the overall cost may increase. We
                  reserve the right to cancel your holiday if payment is declined or
                  incorrect card information is supplied. We may also perform random checks
                  to minimise credit-card fraud.
                </p>
              </Block>

              <Block id="price" title="Your holiday price">
                <p>
                  MyHolidayBro endeavours to display the most up-to-date and correct prices
                  on our website. We reserve the right to raise or lower prices at any time.
                  Occasionally an incorrect price may be shown due to an error — when we
                  become aware of any such error we will notify you, and we reserve the
                  right to cancel the booking if you do not wish to accept the price actually
                  applicable.
                </p>
              </Block>

              <Block id="change-booking" title="If you change your booking">
                <p>
                  If, after our confirmation invoice has been issued, you wish to change your
                  travel arrangements, we will do our utmost to make those changes — but it
                  may not always be possible. Any request must be made by the lead name on
                  the booking or your tour operator through MyHolidayBro.
                </p>
                <p>
                  Costs could increase the closer to your departure month the changes are made.
                  Only one change of departure month per booking may be permitted; any change
                  in departure month will be treated as a cancellation and full cancellation
                  charges will apply. Certain arrangements may not be amended after they have
                  been confirmed, and any alteration could incur a cancellation charge of up
                  to 100% of that part of the arrangements.
                </p>
              </Block>

              <Block id="cancellation" title="If you cancel your holiday">
                <p>
                  You, or any member of your party, may cancel your travel arrangements at
                  any time. Written notification by mail, fax or email from the lead name on
                  the booking or your tour operator on your behalf must be received at our
                  offices.
                </p>
                <p>
                  Our cancellation charges are a percentage of the total holiday cost and are
                  based on how many days before departure we receive your cancellation notice
                  (not when your correspondence was sent). Amendment charges are
                  non-refundable.
                </p>
                <p>
                  If only some members of your party cancel, in addition to the applicable
                  cancellation charges we will recalculate the holiday cost for the
                  remaining travellers, which may include single-room supplements. In cases
                  where supplier cancellation charges exceed the deposit, we may pass the
                  charge on to you.
                </p>
              </Block>

              <Block id="we-change" title="If we change or cancel your holiday">
                <p>
                  Our tour operators plan arrangements many days in advance, so we reserve
                  the right to make changes to and correct errors in holiday details both
                  before and after bookings have been confirmed. We must also reserve the
                  right to cancel confirmed bookings at any time.
                </p>
                <p>
                  Most changes are minor. If we have to make a major change or cancel, we
                  will tell you as soon as possible and offer you the choice of accepting the
                  changed arrangements or purchasing alternative arrangements of a similar
                  standard. If the alternative is less expensive than your original, we will
                  refund the difference; if more expensive, we will ask you to pay the
                  difference.
                </p>
              </Block>

              <Block id="refunds" title="Mode and duration of refunds">
                <ul>
                  <li>Refunds initiated from our systems usually realise in <strong>3 – 4 working days</strong>, but can take up to <strong>21 working days</strong> to reflect.</li>
                  <li>Refund will be initiated <strong>only to the original mode of payment</strong>. Where this is not possible, refunds may be done to the buyer&apos;s banking account after KYC verification (typically 7 – 15 working days).</li>
                  <li>All PayPal refunds after 60 days of transaction will be done only to the PayPal-linked email ID. Exceptions are handled case by case and we do not entertain cross-currency refunds.</li>
                </ul>
              </Block>

              <Block id="flights" title="Flights">
                <p>
                  We are not always in a position at the time of booking to confirm the
                  carrier(s), aircraft type and flight timings used. Flight details shown on
                  the website and confirmation invoice are for guidance only and subject to
                  alteration. The latest timings are shown on the tickets dispatched
                  approximately two weeks before departure. Flight times may change even
                  after tickets are dispatched — we will contact you as soon as possible.
                </p>
                <p>
                  This website is our responsibility as your tour operator. It is not issued
                  on behalf of and does not commit the airlines mentioned, or any airline
                  whose services are used.
                </p>
              </Block>

              <Block id="behaviour" title="Behaviour">
                <p>
                  When you book a holiday with MyHolidayBro you accept responsibility for the
                  proper conduct of yourself and your party. If we (or any person in
                  authority) reasonably believe that you or any member of your party is
                  behaving so as to cause or be likely to cause danger or upset, or damage to
                  property, we are entitled to terminate the holiday of the person(s)
                  concerned. No refunds will be made. You will be responsible for full
                  payment for any damage or loss caused.
                </p>
              </Block>

              <Block id="complaints" title="If you have a complaint">
                <p>
                  In the event of any problem with your holiday arrangements while away, you
                  must immediately inform the tour operator&apos;s representative, MyHolidayBro
                  and the supplier of the service in question, and complete a report form
                  whilst in resort. If you remain dissatisfied, please call or write to{" "}
                  <a href="mailto:care@myholidaybro.com" className={styles.inlineLink}>care@myholidaybro.com</a>{" "}
                  within <strong>7 days</strong> of your return with your booking reference and
                  full details.
                </p>
              </Block>

              <Block id="liability" title="Our liability to you">
                <p>
                  We will endeavour that your holiday arrangements are made, performed or
                  provided with reasonable skill and care. If your contracted arrangements
                  are not provided as promised or prove deficient due to our failure to use
                  reasonable skill and care, we will make all reasonable efforts to rectify
                  the same. We assume no liability for errors due to systematic issues,
                  fluctuations in prices, availability of flights / hotels / cars, or the
                  standards of service provided by third-party suppliers. Our maximum
                  liability in such cases will be limited to refund of the booking amount,
                  subject to MyHolidayBro receiving the same from the supplier.
                </p>
                <p>
                  We will not be responsible for any injury, illness, death, loss, damage,
                  expense, cost or other claim arising from the act(s) and/or omission(s) of
                  the affected person or any member of their party, or of any third party
                  not connected with the provision of your arrangements which were
                  unforeseeable or unavoidable.
                </p>
                <p>
                  Excursions, tours, activities or other events you book or pay for through
                  anybody other than MyHolidayBro (or whilst on holiday) are not part of your
                  package holiday provided by us. For any such local event your contract is
                  with the supplier of that event and not with us.
                </p>
              </Block>

              <Block id="privacy" title="Data protection & privacy">
                <p>
                  In order to process your booking and meet your requirements, we must pass
                  your personal details to the relevant suppliers. We may also hold your
                  information for our future marketing purposes (such as informing you of
                  promotional offers or sending our brochure). If you do not wish to receive
                  these approaches, please change your communication preferences on the
                  website. See our Privacy Policy for full details on how your personal
                  details are used.
                </p>
              </Block>

              <Block id="special-requests" title="Special requests & medical">
                <p>
                  Any special request must be made at the time of booking. We will try to
                  pass reasonable requests to the relevant supplier but cannot guarantee they
                  will be met. The fact that a request is noted on your confirmation invoice
                  is not confirmation that it will be met — failure to meet a special request
                  is not a breach of contract unless we have specifically confirmed it.
                </p>
                <p>
                  Please advise us of any disabilities and special requirements at the time
                  of booking. If we reasonably feel unable to accommodate the needs of the
                  person(s) concerned, we will not confirm the booking, or will cancel it
                  when we become aware of the details. For assistance contact{" "}
                  <a href="mailto:contact@myholidaybro.com" className={styles.inlineLink}>contact@myholidaybro.com</a>.
                </p>
              </Block>

              <Block id="disclaimer" title="Disclaimer">
                <p>
                  The Site is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis.
                  Your use of the Site and our services is at your sole risk. To the fullest
                  extent permitted by law, we disclaim all warranties, express or implied, in
                  connection with the Site and your use thereof, including merchantability,
                  fitness for a particular purpose, and non-infringement. We make no
                  warranties about the accuracy or completeness of the Site&apos;s content or
                  of any websites linked to the Site, and assume no liability or
                  responsibility for content errors, personal injury, unauthorised access,
                  bugs, viruses or any loss or damage incurred as a result of using the Site.
                </p>
              </Block>

              <Block id="limit-liability" title="Limitation of liability">
                <p>
                  To the maximum extent permitted by law, in no event shall MyHolidayBro be
                  liable to any person or entity for any direct, indirect, incidental,
                  special, exemplary, compensatory, consequential or punitive damages —
                  including, but not limited to, loss of production, profit, revenue,
                  contract, goodwill, reputation, business interruption, data or other
                  intangible losses. Notwithstanding anything to the contrary, our liability
                  to you for any cause whatsoever and regardless of the form of action will
                  at all times be limited to the total amount of the transaction in question.
                </p>
              </Block>

              <Block id="indemnification" title="Indemnification">
                <p>
                  You agree to defend, indemnify and hold us harmless — including our
                  subsidiaries, affiliates, directors, officers, agents, partners and
                  employees — from and against any loss, damage, liability, claim or demand,
                  including reasonable attorney&apos;s fees and expenses, made by any third
                  party due to or arising out of: (1) use of the Website, (2) breach of these
                  Terms of Use, (3) any breach of your representations and warranties, or (4)
                  your violation of the rights of a third party, including intellectual
                  property rights.
                </p>
              </Block>

              <Block id="force-majeure" title="Force majeure">
                <p>
                  A force majeure event is any event beyond MyHolidayBro&apos;s control,
                  including but not limited to natural disasters, weather conditions, fire,
                  nuclear incident, terrorist acts, riots, war, labour disputes, strikes,
                  government actions, bankruptcy, machinery breakdown, network or system
                  interruptions, internet or communications breakdown, quarantine, epidemic
                  or pandemic. You agree that MyHolidayBro will have no liability and will
                  make no refund in the event of any delay, cancellation, overbooking,
                  strike, force majeure or other causes beyond their direct control.
                </p>
              </Block>

              <Block id="ownership" title="Ownership & prohibited activities">
                <p>
                  All trademarks, copyrights, service marks, logos, brands and other
                  intellectual and proprietary rights associated with our services and
                  displayed on this website are proprietary to us and owned or controlled by
                  us or licensed to us. While you may make limited copies of your travel
                  itinerary for personal use, you agree not to otherwise modify, copy,
                  distribute, transmit, display, perform, reproduce, publish, license, create
                  derivative works from, transfer, or sell information, software, products
                  or services obtained from this website. Additionally, you agree not to:
                </p>
                <ul>
                  <li>Make any speculative, false or fraudulent reservation.</li>
                  <li>Access or copy content using any robot, spider, scraper or automated means without our written permission.</li>
                  <li>Bypass or circumvent any access-limiting measures employed on the website.</li>
                  <li>Take any action that imposes a disproportionately large load on our infrastructure.</li>
                  <li>Frame, mirror or create derivative works from the Site.</li>
                  <li>Decompile, disassemble or reverse-engineer any of our software.</li>
                  <li>Attempt unauthorised access to the Site or its connected systems.</li>
                  <li>Manipulate identifiers to disguise the origin of any content you transmit.</li>
                </ul>
                <p>
                  If your booking or account shows signs of fraud, abuse or suspicious
                  activity, we may cancel any travel or service reservations associated with
                  your name, email address or account, and close any associated accounts.
                </p>
              </Block>

              <Block id="jurisdiction" title="Jurisdiction & applicable law">
                <p>
                  These Terms &amp; Conditions and any agreement to which they apply are
                  governed by the laws of the courts in Bangalore, India. The courts in
                  Bangalore, India shall have exclusive jurisdiction without regard to
                  conflict-of-law principles. All guest claims must be submitted in writing
                  and received by MyHolidayBro no later than{" "}
                  <strong>sixty (60) days</strong> after the completion of the MyHolidayBro
                  vacation. Claims not submitted and received within this time shall be
                  deemed waived and barred.
                </p>
              </Block>

              <Block id="misc" title="Miscellaneous">
                <ul>
                  <li>If any part of these Terms is determined to be indefinite, invalid or unenforceable, the rest shall continue in full force.</li>
                  <li>The parties are independent contractors. These Terms do not create a partnership, franchise, joint venture, agency, fiduciary or employment relationship.</li>
                  <li>We may assign any or all of our rights and obligations to others at any time.</li>
                  <li>We will not be responsible for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.</li>
                </ul>
              </Block>

              <div className={styles.footnote}>
                <p>
                  Questions about these Terms? Reach our team at{" "}
                  <a href="mailto:contact@myholidaybro.com" className={styles.inlineLink}>contact@myholidaybro.com</a>{" "}
                  or <a href="tel:+919666698990" className={styles.inlineLink}>+91 96666 98990</a>.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({ id, title, children }) {
  return (
    <section id={id} className={styles.block}>
      <h2 className={styles.blockTitle}>
        <a href={`#${id}`} className={styles.anchor} aria-label={`Anchor to ${title}`}>#</a>
        {title}
      </h2>
      <div className={styles.blockBody}>{children}</div>
    </section>
  );
}
