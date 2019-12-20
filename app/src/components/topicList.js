import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import theme from '../theme';
import { useWindowSize } from './utils';
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

  const columns = [
    { _id: 'date', displayName: 'Date' },
    { _id: 'name', displayName: 'Topic' },
    { _id: 'owner', displayName: 'Owner' },
    { _id: 'status', displayName: 'Status' },
    { _id: 'smeGroup', displayName: 'SME Group' },
    { _id: 'duration', displayName: 'Duration' },
  ];

  const [colSpan, setColSpan] = useState(6);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState(columns[0]._id);

  const handleSortRequest = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column._id}
                sortDirection={orderBy === column._id ? order : false}
                className={classes.headerColumn}>
                <TableSortLabel
                  active={orderBy === column._id}
                  direction={order}
                  onClick={event => handleSortRequest(event, column._id)}>
                  {column.displayName}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell
              className={classes.headerColumn}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(allTopics, getSorting(order, orderBy)).map((topic) => (
            <TableRow key={`${topic.topicId}`}>
              <TableCell colSpan={6}>
                <ExpansionPanel square className={classes.panel}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                    className={classes.panelSummary}
                  >
                    {columns.map((column, i) => (
                      <div className={classes.column} key={`${i}_${column._id}`}>{topic[column._id]}</div>
                    ))}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    {topic.notes}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </TableCell>
              <TableCell>
                <Link to={`/topic/${topic.topicId}`} className={classes.link}>
                  <Typography color="primary">Detail</Typography>
                </Link>
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default TopicList;
