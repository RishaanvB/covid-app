import dynamic from 'next/dynamic';
import Box from '../components/Box';
import Layout from '../components/Layout';

import styles from '../styles/Index.module.css';
function HomePage() {
  const MapComponent = dynamic(
    () => import('../components/MapComponent'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );
  return (
    <Layout>
      <div className={styles.gridContainer}>
        <section className={styles.box1}>
          <Box>
            <p>Total Deaths: Europe</p>
            <h1>25.000.000</h1>
            <h1>1200 per million</h1>
          </Box>
        </section>
        <section className={styles.box2}>
          <Box>
            <p>Total Deaths: Netherlands</p>
            <h1>5.000.000</h1>
            <h1>50 per million</h1>
          </Box>
        </section>
        <section className={styles.info}>
          <Box>
            <p>General Info: Netherlands</p>
            <p>Some random info from api</p>
          </Box>
        </section>

        <section className={styles.map}>
          <MapComponent />
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
