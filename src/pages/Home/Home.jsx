import React, { useEffect, useState } from "react";
import Slider from "./Slider/Slider";
import logo from "https://ibb.co/SXTB9kpP";

const federations = [
  {
    name: "FIFe / FPL",
    description:
      "Federacja Felinologiczna (FIFe) i Polska Federacja Felinologiczna (FPL) zrzeszają legalne stowarzyszenia hodowców kotów rasowych w Polsce.",
    link: "https://www.felispolonia.eu/"
  },
  {
    name: "WCF",
    description:
      "World Cat Federation – międzynarodowa organizacja felinologiczna, do której należą liczne kluby hodowców w Polsce.",
    link: "https://www.wcf-online.de/"
  },
  {
    name: "TICA",
    description:
      "The International Cat Association – jedna z największych organizacji kotów rasowych na świecie, z klubami także w Polsce.",
    link: "https://tica.org/"
  }
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const Home = () => {
  const [featuredCats, setFeaturedCats] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  const [filterBreed, setFilterBreed] = useState("");
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoadingFeatured(true);
        setErrorFeatured(null);

        let query = "status=PUBLISHED&isFeatured=true";
        if (filterBreed) query += `&breed=${encodeURIComponent(filterBreed)}`;
        if (filterCity) query += `&city=${encodeURIComponent(filterCity)}`;

        let res = await fetch(`${API_URL}/api/cats?${query}`);
        let data = await res.json();

        if ((!Array.isArray(data) || data.length === 0) && !filterBreed && !filterCity) {
          res = await fetch(`${API_URL}/api/cats?status=PUBLISHED`);
          data = await res.json();
        }

        setFeaturedCats(data.slice(0, 6));
      } catch (err) {
        console.error("Error loading featured cats:", err);
        setErrorFeatured("Nie udało się pobrać promowanych ogłoszeń.");
      } finally {
        setLoadingFeatured(false);
      }
    };

    loadFeatured();
  }, [filterBreed, filterCity]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      {/* Tło – slider */}
      <div className="relative h-72 md:h-96 lg:h-[420px] overflow-hidden">
        <Slider />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center px-4 text-center">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={logo}
              alt="CAT PURRE"
              className="h-12 w-12 rounded-2xl shadow-lg shadow-cyan-500/40 object-cover"
            />
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-cyan-100">
                CAT <span className="text-sky-400">PURRE</span>
              </h1>
              <p className="text-xs md:text-sm text-slate-300">
                Marketplace legalnych hodowli kotów rasowych
              </p>
            </div>
          </div>
          <p className="max-w-xl text-xs md:text-sm text-slate-300">
            Znajdź wymarzonego kota z certyfikowanej hodowli – z umową, rodowodem
            i pełną przejrzystością.
          </p>
        </div>
      </div>

      {/* Główna zawartość pod sliderem */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-10 space-y-8 -mt-4">
        {/* Mini CTA dla hodowców */}
        <section className="rounded-2xl bg-sky-900/40 border border-sky-600/60 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm md:text-base font-semibold text-cyan-100">
              Masz zarejestrowaną hodowlę kotów?
            </h2>
            <p className="text-xs text-slate-300">
              Dołącz do CAT PURRE jako zweryfikowany hodowca i docieraj do
              klientów szukających legalnych ogłoszeń.
            </p>
          </div>
          <button className="rounded-2xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 transition text-xs font-semibold px-4 py-2 text-slate-950 shadow-lg shadow-sky-700/50">
            Dołącz jako hodowca
          </button>
        </section>

        {/* Promowane ogłoszenia + mini filtry */}
        <section className="rounded-3xl bg-slate-900/90 border border-sky-700/40 p-5 shadow-xl shadow-sky-900/40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <div>
              <h2 className="text-lg font-semibold text-cyan-100">
                Promowane ogłoszenia
              </h2>
              <p className="text-xs text-slate-400">
                Wyróżnione koty z najlepszych, zweryfikowanych hodowli.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap text-xs">
              <input
                type="text"
                value={filterBreed}
                onChange={(e) => setFilterBreed(e.target.value)}
                placeholder="Rasa (np. Maine Coon)"
                className="rounded-2xl bg-slate-950/60 border border-sky-700/40 px-3 py-1 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
              <input
                type="text"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                placeholder="Miasto (np. Poznań)"
                className="rounded-2xl bg-slate-950/60 border border-sky-700/40 px-3 py-1 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
              <button
                onClick={() => {
                  setFilterBreed("");
                  setFilterCity("");
                }}
                className="rounded-2xl border border-sky-600/60 px-3 py-1 text-[11px] text-sky-300 hover:bg-slate-800/80"
              >
                Wyczyść
              </button>
            </div>
          </div>

          {loadingFeatured && (
            <p className="text-sm text-slate-400">
              Ładowanie promowanych ogłoszeń...
            </p>
          )}

          {errorFeatured && (
            <p className="text-sm text-red-400">{errorFeatured}</p>
          )}

          {!loadingFeatured && !errorFeatured && featuredCats.length === 0 && (
            <p className="text-sm text-slate-400">
              Brak promowanych ogłoszeń dla wybranych filtrów. Spróbuj zmienić
              rasę lub miasto.
            </p>
          )}

          {!loadingFeatured && featuredCats.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCats.map((cat) => (
                <article
                  key={cat._id}
                  className="group rounded-2xl border border-sky-700/40 bg-slate-950/80 hover:border-cyan-400 hover:bg-slate-900/90 transition shadow-md shadow-slate-950/60 overflow-hidden"
                >
                  {cat.photos?.[0] && (
                    <div className="relative h-36 w-full overflow-hidden">
                      <img
                        src={cat.photos[0]}
                        alt={cat.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 rounded-full bg-sky-500/90 px-2 py-0.5 text-[10px] font-semibold text-slate-950 shadow">
                        PROMOWANE
                      </div>
                    </div>
                  )}
                  <div className="p-3 space-y-1">
                    <h3 className="text-sm font-semibold text-cyan-100 line-clamp-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {cat.breed} • {cat.city}, {cat.country}
                    </p>
                    <p className="text-sm font-semibold text-sky-300">
                      {cat.price} {cat.currency}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Legalne organizacje */}
        <section className="rounded-3xl bg-slate-900/90 border border-sky-700/40 p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-cyan-100">
                Legalne organizacje hodowców kotów
              </h2>
              <p className="text-xs text-slate-400">
                CAT PURRE współpracuje wyłącznie z hodowlami zarejestrowanymi
                w uznanych organizacjach felinologicznych.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {federations.map((fed) => (
              <a
                key={fed.name}
                href={fed.link}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-sky-700/40 bg-slate-950/70 p-4 hover:border-cyan-400 hover:bg-slate-900/90 transition shadow-md shadow-slate-950/60"
              >
                <h3 className="text-sm font-semibold text-cyan-100 group-hover:text-cyan-300">
                  {fed.name}
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  {fed.description}
                </p>
                <p className="mt-3 text-[11px] text-sky-400 group-hover:text-sky-300">
                  Zobacz więcej →
                </p>
              </a>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-slate-500">
            Przykładowe organizacje w Polsce: FPL (FIFe), kluby zrzeszone w WCF
            oraz TICA. Przed zakupem kota zawsze sprawdź, w jakiej organizacji
            jest zarejestrowana hodowla.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
