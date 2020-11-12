import React, { useEffect, useState } from 'react';
import TodoBar from '../components/todoBar';
import Table from '../components/table';
import styles from '../styles/Pages.module.css';

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
    Header: 'Asset',
    accessor: 'assets',
  },
  {
    Header: 'Tag #',
    accessor: 'tag',
  },
  {
    Header: 'Task',
    accessor: 'title',
    // className: 'user',
    style: {
      fontWeight: 'bolder',
      overflow: 'hidden',
    },
  },
  {
    Header: 'Due  Date',
    accessor: 'startDate',
    style: {
      fontWeight: 'bolder',
      overflow: 'hidden',
      maxWidth: '30px',
    },
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
    Header: 'Serial',
    accessor: 'serial',
  },
];

export default function todos() {
  const [data, setData] = useState([]);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerWrapper}>
        <TodoBar setData={setData} />
      </div>
      {JSON.stringify(data)}

      <div className={styles.gridWrapper}>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}
