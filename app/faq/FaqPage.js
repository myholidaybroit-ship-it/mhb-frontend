"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./FaqPage.module.css";

const CATEGORIES = [
  {
    title: "Bookings & Quotes",
    items: [
      {
        q: "How do I get a trip quote from MyHolidayBro?",
        a: "Drop us a message via the Contact page, WhatsApp us at +91 96666 98990, or email contact@myholidaybro.com with your dates, group size and rough destination. A trip captain replies in under 30 minutes during IST working hours with a draft itinerary.",
      },
      {
        q: "How early should I plan my trip?",
        a: "For international and peak-season trips (Dec–Jan, May–Jun) we recommend 6–8 weeks ahead. For weekend getaways and most domestic destinations, 1–2 weeks works comfortably. We've also turned around last-minute trips in 48 hours — just ask.",
      },
      {
        q: "Can I customise a package you've already published?",
        a: "Absolutely. Every itinerary on the site is a starting point — add nights, swap hotels, change activities, drop a city. Your trip captain rebuilds the plan and re-quotes within hours.",
      },
    ],
  },
  {
    title: "Payments & Refunds",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "UPI, all major credit and debit cards, net banking, and bank transfer. International cards are accepted for travellers outside India. We never store your card details on our servers — payments are processed via PCI-compliant gateways.",
      },
      {
        q: "What's the payment schedule?",
        a: "Typically 25–40% to confirm the booking and the balance 21 days before departure. The exact split depends on the suppliers we're booking with (some hotels and airlines need full payment earlier).",
      },
      {
        q: "How fast do refunds reach me?",
        a: "Refunds for cancellations are processed within 7–10 working days from the date of approval, back to the original payment method. International card refunds may take an additional 3–5 days depending on your issuing bank.",
      },
    ],
  },
  {
    title: "Visas & Documents",
    items: [
      {
        q: "Do you help with visas?",
        a: "Yes — for all the destinations we sell. We share the document checklist, review your application before submission, and book the appointment where the embassy requires it. Visa fees are pass-through; the assistance is included for booked trips.",
      },
      {
        q: "What documents should I carry on the trip?",
        a: "Passport (valid for 6+ months from your return date), printed and digital copies of your e-tickets, hotel vouchers, insurance certificate, and visa pages. Your trip captain shares a single PDF bundle 48 hours before departure.",
      },
    ],
  },
  {
    title: "On the trip",
    items: [
      {
        q: "Is there a number I can call mid-trip?",
        a: "Yes — every booking comes with 24×7 on-trip support. You get a dedicated WhatsApp group with your trip captain and the local ops team for the duration of your trip. We've handled missed flights, weather reroutes, and sudden requests at 2 AM.",
      },
      {
        q: "What if my flight gets cancelled or delayed?",
        a: "Message us the moment you know. We'll rebook flights, adjust hotel check-ins, and reshuffle activities to keep your trip on track. If it's a force-majeure cancellation, we work with airlines and hotels to recover what's recoverable.",
      },
      {
        q: "Are the local guides included?",
        a: "All the guided activities listed in your itinerary include the local guide. Most of our partner guides are mother-tongue speakers of the region and have worked with us for 3+ years.",
      },
    ],
  },
  {
    title: "Insurance & Safety",
    items: [
      {
        q: "Is travel insurance included?",
        a: "Basic travel insurance covering medical emergencies, trip cancellation and lost baggage is included on all international packages. You can also opt for an upgraded plan with adventure-sport coverage, COVID add-on, or higher claim limits at quote stage.",
      },
      {
        q: "How do you vet hotels and partners?",
        a: "Every hotel on our list is either visited in person by a trip captain or vetted via a long-running partnership. Activities and adventure operators are checked annually for licensing, safety equipment and customer feedback.",
      },
    ],
  },
];

function Chevron({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FaqPage() {
  const [openKey, setOpenKey] = useState("0-0");
  const [query, setQuery] = useState("");

  const visibleCats = CATEGORIES.map((c) => ({
    ...c,
    items: c.items.filter((it) =>
      `${it.q} ${it.a}`.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((c) => c.items.length > 0);

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.heroWrap}>
        <div className={styles.container}>
          <span className={styles.kicker}>Help centre</span>
          <h1 className={styles.heading}>
            Frequently <span className={styles.headingAccent}>asked</span> questions.
          </h1>
          <p className={styles.sub}>
            Booking, payments, visas, on-trip support. If you don't find what you need below,
            we're a WhatsApp message away.
          </p>

          <label className={styles.searchWrap}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              placeholder="Search the FAQ…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </section>

      {/* FAQ list */}
      <section className={styles.listWrap}>
        <div className={styles.container}>
          {visibleCats.length === 0 ? (
            <div className={styles.empty}>
              <strong>Nothing matches "{query}".</strong>
              <p>Try a different keyword — or just ask us directly.</p>
              <Link href="/contact" className={styles.emptyCta}>Ask the team →</Link>
            </div>
          ) : (
            visibleCats.map((cat, ci) => (
              <div key={cat.title} className={styles.cat}>
                <h2 className={styles.catTitle}>{cat.title}</h2>
                <div className={styles.faqList}>
                  {cat.items.map((it, ii) => {
                    const key = `${ci}-${ii}`;
                    const open = openKey === key;
                    return (
                      <div key={key} className={`${styles.faqItem} ${open ? styles.faqItemOpen : ""}`}>
                        <button
                          type="button"
                          className={styles.faqQ}
                          onClick={() => setOpenKey(open ? null : key)}
                          aria-expanded={open}
                        >
                          <span>{it.q}</span>
                          <Chevron open={open} />
                        </button>
                        {open && <div className={styles.faqA}>{it.a}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaWrap}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div>
              <span className={styles.kicker}>Still curious?</span>
              <h3 className={styles.ctaTitle}>
                Drop us a message — we <span className={styles.headingAccent}>reply fast</span>.
              </h3>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.ctaPrimary}>Contact us</Link>
              <a href="https://wa.me/919966698990" target="_blank" rel="noreferrer" className={styles.ctaGhost}>
                WhatsApp +91 96666 98990
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
