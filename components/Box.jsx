import styles from '../styles/Box.module.css';

export default function Box({ children }) {
  return <div className={styles.box}>{children}</div>;
}
