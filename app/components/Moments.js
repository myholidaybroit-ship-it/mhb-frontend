"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Moments.module.css";

const C = (path) => `https://res.cloudinary.com/dyxxkrq8r/image/upload/${path}`;

const SLIDES = [
  [
    {
      id: 1,
      initial: "S",
      name: "Shiv",
      city: "Hyderabad",
      caption: "6 Day Singapore + Malaysia escape",
      destination: "Singapore + Malaysia",
      duration: "6 Days · 5 Nights",
      rating: 5,
      title: "Felt like every detail was thought through",
      review:
        "The Singapore-KL combo was perfectly paced — Gardens by the Bay, Universal, Batu Caves, late-night Bukit Bintang. Zero travel stress, every transfer was on time, the hotel picks were spot on. Worth every rupee.",
      date: "May 2026",
      image: C("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.35_PM_gmlnpp.jpg"),
    },
    {
      id: 2,
      initial: "A",
      name: "Abi",
      city: "Chennai",
      caption: "5 Night couple in Langkawi",
      destination: "Langkawi, Malaysia",
      duration: "5 Days · 5 Nights",
      rating: 5,
      title: "Quietest, most romantic trip we've done",
      review:
        "Cable car, mangrove kayaking, a sunset cruise we'll talk about for years. Resort was beachfront with insane food. The MHB team handled visas and pickups — we just had to show up.",
      date: "Apr 2026",
      image: C("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_eyigio.jpg"),
    },
    {
      id: 3,
      initial: "P",
      name: "Priya",
      city: "Bangalore",
      caption: "6 Day Vietnam exploration",
      destination: "Hanoi · Halong · Hoi An",
      duration: "6 Days · 5 Nights",
      rating: 5,
      title: "Vietnam shifted something in me",
      review:
        "Hanoi street food walk, a postcard-perfect Halong overnight cruise, lantern-making in Hoi An. The itinerary mixed culture and chill perfectly — never felt rushed.",
      date: "Mar 2026",
      image: C("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_1_buerwk.jpg"),
    },
    {
      id: 4,
      initial: "H",
      name: "Hari",
      city: "Mumbai",
      caption: "7 Day Bali deep dive",
      destination: "Ubud · Seminyak · Uluwatu",
      duration: "7 Days · 6 Nights",
      rating: 5,
      title: "My first solo trip and they nailed it",
      review:
        "Ubud was my favourite — monkey forest, rice terraces, yoga at sunrise. The team mixed culture, beach, and downtime in the right doses. Even got me into a hidden waterfall most people miss.",
      date: "Feb 2026",
      image: C("v1779220324/WhatsApp_Image_2026-05-16_at_1.22.01_PM_y8n52r.jpg"),
    },
    {
      id: 5,
      initial: "A",
      name: "Arjun",
      city: "Delhi",
      caption: "5 Night honeymoon in Maldives",
      destination: "Maldives",
      duration: "5 Days · 5 Nights",
      rating: 5,
      title: "Honeymoon goals, no exaggeration",
      review:
        "Overwater villa at sunrise, snorkeling with mantas, the seaplane ride — every moment felt cinematic. MHB handled everything from airport pickup to a private dinner on the sandbank.",
      date: "Feb 2026",
      image: C("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_2_htpd1q.jpg"),
    },
    {
      id: 6,
      initial: "N",
      name: "Neha",
      city: "Pune",
      caption: "8 Day Singapore + Thailand",
      destination: "Singapore · Phuket",
      duration: "8 Days · 7 Nights",
      rating: 5,
      title: "Family of 5 and the trip just worked",
      review:
        "Universal Studios for the kids, sky bars in Bangkok for us, beach days in Phuket. The MHB team adjusted activities on the fly — felt like having a personal trip manager.",
      date: "Jan 2026",
      image: C("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.00_PM_ij9msi.jpg"),
    },
    {
      id: 7,
      initial: "R",
      name: "Rohan",
      city: "Kolkata",
      caption: "5 Day Dubai solo adventure",
      destination: "Dubai · Abu Dhabi",
      duration: "5 Days · 4 Nights",
      rating: 5,
      title: "Desert safari was the unexpected highlight",
      review:
        "Sandboarding, falconry, BBQ under stars. Burj Khalifa at sunset was worth the splurge. MHB even sorted my last-minute add-on to Abu Dhabi without any fuss.",
      date: "Jan 2026",
      image: C("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_1_jhjtxh.jpg"),
    },
  ],
  [
    {
      id: 8,
      initial: "K",
      name: "Karan",
      city: "Ahmedabad",
      caption: "6 Day Thailand with friends",
      destination: "Phuket · Phi Phi · Bangkok",
      duration: "6 Days · 5 Nights",
      rating: 5,
      title: "Group trip with zero stress",
      review:
        "Four of us, packed schedule. Beach clubs by day, rooftop bars by night. Activities were perfectly timed — no waiting in queues anywhere. MHB knew the right spots.",
      date: "Dec 2025",
      image: C("v1779220323/WhatsApp_Image_2026-05-16_at_1.21.56_PM_xizioz.jpg"),
    },
    {
      id: 9,
      initial: "M",
      name: "Meera",
      city: "Jaipur",
      caption: "7 Day Kashmir family escape",
      destination: "Srinagar · Gulmarg · Sonmarg",
      duration: "7 Days · 6 Nights",
      rating: 5,
      title: "They cared for my parents like family",
      review:
        "Dal Lake shikara ride, Gulmarg gondola, Sonmarg meadows. Heaters in every room, home-cooked Kashmiri food. MHB even arranged a doctor when my mom felt unwell. Pure care.",
      date: "Dec 2025",
      image: C("v1779220323/WhatsApp_Image_2026-05-16_at_1.19.11_PM_lbbzqo.jpg"),
    },
    {
      id: 10,
      initial: "T",
      name: "Tanvi",
      city: "Mumbai",
      caption: "6 Day Bali honeymoon",
      destination: "Uluwatu · Ubud · Jimbaran",
      duration: "6 Days · 5 Nights",
      rating: 5,
      title: "Six days of pure bliss",
      review:
        "Cliffside villa, romantic dinner at Jimbaran beach, couples spa. MHB slipped in a candlelit pool float surprise on our anniversary. Literal tears.",
      date: "Nov 2025",
      image: C("v1779220322/WhatsApp_Image_2026-05-16_at_1.20.03_PM_gq7ecr.jpg"),
    },
    {
      id: 11,
      initial: "V",
      name: "Vikas",
      city: "Lucknow",
      caption: "8 Day Ladakh solo trek",
      destination: "Leh · Pangong · Nubra",
      duration: "8 Days · 7 Nights",
      rating: 5,
      title: "Zero regrets, all altitude",
      review:
        "MHB's local guides knew every corner. Acclimatization stops were planned smartly. The Khardung La photo is now my desktop wallpaper.",
      date: "Oct 2025",
      image: C("v1779220322/WhatsApp_Image_2026-05-16_at_1.19.05_PM_yvw52x.jpg"),
    },
    {
      id: 12,
      initial: "I",
      name: "Ishaan",
      city: "Goa",
      caption: "6 Day Andaman family time",
      destination: "Havelock · Neil Island",
      duration: "6 Days · 5 Nights",
      rating: 5,
      title: "The kids didn't want to leave",
      review:
        "Snorkeling, kayaking, sea-walks. Radhanagar Beach water was unreal. MHB matched us to a family-friendly resort that the kids didn't want to leave.",
      date: "Oct 2025",
      image: C("v1779220322/WhatsApp_Image_2026-05-16_at_1.19.11_PM_1_ohnlgn.jpg"),
    },
    {
      id: 13,
      initial: "D",
      name: "Divya",
      city: "Hyderabad",
      caption: "5 Night luxury Maldives",
      destination: "Male · Private Island",
      duration: "5 Days · 5 Nights",
      rating: 5,
      title: "They overdelivered at every step",
      review:
        "Private overwater suite, butler service, a private island dinner. MHB upgraded our seaplane to a charter without us asking. Anniversary of a lifetime.",
      date: "Sep 2025",
      image: C("v1779220322/WhatsApp_Image_2026-05-16_at_1.20.03_PM_1_ble2gz.jpg"),
    },
    {
      id: 14,
      initial: "S",
      name: "Sahil",
      city: "Chandigarh",
      caption: "4 Day Goa friends getaway",
      destination: "North Goa",
      duration: "4 Days · 3 Nights",
      rating: 5,
      title: "Smoothest trip plan I've ever had",
      review:
        "Last-minute long weekend with the boys. Clubs, beaches, beach shacks, a fort sunset. MHB sorted villas and pickups in 24 hours.",
      date: "Sep 2025",
      image: C("v1779220321/WhatsApp_Image_2026-05-16_at_1.18.59_PM_supqut.jpg"),
    },
  ],
  [
    {
      id: 15,
      initial: "N",
      name: "Nikhil",
      city: "Jaipur",
      caption: "5 Night Rajasthan heritage",
      destination: "Udaipur · Jaipur",
      duration: "5 Days · 5 Nights",
      rating: 5,
      title: "Boutique heritage stays, perfectly chosen",
      review:
        "City Palace, Amber Fort, lake-side dinners. MHB nailed the haveli picks. Local guides were knowledgeable, not the touristy kind.",
      date: "Aug 2025",
      image: C("v1779220321/WhatsApp_Image_2026-05-16_at_1.18.59_PM_1_ytnrvn.jpg"),
    },
    {
      id: 16,
      initial: "S",
      name: "Sneha",
      city: "Indore",
      caption: "6 Day Sikkim with friends",
      destination: "Gangtok · Pelling",
      duration: "6 Days · 5 Nights",
      rating: 5,
      title: "A Himalayan reset we needed",
      review:
        "Tsomgo Lake, Nathula Pass, Pelling sunsets. MHB handled permits which would've taken us forever. The momos at the Buddha statue stop — game changer.",
      date: "Aug 2025",
      image: C("v1779220321/WhatsApp_Image_2026-05-16_at_1.18.58_PM_hodiar.jpg"),
    },
    {
      id: 17,
      initial: "P",
      name: "Pooja",
      city: "Mumbai",
      caption: "6 Day Turkey couple escape",
      destination: "Cappadocia · Pamukkale · Istanbul",
      duration: "6 Days · 5 Nights",
      rating: 5,
      title: "Sleeping in stone never felt cooler",
      review:
        "Cappadocia balloon ride at dawn, Pamukkale's white terraces, Istanbul's bazaars. MHB curated boutique cave hotels — bucket list ticked.",
      date: "Jul 2025",
      image: C("v1779220246/WhatsApp_Image_2026-05-16_at_1.18.58_PM_1_o6eczp.jpg"),
    },
    {
      id: 18,
      initial: "A",
      name: "Aditya",
      city: "Pune",
      caption: "7 Day Greece family holiday",
      destination: "Athens · Santorini · Mykonos",
      duration: "7 Days · 6 Nights",
      rating: 5,
      title: "Effortless luxury for the whole family",
      review:
        "Kids ran around the Acropolis, we lounged in Oia. MHB knew which restaurants had kid menus and which beaches were calmer. Top-notch planning.",
      date: "Jun 2025",
      image: C("v1779220204/WhatsApp_Image_2026-05-16_at_1.18.57_PM_ux0vpf.jpg"),
    },
    {
      id: 19,
      initial: "R",
      name: "Ridhi",
      city: "Mumbai",
      caption: "8 Day Norway luxury escape",
      destination: "Bergen · Tromsø · Lofoten",
      duration: "8 Days · 7 Nights",
      rating: 5,
      title: "Bucket list level trip",
      review:
        "Fjords, northern lights, midnight cruises. MHB tied in private glass-igloo nights and a husky sled run. My partner cried watching the sky.",
      date: "May 2025",
      image: C("v1779220202/WhatsApp_Image_2026-05-16_at_1.18.07_PM_xjjipr.jpg"),
    },
    {
      id: 20,
      initial: "Y",
      name: "Yash",
      city: "Surat",
      caption: "6 Day Egypt solo adventure",
      destination: "Cairo · Luxor · Red Sea",
      duration: "6 Days · 5 Nights",
      rating: 5,
      title: "Hands down my best solo trip",
      review:
        "Pyramids at sunset hit different. Felucca on the Nile, Karnak temple at golden hour, Red Sea diving. MHB connected me to a brilliant Egyptologist guide.",
      date: "Apr 2025",
      image: C("v1779220202/WhatsApp_Image_2026-05-16_at_1.18.06_PM_tefkbe.jpg"),
    },
    {
      id: 21,
      initial: "R",
      name: "Rajat",
      city: "Mumbai",
      caption: "9 Day France + Switzerland",
      destination: "Paris · Lucerne · Interlaken",
      duration: "9 Days · 8 Nights",
      rating: 5,
      title: "Cobblestones and snow caps in one trip",
      review:
        "MHB's daily plan was just-right — never overpacked, plenty of room to wander. Booked the Mont Blanc helicopter add-on which was insane.",
      date: "Mar 2025",
      image: C("v1779220202/WhatsApp_Image_2026-05-16_at_1.18.03_PM_qxifdm.jpg"),
    },
  ],
];

