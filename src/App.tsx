import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navigation } from "./components/navigation";
import { AuthProvider } from "./contexts/Auth";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Cart } from "./pages/Cart";
import { Product } from "./pages/Product";
import { ProductDetail } from "./pages/ProductDetail";
import { PrivateRoute } from "./components/private-route";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <div className="flex flex-col items-start p-6 gap-4 min-h-screen">
            <Navigation />
            <div className="flex-1 w-full h-full flex">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Product />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
