import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.grey[50],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}))(TableRow);

export const desc = (a, b, orderBy) => {
  if(orderBy === 'date') {
    return new Date(b.date) - new Date(a.date);
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export const getSorting = (order, orderBy) => {
  return order === 'desc' ?
    (a, b) => desc(a, b, orderBy) :
    (a, b) => -desc(a, b, orderBy);
}
