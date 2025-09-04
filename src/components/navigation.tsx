import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";
import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const { token, logout } = useAuth();

  return (
    <div className="flex justify-between w-full sticky top-0">
      <NavigationMenu className="p-2 bg-white w-full shadow rounded-md">
        <NavigationMenuList>
          <NavigationMenuItem className="pr-4">
            <Clapperboard size={20} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/movies">Movies</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="p-2 bg-white w-full shadow rounded-md">
        <NavigationMenuList>
          {token ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink onClick={() => logout()}>
                  <p className="hover:cursor-pointer">Logout</p>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/favorites">Favorites</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          ) : (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/login">Login</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
