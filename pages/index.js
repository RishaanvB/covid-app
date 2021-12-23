import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Box from '../components/Box';
function HomePage() {
  const MapComponent = dynamic(
    () => import('../components/MapComponent'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );
  return (
    <>
      <Navbar />
      <Box>
        <p>Total Deaths: Europe</p>
        <h1>25.000.000</h1>
        <h1>1200 per million</h1>
      </Box>
      <Box>
        <p>Total Deaths: Netherlands</p>
        <h1>5.000.000</h1>
        <h1>50 per million</h1>
      </Box>
      <Box>
        <p>General Info: Netherlands</p>
        <p>Some random info from api</p>
      </Box>
      <Box>
        <h1>graph with total deaths per country in continent</h1>
      </Box>
      <Box>
        <h1>graph with total deaths per million per country in continent</h1>
      </Box>

      <MapComponent />
    </>
  );
}

export default HomePage;
