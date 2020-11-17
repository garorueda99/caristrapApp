import React, { useEffect, useState } from 'react';
import TodoBar from '../components/todoBar';
import Table from '../components/table';
import Cards from '../components/cards';
import styles from '../styles/Pages.module.css';
import { formattedList } from '../lib/utils';
const columns = [
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
    Header: 'Task',
    accessor: 'title',
  },
  {
    Header: 'Machine',
    accessor: 'machine_name',
    // className: 'user',
    style: {
      fontWeight: 'bolder',
      overflow: 'hidden',
    },
  },
  {
    Header: 'Tag #',
    accessor: 'tag',
    style: {
      fontWeight: 'bolder',
      overflow: 'hidden',
      maxWidth: '30px',
    },
  },
  {
    Header: 'Due  Date',
    accessor: 'startDate',
  },
  {
    Header: 'Frequency',
    accessor: 'frequency',
    style: {
      fontWeight: 'bolder',
      overflow: 'hidden',
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];

export default function todos() {
  const [data, setData] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [view, setView] = useState('table');
  useEffect(() => {
    try {
      (async () => {
        const res = await fetch('/api/todos');
        const data = await res.json();
        setData(formattedList(data));
      })();
    } catch (err) {
      console.log('ERROR:', err);
    }
  }, []);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerWrapper}>
        <TodoBar
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          setData={setData}
          setView={setView}
        />
      </div>

      <div className={styles.gridWrapper}>
        {view === 'table' && (
          <Table
            columns={columns}
            data={data}
            setSelectedRows={setSelectedRows}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
          />
        )}
        {view === 'cards' && (
          <div className={styles.cardsWrapper}>
            <Cards />
          </div>
        )}
      </div>
    </div>
  );
}
