import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Flower } from "@/components/Flower";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Un regalito para ti — ramo de frases" },
      {
        name: "description",
        content:
          "Un ramo de flores digital: presiona el corazón y descubre una frase escondida en cada flor.",
      },
      { property: "og:title", content: "Un regalito para ti — ramo de frases" },
      {
        property: "og:description",
        content: "Presiona el corazón y descubre una frase escondida en cada flor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Bloom = {
  phrase: string;
  color: string;
  size: number;
  petals: number;
  left: number;
  top: number;
};

const blooms: Bloom[] = [
  {
    phrase:
      "Quién diría que pasé de pensar que me caías mal a sentirme triste porque te vas ajajjaja.",
    color: "var(--petal-1)",
    size: 82,
    petals: 6,
    left: 30,
    top: 4,
  },
  {
    phrase:
      "Me alegro tanto de haber superado ese primer pensamiento tonto y darnos la oportunidad de conocernos.",
    color: "var(--petal-2)",
    size: 76,
    petals: 7,
    left: 45,
    top: 0,
  },
  {
    phrase:
      "Sobrevivimos juntas a ese corazón roto, y eso ya nos hace hermanas de batalla para toda la vida o por lo menos para un largo tiempo.",
    color: "var(--petal-3)",
    size: 84,
    petals: 6,
    left: 60,
    top: 4,
  },
  {
    phrase:
      "Compartir el despecho y las ilusionadas contigo hizo que todo doliera menos y fuera mil veces más divertido.",
    color: "var(--petal-4)",
    size: 74,
    petals: 8,
    left: 22,
    top: 15,
  },
  {
    phrase:
      "Te voy a extrañar demasiado los sábados jajajaja, de verdad no te imaginas cuánto; no importa que te vayas poquito, no será lo mismo.",
    color: "var(--petal-5)",
    size: 80,
    petals: 6,
    left: 38,
    top: 13,
  },
  {
    phrase:
      "Valencia te va a recibir con los brazos abiertos, pero no te olvides de que aquí dejas un lugar que te espera también.",
    color: "var(--petal-6)",
    size: 78,
    petals: 7,
    left: 54,
    top: 13,
  },
  {
    phrase:
      "Prométeme que la segunda ruta turística que hagas por Valencia será conmigo cuando vaya a verte.",
    color: "var(--petal-7)",
    size: 74,
    petals: 6,
    left: 70,
    top: 15,
  },
  {
    phrase:
      "Nunca olvides que tienes una amiga que te va a apoyar en la idea más loca, aunque sea la más loca.",
    color: "var(--petal-8)",
    size: 72,
    petals: 8,
    left: 34,
    top: 27,
  },
  {
    phrase:
      "Y siempre que quieras contar algo, llámame o llámanos con toda confianza. No sientas nunca que estás sola o que no tienes a quién contarle, porque aquí en Coro siempre tendrás muchísimas personas con las que puedas hablar.",
    color: "var(--petal-9)",
    size: 72,
    petals: 6,
    left: 58,
    top: 27,
  },
];

function HeartIcon({ size = 190 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="heartG" cx="35%" cy="30%">
          <stop offset="0%" stopColor="var(--petal-4)" />
          <stop offset="60%" stopColor="var(--petal-1)" />
          <stop offset="100%" stopColor="var(--petal-3)" />
        </radialGradient>
      </defs>
      <path
        d="M50 86C50 86 12 62 12 37.5C12 24 22 15 33 15C41 15 47 20 50 25C53 20 59 15 67 15C78 15 88 24 88 37.5C88 62 50 86 50 86Z"
        fill="url(#heartG)"
        stroke="var(--ink)"
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />
      <ellipse cx="36" cy="33" rx="8" ry="5" fill="white" opacity="0.45" transform="rotate(-25 36 33)" />
    </svg>
  );
}

