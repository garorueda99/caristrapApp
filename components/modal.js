import styles from '../styles/NewAsset.module.css';
export default function newAsset({ children, setShowModal, setData }) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.dialog}>
          {children}
          <button
            className={styles.close}
            onClick={() => {
              setShowModal(false);
              // setData(null);
            }}
          >
            &times;
          </button>
        </div>
      </div>
    </>
  );
}
