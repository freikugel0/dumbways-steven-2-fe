import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodoProvider } from "./contexts/Todo";
import { Home } from "./pages/Home";
import { Todo } from "./pages/Todo";
import { Navigation } from "./components/navigation";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
      <BrowserRouter>
        <TodoProvider>
          <ThemeProvider defaultTheme="dark">
            <div className="flex flex-col items-start p-6 gap-4 min-h-screen">
              <Navigation />
              <div className="flex-1 w-full h-full flex">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/todos" element={<Todo />} />
                </Routes>
              </div>
            </div>
          </ThemeProvider>
        </TodoProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
