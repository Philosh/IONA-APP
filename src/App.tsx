import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CatDetails, CatBreed, AppContextType } from "./ModelTypes/Models";
import DropDown from "./Components/DropdownComponent";
import CatList from "./Components/CatListComponent";
import CatDetailComponent from "./Components/CatDetailsComponent";
export type { AppContextType } from "./ModelTypes/Models";

const iAppContextState = {
  breedSelect: { name: "Select  Breed", id: "" },
  setBreedSelect: () => {},
  catBreedList: [],
  setCatBreedList: () => {},
  catDetailsList: [],
  setCatDetailsList: () => {},
  catsDisplayed: [],
  setCatsDisplayed: () => {},
};

export const AppContext = createContext<AppContextType>(iAppContextState);

const App = () => {
  const [breedSelect, setBreedSelect] = useState({
    name: "Select Breed",
    id: "",
  });

  const [catBreedList, setCatBreedList] = useState<CatBreed[]>([]);
  const [catDetailsList, setCatDetailsList] = useState<CatDetails[]>([]);
  const [catsDisplayed, setCatsDisplayed] = useState<CatDetails[]>([]);

  const client = new QueryClient();
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          breedSelect,
          setBreedSelect,
          catBreedList,
          setCatBreedList,
          catDetailsList,
          setCatDetailsList,
          catsDisplayed,
          setCatsDisplayed,
        }}
      >
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
              <Route path="/:id" element={<CatDetailComponent />}></Route>
            </Routes>
          </Router>
        </QueryClientProvider>
      </AppContext.Provider>
    </div>
  );
};

export default App;
