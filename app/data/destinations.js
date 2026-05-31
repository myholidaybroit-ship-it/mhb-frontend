// Central data for all MyHolidayBro destinations.
// Image slugs are real Wix CDN assets; img() builds a sized URL.

const SLUG = {
  bali: "nsplsh_657846644f576b59425177~mv2.jpg",
  thailand: "nsplsh_6a574b6b2d305a42557967~mv2_d_4439_3072_s_4_2.jpg",
  singapore: "nsplsh_df573ee0f6154a9a80b452293e2c0475~mv2.jpg",
  malaysia: "nsplsh_05291b47a88e40e986ad33b6de021909~mv2.jpg",
  vietnam: "11062b_a0faae69bec6475c834fa172822d6ba9~mv2.jpeg",
  dubai: "e7beb6_45e14c300a1f4d98a7b96422aaac6f10~mv2.jpg",
  maldives: "nsplsh_4d314f6278767357566859~mv2.jpg",
  maldives2: "nsplsh_6c543972716647376c6351~mv2_d_5464_3070_s_4_2.jpg",
  himachal: "nsplsh_c9a8db6c852e41de80d01c2d166a13ee~mv2.jpg",
  northeast: "nsplsh_ce21f1ca7cb74b3397fee018e612680b~mv2.jpg",
};

export const img = (key, w = 1200, h = 800) => {
  const slug = SLUG[key] || SLUG.bali;
  return `https://static.wixstatic.com/media/${slug}/v1/fill/w_${w},h_${h},al_c,q_85,enc_avif,quality_auto/${slug}`;
};

export const SHARED_INCLUSIONS = [
  "Accommodation in hand-picked hotels",
  "Daily breakfast at the hotel",
  "All tours & transfers in a private vehicle",
  "Airport pickup and drop-off",
  "Dedicated MyHolidayBro trip advisor",
  "All applicable hotel taxes & service charges",
];

export const SHARED_EXCLUSIONS = [
  "Airfare (unless a flight-inclusive package is chosen)",
  "GST and TCS as applicable",
  "Optional activities & water sports",
  "Travel insurance",
  "Personal expenses — tips, laundry, calls, alcohol",
  "Anything not mentioned under inclusions",
];

export const SHARED_FAQS = [
  {
    q: "How do I book this trip?",
    a: "Pick a package, send an enquiry, and a dedicated MyHolidayBro advisor will get in touch to lock dates, customise the itinerary, and confirm your booking. A binding agreement takes effect when we issue the confirmation invoice to the lead name.",
  },
  {
    q: "Can the itinerary be customised?",
    a: "Yes — every itinerary is a starting point. Add nights, swap hotels, upgrade rooms or add experiences. Special requests can be raised at booking; we'll pass them to our suppliers but they're only guaranteed if we confirm them in writing.",
  },
  {
    q: "What's the cancellation policy?",
    a: "Cancellation charges are a percentage of the total holiday cost and depend on how many days before departure we receive your written notice from the lead name. Amendment fees are non-refundable. Your advisor confirms the exact charges for your booking.",
  },
  {
    q: "How long do refunds take?",
    a: "Refunds usually arrive within 3 – 4 working days once initiated, but can take up to 21 working days to reflect. Refunds are issued to the original payment method; KYC may be required if that mode isn't available.",
  },
  {
    q: "Do I need travel insurance?",
    a: "Yes — we consider adequate travel insurance essential. It's your responsibility to ensure your cover is suitable. MyHolidayBro isn't liable for losses that would otherwise have been covered by adequate insurance.",
  },
];

export const USPS = [
  { title: "24×7 Assistance", desc: "Reach us any hour, on-trip or off." },
  { title: "Best Price Guaranteed", desc: "Direct local partners, no middlemen." },
  { title: "Dedicated Trip Advisor", desc: "One expert from planning to landing." },
  { title: "100% Satisfaction", desc: "Public reviews, honest service." },
];

export const AGE_LIMIT = "5 – 65 yrs (younger/older travellers welcome on request)";

export const SHARED_CANCELLATION = [
  { window: "30+ days before departure", refund: "Up to 90% refund (booking fee retained)" },
  { window: "15 – 29 days before", refund: "Up to 50% refund" },
  { window: "7 – 14 days before", refund: "Up to 25% refund" },
  { window: "Under 7 days / no-show", refund: "No refund" },
];

export const SHARED_PAYMENT = [
  "Partial booking amount confirms your slot — exact sum is set per tour operator.",
  "Balance is due within 3 days of paying the booking amount.",
  "Bookings within 30 days of departure require full payment immediately.",
  "Accepted methods: credit card, debit card, internet banking and bank transfers.",
  "Convenience fees apply on payments made after the booking date (except direct bank transfers).",
];

export const SHARED_REVIEWS = [
  {
    name: "Aanya Mehta",
    initials: "AM",
    city: "Mumbai",
    rating: 5,
    title: "Better than I imagined",
    body:
      "Everything from the airport pickup to the very last meal was planned beautifully. Our advisor swapped two hotels last minute on our request without any fuss. 10/10.",
    when: "Booked Honeymoon · 2 months ago",
  },
  {
    name: "Rohan Iyer",
    initials: "RI",
    city: "Bengaluru",
    rating: 5,
    title: "Smooth from start to finish",
    body:
      "We booked late and they still pulled off a great itinerary. The local driver was fantastic and the property upgrades they got us were the cherry on top.",
    when: "Booked Friends Trip · 5 weeks ago",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    city: "Delhi NCR",
    rating: 4,
    title: "Worth every rupee",
    body:
      "Trip ran exactly on schedule, hotels were genuinely 4-star and the advisor checked in every single day. Will be back for our next trip for sure.",
    when: "Booked Family Trip · 3 months ago",
  },
];

