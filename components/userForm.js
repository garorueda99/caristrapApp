import React, { useState } from 'react';
import styled from 'styled-components';
import User from './user';
import { formatUserDate } from '../lib/utils';

export default function UserForm({
  setShowModal,
  styles,
  setSelectedRows,
  selectedRows,
  setUsers,
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
            (async () => {
              const data = await fetch('/api/users');
              const response = await data.json();
              if (data.ok) {
                const formattedList = formatUserDate(response);
                setUsers(formattedList);
              }
            })();
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
