import { useState } from 'react';
import styles from '../styles/AssetsBar.module.css';
import Modal from './modal';
import AssetForm from './assetForm';
export default function assetsBar({ selectedRows, setSelectedRows, setData }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.wrapper}>
      {/* <label className="rocker rocker-small"/> */}
      <div>
        {/* <label className={styles.rocker}>
          <input type='checkbox' />
          <span className={styles.switch_left}>Yes</span>
          <span className={styles.switch_right}>No</span>
        </label> */}
      </div>

      <div>
        <button
          className={styles.button}
          onClick={() => {
            setShowModal(true);
          }}
        >
          ADD NEW
        </button>
        <button
          className={styles.button}
          onClick={async (e) => {
            e.preventDefault();
            if (selectedRows.length > 0) {
              try {
                const res = await fetch('/api/assets', {
                  method: 'DELETE',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'applicatrion/json',
                  },
                  body: JSON.stringify({ _ids: selectedRows }),
                });
                setSelectedRows([]);
                const data = await res.json();
                setData(data.assets);
              } catch (err) {}
            }
          }}
        >
          DELETE
        </button>
        <button className={styles.button}>SAVE</button>
        <button className={styles.button}>EXPORT</button>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <AssetForm setShowModal={setShowModal} setData={setData} />
        </Modal>
      )}
    </div>
  );
}
