import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const list = 'World, North-america, South-america, Africa, Asia, Europe, Oceania'
    .split(', ')
    .map((item, index) => (
      <li key={index} className={styles.listItem}>
        {item}
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
