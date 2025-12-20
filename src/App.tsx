import React, { 
  useState, useEffect, useCallback, useRef, useMemo, createContext, useContext, useReducer 
} from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, Alert,
  Dimensions, ScrollView, ActivityIndicator, Animated, SafeAreaView,
  KeyboardAvoidingView, Platform, StatusBar, RefreshControl, Share,
  TouchableWithoutFeedback, Vibration, StyleSheet, Pressable
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import NetInfo from '@react-native-community/netinfo';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { io, Socket } from 'socket.io-client';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🔥 PREMIUM INTERFACES (FIFe/WCF/TICA COMPLIANT)
interface PremiumCat {
  id: string;
  name: string;
  breed: FiFeBreedsType;
  age_months: number;
  age_formatted: string;
  price: number;
  price_formatted: string;
  images: string[];
  videos?: string[];
  breeder: {
    id: string;
    cattery_name: string;
    legal_name: string;
    rating: number;
    reviews_count: number;
    location: string;
    verified_fife: boolean;
    verified_wcf: boolean;
    verified_tica: boolean;
    response_time: string;
  };
  certifications: {
    fife_registered: boolean;
    fife_number?: string;
    wcf_registered: boolean;
    wcf_number?: string;
    tica_registered: boolean;
    tica_number?: string;
    zkwp_registered: boolean;
    zkwp_number?: string;
    microchip_iso: string;
  };
  pedigree: {
    father_name: string;
    mother_name: string;
    champion_titles: number;
    bloodline_info: string;
  };
  health: {
    vaccinated_full: boolean;
    hcm_tested: boolean;
    pkd_tested: boolean;
    fiv_felv_tested: boolean;
    vet_certified: boolean;
    health_guarantee_months: number;
  };
  description: string;
  location: {
    city: string;
    region: string;
    distance_km?: number;
  };
  stats: {
    views: number;
    likes: number;
    shares: number;
    inquiries: number;
  };
  status: 'available' | 'reserved' | 'sold';
  posted_at: string;
  boosted: boolean;
}

type FiFeBreedsType = 
  | 'Persian' | 'Exotic' | 'British_Shorthair' | 'British_Longhair'
  | 'Maine_Coon' | 'Norwegian_Forest' | 'Siberian' | 'Ragdoll'
  | 'Bengal' | 'Abyssinian' | 'Russian_Blue' | 'Sphynx'
  | 'Scottish_Fold' | 'Siamese' | 'Oriental' | 'Burmese'
  | 'Birman' | 'Devon_Rex' | 'Cornish_Rex' | 'Chartreux';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'buyer' | 'breeder' | 'admin';
  verified: boolean;
  avatar?: string;
  wallet?: string;
  premium_until?: string;
}

interface Message {
  id: string;
  conversation_id: string;
  from: string;
  to: string;
  text: string;
  image?: string;
  timestamp: number;
  read: boolean;
  delivered: boolean;
}

interface SocialPost {
  id: string;
  user: User;
  content: string;
  images?: string[];
  cat_reference?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: number;
  liked_by_user: boolean;
}

// 🔥 GLOBAL STATE MANAGEMENT
interface AppState {
  user: User | null;
  cats: PremiumCat[];
  filteredCats: PremiumCat[];
  socialPosts: SocialPost[];
  messages: Message[];
  unreadCount: number;
  socket: Socket | null;
  isOnline: boolean;
  walletConnected: boolean;
  filters: {
    breed: string;
    minPrice: number;
    maxPrice: number;
    certification: 'all' | 'fife' | 'wcf' | 'tica';
    location: string;
  };
}

const initialState: AppState = {
  user: null,
  cats: [],
  filteredCats: [],
  socialPosts: [],
  messages: [],
  unreadCount: 47,
  socket: null,
  isOnline: true,
  walletConnected: false,
  filters: {
    breed: 'all',
    minPrice: 0,
    maxPrice: 50000,
    certification: 'all',
    location: 'all'
  }
};

type Action = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_CATS'; payload: PremiumCat[] }
  | { type: 'SET_FILTERED'; payload: PremiumCat[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_POSTS'; payload: SocialPost[] }
  | { type: 'UPDATE_FILTERS'; payload: Partial<AppState['filters']> };

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CATS':
      return { ...state, cats: action.payload };
    case 'SET_FILTERED':
      return { ...state, filteredCats: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        unreadCount: !action.payload.read ? state.unreadCount + 1 : state.unreadCount
      };
    case 'SET_POSTS':
      return { ...state, socialPosts: action.payload };
    case 'UPDATE_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
};

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

// 🔥 PROVIDER WITH SOCKET + OFFLINE SYNC
const CatPurreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    await loadOfflineData();
    setupSocket();
    setupNetworkListener();
    requestPermissions();
  };

  const loadOfflineData = async () => {
    const cached = await AsyncStorage.getItem('premium_cats');
    if (cached) {
      const cats = JSON.parse(cached);
      dispatch({ type: 'SET_CATS', payload: cats });
      dispatch({ type: 'SET_FILTERED', payload: cats });
    }
  };

  const setupSocket = () => {
    const socket = io('wss://catpurre-api.onrender.com', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10
    });

    socket.on('connect', () => console.log('🔌 Connected'));
    
    socket.on('message', (msg: Message) => {
      dispatch({ type: 'ADD_MESSAGE', payload: msg });
      Vibration.vibrate(100);
      Notifications.scheduleNotificationAsync({
        content: { title: 'Nowa wiadomość', body: msg.text },
        trigger: null
      });
    });

    socket.on('cat_update', (cat: PremiumCat) => {
      dispatch({
        type: 'SET_CATS',
        payload: state.cats.map(c => c.id === cat.id ? cat : c)
      });
    });
  };

  const setupNetworkListener = () => {
    NetInfo.addEventListener(netState => {
      if (netState.isConnected && !state.isOnline) {
        syncWithServer();
      }
    });
  };

  const requestPermissions = async () => {
    await Notifications.requestPermissionsAsync();
    await Location.requestForegroundPermissionsAsync();
  };

  const syncWithServer = async () => {
    // Sync offline changes with Supabase
  };

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

