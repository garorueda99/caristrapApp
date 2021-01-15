import { useEffect, useState, useMemo } from 'react';
import styles from '../styles/Accounts.module.css';
import AccountsBar from '../components/accountsBar';
import Table from '../components/table';
import { ACCOUNT_COLUMNS } from '../lib/columns';
import { useContext } from 'react';
import { UserContext } from '../components/store';
import styled from 'styled-components';

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
        setUsers(response);
      }
    })();
  }, []);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setUsers((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const columns = useMemo(() => ACCOUNT_COLUMNS, []);

  return (
    <div>
      <div className={styles.headerWrapper}>
        <AccountsBar />
      </div>
      {!!users && (
        <div className={styles.headerWrapper}>
          <Table
            columns={columns}
            data={users}
            setSelectedRows={setSelectedRows}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
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
