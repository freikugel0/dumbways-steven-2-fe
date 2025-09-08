import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/Cart";
import { Home } from "./pages/Home";
import { Navigation } from "./components/navigation";
import { ThemeProvider } from "./components/theme-provider";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <ThemeProvider defaultTheme="dark">
            <div className="flex flex-col items-start p-6 gap-4 min-h-screen">
              <Navigation />
              <div className="flex-1 w-full h-full flex">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </div>
            </div>
          </ThemeProvider>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
