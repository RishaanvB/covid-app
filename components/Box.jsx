import styles from './Box.module.css';

export default function Box({ children }) {
  return <div className={styles.shadow}>{children}</div>;
}
