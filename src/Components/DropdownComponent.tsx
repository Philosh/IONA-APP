import React, { useContext } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../App";

const catAPIURL = process.env.REACT_APP_API_URL;
const breedsEndpoint = "/breeds";

type CatBreed = {
  id: string;
  name: string;
};

const ToggleButton = styled(Dropdown.Toggle)`
  width: 12em;
  text-align: left;
  border-color: #737373;
`;

const DropDown: React.FC = () => {
  const { breedSelect, setBreedSelect } = useContext(AppContext);

  const { data: catBreeds, isLoading } = useQuery(["catBreeds"], async () => {
    const res = await Axios.get(catAPIURL + breedsEndpoint, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    return res.data;
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Dropdown>
      <ToggleButton variant="light" id="dropdown-basic">
        {breedSelect}
      </ToggleButton>
      <Dropdown.Menu>
        {catBreeds.map((e: CatBreed) => (
          <Dropdown.Item onClick={() => setBreedSelect(e.name)} key={e.id}>
            {e.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
