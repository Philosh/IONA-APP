import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { Col, Container, Image, Row } from "react-bootstrap";

import Axios from "axios";

type CatImage = {
  id: string;
  height: number;
  weight: number;
  url: string;
};

const StyledImage = styled(Image)`
  width: 90%;
`;

const ImageContainer = styled(Container)`
  margin-top: 2em;
`;

const ImageCol = styled(Col)``;

const ImageDiv = styled.div`
  margin-top: 2em;
`;

const catAPIURL = process.env.REACT_APP_API_URL;
const catImagesEndPoint = `/images/search?limit=100&breed_ids=beng&api_key=${process.env.REACT_APP_API_KEY}`;
console.log(catAPIURL + catImagesEndPoint);
const CatList: React.FC = () => {
  const { breedSelect, setBreedSelect } = useContext(AppContext);

  const { data: catList, isLoading } = useQuery(["catList"], async () => {
    const res = await Axios.get(catAPIURL + catImagesEndPoint, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    console.log("Res", res.data);
    return res.data;
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <ImageContainer>
        <Row>
          {catList.map((cat: CatImage) => {
            return (
              <ImageCol xs={6} md={3} lg={3} key={cat.id}>
                <ImageDiv>
                  <StyledImage src={cat.url}></StyledImage>
                </ImageDiv>
              </ImageCol>
            );
          })}
        </Row>
      </ImageContainer>
    </div>
  );
};

export default CatList;
