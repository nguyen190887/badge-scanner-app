import React from 'react';
import { navigate } from 'gatsby';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from 'mui-datatables';
import theme from '../theme';
import { stableSort, getSorting } from './table';

const TopicList = ({ topics: { allTopics = [] } = {} }) => {
  const data = stableSort(allTopics, getSorting('desc', 'date'));

  const columnsData = [
    { _id: 'date', displayName: 'Date' },
    { _id: 'name', displayName: 'Topic' },
    { _id: 'owner', displayName: 'Owner' },
    { _id: 'status', displayName: 'Status' },
    { _id: 'smeGroup', displayName: 'SME Group' },
    { _id: 'duration', displayName: 'Duration' },
  ];

  const columns = [
    {
      name: "date", label: "Date", options: { filter: true, sort: true, }
    },
    {
      name: "name", label: "Name", options: { filter: false, sort: true, }
    },
    {
      name: "owner", label: "Owner", options: { filter: true, sort: true, }
    },
    {
      name: "status", label: "Status", options: { filter: true, sort: true, }
    },
    {
      name: "smeGroup", label: "SME Group", options: { filter: true, sort: true, }
    },
    {
      name: "duration", label: "Duration", options: { filter: false, sort: false, searchable: false }
    },
    {
      name: "notes", label: "Notes", options: { filter: false, sort: false, display: false }
    },
  ];
  const options = {
    selectableRowsHeader: false,
    selectableRows: 'none',
    expandableRows: true,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData) => (
      <td colSpan={5}>{rowData[6]}</td>
    ),
    customSort: (data, colIndex, order) => {
      // sort by Date
      if (colIndex === 0) {
        return data.sort((a, b) => {
          return (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1 : 1) * (order === 'desc' ? 1 : -1);
        });
      }
      // sort alphabetically
      return data.sort((a, b) => {
        return (a.data[colIndex] < b.data[colIndex] ? -1 : 1) * (order === 'desc' ? 1 : -1);
      });
    },
    onCellClick: (_, { colIndex, dataIndex, event }) => {
      if (colIndex !== 0) {
        event.stopPropagation();
        navigate(`/topic/${data[dataIndex].topicId}`);
      }
    },
    print: false,
    download: false,
    isRowSelectable: false,
    responsive: 'scrollMaxHeight',
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50],
  };

  return (
    <MuiThemeProvider theme={theme.overrides}>
      <MUIDataTable
        title='Topics'
        data={data}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  )
}

export default TopicList;
