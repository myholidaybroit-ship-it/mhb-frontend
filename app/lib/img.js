// Image source resolution for the public site.
//
// `img(value, w, h)` resolves an image to a usable URL:
//   1. A real URL (admin-uploaded to S3/CDN, or any http/data URI) is used as-is.
//   2. A legacy short slug key (e.g. "bali") maps to the seeded Wix CDN image —
//      kept ONLY so destinations migrated before real uploads existed still show
//      something. New content should always carry a real image URL.
//   3. Anything missing/unknown falls back to a neutral in-brand placeholder —
//      never a stock photo of a different destination.

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

// Flat cream square in the brand surface colour. Shown only when a record has no
// image at all, so empty content degrades quietly instead of borrowing a photo.
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='40'%20height='40'%3E%3Crect%20width='40'%20height='40'%20fill='%23faf7ee'/%3E%3C/svg%3E";

export const img = (value, w = 1200, h = 800) => {
  if (typeof value === "string" && value) {
    // Already a real, usable source — admin uploads land here.
    if (/^https?:\/\//.test(value) || value.startsWith("data:")) return value;
    // Legacy seeded key → sized Wix CDN URL.
    const slug = SLUG[value];
    if (slug) {
      return `https://static.wixstatic.com/media/${slug}/v1/fill/w_${w},h_${h},al_c,q_85,enc_avif,quality_auto/${slug}`;
    }
  }
  return PLACEHOLDER;
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
