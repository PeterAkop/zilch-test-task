import React, { useEffect, useState } from 'react';

import { Container, Summary } from '../../components';
import { DataProvider } from '../dataContext';
import { getSummary } from '../../api';

const Home = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSummary().then(data => setData(data));
      } catch (error) {
        setError('Something went wrong with Api request');
      }
    };
    fetchData();
  }, []);

  return (
    <DataProvider value={data}>
      <Container>
        {error && <div>{error}</div>}
        <Summary />
      </Container>
    </DataProvider>
  );
};

export default Home;