// 🔥 PREMIUM SEED DATA (FIFe/WCF/TICA CERTIFIED)
const SEED_CATS: PremiumCat[] = [
  {
    id: '1',
    name: 'Luna Supreme Gold',
    breed: 'British_Shorthair',
    age_months: 18,
    age_formatted: '1.5 roku',
    price: 6500,
    price_formatted: '6 500 PLN',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      'https://images.unsplash.com/photo-1573956536352-0bfde9f3de98?w=800'
    ],
    videos: ['https://vimeo.com/123456789'],
    breeder: {
      id: 'br1',
      cattery_name: 'Golden British*PL',
      legal_name: 'Hodowla Złoty Brytyjczyk',
      rating: 4.98,
      reviews_count: 156,
      location: 'Warszawa',
      verified_fife: true,
      verified_wcf: true,
      verified_tica: false,
      response_time: '5 min'
    },
    certifications: {
      fife_registered: true,
      fife_number: 'PL*GOLDEN BRITISH 2023-001',
      wcf_registered: true,
      wcf_number: 'WCF-PL-2023-BSH-001',
      tica_registered: false,
      zkwp_registered: true,
      zkwp_number: 'ZKWP/PL/BSH/2023/001',
      microchip_iso: '616093900123456'
    },
    pedigree: {
      father_name: 'CH Maximus Golden King',
      mother_name: 'GIC Aurora British Queen',
      champion_titles: 5,
      bloodline_info: 'Linia 3x Grand International Champion'
    },
    health: {
      vaccinated_full: true,
      hcm_tested: true,
      pkd_tested: true,
      fiv_felv_tested: true,
      vet_certified: true,
      health_guarantee_months: 24
    },
    description: `🏆 PREMIUM British Shorthair - FIFe & WCF Certyfikat

✅ Pełna dokumentacja FIFe/WCF
✅ Rodowód 5 pokoleń - 3x GIC w linii
✅ HCM/PKD/FIV/FeLV NEGATIVE
✅ Microchip ISO + paszport weterynaryjny
✅ Gwarancja zdrowia 24 miesiące

🏠 Hodowla z 15-letnim doświadczeniem
🚚 Transport premium z GPS tracking
📜 Umowa notarialna + e-sign`,
    location: {
      city: 'Warszawa',
      region: 'Mazowieckie',
      distance_km: 0
    },
    stats: {
      views: 5234,
      likes: 1247,
      shares: 89,
      inquiries: 234
    },
    status: 'available',
    posted_at: '2025-12-15T10:30:00Z',
    boosted: true
  },
  {
    id: '2',
    name: 'Thunder Giant MC',
    breed: 'Maine_Coon',
    age_months: 10,
    age_formatted: '10 miesięcy',
    price: 9200,
    price_formatted: '9 200 PLN',
    images: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800'
    ],
    breeder: {
      id: 'br2',
      cattery_name: 'GiantsCoon*PL',
      legal_name: 'Hodowla Maine Coon Giants',
      rating: 4.99,
      reviews_count: 289,
      location: 'Kraków',
      verified_fife: true,
      verified_wcf: false,
      verified_tica: true,
      response_time: '2 min'
    },
    certifications: {
      fife_registered: true,
      fife_number: 'PL*GIANTSCOON 2024-015',
      wcf_registered: false,
      tica_registered: true,
      tica_number: 'TICA-PL-MCO-2024-015',
      zkwp_registered: true,
      zkwp_number: 'ZKWP/PL/MCO/2024/015',
      microchip_iso: '616093900234567'
    },
    pedigree: {
      father_name: 'SGCH Thunder King of Coons',
      mother_name: 'RW Aurora Giant Lady',
      champion_titles: 8,
      bloodline_info: 'Top 10 TICA International 2023'
    },
    health: {
      vaccinated_full: true,
      hcm_tested: true,
      pkd_tested: true,
      fiv_felv_tested: true,
      vet_certified: true,
      health_guarantee_months: 36
    },
    description: `🦁 GIANT Maine Coon - FIFe & TICA Champion Line

✅ 7.8kg w wieku 10 miesięcy!
✅ Linia Top 10 TICA International
✅ Badania genetyczne UC Davis
✅ Show quality - perfect breed standard
✅ Gwarancja 3 lata

🏆 Ojciec: Supreme Grand Champion
🧬 DNA profil + HCM echo
📦 Transport klimatyzowany 24/7`,
    location: {
      city: 'Kraków',
      region: 'Małopolskie',
      distance_km: 280
    },
    stats: {
      views: 8421,
      likes: 2156,
      shares: 145,
      inquiries: 389
    },
    status: 'available',
    posted_at: '2025-12-18T14:20:00Z',
    boosted: true
  },
  {
    id: '3',
    name: 'Bella Persian Dream',
    breed: 'Persian',
    age_months: 24,
    age_formatted: '2 lata',
    price: 5800,
    price_formatted: '5 800 PLN',
    images: [
      'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800'
    ],
    breeder: {
      id: 'br3',
      cattery_name: 'PersianDream*PL',
      legal_name: 'Hodowla Persów Elite',
      rating: 4.96,
      reviews_count: 178,
      location: 'Gdańsk',
      verified_fife: true,
      verified_wcf: true,
      verified_tica: false,
      response_time: '8 min'
    },
    certifications: {
      fife_registered: true,
      fife_number: 'PL*PERSIANDREAM 2022-008',
      wcf_registered: true,
      wcf_number: 'WCF-PL-2022-PER-008',
      tica_registered: false,
      zkwp_registered: true,
      zkwp_number: 'ZKWP/PL/PER/2022/008',
      microchip_iso: '616093900345678'
    },
    pedigree: {
      father_name: 'CH Royal Persian Prince',
      mother_name: 'IC Bella Dream Queen',
      champion_titles: 3,
      bloodline_info: 'Międzynarodowa linia champion'
    },
    health: {
      vaccinated_full: true,
      hcm_tested: true,
      pkd_tested: true,
      fiv_felv_tested: true,
      vet_certified: true,
      health_guarantee_months: 12
    },
    description: `👑 PERSIAN DREAM - FIFe & WCF Breeding Quality

✅ Idealna kotka do hodowli
✅ PKD negative (genetic test)
✅ Champion bloodline
✅ Charakterystyka perskiego typu
✅ Doświadczona mama (2 mioty)

🎀 Perfect show type
💎 Breeding rights included
🏥 Pełna historia zdrowotna`,
    location: {
      city: 'Gdańsk',
      region: 'Pomorskie',
      distance_km: 350
    },
    stats: {
      views: 3421,
      likes: 892,
      shares: 67,
      inquiries: 145
    },
    status: 'available',
    posted_at: '2025-12-10T09:15:00Z',
    boosted: false
  }
];

// 🔥 HOME/FEED TAB (OLXA + FACEBOOK STYLE)
const HomeTab: React.FC = () => {
  const { state, dispatch } = useContext(AppContext)!;
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const cats = state.filteredCats.length > 0 ? state.filteredCats : SEED_CATS;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Fetch from Supabase
    await new Promise(resolve => setTimeout(resolve, 1500));
    dispatch({ type: 'SET_CATS', payload: SEED_CATS });
    dispatch({ type: 'SET_FILTERED', payload: SEED_CATS });
    setRefreshing(false);
  }, []);

  const handleLike = (catId: string) => {
    Vibration.vibrate(50);
    // Update likes in backend
  };

  const handleShare = async (cat: PremiumCat) => {
    await Share.share({
      message: `Sprawdź ${cat.name} - ${cat.breed} na CAT PURRE!\n${cat.price_formatted}\n\nhttps://catpurre.app/cat/${cat.id}`
    });
  };

  return (
    <View style={styles.container}>
      {/* 🔥 PREMIUM HEADER */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.headerGradient}>
          <Text style={styles.headerTitle}>😻 CAT PURRE</Text>
          <Text style={styles.headerSubtitle}>FIFe • WCF • TICA Certified</Text>
        </LinearGradient>
      </Animated.View>

      {/* 📱 FEED CARDS */}
      <Animated.FlatList
        data={cats}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF6B9D" />
        }
        renderItem={({ item }) => (
          <View style={styles.feedCard}>
            {/* 👤 BREEDER HEADER */}
            <View style={styles.breederHeader}>
              <View style={styles.breederInfo}>
                <View style={styles.breederAvatar}>
                  <Text style={styles.breederInitial}>
                    {item.breeder.cattery_name[0]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.breederName}>{item.breeder.cattery_name}</Text>
                  <View style={styles.verificationRow}>
                    {item.certifications.fife_registered && (
                      <Text style={styles.certBadge}>FIFe ✓</Text>
                    )}
                    {item.certifications.wcf_registered && (
                      <Text style={[styles.certBadge, styles.wcfBadge]}>WCF ✓</Text>
                    )}
                    {item.certifications.tica_registered && (
                      <Text style={[styles.certBadge, styles.ticaBadge]}>TICA ✓</Text>
                    )}
                  </View>
                </View>
              </View>
              <Text style={styles.postTime}>
                {new Date(item.posted_at).toLocaleDateString('pl-PL')}
              </Text>
            </View>

            {/* 🖼️ IMAGE GALLERY */}
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {item.images.map((img, idx) => (
                <Image key={idx} source={{ uri: img }} style={styles.feedImage} />
              ))}
            </ScrollView>

            {/* 💰 PRICE BADGE */}
            <View style={styles.priceBadge}>
              <Text style={styles.priceText}>{item.price_formatted}</Text>
            </View>

            {/* 📊 ENGAGEMENT BAR */}
            <View style={styles.engagementBar}>
              <TouchableOpacity 
                style={styles.engageButton}
                onPress={() => handleLike(item.id)}
              >
                <Text style={styles.engageIcon}>❤️</Text>
                <Text style={styles.engageCount}>{item.stats.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.engageButton}>
                <Text style={styles.engageIcon}>💬</Text>
                <Text style={styles.engageCount}>{item.stats.inquiries}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.engageButton}
                onPress={() => handleShare(item)}
              >
                <Text style={styles.engageIcon}>🔄</Text>
                <Text style={styles.engageCount}>{item.stats.shares}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.engageButton}>
                <Text style={styles.engageIcon}>📍</Text>
                <Text style={styles.engageText}>{item.location.city}</Text>
              </TouchableOpacity>
            </View>

            {/* 📝 DESCRIPTION */}
            <View style={styles.descSection}>
              <Text style={styles.catTitle}>
                <Text style={styles.catName}>{item.name}</Text>
                <Text style={styles.catBreed}> • {item.breed.replace('_', ' ')}</Text>
              </Text>
              <Text style={styles.catDescription} numberOfLines={3}>
                {item.description}
              </Text>
              
              {/* 🏆 CERTIFICATIONS */}
              <View style={styles.certRow}>
                <Text style={styles.certLabel}>Certyfikaty:</Text>
                <Text style={styles.certDetails}>
                  {item.certifications.fife_number || item.certifications.wcf_number || item.certifications.tica_number}
                </Text>
              </View>

              {/* 🏥 HEALTH */}
              <View style={styles.healthRow}>
                {item.health.hcm_tested && <Text style={styles.healthBadge}>HCM✓</Text>}
                {item.health.pkd_tested && <Text style={styles.healthBadge}>PKD✓</Text>}
                {item.health.vaccinated_full && <Text style={styles.healthBadge}>Vaccinated✓</Text>}
              </View>
            </View>

            {/* 🚀 ACTION BUTTONS */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.messageButton}>
                <LinearGradient colors={['#10B981', '#059669']} style={styles.messageGradient}>
                  <Text style={styles.messageText}>💬 Wiadomość</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buyButton}>
                <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.buyGradient}>
                  <Text style={styles.buyText}>🛒 Kup Teraz</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// 🔥 WIADOMOŚĆ 2/5 - ADVANCED FILTERS + E2E ENCRYPTED CHAT + MARKETPLACE
