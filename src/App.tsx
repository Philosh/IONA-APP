import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, createContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import DropDown from "./Components/DropdownComponent";
import CatList from "./Components/CatListComponent";

type AppContextType = {
  breedSelect: {
    name: string;
    id: string;
  };
  setBreedSelect: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
};

const iAppContextState = {
  breedSelect: { name: "Select Breed", id: "" },
  setBreedSelect: () => {},
};

export const AppContext = createContext<AppContextType>(iAppContextState);

function App() {
  const [breedSelect, setBreedSelect] = useState({
    name: "Select Breed",
    id: "",
  });
  const client = new QueryClient();
  return (
    <div className="App">
      <h1>Cat Browser</h1>
      <p>Breed</p>
      <AppContext.Provider value={{ breedSelect, setBreedSelect }}>
        <QueryClientProvider client={client}>
          <DropDown></DropDown>
          <CatList></CatList>
        </QueryClientProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
