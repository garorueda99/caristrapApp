import { useState } from 'react';
import styles from '../styles/AssetsBar.module.css';
import Modal from './modal';
import AssetForm from './assetForm';
import DeleteConfirmation from './assetDeleteConfirmation.js';
export default function accountsBar() {
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
          MODIFY
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setShowAssetModal(true);
          }}
        >
          ADD NEW
        </button>
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
