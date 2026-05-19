"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Bookings.module.css";

const W = (slug, file) =>
  `https://static.wixstatic.com/media/${slug}/v1/fill/w_800,h_500,al_c,q_85,enc_avif,quality_auto/${file}`;

const IMG = {
  bali: W(
    "nsplsh_657846644f576b59425177~mv2.jpg",
    "nsplsh_657846644f576b59425177~mv2.jpg"
  ),
  thailand: W(
    "nsplsh_6a574b6b2d305a42557967~mv2_d_4439_3072_s_4_2.jpg",
    "nsplsh_6a574b6b2d305a42557967~mv2_d_4439_3072_s_4_2.jpg"
  ),
  singapore: W(
    "nsplsh_df573ee0f6154a9a80b452293e2c0475~mv2.jpg",
    "nsplsh_df573ee0f6154a9a80b452293e2c0475~mv2.jpg"
  ),
  malaysia: W(
    "nsplsh_05291b47a88e40e986ad33b6de021909~mv2.jpg",
    "nsplsh_05291b47a88e40e986ad33b6de021909~mv2.jpg"
  ),
  vietnam: W(
    "11062b_a0faae69bec6475c834fa172822d6ba9~mv2.jpeg",
    "11062b_a0faae69bec6475c834fa172822d6ba9~mv2.jpeg"
  ),
  dubai: W(
    "e7beb6_45e14c300a1f4d98a7b96422aaac6f10~mv2.jpg",
    "e7beb6_45e14c300a1f4d98a7b96422aaac6f10~mv2.jpg"
  ),
  maldives: W(
    "nsplsh_4d314f6278767357566859~mv2.jpg",
    "nsplsh_4d314f6278767357566859~mv2.jpg"
  ),
  maldives2: W(
    "nsplsh_6c543972716647376c6351~mv2_d_5464_3070_s_4_2.jpg",
    "nsplsh_6c543972716647376c6351~mv2_d_5464_3070_s_4_2.jpg"
  ),
  himachal: W(
    "nsplsh_c9a8db6c852e41de80d01c2d166a13ee~mv2.jpg",
    "nsplsh_c9a8db6c852e41de80d01c2d166a13ee~mv2.jpg"
  ),
  northeast: W(
    "nsplsh_ce21f1ca7cb74b3397fee018e612680b~mv2.jpg",
    "nsplsh_ce21f1ca7cb74b3397fee018e612680b~mv2.jpg"
  ),
};

const DESTINATIONS = [
  { id: "all", label: "All Destinations" },
  { id: "bali", label: "Bali" },
  { id: "thailand", label: "Thailand" },
  { id: "vietnam", label: "Vietnam" },
  { id: "malaysia", label: "Malaysia" },
  { id: "singapore", label: "Singapore" },
  { id: "sg-my", label: "Singapore + Malaysia" },
  { id: "dubai", label: "Dubai" },
  { id: "maldives", label: "Maldives" },
  { id: "turkey", label: "Turkey" },
  { id: "egypt", label: "Egypt" },
  { id: "greece", label: "Greece" },
  { id: "france-swiss", label: "France + Switzerland" },
  { id: "norway", label: "Norway" },
  { id: "himachal", label: "Himachal" },
  { id: "kashmir", label: "Kashmir" },
  { id: "ladakh", label: "Ladakh" },
  { id: "sikkim", label: "Sikkim" },
  { id: "kerala", label: "Kerala" },
  { id: "andaman", label: "Andaman" },
  { id: "goa", label: "Goa" },
  { id: "rajasthan", label: "Rajasthan" },
  { id: "karnataka", label: "Karnataka" },
];

const PRICE_RANGES = [
  { id: "under50", label: "Under ₹50K", min: 0, max: 50000 },
  { id: "50to150", label: "₹50K to ₹1.5L", min: 50000, max: 150000 },
  { id: "150to250", label: "₹1.5L to ₹2.5L", min: 150000, max: 250000 },
  { id: "luxury", label: "Luxury", min: 250000, max: Infinity },
];

