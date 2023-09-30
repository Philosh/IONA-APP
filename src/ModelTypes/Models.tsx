export type CatDetails = {
  id: string;
  height: number;
  weight: number;
  url: string;
};

export type CatBreed = {
  id: string;
  name: string;
};

export type AppContextType = {
  breedSelect: {
    name: string;
    id: string;
  };
  setBreedSelect: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  catBreedList: CatBreed[];
  setCatBreedList: React.Dispatch<React.SetStateAction<CatBreed[]>>;
  catDetailsList: CatDetails[];
  setCatDetailsList: React.Dispatch<React.SetStateAction<CatDetails[]>>;
  catsDisplayed: CatDetails[];
  setCatsDisplayed: React.Dispatch<React.SetStateAction<CatDetails[]>>;
};
