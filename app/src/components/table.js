import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export const StyledTableRow = withStyles(theme => ({
  // root: {
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.background.default,
    // },
  // },
}))(TableRow);
