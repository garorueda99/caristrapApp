import { useEffect, useState, useMemo, useContext } from 'react';
import { UserContext } from '../components/store';

import styles from '../styles/Accounts.module.css';
import styled from 'styled-components';
import { ACCOUNT_COLUMNS } from '../lib/columns';
import { formatUserDate } from '../lib/utils';

import AccountsBar from '../components/accountsBar';
import Table from '../components/table';

export default function account() {
  const [user] = useContext(UserContext);
  if (user.profile !== 'admin') {
    return <Wrapper>NOT AUTORIZED</Wrapper>;
  }

  const [skipPageReset, setSkipPageReset] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetch('/api/users');
      const response = await data.json();
      if (data.ok) {
        const formattedList = formatUserDate(response);
        setUsers(formattedList);
      }
    })();
  }, []);

  const columns = useMemo(() => ACCOUNT_COLUMNS, []);

  return (
    <div>
      <div className={styles.headerWrapper}>
        <AccountsBar
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          setUsers={setUsers}
        />
      </div>
      {!!users && (
        <div className={styles.headerWrapper}>
          <Table
            columns={columns}
            data={users}
            skipPageReset={skipPageReset}
            setSelectedRows={setSelectedRows}
          />
        </div>
      )}
    </div>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;
