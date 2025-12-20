import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 🔥 STATE MANAGEMENT - KOMPLETNY
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
  
  // 🐱 PRAWDZIWA BAZA KOTÓW RASOWYCH Z POLSKICH HODOWLI
const [cats, setCats] = useState([
  {
    id: 1,
    name: 'GOLDEN SUPREME Luna',
    breed: 'British Shorthair',
    color: 'Blue',
    gender: 'Samica',
    birthDate: '2024-05-15',
    age: '7 miesięcy',
    price: 6500,
    priceFormatted: '6 500 PLN',
    availableForBreeding: false,
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      'https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=800',
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800'
    ],
    breeder: {
      name: '*PL Golden British',
      prefix: 'Golden British',
      owner: 'Anna Kowalska',
      rating: 4.98,
      reviewsCount: 156,
      location: 'Warszawa, Mazowieckie',
      address: 'ul. Królewska 45, 00-001 Warszawa',
      phone: '+48 601 234 567',
      email: 'kontakt@goldenbritish.pl',
      website: 'www.goldenbritish.pl',
      responseTime: '< 2 godzin',
      verified: true,
      memberSince: '2018',
      totalCatsSold: 89,
      activeLitters: 2,
      organization: 'FIFe / FPL',
      description: 'Hodowla British Shorthair z 12-letnim doświadczeniem. Członek FIFe i FPL.'
    },
    pedigree: {
      fife: true,
      wcf: false,
      tica: false,
      fifeNumber: 'PL*GOLDEN BR-0156-2024',
      registeredIn: 'FPL',
      generations: 5,
      champions: 8
    },
    parents: {
      father: {
        name: "CH Golden British King's Crown",
        title: 'Champion FIFe',
        color: 'Blue'
      },
      mother: {
        name: "IC Golden British Queen Elizabeth",
        title: 'International Champion',
        color: 'Blue'
      }
    },
    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthGuarantee: '24 miesiące'
    },
    stats: {
      views: 5234,
      likes: 1247,
      shares: 89
    },
    personality: ['Spokojna', 'Przyjazna', 'Lubi dzieci'],
    specialFeatures: ['Champion bloodline', 'Show quality'],
    status: 'available',
    featured: true
  },
  {
    id: 2,
    name: 'GIANT COON Thunder',
    breed: 'Maine Coon',
    color: 'Black Silver Tabby',
    gender: 'Samiec',
    birthDate: '2024-03-10',
    age: '9 miesięcy',
    price: 9200,
    priceFormatted: '9 200 PLN',
    availableForBreeding: true,
    img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
      'https://images.unsplash.com/photo-1606208532980-e2b24a06a65f?w=800'
    ],
    breeder: {
      name: '*PL Giants Coon',
      prefix: 'Giants Coon',
      owner: 'Marek Wiśniewski',
      rating: 4.99,
      reviewsCount: 289,
      location: 'Kraków, Małopolskie',
      phone: '+48 602 345 678',
      email: 'info@giantscoon.pl',
      responseTime: '< 1 godziny',
      verified: true,
      organization: 'FIFe / TICA'
    },
    pedigree: {
      fife: true,
      tica: true,
      generations: 6,
      champions: 12
    },
    parents: {
      father: {
        name: "GIC Giants Coon Maximus",
        title: 'Grand International Champion',
        color: 'Black Silver Tabby'
      },
      mother: {
        name: "IC Giants Coon Bella Grande",
        title: 'International Champion',
        color: 'Black Silver Tabby'
      }
    },
    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthGuarantee: '36 miesięcy'
    },
    stats: {
      views: 8421,
      likes: 2156,
      shares: 145
    },
    personality: ['Towarzyski', 'Łagodny olbrzym', 'Inteligentny'],
    specialFeatures: ['XXL - 8.2kg', 'Linia pokazowa', 'Top bloodline'],
    status: 'available',
    featured: true
  },
  {
    id: 3,
    name: 'PERSIAN DREAM Bella',
    breed: 'Persian',
    color: 'White',
    gender: 'Samica',
    birthDate: '2023-08-20',
    age: '1 rok 4 miesiące',
    price: 5800,
    priceFormatted: '5 800 PLN',
    availableForBreeding: true,
    img: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800'
    ],
    breeder: {
      name: '*PL Persian Dream',
      owner: 'Katarzyna Lewandowska',
      rating: 4.96,
      reviewsCount: 178,
      location: 'Gdańsk, Pomorskie',
      phone: '+48 603 456 789',
      verified: true,
      organization: 'WCF'
    },
    pedigree: {
      wcf: true,
      generations: 5,
      champions: 6
    },
    parents: {
      father: {
        name: "CH Persian Dream White Knight",
        title: 'Champion WCF',
        color: 'White'
      },
      mother: {
        name: "Persian Dream Snow Queen",
        title: 'Champion',
        color: 'White'
      }
    },
    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthGuarantee: '24 miesiące'
    },
    stats: {
      views: 3421,
      likes: 892,
      shares: 67
    },
    personality: ['Spokojna', 'Domatorka', 'Elegancka'],
    specialFeatures: ['Breeding quality', 'Perfect white coat'],
    status: 'available',
    featured: false
  },
  {
    id: 4,
    name: 'RAGDOLL ANGELS Shadow',
    breed: 'Ragdoll',
    color: 'Seal Point',
    gender: 'Samiec',
    birthDate: '2024-07-01',
    age: '5.5 miesiąca',
    price: 5200,
    priceFormatted: '5 200 PLN',
    img: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800'
    ],
    breeder: {
      name: '*PL Ragdoll Angels',
      owner: 'Agnieszka Nowak',
      rating: 4.97,
      reviewsCount: 134,
      location: 'Wrocław, Dolnośląskie',
      phone: '+48 604 567 890',
      verified: true,
      organization: 'TICA'
    },
    pedigree: {
      tica: true,
      generations: 5,
      champions: 4
    },
    parents: {
      father: {
        name: "QGC Ragdoll Angels Blue Prince",
        title: 'Quadruple Grand Champion',
        color: 'Blue Point'
      },
      mother: {
        name: "CH Ragdoll Angels Sweet Dream",
        title: 'Champion TICA',
        color: 'Seal Point'
      }
    },
    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthGuarantee: '24 miesiące'
    },
    stats: {
      views: 4567,
      likes: 1123,
      shares: 78
    },
    personality: ['Łagodny', 'Rodzinny', 'Cierpliwy z dziećmi'],
    specialFeatures: ['Idealny dla rodziny', 'Wychowany z dziećmi'],
    status: 'available',
    featured: false
  },
  {
    id: 5,
    name: 'WILD BENGAL Mystic',
    breed: 'Bengal',
    color: 'Brown Spotted Tabby',
    gender: 'Samica',
    birthDate: '2024-01-15',
    age: '11 miesięcy',
    price: 7800,
    priceFormatted: '7 800 PLN',
    availableForBreeding: true,
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800'
    ],
    breeder: {
      name: '*PL Wild Bengal',
      owner: 'Tomasz Zieliński',
      rating: 4.95,
      reviewsCount: 201,
      location: 'Poznań, Wielkopolskie',
      phone: '+48 605 678 901',
      verified: true,
      organization: 'TICA / WCF'
    },
    pedigree: {
      tica: true,
      wcf: true,
      generations: 6,
      champions: 9
    },
    parents: {
      father: {
        name: "RW SGC Wild Bengal King Leonidas",
        title: 'Regional Winner Supreme Grand Champion',
        color: 'Brown Rosetted',
        import: 'USA'
      },
      mother: {
        name: "GC Wild Bengal Princess Maya",
        title: 'Grand Champion',
        color: 'Brown Spotted'
      }
    },
    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthGuarantee: '36 miesięcy'
    },
    stats: {
      views: 6789,
      likes: 1678,
      shares: 123
    },
    personality: ['Energiczna', 'Inteligentna', 'Towarzyska'],
    specialFeatures: ['Show quality rosettes', 'Import bloodline USA'],
    status: 'available',
    featured: true
  }
])

  // 🏛️ ORGANIZACJE FELINOLOGICZNE W POLSCE
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

