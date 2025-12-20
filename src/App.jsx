console.log('React starting...');
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 🔥 STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBreed, setSelectedBreed] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedCat, setSelectedCat] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [likedCats, setLikedCats] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [isOnline, setIsOnline] = useState(true)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [showBreederProfile, setShowBreederProfile] = useState(false)
  const [selectedBreeder, setSelectedBreeder] = useState(null)
  const [userFavorites, setUserFavorites] = useState([])
  const [notifications, setNotifications] = useState(12)

  // 🔐 ADMIN STATE
  const [isAdmin, setIsAdmin] = useState(false) // Zmień na true aby przetestować panel
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')

  // 🐱 20 RAS KOTÓW + INNE
  const catBreeds = [
    { id: 'all', name: 'Wszystkie rasy', emoji: '🐱', count: 0 },
    { id: 'british-shorthair', name: 'British Shorthair', emoji: '🇬🇧', count: 0 },
    { id: 'maine-coon', name: 'Maine Coon', emoji: '🦁', count: 0 },
    { id: 'persian', name: 'Persian', emoji: '👑', count: 0 },
    { id: 'ragdoll', name: 'Ragdoll', emoji: '🧸', count: 0 },
    { id: 'bengal', name: 'Bengal', emoji: '🐆', count: 0 },
    { id: 'sphynx', name: 'Sphynx', emoji: '👽', count: 0 },
    { id: 'siamese', name: 'Siamese', emoji: '🇹🇭', count: 0 },
    { id: 'scottish-fold', name: 'Scottish Fold', emoji: '🏴', count: 0 },
    { id: 'norwegian-forest', name: 'Norwegian Forest', emoji: '🌲', count: 0 },
    { id: 'siberian', name: 'Siberian', emoji: '❄️', count: 0 },
    { id: 'abyssinian', name: 'Abyssinian', emoji: '🦊', count: 0 },
    { id: 'exotic-shorthair', name: 'Exotic Shorthair', emoji: '🐻', count: 0 },
    { id: 'russian-blue', name: 'Russian Blue', emoji: '💎', count: 0 },
    { id: 'birman', name: 'Birman', emoji: '🤍', count: 0 },
    { id: 'oriental', name: 'Oriental', emoji: '🎭', count: 0 },
    { id: 'burmese', name: 'Burmese', emoji: '🟤', count: 0 },
    { id: 'devon-rex', name: 'Devon Rex', emoji: '👾', count: 0 },
    { id: 'cornish-rex', name: 'Cornish Rex', emoji: '🌊', count: 0 },
    { id: 'turkish-van', name: 'Turkish Van', emoji: '🇹🇷', count: 0 },
    { id: 'savannah', name: 'Savannah', emoji: '🐅', count: 0 },
    { id: 'other', name: 'Inne', emoji: '❓', count: 0 }
  ]

  // 🏛️ ORGANIZACJE
  const [organizations] = useState([
    {
      id: 'fife',
      name: 'FIFe',
      fullName: 'Fédération Internationale Féline',
      logo: '🏆',
      country: 'Międzynarodowa',
      polishMember: 'FPL (Felinologia Polska)',
      description: 'Największa międzynarodowa organizacja felinologiczna',
      website: 'www.fifeweb.org'
    },
    {
      id: 'wcf',
      name: 'WCF',
      fullName: 'World Cat Federation',
      logo: '🌍',
      country: 'Międzynarodowa',
      polishMember: 'WCF Poland',
      description: 'Międzynarodowa federacja hodowców kotów',
      website: 'www.wcf-online.de'
    },
    {
      id: 'tica',
      name: 'TICA',
      fullName: 'The International Cat Association',
      logo: '🌟',
      country: 'USA / Międzynarodowa',
      polishMember: 'TICA Poland Region',
      description: 'Największa amerykańska organizacja genetyczna kotów',
      website: 'www.tica.org'
    },
    {
      id: 'fpl',
      name: 'FPL',
      fullName: 'Felinologia Polska Licencjonowana',
      logo: '🇵🇱',
      country: 'Polska',
      polishMember: 'Członek FIFe',
      description: 'Polska organizacja, członek FIFe',
      website: 'www.fpl.pl'
    }
  ])

  // 🐱 KOTY - EDYTOWALNY STATE (DO USUWANIA PRZEZ ADMINA)
  const [cats, setCats] = useState([
    {
      id: 1,
      name: 'GOLDEN SUPREME Luna',
      breed: 'British Shorthair',
      breedId: 'british-shorthair',
      color: 'Blue',
      gender: 'Samica',
      age: '7 miesięcy',
      birthDate: '2024-05-15',
      price: 6500,
      priceFormatted: '6 500 PLN',
      img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      gallery: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
      breeder: {
        name: '*PL Golden British',
        owner: 'Anna Kowalska',
        rating: 4.98,
        reviewsCount: 234,
        location: 'Warszawa, Mazowieckie',
        phone: '+48 600 123 456',
        email: 'anna@goldenbritish.pl',
        verified: true,
        organization: 'FIFe / FPL'
      },
      pedigree: { fife: true, wcf: false, tica: false, generations: 5, champions: 7 },
      parents: {
        father: { name: "IC British Gold King", title: 'International Champion' },
        mother: { name: "CH Golden Luna Queen", title: 'Champion FIFe' }
      },
      health: { 
        vaccinated: true, 
        microchipped: true, 
        healthGuarantee: '24 miesiące',
        hcmTested: true,
        hcmResult: 'Negatywny',
        pkdTested: true,
        pkdResult: 'N/N'
      },
      stats: { views: 5234, likes: 1234, shares: 89, inquiries: 34 },
      personality: ['Spokojny', 'Towarzyski', 'Łagodny'],
      status: 'available',
      featured: true,
      verified: true,
      readyToGo: 'Gotowy do odbioru',
      videos: [],
      isDemoData: true // Oznaczenie demo kota
    },
    {
      id: 2,
      name: 'GIANT COON Thunder',
      breed: 'Maine Coon',
      breedId: 'maine-coon',
      color: 'Black Silver Tabby',
      gender: 'Samiec',
      age: '9 miesięcy',
      birthDate: '2024-03-15',
      price: 9200,
      priceFormatted: '9 200 PLN',
      img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
      gallery: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800'],
      breeder: {
        name: '*PL Giants Coon',
        owner: 'Marek Wiśniewski',
        rating: 4.99,
        reviewsCount: 456,
        location: 'Kraków, Małopolskie',
        phone: '+48 601 234 567',
        email: 'marek@giantscoon.pl',
        verified: true,
        organization: 'WCF'
      },
      pedigree: { fife: false, wcf: true, tica: true, generations: 6, champions: 10 },
      parents: {
        father: { name: "GC Giants Thunder Storm", title: 'Grand Champion' },
        mother: { name: "IC Giants Silver Moon", title: 'International Champion' }
      },
      health: { 
        vaccinated: true, 
        microchipped: true, 
        healthGuarantee: '24 miesiące',
        hcmTested: true,
        hcmResult: 'Negatywny',
        pkdTested: true,
        pkdResult: 'N/N'
      },
      stats: { views: 8234, likes: 2134, shares: 156, inquiries: 67 },
      personality: ['Energiczny', 'Inteligentny', 'Przyjazny'],
      status: 'available',
      featured: true,
      verified: true,
      readyToGo: 'Gotowy do odbioru',
      availableForBreeding: true,
      videos: [],
      isDemoData: true
    },
    {
      id: 3,
      name: 'PERSIAN DREAM Bella',
      breed: 'Persian',
      breedId: 'persian',
      color: 'White',
      gender: 'Samica',
      age: '1 rok 4 miesiące',
      birthDate: '2023-08-10',
      price: 5800,
      priceFormatted: '5 800 PLN',
      img: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800',
      gallery: ['https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800'],
      breeder: {
        name: '*PL Persian Dream',
        owner: 'Katarzyna Lewandowska',
        rating: 4.96,
        reviewsCount: 189,
        location: 'Gdańsk, Pomorskie',
        phone: '+48 602 345 678',
        email: 'kasia@persiandream.pl',
        verified: true,
        organization: 'FIFe / FPL'
      },
      pedigree: { fife: true, wcf: true, tica: false, generations: 5, champions: 8 },
      parents: {
        father: { name: "CH Persian Dream White Prince", title: 'Champion' },
        mother: { name: "IC Persian Dream Snow Queen", title: 'International Champion' }
      },
      health: { 
        vaccinated: true, 
        microchipped: true, 
        healthGuarantee: '24 miesiące',
        hcmTested: false,
        pkdTested: true,
        pkdResult: 'N/N'
      },
      stats: { views: 4567, likes: 987, shares: 67, inquiries: 28 },
      personality: ['Spokojna', 'Delikatna', 'Domatorka'],
      status: 'available',
      featured: false,
      verified: true,
      readyToGo: '2025-01-15',
      videos: [],
      isDemoData: true
    },
    {
      id: 4,
      name: 'RAGDOLL ANGELS Shadow',
      breed: 'Ragdoll',
      breedId: 'ragdoll',
      color: 'Seal Point',
      gender: 'Samiec',
      age: '5.5 miesiąca',
      birthDate: '2024-06-20',
      price: 5200,
      priceFormatted: '5 200 PLN',
      img: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800',
      gallery: ['https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800'],
      breeder: {
        name: '*PL Ragdoll Angels',
        owner: 'Agnieszka Nowak',
        rating: 4.97,
        reviewsCount: 267,
        location: 'Wrocław, Dolnośląskie',
        phone: '+48 603 456 789',
        email: 'agnieszka@ragdollangels.pl',
        verified: true,
        organization: 'TICA'
      },
      pedigree: { fife: false, wcf: false, tica: true, generations: 5, champions: 6 },
      parents: {
        father: { name: "GC Ragdoll Angels Dark Knight", title: 'Grand Champion' },
        mother: { name: "CH Ragdoll Angels Sweet Angel", title: 'Champion' }
      },
      health: { 
        vaccinated: true, 
        microchipped: true, 
        healthGuarantee: '24 miesiące',
        hcmTested: true,
        hcmResult: 'Negatywny',
        pkdTested: true,
        pkdResult: 'N/N'
      },
      stats: { views: 3456, likes: 789, shares: 45, inquiries: 23 },
      personality: ['Łagodny', 'Towarzyski', 'Spokojny'],
      status: 'available',
      featured: false,
      verified: true,
      readyToGo: 'Gotowy do odbioru',
      videos: [],
      isDemoData: true
    },
    {
      id: 5,
      name: 'WILD BENGAL Mystic',
      breed: 'Bengal',
      breedId: 'bengal',
      color: 'Brown Spotted Tabby',
      gender: 'Samica',
      age: '11 miesięcy',
      birthDate: '2024-01-15',
      price: 7800,
      priceFormatted: '7 800 PLN',
      img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
      gallery: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
      breeder: {
        name: '*PL Wild Bengal',
        owner: 'Tomasz Zieliński',
        rating: 4.95,
        reviewsCount: 178,
        location: 'Poznań, Wielkopolskie',
        phone: '+48 604 567 890',
        email: 'tomasz@wildbengal.pl',
        verified: true,
        organization: 'TICA'
      },
      pedigree: { fife: false, wcf: false, tica: true, generations: 6, champions: 9 },
      parents: {
        father: { name: "GC Wild Bengal Tiger King", title: 'Grand Champion' },
        mother: { name: "IC Wild Bengal Mystic Queen", title: 'International Champion' }
      },
      health: { 
        vaccinated: true, 
        microchipped: true, 
        healthGuarantee: '24 miesiące',
        hcmTested: true,
        hcmResult: 'Negatywny',
        pkdTested: true,
        pkdResult: 'N/N'
      },
      stats: { views: 6789, likes: 1567, shares: 123, inquiries: 45 },
      personality: ['Energiczny', 'Inteligentny', 'Zabawny'],
      status: 'available',
      featured: true,
      verified: true,
      readyToGo: 'Gotowy do odbioru',
      availableForBreeding: false,
      videos: [],
      isDemoData: true
    }
  ])

  // Update breed counts
  const updateBreedCounts = () => {
    return catBreeds.map(breed => {
      if (breed.id === 'all') {
        return { ...breed, count: cats.length }
      }
      const count = cats.filter(cat => cat.breedId === breed.id).length
      return { ...breed, count }
    })
  }

  const breedsWithCounts = updateBreedCounts()
  // 📱 BASIC HANDLERS
  const handleLike = (catId) => {
    if (likedCats.includes(catId)) {
      setLikedCats(likedCats.filter(id => id !== catId))
    } else {
      setLikedCats([...likedCats, catId])
    }
  }

  const handleAddToCart = (cat) => {
    if (!cartItems.find(item => item.id === cat.id)) {
      setCartItems([...cartItems, cat])
      showNotification(`✅ ${cat.name} dodany do koszyka!`, '🛒')
    } else {
      showNotification(`⚠️ ${cat.name} jest już w koszyku!`, '⚠️')
    }
  }

  const handleRemoveFromCart = (catId) => {
    setCartItems(cartItems.filter(item => item.id !== catId))
  }

  const handleViewDetails = (cat) => {
    setSelectedCat(cat)
    setShowModal(true)
    trackView(cat)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedCat(null)
  }

  const handleShare = async (cat) => {
    const shareData = {
      title: `${cat.name} - ${cat.breed}`,
      text: `Sprawdź ${cat.name} (${cat.breed}, ${cat.age}) za ${cat.priceFormatted} na CAT PURRE!`,
      url: window.location.href
    }
    
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`)
      showNotification('✅ Link skopiowany do schowka!', '🔗')
    }
  }

  const handleContactBreeder = (breeder) => {
    setSelectedBreeder(breeder)
    setShowBreederProfile(true)
  }

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption)
  }

  const handleViewModeChange = (mode) => {
    setViewMode(mode)
  }

  // ====================================================================
  // 👑 ADMIN FUNCTIONS - ZARZĄDZANIE KOTAMI
  // ====================================================================

  const adminLogin = () => {
    // Proste hasło - w produkcji użyj prawdziwej autentykacji!
    if (adminPassword === 'admin123') {
      setIsAdmin(true)
      setShowAdminPanel(true)
      showNotification('✅ Zalogowano jako Administrator', '👑')
      setAdminPassword('')
    } else {
      showNotification('❌ Błędne hasło!', '🔒')
    }
  }

  const adminLogout = () => {
    setIsAdmin(false)
    setShowAdminPanel(false)
    showNotification('👋 Wylogowano z panelu admina', '🔓')
  }

  // Usuń demo koty
  const deleteAllDemoCats = () => {
    if (window.confirm('🗑️ Czy na pewno usunąć wszystkie koty demo? Tej operacji nie można cofnąć!')) {
      const realCats = cats.filter(cat => !cat.isDemoData)
      setCats(realCats)
      showNotification(`✅ Usunięto ${cats.length - realCats.length} kotów demo`, '🗑️')
    }
  }

  // Usuń pojedynczego kota
  const deleteCat = (catId) => {
    if (window.confirm('❌ Czy na pewno usunąć tego kota?')) {
      setCats(cats.filter(cat => cat.id !== catId))
      showNotification('✅ Kot został usunięty', '🗑️')
    }
  }

  // Dodaj nowego kota (przykładowa funkcja)
  const addNewCat = (catData) => {
    const newCat = {
      ...catData,
      id: Date.now(),
      isDemoData: false,
      stats: { views: 0, likes: 0, shares: 0, inquiries: 0 },
      status: 'available',
      verified: false
    }
    setCats([...cats, newCat])
    showNotification(`✅ Dodano kota: ${newCat.name}`, '🐱')
  }

  // Toggle featured status
  const toggleFeatured = (catId) => {
    setCats(cats.map(cat => 
      cat.id === catId ? { ...cat, featured: !cat.featured } : cat
    ))
    showNotification('✅ Status wyróżnienia zmieniony', '⭐')
  }

  // Toggle verified status
  const toggleVerified = (catId) => {
    setCats(cats.map(cat => 
      cat.id === catId ? { ...cat, verified: !cat.verified } : cat
    ))
    showNotification('✅ Status weryfikacji zmieniony', '✓')
  }

  // Edytuj cenę kota
  const updateCatPrice = (catId, newPrice) => {
    setCats(cats.map(cat => 
      cat.id === catId ? { 
        ...cat, 
        price: newPrice,
        priceFormatted: `${newPrice.toLocaleString('pl-PL')} PLN`
      } : cat
    ))
    showNotification('✅ Cena zaktualizowana', '💰')
  }

  // ====================================================================
  // 🤖 AI CHAT ASSISTANT
  // ====================================================================
  
  const [showAIChat, setShowAIChat] = useState(false)
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Cześć! 👋 Jestem AI Doradcą CAT PURRE. Pomogę Ci wybrać idealnego kota! Możesz zapytać o rasy, ceny, charaktery kotów i wiele więcej.',
      timestamp: Date.now(),
      suggestions: [
        'Spokojny kot dla rodziny',
        'Koty dla alergików',
        'Aktywne rasy',
        'Koty do hodowli'
      ]
    }
  ])
  const [aiInput, setAiInput] = useState('')
  const [aiTyping, setAiTyping] = useState(false)

  const generateAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()

    // Spokojne rasy
    if (msg.includes('spokojny') || msg.includes('łagodny') || msg.includes('rodzina')) {
      const calmCats = cats.filter(cat => 
        cat.personality.some(p => p.toLowerCase().includes('spokojn') || p.toLowerCase().includes('łagod'))
      ).slice(0, 3)
      
      return {
        text: `Polecam spokojne rasy idealne dla rodziny:\n\n${calmCats.map(cat => 
          `🐱 ${cat.breed} - ${cat.name}\n   Cechy: ${cat.personality.join(', ')}\n   Cena: ${cat.priceFormatted}`
        ).join('\n\n')}\n\nWszystkie te koty są cierpliwe i łagodne!`,
        suggestions: ['Zobacz więcej spokojnych ras', 'Które najlepsze dla dzieci?', 'Porównaj te koty'],
        recommendedCats: calmCats.map(c => c.id)
      }
    }

    // Alergicy
    if (msg.includes('alergi') || msg.includes('hypoalergiczn')) {
      const hypoallergenic = cats.filter(cat => 
        cat.breed === 'Sphynx' || cat.breed === 'Siberian' || cat.breed === 'Russian Blue'
      )
      
      return {
        text: `Dla alergików polecam:\n\n${hypoallergenic.map(cat => 
          `🐱 ${cat.breed} - ${cat.breed === 'Sphynx' ? 'bez futra = niska produkcja alergenu' : 'niska produkcja Fel d 1'}\n   ${cat.name} - ${cat.priceFormatted}`
        ).join('\n\n')}\n\nSphynx to najlepsza opcja, ale wymaga specjalnej pielęgnacji skóry!`,
        suggestions: ['Pielęgnacja Sphynx', 'Siberian vs inne rasy', 'Testy alergiczne'],
        recommendedCats: hypoallergenic.map(c => c.id)
      }
    }

    // Energiczne/aktywne
    if (msg.includes('aktywny') || msg.includes('energiczny') || msg.includes('zabaw')) {
      const activeCats = cats.filter(cat => 
        cat.personality.some(p => p.toLowerCase().includes('energiczn') || p.toLowerCase().includes('aktywn'))
      ).slice(0, 3)
      
      return {
        text: `Koty energiczne to świetny wybór!\n\n${activeCats.map(cat => 
          `🐱 ${cat.breed} - ${cat.name}\n   ${cat.personality.join(', ')}\n   ${cat.priceFormatted}`
        ).join('\n\n')}\n\n⚠️ Pamiętaj: aktywne koty potrzebują dużo zabawy i stymulacji!`,
        suggestions: ['Jakie zabawki dla aktywnych kotów?', 'Ile czasu na zabawę?', 'Zobacz te koty'],
        recommendedCats: activeCats.map(c => c.id)
      }
    }

    // Hodowla
    if (msg.includes('hodowl') || msg.includes('breeding')) {
      const breedingCats = cats.filter(cat => cat.availableForBreeding).slice(0, 3)
      
      return {
        text: `Koty z prawami hodowlanymi:\n\n${breedingCats.map(cat => 
          `🏆 ${cat.name} (${cat.breed})\n   Organizacja: ${cat.breeder.organization}\n   Rodowód: ${cat.pedigree.generations} pokoleń, ${cat.pedigree.champions} championów\n   Cena: ${cat.priceFormatted}`
        ).join('\n\n')}\n\nWszystkie z pełnymi testami genetycznymi i umową hodowlaną!`,
        suggestions: ['Jak założyć hodowlę?', 'Wymagania organizacji', 'Porównaj koty'],
        recommendedCats: breedingCats.map(c => c.id)
      }
    }

    // Cena/budżet
    if (msg.includes('cena') || msg.includes('budżet') || msg.includes('tani')) {
      const priceRanges = {
        low: cats.filter(cat => cat.price < 6000).slice(0, 3),
        mid: cats.filter(cat => cat.price >= 6000 && cat.price < 8000).slice(0, 3),
        high: cats.filter(cat => cat.price >= 8000).slice(0, 3)
      }
      
      return {
        text: `Przedziały cenowe:\n\n💰 DO 6000 PLN\n${priceRanges.low.map(c => `${c.breed} - ${c.priceFormatted}`).join('\n')}\n\n💰 6000-8000 PLN\n${priceRanges.mid.map(c => `${c.breed} - ${c.priceFormatted}`).join('\n')}\n\n💎 POWYŻEJ 8000 PLN\n${priceRanges.high.map(c => `${c.breed} - ${c.priceFormatted}`).join('\n')}\n\nPamiętaj: cena zależy od rodowodu, testów i linii (pet/breeding/show)!`,
        suggestions: ['Dlaczego różne ceny?', 'Co wpływa na cenę?', 'Ukryte koszty'],
        recommendedCats: [...priceRanges.low, ...priceRanges.mid].map(c => c.id)
      }
    }

    // DEFAULT
    return {
      text: `Mogę pomóc w wielu kwestiach:\n\n✨ Wybór rasy\n✨ Charakterystyka\n✨ Wymagania zdrowotne\n✨ Budżet\n✨ Dopasowanie do rodziny\n✨ Wymagania mieszkaniowe\n\nZadaj mi konkretne pytanie!`,
      suggestions: ['Spokojny kot dla rodziny', 'Aktywne rasy', 'Koty hypoalergiczne', 'Koty do hodowli'],
      recommendedCats: []
    }
  }

  const handleSendAIMessage = () => {
    if (!aiInput.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: aiInput,
      timestamp: Date.now()
    }
    setAiMessages(prev => [...prev, userMsg])
    setAiInput('')
    setAiTyping(true)

    setTimeout(() => {
      const aiResponse = generateAIResponse(aiInput)
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponse.text,
        timestamp: Date.now(),
        suggestions: aiResponse.suggestions || [],
        recommendedCats: aiResponse.recommendedCats || []
      }
      setAiMessages(prev => [...prev, aiMsg])
      setAiTyping(false)
    }, 1500)
  }

  // ====================================================================
  // ⚖️ PORÓWNYWARKA KOTÓW
  // ====================================================================
  
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonCats, setComparisonCats] = useState([])

  const handleAddToComparison = (cat) => {
    if (comparisonCats.length >= 3) {
      showNotification('⚠️ Możesz porównać maksymalnie 3 koty!', '⚖️')
      return
    }
    if (comparisonCats.find(c => c.id === cat.id)) {
      showNotification('⚠️ Ten kot jest już w porównaniu!', '⚖️')
      return
    }
    setComparisonCats([...comparisonCats, cat])
    setShowComparison(true)
    showNotification(`✅ ${cat.name} dodany do porównania`, '⚖️')
  }

  const handleRemoveFromComparison = (catId) => {
    setComparisonCats(comparisonCats.filter(c => c.id !== catId))
  }

  // ====================================================================
  // ❤️ ULUBIONE + HISTORIA
  // ====================================================================
  
  const [favorites, setFavorites] = useState([])
  const [viewHistory, setViewHistory] = useState([])
  const [showFavoritesPanel, setShowFavoritesPanel] = useState(false)

  const toggleFavorite = (cat) => {
    const isFav = favorites.some(f => f.id === cat.id)
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== cat.id))
      showNotification('🤍 Usunięto z ulubionych', '❤️')
    } else {
      setFavorites([...favorites, { ...cat, savedAt: Date.now() }])
      showNotification(`❤️ ${cat.name} dodany do ulubionych!`, '❤️')
    }
  }

  const trackView = (cat) => {
    const exists = viewHistory.some(h => h.id === cat.id)
    if (!exists) {
      const newHistory = [{ ...cat, viewedAt: Date.now() }, ...viewHistory.slice(0, 20)]
      setViewHistory(newHistory)
    }
  }

  useEffect(() => {
    if (selectedCat) {
      trackView(selectedCat)
    }
  }, [selectedCat])

  // ====================================================================
  // 🔔 SYSTEM POWIADOMIEŃ
  // ====================================================================
  
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      type: 'success',
      icon: '✅',
      text: 'Witamy w CAT PURRE! Mamy 5 nowych kotów.',
      time: 'Teraz',
      unread: true
    },
    {
      id: 2,
      type: 'info',
      icon: '💰',
      text: 'British Shorthair - obniżka ceny o 500 PLN!',
      time: '2 godz. temu',
      unread: true
    }
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const showNotification = (text, icon = '🔔') => {
    const newNotif = {
      id: Date.now(),
      type: 'success',
      icon,
      text,
      time: 'Teraz',
      unread: true
    }
    setNotificationsList([newNotif, ...notificationsList])
    
    setTimeout(() => {
      setNotificationsList(prev => prev.filter(n => n.id !== newNotif.id))
    }, 5000)
  }

  const markAsRead = (id) => {
    setNotificationsList(notificationsList.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ))
  }

  const unreadCount = notificationsList.filter(n => n.unread).length

  // 🎯 FILTERED & SORTED CATS
  const getFilteredAndSortedCats = () => {
    let filtered = cats.filter(cat => {
      const matchesSearch = 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.breeder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.breeder.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesBreed = selectedBreed === 'all' || cat.breedId === selectedBreed
      const matchesPrice = cat.price >= priceRange[0] && cat.price <= priceRange[1]
      
      return matchesSearch && matchesBreed && matchesPrice
    })

    switch(sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'age_young':
        filtered.sort((a, b) => new Date(b.birthDate) - new Date(a.birthDate))
        break
      case 'age_old':
        filtered.sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate))
        break
      case 'popular':
        filtered.sort((a, b) => b.stats.views - a.stats.views)
        break
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return filtered
  }

  // 🔔 EFFECTS
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(navigator.onLine)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 📊 STATISTICS
  const totalCats = cats.length
  const totalBreeders = new Set(cats.map(cat => cat.breeder.name)).size
  const averagePrice = cats.length > 0 ? Math.round(cats.reduce((sum, cat) => sum + cat.price, 0) / cats.length) : 0
  const availableCats = cats.filter(cat => cat.status === 'available').length
  // 🎯 RENDER HOME TAB
  const renderHome = () => {
    const filteredCats = getFilteredAndSortedCats()
    
    return (
      <div className="home-tab">
        {/* HERO SECTION */}
        <div className="hero-main">
          <div className="hero-content">
            <div className="hero-emoji">😻</div>
            <h1 className="hero-title">CAT PURRE</h1>
            <p className="hero-subtitle">Premium Marketplace Kotów Rasowych z Rodowodem</p>
            
            {/* ORGANIZACJE */}
            <div className="organizations-section">
              <h3 className="orgs-title">🏛️ Organizacje Zrzeszające Hodowców w Polsce</h3>
              <div className="organizations-grid">
                {organizations.map(org => (
                  <div key={org.id} className="org-card main-org">
                    <div className="org-logo">{org.logo}</div>
                    <h4 className="org-name">{org.name}</h4>
                    <p className="org-full">{org.fullName}</p>
                    <div className="org-arrow">↓</div>
                    <div className="org-polish">
                      <span className="polish-flag">🇵🇱</span>
                      <span className="polish-name">{org.polishMember}</span>
                    </div>
                    <p className="org-desc">{org.description}</p>
                  </div>
                ))}
              </div>

              <div className="orgs-info">
                <p className="info-text">
                  ℹ️ <strong>Wszystkie koty na CAT PURRE</strong> pochodzą wyłącznie z hodowli 
                  zarejestrowanych w oficjalnych organizacjach felinologicznych (FIFe, WCF, TICA).
                  Każdy kot posiada <strong>pełny rodowód</strong>, testy genetyczne i gwarancję zdrowia.
                </p>
              </div>
            </div>

            {/* STATYSTYKI LIVE */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-icon">🐱</span>
                <span className="stat-number">{availableCats}</span>
                <span className="stat-label">Kotów dostępnych</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-number">{totalBreeders}</span>
                <span className="stat-label">Zweryfikowanych hodowców</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💰</span>
                <span className="stat-number">{averagePrice.toLocaleString('pl-PL')}</span>
                <span className="stat-label">PLN średnia cena</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⭐</span>
                <span className="stat-number">4.97</span>
                <span className="stat-label">Średnia ocena</span>
              </div>
            </div>

            {/* 🐱 20 BREED BUTTONS - NOWA SEKCJA */}
            <div className="breeds-section">
              <h3 className="breeds-title">🎯 Wybierz rasę</h3>
              <div className="breeds-grid">
                {breedsWithCounts.map(breed => (
                  <button
                    key={breed.id}
                    className={`breed-btn ${selectedBreed === breed.id ? 'active' : ''} ${breed.count === 0 ? 'disabled' : ''}`}
                    onClick={() => setSelectedBreed(breed.id)}
                    disabled={breed.count === 0 && breed.id !== 'all'}
                  >
                    <span className="breed-emoji">{breed.emoji}</span>
                    <span className="breed-name">{breed.name}</span>
                    <span className="breed-count">({breed.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SEARCH BAR */}
            <div className="search-section">
              <div className="search-bar-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Szukaj po razie, nazwie, lokalizacji, hodowcy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="search-clear"
                    onClick={() => setSearchQuery('')}
                  >
                    ✖️
                  </button>
                )}
              </div>

              <button 
                className="filters-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                🎛️ Filtry {showFilters ? '▲' : '▼'}
              </button>
            </div>

            {/* ADVANCED FILTERS */}
            {showFilters && (
              <div className="filters-panel">
                <div className="filters-grid">
                  <div className="filter-group">
                    <label className="filter-label">
                      <span className="filter-icon">💰</span>
                      Przedział cenowy: {priceRange[0]} - {priceRange[1]} PLN
                    </label>
                    <div className="price-range-container">
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="500"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="price-slider"
                      />
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="price-slider"
                      />
                    </div>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">
                      <span className="filter-icon">📋</span>
                      Sortuj
                    </label>
                    <select 
                      className="filter-select"
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <option value="featured">Wyróżnione</option>
                      <option value="price_low">Cena rosnąco</option>
                      <option value="price_high">Cena malejąco</option>
                      <option value="age_young">Najmłodsze</option>
                      <option value="age_old">Najstarsze</option>
                      <option value="popular">Najpopularniejsze</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">
                      <span className="filter-icon">👁️</span>
                      Widok
                    </label>
                    <div className="view-mode-buttons">
                      <button 
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => handleViewModeChange('grid')}
                      >
                        ▦ Siatka
                      </button>
                      <button 
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => handleViewModeChange('list')}
                      >
                        ☰ Lista
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  className="filters-reset"
                  onClick={() => {
                    setSelectedBreed('all')
                    setPriceRange([0, 50000])
                    setSearchQuery('')
                    setSortBy('featured')
                  }}
                >
                  🔄 Resetuj filtry
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CATS LISTING */}
        <div className="cats-listing-section">
          <div className="listing-header">
            <h2 className="listing-title">
              🐾 Koty Rasowe z Rodowodem
              <span className="results-badge">{filteredCats.length} wyników</span>
            </h2>
          </div>

          {filteredCats.length > 0 ? (
            <div className={`cats-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
              {filteredCats.map(cat => (
                <div 
                  key={cat.id} 
                  className={`cat-card ${cat.featured ? 'featured' : ''} ${cat.isDemoData ? 'demo-cat' : ''}`}
                  onClick={() => handleViewDetails(cat)}
                >
                  {/* BADGES */}
                  <div className="card-badges">
                    {cat.featured && (
                      <span className="badge featured-badge">⭐ Wyróżnione</span>
                    )}
                    {cat.verified && (
                      <span className="badge verified-badge">✓ Zweryfikowane</span>
                    )}
                    {cat.isDemoData && (
                      <span className="badge demo-badge">🎭 DEMO</span>
                    )}
                  </div>

                  {/* IMAGE */}
                  <div className="card-image-container">
                    <img 
                      src={cat.img} 
                      alt={cat.name}
                      className="card-image"
                      loading="lazy"
                    />
                    
                    {/* PEDIGREE BADGES */}
                    <div className="pedigree-badges">
                      {cat.pedigree.fife && (
                        <span className="pedigree-badge fife">FIFe</span>
                      )}
                      {cat.pedigree.wcf && (
                        <span className="pedigree-badge wcf">WCF</span>
                      )}
                      {cat.pedigree.tica && (
                        <span className="pedigree-badge tica">TICA</span>
                      )}
                    </div>

                    {/* LIKE BUTTON */}
                    <button 
                      className={`like-btn ${likedCats.includes(cat.id) ? 'liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(cat.id)
                      }}
                    >
                      {likedCats.includes(cat.id) ? '❤️' : '🤍'}
                    </button>

                    {/* ADMIN DELETE BUTTON */}
                    {isAdmin && (
                      <button 
                        className="admin-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteCat(cat.id)
                        }}
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  {/* CARD CONTENT */}
                  <div className="card-content">
                    <h3 className="cat-name">{cat.name}</h3>
                    
                    <div className="cat-breed-info">
                      <span className="breed-name">{cat.breed}</span>
                      <span className="breed-separator">•</span>
                      <span className="cat-gender">{cat.gender}</span>
                      <span className="breed-separator">•</span>
                      <span className="cat-age">{cat.age}</span>
                    </div>

                    <div className="cat-color">
                      🎨 {cat.color}
                    </div>

                    {/* BREEDER INFO */}
                    <div className="breeder-mini">
                      <div className="breeder-avatar">👤</div>
                      <div className="breeder-details">
                        <span className="breeder-name">{cat.breeder.name}</span>
                        <div className="breeder-meta">
                          <span className="breeder-rating">⭐ {cat.breeder.rating}</span>
                          <span className="meta-separator">•</span>
                          <span className="breeder-location">📍 {cat.breeder.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* HEALTH STATUS */}
                    <div className="health-mini">
                      {cat.health.hcmTested && cat.health.hcmResult === 'Negatywny' && (
                        <span className="health-badge">❤️ HCM-</span>
                      )}
                      {cat.health.pkdTested && (
                        <span className="health-badge">🧬 PKD-</span>
                      )}
                      {cat.health.vaccinated && (
                        <span className="health-badge">💉 Szczepiony</span>
                      )}
                      {cat.health.microchipped && (
                        <span className="health-badge">🔖 Chip</span>
                      )}
                    </div>

                    {/* PERSONALITY TAGS */}
                    <div className="personality-tags">
                      {cat.personality.slice(0, 3).map((trait, idx) => (
                        <span key={idx} className="personality-tag">
                          {trait}
                        </span>
                      ))}
                    </div>

                    {/* STATS */}
                    <div className="card-stats">
                      <span className="stat">👁️ {cat.stats.views}</span>
                      <span className="stat">❤️ {cat.stats.likes}</span>
                      <span className="stat">💬 {cat.stats.inquiries}</span>
                    </div>

                    {/* PRICE & ACTIONS */}
                    <div className="card-footer">
                      <div className="price-section">
                        <span className="price">{cat.priceFormatted}</span>
                        {cat.availableForBreeding && (
                          <span className="breeding-badge">🏆 Prawa hodowlane</span>
                        )}
                      </div>

                      <div className="card-actions">
                        <button 
                          className="action-btn secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShare(cat)
                          }}
                        >
                          🔗 Udostępnij
                        </button>
                        <button 
                          className="action-btn primary"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleContactBreeder(cat.breeder)
                          }}
                        >
                          💬 Kontakt
                        </button>
                      </div>
                    </div>

                    {/* READY TO GO */}
                    <div className="ready-info">
                      {cat.readyToGo === 'Gotowy do odbioru' ? (
                        <span className="ready-badge available">✅ {cat.readyToGo}</span>
                      ) : (
                        <span className="ready-badge pending">📅 {cat.readyToGo}</span>
                      )}
                    </div>

                    {/* ADMIN QUICK ACTIONS */}
                    {isAdmin && (
                      <div className="admin-quick-actions">
                        <button 
                          className="admin-quick-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFeatured(cat.id)
                          }}
                        >
                          {cat.featured ? '⭐ Usuń wyróżnienie' : '⭐ Wyrózij'}
                        </button>
                        <button 
                          className="admin-quick-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleVerified(cat.id)
                          }}
                        >
                          {cat.verified ? '✓ Odweryfikuj' : '✓ Weryfikuj'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3 className="no-results-title">Brak wyników</h3>
              <p className="no-results-text">
                Nie znaleziono kotów spełniających kryteria wyszukiwania.
                Spróbuj zmienić filtry lub wyszukiwane hasło.
              </p>
              <button 
                className="reset-search-btn"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedBreed('all')
                  setPriceRange([0, 50000])
                }}
              >
                🔄 Resetuj wyszukiwanie
              </button>
            </div>
          )}
        </div>

        {/* WHY CAT PURRE SECTION */}
        <div className="why-section">
          <h2 className="why-title">✨ Dlaczego CAT PURRE?</h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🏆</div>
              <h3 className="why-card-title">Tylko Zweryfikowane Hodowle</h3>
              <p className="why-card-text">
                Współpracujemy wyłącznie z hodowcami zarejestrowanymi w FIFe, WCF i TICA.
                Każda hodowla jest weryfikowana i posiada oficjalny prefix.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">📜</div>
              <h3 className="why-card-title">Pełne Rodowody</h3>
              <p className="why-card-text">
                Wszystkie koty posiadają oficjalne rodowody z międzynarodowych organizacji.
                Minimum 5 pokoleń, często z tytułami championów.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">🧬</div>
              <h3 className="why-card-title">Testy Genetyczne</h3>
              <p className="why-card-text">
                HCM, PKD, FIV/FeLV i inne testy w zależności od rasy.
                Gwarancja zdrowia 24-36 miesięcy.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">💳</div>
              <h3 className="why-card-title">Bezpieczne Transakcje</h3>
              <p className="why-card-text">
                Umowy kupna-sprzedaży, faktury VAT, możliwość płatności online.
                Pełna transparentność i bezpieczeństwo.
              </p>
            </div>
          </div>
        </div>

        {/* TRUST BADGES */}
        <div className="trust-section">
          <div className="trust-badges">
            <div className="trust-badge">
              <span className="trust-icon">🔒</span>
              <span className="trust-text">Bezpieczne płatności</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">✅</span>
              <span className="trust-text">Zweryfikowani hodowcy</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">🛡️</span>
              <span className="trust-text">Gwarancja zdrowia</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">📞</span>
              <span className="trust-text">Wsparcie 24/7</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // ====================================================================
  // 👑 RENDER ADMIN PANEL - 10 FUNKCJI ADMIN
  // ====================================================================
  
  const renderAdminPanel = () => {
    if (!showAdminPanel) return null

    const demoCatsCount = cats.filter(c => c.isDemoData).length
    const realCatsCount = cats.filter(c => !c.isDemoData).length
    const featuredCount = cats.filter(c => c.featured).length
    const verifiedCount = cats.filter(c => c.verified).length

    return (
      <div className="admin-panel-overlay">
        <div className="admin-panel-container">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">👑 Panel Administratora</h2>
            <button className="admin-panel-close" onClick={() => setShowAdminPanel(false)}>✖️</button>
          </div>

          <div className="admin-panel-content">
            {/* STATYSTYKI ADMIN */}
            <div className="admin-stats-section">
              <h3 className="admin-section-title">📊 Statystyki</h3>
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">🐱</div>
                  <div className="admin-stat-value">{totalCats}</div>
                  <div className="admin-stat-label">Wszystkich kotów</div>
                </div>
                <div className="admin-stat-card demo">
                  <div className="admin-stat-icon">🎭</div>
                  <div className="admin-stat-value">{demoCatsCount}</div>
                  <div className="admin-stat-label">Koty demo</div>
                </div>
                <div className="admin-stat-card real">
                  <div className="admin-stat-icon">✅</div>
                  <div className="admin-stat-value">{realCatsCount}</div>
                  <div className="admin-stat-label">Prawdziwe koty</div>
                </div>
                <div className="admin-stat-card featured">
                  <div className="admin-stat-icon">⭐</div>
                  <div className="admin-stat-value">{featuredCount}</div>
                  <div className="admin-stat-label">Wyróżnione</div>
                </div>
                <div className="admin-stat-card verified">
                  <div className="admin-stat-icon">✓</div>
                  <div className="admin-stat-value">{verifiedCount}</div>
                  <div className="admin-stat-label">Zweryfikowane</div>
                </div>
                <div className="admin-stat-card breeders">
                  <div className="admin-stat-icon">👥</div>
                  <div className="admin-stat-value">{totalBreeders}</div>
                  <div className="admin-stat-label">Hodowców</div>
                </div>
              </div>
            </div>

            {/* FUNKCJA 1: USUWANIE DEMO KOTÓW */}
            <div className="admin-function-section">
              <h3 className="admin-section-title">🗑️ Zarządzanie kotami demo</h3>
              <div className="admin-function-card">
                <p className="admin-function-desc">
                  Usuń wszystkie koty demo ({demoCatsCount} sztuk) jednym kliknięciem.
                  Ta operacja jest nieodwracalna!
                </p>
                <button 
                  className="admin-btn danger"
                  onClick={deleteAllDemoCats}
                  disabled={demoCatsCount === 0}
                >
                  🗑️ Usuń wszystkie koty demo ({demoCatsCount})
                </button>
              </div>
            </div>

            {/* FUNKCJA 2: MASOWE OPERACJE */}
            <div className="admin-function-section">
              <h3 className="admin-section-title">⚡ Masowe operacje</h3>
              <div className="admin-function-grid">
                <button 
                  className="admin-btn success"
                  onClick={() => {
                    setCats(cats.map(cat => ({ ...cat, verified: true })))
                    showNotification('✅ Wszystkie koty zweryfikowane', '✓')
                  }}
                >
                  ✓ Weryfikuj wszystkie
                </button>
                <button 
                  className="admin-btn warning"
                  onClick={() => {
                    setCats(cats.map(cat => ({ ...cat, featured: false })))
                    showNotification('⭐ Usunięto wszystkie wyróżnienia', '⭐')
                  }}
                >
                  ⭐ Usuń wyróżnienia
                </button>
                <button 
                  className="admin-btn info"
                  onClick={() => {
                    setCats(cats.map(cat => ({ 
                      ...cat, 
                      stats: { ...cat.stats, views: 0, likes: 0, shares: 0, inquiries: 0 }
                    })))
                    showNotification('📊 Zresetowano statystyki', '📊')
                  }}
                >
                  📊 Resetuj statystyki
                </button>
                <button 
                  className="admin-btn danger"
                  onClick={() => {
                    if (window.confirm('❌ Usunąć WSZYSTKIE koty?')) {
                      setCats([])
                      showNotification('🗑️ Usunięto wszystkie koty', '🗑️')
                    }
                  }}
                >
                  🗑️ Usuń wszystkie
                </button>
              </div>
            </div>

            {/* FUNKCJA 3: EKSPORT/IMPORT DANYCH */}
            <div className="admin-function-section">
              <h3 className="admin-section-title">💾 Eksport / Import</h3>
              <div className="admin-function-grid">
                <button 
                  className="admin-btn info"
                  onClick={() => {
                    const dataStr = JSON.stringify(cats, null, 2)
                    const dataBlob = new Blob([dataStr], { type: 'application/json' })
                    const url = URL.createObjectURL(dataBlob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `catpurre-backup-${Date.now()}.json`
                    link.click()
                    showNotification('✅ Dane wyeksportowane', '💾')
                  }}
                >
                  💾 Eksportuj JSON
                </button>
                <button 
                  className="admin-btn info"
                  onClick={() => {
                    const csv = [
                      ['ID', 'Nazwa', 'Rasa', 'Cena', 'Hodowca', 'Status'].join(','),
                      ...cats.map(cat => [
                        cat.id,
                        cat.name,
                        cat.breed,
                        cat.price,
                        cat.breeder.name,
                        cat.status
                      ].join(','))
                    ].join('\n')
                    const blob = new Blob([csv], { type: 'text/csv' })
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `catpurre-export-${Date.now()}.csv`
                    link.click()
                    showNotification('✅ CSV wyeksportowany', '📄')
                  }}
                >
                  📄 Eksportuj CSV
                </button>
              </div>
            </div>

            {/* FUNKCJA 4: GENEROWANIE RAPORTÓW */}
            <div className="admin-function-section">
              <h3 className="admin-section-title">📈 Raporty</h3>
              <div className="admin-report-card">
                <div className="report-item">
                  <span className="report-label">Najdroższy kot:</span>
                  <span className="report-value">
                    {cats.reduce((max, cat) => cat.price > max.price ? cat : max, cats[0])?.name || 'Brak'} 
                    ({Math.max(...cats.map(c => c.price)).toLocaleString('pl-PL')} PLN)
                  </span>
                </div>
                <div className="report-item">
                  <span className="report-label">Najtańszy kot:</span>
                  <span className="report-value">
                    {cats.reduce((min, cat) => cat.price < min.price ? cat : min, cats[0])?.name || 'Brak'}
                    ({Math.min(...cats.map(c => c.price)).toLocaleString('pl-PL')} PLN)
                  </span>
                </div>
                <div className="report-item">
                  <span className="report-label">Najpopularniejszy:</span>
                  <span className="report-value">
                    {cats.reduce((max, cat) => cat.stats.views > max.stats.views ? cat : max, cats[0])?.name || 'Brak'}
                    ({Math.max(...cats.map(c => c.stats.views))} wyświetleń)
                  </span>
                </div>
                <div className="report-item">
                  <span className="report-label">Najpopularniejsza rasa:</span>
                  <span className="report-value">
                    {cats.reduce((acc, cat) => {
                      acc[cat.breed] = (acc[cat.breed] || 0) + 1
                      return acc
                    }, {})}
                    {Object.entries(cats.reduce((acc, cat) => {
                      acc[cat.breed] = (acc[cat.breed] || 0) + 1
                      return acc
                    }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Brak'}
                  </span>
                </div>
              </div>
            </div>

            {/* FUNKCJA 5: LISTA WSZYSTKICH KOTÓW Z AKCJAMI */}
            <div className="admin-function-section">
              <h3 className="admin-section-title">📋 Lista wszystkich kotów</h3>
              <div className="admin-cats-table">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Zdjęcie</th>
                      <th>Nazwa</th>
                      <th>Rasa</th>
                      <th>Cena</th>
                      <th>Status</th>
                      <th>Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cats.map(cat => (
                      <tr key={cat.id} className={cat.isDemoData ? 'demo-row' : ''}>
                        <td>{cat.id}</td>
                        <td>
                          <img src={cat.img} alt={cat.name} className="admin-table-img" />
                        </td>
                        <td>
                          {cat.name}
                          {cat.isDemoData && <span className="demo-tag">DEMO</span>}
                        </td>
                        <td>{cat.breed}</td>
                        <td>
                          <input 
                            type="number" 
                            value={cat.price}
                            onChange={(e) => updateCatPrice(cat.id, parseInt(e.target.value))}
                            className="admin-price-input"
                          />
                        </td>
                        <td>
                          <div className="status-badges">
                            {cat.featured && <span className="mini-badge featured">⭐</span>}
                            {cat.verified && <span className="mini-badge verified">✓</span>}
                          </div>
                        </td>
                        <td>
                          <div className="admin-table-actions">
                            <button 
                              className="admin-table-btn view"
                              onClick={() => handleViewDetails(cat)}
                              title="Zobacz"
                            >
                              👁️
                            </button>
                            <button 
                              className="admin-table-btn edit"
                              onClick={() => toggleFeatured(cat.id)}
                              title="Wyróżnij"
                            >
                              ⭐
                            </button>
                            <button 
                              className="admin-table-btn verify"
                              onClick={() => toggleVerified(cat.id)}
                              title="Weryfikuj"
                            >
                              ✓
                            </button>
                            <button 
                              className="admin-table-btn delete"
                              onClick={() => deleteCat(cat.id)}
                              title="Usuń"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FUNKCJA 6-10: DODATKOWE FUNKCJE */}
            <div className="admin-function-section">
              <h3 className="admin-section-title">🎯 Dodatkowe funkcje</h3>
              <div className="admin-advanced-grid">
                <div className="admin-advanced-card">
                  <div className="advanced-icon">📧</div>
                  <h4 className="advanced-title">Email hodowcom</h4>
                  <p className="advanced-desc">Wyślij masowego maila do wszystkich hodowców</p>
                  <button className="admin-btn-small info">📧 Wyślij email</button>
                </div>

                <div className="admin-advanced-card">
                  <div className="advanced-icon">📱</div>
                  <h4 className="advanced-title">SMS marketing</h4>
                  <p className="advanced-desc">Kampania SMS do zainteresowanych</p>
                  <button className="admin-btn-small info">📱 Wyślij SMS</button>
                </div>

                <div className="admin-advanced-card">
                  <div className="advanced-icon">🎨</div>
                  <h4 className="advanced-title">Generuj promocje</h4>
                  <p className="advanced-desc">Automatyczne promocje % off</p>
                  <button 
                    className="admin-btn-small success"
                    onClick={() => {
                      setCats(cats.map(cat => ({
                        ...cat,
                        price: Math.round(cat.price * 0.9),
                        priceFormatted: `${Math.round(cat.price * 0.9).toLocaleString('pl-PL')} PLN`
                      })))
                      showNotification('🎉 -10% dla wszystkich!', '🎨')
                    }}
                  >
                    🎨 -10% wszystko
                  </button>
                </div>

                <div className="admin-advanced-card">
                  <div className="advanced-icon">🔔</div>
                  <h4 className="advanced-title">Push notification</h4>
                  <p className="advanced-desc">Wyślij powiadomienie push</p>
                  <button className="admin-btn-small warning">🔔 Wyślij push</button>
                </div>

                <div className="admin-advanced-card">
                  <div className="advanced-icon">🤖</div>
                  <h4 className="advanced-title">AI Opis</h4>
                  <p className="advanced-desc">Generuj opisy kotów AI</p>
                  <button className="admin-btn-small info">🤖 Generuj</button>
                </div>

                <div className="admin-advanced-card">
                  <div className="advanced-icon">📊</div>
                  <h4 className="advanced-title">Analytics</h4>
                  <p className="advanced-desc">Dashboard analityczny</p>
                  <button className="admin-btn-small info">📊 Otwórz</button>
                </div>

                <div className="admin-advanced-card">
                  <div className="advanced-icon">💳</div>
                  <h4 className="advanced-title">Płatności</h4>
                  <p className="advanced-desc">Historia transakcji</p>
                  <button className="admin-btn-small success">💳 Zobacz</button>
                </div>

                <div className="admin-advanced-card">
                  <div className="advanced-icon">👥</div>
                  <h4 className="advanced-title">Użytkownicy</h4>
                  <p className="advanced-desc">Zarządzaj kontami</p>
                  <button className="admin-btn-small info">👥 Zarządzaj</button>
                </div>

                <div className="admin-advanced-card">
                  <div className="advanced-icon">⚙️</div>
                  <h4 className="advanced-title">Ustawienia</h4>
                  <p className="advanced-desc">Konfiguracja systemu</p>
                  <button className="admin-btn-small warning">⚙️ Konfiguruj</button>
                </div>

                <div className="admin-advanced-card">
                  <div className="advanced-icon">🔒</div>
                  <h4 className="advanced-title">Logi systemu</h4>
                  <p className="advanced-desc">Historia aktywności</p>
                  <button className="admin-btn-small info">🔒 Pokaż logi</button>
                </div>
              </div>
            </div>

            {/* WYLOGUJ */}
            <div className="admin-logout-section">
              <button className="admin-btn danger" onClick={adminLogout}>
                🔓 Wyloguj z panelu admina
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 🎯 MODAL SZCZEGÓŁÓW KOTA
  const renderModal = () => {
    if (!showModal || !selectedCat) return null

    return (
      <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleCloseModal}>✖️</button>
          
          <div className="modal-content">
            <div className="modal-left">
              <div className="modal-gallery">
                <img 
                  src={selectedCat.img} 
                  alt={selectedCat.name}
                  className="modal-main-image"
                />
              </div>
            </div>

            <div className="modal-right">
              <div className="modal-header">
                <h2 className="modal-cat-name">{selectedCat.name}</h2>
                <div className="modal-breed-line">
                  <span className="modal-breed">{selectedCat.breed}</span>
                  <span className="modal-separator">•</span>
                  <span className="modal-color">{selectedCat.color}</span>
                </div>
              </div>

              <div className="modal-price-box">
                <span className="modal-price">{selectedCat.priceFormatted}</span>
                {selectedCat.availableForBreeding && (
                  <span className="breeding-rights">🏆 Z prawami hodowlanymi</span>
                )}
              </div>

              <div className="modal-section">
                <h3 className="section-title">📋 Podstawowe informacje</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Płeć</span>
                    <span className="info-value">{selectedCat.gender}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Wiek</span>
                    <span className="info-value">{selectedCat.age}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status</span>
                    <span className="info-value status-available">Dostępny</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Gotowy do odbioru</span>
                    <span className="info-value">{selectedCat.readyToGo}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3 className="section-title">📜 Rodowód</h3>
                <div className="pedigree-details">
                  <div className="pedigree-orgs">
                    {selectedCat.pedigree.fife && <span className="pedigree-org-badge fife">FIFe</span>}
                    {selectedCat.pedigree.wcf && <span className="pedigree-org-badge wcf">WCF</span>}
                    {selectedCat.pedigree.tica && <span className="pedigree-org-badge tica">TICA</span>}
                  </div>
                  <div className="pedigree-stats">
                    <span className="pedigree-stat">{selectedCat.pedigree.generations} pokoleń</span>
                    <span className="pedigree-stat">{selectedCat.pedigree.champions} championów</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3 className="section-title">🏥 Zdrowie i Testy</h3>
                <div className="health-grid">
                  <div className="health-item positive">
                    <span className="health-icon">💉</span>
                    <span className="health-text">Szczepiony</span>
                  </div>
                  <div className="health-item positive">
                    <span className="health-icon">🔖</span>
                    <span className="health-text">Chip</span>
                  </div>
                  {selectedCat.health.hcmTested && (
                    <div className="health-item positive">
                      <span className="health-icon">❤️</span>
                      <span className="health-text">HCM {selectedCat.health.hcmResult}</span>
                    </div>
                  )}
                  {selectedCat.health.pkdTested && (
                    <div className="health-item positive">
                      <span className="health-icon">🧬</span>
                      <span className="health-text">PKD {selectedCat.health.pkdResult}</span>
                    </div>
                  )}
                </div>
                <div className="health-guarantee">
                  <span className="guarantee-icon">🛡️</span>
                  <span className="guarantee-text">
                    Gwarancja zdrowia <strong>{selectedCat.health.healthGuarantee}</strong>
                  </span>
                </div>
              </div>

              <div className="modal-section">
                <h3 className="section-title">✨ Osobowość</h3>
                <div className="personality-list">
                  {selectedCat.personality.map((trait, idx) => (
                    <span key={idx} className="personality-tag-large">{trait}</span>
                  ))}
                </div>
              </div>

              <div className="modal-section breeder-section">
                <h3 className="section-title">👤 Hodowca</h3>
                <div className="breeder-card-full">
                  <div className="breeder-header">
                    <div className="breeder-avatar-large">👤</div>
                    <div className="breeder-main-info">
                      <h4 className="breeder-prefix">{selectedCat.breeder.name}</h4>
                      <div className="breeder-owner">Właściciel: {selectedCat.breeder.owner}</div>
                      <div className="breeder-rating-large">
                        <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                        <span className="rating-value">{selectedCat.breeder.rating}</span>
                        <span className="rating-count">({selectedCat.breeder.reviewsCount} opinii)</span>
                      </div>
                    </div>
                  </div>
                  <div className="breeder-details-grid">
                    <div className="breeder-detail">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{selectedCat.breeder.location}</span>
                    </div>
                    <div className="breeder-detail">
                      <span className="detail-icon">📞</span>
                      <span className="detail-text">{selectedCat.breeder.phone}</span>
                    </div>
                    <div className="breeder-detail">
                      <span className="detail-icon">📧</span>
                      <span className="detail-text">{selectedCat.breeder.email}</span>
                    </div>
                    <div className="breeder-detail">
                      <span className="detail-icon">🏛️</span>
                      <span className="detail-text">{selectedCat.breeder.organization}</span>
                    </div>
                  </div>
                  <button 
                    className="contact-breeder-btn"
                    onClick={() => handleContactBreeder(selectedCat.breeder)}
                  >
                    💬 Kontakt z hodowcą
                  </button>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="modal-action-btn favorite"
                  onClick={() => toggleFavorite(selectedCat)}
                >
                  {favorites.some(f => f.id === selectedCat.id) ? '❤️ Ulubione' : '🤍 Dodaj do ulubionych'}
                </button>
                <button 
                  className="modal-action-btn compare"
                  onClick={() => handleAddToComparison(selectedCat)}
                >
                  ⚖️ Porównaj
                </button>
                <button 
                  className="modal-action-btn share"
                  onClick={() => handleShare(selectedCat)}
                >
                  🔗 Udostępnij
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ⚖️ RENDER COMPARISON
  const renderComparison = () => {
    if (!showComparison || comparisonCats.length === 0) return null

    return (
      <div className="comparison-panel">
        <div className="comparison-header">
          <h3 className="comparison-title">⚖️ Porównanie kotów ({comparisonCats.length}/3)</h3>
          <button className="comparison-close" onClick={() => setShowComparison(false)}>✖️</button>
        </div>

        <div className="comparison-table">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-label">Kategoria</th>
                {comparisonCats.map(cat => (
                  <th key={cat.id} className="compare-cat-header">
                    <img src={cat.img} alt={cat.name} className="compare-cat-img" />
                    <span className="compare-cat-name">{cat.name}</span>
                    <button 
                      className="remove-compare-btn"
                      onClick={() => handleRemoveFromComparison(cat.id)}
                    >
                      ✖️
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="label">Rasa</td>
                {comparisonCats.map(cat => <td key={cat.id}>{cat.breed}</td>)}
              </tr>
              <tr>
                <td className="label">Cena</td>
                {comparisonCats.map(cat => <td key={cat.id} className="price">{cat.priceFormatted}</td>)}
              </tr>
              <tr>
                <td className="label">Wiek</td>
                {comparisonCats.map(cat => <td key={cat.id}>{cat.age}</td>)}
              </tr>
              <tr>
                <td className="label">Kolor</td>
                {comparisonCats.map(cat => <td key={cat.id}>{cat.color}</td>)}
              </tr>
              <tr>
                <td className="label">Rodowód</td>
                {comparisonCats.map(cat => (
                  <td key={cat.id}>
                    {cat.pedigree.fife && <span className="badge-mini fife">FIFe</span>}
                    {cat.pedigree.wcf && <span className="badge-mini wcf">WCF</span>}
                    {cat.pedigree.tica && <span className="badge-mini tica">TICA</span>}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="label">Osobowość</td>
                {comparisonCats.map(cat => <td key={cat.id}>{cat.personality.join(', ')}</td>)}
              </tr>
              <tr>
                <td className="label">Hodowca</td>
                {comparisonCats.map(cat => <td key={cat.id}>{cat.breeder.name}</td>)}
              </tr>
              <tr>
                <td className="label">Akcja</td>
                {comparisonCats.map(cat => (
                  <td key={cat.id}>
                    <button 
                      className="view-detail-btn"
                      onClick={() => handleViewDetails(cat)}
                    >
                      👁️ Zobacz
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  // 🤖 RENDER AI CHAT
  const renderAIChat = () => (
    <div className={`ai-chat-widget ${showAIChat ? 'open' : ''}`}>
      <div className="ai-chat-header">
        <div className="ai-avatar">🤖</div>
        <div className="ai-info">
          <h4 className="ai-name">AI Doradca CAT PURRE</h4>
          <span className="ai-status">🟢 Online • Odpowiada natychmiast</span>
        </div>
        <button className="ai-close" onClick={() => setShowAIChat(false)}>✖️</button>
      </div>

      <div className="ai-messages">
        {aiMessages.map(msg => (
          <div key={msg.id} className={`ai-message ${msg.sender}`}>
            {msg.sender === 'ai' && <div className="msg-avatar">🤖</div>}
            <div className="msg-bubble">
              <p className="msg-text">{msg.text}</p>
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="msg-suggestions">
                  {msg.suggestions.map((sug, idx) => (
                    <button 
                      key={idx} 
                      className="suggestion-btn"
                      onClick={() => {
                        setAiInput(sug)
                        handleSendAIMessage()
                      }}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
              {msg.recommendedCats && msg.recommendedCats.length > 0 && (
                <div className="recommended-cats-mini">
                  <h5 className="rec-title">Polecane koty:</h5>
                  <div className="rec-cats-grid">
                    {msg.recommendedCats.map(catId => {
                      const cat = cats.find(c => c.id === catId)
                      return cat ? (
                        <div 
                          key={catId} 
                          className="rec-cat-card"
                          onClick={() => {
                            handleViewDetails(cat)
                            setShowAIChat(false)
                          }}
                        >
                          <img src={cat.img} alt={cat.name} className="rec-cat-img" />
                          <div className="rec-cat-info">
                            <span className="rec-cat-name">{cat.name}</span>
                            <span className="rec-cat-price">{cat.priceFormatted}</span>
                          </div>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
            <span className="msg-time">
              {new Date(msg.timestamp).toLocaleTimeString('pl-PL', {hour: '2-digit', minute: '2-digit'})}
            </span>
          </div>
        ))}
        {aiTyping && (
          <div className="ai-message ai">
            <div className="msg-avatar">🤖</div>
            <div className="msg-bubble typing">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
      </div>

      <div className="ai-input-container">
        <input
          type="text"
          className="ai-input"
          placeholder="Zadaj pytanie AI Doradcy..."
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendAIMessage()
          }}
        />
        <button className="ai-send-btn" onClick={handleSendAIMessage}>
          ➤
        </button>
      </div>
    </div>
  )

  // 🤖 FLOATING AI BUTTON
  const renderFloatingAIButton = () => (
    <button 
      className="floating-ai-btn" 
      onClick={() => setShowAIChat(!showAIChat)}
      title="AI Doradca"
    >
      🤖
      <span className="ai-pulse"></span>
    </button>
  )

  // ❤️ RENDER FAVORITES PANEL
  const renderFavoritesPanel = () => {
    if (!showFavoritesPanel) return null

    return (
      <div className="favorites-panel">
        <div className="favorites-header">
          <h3 className="favorites-title">❤️ Ulubione ({favorites.length})</h3>
          <button className="favorites-close" onClick={() => setShowFavoritesPanel(false)}>✖️</button>
        </div>

        <div className="favorites-tabs">
          <button className="fav-tab active">❤️ Ulubione ({favorites.length})</button>
          <button className="fav-tab">🕒 Ostatnio oglądane ({viewHistory.length})</button>
        </div>

        <div className="favorites-content">
          {favorites.length > 0 ? (
            <div className="favorites-grid">
              {favorites.map(cat => (
                <div key={cat.id} className="favorite-card" onClick={() => handleViewDetails(cat)}>
                  <img src={cat.img} alt={cat.name} className="favorite-img" />
                  <div className="favorite-info">
                    <h4 className="favorite-name">{cat.name}</h4>
                    <p className="favorite-breed">{cat.breed}</p>
                    <p className="favorite-price">{cat.priceFormatted}</p>
                  </div>
                  <button 
                    className="remove-favorite-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(cat)
                    }}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-favorites">
              <div className="empty-icon">💔</div>
              <p>Nie masz jeszcze ulubionych kotów</p>
              <p className="empty-hint">Kliknij ❤️ na karcie kota aby dodać do ulubionych</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 🔔 RENDER NOTIFICATIONS
  const renderNotifications = () => (
    <div className={`notifications-dropdown ${showNotifications ? 'open' : ''}`}>
      <div className="notif-header">
        <h4 className="notif-title">🔔 Powiadomienia ({unreadCount})</h4>
        <button className="notif-close" onClick={() => setShowNotifications(false)}>✖️</button>
      </div>

      <div className="notif-list">
        {notificationsList.length > 0 ? (
          notificationsList.map(notif => (
            <div 
              key={notif.id} 
              className={`notif-item ${notif.unread ? 'unread' : ''}`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="notif-icon">{notif.icon}</div>
              <div className="notif-content">
                <p className="notif-text">{notif.text}</p>
                <span className="notif-time">{notif.time}</span>
              </div>
              {notif.unread && <div className="notif-dot"></div>}
            </div>
          ))
        ) : (
          <div className="empty-notif">
            <div className="empty-icon">🔕</div>
            <p>Brak powiadomień</p>
          </div>
        )}
      </div>

      <div className="notif-footer">
        <button className="notif-clear-btn" onClick={() => setNotificationsList([])}>
          🗑️ Wyczyść wszystkie
        </button>
      </div>
    </div>
  )

  // ====================================================================
  // 🎯 MAIN RENDER - NAJWAŻNIEJSZE!
  // ====================================================================

  return (
    <div className="App">
      {/* HEADER NAV */}
      <header className="app-header">
        <div className="header-container">
          <div className="logo-section">
            <h1 className="app-logo">😻 CAT PURRE</h1>
          </div>

          <nav className="main-nav">
            <button 
              className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              🏠 Główna
            </button>
            <button 
              className="nav-btn"
              onClick={() => setShowFavoritesPanel(true)}
            >
              ❤️ Ulubione ({favorites.length})
            </button>
            <button 
              className="nav-btn"
              onClick={() => setShowComparison(true)}
            >
              ⚖️ Porównaj ({comparisonCats.length})
            </button>
            
            {/* ADMIN LOGIN/PANEL BUTTON */}
            {!isAdmin ? (
              <div className="admin-login-inline">
                <input
                  type="password"
                  className="admin-password-input"
                  placeholder="Hasło admin..."
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') adminLogin()
                  }}
                />
                <button className="nav-btn admin" onClick={adminLogin}>
                  👑 Admin
                </button>
              </div>
            ) : (
              <button 
                className="nav-btn admin active"
                onClick={() => setShowAdminPanel(true)}
              >
                👑 Panel Admina
              </button>
            )}
          </nav>

          <div className="header-actions">
            <button 
              className="header-icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
            </button>
            <button 
              className="header-icon-btn"
              onClick={() => {
                if (cartItems.length > 0) {
                  alert(`🛒 Koszyk:\n\n${cartItems.map(cat => `${cat.name} - ${cat.priceFormatted}`).join('\n')}\n\nSuma: ${cartItems.reduce((sum, cat) => sum + cat.price, 0).toLocaleString('pl-PL')} PLN`)
                } else {
                  alert('🛒 Koszyk jest pusty')
                }
              }}
            >
              🛒 ({cartItems.length})
            </button>
            <button className="header-icon-btn">
              👤 Konto
            </button>
          </div>
        </div>
      </header>

      {/* NOTIFICATIONS DROPDOWN */}
      {renderNotifications()}

      {/* MAIN CONTENT */}
      <main className="app-main">
        {activeTab === 'home' && renderHome()}
      </main>

      {/* MODAL */}
      {renderModal()}

      {/* ADMIN PANEL */}
      {renderAdminPanel()}

      {/* AI CHAT */}
      {renderAIChat()}
      {renderFloatingAIButton()}

      {/* COMPARISON */}
      {renderComparison()}

      {/* FAVORITES PANEL */}
      {renderFavoritesPanel()}

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-logo">
              <h3>😻 CAT PURRE</h3>
              <p>Premium Marketplace Kotów Rasowych</p>
            </div>
            <div className="footer-section">
              <h4>🔗 Linki</h4>
              <a href="#">Regulamin</a>
              <a href="#">Polityka Prywatności</a>
              <a href="#">Kontakt</a>
              <a href="#">FAQ</a>
            </div>
            <div className="footer-section">
              <h4>🏛️ Organizacje</h4>
              <a href="https://fifeweb.org" target="_blank" rel="noopener noreferrer">FIFe</a>
              <a href="https://wcf-online.de" target="_blank" rel="noopener noreferrer">WCF</a>
              <a href="https://tica.org" target="_blank" rel="noopener noreferrer">TICA</a>
              <a href="https://fpl.pl" target="_blank" rel="noopener noreferrer">FPL</a>
            </div>
            <div className="footer-section">
              <h4>📱 Social Media</h4>
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">YouTube</a>
              <a href="#">TikTok</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 CAT PURRE - Wszelkie prawa zastrzeżone</p>
            <p className="footer-stats">
              {totalCats} kotów • {totalBreeders} hodowców • {availableCats} dostępnych
            </p>
          </div>
        </div>
      </footer>

      {/* STATUS INDICATOR */}
      <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </div>

      {/* ADMIN BADGE */}
      {isAdmin && (
        <div className="admin-badge-indicator">
          👑 Tryb Administratora
        </div>
      )}

      {/* QUICK STATS OVERLAY */}
      {isAdmin && (
        <div className="quick-stats-overlay">
          <div className="quick-stat">🐱 {totalCats}</div>
          <div className="quick-stat">⭐ {cats.filter(c => c.featured).length}</div>
          <div className="quick-stat">✓ {cats.filter(c => c.verified).length}</div>
          <div className="quick-stat">🎭 {cats.filter(c => c.isDemoData).length}</div>
        </div>
      )}
    </div>
  )
}

// ====================================================================
// 🎯 EXPORT - KONIEC APLIKACJI
// ====================================================================

export default App
