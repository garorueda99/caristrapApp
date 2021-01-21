export const ACCOUNT_COLUMNS = [
  {
    Header: 'id',
    accessor: '_id',
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
  { Header: 'Last Login', accessor: 'date' },
];

export const TODO_COLUMNS = [
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
    Header: 'asset',
    accessor: 'asset',
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