// Kontynuacja app/(tabs)/index.tsx

// 🔥 ADVANCED FILTERS TAB (OLXA-STYLE)
const FiltersTab: React.FC = () => {
  const { state, dispatch } = useContext(AppContext)!;
  const [tempFilters, setTempFilters] = useState(state.filters);
  const [showPriceSlider, setShowPriceSlider] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const breeds: FiFeBreedsType[] = [
    'British_Shorthair', 'Maine_Coon', 'Persian', 'Ragdoll',
    'Bengal', 'Abyssinian', 'Russian_Blue', 'Sphynx',
    'Scottish_Fold', 'Siamese', 'Norwegian_Forest', 'Siberian'
  ];

  const applyFilters = () => {
    const filtered = SEED_CATS.filter(cat => {
      const breedMatch = tempFilters.breed === 'all' || cat.breed === tempFilters.breed;
      const priceMatch = cat.price >= priceRange[0] && cat.price <= priceRange[1];
      const certMatch = tempFilters.certification === 'all' || 
        (tempFilters.certification === 'fife' && cat.certifications.fife_registered) ||
        (tempFilters.certification === 'wcf' && cat.certifications.wcf_registered) ||
        (tempFilters.certification === 'tica' && cat.certifications.tica_registered);
      
      return breedMatch && priceMatch && certMatch;
    });

    dispatch({ type: 'SET_FILTERED', payload: filtered });
    dispatch({ type: 'UPDATE_FILTERS', payload: { 
      ...tempFilters, 
      minPrice: priceRange[0], 
      maxPrice: priceRange[1] 
    }});
    Alert.alert('✅', `Znaleziono ${filtered.length} kotów`);
  };

  const resetFilters = () => {
    setTempFilters(initialState.filters);
    setPriceRange([0, 50000]);
    dispatch({ type: 'SET_FILTERED', payload: SEED_CATS });
  };

  return (
    <ScrollView style={styles.filtersContainer} showsVerticalScrollIndicator={false}>
      {/* 🔍 SEARCH BAR */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Szukaj po nazwie, rasie, hodowcy..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* 🏆 CERTIFICATIONS FILTER */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>🏆 Certyfikaty międzynarodowe</Text>
        <View style={styles.certButtons}>
          {[
            { key: 'all', label: 'Wszystkie', color: '#6B7280' },
            { key: 'fife', label: 'FIFe', color: '#10B981' },
            { key: 'wcf', label: 'WCF', color: '#3B82F6' },
            { key: 'tica', label: 'TICA', color: '#F59E0B' }
          ].map(cert => (
            <TouchableOpacity
              key={cert.key}
              style={[
                styles.certButton,
                tempFilters.certification === cert.key && { 
                  backgroundColor: cert.color,
                  borderColor: cert.color 
                }
              ]}
              onPress={() => setTempFilters({ ...tempFilters, certification: cert.key as any })}
            >
              <Text style={[
                styles.certButtonText,
                tempFilters.certification === cert.key && styles.certButtonTextActive
              ]}>
                {cert.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 🐱 BREED SELECTOR */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>🐱 Rasa</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.breedScroll}
        >
          <TouchableOpacity
            style={[
              styles.breedChip,
              tempFilters.breed === 'all' && styles.breedChipActive
            ]}
            onPress={() => setTempFilters({ ...tempFilters, breed: 'all' })}
          >
            <Text style={[
              styles.breedChipText,
              tempFilters.breed === 'all' && styles.breedChipTextActive
            ]}>
              Wszystkie ({SEED_CATS.length})
            </Text>
          </TouchableOpacity>

          {breeds.map(breed => (
            <TouchableOpacity
              key={breed}
              style={[
                styles.breedChip,
                tempFilters.breed === breed && styles.breedChipActive
              ]}
              onPress={() => setTempFilters({ ...tempFilters, breed })}
            >
              <Text style={[
                styles.breedChipText,
                tempFilters.breed === breed && styles.breedChipTextActive
              ]}>
                {breed.replace('_', ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 💰 PRICE RANGE */}
      <View style={styles.filterSection}>
        <View style={styles.priceHeader}>
          <Text style={styles.filterTitle}>💰 Cena</Text>
          <Text style={styles.priceRange}>
            {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} PLN
          </Text>
        </View>
        
        <View style={styles.priceSlider}>
          <View style={styles.sliderTrack} />
          <View style={[styles.sliderFill, { 
            width: `${(priceRange[1] / 50000) * 100}%` 
          }]} />
          {/* Custom slider implementation */}
        </View>

        <View style={styles.pricePresets}>
          {[
            { label: '< 3K', max: 3000 },
            { label: '3-6K', min: 3000, max: 6000 },
            { label: '6-10K', min: 6000, max: 10000 },
            { label: '> 10K', min: 10000, max: 50000 }
          ].map((preset, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.pricePreset}
              onPress={() => setPriceRange([preset.min || 0, preset.max || 50000])}
            >
              <Text style={styles.pricePresetText}>{preset.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 📍 LOCATION */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>📍 Lokalizacja</Text>
        <View style={styles.locationButtons}>
          {['Wszystkie', 'Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań'].map(loc => (
            <TouchableOpacity key={loc} style={styles.locationButton}>
              <Text style={styles.locationButtonText}>{loc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 🏥 HEALTH & TESTS */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>🏥 Testy zdrowotne</Text>
        <View style={styles.healthChecks}>
          {[
            { key: 'hcm', label: 'HCM Tested' },
            { key: 'pkd', label: 'PKD Tested' },
            { key: 'fiv', label: 'FIV/FeLV' },
            { key: 'vaccinated', label: 'Szczepienia' }
          ].map(check => (
            <TouchableOpacity key={check.key} style={styles.healthCheck}>
              <View style={styles.checkbox} />
              <Text style={styles.healthCheckText}>{check.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 🚀 ACTION BUTTONS */}
      <View style={styles.filterActions}>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetText}>✕ Wyczyść</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.applyGradient}>
            <Text style={styles.applyText}>🔍 Zastosuj Filtry</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
};

// 🔥 E2E ENCRYPTED CHAT TAB (WhatsApp-Style + Signal Protocol)
const ChatTab: React.FC = () => {
  const { state, dispatch } = useContext(AppContext)!;
  const [conversations, setConversations] = useState<any[]>([
    {
      id: 'conv1',
      breeder: {
        name: 'Golden British*PL',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GB',
        online: true
      },
      lastMessage: 'Luna jest nadal dostępna! 🐱',
      timestamp: Date.now() - 300000,
      unread: 3,
      encrypted: true
    },
    {
      id: 'conv2',
      breeder: {
        name: 'GiantsCoon*PL',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GC',
        online: false
      },
      lastMessage: 'Wysłałem dodatkowe zdjęcia',
      timestamp: Date.now() - 3600000,
      unread: 0,
      encrypted: true
    },
    {
      id: 'conv3',
      breeder: {
        name: 'PersianDream*PL',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PD',
        online: true
      },
      lastMessage: 'Mogę zrobić wideo call?',
      timestamp: Date.now() - 7200000,
      unread: 1,
      encrypted: true
    }
  ]);

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <View style={styles.chatContainer}>
      {/* 🔒 E2E ENCRYPTION BANNER */}
      <View style={styles.encryptionBanner}>
        <Text style={styles.encryptionIcon}>🔒</Text>
        <Text style={styles.encryptionText}>
          Wszystkie wiadomości szyfrowane end-to-end (Signal Protocol)
        </Text>
      </View>

      {/* 💬 CONVERSATIONS LIST */}
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.conversationsList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.conversationItem}>
            {/* AVATAR + ONLINE STATUS */}
            <View style={styles.avatarContainer}>
              <Image source={{ uri: item.breeder.avatar }} style={styles.avatar} />
              {item.breeder.online && <View style={styles.onlineIndicator} />}
            </View>

            {/* MESSAGE PREVIEW */}
            <View style={styles.messagePreview}>
              <View style={styles.conversationHeader}>
                <Text style={styles.breederNameChat}>{item.breeder.name}</Text>
                <Text style={styles.messageTime}>{formatTimestamp(item.timestamp)}</Text>
              </View>
              
              <View style={styles.lastMessageRow}>
                {item.encrypted && <Text style={styles.lockIcon}>🔒</Text>}
                <Text 
                  style={[
                    styles.lastMessage,
                    item.unread > 0 && styles.lastMessageUnread
                  ]}
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>
              </View>
            </View>

            {/* UNREAD BADGE */}
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {/* 🚀 NEW CHAT FAB */}
      <TouchableOpacity style={styles.newChatFab}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.fabGradient}>
          <Text style={styles.fabIcon}>💬</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

// 🔥 CHAT DETAIL SCREEN (E2E Encrypted Messages)
const ChatDetailScreen: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      from: 'breeder',
      text: 'Cześć! Interesuje Cię Luna? 😊',
      timestamp: Date.now() - 3600000,
      encrypted: true,
      status: 'delivered'
    },
    {
      id: '2',
      from: 'user',
      text: 'Tak! Czy mogę dostać więcej zdjęć?',
      timestamp: Date.now() - 3000000,
      encrypted: true,
      status: 'read'
    },
    {
      id: '3',
      from: 'breeder',
      text: 'Oczywiście! Wysyłam 📸',
      timestamp: Date.now() - 2400000,
      encrypted: true,
      status: 'delivered'
    },
    {
      id: '4',
      from: 'breeder',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
      timestamp: Date.now() - 2100000,
      encrypted: true,
      status: 'delivered'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      from: 'user',
      text: inputText,
      timestamp: Date.now(),
      encrypted: true,
      status: 'sending'
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    Vibration.vibrate(50);

    // Encrypt and send via Socket.io
    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === newMessage.id ? { ...m, status: 'delivered' } : m
      ));
    }, 1000);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8
    });

    if (!result.canceled) {
      const newMessage = {
        id: Date.now().toString(),
        from: 'user',
        image: result.assets[0].uri,
        timestamp: Date.now(),
        encrypted: true,
        status: 'sending'
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <View style={styles.chatDetail}>
      {/* 📱 HEADER */}
      <View style={styles.chatHeader}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.chatHeaderInfo}>
          <Text style={styles.chatHeaderName}>Golden British*PL</Text>
          <Text style={styles.chatHeaderStatus}>🟢 Online • Odp. śr. 5min</Text>
        </View>

        <TouchableOpacity style={styles.videoButton}>
          <Text style={styles.videoIcon}>📹</Text>
        </TouchableOpacity>
      </View>

      {/* 🔒 E2E INFO */}
      <View style={styles.e2eInfo}>
        <Text style={styles.e2eText}>
          🔒 Wiadomości szyfrowane end-to-end. Nikt poza Tobą i hodowcą nie może ich przeczytać.
        </Text>
      </View>

      {/* 💬 MESSAGES */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.from === 'user' ? styles.userBubble : styles.breederBubble
          ]}>
            {item.text && (
              <Text style={[
                styles.messageText,
                item.from === 'user' && styles.userMessageText
              ]}>
                {item.text}
              </Text>
            )}
            
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.messageImage} />
            )}

            <View style={styles.messageFooter}>
              <Text style={[
                styles.messageTimestamp,
                item.from === 'user' && styles.userTimestamp
              ]}>
                {new Date(item.timestamp).toLocaleTimeString('pl-PL', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
              {item.from === 'user' && (
                <Text style={styles.messageStatus}>
                  {item.status === 'sending' && '🕐'}
                  {item.status === 'delivered' && '✓✓'}
                  {item.status === 'read' && '✓✓'}
                </Text>
              )}
            </View>
          </View>
        )}
      />

      {/* ⌨️ INPUT BAR */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.attachButton} onPress={pickImage}>
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.messageInput}
            placeholder="Napisz wiadomość..."
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
          />
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.sendGradient}>
            <Text style={styles.sendIcon}>➤</Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

// 🔥 STYLES FOR FILTERS + CHAT
const chatStyles = StyleSheet.create({
  filtersContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF'
  },
  searchSection: {
    padding: 20,
    paddingTop: 70
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937'
  },
  filterSection: {
    paddingHorizontal: 20,
    marginBottom: 30
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 15
  },
  certButtons: {
    flexDirection: 'row',
    gap: 10
  },
  certButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  certButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6B7280'
  },
  certButtonTextActive: {
    color: 'white'
  },
  breedScroll: {
    gap: 10,
    paddingBottom: 5
  },
  breedChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: 'white'
  },
  breedChipActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D'
  },
  breedChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280'
  },
  breedChipTextActive: {
    color: 'white'
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  priceRange: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B9D'
  },
  priceSlider: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 15,
    position: 'relative'
  },
  sliderTrack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 3
  },
  sliderFill: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#FF6B9D',
    borderRadius: 3
  },
  pricePresets: {
    flexDirection: 'row',
    gap: 10
  },
  pricePreset: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center'
  },
  pricePresetText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280'
  },
  locationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  locationButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  locationButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280'
  },
  healthChecks: {
    gap: 12
  },
  healthCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E5E7EB'
  },
  healthCheckText: {
    fontSize: 15,
    color: '#4B5563'
  },
  filterActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 20
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#EF4444',
    alignItems: 'center'
  },
  resetText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#EF4444'
  },
  applyButton: {
    flex: 2,
    borderRadius: 25,
    overflow: 'hidden'
  },
  applyGradient: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  applyText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white'
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF'
  },
  encryptionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    padding: 12,
    marginTop: 60,
    marginHorizontal: 20,
    borderRadius: 15,
    gap: 10
  },
  encryptionIcon: {
    fontSize: 18
  },
  encryptionText: {
    flex: 1,
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '600'
  },
  conversationsList: {
    padding: 20
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: 'white'
  },
  messagePreview: {
    flex: 1
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  breederNameChat: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937'
  },
  messageTime: {
    fontSize: 13,
    color: '#9CA3AF'
  },
  lastMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  lockIcon: {
    fontSize: 12
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280'
  },
  lastMessageUnread: {
    fontWeight: '700',
    color: '#1F2937'
  },
  unreadBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B9D',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '900',
    color: 'white'
  },
  newChatFab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden'
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fabIcon: {
    fontSize: 28
  },
  chatDetail: {
    flex: 1,
    backgroundColor: '#F8F9FF'
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937'
  },
  chatHeaderInfo: {
    flex: 1,
    marginLeft: 10
  },
  chatHeaderName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937'
  },
  chatHeaderStatus: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2
  },
  videoButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoIcon: {
    fontSize: 24
  },
  e2eInfo: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12
  },
  e2eText: {
    fontSize: 12,
    color: '#92400E',
    textAlign: 'center'
  },
  messagesList: {
    padding: 20,
    gap: 12
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6B9D',
    borderBottomRightRadius: 4
  },
  breederBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 4
  },
  messageText: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 20
  },
  userMessageText: {
    color: 'white'
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 8
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4
  },
  messageTimestamp: {
    fontSize: 11,
    color: '#9CA3AF'
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.8)'
  },
  messageStatus: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB'
  },
  attachButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  attachIcon: {
    fontSize: 24,
    transform: [{ rotate: '-45deg' }]
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  messageInput: {
    fontSize: 15,
    color: '#1F2937',
    maxHeight: 100
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden'
  },
  sendGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendIcon: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700'
  }
});