function FallingPetals() {
  const petals = Array.from({ length: 22 }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {petals.map((i) => (
        <span
          key={i}
          className="animate-petal-fall absolute block"
          style={{
            left: `${(i * 4.6 + 2) % 100}%`,
            width: `${8 + (i % 4) * 4}px`,
            height: `${12 + (i % 3) * 5}px`,
            borderRadius: "60% 0 60% 0",
            background: `var(--petal-${(i % 9) + 1})`,
            opacity: 0.8,
            animationDuration: `${5 + (i % 5)}s`,
            animationDelay: `${(i % 7) * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!opened) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    void audio.play().catch(() => {});
  }, [opened]);

  return (
    <main className="bg-rosado font-body relative min-h-screen overflow-hidden">
      <audio ref={audioRef} src="/dorothea.mp3" loop preload="auto" />
      {opened && <FallingPetals />}

      {!opened ? (
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
          <h1 className="font-display text-ink mb-8 text-center text-4xl leading-tight sm:text-5xl">
            Un regalito para ti,
            <br />
            presiona el corazón
          </h1>
          <button
            onClick={() => setOpened(true)}
            aria-label="Presiona el corazón"
            className="animate-heart-beat cursor-pointer rounded-full transition-transform duration-300 hover:scale-105 focus:outline-none"
          >
            <HeartIcon />
          </button>
        </section>
      ) : (
        <section className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-5 py-10">
          <h2 className="font-display text-ink animate-soft-rise text-center text-3xl sm:text-4xl">
            Tu ramo, flor por flor
          </h2>
          <p className="text-ink-soft animate-soft-rise mt-2 text-center text-sm">
            Presiona cada flor para leer una frase
          </p>

          <div className="animate-sway relative mt-8 h-[380px] w-full origin-bottom">
            {/* tallos */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {blooms.map((b, i) => {
                const cy = b.top + ((b.size / 2) / 380) * 100;
                return (
                  <path
                    key={i}
                    d={`M${b.left} ${cy} C${b.left} ${cy + 20} ${50 + (b.left - 50) * 0.35} ${cy + 30} 50 86`}
                    stroke="var(--stem)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.8"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {blooms.map((b, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Flor ${i + 1}`}
                className="animate-bloom absolute -translate-x-1/2 cursor-pointer focus:outline-none"
                style={{
                  left: `${b.left}%`,
                  top: `${b.top}%`,
                  animationDelay: `${i * 0.13}s`,
                }}
              >
                <Flower color={b.color} size={b.size} petals={b.petals} active={active === i} />
              </button>
            ))}

            {/* envoltura */}
            <svg
              viewBox="0 0 300 120"
              className="absolute bottom-0 left-1/2 h-[28%] w-[62%] -translate-x-1/2"
              aria-hidden="true"
            >
              <path d="M40 10 Q150 -18 260 10 L196 112 H104 Z" fill="var(--petal-4)" opacity="0.92" />
              <path d="M40 10 Q150 -18 260 10 L150 42 Z" fill="var(--petal-2)" opacity="0.85" />
              <rect x="108" y="40" width="84" height="11" rx="5.5" fill="var(--petal-3)" opacity="0.95" />
            </svg>
          </div>

          <div className="mt-6 min-h-[120px] w-full max-w-xl">
            {active !== null ? (
              <div
                key={active}
                className="animate-soft-rise rounded-3xl bg-white/70 px-6 py-5 text-center backdrop-blur-sm"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <p className="font-display text-ink text-xl leading-snug sm:text-2xl">
                  {blooms[active]?.phrase}
                </p>
              </div>
            ) : null}
          </div>

          <footer className="mt-8 max-w-xl text-center">
            <p className="font-display text-ink text-2xl leading-snug sm:text-3xl">
              Gracias por tú también haber sido un hogar lejos del hogar
            </p>
            <p className="text-ink-soft mt-3 text-xs sm:text-sm">
              (aunque yo sé que estamos en mi ciudad natal, pero tú entendiste lo que quise decir
              jajajaja)
            </p>
          </footer>
        </section>
      )}
    </main>
  );
}
