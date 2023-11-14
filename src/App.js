import './App.css';
import React, { useState, useEffect } from 'react';
import ContainerWrapper from './Components/ContainerWrapper';
import Title from './Components/Title';
import Form from './Components/Form';
import { Heading } from '@chakra-ui/react'
const { CosmosClient } = require("@azure/cosmos"); 

const endpoint = 'https://hackdatadb.documents.azure.com:443/';
const key = 'XnzdHzA2ntyqvqTUC5QQnwvRaAHWVXzTSpKdmhK7p7hjSszwYbej7n2Ul4XcnmoRjV2vbuwW7E9uACDbmScWIA==';
const client = new CosmosClient({ endpoint, key });
const database = client.database('inspectionData');
const container = database.container('Items');

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // Define the query
        const querySpec = {
          query: 'SELECT * from c WHERE c["Property Address"] like "%Mitcham%"',
        };

        // Execute the query
        const { resources: items } = await container.items.query(querySpec).fetchAll();

        // Update state with the fetched data
        setData(items);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    // Call the async function
    fetchData();
  }, []); 
 
  
console.log(data);
  return (
    <ContainerWrapper>
      <Heading as='h2' size='3xl' noOfLines={1}>Property Data</Heading>
      <Form />
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <strong>Property Address:</strong> {item['Property Address']}
            </li>
            // Add more properties as needed
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
      <Title>Property Details</Title>
    </ContainerWrapper>
  );
}

export default App;