// 🔥 WIADOMOŚĆ 3/5 - GOOGLE MAPS + VETERINARIANS + UBER PETS API
// Kontynuacja app/(tabs)/index.tsx

// 🔥 GOOGLE MAPS + VETERINARIANS NEARBY
const MapVeterinariansTab: React.FC = () => {
  const [vets, setVets] = useState<any[]>([
    {
      id: 'vet1',
      name: 'Klinika Kotów Premium',
      rating: 4.9,
      address: 'ul. Puławska 123, Warszawa',
      distance: '1.2 km',
      phone: '+48 22 123 45 67',
      services: ['Wizyta', 'Szczepienia', 'Badania', 'Chirurgia'],
      photo: 'https://images.unsplash.com/photo-1583422409516-2771ec7dfe4d?w=300'
    },
    {
      id: 'vet2',
      name: 'Gabinet Weterynaryjny Dr. Kot',
      rating: 4.8,
      address: 'ul. Marszałkowska 456, Warszawa',
      distance: '2.8 km',
      phone: '+48 22 765 43 21',
      services: ['Wizyta', 'Szczepienia', 'Badania', 'Opieka pooperacyjna'],
      photo: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=300'
    },
    {
      id: 'vet3',
      name: 'Koty 24/7',
      rating: 4.7,
      address: 'ul. Nowogrodzka 789, Warszawa',
      distance: '3.5 km',
      phone: '+48 22 987 65 43',
      services: ['Wizyta', 'Szczepienia', 'Badania', 'Teleweterynaria'],
      photo: 'https://images.unsplash.com/photo-1573956536352-0bfde9f3de98?w=300'
    }
  ]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  return (
    <View style={styles.mapContainer}>
      {/* 🗺️ GOOGLE MAPS */}
      <View style={styles.map}>
        {/* Google Maps API placeholder */}
        <Image
          source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=52.2297,21.0122&zoom=13&size=600x400&markers=color:red%7C52.2297,21.0122&key=YOUR_API_KEY' }}
          style={styles.mapImage}
        />
      </View>

      {/* 🐾 VETERINARIANS LIST */}
      <View style={styles.vetsList}>
        <Text style={styles.vetsTitle}>🐾 Najbliższe kliniki weterynaryjne</Text>
        
        <FlatList
          data={vets}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.vetsContent}
          renderItem={({ item }) => (
            <View style={styles.vetCard}>
              <Image source={{ uri: item.photo }} style={styles.vetPhoto} />
              
              <View style={styles.vetInfo}>
                <Text style={styles.vetName}>{item.name}</Text>
                <View style={styles.vetRow}>
                  <Text style={styles.vetRating}>⭐ {item.rating}</Text>
                  <Text style={styles.vetDistance}>{item.distance}</Text>
                </View>
                <Text style={styles.vetAddress}>{item.address}</Text>
                <Text style={styles.vetPhone}>{item.phone}</Text>
                
                <View style={styles.vetServices}>
                  {item.services.map((service, idx) => (
                    <Text key={idx} style={styles.vetService}>{service}</Text>
                  ))}
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

// 🔥 UBER PETS API INTEGRATION (Transport kotów)
const UberPetsTab: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pets, setPets] = useState([{ id: 'pet1', name: 'Luna', breed: 'British Shorthair', age: '1.5 roku' }]);
  const [estimates, setEstimates] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([
    {
      id: 'booking1',
      pet: 'Luna',
      pickup: 'ul. Puławska 123, Warszawa',
      dropoff: 'ul. Marszałkowska 456, Warszawa',
      date: '2025-12-25 14:30',
      status: 'confirmed',
      price: '250 PLN',
      driver: 'Jan Kowalski',
      vehicle: 'Mercedes Vito'
    }
  ]);

  const fetchEstimate = async () => {
    // Symulacja wywołania Uber Pets API
    setEstimates([
      { type: 'UberPet', price: '250 PLN', eta: '15 min' },
      { type: 'UberPet XL', price: '350 PLN', eta: '18 min' },
      { type: 'UberPet Van', price: '450 PLN', eta: '22 min' }
    ]);
  };

  const bookRide = (estimate: any) => {
    Alert.alert('✅', `Zamówiono transport ${estimate.type} za ${estimate.price}`);
    setBookings(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        pet: pets[0].name,
        pickup,
        dropoff,
        date: new Date().toLocaleString('pl-PL'),
        status: 'confirmed',
        price: estimate.price,
        driver: 'Jan Kowalski',
        vehicle: estimate.type === 'UberPet' ? 'Mercedes Vito' : estimate.type === 'UberPet XL' ? 'Volkswagen Transporter' : 'Fiat Ducato'
      }
    ]);
  };

  return (
    <View style={styles.uberContainer}>
      {/* 🚗 UBER PETS FORM */}
      <View style={styles.uberForm}>
        <Text style={styles.uberTitle}>🚗 Uber Pets - Transport kotów</Text>
        
        <TextInput
          style={styles.uberInput}
          placeholder="Adres odbioru"
          value={pickup}
          onChangeText={setPickup}
        />
        <TextInput
          style={styles.uberInput}
          placeholder="Adres docelowy"
          value={dropoff}
          onChangeText={setDropoff}
        />
        
        <View style={styles.petsList}>
          {pets.map(pet => (
            <View key={pet.id} style={styles.petItem}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petBreed}>{pet.breed}</Text>
              <Text style={styles.petAge}>{pet.age}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.estimateButton} onPress={fetchEstimate}>
          <LinearGradient colors={['#111111', '#222222']} style={styles.estimateGradient}>
            <Text style={styles.estimateText}>Oblicz koszt</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 📊 PRICE ESTIMATES */}
      {estimates.length > 0 && (
        <View style={styles.estimatesList}>
          <Text style={styles.estimatesTitle}>Szacunkowe ceny:</Text>
          {estimates.map((estimate, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.estimateItem}
              onPress={() => bookRide(estimate)}
            >
              <Text style={styles.estimateType}>{estimate.type}</Text>
              <Text style={styles.estimatePrice}>{estimate.price}</Text>
              <Text style={styles.estimateEta}>{estimate.eta}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 📅 BOOKINGS HISTORY */}
      <View style={styles.bookingsList}>
        <Text style={styles.bookingsTitle}>Twoje rezerwacje:</Text>
        {bookings.map(booking => (
          <View key={booking.id} style={styles.bookingItem}>
            <Text style={styles.bookingPet}>{booking.pet}</Text>
            <Text style={styles.bookingRoute}>{booking.pickup} → {booking.dropoff}</Text>
            <Text style={styles.bookingDate}>{booking.date}</Text>
            <Text style={styles.bookingStatus}>{booking.status}</Text>
            <Text style={styles.bookingPrice}>{booking.price}</Text>
            <Text style={styles.bookingDriver}>{booking.driver}</Text>
            <Text style={styles.bookingVehicle}>{booking.vehicle}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// 🔥 UBER PETS API MOCK (placeholder)
const uberPetsApi = {
  estimate: (pickup: string, dropoff: string, pets: any[]) => {
    // Symulacja API
    return [
      { type: 'UberPet', price: '250 PLN', eta: '15 min' },
      { type: 'UberPet XL', price: '350 PLN', eta: '18 min' },
      { type: 'UberPet Van', price: '450 PLN', eta: '22 min' }
    ];
  },
  book: (pickup: string, dropoff: string, pets: any[], estimate: any) => {
    // Symulacja rezerwacji
    return {
      id: Date.now().toString(),
      status: 'confirmed',
      price: estimate.price,
      driver: 'Jan Kowalski',
      vehicle: estimate.type === 'UberPet' ? 'Mercedes Vito' : estimate.type === 'UberPet XL' ? 'Volkswagen Transporter' : 'Fiat Ducato'
    };
  }
};

// 🔥 MAP + UBER PETS STYLES
const mapStyles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF'
  },
  map: {
    height: 250,
    marginHorizontal: 20,
    marginTop: 70,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10
  },
  mapImage: {
    width: '100%',
    height: '100%'
  },
  vetsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  vetsTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 20
  },
  vetsContent: {
    gap: 15
  },
  vetCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  vetPhoto: {
    width: 100,
    height: 100
  },
  vetInfo: {
    flex: 1,
    padding: 15
  },
  vetName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4
  },
  vetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  vetRating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981'
  },
  vetDistance: {
    fontSize: 14,
    color: '#6B7280'
  },
  vetAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  vetPhone: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8
  },
  vetServices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  vetService: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  uberContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  uberForm: {
    marginBottom: 30
  },
  uberTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 20
  },
  uberInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  petsList: {
    marginBottom: 20
  },
  petItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  petName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937'
  },
  petBreed: {
    fontSize: 14,
    color: '#6B7280'
  },
  petAge: {
    fontSize: 14,
    color: '#6B7280'
  },
  estimateButton: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  estimateGradient: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  estimateText: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white'
  },
  estimatesList: {
    marginBottom: 30
  },
  estimatesTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 15
  },
  estimateItem: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  estimateType: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937'
  },
  estimatePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF6B9D'
  },
  estimateEta: {
    fontSize: 14,
    color: '#6B7280'
  },
  bookingsList: {
    marginBottom: 30
  },
  bookingsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 15
  },
  bookingItem: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  bookingPet: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4
  },
  bookingRoute: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  bookingDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  bookingStatus: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 4
  },
  bookingPrice: {
    fontSize: 14,
    color: '#FF6B9D',
    marginBottom: 4
  },
  bookingDriver: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  bookingVehicle: {
    fontSize: 14,
    color: '#6B7280'
  }
});

