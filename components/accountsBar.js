import { useState, useEffect } from 'react';
import { BiTestTube } from 'react-icons/bi';
import styles from '../styles/AssetsBar.module.css';
import Modal from './modal';
import UserForm from './userForm';

export default function accountsBar({ selectedRows, setSelectedRows }) {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

  const handleSubmit = () => console.log('submit');
  const handleChange = () => console.log('Change');

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
      </div>

      {showAccountModal && (
        <Modal setShowModal={setShowAccountModal}>
          <UserForm
            styles={styles}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
          />
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
