import { useState } from 'react';
import { Menu, X, Coffee, Package, BookOpen, ClipboardList, Wifi, WifiOff } from 'lucide-react';

// Componente InstallPWA
function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useState(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-neutral-800 text-neutral-50 px-6 py-4 rounded-xl shadow-2xl z-50 max-w-sm">
      <p className="text-sm mb-3">Instala Coffeel en tu dispositivo</p>
      <div className="flex gap-3">
        <button
          onClick={handleInstall}
          className="px-4 py-2 bg-amber-700 hover:bg-amber-800 rounded-lg text-sm font-medium transition-colors"
        >
          Instalar
        </button>
        <button
          onClick={() => setShowInstall(false)}
          className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm transition-colors"
        >
          Después
        </button>
      </div>
    </div>
  );
}

// Header Component
function Header({ onMenuToggle, isOnline }) {
  return (
    <header className="bg-neutral-50 border-b border-neutral-200 shadow-sm fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between px-5 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Abrir menú"
          >
            <Menu size={22} className="text-neutral-700" />
          </button>
          <div className="flex items-center gap-2">
            <Coffee size={24} className="text-amber-800" />
            <h1 className="text-xl font-light tracking-wide text-neutral-800">coffeel</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi size={18} className="text-emerald-600" />
          ) : (
            <WifiOff size={18} className="text-rose-500" />
          )}
          <span className="text-xs font-light text-neutral-600">
            {isOnline ? 'Conectado' : 'Sin conexión'}
          </span>
        </div>
      </div>
    </header>
  );
}

// Sidebar Component
function Sidebar({ isOpen, onClose, currentView, onViewChange }) {
  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Coffee },
    { id: 'products', label: 'Catálogo', icon: Package },
    { id: 'methods', label: 'Métodos', icon: BookOpen },
    { id: 'journal', label: 'Mi Diario', icon: ClipboardList },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-neutral-50 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-lg font-light text-neutral-700">Navegación</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={22} className="text-neutral-600" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onViewChange(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentView === item.id
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'hover:bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-light">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-200 py-8 mt-auto">
      <div className="container mx-auto px-5 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-light text-lg flex items-center gap-2 justify-center md:justify-start">
              <Coffee size={18} className="text-amber-600" />
              coffeel
            </p>
            <p className="text-sm text-neutral-400 font-light mt-1">Tu compañero cafetero</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-neutral-400 font-light">© 2025 Coffeel</p>
            <p className="text-xs text-neutral-500 mt-1 font-light">Funciona offline</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Home View
function HomeView() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <Coffee size={48} className="text-amber-800 mx-auto mb-4" />
        <h2 className="text-4xl font-light text-neutral-800 mb-3">Bienvenido a Coffeel</h2>
        <p className="text-neutral-600 font-light max-w-2xl mx-auto">
          Explora el mundo del café desde tu dispositivo, incluso sin conexión
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-neutral-50 p-8 rounded-2xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Package size={24} className="text-amber-800" />
          </div>
          <h3 className="text-xl font-light text-neutral-800 mb-2">Catálogo Premium</h3>
          <p className="text-neutral-600 font-light text-sm">
            Granos selectos, equipos profesionales y accesorios esenciales
          </p>
        </div>

        <div className="bg-neutral-50 p-8 rounded-2xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <BookOpen size={24} className="text-emerald-700" />
          </div>
          <h3 className="text-xl font-light text-neutral-800 mb-2">Métodos & Orígenes</h3>
          <p className="text-neutral-600 font-light text-sm">
            Aprende técnicas de preparación y conoce orígenes únicos
          </p>
        </div>

        <div className="bg-neutral-50 p-8 rounded-2xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
            <ClipboardList size={24} className="text-rose-700" />
          </div>
          <h3 className="text-xl font-light text-neutral-800 mb-2">Tu Diario Cafetero</h3>
          <p className="text-neutral-600 font-light text-sm">
            Registra catas, recetas favoritas y cafés por probar
          </p>
        </div>
      </div>
    </div>
  );
}

