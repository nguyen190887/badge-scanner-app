import React, { useState } from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Hidden from '@material-ui/core/Hidden';
import { stableSort, getSorting } from './table';

const useStyles = makeStyles(theme => ({
  cell: {
    maxWidth: '30%',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  xsmallColumn: {
    // flexBasis: '6%',
    flexBasis: '14.28%'
  },
  smallColumn: {
    // flexBasis: '12%',
    flexBasis: '14.28%'
  },
  column: {
    // flexBasis: '16%',
    flexBasis: '14.28%'
  },
  innerColumn: {
    flexBasis: '16.66%'
  },
  wideColumn: {
    // flexBasis: '20%',
    flexBasis: '14.28%'
  },
  panel: {
    boxShadow: 'none'
  },
  panelSummary: {
    padding: 0
  },
  lastColumn: {
    boxShadow: '-1px 0 rgba(0,0,0,0.12)',
    padding: 0
  },
  button: {
    // display: 'block',
    // padding: '35%',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
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

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(columns[0]._id);

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
                className={classes.column}>
                <TableSortLabel
                  active={orderBy === column._id}
                  direction={order}
                  onClick={event => handleSortRequest(event, column._id)}>
                  {column.displayName}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(allTopics, getSorting(order, orderBy)).map((topic) => { console.log(topic[orderBy]); return (
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
                      <div className={classes.innerColumn} key={`${i}_${column._id}`}>{topic[column._id]}</div>
                    ))}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    {topic.notes}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </TableCell>
              <TableCell className={classes.column}>
                <Link to={`/topic/${topic.topicId}`}>Detail</Link>
              </TableCell>
            </TableRow>
          )})
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default TopicList;
