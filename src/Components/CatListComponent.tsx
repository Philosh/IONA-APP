import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import "../App.css";
import Button from "react-bootstrap/Button";

import { Col, Container, Image, Row } from "react-bootstrap";

import Axios from "axios";

type CatImage = {
  id: string;
  height: number;
  weight: number;
  url: string;
};

const StyledImage = styled(Image)`
  width: 100%;
`;

const ImageContainer = styled(Container)`
  margin-top: 2em;
`;

const ImageCol = styled(Col)``;

const ImageDiv = styled.div`
  padding-bottom: 2em;
  margin-top: 2em;
  border: 1px solid black;
  border-radius: 0 0 5px 5px;
`;

const catAPIURL = process.env.REACT_APP_API_URL;
const CatList: React.FC = () => {
  const { breedSelect } = useContext(AppContext);
  const nImages = breedSelect.id === "" ? "12" : "100";
  const catImagesEndPoint = `/images/search?limit=${nImages}&breed_ids=${breedSelect.id}&api_key=${process.env.REACT_APP_API_KEY}`;
  console.log("breedSelect", breedSelect);
  console.log(catAPIURL + catImagesEndPoint);

  const {
    data: catList,
    isLoading,
    refetch,
  } = useQuery(["catList"], async () => {
    const res = await Axios.get(catAPIURL + catImagesEndPoint, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    console.log("Res", res.data);
    return res.data;
  });

  useEffect(() => {
    refetch();
  }, [breedSelect]);

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
                  <Button className="detailButton" variant="primary">
                    View Details
                  </Button>
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
