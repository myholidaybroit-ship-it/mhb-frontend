import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { getContent } from "../lib/server";

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2.1-.3 0-.5-.1-.1-.6-1.5-.9-2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.9 1.1 2.9.8 3.4.7.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.7 1.6 5.8 1.6 6.6 0 12-5.4 12-12S18.6 0 12 0zm0 22c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.9 1 1-3.8-.2-.4C2.2 15.6 2 13.8 2 12 2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2c-.3-1-1-1.8-2-2C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.5.5c-1 .3-1.8 1-2 2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1 1 1.8 2 2 2 .5 9.5.5 9.5.5s7.5 0 9.5-.5c1-.3 1.8-1 2-2 .5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const LOGO_WHITE =
  "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779211833/MHB_Logo_white_b2exxe.avif";

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
  WhatsApp: WhatsAppIcon,
};

export default async function Footer() {
  // Footer content served live from the CMS `footer` singleton.
  const f = (await getContent("footer")) || {};
  const cols = f.columns || [];
  const offices = f.offices || [];
  const contact = f.contact || {};
  const social = f.social || [];
  const copyright = f.copyright;
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          {cols.map((col) => (
            <div className={styles.col} key={col.title}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.colList}>
                {col.links.map((l) => {
                  const isInternal = l.href.startsWith("/") && !l.href.startsWith("/#");
                  return (
                    <li key={l.label}>
                      {isInternal ? (
                        <Link href={l.href} className={styles.link}>
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className={styles.link}>
                          {l.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Reach Us</h3>
            <ul className={styles.colList}>
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className={styles.contactLine}
                  >
                    <PhoneIcon />
                    <span>{contact.phone}</span>
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className={styles.contactLine}
                  >
                    <MailIcon />
                    <span>{contact.email}</span>
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li>
                  <a
                    href={contact.whatsapp}
                    className={styles.contactLine}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                    <span>Chat on WhatsApp</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.offices}>
          {offices.map((o) => (
            <div className={styles.office} key={o.city}>
              <span className={styles.officeCity}>{o.city}</span>
              <span className={styles.officeAddress}>{o.address}</span>
            </div>
          ))}
        </div>

        <div className={styles.divider} aria-hidden />

        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <Image
              src={LOGO_WHITE}
              alt="MyHolidayBro"
              width={120}
              height={72}
              className={styles.logo}
            />
            <div className={styles.copyrightWrap}>
              <span className={styles.copyright}>{copyright}</span>
              <div className={styles.legalLinks}>
                <Link href="/terms">Terms</Link>
                <span aria-hidden>·</span>
                <a href="/terms#privacy">Privacy</a>
                <span aria-hidden>·</span>
                <a href="/terms#privacy">Cookies</a>
              </div>
            </div>
          </div>

          <div className={styles.bottomRight}>
            <div className={styles.selectors}>
              <button type="button" className={styles.selector}>
                ₹ INR
                <ChevronDown />
              </button>
              <button type="button" className={styles.selector}>
                India
                <ChevronDown />
              </button>
            </div>
            <div className={styles.social}>
              {social.map((s) => {
                const Icon = SOCIAL_ICONS[s.network];
                return (
                  <a
                    key={s.network}
                    href={s.url}
                    aria-label={s.network}
                    className={styles.socialIcon}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon ? <Icon /> : null}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
