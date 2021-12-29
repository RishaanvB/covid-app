import useSWR from 'swr';

function useFetchContinent({continent}) {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    `https://disease.sh/v3/covid-19/continents/${continent}?strict=true`,
    fetcher
  );
  return {
    continent: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFetchContinent;
