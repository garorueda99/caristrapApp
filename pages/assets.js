import AssetsBar from '../components/assetsBar';
import styles from '../styles/Assets.module.css';
export default function assets() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerWrapper}>
        <AssetsBar />
      </div>
      <div className={styles.gridWrapper}>GRID</div>
    </div>
  );
}