const BOOKINGS = [
  {
    id: 1,
    initial: "S",
    name: "Shiv",
    city: "Hyderabad",
    timeAgo: "1hr ago",
    title: "Family Escape: 6 Nights in Kuala Lumpur and Singapore",
    location: "Singapore (3N) +1 more",
    tag: "FAMILY",
    nights: 6,
    priceText: "₹63,201",
    priceNum: 63201,
    image: IMG.singapore,
    dests: ["singapore", "malaysia", "sg-my"],
  },
  {
    id: 2,
    initial: "A",
    name: "Abi",
    city: "Chennai",
    timeAgo: "2hr ago",
    title: "Couple Escape: 5 Nights in Langkawi",
    location: "Langkawi (5N)",
    tag: "COUPLE",
    nights: 5,
    priceText: "₹70,309",
    priceNum: 70309,
    image: IMG.malaysia,
    dests: ["malaysia"],
  },
  {
    id: 3,
    initial: "H",
    name: "Hari",
    city: "Mumbai",
    timeAgo: "3hr ago",
    title: "Solo Holiday: 7 Nights in Bali",
    location: "Bali (7N)",
    tag: "SOLO",
    nights: 7,
    priceText: "₹54,999",
    priceNum: 54999,
    image: IMG.bali,
    dests: ["bali"],
  },
  {
    id: 4,
    initial: "P",
    name: "Priya",
    city: "Bangalore",
    timeAgo: "5hr ago",
    title: "Couple Holiday: 6 Nights in Vietnam",
    location: "Hanoi (3N) +1 more",
    tag: "COUPLE",
    nights: 6,
    priceText: "₹47,500",
    priceNum: 47500,
    image: IMG.vietnam,
    dests: ["vietnam"],
  },
  {
    id: 5,
    initial: "A",
    name: "Arjun",
    city: "Delhi",
    timeAgo: "6hr ago",
    title: "Honeymoon: 5 Nights in Maldives",
    location: "Maldives (5N)",
    tag: "COUPLE",
    nights: 5,
    priceText: "₹1,89,999",
    priceNum: 189999,
    image: IMG.maldives,
    dests: ["maldives"],
  },
  {
    id: 6,
    initial: "N",
    name: "Neha",
    city: "Pune",
    timeAgo: "8hr ago",
    title: "Family Holiday: 8 Nights Singapore + Thailand",
    location: "Singapore (4N) +1 more",
    tag: "FAMILY",
    nights: 8,
    priceText: "₹89,999",
    priceNum: 89999,
    image: IMG.singapore,
    dests: ["singapore", "thailand"],
  },
  {
    id: 7,
    initial: "R",
    name: "Rohan",
    city: "Kolkata",
    timeAgo: "12hr ago",
    title: "Solo Adventure: 5 Nights in Dubai",
    location: "Dubai (5N)",
    tag: "SOLO",
    nights: 5,
    priceText: "₹38,999",
    priceNum: 38999,
    image: IMG.dubai,
    dests: ["dubai"],
  },
  {
    id: 8,
    initial: "K",
    name: "Karan",
    city: "Ahmedabad",
    timeAgo: "1d ago",
    title: "Friends Trip: 6 Nights in Thailand",
    location: "Phuket (3N) +1 more",
    tag: "FRIENDS",
    nights: 6,
    priceText: "₹52,499",
    priceNum: 52499,
    image: IMG.thailand,
    dests: ["thailand"],
  },
  {
    id: 9,
    initial: "M",
    name: "Meera",
    city: "Jaipur",
    timeAgo: "1d ago",
    title: "Family Escape: 7 Nights in Kashmir",
    location: "Srinagar (3N) +1 more",
    tag: "FAMILY",
    nights: 7,
    priceText: "₹54,999",
    priceNum: 54999,
    image: IMG.himachal,
    dests: ["kashmir"],
  },
  {
    id: 10,
    initial: "V",
    name: "Vikas",
    city: "Lucknow",
    timeAgo: "1d ago",
    title: "Solo Trek: 8 Nights in Ladakh",
    location: "Leh (5N) +1 more",
    tag: "SOLO",
    nights: 8,
    priceText: "₹68,999",
    priceNum: 68999,
    image: IMG.himachal,
    dests: ["ladakh"],
  },
  {
    id: 11,
    initial: "T",
    name: "Tanvi",
    city: "Mumbai",
    timeAgo: "2d ago",
    title: "Honeymoon: 6 Nights in Bali",
    location: "Ubud (3N) +1 more",
    tag: "COUPLE",
    nights: 6,
    priceText: "₹78,999",
    priceNum: 78999,
    image: IMG.bali,
    dests: ["bali"],
  },
  {
    id: 12,
    initial: "I",
    name: "Ishaan",
    city: "Goa",
    timeAgo: "2d ago",
    title: "Family Holiday: 6 Nights in Andaman",
    location: "Port Blair (3N) +1 more",
    tag: "FAMILY",
    nights: 6,
    priceText: "₹89,999",
    priceNum: 89999,
    image: IMG.maldives2,
    dests: ["andaman"],
  },
  {
    id: 13,
    initial: "D",
    name: "Divya",
    city: "Hyderabad",
    timeAgo: "2d ago",
    title: "Luxury Romance: 5 Nights in Maldives",
    location: "Male (5N)",
    tag: "COUPLE",
    nights: 5,
    priceText: "₹2,79,000",
    priceNum: 279000,
    image: IMG.maldives,
    dests: ["maldives"],
  },
  {
    id: 14,
    initial: "S",
    name: "Sahil",
    city: "Chandigarh",
    timeAgo: "2d ago",
    title: "Friends Getaway: 4 Nights in Goa",
    location: "North Goa (4N)",
    tag: "FRIENDS",
    nights: 4,
    priceText: "₹24,999",
    priceNum: 24999,
    image: IMG.thailand,
    dests: ["goa"],
  },
  {
    id: 15,
    initial: "A",
    name: "Anjali",
    city: "Bangalore",
    timeAgo: "3d ago",
    title: "Family Escape: 7 Nights in Kerala Backwaters",
    location: "Alleppey (2N) +2 more",
    tag: "FAMILY",
    nights: 7,
    priceText: "₹49,999",
    priceNum: 49999,
    image: IMG.malaysia,
    dests: ["kerala"],
  },
  {
    id: 16,
    initial: "R",
    name: "Rajat",
    city: "Mumbai",
    timeAgo: "3d ago",
    title: "Couple Holiday: 9 Nights France + Switzerland",
    location: "Paris (3N) +3 more",
    tag: "COUPLE",
    nights: 9,
    priceText: "₹2,99,000",
    priceNum: 299000,
    image: IMG.singapore,
    dests: ["france-swiss"],
  },
  {
    id: 17,
    initial: "K",
    name: "Kavya",
    city: "Delhi",
    timeAgo: "3d ago",
    title: "Solo Adventure: 6 Nights in Himachal",
    location: "Manali (3N) +1 more",
    tag: "SOLO",
    nights: 6,
    priceText: "₹32,999",
    priceNum: 32999,
    image: IMG.himachal,
    dests: ["himachal"],
  },
  {
    id: 18,
    initial: "F",
    name: "Farhan",
    city: "Bangalore",
    timeAgo: "4d ago",
    title: "Friends Trip: 6 Nights in Vietnam",
    location: "Ho Chi Minh (3N) +1 more",
    tag: "FRIENDS",
    nights: 6,
    priceText: "₹54,999",
    priceNum: 54999,
    image: IMG.vietnam,
    dests: ["vietnam"],
  },
  {
    id: 19,
    initial: "P",
    name: "Pooja",
    city: "Mumbai",
    timeAgo: "4d ago",
    title: "Couple Escape: 6 Nights in Turkey",
    location: "Cappadocia (2N) +2 more",
    tag: "COUPLE",
    nights: 6,
    priceText: "₹83,999",
    priceNum: 83999,
    image: IMG.dubai,
    dests: ["turkey"],
  },
  {
    id: 20,
    initial: "A",
    name: "Aditya",
    city: "Pune",
    timeAgo: "5d ago",
    title: "Family Holiday: 7 Nights in Greece",
    location: "Santorini (3N) +1 more",
    tag: "FAMILY",
    nights: 7,
    priceText: "₹1,49,999",
    priceNum: 149999,
    image: IMG.maldives,
    dests: ["greece"],
  },
  {
    id: 21,
    initial: "S",
    name: "Sneha",
    city: "Indore",
    timeAgo: "5d ago",
    title: "Friends Trip: 6 Nights in Sikkim",
    location: "Gangtok (3N) +1 more",
    tag: "FRIENDS",
    nights: 6,
    priceText: "₹42,999",
    priceNum: 42999,
    image: IMG.northeast,
    dests: ["sikkim"],
  },
  {
    id: 22,
    initial: "N",
    name: "Nikhil",
    city: "Jaipur",
    timeAgo: "6d ago",
    title: "Couple Heritage: 5 Nights in Rajasthan",
    location: "Udaipur (2N) +1 more",
    tag: "COUPLE",
    nights: 5,
    priceText: "₹39,999",
    priceNum: 39999,
    image: IMG.dubai,
    dests: ["rajasthan"],
  },
  {
    id: 23,
    initial: "R",
    name: "Ridhi",
    city: "Mumbai",
    timeAgo: "6d ago",
    title: "Luxury Escape: 8 Nights in Norway",
    location: "Bergen (3N) +2 more",
    tag: "COUPLE",
    nights: 8,
    priceText: "₹3,29,000",
    priceNum: 329000,
    image: IMG.himachal,
    dests: ["norway"],
  },
  {
    id: 24,
    initial: "Y",
    name: "Yash",
    city: "Surat",
    timeAgo: "6d ago",
    title: "Solo Adventure: 6 Nights in Egypt",
    location: "Cairo (3N) +1 more",
    tag: "SOLO",
    nights: 6,
    priceText: "₹74,999",
    priceNum: 74999,
    image: IMG.dubai,
    dests: ["egypt"],
  },
];

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

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

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function Bookings() {
  const [dest, setDest] = useState("all");
  const [price, setPrice] = useState("all");
  const [destOpen, setDestOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDestOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setDestOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const filtered = useMemo(() => {
    return BOOKINGS.filter((b) => {
      const destMatch = dest === "all" || b.dests.includes(dest);
      let priceMatch = true;
      if (price !== "all") {
        const range = PRICE_RANGES.find((p) => p.id === price);
        if (range) priceMatch = b.priceNum >= range.min && b.priceNum < range.max;
      }
      return destMatch && priceMatch;
    });
  }, [dest, price]);

  function scrollBy(dir) {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: dir * 380, behavior: "smooth" });
  }

  const selectedDest = DESTINATIONS.find((d) => d.id === dest);

  return (
    <section className={styles.section} id="bookings">
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.filterGroup}>
            <div ref={dropdownRef} className={styles.dropdownWrap}>
              <button
                type="button"
                className={styles.dropdownBtn}
                onClick={() => setDestOpen((v) => !v)}
                aria-expanded={destOpen}
                aria-haspopup="menu"
              >
                {selectedDest.label}
                <ChevronDown />
              </button>
              {destOpen && (
                <div className={styles.dropdownMenu} role="menu">
                  {DESTINATIONS.map((d) => {
                    const active = dest === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        role="menuitemradio"
                        aria-checked={active}
                        className={`${styles.dropdownItem} ${
                          active ? styles.dropdownItemActive : ""
                        }`}
                        onClick={() => {
                          setDest(d.id);
                          setDestOpen(false);
                        }}
                      >
                        <span
                          className={`${styles.radio} ${
                            active ? styles.radioActive : ""
                          }`}
                        />
                        <span>{d.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {PRICE_RANGES.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`${styles.pill} ${
                  price === p.id ? styles.pillActive : ""
                }`}
                onClick={() => setPrice(price === p.id ? "all" : p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrowBtn}
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              aria-label="Next"
              onClick={() => scrollBy(1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.headingCol}>
            <h2 className={styles.heading}>
              Just
              <br />
              <span className={styles.headingAccent}>booked</span>
              <br />
              this week
            </h2>
            <span className={styles.bookedPill}>
              <span className={styles.heart} aria-hidden>
                &#10084;
              </span>
              {BOOKINGS.length}+ trips booked this week
            </span>
          </div>

          <div className={styles.cardsScroll} ref={scrollerRef}>
            {filtered.map((b) => (
              <article key={b.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.avatar}>{b.initial}</span>
                  <span className={styles.cardHeadText}>
                    <strong>
                      {b.name} from {b.city}
                    </strong>
                    <span className={styles.cardHeadDot}> &middot; </span>
                    <span className={styles.cardHeadAgo}>{b.timeAgo}</span>
                  </span>
                </div>
                <div className={styles.cardImageWrap}>
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    sizes="360px"
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{b.title}</h3>
                  <div className={styles.cardLoc}>
                    <PinIcon />
                    <span>{b.location}</span>
                  </div>
                  <span className={styles.tag}>{b.tag}</span>
                  <div className={styles.cardFooter}>
                    <div className={styles.priceWrap}>
                      <span className={styles.price}>{b.priceText}</span>
                      <span className={styles.priceSub}>
                        {b.nights} nights / person
                      </span>
                    </div>
                    <button type="button" className={styles.viewBtn}>
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className={styles.empty}>
                No itineraries match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
