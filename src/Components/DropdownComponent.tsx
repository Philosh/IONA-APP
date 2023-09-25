import React, { useContext } from "react";
import Axios from "axios";
import styled from "styled-components";
import { Dropdown, Alert } from "react-bootstrap";
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

  const {
    data: catBreeds,
    isFetching,
    isLoading,
    isError,
  } = useQuery(["catBreeds", breedSelect], async () => {
    const res = await Axios.get(catAPIURL + breedsEndpoint, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    return res.data;
  });

  if (isFetching) {
    return <h1>Loading DropDown...</h1>;
  }

  if (isError) {
    return (
      <Alert
        style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
        variant="warning"
      >
        “Apologies but we could not load cat Breeds for you at this time! Miau!”
      </Alert>
    );
  }

  return (
    <Dropdown>
      <ToggleButton variant="light" id="dropdown-basic">
        {breedSelect?.name}
      </ToggleButton>
      <Dropdown.Menu>
        {catBreeds &&
          catBreeds.map((e: CatBreed) => (
            <Dropdown.Item onClick={() => setBreedSelect(e)} key={e.id}>
              {e.name}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