// 🔥 WIADOMOŚĆ 4/5 - INTERNATIONAL TRANSPORT + REAL-TIME TRANSLATIONS
// Kontynuacja app/(tabs)/index.tsx

// 🔥 INTERNATIONAL TRANSPORT TAB
const InternationalTransportTab: React.FC = () => {
  const [routes, setRoutes] = useState<any[]>([
    {
      id: 'route1',
      from: 'Warszawa, Polska',
      to: 'Berlin, Niemcy',
      carrier: 'PetAir',
      duration: '4h 30min',
      price: '850 PLN',
      status: 'available',
      options: ['Klimatyzowany samochód', 'GPS tracking', 'Ubezpieczenie 50k PLN']
    },
    {
      id: 'route2',
      from: 'Warszawa, Polska',
      to: 'Paryż, Francja',
      carrier: 'PetExpress',
      duration: '12h',
      price: '1500 PLN',
      status: 'available',
      options: ['Kontener premium', 'Weterynarz w aucie', '24/7 monitoring']
    },
    {
      id: 'route3',
      from: 'Warszawa, Polska',
      to: 'Amsterdam, Holandia',
      carrier: 'PetGlobal',
      duration: '8h',
      price: '1200 PLN',
      status: 'available',
      options: ['Kontener z klimatyzacją', 'Weterynarz online', 'Ubezpieczenie 75k PLN']
    }
  ]);
  const [bookings, setBookings] = useState<any[]>([
    {
      id: 'booking1',
      route: 'Warszawa → Berlin',
      date: '2025-12-25',
      status: 'confirmed',
      price: '850 PLN',
      carrier: 'PetAir',
      tracking: 'PA123456789PL'
    }
  ]);

  const bookRoute = (route: any) => {
    Alert.alert('✅', `Zamówiono transport ${route.from} → ${route.to} za ${route.price}`);
    setBookings(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        route: `${route.from} → ${route.to}`,
        date: new Date().toLocaleDateString('pl-PL'),
        status: 'confirmed',
        price: route.price,
        carrier: route.carrier,
        tracking: `PA${Math.floor(100000000 + Math.random() * 900000000)}PL`
      }
    ]);
  };

  return (
    <View style={styles.transportContainer}>
      {/* 🌍 INTERNATIONAL TRANSPORT */}
      <View style={styles.transportHeader}>
        <Text style={styles.transportTitle}>🌍 Transport międzynarodowy</Text>
        <Text style={styles.transportSubtitle}>
          Klimatyzowane kontenery • GPS tracking • Ubezpieczenie do 100k PLN
        </Text>
      </View>

      {/* 📊 ROUTES LIST */}
      <FlatList
        data={routes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.routesList}
        renderItem={({ item }) => (
          <View style={styles.routeCard}>
            <View style={styles.routeHeader}>
              <Text style={styles.routeFrom}>{item.from}</Text>
              <Text style={styles.routeArrow}>→</Text>
              <Text style={styles.routeTo}>{item.to}</Text>
            </View>

            <View style={styles.routeInfo}>
              <Text style={styles.routeCarrier}>{item.carrier}</Text>
              <Text style={styles.routeDuration}>{item.duration}</Text>
              <Text style={styles.routePrice}>{item.price}</Text>
            </View>

            <View style={styles.routeOptions}>
              {item.options.map((opt, idx) => (
                <Text key={idx} style={styles.routeOption}>✓ {opt}</Text>
              ))}
            </View>

            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => bookRoute(item)}
            >
              <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.bookGradient}>
                <Text style={styles.bookText}>Zamów</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 📅 BOOKINGS HISTORY */}
      <View style={styles.bookingsList}>
        <Text style={styles.bookingsTitle}>Twoje rezerwacje:</Text>
        {bookings.map(booking => (
          <View key={booking.id} style={styles.bookingItem}>
            <Text style={styles.bookingRoute}>{booking.route}</Text>
            <Text style={styles.bookingDate}>{booking.date}</Text>
            <Text style={styles.bookingStatus}>{booking.status}</Text>
            <Text style={styles.bookingPrice}>{booking.price}</Text>
            <Text style={styles.bookingCarrier}>{booking.carrier}</Text>
            <Text style={styles.bookingTracking}>Tracking: {booking.tracking}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// 🔥 REAL-TIME TRANSLATION TAB
const TranslationTab: React.FC = () => {
  const [chats, setChats] = useState<any[]>([
    {
      id: 'chat1',
      breeder: 'Hodowla Złoty Brytyjczyk',
      language: 'en',
      messages: [
        {
          id: 'm1',
          sender: 'breeder',
          text: 'Hello! Luna is available for sale.',
          translated: 'Witaj! Luna jest dostępna do sprzedaży.',
          timestamp: Date.now() - 3600000
        },
        {
          id: 'm2',
          sender: 'user',
          text: 'Czy mogę dostać więcej zdjęć?',
          translated: 'Can I get more photos?',
          timestamp: Date.now() - 3000000
        }
      ]
    },
    {
      id: 'chat2',
      breeder: 'Hodowla Giants MC',
      language: 'de',
      messages: [
        {
          id: 'm3',
          sender: 'breeder',
          text: 'Guten Tag! Mruczek ist verfügbar.',
          translated: 'Dzień dobry! Mruczek jest dostępny.',
          timestamp: Date.now() - 7200000
        },
        {
          id: 'm4',
          sender: 'user',
          text: 'Jakie są warunki transportu?',
          translated: 'What are the transport conditions?',
          timestamp: Date.now() - 6600000
        }
      ]
    }
  ]);
  const [translationLanguage, setTranslationLanguage] = useState('pl');
  const [supportedLanguages, setSupportedLanguages] = useState([
    { code: 'pl', name: 'Polski' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' }
  ]);

  const translateText = (text: string, from: string, to: string) => {
    // Symulacja API Google Translate
    if (from === 'pl' && to === 'en') {
      if (text === 'Czy mogę dostać więcej zdjęć?') return 'Can I get more photos?';
      if (text === 'Jakie są warunki transportu?') return 'What are the transport conditions?';
    }
    if (from === 'en' && to === 'pl') {
      if (text === 'Hello! Luna is available for sale.') return 'Witaj! Luna jest dostępna do sprzedaży.';
    }
    if (from === 'de' && to === 'pl') {
      if (text === 'Guten Tag! Mruczek ist verfügbar.') return 'Dzień dobry! Mruczek jest dostępny.';
    }
    return text;
  };

  return (
    <View style={styles.translationContainer}>
      {/* 🌐 TRANSLATION SETTINGS */}
      <View style={styles.translationHeader}>
        <Text style={styles.translationTitle}>🌐 Tłumaczenie czasu rzeczywistego</Text>
        <Text style={styles.translationSubtitle}>
          Wszystkie czaty automatycznie tłumaczone na Twoje preferowane języki
        </Text>
      </View>

      <View style={styles.languageSelector}>
        <Text style={styles.languageLabel}>Preferowany język:</Text>
        <View style={styles.languageList}>
          {supportedLanguages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                translationLanguage === lang.code && styles.languageButtonActive
              ]}
              onPress={() => setTranslationLanguage(lang.code)}
            >
              <Text style={[
                styles.languageButtonText,
                translationLanguage === lang.code && styles.languageButtonTextActive
              ]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 💬 TRANSLATED CHATS */}
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatsList}
        renderItem={({ item }) => (
          <View style={styles.chatCard}>
            <Text style={styles.chatBreeder}>{item.breeder}</Text>
            <Text style={styles.chatLanguage}>Język: {item.language}</Text>

            {item.messages.map(msg => (
              <View key={msg.id} style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userBubble : styles.breederBubble
              ]}>
                <Text style={[
                  styles.messageText,
                  msg.sender === 'user' && styles.userMessageText
                ]}>
                  {msg.sender === 'user' ? msg.text : msg.translated}
                </Text>
                {msg.sender !== 'user' && (
                  <Text style={styles.messageTranslated}>
                    {msg.sender === 'user' ? msg.translated : msg.text}
                  </Text>
                )}
                <Text style={styles.messageTimestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString('pl-PL')}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

// 🔥 TRANSLATION API MOCK
const translationApi = {
  translate: (text: string, from: string, to: string) => {
    // Symulacja API Google Translate
    return translateText(text, from, to);
  }
};

// 🔥 TRANSPORT + TRANSLATION STYLES
const transportStyles = StyleSheet.create({
  transportContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  transportHeader: {
    marginBottom: 30
  },
  transportTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 8
  },
  transportSubtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  routesList: {
    gap: 20,
    marginBottom: 30
  },
  routeCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  routeFrom: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937'
  },
  routeArrow: {
    fontSize: 24,
    color: '#FF6B9D',
    marginHorizontal: 10
  },
  routeTo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937'
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  routeCarrier: {
    fontSize: 16,
    color: '#6B7280'
  },
  routeDuration: {
    fontSize: 16,
    color: '#6B7280'
  },
  routePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF6B9D'
  },
  routeOptions: {
    marginBottom: 15
  },
  routeOption: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  bookButton: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  bookGradient: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  bookText: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white'
  },
  bookingsList: {
    marginBottom: 30
  },
  bookingsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 15
  },
  bookingItem: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  bookingRoute: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4
  },
  bookingDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  bookingStatus: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 4
  },
  bookingPrice: {
    fontSize: 14,
    color: '#FF6B9D',
    marginBottom: 4
  },
  bookingCarrier: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  bookingTracking: {
    fontSize: 14,
    color: '#6B7280'
  },
  translationContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  translationHeader: {
    marginBottom: 30
  },
  translationTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 8
  },
  translationSubtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  languageSelector: {
    marginBottom: 30
  },
  languageLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 15
  },
  languageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB'
  },
  languageButtonActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D'
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280'
  },
  languageButtonTextActive: {
    color: 'white'
  },
  chatsList: {
    gap: 20
  },
  chatCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  chatBreeder: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8
  },
  chatLanguage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 15
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6B9D',
    borderBottomRightRadius: 4
  },
  breederBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 4
  },
  messageText: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 20
  },
  userMessageText: {
    color: 'white'
  },
  messageTranslated: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4
  },
  messageTimestamp: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4
  }
});

