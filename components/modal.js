import styles from '../styles/NewAsset.module.css';
export default function newAsset({ children, setShowModal }) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.dialog}>
          {children}
          <button
            className={styles.close}
            onClick={() => {
              setShowModal(false);
            }}
          >
            &times;
          </button>
        </div>
      </div>
    </>
  );
}
