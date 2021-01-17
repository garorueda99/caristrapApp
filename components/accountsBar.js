import { useState, useEffect } from 'react';
import styles from '../styles/AssetsBar.module.css';
import Modal from './modal';
import UserForm from './user';
import styled from 'styled-components';

export default function accountsBar() {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [profile, setProfile] = useState(false);
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
          <Wrapper>
            <UserForm />
            <br></br>
            <button
              className={styles.button}
              onClick={() => {
                setProfile(!profile);
              }}
            >
              Change to {profile ? 'Admin' : 'User'}
            </button>
          </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