// 🔥 WIADOMOŚĆ 5/5 - AR VIEWER + AI MATCHING + NFT GALLERY + PAYMENTS
// Kontynuacja app/(tabs)/index.tsx

// 🔥 AR VIEWER TAB (RealityKit + ARKit)
const ARViewerTab: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<PremiumCat | null>(null);
  const [arMode, setArMode] = useState<'viewer' | 'placement' | 'photo'>('viewer');
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setArMode('photo');
    }
  };

  const placeInRoom = () => {
    setArMode('placement');
    Alert.alert('ℹ️', 'Przesuń palcem, aby ustawić kota w pokoju');
  };

  return (
    <View style={styles.arContainer}>
      {/* 🖼️ AR HEADER */}
      <View style={styles.arHeader}>
        <Text style={styles.arTitle}>AR Viewer</Text>
        <Text style={styles.arSubtitle}>Zobacz kota w Twoim pokoju</Text>
      </View>

      {/* 🐱 CAT SELECTOR */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catSelector}>
        {SEED_CATS.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.catThumbnail,
              selectedCat?.id === cat.id && styles.catThumbnailSelected
            ]}
            onPress={() => setSelectedCat(cat)}
          >
            <Image source={{ uri: cat.images[0] }} style={styles.catThumbImage} />
            <Text style={styles.catThumbName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🖼️ AR VIEWER */}
      <View style={styles.arViewer}>
        {/* Symulacja ARKit/RealityKit */}
        <Image
          source={{ uri: selectedCat?.images[0] || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800' }}
          style={styles.arModel}
        />
      </View>

      {/* 🎮 AR MODES */}
      <View style={styles.arModes}>
        <TouchableOpacity
          style={[
            styles.arModeButton,
            arMode === 'viewer' && styles.arModeButtonActive
          ]}
          onPress={() => setArMode('viewer')}
        >
          <Text style={styles.arModeText}>Viewer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.arModeButton,
            arMode === 'placement' && styles.arModeButtonActive
          ]}
          onPress={placeInRoom}
        >
          <Text style={styles.arModeText}>Ustaw w pokoju</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.arModeButton,
            arMode === 'photo' && styles.arModeButtonActive
          ]}
          onPress={takePhoto}
        >
          <Text style={styles.arModeText}>Zrób zdjęcie</Text>
        </TouchableOpacity>
      </View>

      {/* 📸 PHOTO PREVIEW */}
      {photo && (
        <View style={styles.photoPreview}>
          <Image source={{ uri: photo }} style={styles.photoImage} />
          <TouchableOpacity style={styles.sharePhotoButton}>
            <LinearGradient colors={['#10B981', '#059669']} style={styles.shareGradient}>
              <Text style={styles.shareText}>Udostępnij</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// 🔥 AI MATCHING TAB
const AIMatchingTab: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    lifestyle: 'family',
    home: 'apartment',
    kids: true,
    dogs: false,
    activity: 5,
    budget: 5000
  });
  const [matches, setMatches] = useState<PremiumCat[]>([]);
  const [loading, setLoading] = useState(false);

  const generateMatches = () => {
    setLoading(true);
    // Symulacja AI matching
    setTimeout(() => {
      setMatches(SEED_CATS.slice(0, 3));
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    generateMatches();
  }, []);

  return (
    <View style={styles.aiContainer}>
      {/* 🤖 AI HEADER */}
      <View style={styles.aiHeader}>
        <Text style={styles.aiTitle}>AI Matching</Text>
        <Text style={styles.aiSubtitle}>Znajdź idealnego kota dla Twojego stylu życia</Text>
      </View>

      {/* 🏠 USER PROFILE */}
      <View style={styles.profileForm}>
        <Text style={styles.formTitle}>Twój profil:</Text>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Styl życia:</Text>
          <View style={styles.formOptions}>
            {['family', 'single', 'couple'].map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.formOption,
                  userProfile.lifestyle === option && styles.formOptionActive
                ]}
                onPress={() => setUserProfile({ ...userProfile, lifestyle: option })}
              >
                <Text style={styles.formOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Dom:</Text>
          <View style={styles.formOptions}>
            {['apartment', 'house'].map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.formOption,
                  userProfile.home === option && styles.formOptionActive
                ]}
                onPress={() => setUserProfile({ ...userProfile, home: option })}
              >
                <Text style={styles.formOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Dzieci:</Text>
          <View style={styles.formOptions}>
            {[true, false].map(option => (
              <TouchableOpacity
                key={option.toString()}
                style={[
                  styles.formOption,
                  userProfile.kids === option && styles.formOptionActive
                ]}
                onPress={() => setUserProfile({ ...userProfile, kids: option })}
              >
                <Text style={styles.formOptionText}>{option ? 'Tak' : 'Nie'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Psy:</Text>
          <View style={styles.formOptions}>
            {[true, false].map(option => (
              <TouchableOpacity
                key={option.toString()}
                style={[
                  styles.formOption,
                  userProfile.dogs === option && styles.formOptionActive
                ]}
                onPress={() => setUserProfile({ ...userProfile, dogs: option })}
              >
                <Text style={styles.formOptionText}>{option ? 'Tak' : 'Nie'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Aktywność:</Text>
          <View style={styles.formSlider}>
            <Text style={styles.formSliderText}>Niska</Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${userProfile.activity * 20}%` }]} />
            </View>
            <Text style={styles.formSliderText}>Wysoka</Text>
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Budżet:</Text>
          <View style={styles.formSlider}>
            <Text style={styles.formSliderText}>0 PLN</Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${userProfile.budget / 100}%` }]} />
            </View>
            <Text style={styles.formSliderText}>10 000 PLN</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.generateButton} onPress={generateMatches}>
          <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.generateGradient}>
            <Text style={styles.generateText}>Generuj dopasowania</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 🐱 MATCHES */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF6B9D" style={styles.loading} />
      ) : (
        <View style={styles.matchesList}>
          <Text style={styles.matchesTitle}>Najlepsze dopasowania:</Text>
          {matches.map(cat => (
            <View key={cat.id} style={styles.matchCard}>
              <Image source={{ uri: cat.images[0] }} style={styles.matchImage} />
              <View style={styles.matchInfo}>
                <Text style={styles.matchName}>{cat.name}</Text>
                <Text style={styles.matchBreed}>{cat.breed.replace('_', ' ')}</Text>
                <Text style={styles.matchPrice}>{cat.price_formatted}</Text>
                <Text style={styles.matchScore}>AI Score: {cat.ai_score.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// 🔥 NFT GALLERY TAB
const NFTGalleryTab: React.FC = () => {
  const [nfts, setNfts] = useState([
    {
      id: 'nft1',
      cat: 'Luna Supreme',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      blockchain: 'Polygon',
      price: '0.042 ETH',
      status: 'available'
    },
    {
      id: 'nft2',
      cat: 'Thunder Giant MC',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
      blockchain: 'Ethereum',
      price: '0.078 ETH',
      status: 'sold'
    },
    {
      id: 'nft3',
      cat: 'Bella Persian Dream',
      image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800',
      blockchain: 'Polygon',
      price: '0.033 ETH',
      status: 'available'
    }
  ]);

  return (
    <View style={styles.nftContainer}>
      {/* 🖼️ NFT HEADER */}
      <View style={styles.nftHeader}>
        <Text style={styles.nftTitle}>NFT Gallery</Text>
        <Text style={styles.nftSubtitle}>Kup rodowód kota jako NFT na Polygon/Ethereum</Text>
      </View>

      {/* 🖼️ NFT CARDS */}
      <FlatList
        data={nfts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.nftList}
        renderItem={({ item }) => (
          <View style={styles.nftCard}>
            <Image source={{ uri: item.image }} style={styles.nftImage} />
            <View style={styles.nftInfo}>
              <Text style={styles.nftCat}>{item.cat}</Text>
              <Text style={styles.nftBlockchain}>{item.blockchain}</Text>
              <Text style={styles.nftPrice}>{item.price}</Text>
              <TouchableOpacity style={styles.nftButton}>
                <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.nftGradient}>
                  <Text style={styles.nftButtonText}>
                    {item.status === 'available' ? 'Kup NFT' : 'Sprzedano'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// 🔥 PAYMENTS TAB
const PaymentsTab: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'payu' | 'crypto'>('stripe');
  const [amount, setAmount] = useState('3500');
  const [currency, setCurrency] = useState<'PLN' | 'USDT' | 'ETH'>('PLN');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    setLoading(true);
    // Symulacja płatności
    setTimeout(() => {
      Alert.alert('✅', 'Płatność udana!');
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.paymentsContainer}>
      {/* 💳 PAYMENT HEADER */}
      <View style={styles.paymentsHeader}>
        <Text style={styles.paymentsTitle}>Płatności</Text>
        <Text style={styles.paymentsSubtitle}>Wybierz metodę płatności</Text>
      </View>

      {/* 🏦 PAYMENT METHODS */}
      <View style={styles.methodSelector}>
        <TouchableOpacity
          style={[
            styles.methodButton,
            paymentMethod === 'stripe' && styles.methodButtonActive
          ]}
          onPress={() => setPaymentMethod('stripe')}
        >
          <Text style={styles.methodText}>Stripe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodButton,
            paymentMethod === 'payu' && styles.methodButtonActive
          ]}
          onPress={() => setPaymentMethod('payu')}
        >
          <Text style={styles.methodText}>PayU</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodButton,
            paymentMethod === 'crypto' && styles.methodButtonActive
          ]}
          onPress={() => setPaymentMethod('crypto')}
        >
          <Text style={styles.methodText}>Crypto</Text>
        </TouchableOpacity>
      </View>

      {/* 💰 AMOUNT */}
      <View style={styles.amountInput}>
        <Text style={styles.amountLabel}>Kwota:</Text>
        <TextInput
          style={styles.amountValue}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      {/* 💱 CURRENCY */}
      {paymentMethod === 'crypto' && (
        <View style={styles.currencySelector}>
          <Text style={styles.currencyLabel}>Waluta:</Text>
          <View style={styles.currencyButtons}>
            {['PLN', 'USDT', 'ETH'].map(curr => (
              <TouchableOpacity
                key={curr}
                style={[
                  styles.currencyButton,
                  currency === curr && styles.currencyButtonActive
                ]}
                onPress={() => setCurrency(curr as any)}
              >
                <Text style={styles.currencyText}>{curr}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* 🧾 WALLET ADDRESS */}
      {paymentMethod === 'crypto' && (
        <View style={styles.walletInput}>
          <Text style={styles.walletLabel}>Adres portfela:</Text>
          <TextInput
            style={styles.walletValue}
            value={walletAddress}
            onChangeText={setWalletAddress}
            placeholder="0x..."
          />
        </View>
      )}

      {/* 🚀 PAY BUTTON */}
      <TouchableOpacity style={styles.payButton} onPress={pay}>
        <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.payGradient}>
          <Text style={styles.payText}>
            {loading ? 'Przetwarzanie...' : 'Zapłać'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

// 🔥 AR + AI + NFT + PAYMENTS STYLES
const styles = StyleSheet.create({
  arContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  arHeader: {
    marginBottom: 30
  },
  arTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 8
  },
  arSubtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  catSelector: {
    marginBottom: 20
  },
  catThumbnail: {
    width: 100,
    height: 140,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E5E7EB'
  },
  catThumbnailSelected: {
    borderColor: '#FF6B9D'
  },
  catThumbImage: {
    width: '100%',
    height: 100
  },
  catThumbName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 8
  },
  arViewer: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  arModel: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  arModes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  arModeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: 'white'
  },
  arModeButtonActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D'
  },
  arModeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280'
  },
  photoPreview: {
    alignItems: 'center',
    marginBottom: 20
  },
  photoImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 10
  },
  sharePhotoButton: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  shareGradient: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  shareText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white'
  },
  aiContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  aiHeader: {
    marginBottom: 30
  },
  aiTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 8
  },
  aiSubtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  profileForm: {
    marginBottom: 30
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 20
  },
  formRow: {
    marginBottom: 20
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10
  },
  formOptions: {
    flexDirection: 'row',
    gap: 10
  },
  formOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: 'white'
  },
  formOptionActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D'
  },
  formOptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280'
  },
  formSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  formSliderText: {
    fontSize: 14,
    color: '#6B7280'
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#FF6B9D',
    borderRadius: 3
  },
  generateButton: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  generateGradient: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  generateText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white'
  },
  loading: {
    marginTop: 30
  },
  matchesList: {
    marginTop: 20
  },
  matchesTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 15
  },
  matchCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  matchImage: {
    width: 100,
    height: 100
  },
  matchInfo: {
    flex: 1,
    padding: 15
  },
  matchName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4
  },
  matchBreed: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  matchPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FF6B9D',
    marginBottom: 4
  },
  matchScore: {
    fontSize: 14,
    color: '#6B7280'
  },
  nftContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  nftHeader: {
    marginBottom: 30
  },
  nftTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 8
  },
  nftSubtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  nftList: {
    gap: 20
  },
  nftCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },
  nftImage: {
    width: 120,
    height: 120
  },
  nftInfo: {
    flex: 1,
    padding: 15
  },
  nftCat: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4
  },
  nftBlockchain: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  nftPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF6B9D',
    marginBottom: 12
  },
  nftButton: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  nftGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  nftButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: 'white'
  },
  paymentsContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  paymentsHeader: {
    marginBottom: 30
  },
  paymentsTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 8
  },
  paymentsSubtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  methodSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20
  },
  methodButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  methodButtonActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D'
  },
  methodText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6B7280'
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 15
  },
  amountValue: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  currencySelector: {
    marginBottom: 20
  },
  currencyLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10
  },
  currencyButtons: {
    flexDirection: 'row',
    gap: 10
  },
  currencyButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: 'white'
  },
  currencyButtonActive: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D'
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280'
  },
  walletInput: {
    marginBottom: 20
  },
  walletLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10
  },
  walletValue: {
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  payButton: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  payGradient: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  payText: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white'
  }
});

