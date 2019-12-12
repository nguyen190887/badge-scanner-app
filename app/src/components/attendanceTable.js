import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

export default ({ loading, error, data, refetch }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {loading ? <div>Loading...</div> :
        error ? <div>Error</div> :
          <div>
            <div>
              <Button onClick={() => { refetch() }} variant='text'>Refresh</Button>
            </div>
            <Table aria-label='Attendee Table'>
              <TableHead>
                <TableRow key='header'>
                  <TableCell>No.</TableCell>
                  <TableCell>ID</TableCell>
                  <Hidden mdDown>
                    <TableCell>Email</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>ImagePath</TableCell>
                  </Hidden>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.topicAttendance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r, i) => (
                  <TableRow key={r.id}>
                    <TableCell>{page * rowsPerPage + i}</TableCell>
                    <TableCell>{r.userId}</TableCell>
                    <Hidden mdDown>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>{r.userName}</TableCell>
                      <TableCell>{r.imagePath}</TableCell>
                    </Hidden>
                    <TableCell>{r.rating}</TableCell>
                    <TableCell>{r.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              labelRowsPerPage=''
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.topicAttendance ? data.topicAttendance.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
      }
    </>
  );
};
