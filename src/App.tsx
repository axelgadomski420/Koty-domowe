import React, { useState, useEffect } from 'react';
import './styles.css'; // Upewnij się, że plik CSS jest w tym samym folderze

// --- MOCK DATA (Symulacja danych z backendu Part 4) ---
const MOCK_CATS = [
  {
    id: '1',
    name: 'Luna',
    breed: 'British Shorthair',
    price: 2500,
    currency: 'PLN',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    breeder: 'Royal Cattery',
    verified: true,
    featured: true,
    badges: ['FIFE', 'WCF'],
    status: 'available'
  },
  {
    id: '2',
    name: 'Simba',
    breed: 'Maine Coon',
    price: 4000,
    currency: 'PLN',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    breeder: 'Giant Paws',
    verified: true,
    featured: false,
    badges: ['TICA'],
    status: 'pending'
  },
  {
    id: '3',
    name: 'Mochi',
    breed: 'Ragdoll',
    price: 3200,
    currency: 'PLN',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    breeder: 'Soft Purr PL',
    verified: false,
    featured: false,
    badges: [],
    status: 'available'
  }
];

// --- KOMPONENTY UI ---

const Header = () => (
  <header className="app-header">
    <div className="header-container">
      <div className="logo-section">
        <h1 className="app-logo">CAT PURRE</h1>
      </div>
      
      <nav className="main-nav">
        <button className="nav-btn active">Giełda</button>
        <button className="nav-btn">Hodowle</button>
        <button className="nav-btn">Edukacja</button>
        <button className="nav-btn">TeleHealth</button>
      </nav>

      <div className="header-actions">
        <button className="header-icon-btn breeder-btn">
          Dla Hodowcy
        </button>
        <button className="header-icon-btn">
          <span>🔔</span>
          <span className="notif-badge">2</span>
        </button>
        <div className="breeder-avatar" style={{width: 32, height: 32, fontSize: 14}}>JK</div>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="hero-main">
    <div className="hero-content">
      <span className="hero-emoji">🐱</span>
      <h2 className="hero-title">Znajdź kota o idealnym genotypie.</h2>
      <p className="hero-subtitle">
        Bezpieczna platforma łącząca elitarne hodowle z odpowiedzialnymi opiekunami.
        Weryfikacja DNA, TeleHealth i bezpieczne płatności Escrow.
      </p>
      
      <div className="hero-cta">
        <button className="cta-btn primary">Rozpocznij szukanie</button>
        <button className="cta-btn secondary">Dowiedz się więcej</button>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">120+</span>
          <span className="stat-label">Zweryfikowanych Hodowli</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Bezpieczeństwa Transakcji</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">AR</span>
          <span className="stat-label">Podgląd w Rzeczywistości</span>
        </div>
      </div>
    </div>
  </section>
);

const CatCard = ({ cat }: { cat: any }) => (
  <article className={`cat-card ${cat.featured ? 'featured' : ''}`}>
    <div className="card-badges">
      {cat.featured && <span className="badge featured-badge">POLECANY</span>}
      {cat.verified && <span className="badge verified-badge">ZWERYFIKOWANY</span>}
    </div>

    <button className="like-btn">♥</button>

    <div className="card-image-container">
      <img src={cat.image} alt={cat.name} className="card-image" />
      <div className="pedigree-badges">
        {cat.badges.map((b: string) => (
          <span key={b} className={`pedigree-badge ${b.toLowerCase()}`}>{b}</span>
        ))}
      </div>
    </div>

    <div className="card-content">
      <div className="breeder-mini">
        <div className="breeder-avatar">{cat.breeder.charAt(0)}</div>
        <div className="breeder-details">
          <span className="breeder-name">{cat.breeder}</span>
          <span className="breeder-meta">Poznań, PL</span>
        </div>
      </div>

      <h3 className="cat-name">{cat.name}</h3>
      <p className="cat-breed-info">
        {cat.breed} <span className="breed-separator">•</span> 3 miesiące
      </p>

      <div className="health-mini">
        <span className="health-badge">HCM: N/N</span>
        <span className="health-badge">PKD: N/N</span>
      </div>

      <div className="card-footer">
        <div className="price-section">
          <span className="price">{cat.price} {cat.currency}</span>
        </div>
        
        <div className="card-actions">
          <button className="action-btn buy-now">Kup Teraz</button>
          <button className="action-btn secondary">AR</button>
        </div>
        
        <div className="ready-info">
            {cat.status === 'available' 
                ? <span className="ready-badge available">Dostępny od ręki</span>
                : <span className="ready-badge pending">W trakcie rezerwacji</span>
            }
        </div>
      </div>
    </div>
  </article>
);

// --- GŁÓWNA APLIKACJA ---

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cats, setCats] = useState(MOCK_CATS);

  // Prosta logika filtracji
  useEffect(() => {
    const filtered = MOCK_CATS.filter(cat => 
      cat.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCats(filtered);
  }, [searchTerm]);

  return (
    <div className="App">
      <Header />
      
      <main className="app-main">
        <Hero />
        
        {/* SEARCH SECTION */}
        <section className="search-section">
          <div className="search-bar-container">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Szukaj rasy (np. Maine Coon)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button className="search-clear" onClick={() => setSearchTerm('')}>✕</button>
            )}
          </div>
          <button className="filters-toggle">Filtry +</button>
        </section>

        {/* LISTINGS SECTION */}
        <section className="cats-listing-section">
          <div className="listing-header">
            <h2 className="listing-title">
              Dostępne Koty
              <span className="results-badge">{cats.length}</span>
            </h2>
            
            <div className="view-mode-buttons">
                <button className="view-btn active">▦</button>
                <button className="view-btn">☰</button>
            </div>
          </div>

          {cats.length > 0 ? (
            <div className="cats-container grid-view">
              {cats.map(cat => (
                <CatCard key={cat.id} cat={cat} />
              ))}
            </div>
          ) : (
            <div className="no-results">
                <div className="no-results-icon">😿</div>
                <h3 className="no-results-title">Brak wyników</h3>
                <p className="no-results-text">Nie znaleźliśmy kotów pasujących do Twoich kryteriów.</p>
                <button className="reset-search-btn" onClick={() => setSearchTerm('')}>Wyczyść filtry</button>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
            <div className="footer-logo">CAT PURRE</div>
            <div className="footer-links">
                <a href="#" className="footer-link">O nas</a>
                <a href="#" className="footer-link">Polityka Prywatności</a>
                <a href="#" className="footer-link">Regulamin Hodowcy</a>
                <a href="#" className="footer-link">Kontakt</a>
            </div>
            <div className="footer-disclaimer">
                © 2025 CAT PURRE Inc. Wszystkie prawa zastrzeżone. Projekt realizowany w technologii TypeScript / React.
            </div>
        </div>
      </footer>
    </div>
  );
}
