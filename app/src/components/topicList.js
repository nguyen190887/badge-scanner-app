import React from 'react';
import { Link } from 'gatsby';
import { Paper, Table, TableBody, TableRow, TableHead, TableCell } from '@material-ui/core';
import {StyledTableRow } from './table';

const TopicList = ({ topics: { allTopics = [] } = {} }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <StyledTableRow>
            <TableCell>Date</TableCell>
            <TableCell>Topic</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>SME Group</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell />
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            allTopics.map((topic) => (
              <StyledTableRow key={topic.topicId}>
                <TableCell>{topic.date}</TableCell>
                <TableCell>{topic.name}</TableCell>
                <TableCell>{topic.owner}</TableCell>
                <TableCell>{topic.status}</TableCell>
                <TableCell>{topic.smeGroup}</TableCell>
                <TableCell>{topic.duration}</TableCell>
                <TableCell>{topic.notes}</TableCell>
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
