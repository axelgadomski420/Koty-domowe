const ClientRegistration = {
  personalData: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    birthDate: Date,
    pesel: String, // opcjonalne dla płatności
    nip: String // opcjonalne dla faktur VAT
  },
  address: {
    street: String,
    houseNumber: String,
    apartmentNumber: String,
    postalCode: String,
    city: String,
    voivodeship: String,
    country: String
  },
  preferences: {
    favoriteBreeds: [String],
    priceRange: { min: Number, max: Number },
    lookingFor: ['pet', 'breeding', 'show'],
    experienceLevel: ['first_time', 'experienced', 'expert'],
    hasOtherPets: Boolean,
    livingSpace: ['apartment', 'house', 'house_with_garden'],
    familySize: Number
  },
  verification: {
    emailVerified: Boolean,
    phoneVerified: Boolean,
    identityVerified: Boolean, // dla zakupów hodowlanych
    documentScan: String // ID/paszport dla premium
  },
  subscription: {
    type: ['free', 'premium', 'vip'],
    startDate: Date,
    endDate: Date,
    autoRenew: Boolean
  }
}
const BreederRegistration = {
  personalData: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    secondaryPhone: String
  },
  breeding: {
    prefix: String, // *PL Golden British
    organization: ['FIFe', 'WCF', 'TICA', 'CFA'],
    registrationNumber: String,
    registrationDate: Date,
    activeBreeds: [String], // maksymalnie 5 ras
    experienceYears: Number,
    totalCatsSold: Number,
    activeLitters: Number
  },
  verification: {
    prefixVerification: {
      status: ['pending', 'verified', 'rejected'],
      documents: [String], // skany dokumentów
      verifiedBy: ObjectId, // admin ID
      verifiedDate: Date
    },
    visitVerification: {
      status: ['pending', 'scheduled', 'completed'],
      visitDate: Date,
      inspector: String,
      report: String,
      photos: [String]
    },
    certificatesUploaded: [String],
    businessLicense: String // jeśli działalność
  },
  cattery: {
    name: String,
    website: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      youtube: String,
      tiktok: String
    },
    address: {
      street: String,
      city: String,
      voivodeship: String,
      country: String,
      coordinates: { lat: Number, lng: Number }
    },
    facilities: {
      cages: Number,
      separateRooms: Number,
      outdoor: Boolean,
      catioSize: Number
    }
  },
  pricing: {
    subscriptionPlan: ['basic', 'pro', 'elite'],
    commissionRate: Number, // 3-8% zależnie od planu
    monthlyFee: Number,
    activeListings: Number,
    maxListings: Number
  },
  ratings: {
    overall: Number,
    communication: Number,
    catQuality: Number,
    afterSaleSupport: Number,
    reviewsCount: Number
  }
}
const BreederDashboard = {
  analytics: {
    viewsLastMonth: Number,
    inquiriesLastMonth: Number,
    salesLastMonth: Number,
    conversionRate: Number,
    averageResponseTime: String,
    topViewedCats: [Object],
    trafficSources: Object
  },
  catManagement: {
    addNewCat: Function,
    editCat: Function,
    archiveCat: Function,
    markAsSold: Function,
    bulkActions: Function,
    autoRenewListings: Boolean
  },
  litterManagement: {
    createLitter: Function,
    trackPregnancy: Function,
    birthNotifications: Function,
    kittenDevelopment: Array,
    vaccinationSchedule: Array,
    waitingList: Array
  },
  communication: {
    inbox: Array,
    chatSystem: Function,
    autoResponder: Function,
    canned Responses: Array,
    emailTemplates: Array,
    bulkMessaging: Function
  },
  contracts: {
    templateLibrary: Array,
    customContracts: Function,
    eSignature: Function,
    contractHistory: Array
  },
  financials: {
    earnings: Number,
    pending: Number,
    withdrawn: Number,
    invoices: Array,
    taxReports: Function,
    payoutSettings: Object
  }
}
const AdminPanel = {
  userManagement: {
    allUsers: Function, // paginacja, filtry, search
    verifyBreeder: Function,
    suspendUser: Function,
    deleteUser: Function,
    sendWarning: Function,
    massActions: Function,
    exportUserData: Function // RODO compliance
  },
  
  breederVerification: {
    pendingRequests: Array,
    scheduleVisit: Function,
    uploadInspectionReport: Function,
    approveBreeder: Function,
    rejectBreeder: Function,
    revokeVerification: Function,
    verificationHistory: Array
  },
  
  catManagement: {
    allCats: Function,
    moderateListing: Function,
    flagSuspicious: Function,
    removeInappropriate: Function,
    verifyPedigree: Function,
    bulkEdit: Function,
    exportCatalog: Function
  },
  
  demoDataManagement: {
    createDemoCats: Function, // generowanie kotów demo
    populateDatabase: Function, // 100, 500, 1000 kotów
    deleteDemoCats: Function, // masowe usuwanie
    resetDemoData: Function, // reset do stanu początkowego
    importFromCSV: Function,
    exportToCSV: Function,
    demoToggle: Boolean // pokazuj/ukryj demo
  },
  
  contentModeration: {
    reportedContent: Array,
    reviewReports: Function,
    takeAction: Function,
    moderationHistory: Array,
    aiModeration: {
      enabled: Boolean,
      autoFlag: Function,
      confidence: Number
    }
  },
  
  financialOversight: {
    totalRevenue: Number,
    commissionCollected: Number,
    pendingPayouts: Array,
    processPayouts: Function,
    refundManagement: Function,
    fraudDetection: Array,
    taxReporting: Function
  },
  
  platformSettings: {
    commissionRates: Object,
    subscriptionPricing: Object,
    featureFlags: Object,
    maintenanceMode: Boolean,
    announcementBanner: String,
    emailNotifications: Object,
    smsNotifications: Object,
    pushNotifications: Object
  },
  
  analytics: {
    dashboardOverview: Object,
    userGrowth: Array,
    salesMetrics: Object,
    topBreeders: Array,
    topBreeds: Array,
    geographicDistribution: Object,
    performanceMetrics: Object,
    customReports: Function
  },
  
  breeds Management: {
    allBreeds: Array,
    addBreed: Function,
    editBreed: Function,
    breedStandards: Function,
    uploadBreedPhotos: Function,
    seoOptimization: Function
  },
  
  systemMaintenance: {
    databaseBackup: Function,
    systemHealth: Object,
    errorLogs: Array,
    apiUsage: Object,
    cacheManagement: Function,
    cdnManagement: Function
  }
}
const COMPLETE_BREEDS_DATABASE = [
  {
    id: 1,
    name: 'British Shorthair',
    origin: 'Wielka Brytania',
    category: 'Krótkoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '5-8 kg', height: '30-35 cm' },
      female: { weight: '3-5 kg', height: '25-30 cm' }
    },
    colors: ['Blue', 'Black', 'White', 'Cream', 'Red', 'Silver', 'Golden', 'Tortie', 'Bicolor', 'Tabby'],
    personality: ['Spokojny', 'Niezależny', 'Łagodny', 'Cierpliwy'],
    grooming: 'Łatwa pielęgnacja',
    health: {
      common: ['HCM', 'PKD'],
      tests: ['HCM', 'PKD', 'Grupa krwi'],
      lifespan: '12-17 lat'
    },
    priceRange: { min: 3500, max: 8000 },
    popularity: 9.5,
    goodWith: ['Dzieci', 'Inne koty', 'Psy'],
    activityLevel: 'Średnia',
    vocality: 'Cicha',
    imageUrl: String,
    gallery: [String],
    standard: {
      head: 'Okrągła, szeroka czaszka',
      eyes: 'Duże, okrągłe, szeroko rozstawione',
      body: 'Krępy, masywny, muskularne',
      legs: 'Krótkie, mocne',
      tail: 'Gruby, tępy koniec',
      coat: 'Krótka, gęsta, pluszowa'
    }
  },
  
  {
    id: 2,
    name: 'Maine Coon',
    origin: 'USA',
    category: 'Długoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '6-11 kg', height: '25-41 cm' },
      female: { weight: '4-7 kg', height: '23-35 cm' }
    },
    colors: ['Brown Tabby', 'Black', 'White', 'Red', 'Cream', 'Silver', 'Blue', 'Tortie'],
    personality: ['Łagodny olbrzym', 'Inteligentny', 'Towarzyski', 'Psopodobny'],
    grooming: 'Wymaga regularnego szczotkowania',
    health: {
      common: ['HCM', 'Dysplazja stawu biodrowego', 'SMA'],
      tests: ['HCM', 'SMA', 'PKD'],
      lifespan: '12-15 lat'
    },
    priceRange: { min: 4000, max: 12000 },
    popularity: 10,
    goodWith: ['Dzieci', 'Inne koty', 'Psy'],
    activityLevel: 'Wysoka',
    vocality: 'Umiarkowana - chirrups',
    imageUrl: String,
    gallery: [String]
  },
  
  {
    id: 3,
    name: 'Persian',
    origin: 'Iran (Persja)',
    category: 'Długoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '4-6 kg', height: '25-30 cm' },
      female: { weight: '3-5 kg', height: '23-28 cm' }
    },
    colors: ['White', 'Black', 'Blue', 'Cream', 'Red', 'Silver', 'Golden', 'Chinchilla', 'Colorpoint'],
    personality: ['Spokojny', 'Domatorski', 'Łagodny', 'Przywiązany'],
    grooming: 'Bardzo wymagająca - codzienna',
    health: {
      common: ['PKD', 'Problemy z oddychaniem', 'Epifora', 'Problemy dentystyczne'],
      tests: ['PKD', 'Grupa krwi'],
      lifespan: '12-17 lat'
    },
    priceRange: { min: 3000, max: 7000 },
    popularity: 8.5,
    goodWith: ['Spokojne dzieci', 'Spokojne środowisko'],
    activityLevel: 'Niska',
    vocality: 'Cicha',
    specialCare: 'Regularne czyszczenie oczu, dzienna pielęgnacja',
    imageUrl: String
  },
  
  {
    id: 4,
    name: 'Ragdoll',
    origin: 'USA',
    category: 'Długoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '6-9 kg', height: '30-35 cm' },
      female: { weight: '4-6 kg', height: '25-30 cm' }
    },
    colors: ['Seal Point', 'Blue Point', 'Chocolate Point', 'Lilac Point', 'Red Point', 'Cream Point'],
    patterns: ['Colorpoint', 'Mitted', 'Bicolor'],
    personality: ['Wyjątkowo łagodny', 'Puppy-like', 'Relaksujący', 'Ufny'],
    grooming: 'Średnia - 2-3x tydzień',
    health: {
      common: ['HCM', 'PKD'],
      tests: ['HCM', 'PKD', 'Grupa krwi'],
      lifespan: '12-17 lat'
    },
    priceRange: { min: 3500, max: 6500 },
    popularity: 9.0,
    goodWith: ['Dzieci', 'Inne koty', 'Psy', 'Początkujący'],
    activityLevel: 'Niska-Średnia',
    vocality: 'Cicha',
    imageUrl: String
  },
  
  {
    id: 5,
    name: 'Bengal',
    origin: 'USA',
    category: 'Krótkoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: false,
    wildAncestry: 'Asian Leopard Cat',
    sizes: {
      male: { weight: '5-7 kg', height: '33-38 cm' },
      female: { weight: '3-5 kg', height: '30-35 cm' }
    },
    colors: ['Brown Spotted', 'Brown Marbled', 'Snow Spotted', 'Snow Marbled', 'Silver'],
    personality: ['Bardzo aktywny', 'Inteligentny', 'Psopodobny', 'Uwielbia wodę', 'Rozmowny'],
    grooming: 'Łatwa',
    health: {
      common: ['HCM', 'PRA', 'Flat Chest Kitten Syndrome'],
      tests: ['HCM', 'PRA-b', 'PK-Def'],
      lifespan: '12-16 lat'
    },
    priceRange: { min: 5000, max: 15000 },
    popularity: 9.2,
    goodWith: ['Aktywne rodziny', 'Doświadczeni właściciele'],
    activityLevel: 'Bardzo wysoka',
    vocality: 'Głośna',
    specialNeeds: 'Wymaga dużo stymulacji, zabawek, space to climb',
    imageUrl: String
  },
  
  {
    id: 6,
    name: 'Siberian (Syberyjski)',
    origin: 'Rosja',
    category: 'Długoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '6-9 kg', height: '30-38 cm' },
      female: { weight: '4-6 kg', height: '28-33 cm' }
    },
    colors: ['All colors and patterns accepted'],
    personality: ['Łagodny', 'Towarzyski', 'Inteligentny', 'Psopodobny', 'Lubi wodę'],
    grooming: 'Średnia - sezonowe linienie',
    health: {
      common: ['HCM'],
      tests: ['HCM', 'PKD'],
      lifespan: '12-15 lat'
    },
    hypoallergenic: 'Niski poziom Fel d1',
    priceRange: { min: 3500, max: 6000 },
    popularity: 8.0,
    goodWith: ['Dzieci', 'Inne koty', 'Psy', 'Alergicy'],
    activityLevel: 'Wysoka',
    vocality: 'Cicha',
    imageUrl: String
  },
  
  {
    id: 7,
    name: 'Sphynx (Sfinks)',
    origin: 'Kanada',
    category: 'Bezwłose',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '4-6 kg', height: '20-25 cm' },
      female: { weight: '3-4 kg', height: '20-23 cm' }
    },
    colors: ['All colors - skin pigmentation'],
    personality: ['Bardzo towarzyski', 'Energiczny', 'Ciepły', 'Extrovert', 'Uwielbia ludzi'],
    grooming: 'Specjalna - regularne kąpiele, czyszczenie uszu',
    health: {
      common: ['HCM', 'Problemy skórne', 'Wrażliwość na temperaturę'],
      tests: ['HCM'],
      lifespan: '12-15 lat'
    },
    priceRange: { min: 6000, max: 12000 },
    popularity: 7.5,
    goodWith: ['Osoby samotne', 'Aktywne rodziny'],
    activityLevel: 'Bardzo wysoka',
    vocality: 'Umiarkowana',
    specialCare: 'Utrzymanie temperatury, ochrona przed słońcem, regularne kąpiele',
    imageUrl: String
  },
  
  {
    id: 8,
    name: 'Scottish Fold',
    origin: 'Szkocja',
    category: 'Krótkoszerstne/Długoszerstne',
    fife: false, // banned
    wcf: true,
    tica: true,
    cfa: true,
    controversy: 'Gen folded ears - osteochondrodysplasia',
    sizes: {
      male: { weight: '4-6 kg', height: '23-28 cm' },
      female: { weight: '3-5 kg', height: '20-25 cm' }
    },
    ears: ['Folded', 'Straight (Scottish Straight)'],
    colors: ['All colors and patterns'],
    personality: ['Spokojny', 'Uroczy', 'Towarzyski', 'Łagodny'],
    grooming: 'Łatwa',
    health: {
      common: ['Osteochondrodysplasia', 'Arthritis', 'Problemy ze stawami'],
      tests: ['Screening stawów', 'X-ray'],
      lifespan: '11-15 lat',
      ethical: 'Kontrowersyjna rasa - problemy genetyczne'
    },
    priceRange: { min: 4000, max: 8000 },
    popularity: 8.0,
    goodWith: ['Spokojne rodziny'],
    activityLevel: 'Niska-Średnia',
    vocality: 'Cicha',
    imageUrl: String
  },
  
  {
    id: 9,
    name: 'Norwegian Forest Cat (Norweski Leśny)',
    origin: 'Norwegia',
    category: 'Długoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '6-9 kg', height: '30-40 cm' },
      female: { weight: '4-6 kg', height: '28-35 cm' }
    },
    colors: ['All except chocolate, lilac, cinnamon, fawn, pointed'],
    personality: ['Niezależny', 'Majestatyczny', 'Łowiecki', 'Inteligentny', 'Rodzinny'],
    grooming: 'Średnia - wodoodporne futro',
    health: {
      common: ['HCM', 'GSD IV', 'Dysplazja biodra'],
      tests: ['HCM', 'GSD IV', 'PKD'],
      lifespan: '14-16 lat'
    },
    priceRange: { min: 3000, max: 6000 },
    popularity: 7.8,
    goodWith: ['Rodziny', 'Inne zwierzęta', 'Outdoor access'],
    activityLevel: 'Wysoka',
    vocality: 'Cicha',
    imageUrl: String
  },
  
  {
    id: 10,
    name: 'Exotic Shorthair',
    origin: 'USA',
    category: 'Krótkoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    description: 'Persian Short-haired',
    sizes: {
      male: { weight: '4-7 kg', height: '25-30 cm' },
      female: { weight: '3-5 kg', height: '23-28 cm' }
    },
    colors: ['All Persian colors'],
    personality: ['Spokojny', 'Łagodny', 'Pluszakowy', 'Mniej wymagający niż pers'],
    grooming: 'Łatwa - weekly',
    health: {
      common: ['PKD', 'Problemy z oddychaniem (lżejsze niż pers)', 'Epifora'],
      tests: ['PKD', 'Grupa krwi'],
      lifespan: '12-15 lat'
    },
    priceRange: { min: 3500, max: 7500 },
    popularity: 8.5,
    goodWith: ['Dzieci', 'Apartament', 'Początkujący'],
    activityLevel: 'Niska-Średnia',
    vocality: 'Cicha',
    imageUrl: String
  },
  
  {
    id: 11,
    name: 'Abyssinian (Abisyński)',
    origin: 'Etiopia',
    category: 'Krótkoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '4-5 kg', height: '20-25 cm' },
      female: { weight: '3-4 kg', height: '20-23 cm' }
    },
    colors: ['Ruddy', 'Red (Sorrel)', 'Blue', 'Fawn'],
    coat: 'Ticked tabby',
    personality: ['Bardzo aktywny', 'Ciekawy', 'Inteligentny', 'Extrovert', 'Athletic'],
    grooming: 'Bardzo łatwa',
    health: {
      common: ['PRA', 'PK-Def', 'Renal Amyloidosis'],
      tests: ['PRA', 'PK-Def'],
      lifespan: '12-15 lat'
    },
    priceRange: { min: 4000, max: 7000 },
    popularity: 7.5,
    goodWith: ['Aktywne rodziny', 'Doświadczeni właściciele'],
    activityLevel: 'Bardzo wysoka',
    vocality: 'Umiarkowana',
    imageUrl: String
  },
  
  {
    id: 12,
    name: 'Russian Blue (Rosyjski Niebieski)',
    origin: 'Rosja',
    category: 'Krótkoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '4-6 kg', height: '25-28 cm' },
      female: { weight: '3-5 kg', height: '23-25 cm' }
    },
    colors: ['Blue only'],
    eyes: 'Vivid green',
    personality: ['Nieśmiały', 'Inteligentny', 'Lojalny', 'Spokojny', 'Czuły'],
    grooming: 'Bardzo łatwa',
    health: {
      common: ['Brak poważnych problemów genetycznych'],
      tests: ['Podstawowe'],
      lifespan: '15-20 lat'
    },
    hypoallergenic: 'Niższy poziom Fel d1',
    priceRange: { min: 3500, max: 6500 },
    popularity: 8.0,
    goodWith: ['Spokojne rodziny', 'Apartamenty'],
    activityLevel: 'Średnia',
    vocality: 'Cicha',
    imageUrl: String
  },
  
  {
    id: 13,
    name: 'Birman (Birmański Święty)',
    origin: 'Birma (Myanmar)',
    category: 'Długoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '5-7 kg', height: '25-30 cm' },
      female: { weight: '3-5 kg', height: '23-28 cm' }
    },
    colors: ['Seal Point', 'Blue Point', 'Chocolate Point', 'Lilac Point', 'Red Point'],
    pattern: 'Colorpoint with white gloves',
    personality: ['Łagodny', 'Towarzyski', 'Spokojny', 'Inteligentny'],
    grooming: 'Średnia - single coat',
    health: {
      common: ['HCM', 'PKD'],
      tests: ['HCM', 'PKD'],
      lifespan: '12-16 lat'
    },
    priceRange: { min: 3000, max: 6000 },
    popularity: 7.5,
    goodWith: ['Rodziny', 'Dzieci', 'Inne zwierzęta'],
    activityLevel: 'Średnia',
    vocality: 'Cicha',
    imageUrl: String
  },
  
  {
    id: 14,
    name: 'Oriental Shorthair',
    origin: 'Tajlandia/USA',
    category: 'Krótkoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    relatedTo: 'Siamese',
    sizes: {
      male: { weight: '4-6 kg', height: '23-28 cm' },
      female: { weight: '3-5 kg', height: '20-25 cm' }
    },
    colors: ['300+ color combinations'],
    personality: ['Bardzo rozmowny', 'Ekstrawertyk', 'Inteligentny', 'Potrzebuje uwagi', 'Energiczny'],
    grooming: 'Bardzo łatwa',
    health: {
      common: ['HCM', 'Amyloidosis', 'Lymphoma'],
      tests: ['HCM'],
      lifespan: '12-15 lat'
    },
    priceRange: { min: 3500, max: 6500 },
    popularity: 6.5,
    goodWith: ['Osoby samotne', 'Aktywne rodziny'],
    activityLevel: 'Bardzo wysoka',
    vocality: 'Bardzo głośna',
    imageUrl: String
  },
  
  {
    id: 15,
    name: 'Savannah',
    origin: 'USA',
    category: 'Krótkoszerstne',
    fife: false,
    wcf: false,
    tica: true,
    cfa: false,
    wildAncestry: 'African Serval',
    generations: ['F1', 'F2', 'F3', 'F4', 'F5+'],
    sizes: {
      male: { weight: '6-11 kg (F1), 4-7 kg (F5)', height: '35-45 cm' },
      female: { weight: '5-8 kg (F1), 3-6 kg (F5)', height: '30-40 cm' }
    },
    colors: ['Brown Spotted', 'Silver Spotted', 'Black', 'Smoke'],
    personality: ['Bardzo aktywny', 'Inteligentny', 'Psopodobny', 'Athletic', 'Wymaga doświadczenia'],
    grooming: 'Łatwa',
    health: {
      common: ['HCM', 'PRA-b'],
      tests: ['HCM', 'PRA-b'],
      lifespan: '12-20 lat'
    },
    priceRange: { min: 15000, max: 50000 }, // F1-F2 bardzo drogie
    popularity: 6.0,
    legal: 'Sprawdź lokalne przepisy - zabronione w niektórych krajach/stanach',
    goodWith: ['Doświadczeni właściciele', 'Duże przestrzenie'],
    activityLevel: 'Ekstremalnie wysoka',
    vocality: 'Umiarkowana',
    specialNeeds: 'Wymaga bardzo dużo przestrzeni, outdoor access, wysokie ogrodzenie',
    imageUrl: String
  },
  
  {
    id: 16,
    name: 'Devon Rex',
    origin: 'Anglia',
    category: 'Krótkoszerstne - kręcone',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '3-4 kg', height: '25-30 cm' },
      female: { weight: '2-3 kg', height: '23-28 cm' }
    },
    coat: 'Curly/wavy',
    colors: ['All colors and patterns'],
    personality: ['Pixie-like', 'Bardzo aktywny', 'Psopodobny', 'Uwielbia wysokie miejsca', 'Extrovert'],
    grooming: 'Specjalna - gentle, rzadkie kąpiele',
    health: {
      common: ['HCM', 'Hereditary Myopathy', 'Patellar Luxation'],
      tests: ['HCM', 'Myopathy test'],
      lifespan: '12-15 lat'
    },
    hypoallergenic: 'Częściowo - less shedding',
    priceRange: { min: 4500, max: 8000 },
    popularity: 7.0,
    goodWith: ['Aktywne rodziny', 'Inne zwierzęta'],
    activityLevel: 'Bardzo wysoka',
    vocality: 'Umiarkowana',
    imageUrl: String
  },
  
  {
    id: 17,
    name: 'Burmese (Birmański)',
    origin: 'Birma/Tajlandia',
    category: 'Krótkoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '4-6 kg', height: '25-28 cm' },
      female: { weight: '3-5 kg', height: '23-25 cm' }
    },
    colors: ['Sable', 'Champagne', 'Blue', 'Platinum'],
    personality: ['Bardzo towarzyski', 'Psopodobny', 'Playful', 'Vocal', 'Potrzebuje towarzystwa'],
    grooming: 'Bardzo łatwa',
    health: {
      common: ['Hypokalaemia', 'HCM', 'Diabates'],
      tests: ['Hypokalaemia', 'HCM'],
      lifespan: '12-16 lat'
    },
    priceRange: { min: 3500, max: 6500 },
    popularity: 7.0,
    goodWith: ['Rodziny', 'Inne zwierzęta', 'Nie dla samotnych osób'],
    activityLevel: 'Wysoka',
    vocality: 'Głośna',
    imageUrl: String
  },
  
  {
    id: 18,
    name: 'Turkish Angora (Angora Turecka)',
    origin: 'Turcja',
    category: 'Długoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '4-5 kg', height: '23-25 cm' },
      female: { weight: '3-4 kg', height: '20-23 cm' }
    },
    colors: ['White (traditional)', 'All colors accepted'],
    eyes: ['Blue', 'Amber', 'Odd-eyed'],
    personality: ['Inteligentny', 'Energiczny', 'Atletyczny', 'Vocal', 'Dominant'],
    grooming: 'Średnia',
    health: {
      common: ['Deafness (white cats)', 'HCM', 'Ataxia'],
      tests: ['BAER test (hearing)', 'HCM', 'Ataxia'],
      lifespan: '12-18 lat'
    },
    priceRange: { min: 3000, max: 6000 },
    popularity: 6.5,
    goodWith: ['Doświadczeni właściciele', 'Aktywne rodziny'],
    activityLevel: 'Bardzo wysoka',
    vocality: 'Głośna',
    imageUrl: String
  },
  
  {
    id: 19,
    name: 'Tonkinese',
    origin: 'Kanada/USA',
    category: 'Krótkoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    crossOf: 'Siamese x Burmese',
    sizes: {
      male: { weight: '4-6 kg', height: '20-25 cm' },
      female: { weight: '3-4 kg', height: '20-23 cm' }
    },
    colors: ['Natural', 'Champagne', 'Blue', 'Platinum'],
    patterns: ['Pointed', 'Mink', 'Solid'],
    personality: ['Bardzo towarzyski', 'Inteligentny', 'Aktywny', 'Psopodobny', 'Extrovert'],
    grooming: 'Bardzo łatwa',
    health: {
      common: ['Amyloidosis', 'HCM'],
      tests: ['HCM'],
      lifespan: '15-18 lat'
    },
    priceRange: { min: 3500, max: 6000 },
    popularity: 6.0,
    goodWith: ['Rodziny', 'Inne zwierzęta'],
    activityLevel: 'Wysoka',
    vocality: 'Umiarkowana',
    imageUrl: String
  },
  
  {
    id: 20,
    name: 'Chartreux',
    origin: 'Francja',
    category: 'Krótkoszerstne',
    fife: true,
    wcf: true,
    tica: true,
    cfa: true,
    sizes: {
      male: { weight: '5-7 kg', height: '25-28 cm' },
      female: { weight: '3-5 kg', height: '23-25 cm' }
    },
    colors: ['Blue only - wszystkie odcienie'],
    eyes: 'Orange to copper',
    personality: ['Cichy', 'Inteligentny', 'Lojalny', 'Gentle', 'Polite'],
    grooming: 'Łatwa',
    health: {
      common: ['Patellar Luxation', 'HCM'],
      tests: ['HCM', 'Patellar screening'],
      lifespan: '12-15 lat'
    },
    priceRange: { min: 4000, max: 7000 },
    popularity: 6.0,
    goodWith: ['Rodziny', 'Apartamenty', 'Inne zwierzęta'],
    activityLevel: 'Średnia',
    vocality: 'Bardzo cicha',
    nickname: 'Smiling cat of France',
    imageUrl: String
  }
]
const ContractSystem = {
  templates: {
    standard: {
      id: 'contract_standard_v2',
      name: 'Standardowa Umowa Sprzedaży Kota',
      sections: [
        {
          title: 'Dane Sprzedawcy (Hodowcy)',
          fields: ['fullName', 'address', 'phone', 'email', 'prefix', 'organization', 'nip']
        },
        {
          title: 'Dane Kupującego',
          fields: ['fullName', 'address', 'phone', 'email', 'idNumber', 'pesel']
        },
        {
          title: 'Dane Kota',
          fields: [
            'name',
            'breed',
            'color',
            'gender',
            'birthDate',
            'microchipNumber',
            'pedigreeNumber',
            'organization',
            'parents',
            'healthTests',
            'vaccinations'
          ]
        },
        {
          title: 'Przedmiot Umowy',
          content: `
Sprzedający oświadcza, że jest prawnym właścicielem kota opisanego powyżej
i przysługuje mu prawo do jego zbycia. Sprzedający przenosi na Kupującego
własność kota wraz z pełnym rodowodem i dokumentacją weterynaryjną.
          `
        },
        {
          title: 'Cena i Płatność',
          fields: [
            'price',
            'currency',
            'advancePayment',
            'remainingPayment',
            'paymentMethod',
            'paymentDeadline'
          ],
          content: `
Strony ustalają cenę kota na kwotę: {price} {currency}.
Kupujący zobowiązuje się do zapłaty:
- Zaliczka: {advancePayment} {currency} - wpłacona dnia {advanceDate}
- Pozostała kwota: {remainingPayment} {currency} - termin płatności: {paymentDeadline}
Płatność: {paymentMethod}
          `
        },
        {
          title: 'Wydanie Kota',
          fields: ['deliveryDate', 'deliveryPlace', 'deliveryMethod'],
          content: `
Kot zostanie wydany Kupującemu w dniu: {deliveryDate}
Miejsce: {deliveryPlace}
Sposób: {deliveryMethod}

W chwili odbioru Kupujący otrzymuje:
✅ Rodowód FIFe/WCF/TICA
✅ Paszport weterynaryjny ze szczepieniami
✅ Karta szczepień
✅ Wyniki testów genetycznych (HCM, PKD, inne)
✅ Chip (numer: {microchipNumber})
✅ Umowa kupna-sprzedaży
✅ Starter pack (karma, zabawki)
          `
        },
        {
          title: 'Gwarancja Zdrowia',
          content: `
1. Sprzedający gwarantuje, że kot w chwili sprzedaży jest zdrowy,
   wolny od chorób zakaźnych i pasożytów.
   
2. Gwarancja zdrowia: 24 miesiące od daty zakupu na wady genetyczne
   wykryte przez licencjonowanego weterynarza.
   
3. Kupujący zobowiązany jest do przeprowadzenia badania weterynaryjnego
   w ciągu 72 godzin od odbioru kota.
   
4. W przypadku stwierdzenia wady genetycznej, Sprzedający:
   - Zwraca pełną kwotę zakupu + koszty weterynaryjne (do 2000 PLN)
   - LUB oferuje wymianę na innego kota z hodowli
   
5. Gwarancja NIE obejmuje:
   - Chorób nabytych po odbiorze
   - Urazów
   - Zaniedbania w opiece
   - Niewłaściwego żywienia
          `
        },
        {
          title: 'Prawa Hodowlane',
          conditional: true,
          field: 'breedingRights',
          content: `
☐ KOT SPRZEDAWANY JAKO PET (bez praw hodowlanych)
    - Kot musi zostać wykastrowany/wysterylizowany do {castrationDeadline}
    - Kupujący zobowiązuje się dostarczyć zaświadczenie weterynaryjne
    - Kot NIE MOŻE być wykorzystywany do rozrodu
    
☐ KOT SPRZEDAWANY Z PRAWAMI HODOWLANYMI
    - Kupujący otrzymuje pełny rodowód hodowlany
    - Kupujący ma prawo do wykorzystania kota w hodowli
    - Obowiązek zgłoszenia miotu do odpowiedniej organizacji
    - Dodatkowa opłata: {breedingFee} PLN
    
☐ PRAWA HODOWLANE Z OGRANICZENIAMI
    - Maksymalnie {maxLitters} miotów
    - Współpraca z obecnym hodowcą przy pierwszym miocie
    - First kitten pick dla sprzedającego (opcjonalnie)
          `
        },
        {
          title: 'Obowiązki Kupującego',
          content: `
1. Zapewnić kotowi odpowiednie warunki życia:
   - Bezpieczne mieszkanie/dom
   - Odpowiednią karmę wysokiej jakości
   - Dostęp do wody, kuwety, drapaka
   - Regularne wizyty weterynaryjne
   
2. Kontynuować szczepienia według kalendarza
   
3. Nie przekazywać kota osobom trzecim bez zgody Sprzedającego
   
4. W przypadku niemożności dalszej opieki - pierwszeństwo odkupu
   przysługuje Sprzedającemu
   
5. Utrzymywać kontakt ze Sprzedającym (zdjęcia, aktualizacje)
          `
        },
        {
          title: 'Prawo Odstąpienia',
          content: `
1. Kupujący ma prawo odstąpić od umowy w ciągu 14 dni bez podania przyczyny
   (zgodnie z ustawą o prawach konsumenta)
   
2. Zwrot kota możliwy pod warunkiem:
   - Kot jest w takim samym stanie zdrowia jak przy odbiorze
   - Kot nie został wykastrowany/wysterylizowany
   - Wszystkie dokumenty są kompletne
   
3. Sprzedający zwraca pełną kwotę w ciągu 14 dni od zwrotu kota
   
4. Koszty transportu zwrotnego ponosi Kupujący
          `
        },
        {
          title: 'Dane Kontaktowe Awaryjne',
          fields: ['emergencyVet', 'emergencyVetPhone', 'breederEmergencyPhone']
        },
        {
          title: 'Klauzula RODO',
          content: `
Administratorem danych osobowych jest {breederName}.
Dane będą przetwarzane w celu realizacji umowy sprzedaży.
Dane nie będą przekazywane osobom trzecim bez zgody.
Przysługuje Panu/Pani prawo dostępu, poprawy, usunięcia danych.
          `
        },
        {
          title: 'Postanowienia Końcowe',
          content: `
1. W sprawach nieuregulowanych niniejszą umową mają zastosowanie
   przepisy Kodeksu Cywilnego.
   
2. Ewentualne spory będą rozstrzygane przez sąd właściwy
   dla miejsca zamieszkania Sprzedającego.
   
3. Umowa została sporządzona w 2 jednobrzmiących egzemplarzach,
   po jednym dla każdej ze stron.
   
4. Umowa wchodzi w życie z dniem podpisania przez obie strony.
          `
        },
        {
          title: 'Podpisy',
          signatures: [
            {
              party: 'seller',
              fields: ['date', 'place', 'signature', 'stamp']
            },
            {
              party: 'buyer',
              fields: ['date', 'place', 'signature']
            }
          ]
        }
      ],
      
      attachments: [
        'Kopia rodowodu',
        'Kopia paszportu weterynaryjnego',
        'Wyniki testów genetycznych',
        'Zdjęcia kota',
        'Dowód płatności'
      ]
    },
    
    breeding: {
      id: 'contract_breeding_v2',
      name: 'Umowa Sprzedaży z Prawami Hodowlanymi',
      extends: 'standard',
      additional Sections: [
        'Zobowiązania hodowlane',
        'Prefix usage',
        'Współpraca przy miecie',
        'Wymiana informacji o potomstwie'
      ]
    },
    
    coOwnership: {
      id: 'contract_coownership_v1',
      name: 'Umowa Współwłasności',
      parties: ['Hodowca A', 'Hodowca B', 'Optional: Kupujący'],
      sections: ['Podział własności', 'Podział kosztów', 'Podział potomstwa', 'Show schedule']
    }
  },
  
  eSignature: {
    provider: 'DocuSign / AutoentiSign / Polish eSignature',
    methods: [
      {
        type: 'qualified',
        name: 'Kwalifikowany Podpis Elektroniczny',
        security: 'highest',
        legal: 'Równoważny podpisowi własnoręcznemu',
        cost: 'Paid',
        providers: ['mObywatel', 'Szafir', 'CertumPro']
      },
      {
        type: 'trusted',
        name: 'Zaufany Podpis Elektroniczny (PeUP)',
        security: 'high',
        legal: 'Wysoka moc prawna',
        cost: 'Free with ePUAP',
        provider: 'ePUAP/mObywatel'
      },
      {
        type: 'simple',
        name: 'Prosty Podpis Elektroniczny',
        security: 'medium',
        legal: 'Ważny przy dowodzie tożsamości',
        cost: 'Free',
        methods: ['Email confirmation', 'SMS OTP', 'App signature']
      },
      {
        type: 'biometric',
        name: 'Podpis Biometryczny',
        security: 'high',
        device: 'Tablet with stylus',
        capture: 'Pressure, speed, angle',
        legal: 'Ważny przy zapisie biometrii'
      }
    ],
    
    workflow: {
      steps: [
        {
          step: 1,
          action: 'Hodowca wypełnia szablon',
          autofill: true,
          source: ['Cat database', 'Breeder profile', 'Buyer form']
        },
        {
          step: 2,
          action: 'System generuje PDF preview',
          watermark: 'DRAFT - DO NOT SIGN'
        },
        {
          step: 3,
          action: 'Hodowca review i akceptacja',
          changes: 'Edycja dostępna'
        },
        {
          step: 4,
          action: 'Wysłanie do Kupującego',
          notification: ['Email', 'SMS', 'App push'],
          deadline: '7 dni'
        },
        {
          step: 5,
          action: 'Kupujący review',
          time: '48h na przeczytanie',
          questions: 'Chat z hodowcą dostępny'
        },
        {
          step: 6,
          action: 'Weryfikacja tożsamości Kupującego',
          methods: ['Email OTP', 'SMS OTP', 'Video call', 'ID scan']
        },
        {
          step: 7,
          action: 'Podpis Kupującego',
          timestamp: true,
          ipLog: true,
          geoLocation: true
        },
        {
          step: 8,
          action: 'Powrót do Hodowcy do ostatecznego podpisu',
          notification: true
        },
        {
          step: 9,
          action: 'Podpis Hodowcy',
          timestamp: true,
          requireStamp: 'Optional'
        },
        {
          step: 10,
          action: 'Finalizacja umowy',
          actions: [
            'Generowanie finального PDF',
            'Opatrzenie hash code (blockchain optional)',
            'Timestamp serwera',
            'Wysłanie kopii do obu stron',
            'Archiwizacja w systemie (10 lat)',
            'Powiadomienie admina',
            'Aktualizacja statusu kota na "Sold"'
          ]
        }
      ]
    },
    
    security: {
      encryption: 'AES-256',
      storage: 'Encrypted cloud storage (AWS/Azure/Google)',
      backup: 'Daily encrypted backups',
      retention: '10 years mandatory',
      audit Trail: {
        logged: [
          'Document created',
          'Document viewed',
          'Document edited',
          'Document sent',
          'Email opened',
          'Document signed',
          'IP addresses',
          'Timestamps',
          'Device info',
          'Geo location'
        ],
        immutable: true,
        blockchain: 'Optional - hash stored on blockchain'
      },
      compliance: ['RODO/GDPR', 'eIDAS', 'Polish e-signature law']
    }
  },
  
  disputeResolution: {
    mediator: 'CAT PURRE Mediation Team',
    process: [
      'Zgłoszenie sporu przez którąkolwiek stronę',
      'Analiza umowy i dokumentacji',
      'Kontakt z obiema stronami',
      'Propozycja rozwiązania',
      'Jeśli brak zgody - mediator zewnętrzny',
      'Ostateczność - sąd konsumencki'
    ],
    insurance: {
      optional: true,
      provider: 'Partner Insurance Company',
      coverage: 'Do 10,000 PLN',
      cost: '2% ceny kota'
    }
  }
}
const ADVANCED_ADMIN_FEATURES = {
  demoDataManager: {
    generate: {
      cats: {
        quick: ['10 kotów', '50 kotów', '100 kotów'],
        custom: {
          count: Number,
          breeds: [String], // wybór ras
          priceRange: { min: Number, max: Number },
          organizations: [String],
          locations: [String], // miasta
          withPhotos: Boolean,
          withPedigrees: Boolean,
          realisticData: Boolean // AI-generated realistic data
        }
      },
      breeders: {
        count: Number,
        verificationStatus: ['all', 'verified', 'pending', 'rejected'],
        withRealEmails: Boolean,
        assignCats: Boolean
      },
      clients: {
        count: Number,
        withOrders: Boolean,
        withReviews: Boolean
      },
      orders: {
        count: Number,
        status: ['completed', 'pending', 'cancelled'],
        dateRange: { from: Date, to: Date }
      }
    },
    
    delete: {
      selective: {
        demoCatsOnly: Function,
        demoBreedersOnly: Function,
        demoClientsOnly: Function,
        demoOrdersOnly: Function
      },
      bulk: {
        deleteByBreed: Function,
        deleteByPrice: Function,
        deleteByDate: Function,
        deleteByLocation: Function
      },
      complete: {
        resetToFactory: Function, // kasuje wszystko oprócz adminów
        keepAdmins: Boolean,
        keepSettings: Boolean,
        confirm: 'TYPE: DELETE-EVERYTHING'
      }
    },
    
    import: {
      csv: {
        cats: Function,
        breeders: Function,
        mapping: Object // mapowanie kolumn
      },
      json: {
        fullBackup: Function,
        partial: Function
      },
      api: {
        from OtherPlatform: Function,
        credentials: Object
      }
    },
    
    export: {
      formats: ['CSV', 'Excel', 'JSON', 'XML', 'PDF'],
      scope: ['all', 'filtered', 'selected'],
      includeImages: Boolean,
      includeDocuments: Boolean
    }
  },
  
  advancedModeration: {
    aiContentFilter: {
      enabled: Boolean,
      checkFor: [
        'Inappropriate images',
        'Fake pedigrees',
        'Suspicious prices',
        'Duplicate listings',
        'Scam indicators',
        'Animal welfare concerns'
      ],
      autoActions: {
        flag: Boolean,
        quarantine: Boolean,
        notify Admin: Boolean,
        notifyBreeder: Boolean
      },
      mlModel: 'TensorFlow image recognition + NLP'
    },
    
    manualReview: {
      queue: Array,
      prioritize: ['High risk', 'Reported', 'New breeders'],
      assign To: ObjectId, // admin/moderator
      sla: '24 hours',
      actions: [
        'Approve',
        'Approve with edits',
        'Request changes',
        'Reject',
        'Suspend breeder',
        'Escalate to senior'
      ]
    },
    
    reportSystem: {
      categories: [
        'Fake listing',
        'Sick cat',
        'Bad breeder',
        'Scam',
        'Price manipulation',
        'Inappropriate content',
        'Other'
      ],
      workflow: [
        'User reports',
        'Auto-check by AI',
        'Manual review',
        'Investigation',
        'Action taken',
        'Reporter notified',
        'Public transparency report'
      ]
    }
  },
  
  analytics Dashboard: {
    realtime: {
      activeUsers: Number,
      ongoingChats: Number,
      newListings: Number,
      salesInProgress: Number,
      serverLoad: Object
    },
    
    metrics: {
      users: {
        total: Number,
        newThisMonth: Number,
        activeUsers: Number,
        churnRate: Number,
        lifetimeValue: Number
      },
      breeders: {
        total: Number,
        verified: Number,
        pending: Number,
        avgListings: Number,
        topPerformers: Array
      },
      sales: {
        totalRevenue: Number,
        thisMonth: Number,
        projectedNextMonth: Number,
        avgTransactionValue: Number,
        commissionCollected: Number,
        conversionRate: Number
      },
      platform: {
        listingsTotal: Number,
        activeListings: Number,
        soldThisMonth: Number,
        avgTimeToSale: Number,
        popularBreeds: Array,
        priceDistribution: Object
      }
    },
    
    reports: {
      financial: {
        monthly: Function,
        quarterly: Function,
        annual: Function,
        taxReport: Function
      },
      operational: {
        breederPerformance: Function,
        customerSatisfaction: Function,
        platformHealth: Function
      },
      compliance: {
        gdprReport: Function,
        transactionLog: Function,
        auditTrail: Function
      }
    }
  },
  
  systemConfiguration: {
    global Settings: {
      siteName: String,
      tagline: String,
      maintenanceMode: Boolean,
      allowRegistration: Boolean,
      allowGuestBrowsing: Boolean,
      moderationRequired: Boolean
    },
    
    featureToggles: {
      chat: Boolean,
      videoCall: Boolean,
      virtualTours: Boolean,
      aiRecommendations: Boolean,
      blockchain Verification: Boolean,
      cryptoPayments: Boolean,
      subscriptionModel: Boolean
    },
    
    pricing: {
      commission: {
        standard: Number,
        premium: Number,
        vip: Number
      },
      subscription: {
        breederBasic: Number,
        breederPro: Number,
        breederElite: Number,
        buyerPremium: Number,
        buyerVIP: Number
      },
      features: {
        featured Listing: Number,
        urgentListing: Number,
        topPlacement: Number,
        socialPromotion: Number
      }
    },
    
    integrations: {
      payment: {
        stripe: { enabled: Boolean, keys: Object },
        paypal: { enabled: Boolean, keys: Object },
        przelewy24: { enabled: Boolean, keys: Object },
        crypto: { enabled: Boolean, wallets: Object }
      },
      email: {
        sendgrid: { enabled: Boolean, apiKey: String },
        mailchimp: { enabled: Boolean, apiKey: String }
      },
      sms: {
        twilio: { enabled: Boolean, credentials: Object }
      },
      social: {
        facebookPixel: String,
        googleAnalytics: String,
        googleTagManager: String
      },
      blockchain: {
        ethereum: { enabled: Boolean, contract: String },
        ipfs: { enabled: Boolean, gateway: String }
      }
    }
  }
}
const AI_FEATURES = {
  catRecognition: {
    uploadPhoto: Function,
    identifyBreed: Function,  // rozpoznaje rasę z foto
    confidenceScore: Number,
    suggestedBreeds: Array,
    explanation: String
  },
  
  smartMatching: {
    questionnaire: [
      'Jaki masz styl życia?',
      'Ile masz czasu?',
      'Mieszkasz w...?',
      'Doświadczenie z kotami?',
      'Budget?',
      'Alergicy w rodzinie?',
      'Inne zwierzęta?'
    ],
    algorithm: 'ML model trained on 10k+ successful adoptions',
    output: {
      topMatches: Array, // top 5 ras
      catSuggestions: Array, // konkretne koty
      reasoning: String,
      alternativeOptions: Array
    }
  },
  
  pricePredictor: {
    input: { breed: String, age: Number, pedigree: Object, location: String },
    output: { 
      suggestedPrice: Number,
      priceRange: Object,
      marketAnalysis: String,
      confidence: Number
    },
    basedOn: 'Historical sales data + current market trends'
  },
  
  chattbot: {
    name: 'CatBot',
    capabilities: [
      'Odpowiedzi na FAQ',
      'Pomoc w wyborze rasy',
      'Wyszukiwanie kotów',
      'Status zamówienia',
      'Routing do hodowcy',
      'Podstawowe porady'
    ],
    languages: ['Polski', 'English'],
    integration: 'OpenAI GPT-4 + custom training'
  },
  
  virtualAssistant: {
    name: 'MeowAssistant',
    for: 'Kupujący po zakupie',
    features: [
      'Przypomnienia o szczepieniach',
      'Kalendarz wizyt wet',
      'Porady żywieniowe',
      'Rozpoznawanie chorób (basic)',
      'Trening i zachowanie',
      'Połączenie z hodowcą'
    ],
    notifications: ['Push', 'Email', 'SMS']
  }
}
const WEB3_FEATURES = {
  nftPedigrees: {
    concept: 'Każdy rodowód jako NFT',
    blockchain: 'Polygon (low fees)',
    benefits: [
      'Niezmienność danych',
      'Łatwa weryfikacja autentyczności',
      'Historia transferów',
      'Międzynarodowa akceptacja',
      'Nie można podrobić'
    ],
    meta {
      catName: String,
      breed: String,
      birthDate: Date,
      parents: Object,
      champions: Array,
      geneticTests: Object,
      photos: [IPFS_hash],
      breeder: String,
      organization: String
    },
    minting: {
      who: 'Hodowca po sprzedaży',
      cost: '~$2 (płaci platform/hodowca)',
      transfer: 'Automatyczny do kupującego',
      wallet: 'Metamask / WalletConnect'
    }
  },
  
  cryptoPayments: {
    accepted: ['BTC', 'ETH', 'USDT', 'USDC', 'MATIC'],
    processor: 'CoinGate / Coinbase Commerce',
    benefits: [
      'Międzynarodowe płatności bez opłat wymian',
      'Szybsze rozliczenia',
      'Anonimowość (opcjonalna)',
      'Lower fees'
    ],
    autoConversion: 'To PLN/EUR/USD'
  },
  
  daoGovernance: {
    concept: 'CAT PURRE DAO',
    token: '$PURR',
    purpose: 'Community governance',
    voting: [
      'Nowe funkcje platformy',
      'Zmiany w fee',
      'Weryfikacja hodowców',
      'Charity initiatives',
      'Breed additions'
    ],
    tokenomics: {
      earn: ['Zakup kota', 'Sprzedaż kota', 'Recenzje', 'Referrals', 'Moderacja'],
      spend: ['Premium features', 'Voting power', 'Exclusive listings', 'Discounts']
    }
  }
}
const VR_AR_FEATURES = {
  virtualCattery Visit: {
    technology: 'WebXR / 360° video',
    experience: [
      'Wirtualny spacer po hodowli',
      'Obejrzenie kotów w ich środowisku',
      'Interakcja z hodowcą (avatar/video)',
      'Zoom na detale',
      'Pytania na żywo'
    ],
    devices: ['VR headset', 'Desktop', 'Mobile'],
    recording: 'Hodowca nagrywa raz, pokazuje wielokrotnie'
  },
  
  arCatPreview: {
    technology: 'ARKit / ARCore',
    feature: 'Zobacz kota w swoim domu',
    howItWorks: [
      'Wybierz kota',
      'Kliknij "AR Preview"',
      'Skieruj kamerę na podłogę',
      'Kot pojawia się w 3D w twoim pokoju',
      'Zobacz jak pasuje do przestrzeni'
    ],
    models: '3D model based on breed standard'
  },
  
  virtualShowroom: {
    concept: 'Metaverse cat show',
    platform: 'Decentraland / Custom',
    features: [
      'Wirtualna wystawa kotów',
      'Judging przez ekspertów',
      'Networking między hodowcami',
      'Shopping area',
      'Educational seminars'
    ]
  }
}
const SOCIAL_PLATFORM = {
  catBook: {
    description: 'Facebook dla kotów i hodowców',
    features: {
      profiles: {
        catProfiles: {
          fields: ['name', 'breed', 'birthday', 'owner', 'photos', 'videos', 'achievements'],
          timeline: 'Posts od kota (pisane przez właściciela)',
          friends: 'Inne koty',
          followers: Number
        },
        breederPages: {
          fields: ['cattery', 'breeds', 'gallery', 'reviews', 'news'],
          posts: 'Updates, new litters, show results',
          events: 'Open days, shows'
        }
      },
      
      feed: {
        algorithm: 'Chronological + engagement',
        content: [
          'Nowe kocięta',
          'Sukcesy z wystaw',
          'Funny cat videos',
          'Porady hodowlane',
          'Before/after grooming',
          'Birthday celebrations'
        ],
        interactions: ['Like', 'Love', 'Purr', 'Comment', 'Share']
      },
      
      stories: {
        duration: '24h',
        content: 'Daily life, behind the scenes',
        features: ['Filters', 'Stickers', 'Cat ears AR', 'Polls']
      },
      
      liveStreaming: {
        occasions: [
          'Kittens playing',
          'Grooming session',
          'Vet visit',
          'Show competition',
          'Q&A with breeder'
        ],
        monetization: 'Tips/donations'
      },
      
      groups: {
        types: [
          'Breed specific (np. "British Shorthair Lovers")',
          'Local (np. "Koty Warszawa")',
          'Topic (np. "Raw feeding")',
          'Breeder network',
          'First-time owners'
        ],
        features: ['Discussions', 'Polls', 'Events', 'File sharing']
      },
      
      marketplace: {
        notJustCats: [
          'Cat accessories',
          'Food',
          'Toys',
          'Used equipment',
          'Services (grooming, sitting)'
        ]
      },
      
      events: {
        types: [
          'Cat shows',
          'Breeder open days',
          'Adoption events',
          'Webinars',
          'Meetups'
        ],
        features: ['RSVP', 'Reminders', 'Live updates']
      }
    }
  },
  
  catTok: {
    description: 'TikTok dla kotów',
    format: 'Short vertical videos (15s-3min)',
    content: [
      'Funny cat moments',
      'Grooming transformations',
      'Kitten growing up (time-lapse)',
      'Training tricks',
      'Before/after adoption',
      'Day in the life',
      'Breed education',
      'Show preparations'
    ],
    features: {
      effects: ['Cat filters', 'Sound effects', 'Transitions'],
      sounds: 'Library of cat sounds + music',
      hashtags: '#MaineCoon #CatLife #KittenCuteness',
      challenges: '#ShowMeYourCat #GroomingChallenge',
      duets: 'Duet with other cats',
      stitches: 'React to other videos'
    },
    algorithm: 'For You Page based on engagement',
    monetization: {
      creatorFund: 'Payment for views',
      brandDeals: 'Cat food, toys companies',
      live Gifts: 'Virtual gifts during live'
    }
  },
  
  influencerProgram: {
    tiers: [
      { name: 'Micro', followers: '1k-10k', perks: ['Badge', 'Early features'] },
      { name: 'Rising', followers: '10k-50k', perks: ['Revenue share', 'Verification'] },
      { name: 'Star', followers: '50k-100k', perks: ['Brand deals', 'Priority support'] },
      { name: 'Celebrity', followers: '100k+', perks: ['Custom features', 'PR opportunities'] }
    ],
    verification: {
      badge: '✓ Verified Breeder',
      criteria: ['Active presence', 'Good reviews', 'Platform compliance']
    }
  }
}
const ECOMMERCE_EXPANSION = {
  catShop: {
    categories: [
      {
        name: 'Karma',
        brands: ['Royal Canin', 'Hill\'s', 'Orijen', 'Acana', 'Applaws'],
        features: ['Breed-specific', 'Age-specific', 'Subscription model']
      },
      {
        name: 'Akcesoria',
        items: ['Kuwety', 'Drapaki', 'Transportery', 'Zabawki', 'Legowiska']
      },
      {
        name: 'Pielęgnacja',
        items: ['Szczotki', 'Szampony', 'Maszynki', 'Nożyczki', 'Kosmetyki']
      },
      {
        name: 'Zdrowie',
        items: ['Suplementy', 'Witaminy', 'Odrobaczanie', 'Pchły/kleszcze']
      },
      {
        name: 'Breeding',
        items: ['Inkubatory', 'Wagi', 'Butelki', 'Mleko zastępcze', 'Rodowody']
      }
    ],
    
    subscriptionBoxes: {
      name: 'PURRE BOX',
      tiers: [
        { name: 'Basic', price: 79, items: '4-5' },
        { name: 'Premium', price: 139, items: '7-8' },
        { name: 'Luxury', price: 249, items: '10+' }
      ],
      contents: ['Zabawki', 'Przysmaki', 'Akcesoria', 'Surprise item'],
            customization: 'Based on cat breed, age, preferences',
      frequency: ['Monthly', 'Quarterly'],
      unboxing: 'Exclusive video content from partner brands'
    },
    
    marketplace: {
      thirdParty Sellers: {
        enabled: true,
        commission: '15%',
        verification: 'Required',
        categories: ['Handmade', 'Vintage', 'Custom items']
      },
      breederSupplies: {
        bulkOrders: true,
        businessPricing: true,
        invoice: 'VAT invoices available'
      }
    }
  },
  
  servicesMarketplace: {
    categories: [
      {
        name: 'Opieka',
        services: [
          { type: 'Cat sitting', pricing: 'Per day', verification: 'Background check' },
          { type: 'Walking service', pricing: 'Per visit', insurance: 'Required' },
          { type: 'Daycare', pricing: 'Per day', facility: 'Inspected' }
        ]
      },
      {
        name: 'Grooming',
        services: [
          { type: 'Bath & brush', duration: '1-2h', mobile: true },
          { type: 'Full grooming', duration: '2-3h', breeds: ['Persian', 'Maine Coon'] },
          { type: 'Show preparation', duration: '3-4h', expert: true },
          { type: 'Nail trimming', duration: '15min', walkIn: true }
        ]
      },
      {
        name: 'Weterynaria',
        services: [
          { type: 'Szczepienia', home: true, price: '150-200 PLN' },
          { type: 'Chipowanie', home: true, price: '80-120 PLN' },
          { type: 'Konsultacja online', duration: '30min', price: '100 PLN' },
          { type: 'Testy genetyczne', lab: 'Partner labs', turnaround: '2-3 weeks' }
        ],
        partners: ['Idexx', 'Laboklin', 'MyDogDNA']
      },
      {
        name: 'Trening',
        services: [
          { type: 'Podstawowy trening', sessions: '4-8', topics: ['Litter', 'Scratching', 'Biting'] },
          { type: 'Behavioral consultation', expert: 'Feline behaviorist', price: '300-500 PLN' },
          { type: 'Clicker training', sessions: '6-10', skills: ['Tricks', 'Agility'] }
        ]
      },
      {
        name: 'Fotografia',
        services: [
          { type: 'Portfolio shoot', photos: '20-30', usage: 'Breeding portfolio' },
          { type: 'Show photography', onSite: true, delivery: '48h' },
          { type: 'Lifestyle session', photos: '50+', location: 'Home/outdoor' },
          { type: 'Video production', duration: '2-5min', purpose: 'Cattery promo' }
        ]
      },
      {
        name: 'Transport',
        services: [
          { type: 'Local delivery', range: '50km', price: 'From 100 PLN' },
          { type: 'Nationwide', insurance: 'Included', tracking: 'Real-time' },
          { type: 'International', documentation: 'Handled', customs: 'Assistance' },
          { type: 'Airport pickup/delivery', available: '24/7', price: 'Variable' }
        ]
      },
      {
        name: 'Konsultacje',
        services: [
          { type: 'Breeding consultation', expert: 'Senior breeder', price: '200-400 PLN/h' },
          { type: 'Nutrition planning', expert: 'Feline nutritionist', includes: 'Meal plan' },
          { type: 'Show preparation', expert: 'Judge/Handler', topics: ['Grooming', 'Presentation'] },
          { type: 'Cattery setup', expert: 'Experienced breeder', includes: 'Business plan' }
        ]
      }
    ],
    
    booking: {
      calendar: 'Integrated calendar system',
      availability: 'Real-time',
      payment: 'Escrow system',
      cancellation: 'Policy per provider',
      insurance: 'Optional add-on',
      reviews: 'Mandatory after service'
    },
    
    professionalProfiles: {
      verification: {
        required: ['ID verification', 'Background check', 'Insurance proof'],
        optional: ['Certifications', 'References', 'Portfolio']
      },
      portfolio: {
        photos: 'Unlimited',
        videos: 'Up to 10',
        certificates: 'Scan uploads',
        reviews: 'From platform + external'
      },
      pricing: {
        commission: '18%',
        withdrawal: 'Weekly/Monthly',
        minimumPayout: '100 PLN',
        methods: ['Bank transfer', 'PayPal', 'Revolut']
      }
    }
  },
  
  advertisingPlatform: {
    forBreeders: {
      spotlightListing: {
        position: 'Top of search results',
        duration: ['3 days', '7 days', '14 days', '30 days'],
        price: { 3: 49, 7: 89, 14: 149, 30: 249 },
        analytics: 'Views, clicks, inquiries'
      },
      featuredBanner: {
        position: 'Homepage hero',
        format: '1920x600px',
        duration: '24h/48h/7days',
        price: { '24h': 299, '48h': 499, '7d': 999 },
        targeting: 'By breed interest'
      },
      socialMediaBoost: {
        platforms: ['Facebook', 'Instagram', 'TikTok'],
        targeting: 'Demographics + interests',
        budget: 'Custom',
        management: 'Self-service or managed'
      },
      emailCampaigns: {
        database: 'Opt-in users',
        segmentation: ['By breed preference', 'By location', 'By budget'],
        templates: 'Professional designs',
        analytics: 'Open rate, click rate, conversions'
      }
    },
    
    forBrands: {
      displayAds: {
        formats: ['Banner', 'Sidebar', 'Native', 'Video'],
        targeting: 'Cat owners demographics',
        pricing: 'CPM/CPC/CPA',
        minBudget: '1000 PLN/month'
      },
      sponsoredContent: {
        types: ['Articles', 'Videos', 'Guides', 'Reviews'],
        disclosure: 'Clearly marked as sponsored',
        approval: 'Editorial review',
        pricing: 'Per piece or package'
      },
      productPlacement: {
        locations: ['Cat profiles', 'Breeder pages', 'Articles', 'Videos'],
        integration: 'Natural placement',
        tracking: 'UTM + conversion'
      },
      affiliateProgram: {
        commission: '5-15%',
        tracking: '90-day cookie',
        payments: 'Monthly',
        materials: 'Banners, links, widgets'
      }
    }
  },
  
  premiumSubscriptions: {
    forBuyers: {
      basic: {
        name: 'CAT LOVER',
        price: '0 PLN/month',
        features: [
          'Browse all cats',
          'Save 10 favorites',
          'Basic search filters',
          'Chat with breeders',
          'Email notifications'
        ]
      },
      premium: {
        name: 'CAT ENTHUSIAST',
        price: '29 PLN/month',
        features: [
          'All Basic features',
          'Unlimited favorites',
          'Advanced search + alerts',
          'Priority support',
          'Video calls with breeders',
          'Price drop notifications',
          'Exclusive deals (5-10% off)',
          'Ad-free experience',
          'Early access to new litters',
          'Monthly newsletter with tips'
        ]
      },
      vip: {
        name: 'CAT CONNOISSEUR',
        price: '99 PLN/month',
        features: [
          'All Premium features',
          'Personal cat consultant',
          'VIP hotline 24/7',
          'Home visits from breeders',
          'Concierge service (transport, setup)',
          'Lifetime support after purchase',
          'Access to exclusive breeders',
          'Show tickets & backstage access',
          'Quarterly gift box',
          'Community events invitations'
        ]
      }
    },
    
    forBreeders: {
      starter: {
        name: 'HOBBY BREEDER',
        price: '99 PLN/month',
        features: [
          '5 active listings',
          'Basic analytics',
          'Standard support',
          'Commission: 8%',
          'Profile page',
          'Chat system',
          'Contract templates (basic)'
        ]
      },
      professional: {
        name: 'PRO BREEDER',
        price: '299 PLN/month',
        features: [
          '20 active listings',
          'Advanced analytics',
          'Priority support',
          'Commission: 5%',
          'Enhanced profile + verification badge',
          'Video calls',
          'Contract templates (advanced)',
          'Auto-responders',
          'Litter management',
          'Waiting list system',
          'Monthly performance report',
          '1 free spotlight listing/month'
        ]
      },
      elite: {
        name: 'ELITE CATTERY',
        price: '599 PLN/month',
        features: [
          'Unlimited listings',
          'Premium analytics + insights',
          'Dedicated account manager',
          'Commission: 3%',
          'Custom cattery website',
          'Professional photography (1x/year)',
          'All contract types + e-signature',
          'CRM integration',
          'Marketing automation',
          'API access',
          'White-label option',
          'Featured cattery badge',
          '4 free spotlight listings/month',
          'Social media management tools',
          'Priority placement in search'
        ]
      }
    }
  }
}
const INTEGRATIONS = {
  paymentGateways: {
    stripe: {
      features: ['Cards', 'Apple Pay', 'Google Pay', 'BLIK', 'Bank transfers'],
      countries: 'Worldwide',
      fees: '1.4% + 1 PLN European cards',
      settlement: 'T+2',
      recurring: true,
      refunds: true,
      disputes: 'Automated handling'
    },
    przelewy24: {
      features: ['Polish banks', 'BLIK', 'PayPo', 'Installments'],
      popularity: 'Most popular in Poland',
      fees: '1.9% + 0 PLN',
      settlement: 'T+1',
      mobilApp: true
    },
    paypal: {
      features: ['PayPal balance', 'Cards', 'Bank'],
      international: true,
      fees: '3.4% + 1.35 PLN',
      buyerProtection: 'Strong',
      crypto: 'Crypto checkout available'
    },
    crypto: {
      coinbase: {
        coins: ['BTC', 'ETH', 'USDC', 'USDT'],
        fees: '1%',
        settlement: 'Next day to bank',
        volatility: 'Auto-conversion option'
      },
      metamask: {
        directWallet: true,
        chains: ['Ethereum', 'Polygon', 'BSC'],
        gasOptimization: true
      }
    },
    escrow: {
      provider: 'Stripe Connect / Custom',
      flow: [
        'Buyer pays to escrow',
        'Breeder notified',
        'Cat delivered',
        'Buyer confirms receipt (72h)',
        'Payment released to breeder',
        'Platform fee deducted'
      ],
      disputes: 'Mediation process',
      insurance: 'Optional add-on'
    }
  },
  
  shippingProviders: {
    localCouriers: [
      {
        name: 'InPost',
        service: 'Courier',
        petFriendly: true,
        tracking: true,
        insurance: 'Up to 10,000 PLN'
      },
      {
        name: 'DPD',
        service: 'Premium delivery',
        petFriendly: true,
        temperature: 'Climate controlled',
        handlingFee: '50 PLN'
      },
      {
        name: 'Dedicated pet transport',
        companies: ['PetMove', 'AnimalTransport.pl'],
        features: ['Door to door', 'Professional carriers', 'Vet on call'],
        pricing: 'Custom quotes'
      }
    ],
    international: [
      {
        name: 'PetExpress',
        coverage: 'EU + UK',
        documentation: 'Full assistance',
        pricing: 'From 500 EUR',
        includes: ['Pet passport', 'Health certificate', 'Customs']
      },
      {
        name: 'Animal Air Transport',
        coverage: 'Worldwide',
        iata: true,
        includes: ['Flight booking', 'Crate', 'Quarantine assistance'],
        pricing: 'From 2000 USD'
      }
    ]
  },
  
  veterinaryNetworks: {
    partners: [
      {
        name: 'VetNet Poland',
        clinics: 500+,
        services: ['Vaccinations', 'Microchipping', 'Health certificates', 'Emergency'],
        discount: '10% for platform users',
        booking: 'Integrated calendar'
      },
      {
        name: 'Medivet',
        locations: 'Nationwide',
        specialization: 'Cat specialists',
        services: ['Genetic testing', 'Breeding consultations', 'Pre-purchase exams'],
        partnership: 'Preferred provider'
      },
      {
        name: 'Telemedicine',
        provider: 'VetChat24',
        availability: '24/7',
        format: 'Video/chat',
        pricing: '79 PLN per consultation',
        included: 'For VIP members'
      }
    ],
    
    testingLabs: [
      {
        name: 'Laboklin',
        location: 'Germany',
        tests: ['HCM', 'PKD', 'PRA', 'SMA', 'Blood type', 'DNA profile'],
        turnaround: '10-14 days',
        discount: '15% bulk orders'
      },
      {
        name: 'MyCatDNA',
        location: 'Finland',
        test: 'Comprehensive genetic panel',
        breeds: 'All major breeds',
        diseases: '40+ genetic diseases',
        turnaround: '3-4 weeks',
        price: '599 PLN'
      },
      {
        name: 'UC Davis VGL',
        location: 'USA',
        tests: ['DNA profiling', 'Parentage verification', 'Genetic diseases'],
        reputation: 'Gold standard',
        turnaround: '2-3 weeks'
      }
    ]
  },
  
  organizationAPIs: {
    fife: {
      integration: 'Pending partnership',
      features: [
        'Pedigree verification',
        'Breeder lookup',
        'Show results',
        'Title confirmations'
      ],
      access: 'Requires FIFe approval'
    },
    wcf: {
      integration: 'Under negotiation',
      database: 'Cattery registry',
      verification: 'Real-time'
    },
    tica: {
      integration: 'API available',
      endpoints: [
        '/breeder/verify',
        '/pedigree/lookup',
        '/show/results',
        '/cat/registration'
      ],
      auth: 'OAuth 2.0',
      documentation: 'Full API docs'
    }
  },
  
  socialMedia: {
    facebook: {
      integration: ['Login', 'Share', 'Pixel', 'Marketplace sync'],
      features: [
        'Auto-post new listings to FB page',
        'Sync events',
        'Import reviews',
        'FB Shops integration'
      ]
    },
    instagram: {
      integration: ['Share', 'Instagram Shopping', 'Stories API'],
      features: [
        'Auto-post to IG',
        'Tag products',
        'Swipe-up links (for verified)',
        'Reels integration'
      ]
    },
    tiktok: {
      integration: ['Share', 'TikTok For Business'],
      features: [
        'Cross-post to TikTok',
        'Shopping integration (coming)',
        'Hashtag campaigns',
        'Creator marketplace'
      ]
    },
    youtube: {
      integration: ['Embed', 'Upload API'],
      features: [
        'Auto-upload cattery videos',
        'Livestream shows',
        'Monetization split',
        'Community posts'
      ]
    }
  },
  
  crmSystems: {
    builtin: {
      name: 'CAT PURRE CRM',
      features: [
        'Contact management',
        'Lead tracking',
        'Communication history',
        'Automated follow-ups',
        'Tags and segments',
        'Deal pipeline',
        'Task management',
        'Email templates',
        'SMS campaigns',
        'Reporting'
      ]
    },
    external: [
      {
        name: 'HubSpot',
        integration: 'Zapier',
        syncFields: ['Contacts', 'Deals', 'Notes'],
        direction: 'Bidirectional'
      },
      {
        name: 'Salesforce',
        integration: 'REST API',
        useCase: 'Enterprise breeders',
        customObjects: 'Cats, Litters, Shows'
      }
    ]
  },
  
  analyticsTools: {
    google: {
      analytics: {
        version: 'GA4',
        tracking: ['Page views', 'Events', 'Conversions', 'User flow'],
        ecommerce: 'Enhanced ecommerce tracking'
      },
      tagManager: {
        tags: ['All marketing pixels', 'Event tracking', 'Form submissions'],
        triggers: 'Custom event triggers'
      },
      searchConsole: {
        seo: 'Performance monitoring',
        keywords: 'Organic search queries',
        indexing: 'Coverage reports'
      }
    },
    
    heatmaps: {
      tool: 'Hotjar',
      features: ['Heatmaps', 'Session recordings', 'Surveys', 'Feedback'],
      insights: 'User behavior analysis'
    },
    
    custom: {
      name: 'CAT PURRE Analytics',
      dashboards: [
        'Platform overview',
        'Breeder performance',
        'Cat listing analytics',
        'User journey',
        'Conversion funnels',
        'Revenue analytics',
        'Marketing attribution'
      ],
      export: 'CSV, Excel, PDF',
      api: 'REST API for custom integrations'
    }
  },
  
  marketingAutomation: {
    email: {
      provider: 'SendGrid + Mailchimp',
      campaigns: [
        {
          trigger: 'New user registration',
          sequence: ['Welcome', 'Profile completion', 'First search tips', 'Featured cats'],
          timing: ['Immediate', 'Day 1', 'Day 3', 'Day 7']
        },
        {
          trigger: 'Cat favorited',
          sequence: ['Reminder', 'Similar cats', 'Price drop alert'],
          timing: ['Day 2', 'Day 5', 'When applicable']
        },
        {
          trigger: 'Abandoned inquiry',
          sequence: ['Follow-up', 'Testimonials', 'Special offer'],
          timing: ['6 hours', 'Day 1', 'Day 3']
        },
        {
          trigger: 'Purchase completed',
          sequence: ['Thank you', 'Setup guide', 'Care tips', 'Review request', 'Upsells'],
          timing: ['Immediate', 'Day 1', 'Week 1', 'Month 1', 'Month 2']
        }
      ],
      personalization: 'Name, breed preference, location',
      abTesting: true
    },
    
    sms: {
      provider: 'Twilio',
      useCases: [
        'Appointment reminders',
        'Price drop alerts',
        'New litter notifications',
        'Verification codes',
        'Order status updates'
      ],
      optIn: 'Required',
      frequency: 'Max 2/week'
    },
    
    push: {
      provider: 'OneSignal',
      platforms: ['Web', 'iOS', 'Android'],
      segments: 'By breed interest, budget, activity',
      timing: 'Smart delivery optimization'
    }
  }
}
const LEGAL_COMPLIANCE = {
  gdpr: {
    dataProtection: {
      officer: 'Designated DPO',
      lawfulBasis: ['Consent', 'Contract', 'Legitimate interest'],
      dataMinimization: true,
      storageLimit: 'Max 10 years for transactions',
      encryption: 'At rest and in transit'
    },
    
    userRights: {
      access: 'Download all personal data',
      rectification: 'Edit profile anytime',
      erasure: 'Right to be forgotten',
      portability: 'Export data in machine-readable format',
      objection: 'Opt-out of marketing',
      automatedDecision: 'Opt-out of AI matching'
    },
    
    consents: {
      registration: 'Terms & Privacy Policy',
      marketing: 'Separate opt-in',
      cookies: 'Cookie banner with granular controls',
      thirdParty: 'Explicit consent for data sharing'
    },
    
    breachProtocol: {
      detection: 'Automated monitoring',
      notification: 'Within 72 hours to authority',
      userNotification: 'If high risk',
      documentation: 'Full incident log'
    }
  },
  
  animalWelfare: {
    compliance: [
      'Ustawa o ochronie zwierząt (Poland)',
      'EU Animal Welfare Directive',
      'CITES (for exotic breeds)'
    ],
    
    breeders Requirements: {
      registration: 'Proper business registration',
      facilities: 'Minimum standards',
      veterinaryCare: 'Regular vet checks',
      breeding Frequency: 'Max litters per year per female',
      age Restrictions: 'Min breeding age, max breeding age',
      documentation: 'Full health and lineage records'
    },
    
    platformRules: {
      prohibited: [
        'Unregistered breeders',
        'Backyard breeding',
        'Kittens under 12 weeks',
        'Sick or injured cats',
        'Banned breeds (if applicable)',
        'Declawed cats (against welfare)'
      ],
      required: [
        'Health certificate',
        'Vaccinations up to date',
        'Microchip',
        'Pedigree or registration papers',
        'Veterinary examination before sale'
      ]
    },
    
    reportingSystem: {
      hotline: '24/7 animal welfare hotline',
      partnership: 'Local animal welfare organizations',
      investigation: 'Dedicated team',
      enforcement: 'Account suspension, legal action if needed'
    }
  },
  
  consumerProtection: {
    rightOfWithdrawal: {
      period: '14 days',
      conditions: 'Cat must be in same condition',
      refund: 'Full refund within 14 days',
      exceptions: 'Living animals (special rules apply)'
    },
    
    warranty: {
      legal: '2 years for defects (applies to genetic issues)',
      breeder: 'Extended health guarantee in contract',
      disputes: 'Mediation before court'
    },
    
    priceTransparency: {
      display: 'All costs upfront',
      fees: 'Platform fee clearly stated',
      additionalCosts: 'Transport, accessories optional',
      noHiddenFees: 'Zero tolerance policy'
    }
  },
  
  taxation: {
    poland: {
      vat: {
        breeders: 'VAT if business registered',
        platform: '23% VAT on services',
        invoices: 'Automatic generation',
        reporting: 'JPK_FA for businesses'
      },
      income: {
        breeders: 'Personal income or business tax',
        platform: 'CIT or PIT depending on structure',
        reporting: 'Annual tax returns'
      }
    },
    
    international: {
      vatMoss: 'For EU sales',
      withholding: 'For international breeders',
      compliance: 'Per-country regulations'
    },
    
    automation: {
      calculations: 'Automatic VAT calculation',
      invoicing: 'Auto-generated compliant invoices',
      reporting: 'Export for accountants',
      integration: 'ifirma, InFakt, WFirma'
    }
  },
  
  security: {
    infrastructure: {
      hosting: 'AWS / Google Cloud / Azure',
      ddos: 'Cloudflare protection',
      firewall: 'WAF enabled',
      backups: 'Hourly incremental, daily full',
      redundancy: 'Multi-region',
      uptime: '99.9% SLA'
    },
    
    application: {
      authentication: 'OAuth 2.0 + JWT',
      passwordPolicy: 'Min 8 chars, complexity requirements',
      mfa: 'Optional 2FA via SMS/authenticator app',
      sessionManagement: 'Timeout after 30min inactivity',
      apiSecurity: 'Rate limiting, API keys, HMAC signatures'
    },
    
     {
      encryption: {
        transit: 'TLS 1.3',
        rest: 'AES-256',
        database: 'Encrypted columns for PII',
        files: 'Encrypted storage'
      },
      access Control: {
        principle: 'Least privilege',
        rbac: 'Role-based access control',
        audit: 'Full audit trail',
        review: 'Quarterly access review'
      }
    },
    
    payments: {
      pciDss: 'Level 1 compliance (via Stripe)',
      tokenization: 'No card data stored',
      fraud Detection: 'ML-based fraud prevention',
      chargebacks: 'Automated handling'
    },
    
    incidentResponse: {
      plan: 'Documented IR plan',
      team: 'Dedicated security team',
      drills: 'Quarterly simulations',
      communication: 'Clear escalation path'
    }
  },
  
  intellectualProperty: {
    platform: {
      trademark: 'CAT PURRE ® (registered)',
      copyright: 'All platform code and design',
      patents: 'Pending for AI matching algorithm'
    },
    
    userContent: {
      ownership: 'User retains rights to photos/videos',
      license: 'User grants platform license to display',
      removal: 'User can request removal anytime',
      infringement: 'DMCA takedown procedure'
    },
    
    breederContent: {
      catteryNames: 'Protected as trademarks',
      photos: 'Watermarking available',
      pedigrees: 'Confidential information protected',
      contracts: 'Templates copyrighted'
    }
  }
}
const GAMIFICATION = {
  achievementSystem: {
    forBuyers: [
      {
        name: 'First Purr',
        condition: 'Register account',
        reward: '50 points',
        badge: '🐱'
      },
      {
        name: 'Cat Curious',
        condition: 'View 10 cat profiles',
        reward: '100 points',
        badge: '👀'
      },
      {
        name: 'Breed Expert',
        condition: 'Read all 20 breed guides',
        reward: '500 points',
        badge: '📚'
      },
      {
        name: 'Happy Owner',
        condition: 'Purchase first cat',
        reward: '1000 points + 10% next purchase',
        badge: '🏆'
      },
      {
        name: 'Review Master',
        condition: 'Write 5 detailed reviews',
        reward: '300 points',
        badge: '✍️'
      },
      {
        name: 'Community Helper',
        condition: 'Help 10 users in forum',
        reward: '400 points',
        badge: '🤝'
      },
      {
        name: 'Social Butterfly',
        condition: 'Share 20 cats',
        reward: '200 points',
        badge: '🦋'
      },
      {
        name: 'Cat Collector',
        condition: 'Own 3+ cats from platform',
        reward: 'VIP status for 1 month',
        badge: '👑'
      }
    ],
    
    forBreeders: [
      {
        name: 'New Cattery',
        condition: 'Complete cattery profile',
        reward: '100 points',
        badge: '🏠'
      },
      {
        name: 'First Sale',
        condition: 'Sell first cat',
        reward: '500 points + Featured listing',
        badge: '💰'
      },
      {
        name: 'Fast Responder',
        condition: 'Maintain <2h avg response time for month',
        reward: '300 points + Response time badge',
        badge: '⚡'
      },
      {
        name: 'Customer Satisfaction',
        condition: 'Achieve 4.8+ rating with 10+ reviews',
        reward: '1000 points + Verified Excellence badge',
        badge: '⭐'
      },
      {
        name: 'Show Champion',
        condition: 'Cat wins show title',
        reward: '800 points + Champion breeder badge',
        badge: '🏅'
      },
      {
        name: 'Prolific Breeder',
        condition: 'Sell 50+ cats',
        reward: '2000 points + Hall of Fame',
        badge: '🌟'
      },
      {
        name: 'Perfect Record',
        condition: '100% satisfaction rate (50+ sales)',
        reward: '5000 points + Lifetime discount on fees',
        badge: '💎'
      },
      {
        name: 'Mentor',
        condition: 'Help 5 new breeders succeed',
        reward: '1500 points + Mentor badge',
        badge: '👨‍🏫'
      }
    ],
    
    pointsRedemption: {
      catalog: [
        { item: '5% discount voucher', points: 500 },
        { item: '1 month Premium subscription', points: 1000 },
        { item: 'Professional photo shoot', points: 2000 },
        { item: 'Featured listing (7 days)', points: 1500 },
        { item: 'Custom cattery website', points: 5000 },
        { item: 'Charity donation in your name', points: 1000 },
        { item: 'Show tickets (pair)', points: 800 },
        { item: 'Exclusive merchandise', points: 1200 }
      ],
      transfer: 'Points can be gifted to other users',
      expiration: '2 years'
    }
  },
  
  leaderboards: {
    categories: [
      {
        name: 'Top Breeders (Monthly)',
        metric: 'Sales + rating',
        prize: 'Featured in newsletter + 1 month free Pro'
      },
      {
        name: 'Most Active Community Members',
        metric: 'Forum posts + helpful votes',
        prize: 'Community Champion badge + merch'
      },
      {
        name: 'Best Photography',
        metric: 'User votes on cat photos',
        prize: 'Professional editing service'
      },
      {
        name: 'Rising Star Breeders',
        metric: 'Growth rate (new breeders)',
        prize: 'Mentorship program + spotlight'
      }
    ],
    reset: 'Monthly',
    allTime: 'Hall of Fame preserved'
  },
  
  challenges: {
    seasonal: [
      {
        name: 'Summer Kitten Quest',
        period: 'June-August',
        task: 'Adopt a kitten, share progress photos',
        reward: 'Summer swag pack + bonus points'
      },
      {
        name: 'Holiday Helper',
        period: 'December',
        task: 'Help 3 users find perfect cat',
        reward: 'Charity donation + premium month'
      }
    ],
    
    weekly: [
      {
        name: 'Photo Friday',
        task: 'Share best cat photo',
        reward: 'Weekly winner gets featured + 100 points'
      },
      {
        name: 'Wisdom Wednesday',
        task: 'Share breeding/care tip',
        reward: 'Most helpful gets spotlight + 150 points'
      }
    ],
    
    community: [
      {
        name: 'Referral Rockstar',
        task: 'Refer 5 friends',
        reward: '500 points per friend + bonus at 5'
      },
      {
        name: 'Review Rally',
        task: 'Write detailed reviews',
        reward: 'Points per review + bonus for quality'
      }
    ]
  },
  
  loyaltyProgram: {
    tiers: [
      {
        name: 'Bronze',
        requirement: '0-999 points',
        benefits: ['Basic features', 'Birthday discount 5%']
      },
      {
        name: 'Silver',
        requirement: '1000-4999 points',
        benefits: ['10% off services', 'Priority support', 'Early litter access']
      },
      {
        name: 'Gold',
        requirement: '5000-9999 points',
        benefits: ['15% off', 'VIP support', 'Exclusive events', 'Free shipping']
      },
      {
        name: 'Platinum',
        requirement: '10000+ points',
        benefits: ['20% off', 'Dedicated concierge', 'Lifetime warranty', 'All features unlocked']
      }
    ],
    anniversary: 'Bonus points each year',
    retention: 'Special offers for inactive users'
  }
}
const MOBILE_APP = {
  platforms: ['iOS', 'Android'],
  technology: 'React Native / Flutter',
  
  features: {
    core: [
      'Browse cats (optimized mobile view)',
      'Advanced search with filters',
      'Swipe interface (Tinder-style)',
      'Real-time chat',
      'Video calls',
      'Push notifications',
      'Favorites sync',
      'Profile management'
    ],
    
    unique: [
      {
        name: 'AR Cat Preview',
        description: 'See cat in your home using AR',
        technology: 'ARKit / ARCore'
      },
      {
        name: 'Cat Scanner',
        description: 'Take photo → identify breed → find similar',
        technology: 'TensorFlow Lite'
      },
      {
        name: 'Voice Search',
        description: '"Find me a blue British Shorthair under 5000 PLN"',
        technology: 'Speech-to-text + NLP'
      },
      {
        name: 'Geolocation Finder',
        description: 'Find breeders and cats near you',
        map: 'Google Maps / Apple Maps'
      },
      {
        name: 'Offline Mode',
        description: 'Browse previously viewed cats offline',
        storage: 'Local cache'
      },
      {
        name: 'Barcode Scanner',
        description: 'Scan microchip number → verify cat',
        technology: 'Camera + QR/barcode reader'
      }
    ],
    
    breeder: [
      'Manage listings on-the-go',
      'Respond to inquiries',
      'Upload photos/videos from phone',
      'Mobile analytics dashboard',
      'Schedule appointments',
      'Digital contracts with mobile signature',
      'Live streaming from cattery'
    ],
    
    social: [
      'In-app social feed',
      'Stories (24h)',
      'Share to external social media',
      'Follow breeders',
      'Like and comment',
      'Direct messaging'
    ],
    
    utilities: [
      'Vaccination reminder calendar',
      'Vet appointment booking',
      'Expense tracker for cat ownership',
      'Care tips and guides',
      'Emergency vet finder',
      'Pet insurance integration'
    ]
  },
  
  uiux: {
    design: 'Modern, clean, cat-themed',
    colors: ['Primary: Cat Purre Purple', 'Secondary: Warm Orange', 'Accents: Pastels'],
    typography: 'Custom font + system fonts',
    animations: 'Smooth, playful transitions',
    accessibility: ['VoiceOver support', 'Dynamic text', 'High contrast mode']
  },
  
  performance: {
    launchTime: '< 2 seconds',
    imageCaching: 'Aggressive caching strategy',
    dataUsage: 'Optimized for mobile data',
    batteryLife: 'Efficient background tasks',
    crashRate: 'Target < 0.1%'
  },
  
  monetization: {
    appStore: 'Free download',
    inAppPurchases: ['Premium subscription', 'Point packs', 'Ad removal'],
    ads: 'Non-intrusive banner ads for free users',
    commissions: 'Same as web platform'
  },
  
  launch: {
    mvp: 'Q2 2026',
    regions: 'Poland first → EU → Global',
    marketing: ['App Store Optimization', 'Influencer partnerships', 'Launch promo'],
    beta: 'Invite-only beta for top users'
  }
}
const ROADMAP = {
  2026: {
    q1: [
      'Platform launch (web)',
      'First 50 verified breeders',
      '20 breeds database complete',
      'Basic chat & contracts',
      'Payment integration'
    ],
    q2: [
      'Mobile app launch (iOS + Android)',
      'AI matching system v1',
      'Video calls integration',
      'Expand to 100+ breeders',
      'First marketing campaign'
    ],
    q3: [
      'Social features (CatBook)',
      'E-commerce expansion (shop)',
      'Services marketplace',
      'Advanced analytics for breeders',
      '1000+ active listings'
    ],
    q4: [
      'International expansion (EU)',
      'Blockchain pedigrees pilot',
      'Virtual cattery tours',
      'Premium subscription launch',
      'Break-even point'
    ]
  },
  
  2027: {
    goals: [
      'Market leader in Poland',
      'Expand to 10 EU countries',
      'Launch CatTok (TikTok competitor)',
      'NFT pedigrees mainstream',
      'AI breeding recommendations',
      'Partnerships with major organizations (FIFe, TICA)',
      '10,000+ cats sold',
      'Profitability'
    ]
  },
  
  2028: {
    goals: [
      'Global expansion (NA, Asia)',
      'Metaverse cat shows',
      'DAO governance launch',
      'White-label solution for organizations',
      'Acquisition of competitors',
      'IPO preparation',
      '100,000+ active users'
    ]
  },
  
  20292030: {
    vision: [
      'THE global platform for pedigreed cats',
      'Integrate all breeds worldwide',
      'AI-powered breeding program optimizer',
      'Genetic disease elimination through data',
      'Virtual reality cattery experiences',
      'Mainstream crypto adoption in pet industry',
      'Change how people find and buy cats forever'
    ]
  },
  
  moonshots: [
    'Cloning service partnership (controversial but possible)',
    'Genetic customization (color, pattern selection)',
    'Cat health insurance built-in',
    'Lifetime cat tracking & health monitoring',
    'AI virtual cat companions (for those who can\'t have real ones)',
    'Space program cats (first cat in space via our platform 😹)'
  ]
}
const TECH_STACK = {
  frontend: {
    web: {
      framework: 'React 18+ with Next.js 14',
      styling: 'Tailwind CSS + Styled Components',
      state: 'Redux Toolkit + React Query',
      forms: 'React Hook Form + Zod validation',
      routing: 'Next.js App Router',
      animations: 'Framer Motion',
      ui Library: 'Shadcn/ui + Custom components'
    },
    mobile: {
      framework: 'React Native / Flutter',
      navigation: 'React Navigation',
      state: 'Redux / Riverpod',
      storage: 'AsyncStorage / SQLite',
      push: 'Firebase Cloud Messaging'
    }
  },
  
  backend: {
    api: {
      framework: 'Node.js with Express / NestJS',
      alternative: 'Python with FastAPI',
      architecture: 'RESTful + GraphQL',
      documentation: 'Swagger/OpenAPI',
      validation: 'Joi / Zod',
      rateLimit: 'Express rate limit + Redis'
    },
    database: {
      primary: 'PostgreSQL 15+',
      caching: 'Redis',
      search: 'Elasticsearch / Algolia',
      fileStorage: 'AWS S3 / Google Cloud Storage',
      cdn: 'Cloudflare / CloudFront'
    },
    authentication: {
      strategy: 'JWT + Refresh tokens',
      oauth: 'Google, Facebook, Apple',
      mfa: 'TOTP (authenticator apps)',
      sessions: 'Redis-based session store'
    },
    realtime: {
      chat: 'Socket.io / WebSockets',
      notifications: 'Server-Sent Events',
      liveUpdates: 'Redis Pub/Sub'
    }
  },
  
  infrastructure: {
    hosting: {
      compute: 'AWS EC2 / ECS / Lambda',
      alternative: 'Google Cloud Run / App Engine',
      container: 'Docker + Kubernetes',
      orchestration: 'K8s with Helm charts'
    },
    ci cd: {
      pipeline: 'GitHub Actions / GitLab CI',
      testing: 'Jest, Cypress, Playwright',
      deployment: 'Blue-green deployments',
      monitoring: 'Automatic rollbacks on errors'
    },
    monitoring: {
      apm: 'New Relic / Datadog',
      errors: 'Sentry',
      logs: 'ELK Stack (Elasticsearch, Logstash, Kibana)',
      uptime: 'Pingdom / UptimeRobot',
      analytics: 'Mixpanel + Google Analytics 4'
    },
    security: {
      firewall: 'Cloudflare WAF',
      ddos: 'Cloudflare DDoS protection',
      scanning: 'Snyk for dependencies',
      secrets: 'AWS Secrets Manager / Vault',
      compliance: 'SOC 2 Type II (goal)'
    }
  },
  
  ai ml: {
    matching: {
      model: 'Collaborative filtering + content-based',
      framework: 'TensorFlow / PyTorch',
      training: 'Continuous learning from user interactions'
    },
    imageRecognition: {
      breed: 'Custom CNN trained on cat breeds',
      moderation: 'Pre-trained models + fine-tuning',
      quality: 'Image quality assessment'
    },
    nlp: {
      chatbot: 'GPT-4 API + fine-tuned prompts',
      sentiment: 'Analyze reviews and feedback',
      translation: 'Multi-language support'
    },
    recommendations: {
      cats: 'Hybrid recommendation system',
      products: 'Amazon Personalize style',
      breeders: 'Based on preferences + past behavior'
    }
  },
  
  thirdParty: {
    communications: {
      email: 'SendGrid',
      sms: 'Twilio',
      push: 'OneSignal / Firebase',
      videoCall: 'Twilio Video / Agora'
    },
    payments: {
      gateway: 'Stripe',
      local: 'Przelewy24',
      crypto: 'Coinbase Commerce',
      invoicing: 'Stripe Invoicing'
    },
    other: {
      maps: 'Google Maps API',
      translation: 'DeepL API',
      cdn: 'Cloudflare',
      analytics: 'Google Analytics 4 + Mixpanel',
      ab Testing: 'Optimizely / VWO'
    }
  },
  
  development: {
    versionControl: 'Git + GitHub',
    project Management: 'Jira / Linear',
    documentation: 'Notion / Confluence',
    design: 'Figma',
    api Testing: 'Postman / Insomnia',
    collaboration: 'Slack / Discord'
  }
}
// ====================================================================
// 🆕 DODAJ TO DO App.jsx (PO ISTNIEJĄCYCH FUNKCJACH, PRZED return)
// ====================================================================

  // ====================================================================
  // 1️⃣ FORMULARZ DODAWANIA KOTA (dla hodowców)
  // ====================================================================
  
  const handleAddNewCat = () => {
    if (!isBreeder) {
      showNotification('Musisz być zarejestrowanym hodowcą aby dodać kota', '⚠️')
      return
    }
    setShowAddCatForm(true)
  }

  const handleNewCatFormChange = (field, value) => {
    setNewCatForm({ ...newCatForm, [field]: value })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setNewCatForm({ ...newCatForm, images: [...newCatForm.images, ...imageUrls] })
  }

  const submitNewCat = () => {
    // Walidacja
    if (!newCatForm.name || !newCatForm.breed || !newCatForm.price) {
      showNotification('Wypełnij wszystkie wymagane pola!', '❌')
      return
    }

    const newCat = {
      id: Date.now(),
      name: newCatForm.name,
      breed: newCatForm.breed,
      gender: newCatForm.gender,
      age: newCatForm.age,
      color: newCatForm.color,
      price: parseInt(newCatForm.price),
      priceFormatted: `${parseInt(newCatForm.price).toLocaleString('pl-PL')} PLN`,
      img: newCatForm.images[0] || 'https://via.placeholder.com/800x600',
      description: newCatForm.description,
      breeder: breederProfile,
      pedigree: newCatForm.pedigree,
      health: newCatForm.health,
      personality: newCatForm.personality,
      availableForBreeding: newCatForm.availableForBreeding,
      readyToGo: newCatForm.readyToGo,
      status: 'available',
      featured: false,
      verified: false,
      isDemoData: false,
      stats: {
        views: 0,
        likes: 0,
        shares: 0,
        inquiries: 0
      }
    }

    setCats([newCat, ...cats])
    setShowAddCatForm(false)
    showNotification('✅ Kot został dodany!', '🎉')
    
    // Reset form
    setNewCatForm({
      name: '', breed: '', gender: '', age: '', color: '', price: '',
      description: '', images: [], pedigree: { fife: false, wcf: false, tica: false, generations: 0, champions: 0 },
      health: { vaccinated: false, microchipped: false, hcmTested: false, hcmResult: '', pkdTested: false, pkdResult: '', healthGuarantee: '30 dni' },
      personality: [], availableForBreeding: false, readyToGo: '', location: ''
    })
  }

  // ====================================================================
  // 2️⃣ SYSTEM PŁATNOŚCI (Stripe-like)
  // ====================================================================
  
  const handleBuyNow = (cat) => {
    setSelectedPaymentCat(cat)
    setPaymentAmount(cat.price)
    setShowPaymentModal(true)
    setPaymentStep(1)
  }

  const processPayment = () => {
    // Walidacja danych karty
    if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
      showNotification('Wypełnij wszystkie dane karty!', '❌')
      return
    }

    setPaymentStatus('processing')
    showNotification('Przetwarzanie płatności...', '💳')

    // Symulacja płatności
    setTimeout(() => {
      setPaymentStatus('success')
      
      const transaction = {
        id: `TXN-${Date.now()}`,
        catId: selectedPaymentCat.id,
        catName: selectedPaymentCat.name,
        amount: paymentAmount,
        date: new Date().toISOString(),
        status: 'completed',
        method: paymentMethod
      }
      
      setTransactionHistory([transaction, ...transactionHistory])
      showNotification('✅ Płatność zakończona sukcesem!', '🎉')
      
      // Wyślij potwierdzenie emailem (symulacja)
      setTimeout(() => {
        showNotification(`📧 Potwierdzenie wysłane na ${paymentData.email}`, '✅')
      }, 1000)

      setPaymentStep(3)
    }, 2000)
  }

  const closePaymentModal = () => {
    setShowPaymentModal(false)
    setPaymentStep(1)
    setPaymentStatus('pending')
    setPaymentData({
      cardNumber: '', cardName: '', expiryDate: '', cvv: '',
      email: '', phone: '', address: '', city: '', postalCode: ''
    })
  }

  // ====================================================================
  // 3️⃣ SUBSKRYPCJE (Premium dla hodowców)
  // ====================================================================
  
  const handleSubscribe = (planId) => {
    const plan = subscriptionPlans.find(p => p.id === planId)
    setSubscriptionPlan(planId)
    setShowSubscriptionModal(true)
    showNotification(`Wybrano plan: ${plan.name}`, '💎')
  }

  const confirmSubscription = () => {
    const plan = subscriptionPlans.find(p => p.id === subscriptionPlan)
    
    setSubscriptionStatus('active')
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)
    setSubscriptionEndDate(endDate)
    setSubscriptionFeatures(plan.features)
    
    showNotification(`✅ Aktywowano ${plan.name}!`, '🎉')
    setShowSubscriptionModal(false)
    
    // Jeśli nie jest hodowcą, ustaw jako hodowca
    if (!isBreeder) {
      setIsBreeder(true)
      setBreederProfile({
        id: `br-${Date.now()}`,
        name: '*MOJA HODOWLA',
        owner: 'Użytkownik',
        location: 'Polska',
        phone: '+48 000 000 000',
        email: 'kontakt@hodowla.pl',
        organization: 'FIFe - FPL',
        rating: 5.0,
        reviewsCount: 0,
        verified: planId !== 'basic',
        memberSince: new Date().getFullYear().toString(),
        totalSold: 0
      })
    }
  }

  const cancelSubscription = () => {
    if (window.confirm('Czy na pewno chcesz anulować subskrypcję?')) {
      setSubscriptionStatus('cancelled')
      setSubscriptionPlan(null)
      showNotification('Subskrypcja została anulowana', '💔')
    }
  }

  // ====================================================================
  // 4️⃣ KALENDARZ REZERWACJI
  // ====================================================================
  
  const handleBookVisit = (cat) => {
    setSelectedCat(cat)
    setShowCalendar(true)
  }

  const confirmAppointment = () => {
    if (!selectedDate || !selectedTime || !visitType) {
      showNotification('Wybierz datę, godzinę i typ wizyty!', '❌')
      return
    }

    const appointment = {
      id: Date.now(),
      catId: selectedCat.id,
      catName: selectedCat.name,
      breederName: selectedCat.breeder.name,
      date: selectedDate,
      time: selectedTime,
      type: visitType,
      status: 'confirmed'
    }

    setAppointments([appointment, ...appointments])
    showNotification('✅ Wizyta zarezerwowana!', '📅')
    setShowCalendar(false)
    setSelectedDate(null)
    setSelectedTime(null)
  }

  // ====================================================================
  // 5️⃣ MESSENGER (Chat 1:1 z hodowcą)
  // ====================================================================
  
  const sendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'user',
      timestamp: Date.now()
    }

    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage],
      lastMessage: messageInput,
      lastMessageTime: Date.now()
    }

    setConversations(conversations.map(conv => 
      conv.id === activeConversation.id ? updatedConversation : conv
    ))
    setActiveConversation(updatedConversation)
    setMessageInput('')

    // Symulacja odpowiedzi hodowcy
    setTimeout(() => {
      const breederReply = {
        id: Date.now(),
        text: 'Dziękuję za wiadomość! Odpowiem wkrótce.',
        sender: 'breeder',
        timestamp: Date.now()
      }
      
      const updatedConv = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, breederReply],
        lastMessage: breederReply.text,
        lastMessageTime: Date.now(),
        unread: updatedConv.unread + 1
      }
      
      setConversations(conversations.map(conv => 
        conv.id === activeConversation.id ? updatedConv : conv
      ))
      setActiveConversation(updatedConv)
      setUnreadMessages(unreadMessages + 1)
      showNotification(`💬 Nowa wiadomość od ${activeConversation.breederName}`, '💬')
    }, 2000)
  }

  // ====================================================================
  // 6️⃣ SYSTEM RECENZJI
  // ====================================================================
  
  const openReviewModal = (cat) => {
    setReviewForm({ ...reviewForm, catId: cat.id, breederId: cat.breeder.id })
    setShowReviewModal(true)
  }

  const submitReview = () => {
    if (!reviewForm.title || !reviewForm.comment) {
      showNotification('Wypełnij tytuł i treść recenzji!', '❌')
      return
    }

    const newReview = {
      id: Date.now(),
      ...reviewForm,
      author: 'Użytkownik',
      date: new Date().toISOString(),
      verified: true
    }

    setReviews([newReview, ...reviews])
    showNotification('✅ Recenzja dodana!', '⭐')
    setShowReviewModal(false)
    setReviewForm({ rating: 5, title: '', comment: '', catId: null, breederId: null, photos: [] })
  }

  // ====================================================================
  // 7️⃣ UMOWY ELEKTRONICZNE
  // ====================================================================
  
  const openContract = (cat) => {
    const contract = {
      id: `CONTRACT-${Date.now()}`,
      catId: cat.id,
      catName: cat.name,
      breederName: cat.breeder.name,
      buyerName: 'Kupujący',
      price: cat.price,
      date: new Date().toISOString(),
      terms: `
UMOWA SPRZEDAŻY KOTA RASOWEGO

§1 Przedmiot umowy
Hodowca ${cat.breeder.name} sprzedaje kota ${cat.name} rasy ${cat.breed}.

§2 Cena
Cena sprzedaży wynosi ${cat.priceFormatted}.

§3 Gwarancja zdrowia
Hodowca gwarantuje że kot jest zdrowy przez ${cat.health.healthGuarantee} od daty sprzedaży.

§4 Dokumenty
Kot posiada:
- Rodowód ${cat.pedigree.fife ? 'FIFe' : cat.pedigree.wcf ? 'WCF' : 'TICA'}
- Chip: ${cat.health.microchipped ? 'TAK' : 'NIE'}
- Szczepienia: ${cat.health.vaccinated ? 'TAK' : 'NIE'}

§5 Prawa hodowlane
${cat.availableForBreeding ? 'Kot sprzedawany Z prawami hodowlanymi' : 'Kot sprzedawany BEZ praw hodowlanych'}

§6 Postanowienia końcowe
Umowa została zawarta w dniu ${new Date().toLocaleDateString('pl-PL')}.
      `
    }
    
    setSelectedContract(contract)
    setShowContractModal(true)
  }

  const signContract = () => {
    if (!signatureData) {
      showNotification('Najpierw złóż podpis!', '❌')
      return
    }

    setContractSigned(true)
    showNotification('✅ Umowa podpisana elektronicznie!', '📜')
    
    // Zapisz umowę
    setTimeout(() => {
      showNotification('📧 Umowa wysłana na email', '✅')
      setShowContractModal(false)
    }, 1500)
  }

  // ====================================================================
  // 8️⃣ NEWSLETTER
  // ====================================================================
  
  const subscribeNewsletter = () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showNotification('Podaj prawidłowy adres email!', '❌')
      return
    }

    setNewsletterSubscribed(true)
    localStorage.setItem('newsletter_subscribed', 'true')
    showNotification('✅ Zapisano do newslettera!', '📧')
    setShowNewsletterPopup(false)
  }

  const closeNewsletterPopup = () => {
    setShowNewsletterPopup(false)
    localStorage.setItem('newsletter_closed', 'true')
  }

  // ====================================================================
  // 9️⃣ PANEL HODOWCY - Statystyki
  // ====================================================================
  
  const openBreederDashboard = () => {
    if (!isBreeder) {
      showNotification('Musisz być hodowcą!', '⚠️')
      return
    }

    // Oblicz statystyki
    const myCats = cats.filter(c => c.breeder?.id === breederProfile?.id)
    const totalViews = myCats.reduce((sum, cat) => sum + cat.stats.views, 0)
    const totalLikes = myCats.reduce((sum, cat) => sum + cat.stats.likes, 0)
    const totalRevenue = myCats.filter(c => c.status === 'sold').reduce((sum, cat) => sum + cat.price, 0)

    setBreederStats({
      totalCats: myCats.length,
      soldCats: myCats.filter(c => c.status === 'sold').length,
      revenue: totalRevenue,
      averageRating: breederProfile?.rating || 0,
      totalReviews: reviews.filter(r => r.breederId === breederProfile?.id).length,
      activeListings: myCats.filter(c => c.status === 'available').length,
      pendingOrders: 0,
      totalViews,
      totalLikes
    })

    setShowBreederDashboard(true)
  }

  // ====================================================================
  // 🔟 MAPA HODOWLI (Locations)
  // ====================================================================
  
  const openMap = () => {
    setShowMap(true)
    
    // Symulacja pobierania hodowli z mapy
    const breeders = cats.map(cat => ({
      id: cat.breeder.id,
      name: cat.breeder.name,
      location: cat.breeder.location,
      coords: { 
        lat: 52.2297 + (Math.random() - 0.5) * 2, 
        lng: 21.0122 + (Math.random() - 0.5) * 2 
      },
      catsCount: cats.filter(c => c.breeder.id === cat.breeder.id).length
    }))
    
    setNearbyBreeders(breeders)
  }

  // ====================================================================
  // 🎨 RENDER: FORMULARZ DODAWANIA KOTA
  // ====================================================================
  
  const renderAddCatForm = () => {
    if (!showAddCatForm) return null

    return (
      <div className="modal-overlay" onClick={() => setShowAddCatForm(false)}>
        <div className="add-cat-form-container" onClick={(e) => e.stopPropagation()}>
          <div className="form-header">
            <h2>➕ Dodaj nowego kota</h2>
            <button className="close-btn" onClick={() => setShowAddCatForm(false)}>✖️</button>
          </div>

          <div className="form-content">
            <div className="form-section">
              <h3>Podstawowe informacje</h3>
              <input
                type="text"
                placeholder="Imię kota *"
                value={newCatForm.name}
                onChange={(e) => handleNewCatFormChange('name', e.target.value)}
                className="form-input"
              />
              <select
                value={newCatForm.breed}
                onChange={(e) => handleNewCatFormChange('breed', e.target.value)}
                className="form-select"
              >
                <option value="">Wybierz rasę *</option>
                {breedsData.filter(b => b.id !== 'all').map(breed => (
                  <option key={breed.id} value={breed.name}>{breed.emoji} {breed.name}</option>
                ))}
              </select>
              <select
                value={newCatForm.gender}
                onChange={(e) => handleNewCatFormChange('gender', e.target.value)}
                className="form-select"
              >
                <option value="">Płeć *</option>
                <option value="Samiec">Samiec</option>
                <option value="Samica">Samica</option>
              </select>
              <input
                type="text"
                placeholder="Wiek (np. 3 miesiące) *"
                value={newCatForm.age}
                onChange={(e) => handleNewCatFormChange('age', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Kolor umaszczenia *"
                value={newCatForm.color}
                onChange={(e) => handleNewCatFormChange('color', e.target.value)}
                className="form-input"
              />
              <input
                type="number"
                placeholder="Cena (PLN) *"
                value={newCatForm.price}
                onChange={(e) => handleNewCatFormChange('price', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-section">
              <h3>Opis</h3>
              <textarea
                placeholder="Opisz swojego kota..."
                value={newCatForm.description}
                onChange={(e) => handleNewCatFormChange('description', e.target.value)}
                className="form-textarea"
                rows="4"
              />
            </div>

            <div className="form-section">
              <h3>Zdjęcia</h3>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="form-file"
              />
              <div className="image-preview">
                {newCatForm.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`Preview ${idx}`} className="preview-img" />
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>Rodowód</h3>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newCatForm.pedigree.fife}
                  onChange={(e) => handleNewCatFormChange('pedigree', { ...newCatForm.pedigree, fife: e.target.checked })}
                />
                FIFe
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newCatForm.pedigree.wcf}
                  onChange={(e) => handleNewCatFormChange('pedigree', { ...newCatForm.pedigree, wcf: e.target.checked })}
                />
                WCF
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newCatForm.pedigree.tica}
                  onChange={(e) => handleNewCatFormChange('pedigree', { ...newCatForm.pedigree, tica: e.target.checked })}
                />
                TICA
              </label>
            </div>

            <div className="form-section">
              <h3>Zdrowie</h3>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newCatForm.health.vaccinated}
                  onChange={(e) => handleNewCatFormChange('health', { ...newCatForm.health, vaccinated: e.target.checked })}
                />
                Szczepiony
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newCatForm.health.microchipped}
                  onChange={(e) => handleNewCatFormChange('health', { ...newCatForm.health, microchipped: e.target.checked })}
                />
                Chip
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={newCatForm.health.hcmTested}
                  onChange={(e) => handleNewCatFormChange('health', { ...newCatForm.health, hcmTested: e.target.checked })}
                />
                Test HCM
              </label>
            </div>

            <button className="submit-btn" onClick={submitNewCat}>
              ✅ Dodaj kota
            </button>
          </div>
        </div>
      </div>
    )
  }
    // ====================================================================
  // 🎨 RENDER: MODAL PŁATNOŚCI
  // ====================================================================
  
  const renderPaymentModal = () => {
    if (!showPaymentModal || !selectedPaymentCat) return null

    return (
      <div className="modal-overlay" onClick={closePaymentModal}>
        <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
          <div className="payment-header">
            <h2>💳 Płatność</h2>
            <button className="close-btn" onClick={closePaymentModal}>✖️</button>
          </div>

          {/* KROK 1: Wybór metody */}
          {paymentStep === 1 && (
            <div className="payment-step">
              <div className="payment-summary">
                <img src={selectedPaymentCat.img} alt={selectedPaymentCat.name} className="payment-cat-img" />
                <div className="payment-cat-info">
                  <h3>{selectedPaymentCat.name}</h3>
                  <p>{selectedPaymentCat.breed}</p>
                  <p className="payment-amount">{selectedPaymentCat.priceFormatted}</p>
                </div>
              </div>

              <h3>Wybierz metodę płatności</h3>
              <div className="payment-methods">
                <div 
                  className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span className="method-icon">💳</span>
                  <span>Karta płatnicza</span>
                </div>
                <div 
                  className={`payment-method ${paymentMethod === 'blik' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('blik')}
                >
                  <span className="method-icon">📱</span>
                  <span>BLIK</span>
                </div>
                <div 
                  className={`payment-method ${paymentMethod === 'transfer' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('transfer')}
                >
                  <span className="method-icon">🏦</span>
                  <span>Przelew</span>
                </div>
                <div 
                  className={`payment-method ${paymentMethod === 'apple' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('apple')}
                >
                  <span className="method-icon">🍎</span>
                  <span>Apple Pay</span>
                </div>
              </div>

              <button className="payment-next-btn" onClick={() => setPaymentStep(2)}>
                Dalej →
              </button>
            </div>
          )}

          {/* KROK 2: Dane płatności */}
          {paymentStep === 2 && (
            <div className="payment-step">
              <h3>Dane płatności</h3>
              
              {paymentMethod === 'card' && (
                <div className="payment-form">
                  <input
                    type="text"
                    placeholder="Numer karty"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                    className="payment-input"
                    maxLength="19"
                  />
                  <input
                    type="text"
                    placeholder="Imię i nazwisko"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                    className="payment-input"
                  />
                  <div className="payment-row">
                    <input
                      type="text"
                      placeholder="MM/RR"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                      className="payment-input half"
                      maxLength="5"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                      className="payment-input half"
                      maxLength="3"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'blik' && (
                <div className="payment-form">
                  <input
                    type="text"
                    placeholder="Kod BLIK"
                    className="payment-input blik-code"
                    maxLength="6"
                  />
                  <p className="payment-hint">Wpisz 6-cyfrowy kod z aplikacji bankowej</p>
                </div>
              )}

              <h3>Dane kontaktowe</h3>
              <div className="payment-form">
                <input
                  type="email"
                  placeholder="Email"
                  value={paymentData.email}
                  onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                  className="payment-input"
                />
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={paymentData.phone}
                  onChange={(e) => setPaymentData({ ...paymentData, phone: e.target.value })}
                  className="payment-input"
                />
                <input
                  type="text"
                  placeholder="Adres dostawy"
                  value={paymentData.address}
                  onChange={(e) => setPaymentData({ ...paymentData, address: e.target.value })}
                  className="payment-input"
                />
                <div className="payment-row">
                  <input
                    type="text"
                    placeholder="Miasto"
                    value={paymentData.city}
                    onChange={(e) => setPaymentData({ ...paymentData, city: e.target.value })}
                    className="payment-input half"
                  />
                  <input
                    type="text"
                    placeholder="Kod pocztowy"
                    value={paymentData.postalCode}
                    onChange={(e) => setPaymentData({ ...paymentData, postalCode: e.target.value })}
                    className="payment-input half"
                  />
                </div>
              </div>

              <div className="payment-actions">
                <button className="payment-back-btn" onClick={() => setPaymentStep(1)}>
                  ← Wstecz
                </button>
                <button className="payment-pay-btn" onClick={processPayment}>
                  Zapłać {selectedPaymentCat.priceFormatted}
                </button>
              </div>
            </div>
          )}

          {/* KROK 3: Potwierdzenie */}
          {paymentStep === 3 && paymentStatus === 'success' && (
            <div className="payment-step success">
              <div className="success-icon">✅</div>
              <h2>Płatność zakończona!</h2>
              <p>Dziękujemy za zakup</p>
              <div className="success-details">
                <p><strong>{selectedPaymentCat.name}</strong></p>
                <p>{selectedPaymentCat.priceFormatted}</p>
                <p>ID transakcji: TXN-{Date.now()}</p>
              </div>
              <button className="payment-close-btn" onClick={closePaymentModal}>
                Zamknij
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ====================================================================
  // 🎨 RENDER: MODAL SUBSKRYPCJI
  // ====================================================================
  
  const renderSubscriptionModal = () => {
    if (!showSubscriptionModal) return null

    return (
      <div className="modal-overlay" onClick={() => setShowSubscriptionModal(false)}>
        <div className="subscription-modal" onClick={(e) => e.stopPropagation()}>
          <div className="subscription-header">
            <h2>💎 Plany subskrypcji</h2>
            <button className="close-btn" onClick={() => setShowSubscriptionModal(false)}>✖️</button>
          </div>

          <div className="subscription-plans">
            {subscriptionPlans.map(plan => (
              <div 
                key={plan.id} 
                className={`subscription-plan ${plan.recommended ? 'recommended' : ''} ${subscriptionPlan === plan.id ? 'selected' : ''}`}
                onClick={() => setSubscriptionPlan(plan.id)}
              >
                {plan.recommended && <div className="recommended-badge">Polecane</div>}
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price} PLN</span>
                  <span className="period">/ {plan.period}</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button 
                  className="plan-select-btn"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  Wybierz plan
                </button>
              </div>
            ))}
          </div>

          {subscriptionPlan && (
            <div className="subscription-confirm">
              <button className="confirm-subscription-btn" onClick={confirmSubscription}>
                Potwierdź subskrypcję
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ====================================================================
  // 🎨 RENDER: KALENDARZ WIZYT
  // ====================================================================
  
  const renderCalendar = () => {
    if (!showCalendar) return null

    const dates = Array.from({ length: 14 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() + i + 1)
      return date
    })

    const timeSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00', '18:00'
    ]

    return (
      <div className="modal-overlay" onClick={() => setShowCalendar(false)}>
        <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
          <div className="calendar-header">
            <h2>📅 Zarezerwuj wizytę</h2>
            <button className="close-btn" onClick={() => setShowCalendar(false)}>✖️</button>
          </div>

          <div className="calendar-content">
            <div className="visit-types">
              <h3>Wybierz typ wizyty</h3>
              <div className="visit-types-grid">
                {visitTypes.map(type => (
                  <div
                    key={type.id}
                    className={`visit-type ${visitType === type.id ? 'active' : ''}`}
                    onClick={() => setVisitType(type.id)}
                  >
                    <span className="visit-icon">{type.icon}</span>
                    <h4>{type.name}</h4>
                    <p>{type.description}</p>
                    <div className="visit-meta">
                      <span>⏱️ {type.duration}</span>
                      {type.price > 0 && <span>💰 {type.price} PLN</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="date-selection">
              <h3>Wybierz datę</h3>
              <div className="dates-grid">
                {dates.map(date => (
                  <div
                    key={date.toISOString()}
                    className={`date-item ${selectedDate?.toDateString() === date.toDateString() ? 'active' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <span className="day">{date.toLocaleDateString('pl-PL', { weekday: 'short' })}</span>
                    <span className="date">{date.getDate()}</span>
                    <span className="month">{date.toLocaleDateString('pl-PL', { month: 'short' })}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="time-selection">
                <h3>Wybierz godzinę</h3>
                <div className="time-slots">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      className={`time-slot ${selectedTime === time ? 'active' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedTime && visitType && (
              <div className="appointment-summary">
                <h3>Podsumowanie</h3>
                <div className="summary-details">
                  <p><strong>Kot:</strong> {selectedCat?.name}</p>
                  <p><strong>Typ wizyty:</strong> {visitTypes.find(t => t.id === visitType)?.name}</p>
                  <p><strong>Data:</strong> {selectedDate.toLocaleDateString('pl-PL')}</p>
                  <p><strong>Godzina:</strong> {selectedTime}</p>
                </div>
                <button className="confirm-appointment-btn" onClick={confirmAppointment}>
                  Potwierdź rezerwację
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ====================================================================
  // 🎨 RENDER: MESSENGER
  // ====================================================================
  
  const renderMessenger = () => {
    if (!showMessenger) return null

    return (
      <div className="messenger-container">
        <div className="messenger-header">
          <h3>💬 Wiadomości</h3>
          <button className="close-btn" onClick={() => setShowMessenger(false)}>✖️</button>
        </div>

        <div className="messenger-content">
          <div className="conversations-list">
            {conversations.length === 0 ? (
              <div className="no-conversations">
                <p>Brak konwersacji</p>
              </div>
            ) : (
              conversations.map(conv => (
                <div
                  key={conv.id}
                  className={`conversation-item ${activeConversation?.id === conv.id ? 'active' : ''}`}
                  onClick={() => setActiveConversation(conv)}
                >
                  <div className="conv-avatar">{conv.breederAvatar}</div>
                  <div className="conv-info">
                    <h4>{conv.breederName}</h4>
                    <p>{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="unread-badge">{conv.unread}</span>
                  )}
                </div>
              ))
            )}
          </div>

          {activeConversation && (
            <div className="chat-window">
              <div className="chat-header">
                <h4>{activeConversation.breederName}</h4>
              </div>

              <div className="messages-list">
                {activeConversation.messages.length === 0 ? (
                  <div className="no-messages">
                    <p>Rozpocznij konwersację</p>
                  </div>
                ) : (
                  activeConversation.messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                      <div className="message-bubble">
                        <p>{msg.text}</p>
                        <span className="message-time">
                          {new Date(msg.timestamp).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="message-input-container">
                <input
                  type="text"
                  placeholder="Napisz wiadomość..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') sendMessage()
                  }}
                  className="message-input"
                />
                <button className="send-btn" onClick={sendMessage}>
                  ➤
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ====================================================================
  // 🎨 RENDER: PANEL HODOWCY (Dashboard)
  // ====================================================================
  
  const renderBreederDashboard = () => {
    if (!showBreederDashboard) return null

    return (
      <div className="modal-overlay" onClick={() => setShowBreederDashboard(false)}>
        <div className="breeder-dashboard" onClick={(e) => e.stopPropagation()}>
          <div className="dashboard-header">
            <h2>📊 Panel Hodowcy</h2>
            <button className="close-btn" onClick={() => setShowBreederDashboard(false)}>✖️</button>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat">
                <span className="stat-icon">🐱</span>
                <span className="stat-value">{breederStats.totalCats}</span>
                <span className="stat-label">Wszystkich kotów</span>
              </div>
              <div className="dashboard-stat">
                <span className="stat-icon">✅</span>
                <span className="stat-value">{breederStats.soldCats}</span>
                <span className="stat-label">Sprzedanych</span>
              </div>
              <div className="dashboard-stat">
                <span className="stat-icon">💰</span>
                <span className="stat-value">{breederStats.revenue.toLocaleString('pl-PL')} PLN</span>
                <span className="stat-label">Przychód</span>
              </div>
              <div className="dashboard-stat">
                <span className="stat-icon">⭐</span>
                <span className="stat-value">{breederStats.averageRating}</span>
                <span className="stat-label">Średnia ocena</span>
              </div>
              <div className="dashboard-stat">
                <span className="stat-icon">👁️</span>
                <span className="stat-value">{breederStats.totalViews}</span>
                <span className="stat-label">Wyświetleń</span>
              </div>
              <div className="dashboard-stat">
                <span className="stat-icon">❤️</span>
                <span className="stat-value">{breederStats.totalLikes}</span>
                <span className="stat-label">Polubień</span>
              </div>
            </div>

            <div className="dashboard-actions">
              <button className="dashboard-action-btn" onClick={handleAddNewCat}>
                ➕ Dodaj nowego kota
              </button>
              <button className="dashboard-action-btn" onClick={() => setShowSubscriptionModal(true)}>
                💎 Zarządzaj subskrypcją
              </button>
              <button className="dashboard-action-btn">
                📧 Newsletter do klientów
              </button>
            </div>

            {subscriptionStatus === 'active' && (
              <div className="subscription-info">
                <h3>Aktywna subskrypcja</h3>
                <p>Plan: {subscriptionPlans.find(p => p.id === subscriptionPlan)?.name}</p>
                <p>Odnawia się: {subscriptionEndDate?.toLocaleDateString('pl-PL')}</p>
                <button className="cancel-subscription-btn" onClick={cancelSubscription}>
                  Anuluj subskrypcję
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ====================================================================
  // 🎨 RENDER: MODAL RECENZJI
  // ====================================================================
  
  const renderReviewModal = () => {
    if (!showReviewModal) return null

    return (
      <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
        <div className="review-modal" onClick={(e) => e.stopPropagation()}>
          <div className="review-header">
            <h2>⭐ Dodaj recenzję</h2>
            <button className="close-btn" onClick={() => setShowReviewModal(false)}>✖️</button>
          </div>

          <div className="review-content">
            <div className="rating-input">
              <label>Ocena:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`star ${reviewForm.rating >= star ? 'active' : ''}`}
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Tytuł recenzji"
              value={reviewForm.title}
              onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
              className="review-input"
            />

            <textarea
              placeholder="Napisz swoją recenzję..."
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              className="review-textarea"
              rows="6"
            />

            <button className="submit-review-btn" onClick={submitReview}>
              Wyślij recenzję
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ====================================================================
  // 🎨 RENDER: MODAL UMOWY
  // ====================================================================
  
  const renderContractModal = () => {
    if (!showContractModal || !selectedContract) return null

    return (
      <div className="modal-overlay" onClick={() => setShowContractModal(false)}>
        <div className="contract-modal" onClick={(e) => e.stopPropagation()}>
          <div className="contract-header">
            <h2>📜 Umowa sprzedaży</h2>
            <button className="close-btn" onClick={() => setShowContractModal(false)}>✖️</button>
          </div>

          <div className="contract-content">
            <div className="contract-text">
              <pre>{selectedContract.terms}</pre>
            </div>

            {!contractSigned && (
              <div className="signature-section">
                <h3>Podpis elektroniczny</h3>
                <input
                  type="text"
                  placeholder="Wpisz swoje imię i nazwisko"
                  onChange={(e) => setSignatureData(e.target.value)}
                  className="signature-input"
                />
                <button className="sign-btn" onClick={signContract}>
                  ✍️ Podpisz umowę
                </button>
              </div>
            )}

            {contractSigned && (
              <div className="contract-signed">
                <div className="signed-icon">✅</div>
                <h3>Umowa podpisana!</h3>
                <p>Kopia została wysłana na Twój email</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ====================================================================
  // 🎨 RENDER: NEWSLETTER POPUP
  // ====================================================================
  
  const renderNewsletterPopup = () => {
    if (!showNewsletterPopup) return null

    return (
      <div className="newsletter-popup">
        <button className="newsletter-close" onClick={closeNewsletterPopup}>✖️</button>
        <div className="newsletter-content">
          <h3>📧 Zapisz się do newslettera</h3>
          <p>Bądź na bieżąco z nowymi kotami!</p>
          <input
            type="email"
            placeholder="Twój email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="newsletter-input"
          />
          <button className="newsletter-btn" onClick={subscribeNewsletter}>
            Zapisz się
          </button>
        </div>
      </div>
    )
  }

  // ====================================================================
  // 🎨 RENDER: MAPA HODOWLI
  // ====================================================================
  
  const renderMap = () => {
    if (!showMap) return null

    return (
      <div className="modal-overlay" onClick={() => setShowMap(false)}>
        <div className="map-modal" onClick={(e) => e.stopPropagation()}>
          <div className="map-header">
            <h2>🗺️ Hodowle w Polsce</h2>
            <button className="close-btn" onClick={() => setShowMap(false)}>✖️</button>
          </div>

          <div className="map-container">
            <div className="map-placeholder">
              <p>🗺️ Mapa hodowli</p>
              <p className="map-hint">Symulacja mapy - w pełnej wersji integracja z Google Maps</p>
            </div>

            <div className="breeders-list">
              <h3>Hodowle w okolicy</h3>
              {nearbyBreeders.map(breeder => (
                <div key={breeder.id} className="breeder-item">
                  <h4>{breeder.name}</h4>
                  <p>📍 {breeder.location}</p>
                  <p>🐱 {breeder.catsCount} kotów</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
    // ====================================================================
  // 🎨 DODAJ DO GŁÓWNEGO RETURN (przed </div> zamykającym App)
  // ====================================================================

  // W sekcji header-actions dodaj nowe przyciski:
  
  // Znajdź to w kodzie:
  // <div className="header-actions">
  //   <button className="header-icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
  //     🔔 {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
  //   </button>
  
  // I DODAJ PO TYM:
  
  <button 
    className="header-icon-btn"
    onClick={() => setShowMessenger(!showMessenger)}
  >
    💬 {unreadMessages > 0 && <span className="notif-badge">{unreadMessages}</span>}
  </button>

  {isBreeder && (
    <button 
      className="header-icon-btn breeder-btn"
      onClick={openBreederDashboard}
    >
      📊 Panel
    </button>
  )}

  {!isBreeder && (
    <button 
      className="header-icon-btn premium-btn"
      onClick={() => setShowSubscriptionModal(true)}
    >
      💎 Premium
    </button>
  )}

  // ====================================================================
  // W sekcji cat-card dodaj przycisk "Kup teraz" i inne akcje
  // ====================================================================
  
  // Znajdź w kodzie renderHome():
  // <div className="card-actions">
  //   <button className="action-btn secondary" onClick={(e) => { ... }}>
  //     🔗 Udostępnij
  //   </button>
  //   <button className="action-btn primary" onClick={(e) => { ... }}>
  //     💬 Kontakt
  //   </button>
  // </div>
  
  // ZASTĄP TO:
  
  <div className="card-actions">
    <button 
      className="action-btn buy-now"
      onClick={(e) => {
        e.stopPropagation()
        handleBuyNow(cat)
      }}
    >
      💳 Kup teraz
    </button>
    <button 
      className="action-btn secondary"
      onClick={(e) => {
        e.stopPropagation()
        handleBookVisit(cat)
      }}
    >
      📅 Umów wizytę
    </button>
    <button 
      className="action-btn secondary"
      onClick={(e) => {
        e.stopPropagation()
        handleContactBreeder(cat.breeder)
      }}
    >
      💬 Napisz
    </button>
  </div>

  // Po card-actions dodaj:
  <div className="card-extra-actions">
    <button 
      className="extra-action-btn"
      onClick={(e) => {
        e.stopPropagation()
        openContract(cat)
      }}
    >
      📜 Umowa
    </button>
    <button 
      className="extra-action-btn"
      onClick={(e) => {
        e.stopPropagation()
        openReviewModal(cat)
      }}
    >
      ⭐ Recenzja
    </button>
  </div>

  // ====================================================================
  // W sekcji hero-main dodaj przycisk "Zostań hodowcą" i "Mapa"
  // ====================================================================
  
  // Znajdź <div className="hero-stats"> i PRZED NIM dodaj:
  
  <div className="hero-cta">
    {!isBreeder && (
      <button 
        className="cta-btn primary"
        onClick={() => setShowSubscriptionModal(true)}
      >
        🌟 Zostań hodowcą
      </button>
    )}
    {isBreeder && (
      <button 
        className="cta-btn primary"
        onClick={handleAddNewCat}
      >
        ➕ Dodaj kota
      </button>
    )}
    <button 
      className="cta-btn secondary"
      onClick={openMap}
    >
      🗺️ Mapa hodowli
    </button>
  </div>

  // ====================================================================
  // NA KOŃCU return(), PRZED zamykającym </div>, DODAJ WSZYSTKIE RENDERY:
  // ====================================================================
  
  return (
    <div className="App">
      {/* ... existing header ... */}
      
      {/* ... existing content ... */}
      
      {/* 🆕 NOWE MODAŁY I KOMPONENTY */}
      {renderAddCatForm()}
      {renderPaymentModal()}
      {renderSubscriptionModal()}
      {renderCalendar()}
      {renderMessenger()}
      {renderBreederDashboard()}
      {renderReviewModal()}
      {renderContractModal()}
      {renderNewsletterPopup()}
      {renderMap()}
      
      {/* ... existing footer ... */}
    </div>
  )
}

export default App

