import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import "../App.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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
    return res.data;
  });

  const [catListToShow, setCatListToShow] = useState<CatImage[]>();
  const [totalCats, setTotalCats] = useState<CatImage[]>();
  const catsPerLoad = 6;

  const ref = useRef(catsPerLoad);

  useEffect(() => {
    if (catList) {
      setTotalCats(catList.slice(0, catsPerLoad));
      ref.current += catsPerLoad;
    } else {
      setTotalCats(catList);
    }
  }, [catList]);

  useEffect(() => {
    ref.current = 0;
    refetch();
  }, [breedSelect]);

  const handleShowMoreCats = () => {
    ref.current += catsPerLoad;
    console.log("ref ", ref.current);
    setTotalCats(catList.slice(0, ref.current));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else
    return (
      <div>
        <ImageContainer>
          <Row>
            {totalCats?.map((cat: CatImage) => {
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
          {catList?.length}
          {ref.current < catList.length + catsPerLoad && (
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
