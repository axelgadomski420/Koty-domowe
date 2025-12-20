import React, { useState } from 'react'

function App() {
  const [showChat, setShowChat] = useState(false)
  const [activeTab, setActiveTab] = useState('feed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* Navbar - Z chat button */}
      <nav className="glass-card fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-8 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
              <span className="text-2xl">🐾</span>
            </div>
            <h2 className="text-2xl font-black font-nunito petcare-gradient">PetCare</h2>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="font-nunito font-semibold text-gray-700 hover:text-cyan-600 transition-colors">Strona główna</a>
            <a href="#pets" className="font-nunito font-semibold text-gray-700 hover:text-cyan-600 transition-colors">Zwierzęta</a>
            <a href="#social" className="font-nunito font-semibold text-gray-700 hover:text-cyan-600 transition-colors">Społeczność</a>
            <div className="relative">
              <button 
                onClick={() => setShowChat(!showChat)}
                className="relative p-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="text-xl">💬</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs text-white rounded-full flex items-center justify-center font-bold animate-pulse">12</span>
              </button>
            </div>
            <button className="btn-petcare text-sm px-5 py-2">Zaloguj się</button>
          </div>
        </div>
      </nav>

      {/* SOCIAL DASHBOARD */}
      <section id="social" className="pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex bg-white/80 backdrop-blur-xl rounded-3xl p-1 mb-8 shadow-2xl">
            <button 
              onClick={() => setActiveTab('feed')}
              className={`flex-1 py-4 px-6 font-nunito font-bold rounded-2xl transition-all ${activeTab === 'feed' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl' : 'text-gray-700 hover:text-cyan-600'}`}
            >
              🐾 Feed
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex-1 py-4 px-6 font-nunito font-bold rounded-2xl transition-all ${activeTab === 'messages' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl' : 'text-gray-700 hover:text-cyan-600'}`}
            >
              💬 Wiadomości (23)
            </button>
            <button 
              onClick={() => setActiveTab('followers')}
              className={`flex-1 py-4 px-6 font-nunito font-bold rounded-2xl transition-all ${activeTab === 'followers' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl' : 'text-gray-700 hover:text-cyan-600'}`}
            >
              👥 Obserwujący (1.2K)
            </button>
          </div>

          {/* CONTENT */}
          {activeTab === 'feed' && (
            <div className="space-y-6">
              {/* Create Post */}
              <div className="glass-card p-8 rounded-3xl">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-rose-500 rounded-3xl flex items-center justify-center text-white font-bold text-xl animate-float">
                    🐕
                  </div>
                  <div className="flex-1">
                    <textarea 
                      placeholder="Co słychać u Twojego pupila? 📸🐾" 
                      className="w-full p-4 bg-white/50 border border-white/30 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 font-nunito text-lg"
                      rows={3}
                    />
                    <div className="flex items-center mt-4 space-x-4">
                      <button className="text-2xl hover:scale-110 p-2 rounded-xl hover:bg-gray-100 transition-all">📸</button>
                      <button className="text-2xl hover:scale-110 p-2 rounded-xl hover:bg-gray-100 transition-all">🎥</button>
                      <button className="text-2xl hover:scale-110 p-2 rounded-xl hover:bg-gray-100 transition-all">😊</button>
                      <button className="ml-auto btn-petcare px-8 py-3 text-lg">Opublikuj</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Posts */}
              <div className="glass-card p-8 rounded-3xl">
                <div className="flex items-start space-x-4 mb-6">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&round" className="w-14 h-14 rounded-3xl shadow-md" />
                  <div>
                    <div className="font-bold font-nunito text-lg">Anna K. 🐶</div>
                    <div className="text-sm text-gray-500">2h temu</div>
                  </div>
                </div>
                <p className="text-xl font-nunito mb-4">Max po groomingu! ✨🐕</p>
                <div className="flex space-x-2 text-2xl mb-6">
                  <button className="p-3 hover:bg-red-50 rounded-2xl hover:scale-110 transition-all">❤️</button>
                  <button className="p-3 hover:bg-blue-50 rounded-2xl hover:scale-110 transition-all">💬</button>
                  <button className="p-3 hover:bg-sky-50 rounded-2xl hover:scale-110 transition-all">🔄</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Conversations List */}
              <div className="lg:col-span-1 space-y-4">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="glass-card p-4 cursor-pointer hover:bg-white/90 transition-all rounded-2xl flex items-center space-x-4">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&round" className="w-12 h-12 rounded-2xl shadow-md" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold font-nunito truncate">Kasia W. 🐱</div>
                      <div className="text-sm text-gray-500 truncate">Super piesek! Gdzie go wzięłaś? 😍</div>
                    </div>
                    <div className="text-xs text-green-500 font-bold">online</div>
                  </div>
                ))}
              </div>

              {/* Active Chat */}
              <div className="lg:col-span-2">
                <div className="glass-card p-6 rounded-3xl h-[600px] flex flex-col">
                  <div className="flex items-center space-x-4 mb-6 p-4 border-b border-white/30">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&round" className="w-12 h-12 rounded-2xl" />
                    <div>
                      <div className="font-bold font-nunito text-xl">Kasia W.</div>
                      <div className="text-sm text-green-500">online</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
                    <div className="flex items-end space-x-3">
                      <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&round" className="w-10 h-10 rounded-full" />
                      <div className="bg-white/70 p-4 rounded-2xl rounded-br-sm max-w-xs">
                        <p className="font-nunito">Cześć! Widziałam Twojego Maxa na feedzie. Wygląda obłędnie po groomingu! 😍 Gdzie chodzicie?</p>
                      </div>
                    </div>
                    <div className="flex items-end justify-end space-x-3 space-x-reverse">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl rounded-bl-sm max-w-xs text-white">
                        <p className="font-nunito">Dzięki! 😊 Chodzimy do PetSpa na Marszałkowskiej. Max jest zachwycony!</p>
                      </div>
                      <img src="https://images.unsplash.com/photo-1500622904294-e1653bb1ca6c?w=40&h=40&fit=crop&round" className="w-10 h-10 rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border-t border-white/30">
                    <button className="text-2xl p-2 hover:bg-gray-100 rounded-2xl">😊</button>
                    <input 
                      type="text" 
                      placeholder="Wpisz wiadomość..." 
                      className="flex-1 p-4 bg-white/50 border border-white/30 rounded-3xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-nunito"
                    />
                    <button className="btn-petcare px-6 py-3 text-lg">Wyślij</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'followers' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <div key={i} className="glass-card p-6 text-center cursor-pointer hover:scale-105 transition-all rounded-3xl">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500+i*100}?w=120&h=120&fit=crop&round`} 
                    className="w-24 h-24 mx-auto rounded-3xl shadow-2xl mb-4" 
                  />
                  <h3 className="font-bold font-nunito text-lg mb-2">Użytkownik {i}</h3>
                  <div className="text-sm text-gray-500 mb-4">🐶 3 pupile</div>
                  <div className="flex items-center justify-center space-x-2 text-sm bg-white/50 px-4 py-2 rounded-2xl">
                    <span className="text-sm font-bold text-cyan-600">1.2K followers</span>
                    <button className="ml-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-1 rounded-xl text-xs font-bold hover:scale-105 transition-all">
                      Obserwuj
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-80 h-96 glass-card rounded-3xl shadow-2xl z-40 flex flex-col">
          <div className="p-6 border-b border-white/30 flex items-center justify-between">
            <h3 className="font-bold font-nunito text-xl">Wiadomości</h3>
            <button onClick={() => setShowChat(false)} className="text-2xl hover:scale-110">✕</button>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-2xl cursor-pointer hover:bg-white/70">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold">🐕</div>
              <div>
                <div className="font-bold font-nunito">Kasia W.</div>
                <div className="text-sm text-gray-600">Widziałaś nowe szczeniaczki? 🐶</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-2xl cursor-pointer hover:bg-white/70">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center text-white font-bold">🐱</div>
              <div>
                <div className="font-bold font-nunito">Tomek P.</div>
                <div className="text-sm text-gray-600">Twój post o Maxie viral! 🔥</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      <button className="md:hidden fixed bottom-6 left-6 z-40 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl shadow-2xl hover:shadow-3xl transition-all">
        <span className="text-2xl">☰</span>
      </button>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 mt-32">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-nunito text-lg">🐾 PetCare - Społeczność miłośników zwierząt | 10K+ aktywnych użytkowników</p>
        </div>
      </footer>
    </div>
  )
}

export default App

