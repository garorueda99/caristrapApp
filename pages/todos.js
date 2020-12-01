import React, { useEffect, useState, useMemo } from 'react';
import TodoBar from '../components/todoBar';
import Table from '../components/table';
import Cards from '../components/cards';
import styles from '../styles/Pages.module.css';
import { formatList } from '../lib/utils';
// import { useTodos } from '../hooks/useTodos';

export default function todos() {
  // const { todos, isLoading, isError } = useTodos();
  // if (isError) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  const [data, setData] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [view, setView] = useState('table');
  // if (isError) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
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
  ]);
  // useEffect(() => {
  //   if (!isLoading && !isError) {
  //     setData(formatList(todos));
  //   }
  // });

  useEffect(() => {
    if (view === 'table') {
      try {
        (async () => {
          const res = await fetch('/api/todos');
          const data = await res.json();
          setData(formatList(data));
        })();
      } catch (err) {
        console.log('ERROR:', err);
      }
    }
  }, [view]);

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
          view={view}
        />
      </div>
      {/* <pre>{JSON.stringify(todos, 2, null)}</pre> */}
      {view === 'table' && (
        <div className={styles.tableWrapper}>
          <Table
            columns={columns}
            data={data}
            setSelectedRows={setSelectedRows}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
            // isLoading={isLoading}
            // isError={isError}
          />
        </div>
      )}
      {view === 'cards' && (
        <div className={styles.gridWrapper}>
          <div className={styles.cardsWrapper}>
            <Cards view={view} data={data} setData={setData} />
          </div>
        </div>
      )}
    </div>
  );
}