// Products View
function ProductsView() {
  const products = [
    { 
      id: 1, 
      name: 'Granos Colombia Supremo', 
      price: 24.50, 
      category: 'Granos de Café',
      origin: 'Huila, Colombia',
      notes: 'Chocolate, caramelo, nuez'
    },
    { 
      id: 2, 
      name: 'Granos Etiopía Yirgacheffe', 
      price: 28.00, 
      category: 'Granos de Café',
      origin: 'Yirgacheffe, Etiopía',
      notes: 'Floral, cítrico, té negro'
    },
    { 
      id: 3, 
      name: 'Prensa Francesa 1L', 
      price: 45.00, 
      category: 'Equipos',
      origin: 'Acero inoxidable',
      notes: 'Vidrio borosilicato'
    },
    { 
      id: 4, 
      name: 'Molinillo Manual Hario', 
      price: 52.00, 
      category: 'Equipos',
      origin: 'Japón',
      notes: 'Cerámica cónica'
    },
    { 
      id: 5, 
      name: 'Chemex 6 Tazas', 
      price: 58.00, 
      category: 'Equipos',
      origin: 'Vidrio soplado',
      notes: 'Filtros incluidos'
    },
    { 
      id: 6, 
      name: 'Báscula Digital', 
      price: 32.00, 
      category: 'Accesorios',
      origin: 'Precisión 0.1g',
      notes: 'Con temporizador'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-light text-neutral-800 mb-2">Catálogo</h2>
        <p className="text-neutral-600 font-light">Productos selectos para tu experiencia cafetera</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-neutral-50 rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-all group"
          >
            <div className="bg-gradient-to-br from-amber-50 to-neutral-100 h-48 flex items-center justify-center border-b border-neutral-200">
              <Coffee size={56} className="text-amber-800 opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <div className="p-6">
              <span className="text-xs font-light text-neutral-500 uppercase tracking-wide">
                {product.category}
              </span>
              <h3 className="text-lg font-light text-neutral-800 mt-2 mb-1">{product.name}</h3>
              <p className="text-sm text-neutral-600 font-light mb-1">{product.origin}</p>
              <p className="text-xs text-neutral-500 font-light mb-4">{product.notes}</p>
              <p className="text-2xl font-light text-amber-900">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Methods View
function MethodsView() {
  const methods = [
    { 
      id: 1, 
      title: 'Método V60', 
      origin: 'Japón',
      time: '3-4 min',
      description: 'Filtrado manual que resalta notas brillantes y complejas. Ideal para cafés de origen único con perfiles frutales y florales.',
      steps: ['Molienda media-fina', 'Temperatura 93°C', 'Bloom 30s', 'Vertido circular']
    },
    { 
      id: 2, 
      title: 'Prensa Francesa', 
      origin: 'Francia',
      time: '4-5 min',
      description: 'Inmersión completa que produce un café con cuerpo y textura sedosa. Perfecto para cafés con notas de chocolate y frutos secos.',
      steps: ['Molienda gruesa', 'Agua 96°C', 'Reposo 4 min', 'Presión suave']
    },
    { 
      id: 3, 
      title: 'Espresso Italiano', 
      origin: 'Italia',
      time: '25-30s',
      description: 'Extracción a presión que concentra sabores intensos. Base para bebidas lácteas y cafés especiales.',
      steps: ['Molienda fina', 'Temperatura 90-92°C', 'Presión 9 bar', 'Extracción 25-30s']
    },
    { 
      id: 4, 
      title: 'Aeropress', 
      origin: 'Estados Unidos',
      time: '1-2 min',
      description: 'Método versátil con presión de aire. Permite experimentar con diferentes tiempos y temperaturas.',
      steps: ['Molienda media', 'Agua 80-85°C', 'Infusión 1 min', 'Presión controlada']
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-light text-neutral-800 mb-2">Métodos de Preparación</h2>
        <p className="text-neutral-600 font-light">Descubre técnicas para extraer lo mejor de cada grano</p>
      </div>

      <div className="grid gap-6">
        {methods.map((method) => (
          <article 
            key={method.id} 
            className="bg-neutral-50 rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-2xl font-light text-neutral-800">{method.title}</h3>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-light">
                  {method.origin}
                </span>
                <span className="px-3 py-1 bg-neutral-200 text-neutral-700 text-xs rounded-full font-light">
                  {method.time}
                </span>
              </div>
              <p className="text-neutral-600 font-light mb-6 leading-relaxed">
                {method.description}
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {method.steps.map((step, idx) => (
                  <div key={idx} className="bg-white border border-neutral-200 rounded-lg p-3 text-center">
                    <span className="text-xs font-light text-neutral-500">Paso {idx + 1}</span>
                    <p className="text-sm text-neutral-700 font-light mt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// Journal View (Tasks)
function JournalView() {
  const [tastings, setTastings] = useState([
    { id: 1, title: 'Probar Kenya AA', completed: false },
    { id: 2, title: 'Dominar pour-over V60', completed: true },
    { id: 3, title: 'Visitar tostador local', completed: false },
    { id: 4, title: 'Experimentar cold brew', completed: false },
  ]);

  const [recipes] = useState([
    { id: 1, name: 'Latte Perfecto', ratio: '1:3:1', temp: '65°C' },
    { id: 2, name: 'Cortado Doble', ratio: '2:1', temp: '60°C' },
    { id: 3, name: 'Flat White', ratio: '1:2', temp: '60°C' },
  ]);

  const toggleTasting = (id) => {
    setTastings(tastings.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-light text-neutral-800 mb-2">Mi Diario Cafetero</h2>
        <p className="text-neutral-600 font-light">Registra tu viaje en el mundo del café</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Cafés por probar */}
        <div className="bg-neutral-50 rounded-2xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-xl font-light text-neutral-800 mb-4 flex items-center gap-2">
            <ClipboardList size={20} className="text-amber-800" />
            Lista de Deseos
          </h3>
          <ul className="space-y-3">
            {tastings.map((item) => (
              <li 
                key={item.id} 
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTasting(item.id)}
                  className="w-5 h-5 rounded border-neutral-300 text-amber-700 focus:ring-amber-500 cursor-pointer"
                />
                <span className={`flex-1 font-light ${item.completed ? 'line-through text-neutral-400' : 'text-neutral-700'}`}>
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recetas favoritas */}
        <div className="bg-neutral-50 rounded-2xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-xl font-light text-neutral-800 mb-4 flex items-center gap-2">
            <Coffee size={20} className="text-amber-800" />
            Recetas Favoritas
          </h3>
          <div className="space-y-3">
            {recipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="p-4 bg-white rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                <h4 className="font-light text-neutral-800 mb-2">{recipe.name}</h4>
                <div className="flex gap-4 text-sm">
                  <span className="text-neutral-600 font-light">
                    <span className="text-neutral-500">Ratio:</span> {recipe.ratio}
                  </span>
                  <span className="text-neutral-600 font-light">
                    <span className="text-neutral-500">Temp:</span> {recipe.temp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registro de catas */}
      <div className="bg-neutral-50 rounded-2xl shadow-sm border border-neutral-200 p-6">
        <h3 className="text-xl font-light text-neutral-800 mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-amber-800" />
          Últimas Catas
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-neutral-200">
            <p className="text-xs text-neutral-500 font-light mb-2">28 Sep 2025</p>
            <h4 className="font-light text-neutral-800 mb-2">Guatemala Antigua</h4>
            <p className="text-sm text-neutral-600 font-light">Chocolate oscuro, cítricos suaves, final dulce</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-neutral-200">
            <p className="text-xs text-neutral-500 font-light mb-2">25 Sep 2025</p>
            <h4 className="font-light text-neutral-800 mb-2">Brasil Santos</h4>
            <p className="text-sm text-neutral-600 font-light">Nueces, caramelo, cuerpo medio, baja acidez</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useState(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductsView />;
      case 'methods':
        return <MethodsView />;
      case 'journal':
        return <JournalView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        onMenuToggle={() => setMenuOpen(true)} 
        isOnline={isOnline}
      />
      
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="flex-1 container mx-auto px-5 py-8 mt-20 max-w-7xl">
        {renderView()}
      </main>
      
      <Footer />
      <InstallPWA />
    </div>
  );
}