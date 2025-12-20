import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  // 🔥 STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBreed, setSelectedBreed] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedCat, setSelectedCat] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [notifications, setNotifications] = useState(47)
  const [userLocation, setUserLocation] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [likedCats, setLikedCats] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('pl')
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [isOnline, setIsOnline] = useState(true)

  // 🐱 PREMIUM CATS DATABASE
  const [cats] = useState([
    {
      id: 1,
      name: 'Luna Supreme Gold',
      breed: 'British Shorthair',
      age: '1.5 roku',
      price: 6500,
      priceFormatted: '6 500 PLN',
      img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      breeder: {
        name: 'Golden British*PL',
        rating: 4.98,
        reviews: 156,
        location: 'Warszawa',
        responseTime: '5 min'
      },
      certifications: {
        fife: true,
        wcf: true,
        tica: false,
        fifeNumber: 'PL*GOLDEN-001'
      },
      health: {
        vaccinated: true,
        hcm: true,
        pkd: true,
        fiv: true
      },
      stats: {
        views: 5234,
        likes: 1247,
        shares: 89
      },
      description: '🏆 PREMIUM British Shorthair - FIFe & WCF. Rodowód 5 pokoleń, HCM/PKD negative, gwarancja 24m.'
    },
    {
      id: 2,
      name: 'Thunder Giant MC',
      breed: 'Maine Coon',
      age: '10 miesięcy',
      price: 9200,
      priceFormatted: '9 200 PLN',
      img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
      breeder: {
        name: 'GiantsCoon*PL',
        rating: 4.99,
        reviews: 289,
        location: 'Kraków',
        responseTime: '2 min'
      },
      certifications: {
        fife: true,
        wcf: false,
        tica: true,
        ticaNumber: 'TICA-PL-MCO-015'
      },
      health: {
        vaccinated: true,
        hcm: true,
        pkd: true,
        fiv: true
      },
      stats: {
        views: 8421,
        likes: 2156,
        shares: 145
      },
      description: '🦁 GIANT Maine Coon - 7.8kg! FIFe & TICA Champion Line. Top 10 TICA International 2023.'
    },
    {
      id: 3,
      name: 'Bella Persian Dream',
      breed: 'Persian',
      age: '2 lata',
      price: 5800,
      priceFormatted: '5 800 PLN',
      img: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800',
      breeder: {
        name: 'PersianDream*PL',
        rating: 4.96,
        reviews: 178,
        location: 'Gdańsk',
        responseTime: '8 min'
      },
      certifications: {
        fife: true,
        wcf: true,
        tica: false,
        fifeNumber: 'PL*PERSIAN-008'
      },
      health: {
        vaccinated: true,
        hcm: true,
        pkd: true,
        fiv: true
      },
      stats: {
        views: 3421,
        likes: 892,
        shares: 67
      },
      description: '👑 PERSIAN DREAM - Breeding quality. PKD negative, champion bloodline.'
    },
    {
      id: 4,
      name: 'Shadow Ragdoll',
      breed: 'Ragdoll',
      age: '6 miesięcy',
      price: 5200,
      priceFormatted: '5 200 PLN',
      img: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800',
      breeder: {
        name: 'Ragdoll Dreams',
        rating: 4.97,
        reviews: 134,
        location: 'Wrocław',
        responseTime: '10 min'
      },
      certifications: {
        fife: true,
        wcf: false,
        tica: true,
        ticaNumber: 'TICA-PL-RAG-023'
      },
      health: {
        vaccinated: true,
        hcm: true,
        pkd: true,
        fiv: true
      },
      stats: {
        views: 4567,
        likes: 1123,
        shares: 78
      },
      description: '🎀 Perfect Ragdoll - Show quality. Ideal for family with kids.'
    },
    {
      id: 5,
      name: 'Mystic Bengal',
      breed: 'Bengal',
      age: '1 rok',
      price: 7800,
      priceFormatted: '7 800 PLN',
      img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
      breeder: {
        name: 'Wild Bengal*PL',
        rating: 4.95,
        reviews: 201,
        location: 'Poznań',
        responseTime: '6 min'
      },
      certifications: {
        fife: true,
        wcf: true,
        tica: true,
        ticaNumber: 'TICA-PL-BEN-045'
      },
      health: {
        vaccinated: true,
        hcm: true,
        pkd: true,
        fiv: true
      },
      stats: {
        views: 6789,
        likes: 1678,
        shares: 123
      },
      description: '🐆 Wild Bengal - Stunning rosettes. TICA/FIFe/WCF registered.'
    },
    {
      id: 6,
      name: 'Snowy Siberian',
      breed: 'Siberian',
      age: '8 miesięcy',
      price: 4900,
      priceFormatted: '4 900 PLN',
      img: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800',
      breeder: {
        name: 'Siberian Forest*PL',
        rating: 4.94,
        reviews: 167,
        location: 'Łódź',
        responseTime: '12 min'
      },
      certifications: {
        fife: true,
        wcf: true,
        tica: false,
        fifeNumber: 'PL*SIBERIAN-012'
      },
      health: {
        vaccinated: true,
        hcm: true,
        pkd: true,
        fiv: true
      },
      stats: {
        views: 3890,
        likes: 945,
        shares: 56
      },
      description: '❄️ Majestic Siberian - Hypoallergenic. Perfect for allergic people.'
    }
  ])

  // 🌍 VETERINARIANS DATA
  const [vets] = useState([
    {
      id: 'vet1',
      name: 'Klinika Kotów Premium',
      rating: 4.9,
      address: 'ul. Puławska 123, Warszawa',
      distance: '1.2 km',
      phone: '+48 22 123 45 67',
      services: ['Wizyta', 'Szczepienia', 'Badania', 'Chirurgia']
    },
    {
      id: 'vet2',
      name: 'Gabinet Weterynaryjny Dr. Kot',
      rating: 4.8,
      address: 'ul. Marszałkowska 456, Warszawa',
      distance: '2.8 km',
      phone: '+48 22 765 43 21',
      services: ['Wizyta', 'Szczepienia', 'Badania', 'Opieka 24/7']
    },
    {
      id: 'vet3',
      name: 'Koty 24/7 Emergency',
      rating: 4.7,
      address: 'ul. Nowogrodzka 789, Warszawa',
      distance: '3.5 km',
      phone: '+48 22 987 65 43',
      services: ['Pogotowie', 'Teleweterynaria', 'Chirurgia']
    }
  ])

  // 💬 CHAT CONVERSATIONS
  const [conversations] = useState([
    {
      id: 'conv1',
      breeder: 'Golden British*PL',
      lastMessage: 'Luna jest nadal dostępna! 🐱',
      timestamp: Date.now() - 300000,
      unread: 3,
      encrypted: true,
      online: true
    },
    {
      id: 'conv2',
      breeder: 'GiantsCoon*PL',
      lastMessage: 'Wysłałem dodatkowe zdjęcia',
      timestamp: Date.now() - 3600000,
      unread: 0,
      encrypted: true,
      online: false
    },
    {
      id: 'conv3',
      breeder: 'PersianDream*PL',
      lastMessage: 'Mogę zrobić wideo call?',
      timestamp: Date.now() - 7200000,
      unread: 1,
      encrypted: true,
      online: true
    }
  ])

  // 🚗 TRANSPORT OPTIONS
  const [transportRoutes] = useState([
    {
      id: 'route1',
      from: 'Warszawa',
      to: 'Berlin',
      carrier: 'PetAir Express',
      duration: '4h 30min',
      price: '850 PLN',
      type: 'international'
    },
    {
      id: 'route2',
      from: 'Kraków',
      to: 'Paryż',
      carrier: 'PetExpress Pro',
      duration: '12h',
      price: '1500 PLN',
      type: 'international'
    },
    {
      id: 'route3',
      from: 'Warszawa',
      to: 'Poznań',
      carrier: 'Uber Pets',
      duration: '2h 45min',
      price: '250 PLN',
      type: 'local'
    }
  ])

  // 🎨 FILTERED CATS
  const filteredCats = cats.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cat.breed.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBreed = selectedBreed === 'all' || cat.breed === selectedBreed
    const matchesPrice = cat.price >= priceRange[0] && cat.price <= priceRange[1]
    return matchesSearch && matchesBreed && matchesPrice
  })

  // 🔔 EFFECTS
  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setIsOnline(navigator.onLine)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 📱 HANDLERS
  const handleLike = (catId) => {
    if (likedCats.includes(catId)) {
      setLikedCats(likedCats.filter(id => id !== catId))
    } else {
      setLikedCats([...likedCats, catId])
    }
  }

  const handleAddToCart = (cat) => {
    setCartItems([...cartItems, cat])
    alert(`✅ ${cat.name} dodany do koszyka!`)
  }

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, {
        id: Date.now(),
        text: messageInput,
        sender: 'user',
        timestamp: Date.now()
      }])
      setMessageInput('')
    }
  }

  const handleShare = async (cat) => {
    if (navigator.share) {
      await navigator.share({
        title: `${cat.name} - CAT PURRE`,
        text: `Sprawdź ${cat.name} (${cat.breed}) za ${cat.priceFormatted}!`,
        url: window.location.href
      })
    }
  }

  // 🎯 RENDER HOME TAB
  const renderHome = () => (
    <div className="home-tab">
      {/* HERO SECTION */}
      <div className="hero">
        <h1 className="emoji">😻</h1>
        <h2 className="title">CAT PURRE</h2>
        <p className="subtitle">Premium Marketplace Rasowych Kotów</p>
        
        <div className="badges">
          <span className="badge fife">FIFe ✓</span>
          <span className="badge wcf">WCF ✓</span>
          <span className="badge tica">TICA ✓</span>
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-number">2,547</span>
            <span className="stat-label">Kotów</span>
          </div>
          <div className="stat">
            <span className="stat-number">584</span>
            <span className="stat-label">Hodowców</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.98</span>
            <span className="stat-label">⭐ Rating</span>
          </div>
          <div className="stat">
            <span className="stat-number">552K</span>
            <span className="stat-label">PLN/mies</span>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Szukaj po nazwie, rasie, hodowcy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="filter-button" onClick={() => setShowFilters(!showFilters)}>
            🎛️ Filtry
          </button>
        </div>

        {/* FILTERS */}
        {showFilters && (
          <div className="filters-panel">
            <h3 className="filters-title">🔧 Zaawansowane filtry</h3>
            
            <div className="filter-group">
              <label className="filter-label">🐱 Rasa:</label>
              <select 
                className="filter-select" 
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
              >
                <option value="all">Wszystkie</option>
                <option value="British Shorthair">British Shorthair</option>
                <option value="Maine Coon">Maine Coon</option>
                <option value="Persian">Persian</option>
                <option value="Ragdoll">Ragdoll</option>
                <option value="Bengal">Bengal</option>
                <option value="Siberian">Siberian</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">💰 Cena: {priceRange[0]} - {priceRange[1]} PLN</label>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="price-slider"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">🏆 Certyfikaty:</label>
              <div className="cert-checkboxes">
                <label className="checkbox-label">
                  <input type="checkbox" /> FIFe
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> WCF
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> TICA
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CATS GRID */}
      <div className="cats-section">
        <h3 className="section-title">
          🌟 Premium Selection 
          <span className="results-count">({filteredCats.length} wyników)</span>
        </h3>
        
        <div className="cats-grid">
          {filteredCats.map(cat => (
            <div key={cat.id} className="cat-card" onClick={() => {
              setSelectedCat(cat)
              setShowModal(true)
            }}>
              <div className="cat-image-container">
                <img src={cat.img} alt={cat.name} className="cat-image" loading="lazy" />
                
                {/* BADGES */}
                <div className="image-badges">
                  {cat.certifications.fife && (
                    <span className="img-badge fife">FIFe ✓</span>
                  )}
                  {cat.certifications.wcf && (
                    <span className="img-badge wcf">WCF ✓</span>
                  )}
                  {cat.certifications.tica && (
                    <span className="img-badge tica">TICA ✓</span>
                  )}
                </div>

                {/* LIKE BUTTON */}
                <button 
                  className={`like-button ${likedCats.includes(cat.id) ? 'liked' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLike(cat.id)
                  }}
                >
                  {likedCats.includes(cat.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="cat-info">
                <h4 className="cat-name">{cat.name}</h4>
                <p className="cat-breed">{cat.breed} • {cat.age}</p>
                
                {/* BREEDER */}
                <div className="breeder-info">
                  <span className="breeder-name">👤 {cat.breeder.name}</span>
                  <span className="breeder-rating">⭐ {cat.breeder.rating}</span>
                </div>

                {/* HEALTH */}
                <div className="health-badges">
                  {cat.health.vaccinated && <span className="health-badge">💉</span>}
                  {cat.health.hcm && <span className="health-badge">🫀 HCM✓</span>}
                  {cat.health.pkd && <span className="health-badge">🧬 PKD✓</span>}
                </div>

                {/* STATS */}
                <div className="cat-stats">
                  <span className="cat-stat">👁️ {cat.stats.views}</span>
                  <span className="cat-stat">❤️ {cat.stats.likes}</span>
                  <span className="cat-stat">🔄 {cat.stats.shares}</span>
                </div>

                <p className="cat-price">{cat.priceFormatted}</p>

                <div className="card-actions">
                  <button 
                    className="action-button message"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowChat(true)
                    }}
                  >
                    💬 Wiadomość
                  </button>
                  <button 
                    className="action-button buy"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(cat)
                    }}
                  >
                    🛒 Kup
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // KONTYNUACJA W MSG 2/3...
  
  return (
    <div className="app">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-emoji">😻</span>
            <span className="logo-text">CAT PURRE</span>
          </div>

          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              🏠 Home
            </button>
            <button 
              className={`nav-tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              💬 Chat
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </button>
            <button 
              className={`nav-tab ${activeTab === 'vets' ? 'active' : ''}`}
              onClick={() => setActiveTab('vets')}
            >
              🏥 Weterynarze
            </button>
            <button 
              className={`nav-tab ${activeTab === 'transport' ? 'active' : ''}`}
              onClick={() => setActiveTab('transport')}
            >
              🚗 Transport
            </button>
            <button 
              className={`nav-tab ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              🛒 Koszyk
              {cartItems.length > 0 && (
                <span className="notification-badge">{cartItems.length}</span>
              )}
            </button>
          </div>

          <div className="nav-actions">
            <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </span>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {activeTab === 'home' && renderHome()}
        {/* Pozostałe taby w MSG 2/3 */}
      </main>
    </div>
  )
}

export default App

  // 🎯 RENDER CHAT TAB
  const renderChat = () => (
    <div className="chat-tab">
      <h2 className="tab-title">💬 Twoje Rozmowy</h2>
      
      <div className="chat-layout">
        {/* CONVERSATIONS LIST */}
        <div className="conversations-list">
          {conversations.map(conv => (
            <div key={conv.id} className="conversation-item">
              <div className="conv-avatar">
                <span className="avatar-emoji">👤</span>
                {conv.online && <span className="online-dot"></span>}
              </div>
              
              <div className="conv-content">
                <div className="conv-header">
                  <h4 className="conv-name">{conv.breeder}</h4>
                  <span className="conv-time">{new Date(conv.timestamp).toLocaleTimeString('pl-PL', {hour: '2-digit', minute: '2-digit'})}</span>
                </div>
                <p className="conv-last-message">
                  {conv.encrypted && '🔒 '}
                  {conv.lastMessage}
                </p>
              </div>
              
              {conv.unread > 0 && (
                <span className="unread-badge">{conv.unread}</span>
              )}
            </div>
          ))}
        </div>

        {/* CHAT WINDOW */}
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-user">
              <span className="chat-avatar">👤</span>
              <div>
                <h4 className="chat-user-name">Golden British*PL</h4>
                <span className="chat-user-status">🟢 Online • Odpowiada w 5 min</span>
              </div>
            </div>
            <div className="chat-actions">
              <button className="chat-action-btn" title="Video Call">📹</button>
              <button className="chat-action-btn" title="Voice Call">📞</button>
              <button className="chat-action-btn" title="Tłumacz">🌐</button>
            </div>
          </div>

          <div className="chat-messages">
            <div className="message received">
              <div className="message-bubble">
                <p className="message-text">Witam! Interesuje Pana Luna Supreme? 🐱</p>
                <span className="message-time">09:15</span>
              </div>
            </div>
            
            <div className="message sent">
              <div className="message-bubble">
                <p className="message-text">Tak! Czy mogę ją zobaczyć na video call?</p>
                <span className="message-time">09:16 ✓✓</span>
              </div>
            </div>

            <div className="message received">
              <div className="message-bubble">
                <p className="message-text">Oczywiście! Kiedy będzie Panu pasować? Mam czas dzisiaj 14:00-17:00</p>
                <span className="message-time">09:17</span>
              </div>
            </div>

            <div className="message-system">
              <span className="system-text">🔒 Rozmowa jest szyfrowana end-to-end</span>
            </div>

            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}>
                <div className="message-bubble">
                  <p className="message-text">{msg.text}</p>
                  <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString('pl-PL', {hour: '2-digit', minute: '2-digit'})}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-container">
            <button className="chat-input-btn" title="Emoji">😊</button>
            <button className="chat-input-btn" title="Załącznik">📎</button>
            <input
              type="text"
              className="chat-input"
              placeholder="Wpisz wiadomość... (tłumaczenie automatyczne PL↔EN↔DE)"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="chat-input-btn" title="Zapis głosowy">🎤</button>
            <button className="chat-send-btn" onClick={handleSendMessage}>
              ✈️
            </button>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="chat-quick-actions">
        <h3 className="quick-actions-title">⚡ Szybkie akcje</h3>
        <div className="quick-actions-grid">
          <button className="quick-action-card">
            <span className="qa-icon">📹</span>
            <span className="qa-text">Zaplanuj Video Call</span>
          </button>
          <button className="quick-action-card">
            <span className="qa-icon">📄</span>
            <span className="qa-text">Poproś o dokumenty</span>
          </button>
          <button className="quick-action-card">
            <span className="qa-icon">🏥</span>
            <span className="qa-text">Zapytaj o zdrowie</span>
          </button>
          <button className="quick-action-card">
            <span className="qa-icon">🚗</span>
            <span className="qa-text">Ustal transport</span>
          </button>
        </div>
      </div>
    </div>
  )

  // 🎯 RENDER VETS TAB
  const renderVets = () => (
    <div className="vets-tab">
      <h2 className="tab-title">🏥 Weterynarze w Twojej Okolicy</h2>
      
      <div className="location-banner">
        <span className="location-icon">📍</span>
        <span className="location-text">Warszawa, Mokotów</span>
        <button className="location-change-btn">Zmień lokalizację</button>
      </div>

      <div className="vets-grid">
        {vets.map(vet => (
          <div key={vet.id} className="vet-card">
            <div className="vet-header">
              <div className="vet-icon">🏥</div>
              <div className="vet-main-info">
                <h3 className="vet-name">{vet.name}</h3>
                <div className="vet-rating">
                  <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-number">{vet.rating}</span>
                </div>
              </div>
            </div>

            <div className="vet-details">
              <div className="vet-detail-row">
                <span className="detail-icon">📍</span>
                <span className="detail-text">{vet.address}</span>
              </div>
              <div className="vet-detail-row">
                <span className="detail-icon">🚗</span>
                <span className="detail-text">{vet.distance}</span>
              </div>
              <div className="vet-detail-row">
                <span className="detail-icon">📞</span>
                <span className="detail-text">{vet.phone}</span>
              </div>
            </div>

            <div className="vet-services">
              <h4 className="services-title">Usługi:</h4>
              <div className="services-tags">
                {vet.services.map(service => (
                  <span key={service} className="service-tag">{service}</span>
                ))}
              </div>
            </div>

            <div className="vet-actions">
              <button className="vet-action-btn primary">
                📞 Zadzwoń
              </button>
              <button className="vet-action-btn secondary">
                📅 Umów wizytę
              </button>
              <button className="vet-action-btn secondary">
                🗺️ Nawigacja
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TELEMEDICINE BANNER */}
      <div className="telemedicine-banner">
        <div className="tele-content">
          <h3 className="tele-title">📱 Teleweterynaria 24/7</h3>
          <p className="tele-description">Skonsultuj się z weterynarzem online w 5 minut</p>
          <button className="tele-btn">Rozpocznij konsultację</button>
        </div>
        <div className="tele-image">🩺</div>
      </div>

      {/* EMERGENCY SECTION */}
      <div className="emergency-section">
        <h3 className="emergency-title">🚨 Pogotowie weterynaryjne</h3>
        <div className="emergency-cards">
          <div className="emergency-card">
            <span className="emergency-icon">🚑</span>
            <h4 className="emergency-name">Veterinary ER 24h</h4>
            <p className="emergency-phone">📞 +48 22 222 22 22</p>
            <button className="emergency-call-btn">Zadzwoń teraz</button>
          </div>
          <div className="emergency-card">
            <span className="emergency-icon">🏥</span>
            <h4 className="emergency-name">Animal Hospital</h4>
            <p className="emergency-phone">📞 +48 22 333 33 33</p>
            <button className="emergency-call-btn">Zadzwoń teraz</button>
          </div>
        </div>
      </div>
    </div>
  )

  // 🎯 RENDER TRANSPORT TAB
  const renderTransport = () => (
    <div className="transport-tab">
      <h2 className="tab-title">🚗 Transport Międzynarodowy</h2>
      
      <div className="transport-info-banner">
        <span className="info-icon">ℹ️</span>
        <p className="info-text">
          Oferujemy bezpieczny transport kotów rasowych na terenie Polski i Europy. 
          Wszystkie transporty są ubezpieczone i monitorowane GPS.
        </p>
      </div>

      {/* TRANSPORT CALCULATOR */}
      <div className="transport-calculator">
        <h3 className="calculator-title">💰 Kalkulator kosztów transportu</h3>
        
        <div className="calculator-form">
          <div className="form-group">
            <label className="form-label">📍 Skąd:</label>
            <select className="form-select">
              <option>Warszawa</option>
              <option>Kraków</option>
              <option>Gdańsk</option>
              <option>Wrocław</option>
              <option>Poznań</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">📍 Dokąd:</label>
            <select className="form-select">
              <option>Berlin, Niemcy</option>
              <option>Paryż, Francja</option>
              <option>Amsterdam, Holandia</option>
              <option>Praga, Czechy</option>
              <option>Wiedeń, Austria</option>
            </select>
          </div>

          <button className="calculate-btn">Oblicz koszt</button>
        </div>
      </div>

      {/* TRANSPORT ROUTES */}
      <div className="transport-routes">
        <h3 className="routes-title">🛣️ Dostępne trasy</h3>
        
        <div className="routes-grid">
          {transportRoutes.map(route => (
            <div key={route.id} className="route-card">
              <div className="route-header">
                <span className={`route-type ${route.type}`}>
                  {route.type === 'international' ? '🌍 Międzynarodowy' : '🇵🇱 Lokalny'}
                </span>
              </div>

              <div className="route-path">
                <div className="route-location">
                  <span className="location-icon">📍</span>
                  <span className="location-name">{route.from}</span>
                </div>
                <div className="route-arrow">➡️</div>
                <div className="route-location">
                  <span className="location-icon">📍</span>
                  <span className="location-name">{route.to}</span>
                </div>
              </div>

              <div className="route-details">
                <div className="route-detail">
                  <span className="detail-label">Przewoźnik:</span>
                  <span className="detail-value">{route.carrier}</span>
                </div>
                <div className="route-detail">
                  <span className="detail-label">Czas trwania:</span>
                  <span className="detail-value">⏱️ {route.duration}</span>
                </div>
                <div className="route-detail">
                  <span className="detail-label">Cena:</span>
                  <span className="detail-value price">{route.price}</span>
                </div>
              </div>

              <div className="route-features">
                <span className="feature-badge">🛡️ Ubezpieczenie</span>
                <span className="feature-badge">📡 GPS</span>
                <span className="feature-badge">🌡️ Klimatyzacja</span>
              </div>

              <button className="route-book-btn">Zarezerwuj transport</button>
            </div>
          ))}
        </div>
      </div>

      {/* TRANSPORT FAQ */}
      <div className="transport-faq">
        <h3 className="faq-title">❓ Często zadawane pytania</h3>
        <div className="faq-items">
          <details className="faq-item">
            <summary className="faq-question">Czy transport jest bezpieczny?</summary>
            <p className="faq-answer">
              Tak! Wszystkie nasze przewoźnicy są certyfikowani i specjalizują się w transporcie zwierząt. 
              Każdy transport jest ubezpieczony na pełną wartość kota.
            </p>
          </details>
          <details className="faq-item">
            <summary className="faq-question">Ile trwa transport międzynarodowy?</summary>
            <p className="faq-answer">
              Zależnie od trasy, 4-12 godzin. Wszystkie transporty są monitorowane GPS w czasie rzeczywistym.
            </p>
          </details>
          <details className="faq-item">
            <summary className="faq-question">Jakie dokumenty są potrzebne?</summary>
            <p className="faq-answer">
              Paszport europejski, aktualne szczepienia, certyfikat weterynaryjny. Pomagamy w przygotowaniu dokumentacji.
            </p>
          </details>
        </div>
      </div>
    </div>
  )

  // 🎯 RENDER CART TAB
  const renderCart = () => (
    <div className="cart-tab">
      <h2 className="tab-title">🛒 Twój Koszyk</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-icon">🛒</span>
          <h3 className="empty-title">Koszyk jest pusty</h3>
          <p className="empty-description">Dodaj koty do koszyka, aby kontynuować zakup</p>
          <button className="browse-btn" onClick={() => setActiveTab('home')}>
            Przeglądaj koty
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((cat, index) => (
              <div key={index} className="cart-item">
                <img src={cat.img} alt={cat.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{cat.name}</h4>
                  <p className="cart-item-breed">{cat.breed}</p>
                  <p className="cart-item-breeder">👤 {cat.breeder.name}</p>
                </div>
                <div className="cart-item-price">
                  <span className="price-label">Cena:</span>
                  <span className="price-value">{cat.priceFormatted}</span>
                </div>
                <button className="cart-item-remove" onClick={() => {
                  setCartItems(cartItems.filter((_, i) => i !== index))
                }}>
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">📋 Podsumowanie</h3>
            
            <div className="summary-row">
              <span className="summary-label">Suma częściowa:</span>
              <span className="summary-value">
                {cartItems.reduce((sum, cat) => sum + cat.price, 0).toLocaleString('pl-PL')} PLN
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Transport:</span>
              <span className="summary-value">250 PLN</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Ubezpieczenie:</span>
              <span className="summary-value">150 PLN</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span className="summary-label">RAZEM:</span>
              <span className="summary-value">
                {(cartItems.reduce((sum, cat) => sum + cat.price, 0) + 400).toLocaleString('pl-PL')} PLN
              </span>
            </div>

            {/* PAYMENT METHODS */}
            <div className="payment-methods">
              <h4 className="payment-title">💳 Metoda płatności:</h4>
              <div className="payment-options">
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-label">💳 Stripe (Karta)</span>
                </label>
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="blik"
                    checked={paymentMethod === 'blik'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-label">📱 BLIK</span>
                </label>
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="przelewy24"
                    checked={paymentMethod === 'przelewy24'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-label">🏦 Przelewy24</span>
                </label>
              </div>
            </div>

            <button className="checkout-btn" onClick={() => setShowPayment(true)}>
              💰 Przejdź do płatności
            </button>

            <div className="security-badges">
              <span className="security-badge">🔒 Bezpieczne płatności</span>
              <span className="security-badge">🛡️ Gwarancja zwrotu</span>
              <span className="security-badge">✅ Weryfikowani hodowcy</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // 🎯 MODAL WITH CAT DETAILS
  const renderModal = () => {
    if (!showModal || !selectedCat) return null

    return (
      <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowModal(false)}>✖️</button>
          
          <div className="modal-layout">
            {/* LEFT: IMAGE */}
            <div className="modal-left">
              <img src={selectedCat.img} alt={selectedCat.name} className="modal-image" />
              
              <div className="modal-image-actions">
                <button className="image-action-btn">📷 Więcej zdjęć (12)</button>
                <button className="image-action-btn">📹 Video (3)</button>
                <button className="image-action-btn" onClick={() => handleShare(selectedCat)}>
                  🔄 Udostępnij
                </button>
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="modal-right">
              <div className="modal-header">
                <h2 className="modal-title">{selectedCat.name}</h2>
                <span className="modal-price">{selectedCat.priceFormatted}</span>
              </div>

              <p className="modal-description">{selectedCat.description}</p>

              {/* CERTIFICATIONS */}
              <div className="modal-section">
                <h3 className="modal-section-title">🏆 Certyfikaty</h3>
                <div className="cert-list">
                  {selectedCat.certifications.fife && (
                    <div className="cert-item">
                      <span className="cert-badge fife">FIFe ✓</span>
                      <span className="cert-number">{selectedCat.certifications.fifeNumber}</span>
                    </div>
                  )}
                  {selectedCat.certifications.wcf && (
                    <div className="cert-item">
                      <span className="cert-badge wcf">WCF ✓</span>
                    </div>
                  )}
                  {selectedCat.certifications.tica && (
                    <div className="cert-item">
                      <span className="cert-badge tica">TICA ✓</span>
                      <span className="cert-number">{selectedCat.certifications.ticaNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* HEALTH */}
              <div className="modal-section">
                <h3 className="modal-section-title">🏥 Zdrowie</h3>
                <div className="health-list">
                  <div className="health-item">✅ Szczepienia aktualne</div>
                  <div className="health-item">✅ HCM negatywny</div>
                  <div className="health-item">✅ PKD negatywny</div>
                  <div className="health-item">✅ FIV/FeLV negatywny</div>
                </div>
              </div>

              {/* BREEDER */}
              <div className="modal-section">
                <h3 className="modal-section-title">👤 Hodowca</h3>
                <div className="breeder-card">
                  <div className="breeder-avatar">👤</div>
                  <div className="breeder-details">
                    <h4 className="breeder-name">{selectedCat.breeder.name}</h4>
                    <div className="breeder-stats">
                      <span className="breeder-stat">⭐ {selectedCat.breeder.rating}</span>
                      <span className="breeder-stat">📝 {selectedCat.breeder.reviews} opinii</span>
                      <span className="breeder-stat">📍 {selectedCat.breeder.location}</span>
                    </div>
                    <p className="breeder-response">
                      ⏱️ Odpowiada w {selectedCat.breeder.responseTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="modal-actions">
                <button className="modal-action-btn primary" onClick={() => handleAddToCart(selectedCat)}>
                  🛒 Dodaj do koszyka
                </button>
                <button className="modal-action-btn secondary" onClick={() => setShowChat(true)}>
                  💬 Wyślij wiadomość
                </button>
                <button className="modal-action-btn secondary">
                  📹 Video Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
