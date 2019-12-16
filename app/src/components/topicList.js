import React from 'react';
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
import Hidden from '@material-ui/core/Hidden';
import { StyledTableRow } from './table';

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
  column: {
    flexBasis: '18%',
  },
  panel: {
    boxShadow: 'none'
  },
  panelSummary: {
    padding: 0
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

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <Hidden smDown>
              <TableCell align="left">Date</TableCell>
            </Hidden>
            <TableCell align="center">Topic</TableCell>
            <TableCell align="center">Owner</TableCell>
            <Hidden smDown>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">SME Group</TableCell>
              <TableCell align="left">Duration</TableCell>
              {/* <TableCell>Notes</TableCell> */}
            </Hidden>
            <TableCell style={{ minWidth: '50px' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            allTopics.map((topic) => (
              // <StyledTableRow key={topic.topicId}>
              //   <Hidden smDown>
              //     <TableCell>{topic.date}</TableCell>
              //   </Hidden>
              //   <TableCell>{topic.name}</TableCell>
              //   <TableCell>{topic.owner}</TableCell>
              //   <Hidden smDown>
              //     <TableCell>{topic.status}</TableCell>
              //     <TableCell>{topic.smeGroup}</TableCell>
              //     <TableCell>{topic.duration}</TableCell>
              //     <TableCell>{topic.notes}</TableCell>
              //   </Hidden>
              //   <TableCell><Link to={`/topic/${topic.topicId}`}>Detail</Link></TableCell>
              // </StyledTableRow>
              // <StyledTableRow key={topic.topicId}>
              <TableRow>
                <TableCell colSpan={6}>
                  {/* <div className={classes.root}> */}
                  <ExpansionPanel square className={classes.panel}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1c-content"
                      id="panel1c-header"
                      className={classes.panelSummary}
                    >
                      {/* <div className={classes.column}>
                      <Typography className={classes.heading}>Location</Typography>
                    </div> */}
                      <div className={classes.column}>{topic.date}</div>
                      <div className={classes.column}>{topic.name}</div>
                      <div className={classes.column}>{topic.owner}</div>
                      <div className={classes.column}>{topic.status}</div>
                      <div className={classes.column}>{topic.smeGroup}</div>
                      <div className={classes.column}>{topic.duration}</div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                      {/* <div className={classes.column} /> */}
                      {topic.notes}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  {/* </div> */}
                </TableCell>
                <TableCell><Link to={`/topic/${topic.topicId}`}>Detail</Link></TableCell>
              </TableRow>
              // </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default TopicList;
