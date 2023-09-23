import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import { useQuery } from "@tanstack/react-query";

type breedType = {
  name: string;
};

const ToggleButton = styled(Dropdown.Toggle)`
  width: 12em;
  text-align: left;
  border-color: #737373;
`;

const DropDown: React.FC = () => {
  const { data: catBreeds, isLoading } = useQuery(["catB"], () => {
    return Axios.get("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key":
          "live_3FnQv60GWu05p9RV1Dc1FY78iQJYV02k5bIOkpl4o9VJvsbJZ7kQa7R46E6w1ZT7",
      },
    }).then((res) => {
      console.log("Res", res.data);
      return res.data;
    });
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Dropdown>
      <ToggleButton variant="light" id="dropdown-basic">
        Select breed
      </ToggleButton>
      <Dropdown.Menu>
        {catBreeds.map((e: breedType) => (
          <Dropdown.Item href="#/action-1">{e.name}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
