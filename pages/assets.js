import React, { useEffect, useState } from 'react';
import AssetsBar from '../components/assetsBar';
import Table from '../components/table';
import styles from '../styles/Pages.module.css';

// import useSWR from 'swr';

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function assets() {
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
  ];

  // const { data: result, error } = useSWR('/api/assets', fetcher);

  // if (error) return <h1>Something went wrong!</h1>;
  // if (!result) return <h1>Loading...</h1>;

  const [data, setData] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);

  useEffect(async () => {
    try {
      const res = await fetch('/api/assets');
      const data = await res.json();
      setData(data.assets);
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

  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerWrapper}>
        <AssetsBar
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          setData={setData}
        />
      </div>
      <div className={styles.gridWrapper}>
        <Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          setSelectedRows={setSelectedRows}
        />
      </div>
    </div>
  );
}
