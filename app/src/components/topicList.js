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
import Hidden from '@material-ui/core/Hidden';
import { useWindowSize } from './utils';
import { stableSort, getSorting } from './table';

const useStyles = makeStyles(theme => ({
  details: {
    alignItems: 'center',
  },
  headerColumn: {
    width: '35%',
    [theme.breakpoints.up('sm')]: {
      width: '20%',
    },
    [theme.breakpoints.up('md')]: {
      width: '14.7%',
    },
  },
  column: {
    flexBasis: '17.66%',
    [theme.breakpoints.up('sm')]: {
      flexBasis: '25%',
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: '17.66%'
    },
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
    { _id: 'date', displayName: 'Date', breakpoints: [] },
    { _id: 'name', displayName: 'Topic', breakpoints: [] },
    { _id: 'owner', displayName: 'Owner', breakpoints: ['xs'] },
    { _id: 'status', displayName: 'Status', breakpoints: ['xs', 'sm'] },
    { _id: 'smeGroup', displayName: 'SME Group', breakpoints: ['xs', 'sm'] },
    { _id: 'duration', displayName: 'Duration', breakpoints: ['xs', 'sm'] },
  ];

  const [colSpan, setColSpan] = useState(7);
  const { width } = useWindowSize();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState(columns[0]._id);

  const handleSortRequest = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  useEffect(() => {
    setColSpan(document.querySelectorAll('th').length - 2);
  }, [width]);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <Hidden only={column.breakpoints}>
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
              </Hidden>
            ))}
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(allTopics, getSorting(order, orderBy)).map((topic) => {
            console.log(topic[orderBy]); return (
              <TableRow key={`${topic.topicId}`}>
                <TableCell colSpan={colSpan}>
                  <ExpansionPanel square className={classes.panel}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1c-content"
                      id="panel1c-header"
                      className={classes.panelSummary}
                    >
                      {columns.map((column, i) => (
                        <Hidden only={column.breakpoints}>
                          <div className={classes.column} key={`${i}_${column._id}`}>{topic[column._id]}</div>
                        </Hidden>
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
            )
          })
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default TopicList;
