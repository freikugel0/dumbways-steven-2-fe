import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Post } from "./pages/Post";
import { PostDetail } from "./pages/PostDetail";
import { MessageSquareText } from "lucide-react";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col items-start p-6 gap-4">
          <NavigationMenu className="p-2 sticky top-0 bg-white rounded-md shadow">
            <NavigationMenuList>
              <NavigationMenuItem className="pr-4">
                <MessageSquareText size={20} />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/posts">Posts</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Post />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
