import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Box from '../components/Box';

import Graph from '../components/Graph';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import styles from '../styles/Index.module.css';
// try react error boundaries!!!

function HomePage() {
  // useEffect(() => {
  //   fetch(`https://disease.sh/v3/covid-19/continents/europe?strict=true`).then(
  //     (res) => res.json().then((data) => setContinentData(data))
  //   );
  // }, []);

  const [continent, setContinentData] = useState('');
  const displayCountryData = (continent) => {
    setContinentData(continent);
  };
  /* const MapComponent = dynamic(
    () => import('../components/MapComponent'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  ); */

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
            {/* omitting ternary 'if' will result in react hydration error for the timestamp. There will be a small difference in first render components and ssr components::
            
            Warning: Text content did not match. Server: "Wed Dec 29 2021 21:23:24 GMT+0100 (Central European Standard Time)" Client: "Wed Dec 29 2021 21:23:25 GMT+0100 (Central European Standard Time)"
            
            */}
            <li> {continent ? Date(continent.updated) : 'Calculating...'}</li>
          </ul>
        </section>
        <Graph continent={continent} />
        <section className={styles.map}>
          {/* <MapComponent /> */}
          <div
            style={{
              height: '600px',
              maxWidth: '1800px',
              backgroundColor: '#f1f1f1',
              display: 'grid',
              placeItems: 'center',
              fontSize: '4rem',
            }}>
            Map is not loaded
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default HomePage;
