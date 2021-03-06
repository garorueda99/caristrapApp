import React, { useEffect, useState, useMemo, useRef } from 'react';
import AssetsBar from '../components/assetsBar';
import Table from '../components/table';
import styles from '../styles/Pages.module.css';

// import useSWR from 'swr';

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function assets() {
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
      Header: 'Description',
      accessor: 'machine_name',
      // className: 'user',
      style: {
        fontWeight: 'bolder',
        overflow: 'hidden',
      },
    },
    {
      Header: 'Tag#',
      accessor: 'tag',
      style: {
        fontWeight: 'bolder',
        overflow: 'hidden',
        maxWidth: '30px',
      },
    },
    {
      Header: 'Type',
      accessor: 'type',
      style: {
        fontWeight: 'bolder',
        overflow: 'hidden',
      },
    },
    {
      Header: 'Manufacturer',
      accessor: 'manufacturer',
    },
    {
      Header: 'Serial',
      accessor: 'serial',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ]);

  // const { data: result, error } = useSWR('/api/assets', fetcher);

  // if (error) return <h1>Something went wrong!</h1>;
  // if (!result) return <h1>Loading...</h1>;
  const newDataIndex = useRef([]);
  const [data, setData] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);

  useEffect(async () => {
    const res = await fetch('/api/assets');
    const data = await res.json();
    setData(data.assets);
  }, []);

  const updateMyDB = (rowIndex) => {
    if (newDataIndex.current.length > 0) {
      if (!newDataIndex.current.includes(rowIndex)) {
        newDataIndex.current = [...newDataIndex.current, rowIndex];
      }
    } else {
      newDataIndex.current = [rowIndex];
    }
  };

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          updateMyDB(rowIndex, columnId);
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerWrapper}>
        <AssetsBar
          newDataIndex={newDataIndex}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          setData={setData}
          data={data}
        />
      </div>
      <div className={styles.gridWrapper}>
        <Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
        />
      </div>
    </div>
  );
}
