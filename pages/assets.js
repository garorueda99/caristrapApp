import React from 'react';
import AssetsBar from '../components/assetsBar';
import Table from '../components/table';
import styles from '../styles/Assets.module.css';
import makeData from '../components/makeData';
import styled from 'styled-components';

const Styles = styled.div`
  background-color: var(--card-color-background);
  box-shadow: 0px 0px 3px 0px var(--primary-border);
  border-radius: 4px;
  /* border: 2px solid blue; */
  padding: 30px 20px 10px 20px;

  /* .user {
    color: white;
  } */

  table {
    border-spacing: 0;
    border: 2px solid var(--primary-border);
    border-radius: 4px;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      width: 1%;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
export default function assets() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        className: 'user',
        style: {
          fontWeight: 'bolder',
          maxWidth: '10px',
          overflow: 'hidden',
        },
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        style: {
          fontWeight: 'bolder',
          maxWidth: '20px',
          overflow: 'hidden',
        },
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(20));
  const [skipPageReset, setSkipPageReset] = React.useState(false);
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
        <AssetsBar />
      </div>
      <div className={styles.gridWrapper}>
        <Styles>
          <Table
            columns={columns}
            data={data}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
          />
        </Styles>
      </div>
    </div>
  );
}
