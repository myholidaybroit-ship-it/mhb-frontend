"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Partners.module.css";

const W = (slug, file) =>
  `https://static.wixstatic.com/media/${slug}/v1/fill/w_900,h_600,al_c,q_85,enc_avif,quality_auto/${file}`;

const IMG = {
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
  dubai: W(
    "e7beb6_45e14c300a1f4d98a7b96422aaac6f10~mv2.jpg",
    "e7beb6_45e14c300a1f4d98a7b96422aaac6f10~mv2.jpg"
  ),
  maldives: W(
    "nsplsh_4d314f6278767357566859~mv2.jpg",
    "nsplsh_4d314f6278767357566859~mv2.jpg"
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

const C = (path) => `https://res.cloudinary.com/dyxxkrq8r/image/upload/${path}`;

const SLIDES = [
  [
    {
      id: 1,
      name: "Dubai Tourism",
      logo: C("v1779221910/DUBAI_TOURISM_a0dw39.avif"),
      image: IMG.dubai,
    },
    {
      id: 2,
      name: "Amazing Thailand",
      logo: C("v1779221910/AMAZING_THAILAND_hiqc2e.avif"),
      image: IMG.thailand,
    },
    {
      id: 3,
      name: "Singapore Tourism",
      logo: C("v1779221910/SINGAPORE_PASSION_MADE_POSSIBLE_dlud8q.avif"),
      image: IMG.singapore,
    },
    {
      id: 4,
      name: "Egypt Tourism",
      logo: C("v1779221910/EGYPT_WHERE_IT_ALL_BEGINS_ddfeqc.avif"),
      image: IMG.dubai,
    },
  ],
  [
    {
      id: 5,
      name: "Incredible India",
      logo: C("v1779221910/MINISTRY_OF_TOURISM_zpuwyr.avif"),
      image: IMG.himachal,
    },
    {
      id: 6,
      name: "Maldives Tourism",
      logo: C("v1779221910/MALDIVES_THE_SUNNY_SIDE_OF_LIFE_qukm1m.avif"),
      image: IMG.maldives,
    },
    {
      id: 7,
      name: "Tourism Malaysia",
      logo: C("v1779221910/TOURISM_MALAYSIA_cifj1q.avif"),
      image: IMG.malaysia,
    },
    {
      id: 8,
      name: "Turkey Tourism",
      logo: C("v1779221910/TURKEY_TOURISM_kyc9ki.avif"),
      image: IMG.northeast,
    },
  ],
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

export default function Partners() {
  const [slide, setSlide] = useState(0);

  function prev() {
    setSlide((s) => Math.max(0, s - 1));
  }

  function next() {
    setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
  }

  return (
    <section className={styles.section} id="partners">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.heading}>
            Tourism Board{" "}
            <span className={styles.headingAccent}>Partners</span>
          </h2>
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
        </div>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translate3d(-${slide * 100}%, 0, 0)` }}
          >
            {SLIDES.map((cards, slideIdx) => (
              <div
                key={slideIdx}
                className={styles.slide}
                aria-hidden={slide !== slideIdx}
              >
                {cards.map((c) => (
                  <div key={c.id} className={styles.card} title={c.name}>
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 25vw"
                      className={styles.bgImage}
                    />
                    <div className={styles.overlay} aria-hidden />
                    <div className={styles.logoWrap}>
                      <Image
                        src={c.logo}
                        alt={c.name}
                        fill
                        sizes="(max-width: 900px) 30vw, 16vw"
                        className={styles.logo}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.dots} role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={slide === i}
              aria-label={`Slide ${i + 1}`}
              className={`${styles.dot} ${slide === i ? styles.dotActive : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
