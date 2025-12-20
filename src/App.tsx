import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* Navbar */}
      <nav className="glass-card fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-8 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-2xl">🐾</span>
            </div>
            <h2 className="text-2xl font-black font-nunito petcare-gradient">PetCare</h2>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="font-nunito font-semibold text-gray-700 hover:text-cyan-600 transition-colors">Strona główna</a>
            <a href="#pets" className="font-nunito font-semibold text-gray-700 hover:text-cyan-600 transition-colors">Zwierzęta</a>
            <a href="#about" className="font-nunito font-semibold text-gray-700 hover:text-cyan-600 transition-colors">O nas</a>
            <button className="btn-petcare text-sm px-5 py-2">Zaloguj się</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-7xl lg:text-8xl font-black font-nunito mb-8 petcare-gradient drop-shadow-2xl animate-fade-in">
            🐾 PetCare
          </h1>
          <p className="text-3xl lg:text-4xl font-nunito font-semibold text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Znajdź swojego wymarzonego pupila spośród tysięcy zwierząt czekających na nowy dom
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <button className="btn-petcare text-xl px-10 py-4 shadow-2xl">
              🐶 Szukaj psów
            </button>
            <button className="btn-petcare text-xl px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-2xl">
              🐱 Szukaj kotów
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-cyan-600 mb-2">10K+</div>
              <div className="text-gray-600 font-nunito">Szczęśliwych adopcji</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600 font-nunito">Partnerów weterynaryjnych</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 font-nunito">Wsparcie 24h</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section id="pets" className="py-32 px-4 sm:px-6 lg:px-8 -mt-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-black font-nunito mb-6 petcare-gradient">
              Polecane zwierzaki
            </h2>
            <p className="text-xl text-gray-600 font-nunito max-w-2xl mx-auto">
              Te wyjątkowe pupile czekają właśnie na Ciebie!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Pet Card 1 */}
            <div className="glass-card group cursor-pointer rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-2xl">
              <div className="h-64 bg-gradient-to-br from-orange-400 to-pink-500 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop" 
                  alt="Golden Retriever" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  🐕 Adopt me!
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="font-nunito font-semibold text-sm text-green-600">Dostępny natychmiast</span>
                </div>
                <h3 className="text-2xl font-bold font-nunito mb-2 text-gray-800">Max</h3>
                <p className="text-gray-600 font-nunito mb-4">Golden Retriever • 2 lata</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-cyan-600">Darmowa adopcja</span>
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-xl">❤️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pet Card 2 */}
            <div className="glass-card group cursor-pointer rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-2xl">
              <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-500 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop" 
                  alt="British Shorthair" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  🐱 Adopt me!
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="font-nunito font-semibold text-sm text-green-600">Dostępny natychmiast</span>
                </div>
                <h3 className="text-2xl font-bold font-nunito mb-2 text-gray-800">Luna</h3>
                <p className="text-gray-600 font-nunito mb-4">British Shorthair • 1.5 roku</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-cyan-600">Darmowa adopcja</span>
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-xl">❤️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dodatkowe karty - placeholder */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-12 rounded-3xl animate-pulse">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-6"></div>
                <div className="h-8 bg-gray-200 rounded-full mb-4 w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded-full mb-6 w-1/2"></div>
                <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🐾</span>
              </div>
              <h3 className="text-2xl font-black font-nunito">PetCare</h3>
            </div>
            <p className="text-gray-400 font-nunito leading-relaxed mb-8">
              Platforma adopcji zwierząt. Znajdź swojego wymarzonego pupila i daj mu kochający dom.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold font-nunito mb-6">Szybki dostęp</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white transition-colors">Szukaj psów</a></li>
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white transition-colors">Szukaj kotów</a></li>
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white transition-colors">Schroniska</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold font-nunito mb-6">Wsparcie</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white transition-colors">Kontakt</a></li>
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 font-nunito hover:text-white transition-colors">Polityka prywatności</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-12 text-center text-gray-400 font-nunito">
          © 2025 PetCare. Wszystkie prawa zastrzeżone. | Made with ❤️ dla zwierząt
        </div>
      </footer>
    </div>
  )
}

export default App