// Accordion content for the “Good to Know” section.
export function goodToKnowAccordion(dest) {
  const india = dest.region === "India";
  return [
    {
      title: "Currency & money",
      body: india
        ? "Indian Rupee (₹) is used everywhere. ATMs are widely available. Carry small notes for tips and local shops. UPI / cards accepted in most cities and tourist hubs."
        : `Plan to pay MyHolidayBro in Indian Rupees (₹). On the ground in ${dest.country}, use the local currency for tips, small purchases and street food. Forex cards work at most ATMs and POS terminals.`,
    },
    {
      title: "Visa & documents",
      body:
        dest.visa
          ? `${dest.visa}. Carry a passport with at least 6 months validity, 2 blank pages and 2 recent photos. Your advisor will share the exact document checklist after booking.`
          : "No visa required (domestic trip). Carry a valid government photo ID — Aadhaar, passport or driving licence. For some hill states a permit is collected on arrival; we handle this for you.",
    },
    {
      title: "Best time to visit",
      body: `Sweet spot is ${dest.bestTime}. Outside of this you may catch off-season pricing but expect closures of some sights and weather-driven changes. Talk to your advisor about the best window for your style.`,
    },
    {
      title: "Plugs & adapters",
      body: india
        ? "India uses Type C, D and M sockets at 230V. Most modern hotels accept Type C and G. A universal adapter is handy if you carry US/UK gadgets."
        : `${dest.country} sockets vary — carry a universal travel adapter to be safe. Most hotels also lend adapters on request.`,
    },
    {
      title: "Vaccinations & health",
      body:
        "No mandatory vaccines for most travellers from India. A basic kit (paracetamol, ORS, anti-allergic, motion-sickness, plasters) goes a long way. Travel insurance is recommended for all overseas trips.",
    },
    {
      title: "Payment information",
      body:
        "Reserve your slot with a 25% deposit. Pay the balance up to 21 days before departure. All payments go through verified gateways (UPI, cards, net banking, no-cost EMI on most packages).",
    },
    {
      title: "Connectivity",
      body: india
        ? "Indian SIMs work across the country with strong 4G/5G in most regions. Hill and high-altitude areas (Ladakh, Spiti, Sikkim) have postpaid-only zones — your advisor will flag these in advance."
        : `International roaming or a local eSIM is the easiest option in ${dest.country}. Hotels include Wi-Fi as standard.`,
    },
    {
      title: "How to reach",
      body: india
        ? `Most ${dest.name} trips start with a flight or overnight train to the nearest hub, followed by a private transfer included in your package. Your advisor will book the cheapest, sensible route and share the full itinerary 7 days before departure.`
        : `International trips to ${dest.country} usually depart from a major Indian metro (Delhi, Mumbai, Bengaluru). Flights can be bundled into your package or booked independently — your advisor will compare and recommend.`,
    },
  ];
}

// Inclusion-icons reassurance strip shown under the title bar.
export const REASSURANCE_BAR = [
  { label: "Hand-picked stays" },
  { label: "Daily breakfast" },
  { label: "Private transfers" },
  { label: "Sightseeing & permits" },
  { label: "Flexible cancellation" },
  { label: "24×7 on-trip support" },
];

// Region-aware practical info for the "Good to Know" grid (legacy).
export function goodToKnow(dest) {
  const india = dest.region === "India";
  return [
    { label: "Best time to visit", value: dest.bestTime },
    { label: "Ideal for", value: dest.idealFor },
    { label: "Age range", value: AGE_LIMIT.split(" (")[0] },
    {
      label: "Visa",
      value: dest.visa || (india ? "Not required (domestic)" : "Check requirements"),
    },
    {
      label: "Currency",
      value: india ? "Indian Rupee (₹)" : "Pay MyHolidayBro in ₹ (INR)",
    },
    {
      label: "Language",
      value: india ? "Hindi, English & local" : "English-speaking guides",
    },
  ];
}

