import "./App.css";
import React, { useState, useEffect } from "react";
import ContainerWrapper from "./Components/ContainerWrapper";
import Title from "./Components/Title";
import Form from "./Components/Form";
import { Divider, Heading } from "@chakra-ui/react";
import Result from "./Components/ResultWarning";
import ResultSuccess from "./Components/ResultSuccess";
import ResultFailed from "./Components/ResultFailed";
import ResultWarning from "./Components/ResultWarning";
import axios from "axios";
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://hackdatadb.documents.azure.com:443/";
const key =
  "XnzdHzA2ntyqvqTUC5QQnwvRaAHWVXzTSpKdmhK7p7hjSszwYbej7n2Ul4XcnmoRjV2vbuwW7E9uACDbmScWIA==";
const client = new CosmosClient({ endpoint, key });
const database = client.database("inspectionData");
const container = database.container("Items");

function App() {
  const [data, setData] = useState();
  const [postcode, setPostCode] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Make a GET request to the desired API endpoint
      const response = await axios.get(
        "https://jubilant-zebra-rq57wq76xgx3pw66-5000.app.github.dev/evaluateproperty/48028039"
      );
      console.log(response.data);
      // Update state with the fetched data
      setData(response.data);
      setLoading(false);
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <ContainerWrapper>
      <Heading as="h2" size="3xl" mb={5} noOfLines={1}>
        Property Data
      </Heading>
      <Divider />

      <Form />
      {/* <Title /> */}
      {/*       
      <ResultWarning />
      <ResultFailed /> */}
    </ContainerWrapper>
  );
}

export default App;
