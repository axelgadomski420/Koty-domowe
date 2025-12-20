import React, { useState, useEffect } from 'react'

function App() {
  const [showChat, setShowChat] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [selectedCat, setSelectedCat] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterBreed, setFilterBreed] = useState('all')
  const [userOnline, setUserOnline] = useState(true)

  // Simulate online users
  useEffect(() => {
    const interval = setInterval(() => {
      setUserOnline(Math.random() > 0.3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const catBreeds = ['Perski', 'Maine Coon', 'British Shorthair', 'Ragdoll', 'Bengalski', 'Syjamski']
  const premiumCats = [
    { id: 1, name: 'Luna', breed: 'British Shorthair', age: '1.5 roku', price: '2500 PLN', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop', featured: true, verified: true, likes: 342, views: 1240 },
    { id: 2, name: 'Mruczek', breed: 'Maine Coon', age: '8 miesięcy', price: '3200 PLN', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop', featured: true, verified: true, likes: 521, views: 2100 },
    { id: 3, name: 'Whiskers', breed: 'Perski', age: '2 lata', price: '2800 PLN', image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400&h=300&fit=crop', featured: true, verified: true, likes: 289, views: 980 },
    { id: 4, name: 'Bella', breed: 'Ragdoll', age: '6 miesięcy', price: '3500 PLN', image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400&h=300&fit=crop', featured: false, verified: true, likes: 156, views: 620 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 overflow-x-hidden">
      {/* NAVBAR - Premium */}
      <nav className="glass-card fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-8 backdrop-blur-2xl border-b border-white/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
              <span className="text-3xl">😻</span>
            </div>
            <div>
              <h2 className="text-2xl font-black font-nunito petcare-gradient leading-none">CAT PURRE</h2>
              <p className="text-xs text-gray-500 font-semibold">Premium Cat Marketplace</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <a onClick={() => setActiveTab('home')} className="font-nunito font-semibold text-gray-700 hover:text-pink-600 transition-colors cursor-pointer">Strona główna</a>
            <a onClick={() => setActiveTab('cats')} className="font-nunito font-semibold text-gray-700 hover:text-pink-600 transition-colors cursor-pointer">Koty rasowe</a>
            <a onClick={() => setActiveTab('breeders')} className="font-nunito font-semibold text-gray-700 hover:text-pink-600 transition-colors cursor-pointer">Hodowcy</a>
            <a onClick={() => setActiveTab('social')} className="font-nunito font-semibold text-gray-700 hover:text-pink-600 transition-colors cursor-pointer">Społeczność</a>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-xs text-white rounded-full flex items-center justify-center font-bold animate-pulse">7</span>
              </button>
              
              <button 
                onClick={() => setShowChat(!showChat)}
                className="relative p-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="text-xl">💬</span>
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-xs text-white rounded-full flex items-center justify-center font-bold animate-pulse">23</span>
              </button>
              
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl cursor-pointer hover:scale-110 transition-transform shadow-lg flex items-center justify-center text-white font-bold text-lg">
                👤
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      {activeTab === 'home' && (
        <>
          <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-100 to-pink-100 px-6 py-3 rounded-full mb-8 border border-rose-200">
                <span className="text-2xl animate-bounce">🏆</span>
                <span className="font-nunito font-bold text-rose-600">Nr 1 w Polsce • 10K+ szczęśliwych właścicieli</span>
              </div>
              
              <h1 className="text-7xl lg:text-9xl font-black font-nunito mb-8 petcare-gradient drop-shadow-2xl animate-fade-in leading-none">
                😻 CAT PURRE
              </h1>
              
              <p className="text-3xl lg:text-5xl font-nunito font-bold text-gray-700 mb-6 max-w-4xl mx-auto leading-tight">
                Ekskluzywna platforma rasowych kotów
              </p>
              
              <p className="text-xl lg:text-2xl font-nunito text-gray-600 mb-16 max-w-3xl mx-auto">
                Certyfikowani hodowcy • Umowy notarialne • Transport premium • Blockchain verification ✨
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
                <button 
                  onClick={() => setActiveTab('cats')}
                  className="btn-petcare text-2xl px-16 py-6 shadow-2xl text-white font-bold hover:scale-105"
                >
                  😻 Przeglądaj koty
                </button>
                <button className="btn-petcare text-2xl px-16 py-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-2xl text-white font-bold hover:scale-105">
                  🏆 Zostań hodowcą VIP
                </button>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: '🐱', value: '2.5K+', label: 'Rasowych kotów' },
                  { icon: '✅', value: '500+', label: 'Certyfikowanych hodowców' },
                  { icon: '🚗', value: '24/7', label: 'Transport premium' },
                  { icon: '📜', label: 'Umowy notarialne' }
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-8 rounded-3xl hover:scale-105 transition-all">
                    <div className="text-5xl mb-4">{stat.icon}</div>
                    {stat.value && <div className="text-4xl font-bold text-pink-600 mb-2">{stat.value}</div>}
                    <div className="text-gray-600 font-nunito font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURED CATS */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-100/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl lg:text-7xl font-black font-nunito mb-6 petcare-gradient">
                  🌟 Premium Selection
                </h2>
                <p className="text-2xl text-gray-600 font-nunito max-w-3xl mx-auto">
                  Najwyższej jakości koty rasowe z certyfikatem • Weryfikowani hodowcy
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {premiumCats.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => setSelectedCat(cat)}
                    className="glass-card group cursor-pointer rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-2xl"
                  >
                    <div className="h-72 relative overflow-hidden">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {cat.featured && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-xl">
                          <span>⭐</span>
                          <span>PREMIUM</span>
                        </div>
                      )}
                      {cat.verified && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-xl">
                          <span className="text-xl">✓</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <span>❤️</span>
                              <span className="font-bold">{cat.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>👁️</span>
                              <span className="font-bold">{cat.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-3xl font-black font-nunito text-gray-800">{cat.name}</h3>
                        <div className="text-3xl animate-float">😻</div>
                      </div>
                      <p className="text-gray-600 font-nunito mb-2 text-lg">{cat.breed}</p>
                      <p className="text-gray-500 font-nunito mb-6">{cat.age}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-pink-600">{cat.price}</span>
                        <button className="btn-petcare px-6 py-3 text-sm hover:scale-110">
                          Zobacz profil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CATS CATALOG */}
      {activeTab === 'cats' && (
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl font-black font-nunito petcare-gradient mb-12 text-center">Katalog rasowych kotów</h1>
            
            {/* FILTERS */}
            <div className="glass-card p-8 rounded-3xl mb-12">
              <div className="grid md:grid-cols-3 gap-6">
                <input 
                  type="text"
                  placeholder="🔍 Szukaj po nazwie, rasie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 font-nunito text-lg"
                />
                <select 
                  value={filterBreed}
                  onChange={(e) => setFilterBreed(e.target.value)}
                  className="p-4 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 font-nunito text-lg"
                >
                  <option value="all">Wszystkie rasy</option>
                  {catBreeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
                <button className="btn-petcare text-lg px-8 py-4">
                  🔍 Filtruj
                </button>
              </div>
            </div>

            {/* RESULTS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {premiumCats.map(cat => (
                <div key={cat.id} className="glass-card p-6 rounded-3xl hover:scale-105 transition-all cursor-pointer">
                  <img src={cat.image} className="w-full h-56 object-cover rounded-2xl mb-4" />
                  <h3 className="text-2xl font-bold font-nunito mb-2">{cat.name}</h3>
                  <p className="text-gray-600 mb-4">{cat.breed} • {cat.age}</p>
                  <div className="text-2xl font-black text-pink-600">{cat.price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BREEDERS */}
      {activeTab === 'breeders' && (
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl font-black font-nunito petcare-gradient mb-12 text-center">Certyfikowani hodowcy</h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="glass-card p-8 rounded-3xl hover:scale-105 transition-all text-center">
                  <img src={`https://images.unsplash.com/photo-150${i}00?w=120&h=120&fit=crop&round`} className="w-32 h-32 mx-auto rounded-3xl shadow-2xl mb-6" />
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <h3 className="text-2xl font-bold font-nunito">Hodowca {i}</h3>
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-gray-600 mb-4">Perski, Maine Coon</p>
                  <div className="flex justify-center space-x-4 text-sm mb-6">
                    <span>⭐ 4.9</span>
                    <span>🐱 {12 + i*3} kotów</span>
                    <span>📜 ZKwP</span>
                  </div>
                  <button className="btn-petcare w-full py-3">Zobacz profil</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SOCIAL FEED */}
      {activeTab === 'social' && (
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-black font-nunito petcare-gradient mb-12 text-center">Społeczność CAT PURRE</h1>
            
            {/* CREATE POST */}
            <div className="glass-card p-8 rounded-3xl mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-3xl flex items-center justify-center text-white text-2xl animate-float">😻</div>
                <div className="flex-1">
                  <textarea 
                    placeholder="Podziel się zdjęciem swojego kota! 📸🐱" 
                    className="w-full p-4 bg-white/50 border border-white/30 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 font-nunito text-lg"
                    rows={3}
                  />
                  <div className="flex items-center mt-4 space-x-4">
                    <button className="text-3xl hover:scale-110 p-2">📸</button>
                    <button className="text-3xl hover:scale-110 p-2">🎥</button>
                    <button className="text-3xl hover:scale-110 p-2">😊</button>
                    <button className="ml-auto btn-petcare px-10 py-3 text-lg">Opublikuj</button>
                  </div>
                </div>
              </div>
            </div>

            {/* POSTS */}
            {[1,2].map(i => (
              <div key={i} className="glass-card p-8 rounded-3xl mb-6">
                <div className="flex items-start space-x-4 mb-6">
                  <img src={`https://images.unsplash.com/photo-150${i}00?w=60&h=60&fit=crop&round`} className="w-16 h-16 rounded-3xl shadow-md" />
                  <div>
                    <div className="font-bold font-nunito text-xl">Kasia W. 😻</div>
                    <div className="text-sm text-gray-500">2h temu</div>
                  </div>
                </div>
                <p className="text-xl font-nunito mb-6">Mój nowy British Shorthair z CAT PURRE! Najlepsza decyzja ever! 🥰🐱</p>
                <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop" className="w-full rounded-3xl shadow-2xl mb-6" />
                <div className="flex space-x-2 text-3xl">
                  <button className="p-3 hover:bg-red-50 rounded-2xl hover:scale-110">❤️ 234</button>
                  <button className="p-3 hover:bg-blue-50 rounded-2xl hover:scale-110">💬 45</button>
                  <button className="p-3 hover:bg-sky-50 rounded-2xl hover:scale-110">🔄 12</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CHAT SIDEBAR */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] glass-card rounded-3xl shadow-2xl z-40 flex flex-col">
          <div className="p-6 border-b border-white/30 flex items-center justify-between">
            <h3 className="font-bold font-nunito text-2xl">💬 Wiadomości</h3>
            <button onClick={() => setShowChat(false)} className="text-3xl hover:scale-110">✕</button>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center space-x-3 p-4 bg-white/50 rounded-2xl cursor-pointer hover:bg-white/70">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">😻</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold font-nunito">Hodowca {i}</div>
                  <div className="text-sm text-gray-600 truncate">Pytanie o kota Luna...</div>
                </div>
                <div className="text-xs text-green-500 font-bold">online</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTIFICATIONS */}
      {showNotifications && (
        <div className="fixed top-24 right-6 w-96 glass-card rounded-3xl shadow-2xl z-40 p-6">
          <h3 className="font-bold font-nunito text-xl mb-4">🔔 Powiadomienia</h3>
          <div className="space-y-3">
            {['Nowa wiadomość od hodowcy', 'Luna ma 5 nowych polubień!', 'Certyfikat gotowy do pobrania'].map((notif, i) => (
              <div key={i} className="p-4 bg-white/50 rounded-2xl text-sm font-nunito">{notif}</div>
            ))}
          </div>
        </div>
      )}

      {/* CAT MODAL */}
      {selectedCat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCat(null)}>
          <div className="glass-card max-w-4xl w-full rounded-3xl p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedCat(null)} className="float-right text-3xl hover:scale-110">✕</button>
            <div className="grid md:grid-cols-2 gap-8">
              <img src={selectedCat.image} className="w-full h-96 object-cover rounded-3xl shadow-2xl" />
              <div>
                <h2 className="text-5xl font-black font-nunito mb-4">{selectedCat.name}</h2>
                <p className="text-2xl text-gray-600 mb-6">{selectedCat.breed} • {selectedCat.age}</p>
                <div className="text-4xl font-black text-pink-600 mb-8">{selectedCat.price}</div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">✅</span>
                    <span className="font-nunito">Certyfikat rodowodowy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💉</span>
                    <span className="font-nunito">Pełne szczepienia</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🚗</span>
                    <span className="font-nunito">Transport premium w cenie</span>
                  </div>
                </div>
                <button className="btn-petcare w-full py-4 text-xl mb-4">💬 Kontakt z hodowcą</button>
                <button className="btn-petcare w-full py-4 text-xl bg-gradient-to-r from-purple-500 to-indigo-600">🛒 Kup teraz</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-slate-900 to-purple-900 text-white py-20 px-4 sm:px-6 lg:px-8 mt-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl flex items-center justify-center text-3xl">😻</div>
              <div>
                <h3 className="text-3xl font-black font-nunito">CAT PURRE</h3>
                <p className="text-sm text-gray-400">Premium Cat Marketplace</p>
              </div>
            </div>
            <p className="text-gray-400 font-nunito leading-relaxed mb-8 text-lg">
              Nr 1 platforma rasowych kotów w Polsce • Certyfikowani hodowcy • Blockchain verification • Transport premium
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold font-nunito mb-6">Szybki dostęp</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white">Katalog kotów</a></li>
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white">Hodowcy VIP</a></li>
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold font-nunito mb-6">Wsparcie</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white">Kontakt 24/7</a></li>
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white">Regulamin</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-16 pt-12 text-center">
          <p className="text-gray-400 font-nunito text-lg">© 2025 CAT PURRE. Wszystkie prawa zastrzeżone. Made with 😻 for cats</p>
        </div>
      </footer>
    </div>
  )
}

export default App
