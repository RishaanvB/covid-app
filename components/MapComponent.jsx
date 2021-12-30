import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useSWR from 'swr';
import { useEffect } from 'react';

import Image from 'next/image';

const MapComponent = () => {
  useEffect(() => {
    console.log('mounting mapcomponent');
    return () => console.log('unnmount map component');
  });
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: countryData, error } = useSWR(
    'https://disease.sh/v3/covid-19/countries',
    fetcher
  );

  if (error) return <div>failed to load country data in map</div>;
  if (!countryData) return <div>loading...</div>;

  const markers = countryData.map((country) => {
    const {
      country: countryName,
      countryInfo,
      cases,
      deaths,
      todayCases,
      casesPerOneMillion,
      todayDeaths,
      deathsPerOneMillion,
      population,
      updated,
    } = country;
    const { long, lat, flag } = countryInfo;
    const toolTip = (
      <section>
        <Image
          src={flag}
          alt={`flag of ${countryName}`}
          width={50}
          height={30}
        />
        <p>Country: {countryName}</p>
        <p>Population: {population.toLocaleString()}</p>
        <p>Today Cases: {todayCases.toLocaleString()}</p>
        <p>Cases: {cases.toLocaleString()}</p>
        <p>Cases per million: {casesPerOneMillion.toLocaleString()}</p>

        <p>Today Deaths: {todayDeaths.toLocaleString()}</p>
        <p>Deaths per million: {deathsPerOneMillion.toLocaleString()}</p>
        <p>Total Deaths: {deaths.toLocaleString()}</p>
        <small>Updated since: {Date(updated)}</small>
      </section>
    );
    const radiusSize = (number) => {
      if (number > 2_000) return 40;
      if (number > 1000) return 30;
      if (number > 500) return 20;
      if (number > 100) return 15;
      return 15;
    };
    const color = (number) => {
      if (number > 2000) return 'red';
      if (number > 1000) return 'orange';
      if (number > 500) return 'yellow';
      if (number > 100) return 'blue';
      return 'green';
    };
    return (
      <CircleMarker
        key={countryName}
        center={[lat, long]}
        pathOptions={{ color: color(deathsPerOneMillion) }}
        radius={radiusSize(deathsPerOneMillion)}>
        <Tooltip>{toolTip}</Tooltip>
      </CircleMarker>
    );
  });

  console.log(countryData[0]);
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: '600px', maxWidth: '1200px', margin: 0 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers}
    </MapContainer>
  );
};

export default MapComponent;
