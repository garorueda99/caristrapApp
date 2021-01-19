import React, { useState } from 'react';
import styled from 'styled-components';
import User from './user';

export default function UserForm({
  setShowModal,
  styles,
  setSelectedRows,
  selectedRows,
}) {
  return (
    <Wrapper>
      <User email={selectedRows.email} profile={selectedRows.profile} />
      <br></br>
      <button
        className={styles.button}
        onClick={async () => {
          try {
            const res = await fetch('/api/user', {
              method: 'PATCH',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'applicatrion/json',
              },
              body: JSON.stringify({
                email: selectedRows.email,
                newProfile: selectedRows.profile === 'admin' ? 'user' : 'admin',
              }),
            });
            const data = await res.json();
            setData(data.assets);
            setShowModal(false);
          } catch (err) {}
        }}
      >
        Change to {selectedRows.profile === 'admin' ? 'user' : 'admin'}
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
