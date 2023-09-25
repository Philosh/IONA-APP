import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import DropDown from "./Components/DropdownComponent";
import CatList from "./Components/CatListComponent";
import CatDetails from "./Components/CatDetailsComponent";

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

const App = () => {
  const [breedSelect, setBreedSelect] = useState({
    name: "Select Breed",
    id: "",
  });

  const client = new QueryClient();
  return (
    <div className="App">
      <AppContext.Provider value={{ breedSelect, setBreedSelect }}>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1>Cat Browser</h1>
                    <p>Breed</p>
                    <DropDown />
                    <CatList />
                  </>
                }
              ></Route>
              <Route path="/:id" element={<CatDetails />}></Route>
            </Routes>
          </Router>
        </QueryClientProvider>
      </AppContext.Provider>
    </div>
  );
};

export default App;
