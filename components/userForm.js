import React, { useState } from 'react';
import styled from 'styled-components';
import User from './user';

export default function UserForm(setShowModal, styles) {
  const [profile, setProfile] = useState(false);
  return (
    <Wrapper>
      <User />
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
  );
}

const Wrapper = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
