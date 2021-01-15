import { useState } from 'react';
import styles from '../styles/AssetsBar.module.css';
import Modal from './modal';
import UserForm from './user';
export default function accountsBar() {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            setShowAccountModal(true);
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

      {showAccountModal && (
        <Modal setShowModal={setShowAccountModal}>
          <UserForm />
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
