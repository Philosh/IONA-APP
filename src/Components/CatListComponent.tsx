import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";
import { CatDetails } from "../ModelTypes/Models";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import "../App.css";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row, Button, Alert } from "react-bootstrap";
import Axios from "axios";

const StyledImage = styled(Image)`
  width: 100%;
`;

const ImageContainer = styled(Container)`
  margin-top: 2em;
`;

const ImageCol = styled(Col)``;

const ImageDiv = styled.div`
  padding-bottom: 2em;
  margin-top: 1.5em;
  border: 1px solid black;
  border-radius: 0 0 5px 5px;
  width: 85%;
`;

const catAPIURL = process.env.REACT_APP_API_URL;
const CatList: React.FC = () => {
  const {
    breedSelect,
    catDetailsList,
    setCatDetailsList,
    catsDisplayed,
    setCatsDisplayed,
  } = useContext(AppContext);
  const nImages = breedSelect.id === "" ? "12" : "100";
  const catImagesEndPoint = `/images/search?limit=${nImages}&breed_ids=${breedSelect.id}&api_key=${process.env.REACT_APP_API_KEY}`;

  const prevSelectName = useRef<string>(breedSelect.name);
  const catsPerLoad = 6;
  const {
    data: catList,
    isFetching,
    refetch,
    isError,
  } = useQuery(
    ["catList"],
    async () => {
      const res = await Axios.get(catAPIURL + catImagesEndPoint, {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
      });
      return res.data;
    },
    { enabled: catDetailsList === undefined || catDetailsList.length === 0 }
  );

  const ref = useRef(catsPerLoad);

  useEffect(() => {
    if (catList?.length > 0) {
      setCatDetailsList(catList);
    }
  }, [catList]);

  useEffect(() => {
    if (catDetailsList === undefined || catDetailsList.length === 0) {
      refetch();
    } else if (prevSelectName.current !== breedSelect.name) {
      ref.current = 0;
      refetch();
    }
  }, [breedSelect]);

  useEffect(() => {
    if (catDetailsList?.length > 0) {
      if (prevSelectName.current !== breedSelect.name) {
        setCatsDisplayed(catDetailsList.slice(0, catsPerLoad));
        prevSelectName.current = breedSelect.name;
      } else {
        ref.current = catsDisplayed.length + 1;
      }
    }
    ref.current += catsPerLoad;
  }, [catDetailsList]);

  const handleShowMoreCats = () => {
    ref.current += catsPerLoad;
    setCatsDisplayed(catDetailsList.slice(0, ref.current));
  };

  if (isFetching) {
    return <h1>Loading Catlist...</h1>;
  } else if (isError) {
    return (
      <Alert
        style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
        variant="warning"
      >
        “Apologies but we could not this cat for you at this time! Miau!”
      </Alert>
    );
  }
  if (breedSelect.name === "Select Breed") {
    return <p style={{ marginTop: "2em" }}>No Cats available</p>;
  } else
    return (
      <div>
        <ImageContainer>
          <Row>
            {catsDisplayed?.map((cat: CatDetails) => {
              return (
                <ImageCol xs={6} md={3} lg={3} key={cat.id}>
                  <ImageDiv>
                    <StyledImage src={cat.url}></StyledImage>

                    <Link to={`/${cat.id}`}>
                      <Button className="detailButton" variant="primary">
                        Details
                      </Button>
                    </Link>
                  </ImageDiv>
                </ImageCol>
              );
            })}
          </Row>
          {catDetailsList.length + catsPerLoad > ref.current && (
            <Button
              style={{ float: "left", marginTop: "3em" }}
              variant="success"
              onClick={handleShowMoreCats}
            >
              Load more
            </Button>
          )}
        </ImageContainer>
      </div>
    );
};

export default CatList;
