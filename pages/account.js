import { useEffect, useState, useMemo } from 'react';
import styles from '../styles/Accounts.module.css';
import AccountsBar from '../components/accountsBar';
import Table from '../components/table';

export default function account() {
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

  const columns = useMemo(() => [
    {
      Header: 'id',
      accessor: '_id',
      // className: 'user',
      style: {
        fontWeight: 'bolder',
        overflow: 'hidden',
        display: 'none',
      },
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Profile',
      accessor: 'profile',
    },
  ]);

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
