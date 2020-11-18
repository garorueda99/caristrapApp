import { useState } from 'react';
import styles from '../styles/AssetsBar.module.css';
import Modal from './modal';
import AssetForm from './assetForm';
import DeleteConfirmation from './assetDeleteConfirmation.js';
export default function assetsBar({ selectedRows, setSelectedRows, setData }) {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

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
        <button className={styles.button}>SAVE</button>
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
