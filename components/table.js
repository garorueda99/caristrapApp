import React, { useEffect, useState } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import styled from 'styled-components';

const defaultPropGetter = () => ({});

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="radio" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export default function Table({
  columns,
  data,
  setSelectedRows,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  isLoading,
  isError,
}) {
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const [selectedRowId, setSelectedRowId] = useState(null);
  const selectedRowIds = [];
  if (selectedRowId) {
    selectedRowIds.push(selectedRowId);
  }

  const {
    toggleAllRowsSelected,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    selectedFlatRows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // use the skipPageReset option to disable page resetting temporarily
      initialState: { selectedRowIds },
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: <div>Select</div>,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                onClick={() => {
                  toggleAllRowsSelected(false);
                  setSelectedRowId(row.id);
                  console.log(row.getToggleRowSelectedProps());
                }}
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    setSelectedRows(...selectedFlatRows.map((d) => d.original));
  });

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps([
                    {
                      className: column.className,
                      style: column.style,
                    },
                    getColumnProps(column),
                    getHeaderProps(column),
                  ])}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Styles>
  );
}

const Styles = styled.div`
  display: table;
  width: 100%;
  background-color: var(--card-color-background);
  box-shadow: 0px 0px 3px 0px var(--primary-border);
  border-radius: 4px;
  /* border: 2px solid blue; */
  padding: 30px 20px 10px 20px;
  /* border: 2px solid red; */
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
      text-align: center; /* center checkbox horizontally */
      vertical-align: middle; /* center checkbox vertically */

      :first-child {
        max-width: 15px;
        text-justify: center;
      }
      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
        /* margin: 0 40px; */
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
