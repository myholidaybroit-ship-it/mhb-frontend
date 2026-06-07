"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useWishlist } from "../components/WishlistContext";
import { account } from "../lib/api";
import styles from "./AccountPage.module.css";

const sv = (path, sw = 2) => (s = 18) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{path}</svg>
);

const I = {
  home: sv(<><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2Z" /></>),
  heart: sv(<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />),
  user: sv(<><circle cx="12" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /></>),
  cog: sv(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>),
  bookings: sv(<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>),
  logout: sv(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></>),
  arrow: sv(<><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>, 2.4),
  pin: sv(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>),
  edit: sv(<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" /></>),
  check: sv(<><path d="M20 6 9 17l-5-5" /></>, 2.4),
};

const TABS = [
  { id: "overview", label: "Overview", icon: "home" },
  { id: "wishlist", label: "Wishlist", icon: "heart" },
  { id: "bookings", label: "Bookings", icon: "bookings" },
  { id: "profile", label: "Profile", icon: "user" },
  { id: "settings", label: "Settings", icon: "cog" },
];

function fmtDate(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, hydrated, logout, initial } = useAuth();
  const { items, count, hydrated: wlHydrated, remove } = useWishlist();
  const [tab, setTab] = useState("overview");

  // Profile edit state — seeded from session
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "", phone: "", city: "" });
  const [profileSaved, setProfileSaved] = useState(false);

  // Notification preferences
  const [prefs, setPrefs] = useState({ emails: true, sms: true, whatsapp: true, newsletter: true });
  const [prefsSaved, setPrefsSaved] = useState(false);

  // Bookings (from the API)
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (hydrated && !isLoggedIn) router.replace("/login?next=/account");
  }, [hydrated, isLoggedIn, router]);

  // Seed profile + prefs from the authenticated user, and load bookings.
  useEffect(() => {
    if (!user) return;
    setProfile({ name: user.name || "", phone: user.phone || "", city: user.city || "" });
    if (user.prefs) setPrefs((p) => ({ ...p, ...user.prefs }));
    account.bookings().then((r) => setBookings(r.data || [])).catch(() => {});
  }, [user]);

  async function saveProfile(e) {
    e.preventDefault();
    if (!user) return;
    try {
      await account.updateProfile({ name: profile.name, phone: profile.phone, city: profile.city });
    } catch (err) {
      console.error("Profile save failed:", err.message);
    }
    setEditing(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2200);
  }

  async function savePrefs() {
    if (!user) return;
    try {
      await account.updateProfile({ prefs });
    } catch (err) {
      console.error("Prefs save failed:", err.message);
    }
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 2200);
  }

  if (!hydrated || !isLoggedIn) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.loading}>Loading your account…</p>
        </div>
      </main>
    );
  }

  const recentWishlist = items.slice(0, 4);
  const kinds = items.reduce((acc, it) => ((acc[it.kind] = (acc[it.kind] || 0) + 1), acc), {});

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Greeting strip */}
        <header className={styles.greet}>
          <div className={styles.avatarLg} aria-hidden>{initial}</div>
          <div className={styles.greetText}>
            <span className={styles.kicker}>Your account</span>
            <h1 className={styles.heading}>
              Hey {(profile.name || user.name).split(" ")[0]}.
            </h1>
            <p className={styles.sub}>
              Signed in as <strong>{user.email}</strong>{user.createdAt && (
                <> · member since {fmtDate(user.createdAt)}</>
              )}
            </p>
          </div>
          <button type="button" className={styles.logoutBtn} onClick={logout}>
            <span className={styles.logoutIcon}>{I.logout(14)}</span>
            Log out
          </button>
        </header>

        <div className={styles.dashGrid}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.nav} aria-label="Account sections">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.navBtn} ${tab === t.id ? styles.navBtnOn : ""}`}
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? "page" : undefined}
                >
                  <span className={styles.navIcon}>{I[t.icon](18)}</span>
                  <span>{t.label}</span>
                  {t.id === "wishlist" && wlHydrated && count > 0 && (
                    <span className={styles.navBadge}>{count}</span>
                  )}
                </button>
              ))}
            </nav>

            <div className={styles.sidePromo}>
              <strong>Need a quick plan?</strong>
              <p>Ping a trip captain — reply in under 30 min.</p>
              <Link href="/contact" className={styles.sidePromoBtn}>Contact us</Link>
            </div>
          </aside>

          {/* Main panel */}
          <section className={styles.panel}>
            {tab === "overview" && (
              <>
                {/* Stats */}
                <div className={styles.statsRow}>
                  <div className={styles.statCard}>
                    <span className={styles.statLabel}>Saved trips</span>
                    <strong>{wlHydrated ? count : "…"}</strong>
                    <span className={styles.statSub}>across destinations, weekends & packages</span>
                  </div>
                  <div className={styles.statCard}>
                    <span className={styles.statLabel}>Bookings</span>
                    <strong>{bookings.length}</strong>
                    <span className={styles.statSub}>{bookings.length ? "trips with us" : "No trips booked yet"}</span>
                  </div>
                  <div className={styles.statCard}>
                    <span className={styles.statLabel}>Loyalty tier</span>
                    <strong>Explorer</strong>
                    <span className={styles.statSub}>Book your first trip to level up</span>
                  </div>
                </div>

                {/* Wishlist preview */}
                <div className={styles.card}>
                  <div className={styles.cardHead}>
                    <div>
                      <span className={styles.kicker}>Recently saved</span>
                      <h2 className={styles.h2}>Your wishlist preview</h2>
                    </div>
                    <Link href="/wishlist" className={styles.headLink}>
                      Open wishlist {I.arrow(13)}
                    </Link>
                  </div>
                  {recentWishlist.length === 0 ? (
                    <div className={styles.empty}>
                      <strong>Nothing saved yet.</strong>
                      <p>Tap the heart on any trip across the site — it lives here.</p>
                      <Link href="/destinations" className={styles.emptyBtn}>Browse destinations</Link>
                    </div>
                  ) : (
                    <div className={styles.miniGrid}>
                      {recentWishlist.map((it) => (
                        <Link key={it.id} href={it.href || "/wishlist"} className={styles.miniCard}>
                          <div className={styles.miniImg}>
                            {it.image && (
                              <Image src={it.image} alt={it.name} fill sizes="220px" className={styles.miniImgEl} />
                            )}
                          </div>
                          <div className={styles.miniBody}>
                            <span className={styles.miniKind}>{it.kind}</span>
                            <strong>{it.name}</strong>
                            {it.price && <span className={styles.miniPrice}>{it.price}</span>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className={styles.card}>
                  <div className={styles.cardHead}>
                    <div>
                      <span className={styles.kicker}>Quick actions</span>
                      <h2 className={styles.h2}>Pick up where you left off</h2>
                    </div>
                  </div>
                  <div className={styles.quickGrid}>
                    <Link href="/destinations" className={styles.quickTile}>
                      <strong>Browse destinations</strong>
                      <span>50+ trips across India and the world</span>
                    </Link>
                    <Link href="/weekends" className={styles.quickTile}>
                      <strong>Weekend trips</strong>
                      <span>3-day getaways from your city</span>
                    </Link>
                    <Link href="/contact" className={styles.quickTile}>
                      <strong>Custom plan</strong>
                      <span>Tell us where — we build a plan in 24h</span>
                    </Link>
                    <Link href="/moments" className={styles.quickTile}>
                      <strong>Read traveller stories</strong>
                      <span>Real videos & photos from last month</span>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {tab === "wishlist" && (
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div>
                    <span className={styles.kicker}>Your wishlist</span>
                    <h2 className={styles.h2}>{count} saved {count === 1 ? "trip" : "trips"}</h2>
                  </div>
                  <Link href="/wishlist" className={styles.headLink}>Full view {I.arrow(13)}</Link>
                </div>

                {recentWishlist.length === 0 ? (
                  <div className={styles.empty}>
                    <strong>Nothing saved yet.</strong>
                    <p>Tap the heart on any trip across the site — it lives here.</p>
                    <Link href="/destinations" className={styles.emptyBtn}>Browse destinations</Link>
                  </div>
                ) : (
                  <ul className={styles.wlList}>
                    {items.map((it) => (
                      <li key={it.id} className={styles.wlRow}>
                        <Link href={it.href || "#"} className={styles.wlThumb}>
                          {it.image && (
                            <Image src={it.image} alt={it.name} fill sizes="80px" className={styles.miniImgEl} />
                          )}
                        </Link>
                        <div className={styles.wlMeta}>
                          <span className={styles.miniKind}>{it.kind}</span>
                          <strong>{it.name}</strong>
                          {it.price && <span className={styles.miniPrice}>{it.price}</span>}
                          <span className={styles.wlAdded}>Saved {fmtDate(it.addedAt)}</span>
                        </div>
                        <div className={styles.wlActions}>
                          <Link href={it.href || "#"} className={styles.wlOpen}>Open</Link>
                          <button type="button" className={styles.wlRemove} onClick={() => remove(it.id)}>
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab === "bookings" && (
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div>
                    <span className={styles.kicker}>Bookings</span>
                    <h2 className={styles.h2}>Your trips will live here.</h2>
                  </div>
                </div>
                {bookings.length === 0 ? (
                  <div className={styles.empty}>
                    <strong>No bookings yet.</strong>
                    <p>
                      Once you confirm a trip, you'll see itineraries, hotel vouchers, flight info
                      and payment receipts all in one place.
                    </p>
                    <Link href="/contact" className={styles.emptyBtn}>Start planning a trip</Link>
                  </div>
                ) : (
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
                    {bookings.map((b) => (
                      <li
                        key={b._id}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "14px 16px", border: "1px solid #eee", borderRadius: 12 }}
                      >
                        <div>
                          <strong>{b.title}</strong>
                          {b.destination ? <span style={{ color: "#888" }}> · {b.destination}</span> : null}
                          <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                            Ref {b.reference} · {b.adults || 1} adults{b.children ? `, ${b.children} children` : ""}
                            {b.total ? ` · ${b.total}` : ""}
                          </div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "#f4f1ea", whiteSpace: "nowrap" }}>{b.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab === "profile" && (
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div>
                    <span className={styles.kicker}>Profile</span>
                    <h2 className={styles.h2}>Personal info</h2>
                  </div>
                  {!editing && (
                    <button type="button" className={styles.headLink} onClick={() => setEditing(true)}>
                      {I.edit(14)} Edit
                    </button>
                  )}
                </div>

                {profileSaved && (
                  <div className={styles.toast}>{I.check(14)} Profile saved.</div>
                )}

                {editing ? (
                  <form className={styles.form} onSubmit={saveProfile}>
                    <label className={styles.field}>
                      <span>Full name</span>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        required
                      />
                    </label>
                    <label className={styles.field}>
                      <span>Phone</span>
                      <input
                        type="tel"
                        placeholder="+91 98xxx xxxxx"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </label>
                    <label className={styles.field}>
                      <span>City</span>
                      <input
                        type="text"
                        placeholder="Hyderabad"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      />
                    </label>
                    <div className={styles.field}>
                      <span>Email</span>
                      <div className={styles.readonly}>{user.email}</div>
                    </div>
                    <div className={styles.formActions}>
                      <button type="submit" className={styles.btnPrimary}>Save changes</button>
                      <button type="button" className={styles.btnGhost} onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <dl className={styles.dl}>
                    <div><dt>Name</dt><dd>{profile.name || "—"}</dd></div>
                    <div><dt>Email</dt><dd>{user.email}</dd></div>
                    <div><dt>Phone</dt><dd>{profile.phone || "—"}</dd></div>
                    <div><dt>City</dt><dd>{profile.city ? <><span className={styles.pinIco}>{I.pin(12)}</span> {profile.city}</> : "—"}</dd></div>
                    <div><dt>Member since</dt><dd>{fmtDate(parseInt(user.id.replace("u_", ""), 36))}</dd></div>
                  </dl>
                )}
              </div>
            )}

            {tab === "settings" && (
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div>
                    <span className={styles.kicker}>Settings</span>
                    <h2 className={styles.h2}>Notification preferences</h2>
                  </div>
                </div>

                {prefsSaved && <div className={styles.toast}>{I.check(14)} Preferences saved.</div>}

                <ul className={styles.toggleList}>
                  {[
                    { key: "emails", title: "Booking emails", sub: "Itineraries, payment receipts, ticket confirmations." },
                    { key: "sms", title: "SMS alerts", sub: "Day-of-departure reminders and on-trip updates." },
                    { key: "whatsapp", title: "WhatsApp from trip captain", sub: "Reach a real human during your trip." },
                    { key: "newsletter", title: "MHB Insider newsletter", sub: "One curated email a month, first Sunday." },
                  ].map((opt) => (
                    <li key={opt.key} className={styles.toggleRow}>
                      <div>
                        <strong>{opt.title}</strong>
                        <span>{opt.sub}</span>
                      </div>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={prefs[opt.key]}
                          onChange={(e) => setPrefs({ ...prefs, [opt.key]: e.target.checked })}
                        />
                        <span className={styles.switchTrack} />
                      </label>
                    </li>
                  ))}
                </ul>

                <div className={styles.formActions}>
                  <button type="button" className={styles.btnPrimary} onClick={savePrefs}>Save preferences</button>
                </div>

                <div className={styles.dangerZone}>
                  <strong>Sign out</strong>
                  <p>You can sign back in any time. Wishlist stays saved on this device.</p>
                  <button type="button" className={styles.btnGhost} onClick={logout}>Log out</button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
