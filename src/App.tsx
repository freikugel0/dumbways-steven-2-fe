import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import Weather from "./components/weather";

function App() {
  const [keyword, setKeyword] = useState("oregon,us");
  const debouncedKeyword = useDebounce(keyword, 500);

  return (
    <div className="flex justify-center min-h-screen text-black dark:text-gray-200 bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col justify-center gap-2 w-sm p-4">
        <div className="flex flex-col gap-1">
          <input
            className="border-b p-2 text-sm outline-none"
            type="text"
            placeholder="Search city and/or country"
            onChange={(e) => setKeyword(e.currentTarget.value)}
          />
        </div>
        <Weather keyword={debouncedKeyword} />
      </div>
    </div>
  );
}

export default App;
