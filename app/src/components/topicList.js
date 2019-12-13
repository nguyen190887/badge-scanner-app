import React from 'react';
import { Link } from 'gatsby';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Hidden from '@material-ui/core/Hidden';
import { StyledTableRow } from './table';

const TopicList = ({ topics: { allTopics = [] } = {} }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <Hidden smDown>
              <TableCell>Date</TableCell>
            </Hidden>
            <TableCell>Topic</TableCell>
            <TableCell>Owner</TableCell>
            <Hidden smDown>
              <TableCell>Status</TableCell>
              <TableCell>SME Group</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Notes</TableCell>
            </Hidden>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            allTopics.map((topic) => (
              <StyledTableRow key={topic.topicId}>
                <Hidden smDown>
                  <TableCell>{topic.date}</TableCell>
                </Hidden>
                <TableCell>{topic.name}</TableCell>
                <TableCell>{topic.owner}</TableCell>
                <Hidden smDown>
                  <TableCell>{topic.status}</TableCell>
                  <TableCell>{topic.smeGroup}</TableCell>
                  <TableCell>{topic.duration}</TableCell>
                  <TableCell>{topic.notes}</TableCell>
                </Hidden>
                <TableCell><Link to={`/topic/${topic.topicId}`}>Detail</Link></TableCell>
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default TopicList;
