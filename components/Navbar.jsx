import styles from '../styles/Navbar.module.css';

const list = 'North-america, South-america, Africa, Asia, Europe'
  .split(', ')
  .map((item, index) => (
    <li key={index} className={styles.listItem}>
      {item}
    </li>
  ));

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Covid</div>
      <nav>
        <ul className={styles.list}>{list}</ul>
      </nav>
    </header>
  );
}
