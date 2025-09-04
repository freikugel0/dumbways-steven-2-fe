import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navigation } from "./components/navigation";
import { AuthProvider } from "./contexts/Auth";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/private-route";
import { Movie } from "./pages/Movie";
import { Favorite } from "./pages/Favorite";
import { MovieDetail } from "./pages/MovieDetail";

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
                <Route path="/login" element={<Login />} />

                <Route path="/movies" element={<Movie />} />
                <Route path="/movies/:id" element={<MovieDetail />} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/favorites" element={<Favorite />} />
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
