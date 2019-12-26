import React from 'react';
import { navigate } from 'gatsby';
import MUIDataTable from 'mui-datatables';
import { stableSort, getSorting } from './table';

const TopicList = ({ topics: { allTopics = [] } = {} }) => {
  const data = stableSort(allTopics, getSorting('desc', 'date'));

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
      <tr>
        <td/>
        <td colSpan={5} dangerouslySetInnerHTML={{ __html: rowData[6] }} />
      </tr>
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
    <MUIDataTable
      title='Topics'
      data={data}
      columns={columns}
      options={options}
    />
  )
}

export default TopicList;
