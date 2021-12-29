import { useEffect, useState } from 'react';

import useSWR from 'swr';

import styles from '../styles/Navbar.module.css';

export default function Navbar({ displayCountryData }) {
  const [continentName, setContinentName] = useState('');
  useEffect(() => {
    setContinentName('north america');
  }, []);
  useEffect(() => {
    displayCountryData(continentData);
  });
  const url = `https://disease.sh/v3/covid-19/continents/${continentName}?strict=true`;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: continentData = 'europe' } = useSWR(url, fetcher);
  const { data: continentNames } = useSWR(
    `https://disease.sh/v3/covid-19/continents`,
    fetcher
  );

  
  // get continentnames from apidata
  const list = continentNames?.map(({ continent }) => (
    <li
      key={continent}
      className={styles.listItem}
      onClick={() => setContinentName(encodeURIComponent(continent))}>
      {continent}
    </li>
  ));
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Covid</div>
      <nav>
        <ul className={styles.list}>{list}</ul>
      </nav>
    </header>
  );
}
