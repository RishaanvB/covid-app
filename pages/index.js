import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Box from '../components/Box';
import Layout from '../components/Layout';

import styles from '../styles/Index.module.css';
function HomePage() {
  const [data, setData] = useState({});
  const [fake, setFake] = useState();
  // USE NEXTJS SWR TO FETCH DATA: CHECK DOCS: https://swr.vercel.app/
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/continents/europe?strict=true')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  /* const MapComponent = dynamic(
    () => import('../components/MapComponent'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  ); */

  return (
    <Layout>
      <div className={styles.gridContainer}>
        <section className={styles.box1}>
          <h1>Total Deaths: Europe</h1>
          <h2>{data.deaths ? data.deaths?.toLocaleString() : 'loading...'}</h2>

          <p>
            {data.deathsPerOneMillion
              ? `${data.deathsPerOneMillion
                  ?.toFixed(0)
                  .toLocaleString()} per million`
              : 'Loading...'}
          </p>
        </section>
        <section className={styles.box2}>
          <h1>Total Population: Europe</h1>
          <h2>
            {' '}
            {data.todayDeaths
              ? data.todayDeaths?.toLocaleString()
              : 'loading...'}
          </h2>
          <span>less than yesterday</span>
        </section>
        <section className={styles.info}>
          <h3>General Info: Netherlands</h3>
          <h3>Some random info from api</h3>
        </section>

        <section className={styles.map}>
          {/* <MapComponent /> */}
          <div
            style={{
              height: '600px',
              maxWidth: '1200px',
              backgroundColor: '#f1f1f1',
              display: 'grid',
              placeItems: 'center',
              fontSize: '4rem',
            }}>
            Map is not loaded
          </div>
        </section>
        <section className={styles.graph1}>
          <Box>
            <h1>graph with total deaths per country in continent</h1>
          </Box>
        </section>
        <section className={styles.graph2}>
          <Box>
            <h1>
              graph with total deaths per million per country in continent
            </h1>
          </Box>
        </section>
      </div>
    </Layout>
  );
}

export default HomePage;
