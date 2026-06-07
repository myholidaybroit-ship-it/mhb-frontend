// Pure presentation helpers (no content data).
//
// `img(key, w, h)` builds a sized Wix CDN URL from a short slug key. Used for
// decorative imagery and as a last-resort placeholder when a CMS record has no
// image set. This is NOT content — all real content comes from the backend.

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

// The canonical adventure-style theme names (also seeded server-side). Used as a
// UI fallback for the adventure-styles filter when the CMS list is empty.
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
