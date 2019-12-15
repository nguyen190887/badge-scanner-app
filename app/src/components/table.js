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