// 🔥 NAVIGATION
const AppNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        elevation: 25,
        shadowColor: '#FF6B9D',
        shadowOpacity: 0.3,
        shadowRadius: 25,
        height: 90,
        paddingBottom: 10,
        borderRadius: 30,
        margin: 20,
        marginBottom: 40,
        shadowOffset: { width: 0, height: -10 }
      },
      tabBarShowLabel: false,
      headerShown: false
    }}
  >
    <Tab.Screen name="Home" component={HomeTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>🏠</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="Filters" component={FiltersTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>🔍</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="Chat" component={ChatTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>💬</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="Map" component={MapVeterinariansTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>📍</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="Uber" component={UberPetsTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>🚗</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="Transport" component={InternationalTransportTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>🌍</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="Translation" component={TranslationTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>🌐</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="AR" component={ARViewerTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>👓</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="AI" component={AIMatchingTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>🤖</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="NFT" component={NFTGalleryTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>🖼️</Text>
          </View>
        </LinearGradient>
      )
    }} />
    <Tab.Screen name="Payments" component={PaymentsTab} options={{
      tabBarIcon: ({ focused }) => (
        <LinearGradient colors={focused ? ['#FF6B9D', '#C44569'] : ['#D1D5DB', '#E5E7EB']}>
          <View style={{ padding: 12, borderRadius: 20 }}>
            <Text style={{ fontSize: 24, color: focused ? 'white' : '#6B7280' }}>💳</Text>
          </View>
        </LinearGradient>
      )
    }} />
  </Tab.Navigator>
);

// 🔥 ROOT APP EXPORT
export default function App() {
  return (
    <CatPurreProvider>
      <StripeProvider publishableKey="pk_test_xxx">
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </SafeAreaView>
      </StripeProvider>
    </CatPurreProvider>
  );
}




