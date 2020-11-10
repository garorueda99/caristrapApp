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
    accessor: 'machine',
  },
  {
    Header: 'Tag #',
    accessor: 'tag',
  },
  {
    Header: 'Task',
    accessor: 'task',
    // className: 'user',
    style: {
      fontWeight: 'bolder',
      overflow: 'hidden',
    },
  },
  {
    Header: 'Due  Date',
    accessor: 'due_date',
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

const data = [];

export default function todos() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerWrapper}>
        <TodoBar />
      </div>
      <div className={styles.gridWrapper}>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}
