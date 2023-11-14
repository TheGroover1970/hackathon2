import './App.css';
import React, { useState, useEffect } from 'react';
const { CosmosClient } = require("@azure/cosmos");

const endpoint = 'https://hackdatadb.documents.azure.com:443/';
const key = 'URcAzX4mV8kxjGRpfQAzQ5HrSh6T0dTxGrKxqpFLOcurFuBDIdylh3AfCNk6LLZ7H6XsMaubGII2ACDbO8J81Q==';

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
    <div>
    <h1>Data from Cosmos DB</h1>
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
  </div>
  );
}

export default App;