const SLOT_CLASS = [
  "slot1",
  "slot2",
  "slot3",
  "slot4",
  "slot5",
  "slot6",
  "slot7",
];

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Moments() {
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onEsc);
    };
  }, [active]);

  function prev() {
    setSlide((s) => Math.max(0, s - 1));
  }

  function next() {
    setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
  }

  return (
    <section className={styles.section} id="moments">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.heading}>
            Read the stories, then{" "}
            <span className={styles.headingAccent}>go for it</span>
          </h2>
          <div className={styles.controls}>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={prev}
                disabled={slide === 0}
                aria-label="Previous"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={next}
                disabled={slide === SLIDES.length - 1}
                aria-label="Next"
              >
                <ChevronRight />
              </button>
            </div>
            <button type="button" className={styles.seeMore}>
              See more
            </button>
          </div>
        </div>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translate3d(-${slide * 100}%, 0, 0)` }}
          >
            {SLIDES.map((cards, slideIdx) => (
              <div key={slideIdx} className={styles.slide} aria-hidden={slide !== slideIdx}>
                {cards.map((c, idx) => (
                  <button
                    type="button"
                    key={c.id}
                    className={`${styles.card} ${styles[SLOT_CLASS[idx]]}`}
                    onClick={() => setActive(c)}
                    aria-label={`Open ${c.name}'s postcard`}
                  >
                    <Image
                      src={c.image}
                      alt={c.caption}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 20vw"
                      className={styles.cardImage}
                    />
                    <div className={styles.overlayTop}>
                      <span className={styles.avatar}>{c.initial}</span>
                      <span className={styles.avatarName}>{c.name}</span>
                    </div>
                    <div className={styles.overlayBottom}>
                      <span className={styles.caption}>{c.caption}</span>
                      <span className={styles.arrowChip} aria-hidden>
                        <ArrowIcon />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.dots} role="tablist" aria-label="Slide navigation">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={slide === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`${styles.dot} ${slide === i ? styles.dotActive : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>

      {active && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name}'s review`}
        >
          <button
            type="button"
            className={styles.lightboxBack}
            onClick={() => setActive(null)}
            aria-label="Back"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <XIcon />
          </button>
          <div className={styles.lightboxBody}>
            <div className={styles.lightboxImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image}
                alt={active.caption}
                className={styles.lightboxImage}
              />
            </div>
            <aside className={styles.lightboxReview}>
              <div className={styles.reviewHead}>
                <span className={styles.reviewAvatar}>{active.initial}</span>
                <div className={styles.reviewWho}>
                  <span className={styles.reviewName}>{active.name}</span>
                  <span className={styles.reviewCity}>
                    From {active.city}
                  </span>
                </div>
              </div>

              <div className={styles.reviewRating}>
                <span className={styles.stars} aria-hidden>
                  {"★".repeat(active.rating)}
                </span>
                <span className={styles.ratingValue}>
                  {active.rating}.0
                </span>
                <span className={styles.ratingMeta}>· Verified trip</span>
              </div>

              <div className={styles.reviewMeta}>
                <span className={styles.metaPill}>{active.destination}</span>
                <span className={styles.metaPill}>{active.duration}</span>
              </div>

              <h3 className={styles.reviewTitle}>{active.title}</h3>
              <p className={styles.reviewBody}>{active.review}</p>

              <div className={styles.reviewFooter}>
                Traveled with MyHolidayBro · {active.date}
              </div>
            </aside>
          </div>
        </div>
      )}
    </section>
  );
}
