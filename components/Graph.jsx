import useSWR from 'swr';
import styles from '../styles/Graph.module.css';
import Image from 'next/image';

export default function Graph({ continent }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: allCountries, error } = useSWR(
    'https://disease.sh/v3/covid-19/countries',
    fetcher
  );
  if (!allCountries) return <h1>Loading...</h1>;
  if (error) return <h1>error</h1>;

  const countries = allCountries
    ?.filter((c) => c.continent === continent?.continent)
    .sort((a, b) => b.deaths - a.deaths);


  const rate = countries[0]?.deaths || 1;

  return (
    <div className={styles.container}>
      <ul className={styles.countryList}>
        {countries?.map((country, index) => (
          <li key={country.countryInfo._id} className={styles.listItem}>
            <span className={styles.imageContainer}>
              {' '}
              <Image
                src={country.countryInfo.flag}
                width={25}
                height={15}
                alt={`flag of ${country.country}`}
              />
            </span>
            <span
              style={{
                width: `${(country.deaths / rate) * 20}rem`,
                minWidth: `${2}rem`,
                backgroundColor: `hsl(0, 75%, ${
                  ((1 - 1 / (index + 1)) / 1) * 40
                }%)`,
              }}
              className={styles.countryDeaths}></span>
            <span className={styles.countryNames}>{country.country}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
