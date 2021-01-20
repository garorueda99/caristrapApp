import React, { useEffect, useState, useMemo } from 'react';
import TodoBar from '../components/todoBar';
import Table from '../components/table';
import Cards from '../components/cards';
import styles from '../styles/Pages.module.css';
import { formatList } from '../lib/utils';
import { TODO_COLUMNS } from '../lib/columns';
// import { useTodos } from '../hooks/useTodos';

export default function todos() {
  // const { todos, isLoading, isError } = useTodos();
  // if (isError) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  const [data, setData] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [view, setView] = useState('table');

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
          const todos = formatList(data);
          setData(todos);
        })();
      } catch (err) {
        console.log('ERROR:', err);
      }
    }
  }, [view]);

  const columns = useMemo(() => TODO_COLUMNS, []);
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
      {view === 'table' && data && (
        <div className={styles.tableWrapper}>
          <Table
            columns={columns}
            data={data}
            setSelectedRows={setSelectedRows}
            skipPageReset={skipPageReset}
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
