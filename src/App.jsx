import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductsFormPage from './pages/ProductsFormPage';
import ProtectedRoute from './ProtectedRoute';
import { ProductsProvider } from './context/ProductContext';
import NavBar from './components/Navbar';
import NotFound from './pages/NotFound';
import PrincipalPage from './pages/PrincipalPage'; // Agregado nuevo componente PrincipalPage
import ContactoPage from './pages/ContactoPage'; // Agregado ContactoPage
import CategoryFormPage from './pages/CategoryFormPage'; // Ruta para manejo de categorías
import CategoryPage from './pages/CategoryPage'; // Ruta para manejo de categorías
import { CategoriesProvider } from './context/CategoryContext'; // Proveedor de contexto para categorías
import CartPage from './pages/CartPage'; // Ruta para la página del carrito
import { CartProvider } from './context/CartContext'; // Proveedor de contexto del carrito
import PerfilFormPage from './pages/PerfilFormPage.jsx'; // Importa tu página de perfil
import { ProfileProvider } from './context/PerfilContext.jsx'; // Asegúrate de que el nombre coincida
import PerfilPage from './pages/PerfilPage.jsx'; // Importa tu página de perfil


function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CategoriesProvider> {/* Proveedor de contexto para categorías */}
          <CartProvider> {/* Proveedor de contexto para el carrito */}
            <ProfileProvider> {/* Proveedor de contexto para el perfil */}
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <main className='container mx-auto px-10'>
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/principal" element={<PrincipalPage />} /> {/* Nueva ruta principal */}
                   
                    <Route path="/cart" element={<CartPage />} /> {/* Nueva ruta para el carrito */}
                    
                    {/* Rutas de perfiles */}
                    <Route path="/perfil" element={<PerfilFormPage />} /> {/* Página para agregar perfil */}
                    <Route path="/perfiles" element={<PerfilPage/>} /> {/* Página para editar perfil */}

                    {/* Selección de rutas protegidas */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/principal" element={<PrincipalPage />} /> {/* Nueva ruta principal */}
                      <Route path="/contacto" element={<ContactoPage />} /> {/* Nueva ruta contacto */}
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/add-product" element={<ProductsFormPage />} />
                      <Route path="/products/:id" element={<ProductsFormPage />} />
                      <Route path="/categories" element={<CategoryPage />} />
                      <Route path="/add-categories" element={<CategoryFormPage />} /> {/* Nueva ruta para categorías */}
                      <Route path="/categories/:id" element={<CategoryFormPage />} /> {/* Nueva ruta específica por ID */}
                    </Route>

                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </main>
              </BrowserRouter>
            </ProfileProvider>
          </CartProvider>
        </CategoriesProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