// 🐱 BAZA KOTÓW (rozszerzona)
const [cats, setCats] = useState([
  // ... TU POWINNY BYĆ KOTY 1-5 ...
  // (nie usuwaj ich!)
  
  // 🆕 KOTY 6-25 (KONTYNUACJA BAZY)
  {
    id: 6,
    name: 'SIBERIAN FOREST Snowy',
    breed: 'Siberian',
    color: 'Silver Tabby',
    gender: 'Samiec',
    birthDate: '2024-04-20',
    age: '8 miesięcy',
    price: 4900,
    priceFormatted: '4 900 PLN',
    availableForBreeding: false,
    img: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800'
    ],
    breeder: {
      name: '*PL Siberian Forest',
      prefix: 'Siberian Forest',
      owner: 'Ewa Krajewska',
      rating: 4.94,
      reviewsCount: 167,
      location: 'Łódź, Łódzkie',
      address: 'ul. Piotrkowska 156, 90-001 Łódź',
      phone: '+48 606 789 012',
      email: 'forest@siberian.pl',
      website: 'www.siberianforest.pl',
      responseTime: '< 5 godzin',
      verified: true,
      memberSince: '2019',
      totalCatsSold: 78,
      activeLitters: 1,
      organization: 'FIFe / FPL',
      description: 'Hodowla Kotów Syberyjskich. Koty hypoalergiczne, idealne dla alergików. Linia tradycyjna rosyjska.'
    },
    pedigree: {
      fife: true,
      wcf: true,
      tica: false,
      fifeNumber: 'PL*SIBFOR-SIB-2024-0123',
      wcfNumber: 'WCF-PL-SIB-2024-0089',
      registeredIn: 'FPL + WCF Poland',
      generations: 5,
      champions: 7
    },
    parents: {
      father: {
        name: "IC Siberian Forest Ivan Veliki",
        title: 'International Champion',
        color: 'Silver Tabby',
        import: 'Import Rosja'
      },
      mother: {
        name: "CH Siberian Forest Natasha",
        title: 'Champion FIFe',
        color: 'Silver Tabby'
      }
    },
    health: {
      vaccinated: true,
      dewormed: true,
      veterinaryExam: true,
      microchip: true,
      passport: true,
      healthGuarantee: '2 lata',
      geneticTests: ['PKD negative', 'HCM negative']
    },
    personality: ['Łagodny', 'Towarzyski', 'Inteligentny'],
    specialFeatures: ['Hipoalergiczny', 'Duży rozmiar', 'Piękne futro'],
    status: 'available',
    featured: false
  }
      id: 7,
      name: 'SPHYNX ELITE Royal King',
      breed: 'Sphynx',
      color: 'Black',
      gender: 'Samiec',
      birthDate: '2024-02-10',
      age: '10 miesięcy',
      price: 8500,
      priceFormatted: '8 500 PLN',
      availableForBreeding: true,
      img: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800',
        'https://images.unsplash.com/photo-1615789591457-74a63395c990?w=800'
      ],
      breeder: {
        name: '*PL Sphynx Elite',
        prefix: 'Sphynx Elite',
        owner: 'Magdalena Wójcik',
        rating: 4.99,
        reviewsCount: 342,
        location: 'Warszawa, Mazowieckie',
        address: 'ul. Nowa 67, 02-001 Warszawa',
        phone: '+48 607 890 123',
        email: 'elite@sphynx.pl',
        website: 'www.sphynxelite.pl',
        responseTime: '< 1 godziny',
        verified: true,
        memberSince: '2015',
        totalCatsSold: 189,
        activeLitters: 3,
        organization: 'TICA / WCF / FPL',
        description: 'Najstarsza hodowla Sphynx w Polsce. Importy z Kanady i USA. Linia pokazowa najwyższej klasy.'
      },
      pedigree: {
        fife: false,
        wcf: true,
        tica: true,
        ticaNumber: 'TICA-PL-SPH-2024-0234',
        wcfNumber: 'WCF-PL-SPH-2024-0156',
        registeredIn: 'TICA + WCF',
        generations: 6,
        champions: 14
      },
      parents: {
        father: {
          name: "RW QGC Sphynx Elite Pharaoh",
          title: 'Regional Winner Quadruple GC',
          color: 'Black',
          import: 'Import Kanada'
        },
        mother: {
          name: "GC Sphynx Elite Cleopatra",
          title: 'Grand Champion TICA',
          color: 'Black'
        }
      },
      health: {
        vaccinated: true,
        vaccinationDate: '2024-12-08',
        dewormed: true,
        microchipped: true,
        microchipNumber: '616093900789012',
        vetChecked: true,
        hcmTested: true,
        hcmResult: 'Negatywny (echo serca)',
        fivFelvTested: true,
        fivFelvResult: 'Negatywny',
        healthCertificate: true,
        healthGuarantee: '36 miesięcy',
        veterinarian: 'Dr wet. Paweł Kowalski - Sphynx Vet Expert'
      },
      stats: {
        views: 12456,
        likes: 3421,
        shares: 234,
        inquiries: 45,
        lastUpdated: '2024-12-20'
      },
      personality: ['Bardzo towarzyski', 'Ciepły w dotyku', 'Loves cuddles', 'Aktywny'],
      specialFeatures: ['Show quality', 'Canadian import line', 'Champion bloodline', 'Breeding rights'],
      included: ['Rodowód TICA+WCF', 'Chip', 'Paszport EU', 'Wszystkie szczepienia', 'Testy', 'Ubranka', 'Umowa hodowlana'],
      readyToGo: 'Gotowy do odbioru',
      delivery: {
        personal: true,
        shipping: true,
        shippingCost: '500 PLN',
        international: true,
        meetingLocation: 'Warszawa Centrum'
      },
      videos: [
        {
          url: 'https://example.com/royal-king.mp4',
          title: 'Royal King - prezentacja',
          duration: '2:45'
        }
      ],
      featured: true,
      verified: true,
      urgent: false,
      status: 'available'
    },
    {
      id: 8,
      name: 'SCOTTISH DREAMS Angel',
      breed: 'Scottish Fold',
      color: 'Lilac',
      gender: 'Samica',
      birthDate: '2024-06-05',
      age: '6.5 miesiąca',
      price: 6200,
      priceFormatted: '6 200 PLN',
      availableForBreeding: false,
      img: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800'
      ],
      breeder: {
        name: '*PL Scottish Dreams',
        prefix: 'Scottish Dreams',
        owner: 'Kamila Mazur',
        rating: 4.96,
        reviewsCount: 198,
        location: 'Kraków, Małopolskie',
        address: 'ul. Floriańska 23, 31-019 Kraków',
        phone: '+48 608 901 234',
        email: 'dreams@scottish.pl',
        website: 'www.scottishdreams.pl',
        responseTime: '< 3 godzin',
        verified: true,
        memberSince: '2020',
        totalCatsSold: 56,
        activeLitters: 1,
        organization: 'TICA / FPL',
        description: 'Hodowla Scottish Fold i Straight. Koty o wspaniałych uszkach i charakterze.'
      },
      pedigree: {
        fife: false,
        wcf: false,
        tica: true,
        ticaNumber: 'TICA-PL-SFS-2024-0178',
        registeredIn: 'TICA',
        generations: 5,
        champions: 5
      },
      parents: {
        father: {
          name: "CH Scottish Dreams Prince Charming",
          title: 'Champion TICA',
          color: 'Lilac'
        },
        mother: {
          name: "Scottish Dreams Sweet Angel",
          title: 'Show cat',
          color: 'Lilac'
        }
      },
      health: {
        vaccinated: true,
        vaccinationDate: '2024-12-01',
        dewormed: true,
        microchipped: true,
        microchipNumber: '616093900890123',
        vetChecked: true,
        hcmTested: false,
        pkdTested: false,
        fivFelvTested: true,
        fivFelvResult: 'Negatywny',
        healthCertificate: true,
        healthGuarantee: '24 miesiące',
        veterinarian: 'Dr wet. Anna Kowalczyk - Pet Clinic Kraków'
      },
      stats: {
        views: 7823,
        likes: 1923,
        shares: 145,
        inquiries: 27,
        lastUpdated: '2024-12-18'
      },
      personality: ['Delikatna', 'Spokojna', 'Rodzinna', 'Śliczne uszka'],
      specialFeatures: ['Perfect folded ears', 'Rare lilac color', 'Sweet face', 'Family friendly'],
      included: ['Rodowód TICA', 'Chip', 'Paszport', 'Szczepienia', 'Wyprawka'],
      readyToGo: '2025-01-15',
      delivery: {
        personal: true,
        shipping: true,
        shippingCost: '400 PLN',
        meetingLocation: 'Kraków Rynek'
      },
      videos: [],
      featured: false,
      verified: true,
      urgent: false,
      status: 'available'
    },
    {
      id: 9,
      name: 'NORDIC CATS Legend',
      breed: 'Norwegian Forest',
      color: 'Black Smoke',
      gender: 'Samiec',
      birthDate: '2023-10-15',
      age: '1 rok 2 miesiące',
      price: 5500,
      priceFormatted: '5 500 PLN',
      availableForBreeding: true,
      img: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800'
      ],
      breeder: {
        name: '*PL Nordic Cats',
        prefix: 'Nordic Cats',
        owner: 'Piotr Woźniak',
        rating: 4.93,
        reviewsCount: 167,
        location: 'Gdańsk, Pomorskie',
        address: 'ul. Długa 78, 80-831 Gdańsk',
        phone: '+48 609 012 345',
        email: 'nordic@cats.pl',
        website: 'www.nordiccats.pl',
        responseTime: '< 4 godzin',
        verified: true,
        memberSince: '2018',
        totalCatsSold: 92,
        activeLitters: 2,
        organization: 'FIFe / FPL',
        description: 'Hodowla Norweskich Kotów Leśnych. Linia skandynawska. Duże, silne koty o łagodnym charakterze.'
      },
      pedigree: {
        fife: true,
        wcf: true,
        tica: false,
        fifeNumber: 'PL*NORDIC-NFO-2023-0267',
        registeredIn: 'FPL',
        generations: 6,
        champions: 8
      },
      parents: {
        father: {
          name: "GIC Nordic Cats Viking Warrior",
          title: 'Grand International Champion',
          color: 'Black Smoke',
          import: 'Import Norwegia'
        },
        mother: {
          name: "IC Nordic Cats Forest Queen",
          title: 'International Champion',
          color: 'Black Smoke'
        }
      },
      health: {
        vaccinated: true,
        vaccinationDate: '2024-11-20',
        dewormed: true,
        microchipped: true,
        microchipNumber: '616093900901234',
        vetChecked: true,
        hcmTested: true,
        hcmResult: 'Negatywny',
        pkdTested: true,
        pkdResult: 'N/N',
        fivFelvTested: true,
        fivFelvResult: 'Negatywny',
        gsd4Tested: true,
        gsd4Result: 'N/N - Clear',
        healthCertificate: true,
        healthGuarantee: '24 miesiące',
        veterinarian: 'Dr wet. Ewa Lewandowska - Forest Vet Gdańsk'
      },
      stats: {
        views: 5634,
        likes: 1234,
        shares: 89,
        inquiries: 18,
        lastUpdated: '2024-12-17'
      },
      personality: ['Niezależny', 'Inteligentny', 'Łowiecki', 'Majestatyczny'],
      specialFeatures: ['Large forest cat', 'Norwegian import line', 'Excellent hunter', 'Breeding quality'],
      included: ['Rodowód FIFe', 'Chip', 'Paszport', 'Szczepienia', 'Testy genetyczne', 'Umowa hodowlana'],
      readyToGo: 'Gotowy do odbioru',
      delivery: {
        personal: true,
        shipping: true,
        shippingCost: '420 PLN',
        meetingLocation: 'Gdańsk Główny'
      },
      videos: [],
      featured: false,
      verified: true,
      urgent: false,
      status: 'available'
    },
    {
      id: 10,
      name: 'EXOTIC DREAMS Teddy',
      breed: 'Exotic Shorthair',
      color: 'Cream',
      gender: 'Samiec',
      birthDate: '2024-07-20',
      age: '5 miesięcy',
      price: 7200,
      priceFormatted: '7 200 PLN',
      availableForBreeding: false,
      img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800'
      ],
      breeder: {
        name: '*PL Exotic Dreams',
        prefix: 'Exotic Dreams',
        owner: 'Joanna Michalska',
        rating: 4.97,
        reviewsCount: 234,
        location: 'Wrocław, Dolnośląskie',
        address: 'ul. Świdnicka 45, 50-066 Wrocław',
        phone: '+48 610 123 456',
        email: 'exotic@dreams.pl',
        website: 'www.exoticdreams.pl',
        responseTime: '< 2 godzin',
        verified: true,
        memberSince: '2017',
        totalCatsSold: 134,
        activeLitters: 2,
        organization: 'FIFe / TICA / FPL',
        description: 'Hodowla Exotic Shorthair i Persów. Koty o pluszowej aparycji i łagodnym charakterze.'
      },
      pedigree: {
        fife: true,
        wcf: true,
        tica: true,
        fifeNumber: 'PL*EXODREAM-EXO-2024-0189',
        ticaNumber: 'TICA-PL-EXO-2024-0145',
        registeredIn: 'FPL + TICA',
        generations: 5,
        champions: 9
      },
      parents: {
        father: {
          name: "CH Exotic Dreams Teddy Bear",
          title: 'Champion FIFe',
          color: 'Cream'
        },
        mother: {
          name: "IC Exotic Dreams Plush Doll",
          title: 'International Champion',
          color: 'Cream'
        }
      },
      health: {
        vaccinated: true,
        vaccinationDate: '2024-12-10',
        dewormed: true,
        microchipped: true,
        microchipNumber: '616093901012345',
        vetChecked: true,
        hcmTested: false,
        pkdTested: true,
        pkdResult: 'N/N (rodzice)',
        fivFelvTested: true,
        fivFelvResult: 'Negatywny',
        healthCertificate: true,
        healthGuarantee: '24 miesiące',
        veterinarian: 'Dr wet. Marek Nowak - Exotic Vet Wrocław'
      },
      stats: {
        views: 9123,
        likes: 2456,
        shares: 178,
        inquiries: 31,
        lastUpdated: '2024-12-20'
      },
      personality: ['Spokojny', 'Łagodny', 'Pluszakowy', 'Rodzinny'],
      specialFeatures: ['Teddy bear face', 'Perfect plush coat', 'Sweet character', 'Easy care'],
      included: ['Rodowód FIFe+TICA', 'Chip', 'Paszport', 'Szczepienia', 'Zestaw pielęgnacyjny'],
      readyToGo: '2025-01-25',
      delivery: {
        personal: true,
        shipping: true,
        shippingCost: '380 PLN',
        meetingLocation: 'Wrocław Rynek'
      },
      videos: [],
      featured: true,
      verified: true,
      urgent: false,
      status: 'available'
    }
    // Więcej kotów 11-25 w następnej sekcji dla oszczędności miejsca...
  ])

  // 📱 HANDLERS (WSZYSTKIE FUNKCJE)
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
      alert(`✅ ${cat.name} dodany do koszyka!`)
    } else {
      alert(`⚠️ ${cat.name} jest już w koszyku!`)
    }
  }

  const handleRemoveFromCart = (catId) => {
    setCartItems(cartItems.filter(item => item.id !== catId))
  }

  const handleViewDetails = (cat) => {
    setSelectedCat(cat)
    setShowModal(true)
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
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`)
      alert('✅ Link skopiowany do schowka!')
    }
  }

  const handleContactBreeder = (breeder) => {
    setSelectedBreeder(breeder)
    setShowBreederProfile(true)
  }

  const handlePlayVideo = (videoUrl) => {
    setVideoUrl(videoUrl)
    setShowVideoPlayer(true)
  }

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption)
  }

  const handleViewModeChange = (mode) => {
    setViewMode(mode)
  }

  const handleAddToFavorites = (catId) => {
    if (!userFavorites.includes(catId)) {
      setUserFavorites([...userFavorites, catId])
      alert('✅ Dodano do ulubionych!')
    } else {
      setUserFavorites(userFavorites.filter(id => id !== catId))
      alert('❌ Usunięto z ulubionych')
    }
  }

  // 🎯 FILTERED & SORTED CATS
  const getFilteredAndSortedCats = () => {
    let filtered = cats.filter(cat => {
      const matchesSearch = 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.breeder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.breeder.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesBreed = selectedBreed === 'all' || cat.breed === selectedBreed
      const matchesPrice = cat.price >= priceRange[0] && cat.price <= priceRange[1]
      
      return matchesSearch && matchesBreed && matchesPrice
    })

    // Sortowanie
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

  useEffect(() => {
    // Simulate real-time stats update
    const statsInterval = setInterval(() => {
      // Update views, likes etc. in real app this would be from API
    }, 60000) // Every minute
    return () => clearInterval(statsInterval)
  }, [])

  // 🌍 UNIQUE BREEDS LIST
  const uniqueBreeds = ['all', ...new Set(cats.map(cat => cat.breed))]

  // 📊 STATISTICS
  const totalCats = cats.length
  const totalBreeders = new Set(cats.map(cat => cat.breeder.name)).size
  const averagePrice = Math.round(cats.reduce((sum, cat) => sum + cat.price, 0) / cats.length)
  const availableCats = cats.filter(cat => cat.status === 'available').length

    // 🎯 RENDER HOME TAB (GŁÓWNA STRONA)
  const renderHome = () => {
    const filteredCats = getFilteredAndSortedCats()
    
    return (
      <div className="home-tab">
        {/* HERO SECTION Z DANYMI Z OBRAZKA */}
        <div className="hero-main">
          <div className="hero-content">
            <div className="hero-emoji">😻</div>
            <h1 className="hero-title">CAT PURRE</h1>
            <p className="hero-subtitle">Premium Marketplace Kotów Rasowych z Rodowodem</p>
            
            {/* OFICJALNE ORGANIZACJE */}
            <div className="organizations-section">
              <h3 className="orgs-title">🏛️ Organizacje Zrzeszające Hodowców w Polsce</h3>
              <div className="organizations-grid">
                <div className="org-card main-org">
                  <div className="org-logo">🏆</div>
                  <h4 className="org-name">FIFe</h4>
                  <p className="org-full">Fédération Internationale Féline</p>
                  <div className="org-arrow">↓</div>
                  <div className="org-polish">
                    <span className="polish-flag">🇵🇱</span>
                    <span className="polish-name">FPL</span>
                  </div>
                  <p className="org-desc">Felinologia Polska Licencjonowana</p>
                  <div className="org-clubs">
                    <span className="club-badge">KSSK</span>
                    <span className="club-badge">Klub Kota</span>
                    <span className="club-badge">Cat Club Feniks</span>
                  </div>
                </div>

                <div className="org-card main-org">
                  <div className="org-logo">🌍</div>
                  <h4 className="org-name">WCF</h4>
                  <p className="org-full">World Cat Federation</p>
                  <div className="org-arrow">↓</div>
                  <div className="org-polish">
                    <span className="polish-flag">🇵🇱</span>
                    <span className="polish-name">WCF Poland</span>
                  </div>
                  <p className="org-desc">Stowarzyszenia zrzeszone w WCF</p>
                  <div className="org-clubs">
                    <span className="club-badge">IBSCC</span>
                    <span className="club-badge">JKKF</span>
                    <span className="club-badge">SKK</span>
                  </div>
                </div>

                <div className="org-card main-org">
                  <div className="org-logo">🌟</div>
                  <h4 className="org-name">TICA</h4>
                  <p className="org-full">The International Cat Association</p>
                  <div className="org-arrow">↓</div>
                  <div className="org-polish">
                    <span className="polish-flag">🇵🇱</span>
                    <span className="polish-name">TICA Poland</span>
                  </div>
                  <p className="org-desc">Region Polski TICA</p>
                  <div className="org-clubs">
                    <span className="club-badge">Klub Kota</span>
                    <span className="club-badge">Xtreme</span>
                  </div>
                </div>
              </div>

              <div className="orgs-info">
                <p className="info-text">
                  ℹ️ <strong>Wszystkie koty na CAT PURRE</strong> pochodzą wyłącznie z hodowli zarejestrowanych w oficjalnych organizacjach felinologicznych (FIFe, WCF, TICA).
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
                      <span className="filter-icon">🐱</span>
                      Rasa
                    </label>
                    <select 
                      className="filter-select"
                      value={selectedBreed}
                      onChange={(e) => setSelectedBreed(e.target.value)}
                    >
                      {uniqueBreeds.map(breed => (
                        <option key={breed} value={breed}>
                          {breed === 'all' ? 'Wszystkie rasy' : breed}
                        </option>
                      ))}
                    </select>
                  </div>

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

          {/* CATS GRID OR LIST */}
          {filteredCats.length > 0 ? (
            <div className={`cats-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
              {filteredCats.map(cat => (
                <div 
                  key={cat.id} 
                  className={`cat-card ${cat.featured ? 'featured' : ''} ${cat.urgent ? 'urgent' : ''}`}
                  onClick={() => handleViewDetails(cat)}
                >
                  {/* BADGES */}
                  <div className="card-badges">
                    {cat.featured && (
                      <span className="badge featured-badge">⭐ Wyróżnione</span>
                    )}
                    {cat.urgent && (
                      <span className="badge urgent-badge">🔥 Pilne</span>
                    )}
                    {cat.verified && (
                      <span className="badge verified-badge">✓ Zweryfikowane</span>
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

                    {/* GALLERY INDICATOR */}
                    {cat.gallery.length > 1 && (
                      <div className="gallery-indicator">
                        📷 {cat.gallery.length} zdjęć
                      </div>
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

            <div className="why-card">
              <div className="why-icon">🚗</div>
              <h3 className="why-card-title">Transport i Dostawa</h3>
              <p className="why-card-text">
                Organizujemy bezpieczny transport w całej Polsce i UE.
                Opcja odbioru osobistego u hodowcy.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">💬</div>
              <h3 className="why-card-title">Wsparcie 24/7</h3>
              <p className="why-card-text">
                Pomagamy przed i po zakupie. Kontakt z hodowcą, porady weterynaryjne,
                wsparcie w adaptacji kota.
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

    // 🎯 MODAL SZCZEGÓŁÓW KOTA
  const renderModal = () => {
    if (!showModal || !selectedCat) return null

    return (
      <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleCloseModal}>✖️</button>
          
          <div className="modal-content">
            {/* LEFT SIDE - GALLERY */}
            <div className="modal-left">
              <div className="modal-gallery">
                <img 
                  src={selectedCat.gallery[0]} 
                  alt={selectedCat.name}
                  className="modal-main-image"
                />
                {selectedCat.gallery.length > 1 && (
                  <div className="gallery-thumbnails">
                    {selectedCat.gallery.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img}
                        alt={`${selectedCat.name} ${idx + 1}`}
                        className="gallery-thumb"
                      />
                    ))}
                  </div>
                )}
              </div>

              {selectedCat.videos.length > 0 && (
                <div className="modal-videos">
                  <h4 className="videos-title">📹 Filmy</h4>
                  {selectedCat.videos.map((video, idx) => (
                    <button 
                      key={idx}
                      className="video-button"
                      onClick={() => handlePlayVideo(video.url)}
                    >
                      ▶️ {video.title} ({video.duration})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDE - DETAILS */}
            <div className="modal-right">
              <div className="modal-header">
                <div>
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
              </div>

              {/* BASIC INFO */}
              <div className="modal-section">
                <h3 className="section-title">📋 Podstawowe informacje</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Płeć:</span>
                    <span className="info-value">{selectedCat.gender}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Data urodzenia:</span>
                    <span className="info-value">{selectedCat.birthDate}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Wiek:</span>
                    <span className="info-value">{selectedCat.age}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className="info-value status-available">✅ Dostępny</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Gotowy do odbioru:</span>
                    <span className="info-value">{selectedCat.readyToGo}</span>
                  </div>
                </div>
              </div>

              {/* PEDIGREE */}
              <div className="modal-section">
                <h3 className="section-title">📜 Rodowód i Certyfikaty</h3>
                <div className="pedigree-details">
                  <div className="pedigree-orgs">
                    {selectedCat.pedigree.fife && (
                      <div className="pedigree-item">
                        <span className="pedigree-org-badge fife">FIFe</span>
                        <span className="pedigree-number">{selectedCat.pedigree.fifeNumber}</span>
                      </div>
                    )}
                    {selectedCat.pedigree.wcf && (
                      <div className="pedigree-item">
                        <span className="pedigree-org-badge wcf">WCF</span>
                        <span className="pedigree-number">{selectedCat.pedigree.wcfNumber}</span>
                      </div>
                    )}
                    {selectedCat.pedigree.tica && (
                      <div className="pedigree-item">
                        <span className="pedigree-org-badge tica">TICA</span>
                        <span className="pedigree-number">{selectedCat.pedigree.ticaNumber}</span>
                      </div>
                    )}
                  </div>
                  <div className="pedigree-stats">
                    <span className="pedigree-stat">🌳 {selectedCat.pedigree.generations} pokoleń</span>
                    <span className="pedigree-stat">🏆 {selectedCat.pedigree.champions} championów w rodowodzie</span>
                  </div>
                </div>
              </div>

              {/* PARENTS */}
              <div className="modal-section">
                <h3 className="section-title">👨‍👩‍👧 Rodzice</h3>
                <div className="parents-grid">
                  <div className="parent-card">
                    <div className="parent-icon">👨</div>
                    <div className="parent-info">
                      <span className="parent-label">Ojciec:</span>
                      <span className="parent-name">{selectedCat.parents.father.name}</span>
                      <span className="parent-title">{selectedCat.parents.father.title}</span>
                      {selectedCat.parents.father.import && (
                        <span className="parent-import">✈️ {selectedCat.parents.father.import}</span>
                      )}
                    </div>
                  </div>
                  <div className="parent-card">
                    <div className="parent-icon">👩</div>
                    <div className="parent-info">
                      <span className="parent-label">Matka:</span>
                      <span className="parent-name">{selectedCat.parents.mother.name}</span>
                      <span className="parent-title">{selectedCat.parents.mother.title}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* HEALTH */}
              <div className="modal-section">
                <h3 className="section-title">🏥 Zdrowie i Testy</h3>
                <div className="health-grid">
                  <div className="health-item positive">
                    <span className="health-icon">💉</span>
                    <span className="health-text">Szczepiony ({selectedCat.health.vaccinationDate})</span>
                  </div>
                  <div className="health-item positive">
                    <span className="health-icon">🔖</span>
                    <span className="health-text">Chip: {selectedCat.health.microchipNumber}</span>
                  </div>
                  {selectedCat.health.hcmTested && (
                    <div className="health-item positive">
                      <span className="health-icon">❤️</span>
                      <span className="health-text">HCM: {selectedCat.health.hcmResult}</span>
                    </div>
                  )}
                  {selectedCat.health.pkdTested && (
                    <div className="health-item positive">
                      <span className="health-icon">🧬</span>
                      <span className="health-text">PKD: {selectedCat.health.pkdResult}</span>
                    </div>
                  )}
                  {selectedCat.health.fivFelvTested && (
                    <div className="health-item positive">
                      <span className="health-icon">🛡️</span>
                      <span className="health-text">FIV/FeLV: {selectedCat.health.fivFelvResult}</span>
                    </div>
                  )}
                </div>
                <div className="health-guarantee">
                  <span className="guarantee-icon">✅</span>
                  <span className="guarantee-text">
                    Gwarancja zdrowia: <strong>{selectedCat.health.healthGuarantee}</strong>
                  </span>
                </div>
                <div className="vet-info">
                  <span className="vet-icon">👨‍⚕️</span>
                  <span className="vet-text">Weterynarz: {selectedCat.health.veterinarian}</span>
                </div>
              </div>

              {/* PERSONALITY */}
              <div className="modal-section">
                <h3 className="section-title">🎭 Osobowość</h3>
                <div className="personality-list">
                  {selectedCat.personality.map((trait, idx) => (
                    <span key={idx} className="personality-tag-large">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* BREEDER */}
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
                      <span className="detail-icon">🌐</span>
                      <span className="detail-text">{selectedCat.breeder.website}</span>
                    </div>
                    <div className="breeder-detail">
                      <span className="detail-icon">⏱️</span>
                      <span className="detail-text">Odpowiada w: {selectedCat.breeder.responseTime}</span>
                    </div>
                    <div className="breeder-detail">
                      <span className="detail-icon">🏛️</span>
                      <span className="detail-text">{selectedCat.breeder.organization}</span>
                    </div>
                  </div>
                  <p className="breeder-description">{selectedCat.breeder.description}</p>
                </div>
              </div>

              {/* INCLUDED */}
              <div className="modal-section">
                <h3 className="section-title">📦 W cenie zawarte</h3>
                <div className="included-list">
                  {selectedCat.included.map((item, idx) => (
                    <div key={idx} className="included-item">
                      <span className="included-check">✅</span>
                      <span className="included-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DELIVERY */}
              <div className="modal-section">
                <h3 className="section-title">🚗 Dostawa</h3>
                <div className="delivery-options">
                  {selectedCat.delivery.personal && (
                    <div className="delivery-option">
                      <span className="delivery-icon">🤝</span>
                      <span className="delivery-text">Odbiór osobisty: {selectedCat.delivery.meetingLocation}</span>
                    </div>
                  )}
                  {selectedCat.delivery.shipping && (
                    <div className="delivery-option">
                      <span className="delivery-icon">📦</span>
                      <span className="delivery-text">Transport: {selectedCat.delivery.shippingCost}</span>
                    </div>
                  )}
                  {selectedCat.delivery.international && (
                    <div className="delivery-option">
                      <span className="delivery-icon">✈️</span>
                      <span className="delivery-text">Transport międzynarodowy dostępny</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="modal-actions">
                <button 
                  className="modal-action-btn favorite"
                  onClick={() => handleAddToFavorites(selectedCat.id)}
                >
                  {userFavorites.includes(selectedCat.id) ? '❤️' : '🤍'} Ulubione
                </button>
                <button 
                  className="modal-action-btn share"
                  onClick={() => handleShare(selectedCat)}
                >
                  🔗 Udostępnij
                </button>
                <button 
                  className="modal-action-btn contact"
                  onClick={() => handleContactBreeder(selectedCat.breeder)}
                >
                  💬 Kontakt z hodowcą
                </button>
                <button 
                  className="modal-action-btn cart"
                  onClick={() => handleAddToCart(selectedCat)}
                >
                  🛒 Dodaj do koszyka
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 🐱 KOCI FACEBOOK - SOCIAL FEED
  const renderCatSocial = () => {
    const [socialPosts] = useState([
      {
        id: 1,
        cat: cats[0],
        breeder: cats[0].breeder,
        type: 'new_arrival',
        text: '🎉 Witajcie! Jestem Luna, najnowszy członek rodziny Golden British! Mam 7 miesięcy i szukam kochającego domu. 😻',
        images: cats[0].gallery,
        likes: 234,
        comments: 45,
        shares: 12,
        timestamp: '2 godziny temu'
      },
      {
        id: 2,
        cat: cats[1],
        breeder: cats[1].breeder,
        type: 'champion',
        text: '🏆 Thunder wygrał Best in Show na wystawie w Krakowie! Jesteśmy mega dumni! #MaineCoon #Champion',
        images: [cats[1].img],
        likes: 567,
        comments: 89,
        shares: 34,
        timestamp: '5 godzin temu'
      },
      {
        id: 3,
        cat: cats[4],
        breeder: cats[4].breeder,
        type: 'video',
        text: '📹 Mystic podczas zabawy! Zobacz jak ta piękna Bengal lubi się bawić! 🐆',
        video: 'https://example.com/mystic.mp4',
        likes: 892,
        comments: 156,
        shares: 67,
        timestamp: '1 dzień temu'
      },
      {
        id: 4,
        cat: cats[6],
        breeder: cats[6].breeder,
        type: 'adoption',
        text: '❤️ Royal King znalazł dom! Dziękujemy nowej rodzinie za wybór naszej hodowli. Będziemy tęsknić! 🏠',
        images: [cats[6].img],
        likes: 445,
        comments: 78,
        shares: 23,
        timestamp: '2 dni temu'
      }
    ])

    return (
      <div className="social-feed-tab">
        <div className="social-header">
          <h2 className="social-title">🐱 Koci Facebook - CatBook</h2>
          <p className="social-subtitle">Zobacz co słychać w świecie kotów rasowych!</p>
        </div>

        <div className="social-filters">
          <button className="social-filter-btn active">🌟 Wszystkie</button>
          <button className="social-filter-btn">🎉 Nowe kocięta</button>
          <button className="social-filter-btn">🏆 Sukcesy</button>
          <button className="social-filter-btn">📹 Filmy</button>
          <button className="social-filter-btn">❤️ Adopcje</button>
        </div>

        <div className="social-posts">
          {socialPosts.map(post => (
            <div key={post.id} className="social-post">
              <div className="post-header">
                <div className="post-author">
                  <div className="author-avatar">👤</div>
                  <div className="author-info">
                    <h4 className="author-name">{post.breeder.name}</h4>
                    <span className="post-time">{post.timestamp}</span>
                  </div>
                </div>
                <button className="post-menu">⋯</button>
              </div>

              <div className="post-content">
                <p className="post-text">{post.text}</p>
                
                {post.images && (
                  <div className="post-images">
                    {post.images.slice(0, 4).map((img, idx) => (
                      <img 
                        key={idx}
                        src={img}
                        alt={`Post ${post.id} image ${idx + 1}`}
                        className="post-image"
                      />
                    ))}
                  </div>
                )}

                {post.video && (
                  <div className="post-video">
                    <button 
                      className="video-play-btn"
                      onClick={() => handlePlayVideo(post.video)}
                    >
                      ▶️ Odtwórz video
                    </button>
                  </div>
                )}
              </div>

              <div className="post-stats">
                <span className="post-stat">❤️ {post.likes} polubień</span>
                <span className="post-stat">💬 {post.comments} komentarzy</span>
                <span className="post-stat">🔄 {post.shares} udostępnień</span>
              </div>

              <div className="post-actions">
                <button className="post-action-btn">👍 Lubię to</button>
                <button className="post-action-btn">💬 Komentuj</button>
                <button className="post-action-btn">🔄 Udostępnij</button>
                <button 
                  className="post-action-btn"
                  onClick={() => handleViewDetails(post.cat)}
                >
                  👁️ Zobacz profil
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="load-more-container">
          <button className="load-more-btn">
            ⬇️ Załaduj więcej postów
          </button>
        </div>
      </div>
    )
  }

  // 🛒 KOSZYK
  const renderCart = () => (
    <div className="cart-tab">
      <h2 className="tab-title">🛒 Twój Koszyk</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3 className="empty-title">Koszyk jest pusty</h3>
          <p className="empty-text">Dodaj koty do koszyka, aby kontynuować</p>
          <button 
            className="back-to-cats-btn"
            onClick={() => setActiveTab('home')}
          >
            🐱 Przeglądaj koty
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map(cat => (
              <div key={cat.id} className="cart-item">
                <img src={cat.img} alt={cat.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{cat.name}</h4>
                  <p className="cart-item-breed">{cat.breed} • {cat.age}</p>
                  <p className="cart-item-breeder">👤 {cat.breeder.name}</p>
                </div>
                <div className="cart-item-price">{cat.priceFormatted}</div>
                <button 
                  className="cart-item-remove"
                  onClick={() => handleRemoveFromCart(cat.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Podsumowanie</h3>
            <div className="summary-line">
              <span>Łącznie ({cartItems.length} kotów):</span>
              <span className="summary-price">
                {cartItems.reduce((sum, cat) => sum + cat.price, 0).toLocaleString('pl-PL')} PLN
              </span>
            </div>
            <button className="checkout-btn">
              💳 Przejdź do płatności
            </button>
          </div>
        </div>
      )}
    </div>
  )

  // 🎯 MAIN RETURN - KONTYNUACJA W MSG 5/5...
  return (
    <div className="app">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => setActiveTab('home')}>
            <span className="brand-icon">😻</span>
            <span className="brand-text">CAT PURRE</span>
          </div>

          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              🏠 Główna
            </button>
            <button 
              className={`nav-tab ${activeTab === 'social' ? 'active' : ''}`}
              onClick={() => setActiveTab('social')}
            >
              🐱 CatBook
              <span className="nav-badge">🔥</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              ❤️ Ulubione
              {userFavorites.length > 0 && (
                <span className="nav-count">{userFavorites.length}</span>
              )}
            </button>
            <button 
              className={`nav-tab ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              🛒 Koszyk
              {cartItems.length > 0 && (
                <span className="nav-count">{cartItems.length}</span>
              )}
            </button>
          </div>

          <div className="nav-status">
            <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
            <span className="status-text">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'social' && renderCatSocial()}
        {activeTab === 'cart' && renderCart()}
      </main>

      {/* MODAL */}
      {renderModal()}

      {/* FOOTER - W MSG 5/5 */}
    </div>
  )
}

  // 🐱 KOTY 11-25 (DOKOŃCZENIE BAZY DO 25 KOTÓW)
  const additionalCats = [
    {
      id: 11,
      name: 'ABYSSINIAN PRINCE Leo',
      breed: 'Abyssinian',
      color: 'Sorrel (Ruddy)',
      gender: 'Samiec',
      birthDate: '2024-04-01',
      age: '8.5 miesiąca',
      price: 6800,
      priceFormatted: '6 800 PLN',
      availableForBreeding: false,
      img: 'https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=800',
      gallery: ['https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=800'],
      breeder: {
        name: '*PL Abyssinian Royal',
        prefix: 'Abyssinian Royal',
        owner: 'Dorota Wiśniewska',
        rating: 4.95,
        reviewsCount: 145,
        location: 'Poznań, Wielkopolskie',
        address: 'ul. Grunwaldzka 234, 60-311 Poznań',
        phone: '+48 611 234 567',
        email: 'royal@abyssinian.pl',
        website: 'www.abyssinianroyal.pl',
        responseTime: '< 3 godzin',
        verified: true,
        memberSince: '2020',
        totalCatsSold: 78,
        activeLitters: 1,
        organization: 'FIFe / TICA / FPL',
        description: 'Hodowla Abisyńczyków linia europejska i amerykańska. Koty aktywne, inteligentne, idealne dla rodzin.'
      },
      pedigree: {
        fife: true,
        wcf: false,
        tica: true,
        fifeNumber: 'PL*ABYROYAL-ABY-2024-0234',
        ticaNumber: 'TICA-PL-ABY-2024-0189',
        registeredIn: 'FPL + TICA',
        generations: 5,
        champions: 7
      },
      parents: {
        father: { name: "GC Abyssinian Royal King Simba", title: 'Grand Champion TICA', color: 'Sorrel' },
        mother: { name: "CH Abyssinian Royal Nala", title: 'Champion FIFe', color: 'Ruddy' }
      },
      health: {
        vaccinated: true, vaccinationDate: '2024-12-05', dewormed: true, microchipped: true,
        microchipNumber: '616093901123456', vetChecked: true, hcmTested: false,
        pkdTested: true, pkdResult: 'N/N', fivFelvTested: true, fivFelvResult: 'Negatywny',
        healthCertificate: true, healthGuarantee: '24 miesiące',
        veterinarian: 'Dr wet. Michał Kowalczyk - Poznań Vet'
      },
      stats: { views: 4321, likes: 987, shares: 67, inquiries: 18, lastUpdated: '2024-12-20' },
      personality: ['Aktywny', 'Ciekawy', 'Inteligentny', 'Towarzyski'],
      specialFeatures: ['Ticked coat', 'Athletic build', 'Very playful', 'Dog-like personality'],
      included: ['Rodowód FIFe+TICA', 'Chip', 'Paszport', 'Szczepienia', 'Starter pack'],
      readyToGo: '2025-01-05',
      delivery: { personal: true, shipping: true, shippingCost: '380 PLN', meetingLocation: 'Poznań Stary Rynek' },
      videos: [],
      featured: false,
      verified: true,
      urgent: false,
      status: 'available'
    },
    {
      id: 12,
      name: 'RUSSIAN BLUE Mystery',
      breed: 'Russian Blue',
      color: 'Blue',
      gender: 'Samica',
      birthDate: '2024-02-20',
      age: '10 miesięcy',
      price: 5900,
      priceFormatted: '5 900 PLN',
      availableForBreeding: true,
      img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
      gallery: ['https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800', 'https://images.unsplash.com/photo-1531040630173-7cfb894c8eaa?w=800'],
      breeder: {
        name: '*PL Russian Blue Elite',
        prefix: 'Russian Blue Elite',
        owner: 'Aleksandra Nowak',
        rating: 4.98,
        reviewsCount: 212,
        location: 'Warszawa, Mazowieckie',
        address: 'ul. Polna 89, 00-625 Warszawa',
        phone: '+48 612 345 678',
        email: 'elite@russianblue.pl',
        website: 'www.russianblueelite.pl',
        responseTime: '< 2 godzin',
        verified: true,
        memberSince: '2017',
        totalCatsSold: 134,
        activeLitters: 2,
        organization: 'FIFe / WCF / FPL',
        description: 'Hodowla Russian Blue z importami z Rosji. Koty o idealnym charakterze i typie.'
      },
      pedigree: {
        fife: true,
        wcf: true,
        tica: false,
        fifeNumber: 'PL*RBELITE-RUS-2024-0156',
        wcfNumber: 'WCF-PL-RUS-2024-0123',
        registeredIn: 'FPL + WCF',
        generations: 6,
        champions: 10
      },
      parents: {
        father: { name: "IC Russian Blue Elite Silver Prince", title: 'International Champion', color: 'Blue', import: 'Import Rosja' },
        mother: { name: "CH Russian Blue Elite Emerald Eyes", title: 'Champion FIFe', color: 'Blue' }
      },
      health: {
        vaccinated: true, vaccinationDate: '2024-11-28', dewormed: true, microchipped: true,
        microchipNumber: '616093901234567', vetChecked: true, hcmTested: true, hcmResult: 'Negatywny',
        pkdTested: true, pkdResult: 'N/N', fivFelvTested: true, fivFelvResult: 'Negatywny',
        healthCertificate: true, healthGuarantee: '36 miesięcy',
        veterinarian: 'Dr wet. Anna Lewandowska - Russian Vet Clinic'
      },
      stats: { views: 6234, likes: 1534, shares: 98, inquiries: 24, lastUpdated: '2024-12-19' },
      personality: ['Delikatna', 'Lojalna', 'Cicha', 'Inteligentna'],
      specialFeatures: ['Green eyes', 'Silver-blue coat', 'Quiet voice', 'Breeding rights'],
      included: ['Rodowód FIFe+WCF', 'Chip', 'Paszport EU', 'Szczepienia', 'Testy', 'Umowa hodowlana'],
      readyToGo: 'Gotowa do odbioru',
      delivery: { personal: true, shipping: true, shippingCost: '450 PLN', international: true, meetingLocation: 'Warszawa Centrum' },
      videos: [{ url: 'https://example.com/mystery.mp4', title: 'Mystery - elegancja', duration: '1:30' }],
      featured: true,
      verified: true,
      urgent: false,
      status: 'available'
    },
    {
      id: 13,
      name: 'BIRMAN SACRED Luna',
      breed: 'Birman',
      color: 'Seal Point',
      gender: 'Samica',
      birthDate: '2024-05-10',
      age: '7 miesięcy',
      price: 6500,
      priceFormatted: '6 500 PLN',
      availableForBreeding: false,
      img: 'https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=800',
      gallery: ['https://images.unsplash.com/photo-1583795128727-6ec3642408f8?w=800'],
      breeder: {
        name: '*PL Sacred Birman',
        prefix: 'Sacred Birman',
        owner: 'Monika Kowalska',
        rating: 4.97,
        reviewsCount: 187,
        location: 'Wrocław, Dolnośląskie',
        address: 'ul. Świdnicka 67, 50-067 Wrocław',
        phone: '+48 613 456 789',
        email: 'sacred@birman.pl',
        website: 'www.sacredbirman.pl',
        responseTime: '< 2 godzin',
        verified: true,
        memberSince: '2018',
        totalCatsSold: 98,
        activeLitters: 1,
        organization: 'FIFe / TICA / FPL',
        description: 'Hodowla Świętych Kotów Birmy. Koty o anielskim charakterze i niebieskich oczach.'
      },
      pedigree: {
        fife: true,
        wcf: true,
        tica: true,
        fifeNumber: 'PL*SACBIR-BIR-2024-0178',
        ticaNumber: 'TICA-PL-BIR-2024-0145',
        registeredIn: 'FPL + TICA + WCF',
        generations: 5,
        champions: 8
      },
      parents: {
        father: { name: "GC Sacred Birman Blue Heaven", title: 'Grand Champion TICA', color: 'Blue Point' },
        mother: { name: "IC Sacred Birman Angel Wings", title: 'International Champion', color: 'Seal Point' }
      },
      health: {
        vaccinated: true, vaccinationDate: '2024-12-01', dewormed: true, microchipped: true,
        microchipNumber: '616093901345678', vetChecked: true, hcmTested: true, hcmResult: 'Negatywny',
        pkdTested: true, pkdResult: 'N/N', fivFelvTested: true, fivFelvResult: 'Negatywny',
        healthCertificate: true, healthGuarantee: '24 miesiące',
        veterinarian: 'Dr wet. Paweł Nowak - Birman Vet Wrocław'
      },
      stats: { views: 5678, likes: 1423, shares: 103, inquiries: 21, lastUpdated: '2024-12-20' },
      personality: ['Łagodna', 'Spokojna', 'Duchowa', 'Rodzinna'],
      specialFeatures: ['Sapphire blue eyes', 'White mittens', 'Sacred cat of Burma', 'Perfect temperament'],
      included: ['Rodowód FIFe+TICA+WCF', 'Chip', 'Paszport', 'Szczepienia', 'Starter premium'],
      readyToGo: '2025-01-15',
      delivery: { personal: true, shipping: true, shippingCost: '400 PLN', meetingLocation: 'Wrocław Rynek' },
      videos: [],
      featured: true,
      verified: true,
      urgent: false,
      status: 'available'
    },
    {
      id: 14,
      name: 'ORIENTAL STAR Bella',
      breed: 'Oriental Shorthair',
      color: 'Ebony',
      gender: 'Samica',
      birthDate: '2024-06-15',
      age: '6 miesięcy',
      price: 5700,
      priceFormatted: '5 700 PLN',
      availableForBreeding: false,
      img: 'https://images.unsplash.com/photo-1517451330947-7809dead78d5?w=800',
      gallery: ['https://images.unsplash.com/photo-1517451330947-7809dead78d5?w=800'],
      breeder: {
        name: '*PL Oriental Stars',
        prefix: 'Oriental Stars',
        owner: 'Karolina Mazur',
        rating: 4.93,
        reviewsCount: 156,
        location: 'Łódź, Łódzkie',
        address: 'ul. Piotrkowska 234, 90-234 Łódź',
        phone: '+48 614 567 890',
        email: 'stars@oriental.pl',
        website: 'www.orientalstars.pl',
        responseTime: '< 4 godzin',
        verified: true,
        memberSince: '2019',
        totalCatsSold: 67,
        activeLitters: 1,
        organization: 'TICA / FPL',
        description: 'Hodowla Oriental Shorthair. Koty eleganckie, gadatliwe, o wspaniałym typie.'
      },
      pedigree: {
        fife: false,
        wcf: false,
        tica: true,
        ticaNumber: 'TICA-PL-ORI-2024-0167',
        registeredIn: 'TICA',
        generations: 5,
        champions: 6
      },
      parents: {
        father: { name: "CH Oriental Stars Black Panther", title: 'Champion TICA', color: 'Ebony' },
        mother: { name: "Oriental Stars Midnight Dream", title: 'Show cat', color: 'Ebony' }
      },
      health: {
        vaccinated: true, vaccinationDate: '2024-12-10', dewormed: true, microchipped: true,
        microchipNumber: '616093901456789', vetChecked: true, hcmTested: false,
        pkdTested: false, fivFelvTested: true, fivFelvResult: 'Negatywny',
        healthCertificate: true, healthGuarantee: '24 miesiące',
        veterinarian: 'Dr wet. Tomasz Kowalski - Exotic Vet Łódź'
      },
      stats: { views: 4234, likes: 987, shares: 76, inquiries: 15, lastUpdated: '2024-12-18' },
      personality: ['Gadatliwa', 'Towarzyska', 'Elegancka', 'Aktywna'],
      specialFeatures: ['Large ears', 'Slender body', 'Very vocal', 'Dog-like loyalty'],
      included: ['Rodowód TICA', 'Chip', 'Paszport', 'Szczepienia', 'Wyprawka'],
      readyToGo: '2025-01-20',
      delivery: { personal: true, shipping: true, shippingCost: '360 PLN', meetingLocation: 'Łódź Manufaktura' },
      videos: [],
      featured: false,
      verified: true,
      urgent: false,
      status: 'available'
    },
    {
      id: 15,
      name: 'CHARTREUX KNIGHT Silver',
      breed: 'Chartreux',
      color: 'Blue',
      gender: 'Samiec',
      birthDate: '2024-03-15',
      age: '9 miesięcy',
      price: 6300,
      priceFormatted: '6 300 PLN',
      availableForBreeding: true,
      img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800',
      gallery: ['https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800'],
      breeder: {
        name: '*PL Chartreux Noble',
        prefix: 'Chartreux Noble',
        owner: 'Robert Wiśniewski',
        rating: 4.96,
        reviewsCount: 176,
        location: 'Poznań, Wielkopolskie',
        address: 'ul. Półwiejska 45, 60-201 Poznań',
        phone: '+48 615 678 901',
        email: 'noble@chartreux.pl',
        website: 'www.chartreuxnoble.pl',
        responseTime: '< 3 godzin',
        verified: true,
        memberSince: '2018',
        totalCatsSold: 89,
        activeLitters: 1,
        organization: 'FIFe / WCF / FPL',
        description: 'Hodowla Chartreux linia francuska. Koty o spokojnym charakterze i miedzianym spojrzeniu.'
      },
      pedigree: {
        fife: true,
        wcf: true,
        tica: false,
        fifeNumber: 'PL*CHANOBLE-CHA-2024-0189',
        wcfNumber: 'WCF-PL-CHA-2024-0156',
        registeredIn: 'FPL + WCF',
        generations: 6,
        champions: 9
      },
      parents: {
        father: { name: "IC Chartreux Noble French Knight", title: 'International Champion', color: 'Blue', import: 'Import Francja' },
        mother: { name: "CH Chartreux Noble Silver Lady", title: 'Champion FIFe', color: 'Blue' }
      },
      health: {
        vaccinated: true, vaccinationDate: '2024-11-25', dewormed: true, microchipped: true,
        microchipNumber: '616093901567890', vetChecked: true, hcmTested: true, hcmResult: 'Negatywny',
        pkdTested: true, pkdResult: 'N/N', fivFelvTested: true, fivFelvResult: 'Negatywny',
        healthCertificate: true, healthGuarantee: '24 miesiące',
        veterinarian: 'Dr wet. Ewa Nowak - Chartreux Vet Poznań'
      },
      stats: { views: 5234, likes: 1298, shares: 89, inquiries: 19, lastUpdated: '2024-12-19' },
      personality: ['Spokojny', 'Cichy', 'Lojalny', 'Inteligentny'],
      specialFeatures: ['Blue-grey coat', 'Copper eyes', 'Quiet voice', 'Breeding quality'],
      included: ['Rodowód FIFe+WCF', 'Chip', 'Paszport', 'Szczepienia', 'Testy', 'Umowa hodowlana'],
      readyToGo: 'Gotowy do odbioru',
      delivery: { personal: true, shipping: true, shippingCost: '390 PLN', meetingLocation: 'Poznań Stary Browar' },
      videos: [],
      featured: false,
      verified: true,
      urgent: false,
      status: 'available'
    }
    // ... kontynuacja kotów 16-25 w kodzie głównym
  ]

  // Merge additional cats with main cats array
  const allCats = [...cats, ...additionalCats]

  // 🤖 AI CHATBOT - SUPER INTELIGENTNY DORADCA
  const [showAIChat, setShowAIChat] = useState(false)
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '👋 Cześć! Jestem AI Doradcą CAT PURRE. Pomogę Ci wybrać idealnego kota rasowego! Powiedz mi, jakiego towarzysza szukasz?',
      timestamp: Date.now(),
      suggestions: [
        'Spokojny kot dla rodziny z dziećmi',
        'Aktywny kot do małego mieszkania',
        'Kot hypoalergiczny',
        'Kot do hodowli'
      ]
    }
  ])
  const [aiInput, setAiInput] = useState('')
  const [aiTyping, setAiTyping] = useState(false)

  const generateAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()
    
    // MEGA AI LOGIC
    if (msg.includes('spokojny') || msg.includes('łagodny') || msg.includes('spokojnego')) {
      const calmBreeds = allCats.filter(cat => 
        cat.personality.some(p => p.toLowerCase().includes('spokojn') || p.toLowerCase().includes('łagod'))
      ).slice(0, 3)
      
      return {
        text: `🐱 Polecam spokojne rasy! Idealnie sprawdzą się:\n\n${calmBreeds.map(cat => 
          `• ${cat.breed} (${cat.name}) - ${cat.personality.join(', ')} - ${cat.priceFormatted}`
        ).join('\n\n')}`,
        suggestions: ['Zobacz więcej spokojnych ras', 'Które najlepsze dla dzieci?', 'Porównaj te koty'],
        recommendedCats: calmBreeds.map(c => c.id)
      }
    }
    
    if (msg.includes('aktywny') || msg.includes('energiczny') || msg.includes('zabaw')) {
      const activeBreeds = allCats.filter(cat => 
        cat.personality.some(p => p.toLowerCase().includes('aktywn') || p.toLowerCase().includes('energiczn'))
      ).slice(0, 3)
      
      return {
        text: `⚡ Koty energiczne to świetny wybór!\n\n${activeBreeds.map(cat => 
          `• ${cat.breed} (${cat.name}) - ${cat.personality.join(', ')} - ${cat.priceFormatted}`
        ).join('\n\n')}\n\nPamiętaj: aktywne koty potrzebują dużo zabawy i stymulacji!`,
        suggestions: ['Jakie zabawki dla aktywnych kotów?', 'Ile czasu na zabawę?', 'Zobacz te koty'],
        recommendedCats: activeBreeds.map(c => c.id)
      }
    }
    
    if (msg.includes('alergi') || msg.includes('hypoalergiczn')) {
      const hypoallergenic = allCats.filter(cat => 
        cat.breed === 'Sphynx' || cat.breed === 'Siberian' || cat.breed === 'Russian Blue'
      )
      
      return {
        text: `🤧 Dla alergików polecam:\n\n${hypoallergenic.map(cat => 
          `• ${cat.breed} - ${cat.breed === 'Sphynx' ? 'bez futra' : 'niska produkcja alergenu Fel d 1'}\n  ${cat.name} - ${cat.priceFormatted}`
        ).join('\n\n')}\n\n💡 Sphynx to najlepsza opcja, ale wymaga specjalnej pielęgnacji skóry!`,
        suggestions: ['Pielęgnacja Sphynx', 'Siberian vs Russian Blue', 'Testy alergiczne'],
        recommendedCats: hypoallergenic.map(c => c.id)
      }
    }
    
    if (msg.includes('dziec') || msg.includes('rodzin')) {
      const familyCats = allCats.filter(cat => 
        cat.personality.some(p => p.toLowerCase().includes('rodzinn') || p.toLowerCase().includes('dziec'))
      ).slice(0, 3)
      
      return {
        text: `👨‍👩‍👧‍👦 Idealne dla rodziny z dziećmi:\n\n${familyCats.map(cat => 
          `• ${cat.breed} (${cat.name})\n  Cechy: ${cat.personality.join(', ')}\n  ${cat.priceFormatted}`
        ).join('\n\n')}\n\n✅ Wszystkie te koty są cierpliwe i łagodne!`,
        suggestions: ['Jak przygotować dziecko?', 'Bezpieczeństwo z kotem', 'Zobacz więcej'],
        recommendedCats: familyCats.map(c => c.id)
      }
    }
    
    if (msg.includes('hodowl') || msg.includes('breeding')) {
      const breedingCats = allCats.filter(cat => cat.availableForBreeding).slice(0, 3)
      
      return {
        text: `🏆 Koty z prawami hodowlanymi:\n\n${breedingCats.map(cat => 
          `• ${cat.name} (${cat.breed})\n  Organizacja: ${cat.breeder.organization}\n  Rodowód: ${cat.pedigree.generations} pokoleń, ${cat.pedigree.champions} championów\n  ${cat.priceFormatted}`
        ).join('\n\n')}\n\n📋 Wszystkie z pełnymi testami genetycznymi i umową hodowlaną!`,
        suggestions: ['Jak założyć hodowlę?', 'Wymagania organizacji', 'Porównaj koty'],
        recommendedCats: breedingCats.map(c => c.id)
      }
    }
    
    if (msg.includes('cena') || msg.includes('budżet') || msg.includes('tani')) {
      const priceRanges = {
        low: allCats.filter(cat => cat.price < 6000).slice(0, 3),
        mid: allCats.filter(cat => cat.price >= 6000 && cat.price < 8000).slice(0, 3),
        high: allCats.filter(cat => cat.price >= 8000).slice(0, 3)
      }
      
      return {
        text: `💰 Przedziały cenowe:\n\n🟢 DO 6000 PLN:\n${priceRanges.low.map(c => `• ${c.breed} - ${c.priceFormatted}`).join('\n')}\n\n🟡 6000-8000 PLN:\n${priceRanges.mid.map(c => `• ${c.breed} - ${c.priceFormatted}`).join('\n')}\n\n🔴 POWYŻEJ 8000 PLN:\n${priceRanges.high.map(c => `• ${c.breed} - ${c.priceFormatted}`).join('\n')}\n\n💡 Pamiętaj: cena zależy od rodowodu, testów i linii (pet/breeding/show)!`,
        suggestions: ['Dlaczego różne ceny?', 'Co wpływa na cenę?', 'Ukryte koszty'],
        recommendedCats: [...priceRanges.low, ...priceRanges.mid].map(c => c.id)
      }
    }
    
    // DEFAULT RESPONSE
    return {
      text: '💡 Mogę pomóc w wielu kwestiach:\n\n🐱 Wybór rasy\n❤️ Charakterystyka\n🏥 Wymagania zdrowotne\n💰 Budżet\n👨‍👩‍👧 Dopasowanie do rodziny\n🏠 Wymagania mieszkaniowe\n\nZadaj mi konkretne pytanie!',
      suggestions: [
        'Spokojny kot dla rodziny',
        'Aktywne rasy',
        'Koty hypoalergiczne',
        'Koty do hodowli'
      ],
      recommendedCats: []
    }
  }

  const handleSendAIMessage = () => {
    if (!aiInput.trim()) return
    
    // User message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: aiInput,
      timestamp: Date.now()
    }
    
    setAiMessages(prev => [...prev, userMsg])
    setAiInput('')
    setAiTyping(true)
    
    // AI Response with delay
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
                  <h5 className="rec-title">🎯 Polecane koty:</h5>
                  <div className="rec-cats-grid">
                    {msg.recommendedCats.map(catId => {
                      const cat = allCats.find(c => c.id === catId)
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
              <span className="msg-time">{new Date(msg.timestamp).toLocaleTimeString('pl-PL', {hour: '2-digit', minute: '2-digit'})}</span>
            </div>
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
          onKeyPress={(e) => e.key === 'Enter' && handleSendAIMessage()}
        />
        <button className="ai-send-btn" onClick={handleSendAIMessage}>
          ✈️
        </button>
      </div>
    </div>
  )

  // 🆚 PORÓWNYWARKA KOTÓW
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonCats, setComparisonCats] = useState([])

  const handleAddToComparison = (cat) => {
    if (comparisonCats.length >= 3) {
      alert('⚠️ Możesz porównać maksymalnie 3 koty!')
      return
    }
    if (comparisonCats.find(c => c.id === cat.id)) {
      alert('⚠️ Ten kot jest już w porównaniu!')
      return
    }
    setComparisonCats([...comparisonCats, cat])
    setShowComparison(true)
  }

  const handleRemoveFromComparison = (catId) => {
    setComparisonCats(comparisonCats.filter(c => c.id !== catId))
  }

  const renderComparison = () => {
    if (!showComparison || comparisonCats.length === 0) return null

    return (
      <div className="comparison-panel">
        <div className="comparison-header">
          <h3 className="comparison-title">🆚 Porównanie kotów ({comparisonCats.length}/3)</h3>
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
                <td className="label">Testy HCM</td>
                {comparisonCats.map(cat => (
                  <td key={cat.id}>
                    {cat.health.hcmTested ? '✅ ' + cat.health.hcmResult : '❌'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="label">Testy PKD</td>
                {comparisonCats.map(cat => (
                  <td key={cat.id}>
                    {cat.health.pkdTested ? '✅ ' + cat.health.pkdResult : '❌'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="label">Gwarancja</td>
                {comparisonCats.map(cat => <td key={cat.id}>{cat.health.healthGuarantee}</td>)}
              </tr>
              <tr>
                <td className="label">Osobowość</td>
                {comparisonCats.map(cat => (
                  <td key={cat.id}>
                    {cat.personality.slice(0, 3).map(p => (
                      <span key={p} className="personality-mini">{p}</span>
                    ))}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="label">Lokalizacja</td>
                {comparisonCats.map(cat => <td key={cat.id}>📍 {cat.breeder.location}</td>)}
              </tr>
              <tr>
                <td className="label">Ocena hodowcy</td>
                {comparisonCats.map(cat => <td key={cat.id}>⭐ {cat.breeder.rating} ({cat.breeder.reviewsCount})</td>)}
              </tr>
              <tr>
                <td className="label">Status</td>
                {comparisonCats.map(cat => (
                  <td key={cat.id}>
                    <span className="status-badge available">✅ Dostępny</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="label">Akcje</td>
                {comparisonCats.map(cat => (
                  <td key={cat.id}>
                    <button 
                      className="compare-action-btn"
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

  // Floating AI button
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

  Dodaj to do pliku (kontynuacja po MSG 5):

  // 🐱 KOTY 16-25 (DOKOŃCZENIE PEŁNEJ BAZY)
  const moreCats = [
    {
      id: 16,
      name: 'SOMALI FOX Red',
      breed: 'Somali',
      color: 'Sorrel (Red)',
      gender: 'Samica',
      birthDate: '2024-04-25',
      age: '7.5 miesiąca',
      price: 6700,
      priceFormatted: '6 700 PLN',
      availableForBreeding: false,
      img: 'https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=800',
      gallery: ['https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=800'],
      breeder: {
        name: 'Somali Masters',
        location: 'Kraków',
        coordinates: { lat: 50.0647, lng: 19.9450 }
      }
    },
    {
      id: 17,
      name: 'TURKISH VAN Snow',
      breed: 'Turkish Van',
      color: 'Van Red Tabby',
      gender: 'Samiec',
      birthDate: '2024-03-10',
      age: '9 miesięcy',
      price: 5900,
      priceFormatted: '5 900 PLN',
      img: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800',
      breeder: {
        name: 'Van Elite',
        location: 'Łódź',
        coordinates: { lat: 51.7592, lng: 19.4560 }
      }
    },
    {
      id: 18,
      name: 'BURMESE Chocolate',
      breed: 'Burmese',
      color: 'Chocolate',
      gender: 'Samica',
      birthDate: '2024-05-01',
      age: '7 miesięcy',
      price: 6200,
      priceFormatted: '6 200 PLN',
      img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800',
      breeder: {
        name: 'Burmese Royals',
        location: 'Wrocław',
        coordinates: { lat: 51.1079, lng: 17.0385 }
      }
    },
    {
      id: 19,
      name: 'CHARTREUX Blue',
      breed: 'Chartreux',
      color: 'Blue',
      gender: 'Samiec',
      birthDate: '2024-04-15',
      age: '8 miesięcy',
      price: 6500,
      priceFormatted: '6 500 PLN',
      img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800',
      breeder: {
        name: 'French Chartreux',
        location: 'Szczecin',
        coordinates: { lat: 53.4285, lng: 14.5528 }
      }
    },
    {
      id: 20,
      name: 'KORAT Silver',
      breed: 'Korat',
      color: 'Silver Blue',
      gender: 'Samica',
      birthDate: '2024-04-20',
      age: '8 miesięcy',
      price: 7200,
      priceFormatted: '7 200 PLN',
      img: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800',
      breeder: {
        name: 'Thai Treasures',
        location: 'Katowice',
        coordinates: { lat: 50.2649, lng: 19.0238 }
      }
    },
    {
      id: 21,
      name: 'NORWEGIAN Prince',
      breed: 'Norwegian Forest',
      color: 'Brown Tabby',
      gender: 'Samiec',
      birthDate: '2024-03-01',
      age: '9.5 miesiąca',
      price: 5800,
      priceFormatted: '5 800 PLN',
      img: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800',
      breeder: {
        name: 'Nordic Cats',
        location: 'Gdańsk',
        coordinates: { lat: 54.3520, lng: 18.6466 }
      }
    },
    {
      id: 22,
      name: 'EXOTIC Teddy',
      breed: 'Exotic Shorthair',
      color: 'Cream',
      gender: 'Samica',
      birthDate: '2024-05-10',
      age: '7 miesięcy',
      price: 6900,
      priceFormatted: '6 900 PLN',
      img: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800',
      breeder: {
        name: 'Teddy Bears',
        location: 'Poznań',
        coordinates: { lat: 52.4064, lng: 16.9252 }
      }
    },
    {
      id: 23,
      name: 'PERSIAN Doll Face',
      breed: 'Persian',
      color: 'White',
      gender: 'Samica',
      birthDate: '2024-04-01',
      age: '8.5 miesiąca',
      price: 7500,
      priceFormatted: '7 500 PLN',
      img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800',
      breeder: {
        name: 'Persian Palace',
        location: 'Warszawa',
        coordinates: { lat: 52.2297, lng: 21.0122 }
      }
    },
    {
      id: 24,
      name: 'SPHYNX Alien',
      breed: 'Sphynx',
      color: 'Pink',
      gender: 'Samiec',
      birthDate: '2024-05-15',
      age: '7 miesięcy',
      price: 8500,
      priceFormatted: '8 500 PLN',
      img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800',
      breeder: {
        name: 'Naked Beauties',
        location: 'Kraków',
        coordinates: { lat: 50.0647, lng: 19.9450 }
      }
    },
    {
      id: 25,
      name: 'SCOTTISH FOLD Luna',
      breed: 'Scottish Fold',
      color: 'Lilac',
      gender: 'Samica',
      birthDate: '2024-04-25',
      age: '7.5 miesiąca',
      price: 7800,
      priceFormatted: '7 800 PLN',
      img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      breeder: {
        name: 'Fold Masters',
        location: 'Gdynia',
        coordinates: { lat: 54.5189, lng: 18.5305 }
      }
    }
  ]

  // Dodaj nowe koty do głównej tablicy
  cats = [...cats, ...moreCats]

  // 🗺️ MAPA HODOWCÓW
  const renderBreedersMap = () => {
    const breeders = [...new Set(cats.map(cat => cat.breeder.name))]
    
    return (
      <div className="breeders-map-section">
        <h3>🗺️ Mapa Hodowców w Polsce</h3>
        <div className="map-container">
          <div className="map-placeholder">
            {breeders.map((breeder, idx) => {
              const breederCat = cats.find(c => c.breeder.name === breeder)
              return (
                <div key={idx} className="breeder-marker" style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 70 + 10}%`
                }}>
                  <span className="marker-pin">📍</span>
                  <div className="marker-tooltip">
                    <strong>{breeder}</strong>
                    <p>{breederCat?.breeder.location}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // 📅 SYSTEM REZERWACJI
  const handleReservation = (cat) => {
    setSelectedCat(cat)
    alert(`📅 Rezerwacja kota: ${cat.name}\n\nWpłać zadatek 500 PLN aby zarezerwować!\nPełna kwota: ${cat.priceFormatted}`)
  }

  // 💳 SYSTEM PŁATNOŚCI
  const handlePayment = (cat) => {
    alert(`💳 Wybierz metodę płatności dla ${cat.name}:\n\n✅ Stripe (karta)\n✅ BLIK\n✅ Przelewy24\n✅ PayPal\n\nCena: ${cat.priceFormatted}`)
  }

  // 📄 GENERATOR UMOWY
  const handleContract = (cat) => {
    alert(`📄 Generowanie umowy kupna-sprzedaży...\n\nKot: ${cat.name}\nHodowca: ${cat.breeder.name}\nCena: ${cat.priceFormatted}\n\n✅ Umowa zostanie wysłana na email w formacie PDF`)
  }

  // 📊 MSG 7/8 - ULTIMATE DASHBOARD + REVIEWS + FAVORITES + HISTORY + NEWSLETTER

  // 🎯 USER DASHBOARD STATE (rozszerzony)
  const [userProfile, setUserProfile] = useState({
    name: 'Kocioł Miłośnik',
    email: 'kociol@catpurre.pl',
    avatar: '😺',
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    badges: ['🏆 Weryfikowany', '⭐ Top Recenzent', '💎 Premium', '🎯 10+ Zakupów'],
    joinDate: '2024-01-15',
    totalSpent: 45600,
    catsOwned: 3,
    reviewsWritten: 18,
    helpfulVotes: 234
  })

  const [favorites, setFavorites] = useState([])
  const [viewHistory, setViewHistory] = useState([])
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', icon: '✅', text: 'Nowy kot w Twojej okolicy!', time: '2 min temu', unread: true },
    { id: 2, type: 'info', icon: '💳', text: 'Twoja rezerwacja została potwierdzona', time: '1 godz. temu', unread: true },
    { id: 3, type: 'warning', icon: '⏰', text: 'Promocja kończy się za 3h!', time: '3 godz. temu', unread: false },
    { id: 4, type: 'heart', icon: '❤️', text: 'BENGAL PRINCE otrzymał nowe zdjęcia', time: '5 godz. temu', unread: false }
  ])

  const [reviews, setReviews] = useState([
    {
      id: 1,
      catId: 1,
      userName: 'Anna Kowalska',
      userAvatar: '👩',
      rating: 5,
      date: '2025-12-15',
      verified: true,
      helpful: 45,
      comment: 'Przepiękny kot! Hodowca super profesjonalny, wszystkie dokumenty w porządku. Luna jest zdrowa, zaszczepiona i mega towarzyska! Polecam w 100% 🐱❤️',
      images: ['🖼️', '🖼️', '🖼️'],
      breederResponse: 'Dziękujemy za piękne słowa! Życzymy dużo radości z Luną! 😻'
    },
    {
      id: 2,
      catId: 1,
      userName: 'Piotr Nowak',
      userAvatar: '👨',
      rating: 5,
      date: '2025-12-10',
      verified: true,
      helpful: 32,
      comment: 'Najlepszy hodowca w Polsce! Kot ma pedigree FIFe, wszystkie badania genetyczne, a obsługa na najwyższym poziomie.',
      images: [],
      breederResponse: null
    },
    {
      id: 3,
      catId: 2,
      userName: 'Magdalena Zielińska',
      userAvatar: '👩‍🦰',
      rating: 5,
      date: '2025-12-08',
      verified: true,
      helpful: 28,
      comment: 'Ragdoll ideał! Spokojny, łagodny, świetny dla dzieci. Hodowla na medal! 🏅',
      images: ['🖼️'],
      breederResponse: 'Cieszymy się bardzo! 💕'
    }
  ])

  // 🎮 GAMIFICATION - Achievement System
  const achievements = [
    { id: 1, icon: '🎯', name: 'Pierwszy Zakup', desc: 'Kupiłeś pierwszego kota', unlocked: true, xp: 100 },
    { id: 2, icon: '📝', name: 'Recenzent', desc: 'Napisałeś 10 recenzji', unlocked: true, xp: 200 },
    { id: 3, icon: '❤️', name: 'Kolekcjoner', desc: 'Masz 20 ulubionych', unlocked: false, progress: 15, goal: 20, xp: 150 },
    { id: 4, icon: '👑', name: 'VIP Klient', desc: 'Wydałeś ponad 50k PLN', unlocked: false, progress: 45600, goal: 50000, xp: 500 },
    { id: 5, icon: '🔥', name: 'Streak 7 Dni', desc: 'Zaloguj się 7 dni z rzędu', unlocked: true, xp: 300 },
    { id: 6, icon: '🌟', name: 'Influencer', desc: '100 helpful votes', unlocked: true, xp: 400 }
  ]

  // 📊 USER STATS
  const userStats = [
    { label: 'Koty w posiadaniu', value: userProfile.catsOwned, icon: '🐱', color: '#FF6B9D' },
    { label: 'Napisane recenzje', value: userProfile.reviewsWritten, icon: '⭐', color: '#FFD700' },
    { label: 'Helpful votes', value: userProfile.helpfulVotes, icon: '👍', color: '#4CAF50' },
    { label: 'Poziom konta', value: `Lvl ${userProfile.level}`, icon: '🏆', color: '#9C27B0' }
  ]

  // ⚡ SMART RECOMMENDATIONS (AI-powered)
  const getSmartRecommendations = () => {
    // Analiza ulubionych + historia
    const favoriteBreeds = favorites.map(f => f.breed)
    const viewedBreeds = viewHistory.map(h => h.breed)
    
    return cats
      .filter(cat => !favorites.some(f => f.id === cat.id))
      .filter(cat => favoriteBreeds.includes(cat.breed) || viewedBreeds.includes(cat.breed))
      .slice(0, 4)
  }

  // 💝 TOGGLE FAVORITE (z animacją i local storage)
  const toggleFavorite = (cat) => {
    const isFav = favorites.some(f => f.id === cat.id)
    
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== cat.id))
      showNotification('Usunięto z ulubionych', '💔')
    } else {
      setFavorites([...favorites, { ...cat, savedAt: Date.now() }])
      showNotification(`${cat.name} dodany do ulubionych!`, '❤️')
      
      // XP bonus
      setUserProfile({...userProfile, xp: userProfile.xp + 10})
    }
    
    // Save to localStorage
    localStorage.setItem('catpurre_favorites', JSON.stringify(favorites))
  }

  // 📖 TRACK HISTORY
  const trackView = (cat) => {
    const exists = viewHistory.some(h => h.id === cat.id)
    if (!exists) {
      const newHistory = [{ ...cat, viewedAt: Date.now() }, ...viewHistory].slice(0, 20)
      setViewHistory(newHistory)
      localStorage.setItem('catpurre_history', JSON.stringify(newHistory))
    }
  }

  // 🔔 SHOW NOTIFICATION
  const showNotification = (text, icon = '✅') => {
    const newNotif = {
      id: Date.now(),
      type: 'success',
      icon,
      text,
      time: 'Teraz',
      unread: true
    }
    setNotifications([newNotif, ...notifications])
    
    // Auto-hide after 5s
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotif.id))
    }, 5000)
  }

  // 📊 RENDER USER DASHBOARD
  const renderDashboard = () => (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-profile-card">
          <div className="profile-avatar-large">{userProfile.avatar}</div>
          <div className="profile-info">
            <h2>{userProfile.name}</h2>
            <p className="profile-email">{userProfile.email}</p>
            <div className="profile-badges">
              {userProfile.badges.map((badge, idx) => (
                <span key={idx} className="badge-chip">{badge}</span>
              ))}
            </div>
          </div>
          <div className="profile-level-box">
            <div className="level-number">Lvl {userProfile.level}</div>
            <div className="xp-bar">
              <div className="xp-fill" style={{width: `${(userProfile.xp / userProfile.nextLevelXp) * 100}%`}}></div>
            </div>
            <p className="xp-text">{userProfile.xp} / {userProfile.nextLevelXp} XP</p>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="stats-grid">
        {userStats.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{borderLeftColor: stat.color}}>
            <div className="stat-icon" style={{background: stat.color}}>{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ACHIEVEMENTS */}
      <div className="achievements-section">
        <h3>🏆 Osiągnięcia</h3>
        <div className="achievements-grid">
          {achievements.map(ach => (
            <div key={ach.id} className={`achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">{ach.icon}</div>
              <div className="achievement-name">{ach.name}</div>
              <div className="achievement-desc">{ach.desc}</div>
              {!ach.unlocked && ach.progress !== undefined && (
                <div className="achievement-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${(ach.progress / ach.goal) * 100}%`}}></div>
                  </div>
                  <span className="progress-text">{ach.progress}/{ach.goal}</span>
                </div>
              )}
              <div className="achievement-xp">+{ach.xp} XP</div>
            </div>
          ))}
        </div>
      </div>

      {/* NOTIFICATIONS LIVE FEED */}
      <div className="notifications-feed">
        <h3>🔔 Powiadomienia</h3>
        {notifications.map(notif => (
          <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
            <span className="notif-icon">{notif.icon}</span>
            <div className="notif-content">
              <p className="notif-text">{notif.text}</p>
              <span className="notif-time">{notif.time}</span>
            </div>
            {notif.unread && <span className="unread-dot"></span>}
          </div>
        ))}
      </div>

      {/* SMART RECOMMENDATIONS */}
      <div className="recommendations-section">
        <h3>✨ Rekomendacje AI dla Ciebie</h3>
        <p className="recommendations-subtitle">Na podstawie Twoich ulubionych i historii przeglądania</p>
        <div className="cats-grid">
          {getSmartRecommendations().map(cat => (
            <div key={cat.id} className="cat-card-mini" onClick={() => {
              setSelectedCat(cat)
              trackView(cat)
            }}>
              <img src={cat.img} alt={cat.name} />
              <div className="cat-card-content">
                <h4>{cat.name}</h4>
                <p className="cat-breed">{cat.breed}</p>
                <p className="cat-price">{cat.priceFormatted}</p>
                <button className="btn-add-favorite" onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(cat)
                }}>
                  {favorites.some(f => f.id === cat.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // ⭐ RENDER REVIEWS SECTION
  const renderReviews = () => (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3>⭐ Recenzje i Oceny</h3>
        <button className="btn-write-review" onClick={() => showNotification('Formularz recenzji otwarty!', '📝')}>
          ✍️ Napisz recenzję
        </button>
      </div>

      {/* RATING SUMMARY */}
      <div className="rating-summary">
        <div className="rating-score-big">
          <span className="score-number">4.9</span>
          <div className="stars-display">⭐⭐⭐⭐⭐</div>
          <p className="rating-count">Na podstawie {reviews.length} recenzji</p>
        </div>
        <div className="rating-bars">
          {[5,4,3,2,1].map(stars => {
            const count = reviews.filter(r => r.rating === stars).length
            const percentage = (count / reviews.length) * 100
            return (
              <div key={stars} className="rating-bar-row">
                <span className="bar-label">{stars} ⭐</span>
                <div className="rating-bar">
                  <div className="rating-bar-fill" style={{width: `${percentage}%`}}></div>
                </div>
                <span className="bar-count">({count})</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="review-user">
                <span className="user-avatar">{review.userAvatar}</span>
                <div className="user-info">
                  <div className="user-name-row">
                    <strong>{review.userName}</strong>
                    {review.verified && <span className="verified-badge">✅ Zweryfikowany zakup</span>}
                  </div>
                  <div className="review-stars">{'⭐'.repeat(review.rating)}</div>
                </div>
              </div>
              <span className="review-date">{review.date}</span>
            </div>
            
            <p className="review-comment">{review.comment}</p>
            
            {review.images.length > 0 && (
              <div className="review-images">
                {review.images.map((img, idx) => (
                  <span key={idx} className="review-image-thumb">{img}</span>
                ))}
              </div>
            )}
            
            {review.breederResponse && (
              <div className="breeder-response">
                <strong>📢 Odpowiedź hodowcy:</strong>
                <p>{review.breederResponse}</p>
              </div>
            )}
            
            <div className="review-actions">
              <button className="btn-helpful" onClick={() => showNotification('Dziękujemy za głos!', '👍')}>
                👍 Pomocne ({review.helpful})
              </button>
              <button className="btn-report">🚩 Zgłoś</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // 💖 RENDER FAVORITES
  const renderFavorites = () => (
    <div className="favorites-section">
      <h2>💖 Twoje Ulubione ({favorites.length})</h2>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">💔</span>
          <p>Nie masz jeszcze żadnych ulubionych kotów</p>
          <button className="btn-browse" onClick={() => setActiveTab('home')}>
            Przeglądaj koty
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(cat => (
            <div key={cat.id} className="favorite-card">
              <button className="btn-remove-fav" onClick={() => toggleFavorite(cat)}>❌</button>
              <img src={cat.img} alt={cat.name} className="fav-img" />
              <div className="fav-content">
                <h4>{cat.name}</h4>
                <p className="fav-breed">{cat.breed}</p>
                <p className="fav-price">{cat.priceFormatted}</p>
                <span className="fav-saved-date">Dodano: {new Date(cat.savedAt).toLocaleDateString('pl-PL')}</span>
                <div className="fav-actions">
                  <button className="btn-fav-view" onClick={() => {
                    setSelectedCat(cat)
                    setShowModal(true)
                  }}>
                    👁️ Zobacz
                  </button>
                  <button className="btn-fav-buy" onClick={() => handlePayment(cat)}>
                    💳 Kup teraz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // 📚 RENDER HISTORY
  const renderHistory = () => (
    <div className="history-section">
      <h2>📚 Historia Przeglądania</h2>
      {viewHistory.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>Brak historii przeglądania</p>
        </div>
      ) : (
        <div className="history-timeline">
          {viewHistory.map(cat => (
            <div key={cat.id} className="history-item">
              <span className="history-time">{new Date(cat.viewedAt).toLocaleString('pl-PL')}</span>
              <div className="history-card">
                <img src={cat.img} alt={cat.name} className="history-img" />
                <div className="history-info">
                  <h4>{cat.name}</h4>
                  <p>{cat.breed}</p>
                  <p className="history-price">{cat.priceFormatted}</p>
                </div>
                <button className="btn-history-view" onClick={() => {
                  setSelectedCat(cat)
                  setShowModal(true)
                }}>
                  Zobacz ponownie
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // 📧 NEWSLETTER SECTION
  const renderNewsletter = () => (
    <div className="newsletter-section">
      <div className="newsletter-box">
        <span className="newsletter-icon">📧</span>
        <h3>Bądź na bieżąco!</h3>
        <p>Zapisz się do newslettera i otrzymuj:</p>
        <ul className="newsletter-benefits">
          <li>✨ Powiadomienia o nowych kotach</li>
          <li>💰 Ekskluzywne promocje i rabaty</li>
          <li>🎯 Spersonalizowane rekomendacje</li>
          <li>📚 Porady hodowlane i zdrowotne</li>
          <li>🎁 Prezenty dla subskrybentów</li>
        </ul>
        <div className="newsletter-form">
          <input 
            type="email" 
            placeholder="Twój email..." 
            className="newsletter-input"
          />
          <button className="newsletter-btn" onClick={() => showNotification('Dziękujemy za subskrypcję!', '✅')}>
            Zapisz się
          </button>
        </div>
        <p className="newsletter-privacy">🔒 Twoje dane są bezpieczne. Brak spamu!</p>
      </div>
    </div>
  )

  // 📄 FOOTER (profesjonalny)
  const renderFooter = () => (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>😻 CAT PURRE</h4>
          <p className="footer-desc">
            Największy marketplace kotów rasowych w Polsce. 
            Zaufane hodowle, zweryfikowane pedigree, bezpieczne transakcje.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link">📘 Facebook</a>
            <a href="#" className="social-link">📷 Instagram</a>
            <a href="#" className="social-link">🐦 Twitter</a>
            <a href="#" className="social-link">📺 YouTube</a>
          </div>
        </div>

        <div className="footer-column">
          <h4>🐱 Dla Kupujących</h4>
          <ul className="footer-links">
            <li><a href="#">Jak kupić kota</a></li>
            <li><a href="#">Porady dla nowych właścicieli</a></li>
            <li><a href="#">Finanse i ubezpieczenia</a></li>
            <li><a href="#">Weterynarze</a></li>
            <li><a href="#">Transport</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>🏆 Dla Hodowców</h4>
          <ul className="footer-links">
            <li><a href="#">Zostań hodowcą</a></li>
            <li><a href="#">Weryfikacja hodowli</a></li>
            <li><a href="#">Cennik i prowizje</a></li>
            <li><a href="#">Organizacje (FIFe, WCF)</a></li>
            <li><a href="#">Marketing hodowli</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>ℹ️ O Nas</h4>
          <ul className="footer-links">
            <li><a href="#">O platformie</a></li>
            <li><a href="#">Regulamin</a></li>
            <li><a href="#">Polityka prywatności</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Kontakt</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>🔒 Bezpieczeństwo</h4>
          <div className="footer-badges">
            <span className="footer-badge">✅ Zweryfikowane hodowle</span>
            <span className="footer-badge">🛡️ SSL Encryption</span>
            <span className="footer-badge">💳 Bezpieczne płatności</span>
            <span className="footer-badge">📄 Umowy prawne</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-stats">
          <span>📊 2,547 Kotów</span>
          <span>🏠 584 Hodowców</span>
          <span>⭐ 4.98/5.0 Ocena</span>
          <span>🎉 15,234 Zadowolonych klientów</span>
        </div>
        <p className="footer-copyright">
          © 2025 CAT PURRE. Wszelkie prawa zastrzeżone. Made with ❤️ for cat lovers.
        </p>
        <div className="footer-partners">
          <span>Partner FIFe 🏆</span>
          <span>Partner WCF 🏅</span>
          <span>Partner TICA 🎖️</span>
        </div>
      </div>
    </footer>
  )

  // 🔥🔥🔥 MSG 8/8 - KOMPLETNY SYSTEM RÓL + MONETYZACJA + REKLAMY (20K ZNAKÓW - PEŁNA WERSJA)

  // 👥 ROLE-BASED AUTHENTICATION SYSTEM
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Kocioł Miłośnik',
    email: 'kociol@catpurre.pl',
    role: 'client', // 'admin' | 'breeder' | 'client'
    avatar: '😺',
    verified: true,
    premium: false,
    balance: 0,
    earnings: 0,
    commission_tier: 'basic',
    registration_date: '2024-01-15',
    permissions: []
  })

  // 🔐 COMPLETE ROLE PERMISSIONS
  const roleConfig = {
    admin: {
      name: 'Administrator',
      icon: '👑',
      color: '#DC2626',
      permissions: ['view_all', 'manage_users', 'manage_breeders', 'manage_cats', 'manage_payments', 'view_analytics', 'moderate_reviews', 'send_notifications', 'manage_ads', 'manage_commissions', 'ban_users', 'verify_breeders', 'refund_payments', 'export_data']
    },
    breeder: {
      name: 'Hodowca',
      icon: '🏠',
      color: '#7C3AED',
      permissions: ['view', 'manage_own_cats', 'respond_reviews', 'view_own_analytics', 'manage_contracts', 'chat_with_clients', 'promote_listings', 'withdraw_earnings', 'manage_profile']
    },
    client: {
      name: 'Klient',
      icon: '😺',
      color: '#FF6B9D',
      permissions: ['view', 'buy', 'review', 'favorite', 'chat', 'compare', 'request_refund', 'submit_complaint']
    }
  }

  // 💰 MONETIZATION CONFIG
  const monetizationConfig = {
    commission_rates: {
      basic_breeder: 8,
      standard_breeder: 5,
      premium_breeder: 3,
      enterprise_breeder: 2
    },
    subscription_prices: {
      client_premium: 29,
      breeder_standard: 99,
      breeder_premium: 299,
      breeder_enterprise: 799
    },
    ad_prices: {
      homepage_banner: 500,
      category_banner: 200,
      featured_listing: 50,
      promoted_listing: 100,
      top_placement: 200,
      newsletter_spot: 300
    }
  }

  // 📊 PLATFORM STATS
  const [platformStats] = useState({
    total_users: 15234,
    total_breeders: 584,
    verified_breeders: 412,
    pending_verification: 23,
    total_cats: 2547,
    active_listings: 1834,
    sold_this_month: 234,
    revenue_this_month: 2456789,
    commission_earned: 184259,
    ad_revenue: 45600,
    subscription_revenue: 156300,
    total_transactions: 1567,
    avg_transaction_value: 6850,
    conversion_rate: 8.4,
    active_promotions: 67,
    pending_reviews: 89,
    reported_issues: 12,
    refund_requests: 7
  })

  // 👑 ADMIN PANEL
  const renderAdminPanel = () => (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>👑 Panel Super Administratora</h2>
        <div className="admin-user-info">
          <span className="admin-badge">Super Admin</span>
          <span className="admin-email">{currentUser.email}</span>
        </div>
      </div>

      {/* REVENUE DASHBOARD */}
      <div className="revenue-dashboard">
        <h3>💰 Przychody Platformy (Grudzień 2025)</h3>
        <div className="revenue-grid">
          <div className="revenue-card total">
            <div className="revenue-icon">💎</div>
            <div className="revenue-content">
              <div className="revenue-label">Całkowity przychód</div>
              <div className="revenue-amount">{(platformStats.revenue_this_month / 1000).toFixed(1)}K PLN</div>
              <div className="revenue-change positive">↗ +18.5% vs. lis</div>
            </div>
          </div>
          <div className="revenue-card commission">
            <div className="revenue-icon">📈</div>
            <div className="revenue-content">
              <div className="revenue-label">Prowizje od sprzedaży</div>
              <div className="revenue-amount">{(platformStats.commission_earned / 1000).toFixed(1)}K PLN</div>
              <div className="revenue-percent">{((platformStats.commission_earned / platformStats.revenue_this_month) * 100).toFixed(1)}% całości</div>
            </div>
          </div>
          <div className="revenue-card ads">
            <div className="revenue-icon">📢</div>
            <div className="revenue-content">
              <div className="revenue-label">Reklamy</div>
              <div className="revenue-amount">{(platformStats.ad_revenue / 1000).toFixed(1)}K PLN</div>
              <div className="revenue-percent">+{platformStats.active_promotions} aktywnych</div>
            </div>
          </div>
          <div className="revenue-card subs">
            <div className="revenue-icon">⭐</div>
            <div className="revenue-content">
              <div className="revenue-label">Subskrypcje</div>
              <div className="revenue-amount">{(platformStats.subscription_revenue / 1000).toFixed(1)}K PLN</div>
              <div className="revenue-percent">MRR stabilny</div>
            </div>
          </div>
        </div>
      </div>

      {/* PLATFORM STATS */}
      <div className="admin-stats-section">
        <h3>📊 Statystyki Platformy</h3>
        <div className="stats-grid-admin">
          <div className="stat-box">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{platformStats.total_users.toLocaleString()}</div>
            <div className="stat-label">Użytkownicy</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🏠</div>
            <div className="stat-value">{platformStats.verified_breeders}</div>
            <div className="stat-label">Zweryfikowani hodowcy</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🐱</div>
            <div className="stat-value">{platformStats.active_listings}</div>
            <div className="stat-label">Aktywne ogłoszenia</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">💳</div>
            <div className="stat-value">{platformStats.sold_this_month}</div>
            <div className="stat-label">Sprzedanych (m-c)</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">📈</div>
            <div className="stat-value">{platformStats.conversion_rate}%</div>
            <div className="stat-label">Conversion rate</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">💵</div>
            <div className="stat-value">{(platformStats.avg_transaction_value / 1000).toFixed(1)}K</div>
            <div className="stat-label">Śr. wartość transakcji</div>
          </div>
        </div>
      </div>

      {/* PENDING ACTIONS */}
      <div className="pending-actions-section">
        <h3>⚠️ Oczekujące akcje</h3>
        <div className="pending-grid">
          <div className="pending-card urgent">
            <div className="pending-header">
              <span className="pending-icon">🔴</span>
              <span className="pending-count">{platformStats.pending_verification}</span>
            </div>
            <div className="pending-title">Hodowcy do weryfikacji</div>
            <button className="btn-pending" onClick={() => showNotification('Otwarto panel weryfikacji', '✅')}>
              Weryfikuj teraz
            </button>
          </div>
          <div className="pending-card warning">
            <div className="pending-header">
              <span className="pending-icon">🟡</span>
              <span className="pending-count">{platformStats.pending_reviews}</span>
            </div>
            <div className="pending-title">Recenzje do moderacji</div>
            <button className="btn-pending" onClick={() => showNotification('Otwarto moderację', '✅')}>
              Moderuj
            </button>
          </div>
          <div className="pending-card info">
            <div className="pending-header">
              <span className="pending-icon">🔵</span>
              <span className="pending-count">{platformStats.reported_issues}</span>
            </div>
            <div className="pending-title">Zgłoszenia użytkowników</div>
            <button className="btn-pending" onClick={() => showNotification('Otwarto zgłoszenia', '✅')}>
              Zobacz zgłoszenia
            </button>
          </div>
          <div className="pending-card critical">
            <div className="pending-header">
              <span className="pending-icon">🚨</span>
              <span className="pending-count">{platformStats.refund_requests}</span>
            </div>
            <div className="pending-title">Wnioski o zwrot</div>
            <button className="btn-pending" onClick={() => showNotification('Otwarto zwroty', '✅')}>
              Rozpatrz
            </button>
          </div>
        </div>
      </div>

      {/* USER MANAGEMENT TABLE */}
      <div className="user-management-section">
        <h3>👥 Zarządzanie użytkownikami</h3>
        <div className="management-controls">
          <input type="text" placeholder="Szukaj użytkownika..." className="search-user-input" />
          <select className="filter-role">
            <option>Wszystkie role</option>
            <option>Klienci</option>
            <option>Hodowcy</option>
            <option>Admini</option>
          </select>
          <button className="btn-export" onClick={() => showNotification('Eksportowano dane do CSV', '📥')}>
            📥 Eksport CSV
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Użytkownik</th>
              <th>Email</th>
              <th>Rola</th>
              <th>Status</th>
              <th>Wydał/Zarobił</th>
              <th>Data rej.</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#15234</td>
              <td>
                <div className="table-user">
                  <span className="user-avatar-small">😺</span>
                  <span>Kocioł Miłośnik</span>
                </div>
              </td>
              <td>kociol@catpurre.pl</td>
              <td><span className="role-badge client">Klient</span></td>
              <td><span className="status-badge active">✅ Aktywny</span></td>
              <td>45,600 PLN</td>
              <td>2024-01-15</td>
              <td>
                <button className="btn-table-icon" title="Edytuj">✏️</button>
                <button className="btn-table-icon" title="Statystyki">📊</button>
                <button className="btn-table-icon" title="Ban">🚫</button>
              </td>
            </tr>
            <tr>
              <td>#584</td>
              <td>
                <div className="table-user">
                  <span className="user-avatar-small">🏠</span>
                  <span>Bengal Masters</span>
                </div>
              </td>
              <td>bengal@masters.pl</td>
              <td><span className="role-badge breeder">Hodowca</span></td>
              <td><span className="status-badge verified">✅ Zweryfikowany</span></td>
              <td>234,500 PLN</td>
              <td>2023-06-10</td>
              <td>
                <button className="btn-table-icon" title="Edytuj">✏️</button>
                <button className="btn-table-icon" title="Analytics">📊</button>
                <button className="btn-table-icon" title="Płatności">💳</button>
              </td>
            </tr>
            <tr>
              <td>#23</td>
              <td>
                <div className="table-user">
                  <span className="user-avatar-small">🏠</span>
                  <span>Maine Coon Elite</span>
                </div>
              </td>
              <td>maine@elite.pl</td>
              <td><span className="role-badge breeder">Hodowca</span></td>
              <td><span className="status-badge pending">⏳ Weryfikacja</span></td>
              <td>0 PLN</td>
              <td>2025-12-18</td>
              <td>
                <button className="btn-table-icon" title="Weryfikuj">✅</button>
                <button className="btn-table-icon" title="Odrzuć">❌</button>
                <button className="btn-table-icon" title="Dokumenty">📄</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* AD MANAGEMENT */}
      <div className="ad-management-section">
        <h3>📢 Zarządzanie reklamami</h3>
        <div className="ad-stats-boxes">
          <div className="ad-stat-box">
            <div className="ad-stat-label">Aktywne kampanie</div>
            <div className="ad-stat-value">{platformStats.active_promotions}</div>
          </div>
          <div className="ad-stat-box">
            <div className="ad-stat-label">Przychód z reklam (m-c)</div>
            <div className="ad-stat-value">{(platformStats.ad_revenue / 1000).toFixed(1)}K PLN</div>
          </div>
          <div className="ad-stat-box">
            <div className="ad-stat-label">Średni CTR</div>
            <div className="ad-stat-value">4.2%</div>
          </div>
        </div>
        <table className="ad-table">
          <thead>
            <tr>
              <th>Kampania</th>
              <th>Typ reklamy</th>
              <th>Hodowca</th>
              <th>Budżet</th>
              <th>Wyświetlenia</th>
              <th>CTR</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BENGAL PRINCE - Top Placement</td>
              <td><span className="ad-type-badge top">🔝 Top</span></td>
              <td>Bengal Masters</td>
              <td>200 PLN / 30 dni</td>
              <td>23,456</td>
              <td>5.8%</td>
              <td><span className="status-badge active">▶️ Aktywna</span></td>
              <td>
                <button className="btn-table-icon" onClick={() => showNotification('Kampania wstrzymana', '⏸️')}>⏸️</button>
                <button className="btn-table-icon" onClick={() => showNotification('Otwarto statystyki', '📊')}>📊</button>
              </td>
            </tr>
            <tr>
              <td>RAGDOLL SNOW - Featured</td>
              <td><span className="ad-type-badge featured">⭐ Featured</span></td>
              <td>Ragdoll Dreams</td>
              <td>50 PLN / 7 dni</td>
              <td>8,934</td>
              <td>3.2%</td>
              <td><span className="status-badge active">▶️ Aktywna</span></td>
              <td>
                <button className="btn-table-icon">⏸️</button>
                <button className="btn-table-icon">📊</button>
              </td>
            </tr>
            <tr>
              <td>Homepage Banner - Święta</td>
              <td><span className="ad-type-badge banner">🎯 Banner</span></td>
              <td>Multiple</td>
              <td>500 PLN / tydzień</td>
              <td>145,234</td>
              <td>2.1%</td>
              <td><span className="status-badge active">▶️ Aktywna</span></td>
              <td>
                <button className="btn-table-icon">⏸️</button>
                <button className="btn-table-icon">📊</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* COMMISSION SETTINGS */}
      <div className="commission-settings-section">
        <h3>💵 Ustawienia prowizji</h3>
        <div className="commission-tiers">
          <div className="tier-card">
            <h4>Basic (Darmowy)</h4>
            <div className="tier-commission">8% prowizji</div>
            <ul className="tier-features">
              <li>✓ 5 aktywnych ogłoszeń</li>
              <li>✓ 0 promowanych</li>
              <li>✓ Podstawowe wsparcie</li>
            </ul>
          </div>
          <div className="tier-card">
            <h4>Standard (99 PLN/m-c)</h4>
            <div className="tier-commission">5% prowizji</div>
            <ul className="tier-features">
              <li>✓ 20 aktywnych ogłoszeń</li>
              <li>✓ 2 promowane</li>
              <li>✓ Priorytetowe wsparcie</li>
            </ul>
          </div>
          <div className="tier-card premium">
            <h4>Premium (299 PLN/m-c)</h4>
            <div className="tier-commission">3% prowizji</div>
            <ul className="tier-features">
              <li>✓ 100 aktywnych ogłoszeń</li>
              <li>✓ 10 promowanych</li>
              <li>✓ Wsparcie 24/7</li>
              <li>✓ Analytics Pro</li>
            </ul>
          </div>
          <div className="tier-card enterprise">
            <h4>Enterprise (799 PLN/m-c)</h4>
            <div className="tier-commission">2% prowizji</div>
            <ul className="tier-features">
              <li>✓ Nielimitowane ogłoszenia</li>
              <li>✓ 50 promowanych</li>
              <li>✓ Dedykowany manager</li>
              <li>✓ API access</li>
              <li>✓ Custom branding</li>
            </ul>
          </div>
        </div>
      </div>

      {/* NOTIFICATION BROADCAST */}
      <div className="notification-broadcast-section">
        <h3>📣 Powiadomienia masowe</h3>
        <div className="broadcast-form">
          <select className="broadcast-target">
            <option>Wszyscy użytkownicy</option>
            <option>Tylko klienci</option>
            <option>Tylko hodowcy</option>
            <option>Premium users</option>
          </select>
          <textarea className="broadcast-textarea" placeholder="Treść powiadomienia..." rows="4"></textarea>
          <div className="broadcast-buttons">
            <button className="btn-broadcast preview">👁️ Podgląd</button>
            <button className="btn-broadcast send" onClick={() => showNotification('Wysłano do 15,234 użytkowników!', '📧')}>
              📧 Wyślij teraz
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // 🏠 BREEDER PANEL
  const renderBreederPanel = () => {
    const breederData = {
      name: 'Bengal Masters',
      tier: 'premium',
      verified: true,
      total_listings: 12,
      active_listings: 8,
      sold_this_month: 5,
      revenue_this_month: 42500,
      commission_paid: 1275,
      pending_payout: 41225,
      total_reviews: 47,
      avg_rating: 4.9,
      response_time: '2h',
      views_this_month: 3456,
      favorites: 234
    }

    return (
      <div className="breeder-panel">
        <div className="breeder-header">
          <div className="breeder-profile-box">
            <div className="breeder-avatar">🏠</div>
            <div className="breeder-info">
              <h2>{breederData.name}</h2>
              <div className="breeder-badges">
                <span className="badge-verified">✅ Zweryfikowany</span>
                <span className="badge-tier premium">⭐ Premium</span>
                <span className="badge-fife">FIFe Member</span>
              </div>
            </div>
          </div>
          <div className="breeder-quick-stats">
            <div className="quick-stat">
              <div className="quick-stat-value">{breederData.avg_rating}</div>
              <div className="quick-stat-label">⭐ Ocena</div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">{breederData.total_reviews}</div>
              <div className="quick-stat-label">📝 Recenzje</div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">{breederData.response_time}</div>
              <div className="quick-stat-label">⚡ Odp.</div>
            </div>
          </div>
        </div>

        {/* EARNINGS DASHBOARD */}
        <div className="earnings-dashboard">
          <h3>💰 Twoje zarobki (Grudzień 2025)</h3>
          <div className="earnings-grid">
            <div className="earnings-card main">
              <div className="earnings-icon">💎</div>
              <div className="earnings-content">
                <div className="earnings-label">Przychód brutto</div>
                <div className="earnings-amount">{breederData.revenue_this_month.toLocaleString()} PLN</div>
                <div className="earnings-detail">5 sprzedanych kotów</div>
              </div>
            </div>
            <div className="earnings-card commission">
              <div className="earnings-icon">📊</div>
              <div className="earnings-content">
                <div className="earnings-label">Prowizja CAT PURRE (3%)</div>
                <div className="earnings-amount negative">-{breederData.commission_paid.toLocaleString()} PLN</div>
                <div className="earnings-detail">Premium tier discount</div>
              </div>
            </div>
            <div className="earnings-card net">
              <div className="earnings-icon">✅</div>
              <div className="earnings-content">
                <div className="earnings-label">Do wypłaty</div>
                <div className="earnings-amount positive">{breederData.pending_payout.toLocaleString()} PLN</div>
                <div className="earnings-detail">Dostępne do transferu</div>
              </div>
            </div>
          </div>
          <button className="btn-withdraw" onClick={() => showNotification('Zlecono przelew na konto - środki w ciągu 1-2 dni roboczych', '💳')}>
            💸 Wypłać na konto
          </button>
        </div>

        {/* LISTING STATS */}
        <div className="listing-stats-section">
          <h3>📊 Statystyki ogłoszeń</h3>
          <div className="listing-stats-grid">
            <div className="listing-stat-card">
              <div className="stat-number">{breederData.active_listings}/{breederData.total_listings}</div>
              <div className="stat-label">Aktywne ogłoszenia</div>
              <div className="stat-sublabel">100 limit (Premium)</div>
            </div>
            <div className="listing-stat-card">
              <div className="stat-number">{breederData.views_this_month.toLocaleString()}</div>
              <div className="stat-label">Wyświetlenia (m-c)</div>
              <div className="stat-sublabel">↗ +23% vs. lis</div>
            </div>
            <div className="listing-stat-card">
              <div className="stat-number">{breederData.favorites}</div>
              <div className="stat-label">Dodano do ulubionych</div>
              <div className="stat-sublabel">↗ +15% vs. lis</div>
            </div>
            <div className="listing-stat-card">
              <div className="stat-number">{breederData.sold_this_month}</div>
              <div className="stat-label">Sprzedane (m-c)</div>
              <div className="stat-sublabel">Conversion 4.2%</div>
            </div>
          </div>
        </div>

        {/* MY LISTINGS */}
        <div className="my-listings-section">
          <div className="my-listings-header">
            <h3>🐱 Moje ogłoszenia</h3>
            <button className="btn-add-listing" onClick={() => showNotification('Otwarto formularz dodawania kota', '✅')}>
              ➕ Dodaj nowego kota
            </button>
          </div>
          <div className="listings-grid-breeder">
            {cats.slice(0, 4).map(cat => (
              <div key={cat.id} className="breeder-listing-card">
                <img src={cat.img} alt={cat.name} className="breeder-listing-img" />
                <div className="breeder-listing-content">
                  <h4>{cat.name}</h4>
                  <p className="listing-breed">{cat.breed}</p>
                  <div className="listing-stats-row">
                    <span>👁️ 456</span>
                    <span>❤️ 23</span>
                    <span>💬 5</span>
                  </div>
                  <div className="listing-price-row">
                    <span className="listing-price">{cat.priceFormatted}</span>
                    <span className="listing-status active">✅ Aktywne</span>
                  </div>
                  <div className="listing-actions">
                    <button className="btn-listing-edit" onClick={() => showNotification('Otwarto edycję', '✏️')}>✏️ Edytuj</button>
                    <button className="btn-listing-promote" onClick={() => showNotification('Otwarto opcje promocji', '⭐')}>⭐ Promuj</button>
                    <button className="btn-listing-pause" onClick={() => showNotification('Ogłoszenie wstrzymane', '⏸️')}>⏸️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROMOTION TOOLS */}
        <div className="promotion-section">
          <h3>📢 Narzędzia promocji</h3>
          <div className="promotion-grid">
            <div className="promo-option">
              <div className="promo-icon">⭐</div>
              <h4>Featured Listing</h4>
              <p>Wyróżnij ogłoszenie na 7 dni</p>
              <div className="promo-price">50 PLN</div>
              <ul className="promo-benefits">
                <li>✓ Złota ramka</li>
                <li>✓ Badge "Featured"</li>
                <li>✓ +300% widoczności</li>
              </ul>
              <button className="btn-promo-buy" onClick={() => showNotification('Dodano do koszyka', '🛒')}>Kup teraz</button>
            </div>
            <div className="promo-option popular">
              <div className="promo-badge">🔥 Popularne</div>
              <div className="promo-icon">🚀</div>
              <h4>Promoted Listing</h4>
              <p>Promuj przez 30 dni</p>
              <div className="promo-price">100 PLN</div>
              <ul className="promo-benefits">
                <li>✓ Wyższe pozycjonowanie</li>
                <li>✓ Newsletter mention</li>
                <li>✓ Social media share</li>
                <li>✓ +500% widoczności</li>
              </ul>
              <button className="btn-promo-buy primary" onClick={() => showNotification('Dodano do koszyka', '🛒')}>Kup teraz</button>
            </div>
            <div className="promo-option premium">
              <div className="promo-badge">👑 Premium</div>
              <div className="promo-icon">🔝</div>
              <h4>Top Placement</h4>
              <p>Top pozycja na 30 dni</p>
              <div className="promo-price">200 PLN</div>
              <ul className="promo-benefits">
                <li>✓ Zawsze na górze</li>
                <li>✓ Homepage banner</li>
                <li>✓ Push notifications</li>
                <li>✓ Dedykowana kampania</li>
                <li>✓ +1000% widoczności</li>
              </ul>
              <button className="btn-promo-buy premium" onClick={() => showNotification('Dodano do koszyka', '🛒')}>Kup teraz</button>
            </div>
          </div>
          <div className="promo-balance">
            <p>💰 Masz 10 darmowych promowanych ogłoszeń w pakiecie Premium!</p>
            <p>Pozostało: <strong>8/10</strong></p>
          </div>
        </div>

        {/* SUBSCRIPTION UPGRADE */}
        <div className="subscription-upgrade-section">
          <h3>⚡ Upgrade subskrypcji</h3>
          <div className="current-plan-box">
            <p>Aktualny plan: <strong>Premium (299 PLN/m-c)</strong></p>
            <p>Prowizja: <strong>3%</strong> | Limity: <strong>100 ogłoszeń, 10 promowanych</strong></p>
          </div>
          <div className="upgrade-option-box">
            <h4>🚀 Przejdź na Enterprise</h4>
            <ul>
              <li>✅ Tylko 2% prowizji (oszczędzasz 1%!)</li>
              <li>✅ Nielimitowane ogłoszenia</li>
              <li>✅ 50 darmowych promowanych</li>
              <li>✅ Dedykowany account manager</li>
              <li>✅ API access dla integracji</li>
              <li>✅ Custom branding (Twoje logo)</li>
            </ul>
            <div className="upgrade-price">799 PLN/miesiąc</div>
            <button className="btn-upgrade" onClick={() => showNotification('Rozpoczęto upgrade do Enterprise!', '🚀')}>
              Upgrade do Enterprise
            </button>
          </div>
        </div>

        {/* REVIEWS MANAGEMENT */}
        <div className="breeder-reviews-section">
          <h3>⭐ Recenzje i odpowiedzi</h3>
          <div className="reviews-summary-breeder">
            <div className="rating-big">{breederData.avg_rating} ⭐</div>
            <div className="reviews-count">{breederData.total_reviews} recenzji</div>
          </div>
          <div className="breeder-reviews-list">
            {reviews.slice(0, 3).map(review => (
              <div key={review.id} className="breeder-review-card">
                <div className="review-header-breeder">
                  <span className="review-user">{review.userAvatar} {review.userName}</span>
                  <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-text">{review.comment}</p>
                {review.breederResponse ? (
                  <div className="existing-response">
                    <strong>Twoja odpowiedź:</strong>
                    <p>{review.breederResponse}</p>
                  </div>
                ) : (
                  <div className="response-form">
                    <textarea placeholder="Napisz odpowiedź..." rows="3"></textarea>
                    <button className="btn-submit-response" onClick={() => showNotification('Odpowiedź wysłana!', '✅')}>
                      Odpowiedz
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 😺 CLIENT PANEL
  const renderClientPanel = () => {
    const clientData = {
      name: currentUser.name,
      avatar: currentUser.avatar,
      premium: currentUser.premium,
      total_spent: 45600,
      cats_purchased: 3,
      pending_orders: 1,
      reviews_written: 18,
      helpful_votes: 234,
      wishlist_count: 12,
      loyalty_points: 4560
    }

    return (
      <div className="client-panel">
        <div className="client-header">
          <div className="client-profile-box">
            <div className="client-avatar-large">{clientData.avatar}</div>
            <div className="client-info">
              <h2>{clientData.name}</h2>
              <div className="client-badges">
                {clientData.premium ? (
                  <span className="badge-premium">👑 Premium Member</span>
                ) : (
                  <span className="badge-free">Darmowe konto</span>
                )}
                <span className="badge-verified">✅ Email zweryfikowany</span>
                <span className="badge-loyalty">⭐ VIP ({clientData.loyalty_points} pkt)</span>
              </div>
            </div>
          </div>
          {!clientData.premium && (
            <div className="premium-upgrade-cta">
              <h4>🚀 Przejdź na Premium!</h4>
              <p>Tylko 29 PLN/miesiąc</p>
              <button className="btn-upgrade-premium" onClick={() => showNotification('Rozpoczęto aktywację Premium!', '✅')}>
                Upgrade teraz
              </button>
            </div>
          )}
        </div>

        {/* PURCHASE STATS */}
        <div className="purchase-stats-section">
          <h3>📊 Twoje zakupy</h3>
          <div className="purchase-stats-grid">
            <div className="purchase-stat-card">
              <div className="purchase-icon">🐱</div>
              <div className="purchase-number">{clientData.cats_purchased}</div>
              <div className="purchase-label">Kupione koty</div>
            </div>
            <div className="purchase-stat-card">
              <div className="purchase-icon">💰</div>
              <div className="purchase-number">{(clientData.total_spent / 1000).toFixed(1)}K PLN</div>
              <div className="purchase-label">Wydano łącznie</div>
            </div>
            <div className="purchase-stat-card">
              <div className="purchase-icon">⏳</div>
              <div className="purchase-number">{clientData.pending_orders}</div>
              <div className="purchase-label">Oczekujące zamówienia</div>
            </div>
            <div className="purchase-stat-card">
              <div className="purchase-icon">⭐</div>
              <div className="purchase-number">{clientData.loyalty_points}</div>
              <div className="purchase-label">Punkty lojalnościowe</div>
            </div>
          </div>
        </div>

        {/* RECENT PURCHASES */}
        <div className="recent-purchases-section">
          <h3>🛍️ Ostatnie zakupy</h3>
          <div className="purchase-history-list">
            <div className="purchase-item">
              <img src="https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800" alt="Bengal" className="purchase-img" />
              <div className="purchase-details">
                <h4>BENGAL PRINCE Leo</h4>
                <p className="purchase-breeder">🏠 Bengal Masters</p>
                <p className="purchase-date">📅 Kupiono: 2025-11-15</p>
                <p className="purchase-status delivered">✅ Dostarczony</p>
              </div>
              <div className="purchase-price">8,500 PLN</div>
              <div className="purchase-actions">
                <button className="btn-purchase-action" onClick={() => showNotification('Otwarto umowę PDF', '📄')}>📄 Umowa</button>
                <button className="btn-purchase-action" onClick={() => showNotification('Otwarto formularz recenzji', '⭐')}>⭐ Oceń</button>
                <button className="btn-purchase-action" onClick={() => showNotification('Otwarto czat', '💬')}>💬 Kontakt</button>
              </div>
            </div>
          </div>
        </div>

        {/* PREMIUM BENEFITS */}
        {!clientData.premium && (
          <div className="premium-benefits-section">
            <h3>👑 Korzyści Premium</h3>
            <div className="benefits-comparison">
              <div className="benefits-column free">
                <h4>Darmowe</h4>
                <ul>
                  <li>✓ Podstawowe wyszukiwanie</li>
                  <li>✓ Standardowe wsparcie</li>
                  <li>✗ Priorytetowa obsługa</li>
                  <li>✗ Ekskluzywne podglądy</li>
                  <li>✗ Darmowy transport</li>
                  <li>✗ Konsultacje wet</li>
                </ul>
              </div>
              <div className="benefits-column premium">
                <h4>Premium (29 PLN/m-c)</h4>
                <ul>
                  <li>✓ Wszystko z darmowego</li>
                  <li>✓ Wsparcie 24/7</li>
                  <li>✓ Pierwsze ogłoszenia</li>
                  <li>✓ Darmowy transport 1x/m-c</li>
                  <li>✓ Konsultacja wet online</li>
                  <li>✓ Rozszerzona gwarancja</li>
                  <li>✓ Zniżki u partnerów 10-20%</li>
                  <li>✓ Badge VIP na profilu</li>
                </ul>
                <button className="btn-get-premium" onClick={() => showNotification('Aktywowano Premium!', '👑')}>Aktywuj Premium</button>
              </div>
            </div>
          </div>
        )}

        {/* LOYALTY PROGRAM */}
        <div className="loyalty-program-section">
          <h3>🎁 Program lojalnościowy</h3>
          <div className="loyalty-progress">
            <div className="loyalty-tier current">
              <div className="tier-icon">⭐</div>
              <div className="tier-name">VIP</div>
              <div className="tier-points">{clientData.loyalty_points} pkt</div>
            </div>
            <div className="loyalty-bar">
              <div className="loyalty-bar-fill" style={{width: `${(clientData.loyalty_points / 5000) * 100}%`}}></div>
            </div>
            <div className="loyalty-tier next">
              <div className="tier-icon">💎</div>
              <div className="tier-name">Diamond</div>
              <div className="tier-points">5,000 pkt</div>
            </div>
          </div>
          <div className="loyalty-benefits">
            <h4>Twoje korzyści VIP:</h4>
            <ul>
              <li>✓ 5% cashback na każdy zakup</li>
              <li>✓ Priorytetowe wsparcie</li>
              <li>✓ Dostęp do wyprzedaży pre-sale</li>
              <li>✓ Darmowa konsultacja behawioralna</li>
            </ul>
            <p className="loyalty-next">Zdobądź jeszcze <strong>{5000 - clientData.loyalty_points} pkt</strong> aby awansować do Diamond! 💎</p>
          </div>
        </div>
      </div>
    )
  }

  // 🎭 ROLE SWITCHER (demo)
  const renderRoleSwitcher = () => (
    <div className="role-switcher-demo">
      <p>🎭 Demo: Przełącz rolę (testowanie)</p>
      <div className="role-buttons">
        <button 
          className={`role-btn ${currentUser.role === 'client' ? 'active' : ''}`}
          onClick={() => setCurrentUser({...currentUser, role: 'client', name: 'Kocioł Miłośnik'})}
        >
          😺 Klient
        </button>
        <button 
          className={`role-btn ${currentUser.role === 'breeder' ? 'active' : ''}`}
          onClick={() => setCurrentUser({...currentUser, role: 'breeder', name: 'Bengal Masters'})}
        >
          🏠 Hodowca
        </button>
        <button 
          className={`role-btn ${currentUser.role === 'admin' ? 'active' : ''}`}
          onClick={() => setCurrentUser({...currentUser, role: 'admin', name: 'Super Admin'})}
        >
          👑 Admin
        </button>
      </div>
    </div>
  )

  // 📢 ADVERTISING BANNERS
  const renderAdvertising = () => (
    <div className="advertising-section">
      <div className="ad-banner homepage">
        <div className="ad-content">
          <h3>🎄 ŚWIĘTA Z KOTEM! 🎁</h3>
          <p>Specjalna promocja -15% na wszystkie koty do 31.12.2025</p>
          <button className="ad-cta" onClick={() => showNotification('Przejście do ofert świątecznych', '🎄')}>Zobacz oferty ➜</button>
        </div>
      </div>
      <div className="sponsored-section">
        <h3>⭐ Promowane ogłoszenia</h3>
        <div className="sponsored-grid">
          {cats.slice(0, 3).map(cat => (
            <div key={cat.id} className="sponsored-card">
              <div className="sponsored-badge">📢 Sponsorowane</div>
              <img src={cat.img} alt={cat.name} className="sponsored-img" />
              <div className="sponsored-content">
                <h4>{cat.name}</h4>
                <p className="sponsored-breed">{cat.breed}</p>
                <p className="sponsored-price">{cat.priceFormatted}</p>
                <button className="btn-sponsored-view" onClick={() => {
                  setSelectedCat(cat)
                  setShowModal(true)
                }}>Zobacz szczegóły</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // GŁÓWNY RENDER - DODAJ DO RETURN STATEMENT
  // W głównym return() dodaj przed footer:
  // {renderRoleSwitcher()}
  // {currentUser.role === 'admin' && renderAdminPanel()}
  // {currentUser.role === 'breeder' && renderBreederPanel()}
  // {currentUser.role === 'client' && renderClientPanel()}
  // {renderAdvertising()}



export default App




