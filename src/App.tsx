import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Home } from "./pages/Home";
import { ShoppingCart } from "lucide-react";
import { Product } from "./pages/Product";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col items-start p-6 gap-4">
          <NavigationMenu className="sticky top-0 p-2 bg-white w-full shadow rounded-md">
            <NavigationMenuList>
              <NavigationMenuItem className="pr-4">
                <ShoppingCart size={20} />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/cart">Cart</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
