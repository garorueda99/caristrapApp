import { useState } from 'react';
import styles from '../styles/AssetsBar.module.css';
import Modal from './modal';
import AssetForm from './assetForm';
import DeleteConfirmation from './assetDeleteConfirmation.js';
export default function assetsBar({
  selectedRows,
  setSelectedRows,
  setData,
  newDataIndex,
  data,
}) {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [, setForceUpdate] = useState(Date.now());
  return (
    <div className={styles.wrapper}>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            setShowAssetModal(true);
          }}
        >
          ADD NEW
        </button>
        <button
          className={styles.button}
          onClick={() => {
            selectedRows.length > 0 && setShowDelModal(true);
          }}
        >
          DELETE
        </button>
        <button
          className={styles.button}
          onClick={async () => {
            const response = [];
            newDataIndex.current.map((x) => response.push(data[x]));
            newDataIndex.current = [];
            setForceUpdate(new Date());
            // console.log(response);
            if (response.length > 0) {
              try {
                const res = await fetch('/api/assets', {
                  method: 'PATCH',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'applicatrion/json',
                  },
                  body: JSON.stringify(response),
                });
                const info = await res.json();
                setData([...info]);
              } catch (err) {
                console.log('ERROR:', err);
              }
            }
          }}
        >
          SAVE
          {newDataIndex.current.length > 0 && (
            <div className={styles.infoCount}>
              {newDataIndex.current.length}
            </div>
          )}
        </button>
        <button className={styles.button}>EXPORT</button>
      </div>
      {showAssetModal && (
        <Modal setShowModal={setShowAssetModal}>
          <AssetForm setShowModal={setShowAssetModal} setData={setData} />
        </Modal>
      )}
      {showDelModal && (
        <Modal setShowModal={setShowDelModal}>
          <DeleteConfirmation
            setShowModal={setShowDelModal}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setData={setData}
          />
        </Modal>
      )}
    </div>
  );
}