const DESTINATIONS = {
  bali: {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "International",
    imageKey: "bali",
    galleryKeys: ["bali", "maldives2", "thailand"],
    fromPrice: "₹13,999",
    rating: 4.8,
    reviews: 412,
    tagline: "Temples, volcanoes, and beach-club sunsets.",
    bestTime: "Apr – Oct",
    idealFor: "Couples · Honeymoon · Friends",
    visa: "Free visa on arrival",
    overview: [
      "Bali is the island that does it all — emerald rice terraces in Ubud, surf beaches in Seminyak, clifftop temples at Uluwatu, and a volcano sunrise at Mount Batur. It's equal parts adventure, romance, and pure relaxation.",
      "Our Bali trips balance the icons with the hidden corners — a private waterfall most travellers miss, a Balinese cooking session, and sunset at Tanah Lot — all on private transfers with an English-speaking driver.",
    ],
    highlights: [
      "Mount Batur volcano sunrise",
      "Ubud rice terraces & monkey forest",
      "Water sports at Tanjung Benoa",
      "Tanah Lot sunset temple",
      "Uluwatu clifftop temple",
      "Seminyak beach clubs",
    ],
    packages: [
      { name: "Bali Super Saver", days: 5, nights: 4, price: "₹13,999", original: "₹20,000", route: "Kuta · Ubud", tag: "Couple" },
      { name: "Bali Honeymoon Special", days: 6, nights: 5, price: "₹24,999", original: "₹34,000", route: "Ubud · Uluwatu", tag: "Honeymoon" },
      { name: "Bali Adventure Week", days: 7, nights: 6, price: "₹32,999", original: "₹44,000", route: "Ubud · Nusa Penida", tag: "Friends" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bali", desc: "Welcome at Ngurah Rai Airport and private transfer to your hotel. Evening at leisure." },
      { day: 2, title: "Kintamani & Ubud Village", desc: "Explore Ubud village, then head to Kintamani for sweeping Mount Batur volcano views." },
      { day: 3, title: "Water Sports & Tanah Lot", desc: "Parasailing, banana boat and jet ski at Tanjung Benoa, then a sunset at the sacred Tanah Lot temple." },
      { day: 4, title: "Uluwatu Tour", desc: "Free morning. Afternoon visit to the clifftop Uluwatu temple with a dramatic sunset backdrop." },
      { day: 5, title: "Departure", desc: "Breakfast, checkout and airport transfer as per your flight." },
    ],
  },
  thailand: {
    slug: "thailand",
    name: "Thailand",
    country: "Thailand",
    region: "International",
    imageKey: "thailand",
    galleryKeys: ["thailand", "bali", "singapore"],
    fromPrice: "₹13,999",
    rating: 4.7,
    reviews: 526,
    tagline: "Island-hopping, street food, and city buzz.",
    bestTime: "Nov – Mar",
    idealFor: "Friends · Couples · Groups",
    visa: "Visa on arrival",
    overview: [
      "From the turquoise bays of Phi Phi to the neon energy of Bangkok, Thailand packs beaches, temples, markets and nightlife into one unforgettable trip.",
      "Our Thailand itineraries mix Phuket island days with Bangkok city nights, with speedboat tours, a floating market, and the Grand Palace all sorted for you.",
    ],
    highlights: [
      "Phi Phi & James Bond island tour",
      "Bangkok Grand Palace",
      "Phuket beaches & nightlife",
      "Floating & night markets",
      "Thai cooking experience",
      "Rooftop sky bars",
    ],
    packages: [
      { name: "Thailand Super Saver", days: 4, nights: 3, price: "₹13,999", original: "₹20,000", route: "Phuket", tag: "Friends" },
      { name: "Phuket + Krabi Escape", days: 6, nights: 5, price: "₹27,999", original: "₹38,000", route: "Phuket · Krabi", tag: "Couple" },
      { name: "Bangkok + Pattaya Combo", days: 5, nights: 4, price: "₹22,999", original: "₹31,000", route: "Bangkok · Pattaya", tag: "Group" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Phuket", desc: "Airport pickup and transfer to your resort. Evening free for Patong beach." },
      { day: 2, title: "Phi Phi Island Tour", desc: "Speedboat tour to Phi Phi, Maya Bay and Khai Island with snorkeling and lunch." },
      { day: 3, title: "Phuket City & Big Buddha", desc: "Old town, Big Buddha and Karon viewpoint, evening at leisure." },
      { day: 4, title: "Departure", desc: "Breakfast and airport transfer for your flight home." },
    ],
  },
  malaysia: {
    slug: "malaysia",
    name: "Malaysia",
    country: "Malaysia",
    region: "International",
    imageKey: "malaysia",
    galleryKeys: ["malaysia", "singapore", "thailand"],
    fromPrice: "₹13,999",
    rating: 4.6,
    reviews: 318,
    tagline: "Skyline towers, rainforests, and island calm.",
    bestTime: "Dec – Feb",
    idealFor: "Family · Couples",
    visa: "eVisa required",
    overview: [
      "Truly Asia — Malaysia blends the Petronas Towers and Kuala Lumpur's buzz with the rainforests and beaches of Langkawi.",
      "Our trips pair KL city highlights with a Langkawi island escape, cable cars, mangrove tours and duty-free shopping included.",
    ],
    highlights: [
      "Petronas Twin Towers",
      "Batu Caves",
      "Langkawi Sky Cable Car",
      "Mangrove kayaking",
      "Genting Highlands",
      "KL city tour",
    ],
    packages: [
      { name: "Malaysia Super Saver", days: 4, nights: 3, price: "₹13,999", original: "₹20,000", route: "Kuala Lumpur", tag: "Family" },
      { name: "KL + Langkawi", days: 6, nights: 5, price: "₹29,999", original: "₹40,000", route: "KL · Langkawi", tag: "Couple" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kuala Lumpur", desc: "Airport pickup, transfer to hotel, evening at Bukit Bintang." },
      { day: 2, title: "KL City Tour", desc: "Petronas Towers photo stop, Batu Caves, KL Tower and shopping." },
      { day: 3, title: "Genting Highlands", desc: "Cable car ride and a day at the hilltop theme park and casino resort." },
      { day: 4, title: "Departure", desc: "Breakfast and transfer to the airport." },
    ],
  },
  vietnam: {
    slug: "vietnam",
    name: "Vietnam",
    country: "Vietnam",
    region: "International",
    imageKey: "vietnam",
    galleryKeys: ["vietnam", "thailand", "malaysia"],
    fromPrice: "₹27,000",
    rating: 4.8,
    reviews: 274,
    tagline: "Limestone bays, lantern towns, and great food.",
    bestTime: "Feb – Apr",
    idealFor: "Couples · Friends",
    visa: "eVisa required",
    overview: [
      "Cruise the emerald karsts of Halong Bay, wander the lantern-lit streets of Hoi An, and dive into Hanoi's legendary street food.",
      "Central and South Vietnam tours cover the icons with an overnight bay cruise and a lantern-making session woven in.",
    ],
    highlights: [
      "Halong Bay overnight cruise",
      "Hoi An ancient town",
      "Hanoi street-food walk",
      "Cu Chi tunnels",
      "Ba Na Hills Golden Bridge",
      "Mekong Delta boat ride",
    ],
    packages: [
      { name: "South Vietnam Tour", days: 4, nights: 3, price: "₹27,000", original: "₹35,000", route: "Ho Chi Minh", tag: "Friends" },
      { name: "Central Vietnam Tour", days: 4, nights: 3, price: "₹33,000", original: "₹42,000", route: "Da Nang · Hoi An", tag: "Couple" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Da Nang", desc: "Airport pickup and transfer to hotel, evening by the beach." },
      { day: 2, title: "Ba Na Hills & Golden Bridge", desc: "Cable car to Ba Na Hills, the famous Golden Bridge and French Village." },
      { day: 3, title: "Hoi An Ancient Town", desc: "Lantern-lit old town, tailor shops and a riverside lantern-making session." },
      { day: 4, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
  },
  singapore: {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "International",
    imageKey: "singapore",
    galleryKeys: ["singapore", "malaysia", "thailand"],
    fromPrice: "₹21,999",
    rating: 4.9,
    reviews: 489,
    tagline: "A garden city of icons and theme parks.",
    bestTime: "Year-round",
    idealFor: "Family · Couples",
    visa: "eVisa required",
    overview: [
      "Clean, dazzling and packed with things to do — Gardens by the Bay, Marina Bay Sands, Sentosa and Universal Studios make Singapore a family favourite.",
      "Our trips combine the city's icons with Sentosa island fun and easy add-ons to Malaysia.",
    ],
    highlights: [
      "Gardens by the Bay",
      "Universal Studios Sentosa",
      "Marina Bay Sands SkyPark",
      "Singapore Flyer",
      "Night Safari",
      "Sentosa beaches",
    ],
    packages: [
      { name: "Singapore Super Saver", days: 4, nights: 3, price: "₹21,999", original: "₹30,000", route: "Singapore", tag: "Family" },
      { name: "Singapore + Malaysia", days: 6, nights: 5, price: "₹38,999", original: "₹52,000", route: "Singapore · KL", tag: "Family" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Singapore", desc: "Airport pickup, transfer to hotel, evening at Marina Bay light show." },
      { day: 2, title: "City Tour & Gardens by the Bay", desc: "Merlion Park, Chinatown, Little India and the Supertree Grove." },
      { day: 3, title: "Sentosa & Universal Studios", desc: "Full day at Sentosa with Universal Studios and the cable car." },
      { day: 4, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
  },
  dubai: {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "International",
    imageKey: "dubai",
    galleryKeys: ["dubai", "maldives", "singapore"],
    fromPrice: "₹21,999",
    rating: 4.8,
    reviews: 537,
    tagline: "Desert thrills meet sky-high luxury.",
    bestTime: "Nov – Mar",
    idealFor: "Family · Friends · Couples",
    visa: "eVisa required",
    overview: [
      "Dubai is the city of superlatives — the world's tallest tower, dancing fountains, gold souks, and a desert that turns golden at dusk.",
      "Our packages cover the Burj Khalifa, a dune-bashing desert safari with BBQ, a dhow cruise dinner, and an easy hop to Abu Dhabi.",
    ],
    highlights: [
      "Burj Khalifa at the top",
      "Desert safari & BBQ dinner",
      "Dhow cruise with dinner",
      "Dubai Mall & fountain show",
      "Palm Jumeirah & Atlantis",
      "Abu Dhabi day trip",
    ],
    packages: [
      { name: "Dubai Super Saver", days: 4, nights: 3, price: "₹21,999", original: "₹30,000", route: "Dubai", tag: "Friends" },
      { name: "Dubai + Abu Dhabi", days: 6, nights: 5, price: "₹39,999", original: "₹54,000", route: "Dubai · Abu Dhabi", tag: "Family" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Dubai", desc: "Airport pickup, transfer to hotel, evening Dubai Marina walk." },
      { day: 2, title: "City Tour & Burj Khalifa", desc: "Dubai city tour, Burj Khalifa observation deck and the Dubai Mall fountain show." },
      { day: 3, title: "Desert Safari", desc: "Dune bashing, camel ride, sandboarding and a BBQ dinner under the stars." },
      { day: 4, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
  },
  maldives: {
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "International",
    imageKey: "maldives",
    galleryKeys: ["maldives", "maldives2", "bali"],
    fromPrice: "₹33,999",
    rating: 4.9,
    reviews: 356,
    tagline: "Overwater villas and impossibly blue lagoons.",
    bestTime: "Nov – Apr",
    idealFor: "Honeymoon · Couples",
    visa: "Free visa on arrival",
    overview: [
      "The Maldives is the honeymoon gold standard — overwater villas, house reefs teeming with life, and sandbanks that feel like your own private island.",
      "Our packages handle the speedboat or seaplane transfers, half-board meals, and a private sandbank dinner for the big moments.",
    ],
    highlights: [
      "Overwater villa stay",
      "Snorkeling with manta rays",
      "Private sandbank dinner",
      "Sunset dolphin cruise",
      "Seaplane scenic transfer",
      "Spa over the lagoon",
    ],
    packages: [
      { name: "Maldives Super Saver", days: 4, nights: 3, price: "₹33,999", original: "₹45,999", route: "Maafushi", tag: "Couple" },
      { name: "Maldives Luxury Honeymoon", days: 5, nights: 4, price: "₹89,999", original: "₹1,20,000", route: "Private Island", tag: "Honeymoon" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Male", desc: "Welcome at Velana Airport and speedboat/seaplane transfer to your island." },
      { day: 2, title: "Island & Water Activities", desc: "Snorkeling at the house reef, free time on the beach, sunset cruise." },
      { day: 3, title: "Sandbank & Spa", desc: "Private sandbank trip and an over-the-lagoon spa session." },
      { day: 4, title: "Departure", desc: "Breakfast, checkout and transfer back to Male airport." },
    ],
  },
  egypt: {
    slug: "egypt",
    name: "Egypt",
    country: "Egypt",
    region: "International",
    imageKey: "dubai",
    galleryKeys: ["dubai", "maldives"],
    fromPrice: "₹62,999",
    rating: 4.7,
    reviews: 142,
    tagline: "Pyramids, pharaohs, and the timeless Nile.",
    bestTime: "Oct – Apr",
    idealFor: "History lovers · Couples",
    visa: "eVisa required",
    overview: [
      "Stand before the Great Pyramids, sail the Nile on a felucca, and walk among the temples of Luxor — Egypt is where civilisation began.",
      "Our tours combine Cairo's wonders with a Nile experience and the temples of Karnak at golden hour.",
    ],
    highlights: [
      "Pyramids of Giza & Sphinx",
      "Egyptian Museum, Cairo",
      "Felucca ride on the Nile",
      "Karnak & Luxor temples",
      "Khan el-Khalili bazaar",
      "Red Sea diving (optional)",
    ],
    packages: [
      { name: "Egypt Explorer", days: 6, nights: 5, price: "₹62,999", original: "₹78,000", route: "Cairo · Luxor", tag: "Couple" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cairo", desc: "Airport pickup and transfer to hotel, evening at leisure." },
      { day: 2, title: "Pyramids & Sphinx", desc: "Giza pyramids, the Sphinx and the Egyptian Museum." },
      { day: 3, title: "Fly to Luxor", desc: "Karnak and Luxor temples, sunset felucca on the Nile." },
      { day: 4, title: "Valley of the Kings", desc: "Royal tombs and Hatshepsut temple on the west bank." },
      { day: 5, title: "Back to Cairo", desc: "Khan el-Khalili bazaar and free time for souvenirs." },
      { day: 6, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
  },
  turkey: {
    slug: "turkey",
    name: "Turkey",
    country: "Turkey",
    region: "International",
    imageKey: "northeast",
    galleryKeys: ["northeast", "dubai", "himachal"],
    fromPrice: "₹63,999",
    rating: 4.8,
    reviews: 167,
    tagline: "Balloons over Cappadocia, bazaars in Istanbul.",
    bestTime: "Apr – Jun, Sep – Nov",
    idealFor: "Couples · Friends",
    visa: "eVisa required",
    overview: [
      "Float over Cappadocia's fairy chimneys at dawn, soak in Pamukkale's white terraces, and lose yourself in Istanbul's grand bazaars.",
      "Our Turkey tours pair Istanbul's icons with a Cappadocia cave-hotel stay and the balloon ride of a lifetime.",
    ],
    highlights: [
      "Cappadocia hot-air balloon",
      "Cave hotel stay",
      "Pamukkale travertines",
      "Hagia Sophia & Blue Mosque",
      "Grand Bazaar",
      "Bosphorus cruise",
    ],
    packages: [
      { name: "Turkey Highlights", days: 6, nights: 5, price: "₹63,999", original: "₹82,000", route: "Istanbul · Cappadocia", tag: "Couple" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Istanbul", desc: "Airport pickup, transfer to hotel, evening Bosphorus walk." },
      { day: 2, title: "Istanbul City Tour", desc: "Hagia Sophia, Blue Mosque, Topkapi Palace and the Grand Bazaar." },
      { day: 3, title: "Fly to Cappadocia", desc: "Underground city, Goreme valleys and a cave-hotel check-in." },
      { day: 4, title: "Balloon Ride & Valleys", desc: "Sunrise hot-air balloon, then the fairy chimneys and pottery towns." },
      { day: 5, title: "Pamukkale", desc: "The white travertine terraces and ancient Hierapolis." },
      { day: 6, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
  },
  "france-switzerland": {
    slug: "france-switzerland",
    name: "France + Switzerland",
    country: "France & Switzerland",
    region: "International",
    imageKey: "himachal",
    galleryKeys: ["himachal", "singapore", "northeast"],
    fromPrice: "₹99,999",
    rating: 4.9,
    reviews: 198,
    tagline: "Paris romance and Alpine snow peaks.",
    bestTime: "May – Sep",
    idealFor: "Honeymoon · Family",
    visa: "Schengen visa required",
    overview: [
      "The classic European honeymoon — the Eiffel Tower and Seine in Paris, then snow-capped Jungfrau and the lakes of Lucerne and Interlaken.",
      "Our tours weave high-speed trains, a Mont Blanc add-on and Swiss mountain railways into one seamless route.",
    ],
    highlights: [
      "Eiffel Tower & Seine cruise",
      "Disneyland Paris (optional)",
      "Mount Titlis / Jungfrau",
      "Lucerne lake & Lion Monument",
      "Interlaken adventure",
      "Mont Blanc add-on",
    ],
    packages: [
      { name: "France + Switzerland", days: 9, nights: 8, price: "₹99,999", original: "₹1,30,000", route: "Paris · Lucerne · Interlaken", tag: "Honeymoon" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Paris", desc: "Airport pickup and transfer to hotel, evening at leisure." },
      { day: 2, title: "Paris City Tour", desc: "Eiffel Tower, Louvre, and an evening Seine river cruise." },
      { day: 3, title: "Disneyland / Versailles", desc: "Optional Disneyland Paris or the Palace of Versailles." },
      { day: 4, title: "Train to Switzerland", desc: "Scenic train to Lucerne, lake walk and the Lion Monument." },
      { day: 5, title: "Mount Titlis", desc: "Rotair cable car to the Titlis summit and glacier cave." },
      { day: 6, title: "Interlaken", desc: "Lakeside town with paragliding and adventure sports options." },
      { day: 7, title: "Jungfraujoch", desc: "Train to the Top of Europe — Jungfraujoch." },
      { day: 8, title: "Leisure & Shopping", desc: "Free day for shopping and exploring at your pace." },
      { day: 9, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
  },
  greece: {
    slug: "greece",
    name: "Greece",
    country: "Greece",
    region: "International",
    imageKey: "maldives2",
    galleryKeys: ["maldives2", "maldives", "singapore"],
    fromPrice: "₹99,999",
    rating: 4.8,
    reviews: 154,
    tagline: "Whitewashed isles and ancient ruins.",
    bestTime: "Apr – Oct",
    idealFor: "Honeymoon · Couples",
    visa: "Schengen visa required",
    overview: [
      "Blue-domed Santorini sunsets, the buzz of Mykonos, and the ancient Acropolis in Athens — Greece is a Mediterranean dream.",
      "Our tours combine Athens history with island-hopping by ferry and the famous Oia sunset.",
    ],
    highlights: [
      "Santorini Oia sunset",
      "Acropolis of Athens",
      "Mykonos windmills",
      "Caldera catamaran cruise",
      "Ancient Delphi (optional)",
      "Greek island beaches",
    ],
    packages: [
      { name: "Greece Island Hopper", days: 7, nights: 6, price: "₹99,999", original: "₹1,28,000", route: "Athens · Santorini · Mykonos", tag: "Honeymoon" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Athens", desc: "Airport pickup and transfer to hotel, evening in Plaka." },
      { day: 2, title: "Athens City Tour", desc: "Acropolis, Parthenon and the Temple of Olympian Zeus." },
      { day: 3, title: "Ferry to Santorini", desc: "Caldera views and the famous Oia sunset." },
      { day: 4, title: "Santorini Cruise", desc: "Catamaran cruise to the volcano and hot springs." },
      { day: 5, title: "Ferry to Mykonos", desc: "Windmills, Little Venice and beach clubs." },
      { day: 6, title: "Mykonos Leisure", desc: "Free day for beaches and shopping." },
      { day: 7, title: "Departure", desc: "Transfer to airport for your flight home." },
    ],
  },
  norway: {
    slug: "norway",
    name: "Norway",
    country: "Norway",
    region: "International",
    imageKey: "himachal",
    galleryKeys: ["himachal", "northeast"],
    fromPrice: "₹1,49,999",
    rating: 4.9,
    reviews: 96,
    tagline: "Fjords, northern lights, and midnight cruises.",
    bestTime: "Jun – Aug, Nov – Mar (auroras)",
    idealFor: "Honeymoon · Luxury",
    visa: "Schengen visa required",
    overview: [
      "Cruise mirror-still fjords, chase the northern lights in Tromsø, and ride mountain railways through some of Europe's most dramatic scenery.",
      "Our Norway tours add private glass-igloo nights and a husky sled run for once-in-a-lifetime moments.",
    ],
    highlights: [
      "Northern lights in Tromsø",
      "Nærøyfjord cruise",
      "Flåm scenic railway",
      "Glass-igloo night",
      "Husky sledding",
      "Bergen old wharf",
    ],
    packages: [
      { name: "Norway Luxury Escape", days: 8, nights: 7, price: "₹1,49,999", original: "₹1,95,000", route: "Oslo · Bergen · Tromsø", tag: "Luxury" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Oslo", desc: "Airport pickup, transfer to hotel, evening at the harbour." },
      { day: 2, title: "Oslo City Tour", desc: "Vigeland Park, the Opera House and the Viking Ship Museum." },
      { day: 3, title: "Train to Bergen", desc: "The famous Bergen railway through mountains and valleys." },
      { day: 4, title: "Fjord Cruise", desc: "Nærøyfjord cruise and the Flåm railway." },
      { day: 5, title: "Fly to Tromsø", desc: "Gateway to the Arctic, evening northern-lights hunt." },
      { day: 6, title: "Husky & Igloo", desc: "Husky sledding by day, a glass-igloo aurora night." },
      { day: 7, title: "Leisure", desc: "Cable car and free time in Tromsø." },
      { day: 8, title: "Departure", desc: "Transfer to airport for your flight home." },
    ],
  },
  himachal: {
    slug: "himachal",
    name: "Himachal",
    country: "India",
    region: "India",
    imageKey: "himachal",
    galleryKeys: ["himachal", "northeast"],
    fromPrice: "₹7,999",
    rating: 4.7,
    reviews: 433,
    tagline: "Pine valleys, snow points, and mountain towns.",
    bestTime: "Mar – Jun, Dec – Feb",
    idealFor: "Friends · Couples · Family",
    overview: [
      "Himachal is the Himalayan all-rounder — Manali's snow points, Solang adventure sports, old Manali cafés, and the colonial charm of Shimla.",
      "Our Himachal trips run as easy group departures or private getaways, with Volvo or flight options ex-major cities.",
    ],
    highlights: [
      "Solang Valley adventure sports",
      "Atal Tunnel & Sissu",
      "Hadimba Temple, Manali",
      "Old Manali cafés",
      "Rohtang / snow point",
      "Mall Road, Shimla",
    ],
    packages: [
      { name: "Manali Super Saver", days: 5, nights: 4, price: "₹7,999", original: "₹14,000", route: "Manali", tag: "Friends" },
      { name: "Shimla + Manali", days: 6, nights: 5, price: "₹13,999", original: "₹21,000", route: "Shimla · Manali", tag: "Family" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Manali", desc: "Overnight Volvo arrival, hotel check-in and a relaxed day in old Manali." },
      { day: 2, title: "Solang Valley", desc: "Adventure sports, ropeway and snow play at Solang." },
      { day: 3, title: "Atal Tunnel & Sissu", desc: "Drive through the Atal Tunnel to Sissu and Lahaul valley." },
      { day: 4, title: "Local Sightseeing", desc: "Hadimba Temple, Vashisht springs and Mall Road." },
      { day: 5, title: "Departure", desc: "Breakfast and departure transfer." },
    ],
  },
  goa: {
    slug: "goa",
    name: "Goa",
    country: "India",
    region: "India",
    imageKey: "thailand",
    galleryKeys: ["thailand", "maldives2"],
    fromPrice: "₹7,999",
    rating: 4.6,
    reviews: 612,
    tagline: "Beaches, shacks, forts, and nightlife.",
    bestTime: "Nov – Feb",
    idealFor: "Friends · Couples",
    overview: [
      "Sun, sand and susegad — Goa is India's favourite beach break, from buzzing North Goa shacks to the quieter south and Portuguese-era forts.",
      "Our Goa packages cover North and South beaches, a cruise, and a fort sunset, with easy weekend departures.",
    ],
    highlights: [
      "North Goa beaches",
      "Fort Aguada sunset",
      "Mandovi river cruise",
      "Old Goa churches",
      "Water sports at Baga",
      "Nightlife & beach clubs",
    ],
    packages: [
      { name: "Goa Super Saver", days: 4, nights: 3, price: "₹7,999", original: "₹13,000", route: "North Goa", tag: "Friends" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Goa", desc: "Airport/station pickup, hotel check-in and Baga beach in the evening." },
      { day: 2, title: "North Goa Tour", desc: "Fort Aguada, Calangute, Baga and Anjuna with water sports." },
      { day: 3, title: "South Goa & Cruise", desc: "Old Goa churches, Miramar and a Mandovi river cruise." },
      { day: 4, title: "Departure", desc: "Breakfast and departure transfer." },
    ],
  },
  karnataka: {
    slug: "karnataka",
    name: "Karnataka",
    country: "India",
    region: "India",
    imageKey: "northeast",
    galleryKeys: ["northeast", "thailand"],
    fromPrice: "₹9,999",
    rating: 4.5,
    reviews: 187,
    tagline: "Coffee hills, ruins, and palace cities.",
    bestTime: "Oct – Mar",
    idealFor: "Family · Couples",
    overview: [
      "From the coffee-scented hills of Coorg and Chikmagalur to the royal palaces of Mysore and the boulder ruins of Hampi, Karnataka is wonderfully varied.",
      "Our trips cover the Western Ghats greenery, waterfalls and heritage at an easy pace.",
    ],
    highlights: [
      "Coorg coffee estates",
      "Abbey & Iruppu falls",
      "Mysore Palace",
      "Chikmagalur peaks",
      "Hampi ruins (optional)",
      "Western Ghats drives",
    ],
    packages: [
      { name: "Coorg & Chikmagalur", days: 3, nights: 2, price: "₹9,999", original: "₹14,999", route: "Coorg · Chikmagalur", tag: "Weekend" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Coorg", desc: "Drive to Coorg, coffee estate walk and Abbey Falls." },
      { day: 2, title: "Chikmagalur", desc: "Mullayanagiri peak, coffee museum and waterfalls." },
      { day: 3, title: "Departure", desc: "Breakfast and return drive." },
    ],
  },
  kerala: {
    slug: "kerala",
    name: "Kerala",
    country: "India",
    region: "India",
    imageKey: "malaysia",
    galleryKeys: ["malaysia", "thailand"],
    fromPrice: "₹11,999",
    rating: 4.8,
    reviews: 521,
    tagline: "Backwaters, houseboats, and green hills.",
    bestTime: "Sep – Mar",
    idealFor: "Honeymoon · Family",
    overview: [
      "God's Own Country — glide the Alleppey backwaters on a houseboat, sip tea in Munnar's emerald hills, and unwind on Kovalam's beaches.",
      "Our Kerala tours combine hills, backwaters and beaches with an overnight houseboat stay.",
    ],
    highlights: [
      "Alleppey houseboat stay",
      "Munnar tea gardens",
      "Thekkady wildlife",
      "Kathakali performance",
      "Kovalam beach",
      "Ayurvedic spa",
    ],
    packages: [
      { name: "Kerala Super Saver", days: 4, nights: 3, price: "₹11,999", original: "₹17,000", route: "Munnar · Alleppey", tag: "Family" },
      { name: "Kerala Honeymoon", days: 6, nights: 5, price: "₹22,999", original: "₹32,000", route: "Munnar · Thekkady · Alleppey", tag: "Honeymoon" },
    ],
    itinerary: [
      { day: 1, title: "Arrival & Munnar", desc: "Pickup at Cochin and scenic drive to Munnar." },
      { day: 2, title: "Munnar Sightseeing", desc: "Tea gardens, Mattupetty dam and Echo Point." },
      { day: 3, title: "Alleppey Houseboat", desc: "Drive to Alleppey and board an overnight houseboat." },
      { day: 4, title: "Departure", desc: "Disembark, breakfast and departure transfer." },
    ],
  },
  rajasthan: {
    slug: "rajasthan",
    name: "Rajasthan",
    country: "India",
    region: "India",
    imageKey: "dubai",
    galleryKeys: ["dubai", "himachal"],
    fromPrice: "₹19,999",
    rating: 4.7,
    reviews: 298,
    tagline: "Forts, palaces, and desert nights.",
    bestTime: "Oct – Mar",
    idealFor: "Couples · Family",
    overview: [
      "The land of kings — Udaipur's lake palaces, Jaipur's pink forts, and Jaisalmer's golden desert deliver royal romance at every turn.",
      "Our Rajasthan tours pair heritage stays with a desert camp and camel safari.",
    ],
    highlights: [
      "Udaipur City Palace",
      "Amber Fort, Jaipur",
      "Jaisalmer desert camp",
      "Camel safari & cultural night",
      "Lake Pichola boat ride",
      "Hawa Mahal",
    ],
    packages: [
      { name: "Royal Rajasthan", days: 5, nights: 4, price: "₹19,999", original: "₹28,000", route: "Jaipur · Udaipur", tag: "Couple" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Jaipur", desc: "Pickup, hotel check-in and an evening at Chokhi Dhani." },
      { day: 2, title: "Jaipur Sightseeing", desc: "Amber Fort, City Palace, Hawa Mahal and Jantar Mantar." },
      { day: 3, title: "Drive to Udaipur", desc: "Scenic drive, evening at Lake Pichola." },
      { day: 4, title: "Udaipur Tour", desc: "City Palace, Saheliyon ki Bari and a boat ride." },
      { day: 5, title: "Departure", desc: "Breakfast and departure transfer." },
    ],
  },
  andaman: {
    slug: "andaman",
    name: "Andaman",
    country: "India",
    region: "India",
    imageKey: "maldives2",
    galleryKeys: ["maldives2", "maldives"],
    fromPrice: "₹24,999",
    rating: 4.8,
    reviews: 241,
    tagline: "White-sand islands and coral seas.",
    bestTime: "Oct – May",
    idealFor: "Honeymoon · Family",
    overview: [
      "India's island paradise — Radhanagar's white sands, Neil Island's calm bays, and coral reefs perfect for snorkeling and sea walks.",
      "Our Andaman tours cover Havelock and Neil islands with ferries, water sports and a Cellular Jail light show.",
    ],
    highlights: [
      "Radhanagar Beach",
      "Scuba & sea walk",
      "Neil Island bays",
      "Cellular Jail light & sound",
      "Ross Island day trip",
      "Glass-bottom boat",
    ],
    packages: [
      { name: "Andaman Family Holiday", days: 6, nights: 5, price: "₹24,999", original: "₹34,000", route: "Port Blair · Havelock · Neil", tag: "Family" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Port Blair", desc: "Pickup, hotel check-in and the Cellular Jail light & sound show." },
      { day: 2, title: "Ferry to Havelock", desc: "Radhanagar Beach sunset and water activities." },
      { day: 3, title: "Neil Island", desc: "Bharatpur and Laxmanpur beaches, natural bridge." },
      { day: 4, title: "Back to Port Blair", desc: "Ross Island and North Bay snorkeling." },
      { day: 5, title: "City & Leisure", desc: "Corbyn's Cove and local markets." },
      { day: 6, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
  },
  kashmir: {
    slug: "kashmir",
    name: "Kashmir",
    country: "India",
    region: "India",
    imageKey: "himachal",
    galleryKeys: ["himachal", "northeast"],
    fromPrice: "₹24,999",
    rating: 4.9,
    reviews: 367,
    tagline: "Paradise of meadows, lakes, and shikaras.",
    bestTime: "Mar – Oct, Dec – Feb (snow)",
    idealFor: "Family · Honeymoon",
    overview: [
      "Heaven on earth — Dal Lake shikara rides, Gulmarg's gondola, Pahalgam's valleys, and the meadows of Sonmarg make Kashmir unforgettable.",
      "Our Kashmir tours include a houseboat night and the Gulmarg gondola, with warm stays through the seasons.",
    ],
    highlights: [
      "Dal Lake shikara & houseboat",
      "Gulmarg gondola",
      "Sonmarg meadows",
      "Pahalgam valleys",
      "Mughal Gardens",
      "Betaab Valley",
    ],
    packages: [
      { name: "Kashmir Family Escape", days: 6, nights: 5, price: "₹24,999", original: "₹34,000", route: "Srinagar · Gulmarg · Pahalgam", tag: "Family" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Pickup, Mughal Gardens and an evening shikara ride on Dal Lake." },
      { day: 2, title: "Gulmarg", desc: "Day trip to Gulmarg with the famous gondola ride." },
      { day: 3, title: "Pahalgam", desc: "Betaab Valley, Aru and Chandanwari." },
      { day: 4, title: "Sonmarg", desc: "Meadows and a pony ride to Thajiwas glacier." },
      { day: 5, title: "Houseboat Stay", desc: "Local markets and an overnight houseboat experience." },
      { day: 6, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
  },
  sikkim: {
    slug: "sikkim",
    name: "Sikkim",
    country: "India",
    region: "India",
    imageKey: "northeast",
    galleryKeys: ["northeast", "himachal"],
    fromPrice: "₹19,999",
    rating: 4.7,
    reviews: 174,
    tagline: "Himalayan lakes, monasteries, and momos.",
    bestTime: "Mar – Jun, Oct – Dec",
    idealFor: "Friends · Couples",
    overview: [
      "Sikkim is the gentle Himalaya — glacial Tsomgo Lake, the Nathula border pass, Pelling's Kanchenjunga views, and Gangtok's lively MG Marg.",
      "Our tours handle the permits for Nathula and Tsomgo and pair Gangtok with Pelling.",
    ],
    highlights: [
      "Tsomgo Lake",
      "Nathula Pass",
      "Gangtok MG Marg",
      "Pelling Kanchenjunga views",
      "Buddha Park, Ravangla",
      "Rumtek Monastery",
    ],
    packages: [
      { name: "Sikkim Friends Trip", days: 6, nights: 5, price: "₹19,999", original: "₹28,000", route: "Gangtok · Pelling", tag: "Friends" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Gangtok", desc: "Pickup from Bagdogra, drive to Gangtok and an evening at MG Marg." },
      { day: 2, title: "Tsomgo & Nathula", desc: "Glacial lake and the Nathula border pass (permit included)." },
      { day: 3, title: "Gangtok Local", desc: "Rumtek Monastery, Tashi Viewpoint and ropeway." },
      { day: 4, title: "Drive to Pelling", desc: "Scenic drive with Kanchenjunga views." },
      { day: 5, title: "Pelling Sightseeing", desc: "Skywalk, Pemayangtse Monastery and waterfalls." },
      { day: 6, title: "Departure", desc: "Breakfast and departure transfer." },
    ],
  },
  ladakh: {
    slug: "ladakh",
    name: "Ladakh",
    country: "India",
    region: "India",
    imageKey: "himachal",
    galleryKeys: ["himachal", "northeast"],
    fromPrice: "₹38,999",
    rating: 4.9,
    reviews: 209,
    tagline: "High passes, blue lakes, and moonscapes.",
    bestTime: "May – Sep",
    idealFor: "Friends · Adventure",
    overview: [
      "Ladakh is raw, high-altitude magic — the surreal blue of Pangong, the dunes of Nubra, Khardung La's heights, and Leh's whitewashed monasteries.",
      "Our Ladakh tours are paced for proper acclimatisation, with local guides who know every pass and corner.",
    ],
    highlights: [
      "Pangong Lake",
      "Nubra Valley & dunes",
      "Khardung La pass",
      "Leh palace & monasteries",
      "Magnetic Hill",
      "Shanti Stupa",
    ],
    packages: [
      { name: "Ladakh Adventure", days: 8, nights: 7, price: "₹38,999", original: "₹52,000", route: "Leh · Nubra · Pangong", tag: "Friends" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Leh", desc: "Pickup and full-day rest to acclimatise to the altitude." },
      { day: 2, title: "Leh Local", desc: "Shanti Stupa, Leh Palace and the local market." },
      { day: 3, title: "Sham Valley", desc: "Magnetic Hill, Gurudwara Pathar Sahib and Sangam." },
      { day: 4, title: "Nubra Valley", desc: "Drive over Khardung La to Nubra, dunes and camel ride." },
      { day: 5, title: "Pangong Lake", desc: "Drive to the unreal blue of Pangong, overnight by the lake." },
      { day: 6, title: "Back to Leh", desc: "Return via Chang La pass." },
      { day: 7, title: "Leisure", desc: "Cafés and souvenir shopping in Leh." },
      { day: 8, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
  },
};

// Pad each destination's galleryKeys with region-themed scenic neighbours so
// the trip detail page always has a richer photo pool (and the "+N more"
// lightbox badge can trigger). Only adds keys that aren't already present.
const REGION_SCENIC = {
  India: ["himachal", "northeast", "bali", "maldives2"],
  International: ["bali", "maldives2", "thailand", "dubai", "singapore", "vietnam"],
};
const TARGET_GALLERY_SIZE = 7; // includes imageKey; produces 6 galleryKeys
for (const slug of Object.keys(DESTINATIONS)) {
  const d = DESTINATIONS[slug];
  d.galleryKeys = d.galleryKeys ? [...d.galleryKeys] : [];
  const pool = REGION_SCENIC[d.region] || [];
  for (const k of pool) {
    if (d.galleryKeys.length + 1 >= TARGET_GALLERY_SIZE) break;
    if (k !== d.imageKey && !d.galleryKeys.includes(k)) {
      d.galleryKeys.push(k);
    }
  }
}

// Adventure-style themes per destination. Powers /adventure-styles and the
// "Adventure style" filter on the destinations listing.
const DEST_THEMES = {
  bali: ["Beaches", "Tropical", "Spiritual"],
  thailand: ["Beaches", "Backpacking", "Tropical"],
  malaysia: ["City Lights", "Tropical"],
  vietnam: ["Heritage", "Backpacking"],
  singapore: ["City Lights"],
  dubai: ["Desert", "City Lights"],
  maldives: ["Beaches", "Tropical"],
  egypt: ["Desert", "Heritage"],
  turkey: ["Heritage", "City Lights"],
  "france-switzerland": ["Mountains", "City Lights"],
  greece: ["Beaches", "Heritage"],
  norway: ["Mountains"],
  himachal: ["Mountains", "Backpacking", "Spiritual"],
  goa: ["Beaches", "Backpacking"],
  karnataka: ["Mountains", "Heritage"],
  kerala: ["Beaches", "Mountains", "Spiritual"],
  rajasthan: ["Heritage", "Desert"],
  andaman: ["Beaches", "Tropical"],
  kashmir: ["Mountains", "Spiritual"],
  sikkim: ["Mountains", "Spiritual"],
  ladakh: ["Mountains", "Backpacking", "Spiritual"],
};
for (const slug of Object.keys(DESTINATIONS)) {
  DESTINATIONS[slug].themes = DEST_THEMES[slug] || [];
}

export const ADVENTURE_THEMES = [
  "Mountains",
  "Beaches",
  "Heritage",
  "Desert",
  "Backpacking",
  "Spiritual",
  "City Lights",
  "Tropical",
];

export const DESTINATION_LIST = Object.values(DESTINATIONS);

export const DESTINATION_SLUGS = Object.keys(DESTINATIONS);

export function getDestination(slug) {
  return DESTINATIONS[slug] || null;
}

export default DESTINATIONS;
