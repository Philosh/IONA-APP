import { useParams } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

import "../App.css";

const catAPIURL = process.env.REACT_APP_API_URL;

const Cat: React.FC = () => {
  const { breedSelect } = useContext(AppContext);
  const { id: catId } = useParams();
  const catDetailEndPoint = `/images/${catId}`;

  const { data: catDetails, isLoading } = useQuery(["catDetails"], async () => {
    const res = await Axios.get(catAPIURL + catDetailEndPoint, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    });
    return res.data;
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const catInfo = catDetails.breeds[0];

  return (
    <Container>
      <Card
        style={{
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "1.5em",
        }}
      >
        <Card.Header
          style={{
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          <Link to={"/"}>
            <Button className="backButton" variant="primary">
              Back
            </Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <Card.Img
            style={{ width: "50%" }}
            variant="top"
            src={`${catDetails.url}`}
          />

          <h2>{catInfo.name}</h2>
          <h5>Origin: {catInfo.origin}</h5>
          <h6>{catInfo.temperament}</h6>
          <p>{catInfo.description}</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cat;
