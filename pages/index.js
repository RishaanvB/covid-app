import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Box from '../components/Box';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import styles from '../styles/Index.module.css';
// try react error boundaries!!!

function HomePage() {
  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/continents/europe?strict=true`).then(
      (res) => res.json().then((data) => setContinentData(data))
    );
  }, []);

  const [continent, setContinentData] = useState('');
  const displayCountryData = (continent) => {
    setContinentData(continent);
  };
  /* const MapComponent = dynamic(
    () => import('../components/MapComponent'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  ); */
  console.log(continent);

  return (
    <Layout>
      <Navbar displayCountryData={displayCountryData} />
      <div className={styles.gridContainer}>
        <section className={styles.box1}>
          <h1>Total Deaths: {continent?.continent}</h1>
          <h2>
            {continent?.deaths
              ? continent.deaths?.toLocaleString()
              : 'loading...'}
          </h2>

          <p>
            {continent?.deathsPerOneMillion
              ? `${continent.deathsPerOneMillion
                  ?.toFixed(0)
                  .toLocaleString()} per million`
              : 'Loading...'}
          </p>
        </section>
        <section className={styles.box2}>
          <h1>Deaths Today: {continent?.continent}</h1>
          <h2> {continent?.todayDeaths?.toLocaleString()}</h2>
          <p>Population: {continent?.population?.toLocaleString()}</p>
        </section>
        <section className={styles.info}>
          <h3>{continent?.continent}</h3>
          <ul className={styles.infoList}>
            <li>Total Countries: {continent?.countries?.length}</li>
            <li>Total Recovered: {continent?.recovered}</li>
            <li>Total Cases: {continent?.cases}</li>
            <li>Today Recovered: {continent?.todayRecovered}</li>
            <li>Today Cases: {continent?.todayCases}</li>
            <br />
            <li>Updated since:</li>
            <li> {Date(continent?.updated)}</li>
          </ul>
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
