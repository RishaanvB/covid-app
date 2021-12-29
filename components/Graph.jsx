import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function Graph({ continent }) {


  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: allCountries, error } = useSWR(
    'https://disease.sh/v3/covid-19/countries',
    fetcher
  );
  const countries = allCountries?.filter(
    (c) => c.continent === continent?.continent
    );
    
    return <div>{countries?.map(country => <li key={country.countryInfo._id}>{country.country} { country.deaths}</li>)}</div>;
}
