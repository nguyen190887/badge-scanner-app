import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from 'mui-datatables';
import theme from '../theme';
import { stableSort, getSorting } from './table';

const useStyles = makeStyles(theme => ({
  details: {
    alignItems: 'center',
  },
  headerColumn: {
    width: '14.7%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '20%',
    // },
    // [theme.breakpoints.up('md')]: {
    //   width: '20%',
    // },
  },
  column: {
    flexBasis: '17.66%',
    // [theme.breakpoints.up('sm')]: {
    //   flexBasis: '25%',
    // },
    // [theme.breakpoints.up('md')]: {
    //   flexBasis: '25%'
    // },
  },
  panel: {
    boxShadow: 'none'
  },
  panelSummary: {
    padding: 0,
    [theme.breakpoints.up('md')]: {
    },
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

const TopicList = ({ topics: { allTopics = [] } = {} }) => {
  const classes = useStyles();

  const columnsData = [
    { _id: 'date', displayName: 'Date' },
    { _id: 'name', displayName: 'Topic' },
    { _id: 'owner', displayName: 'Owner' },
    { _id: 'status', displayName: 'Status' },
    { _id: 'smeGroup', displayName: 'SME Group' },
    { _id: 'duration', displayName: 'Duration' },
  ];

  // const [colSpan, setColSpan] = useState(6);
  // const [order, setOrder] = useState('desc');
  // const [orderBy, setOrderBy] = useState(columns[0]._id);

  // const handleSortRequest = (event, property) => {
  //   const isDesc = orderBy === property && order === 'desc';
  //   setOrder(isDesc ? 'asc' : 'desc');
  //   setOrderBy(property);
  // };
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
    customSort: (data, col, order = 'desc') => {
      console.log(col)
      return stableSort(data, getSorting(order, columnsData[col]._id))
    },
    print: false,
    download: false,
    isRowSelectable: false,
  }

  return (
    <Paper>
      <MUIDataTable
        title='Topics'
        data={allTopics}
        columns={columns}
        options={options}
      >

      </MUIDataTable>
    </Paper>
    // <Paper>
    //   <Table>
    //     <TableHead>
    //       <TableRow>
    //         {columns.map(column => (
    //           <TableCell
    //             key={column._id}
    //             sortDirection={orderBy === column._id ? order : false}
    //             className={classes.headerColumn}>
    //             <TableSortLabel
    //               active={orderBy === column._id}
    //               direction={order}
    //               onClick={event => handleSortRequest(event, column._id)}>
    //               {column.displayName}
    //             </TableSortLabel>
    //           </TableCell>
    //         ))}
    //         <TableCell
    //           className={classes.headerColumn}
    //         />
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {stableSort(allTopics, getSorting(order, orderBy)).map((topic) => (
    //         <TableRow key={`${topic.topicId}`}>
    //           <TableCell colSpan={6}>
    //             <ExpansionPanel square className={classes.panel}>
    //               <ExpansionPanelSummary
    //                 expandIcon={<ExpandMoreIcon />}
    //                 aria-controls="panel1c-content"
    //                 id="panel1c-header"
    //                 className={classes.panelSummary}
    //               >
    //                 {columns.map((column, i) => (
    //                   <div className={classes.column} key={`${i}_${column._id}`}>{topic[column._id]}</div>
    //                 ))}
    //               </ExpansionPanelSummary>
    //               <ExpansionPanelDetails className={classes.details}>
    //                 {topic.notes}
    //               </ExpansionPanelDetails>
    //             </ExpansionPanel>
    //           </TableCell>
    //           <TableCell>
    //             <Link to={`/topic/${topic.topicId}`} className={classes.link}>
    //               <Typography color="primary">Detail</Typography>
    //             </Link>
    //           </TableCell>
    //         </TableRow>
    //       ))
    //       }
    //     </TableBody>
    //   </Table>
    // </Paper>
  )
}

export default TopicList;
