import React from 'react';
import Button from '@material-ui/core/Button';
import MUIDataTable from 'mui-datatables';

export default ({ loading, error, data, refetch }) => {
  const columns = [
    {
      name: "userId", label: "ID", options: { filter: false, sort: true, }
    },
    {
      name: "userName", label: "Name", options: { filter: true, sort: true, }
    },
    {
      name: "email", label: "Email", options: { filter: true, sort: true, }
    },
    {
      name: "imagePath", label: "Image Path", options: { filter: false, sort: false, display: false }
    },
    {
      name: "rating", label: "Rating", options: { filter: true, sort: true, }
    },
    {
      name: "comment", label: "Comment", options: { filter: false, sort: false }
    },
  ];

  const options = {
    elevation: 1,
    selectableRowsHeader: false,
    selectableRows: 'none',
    print: false,
    download: false,
    isRowSelectable: false,
    responsive: 'scrollMaxHeight',
    rowsPerPage: 15,
    rowsPerPageOptions: [10, 25, 50],
    textLabels: {
      body: {
        noMatch: 'No records found',
      },
    }
  };

  return (
    <>
      {loading ? <div>Loading...</div> :
        error ? <div>Error</div> :
          <div>
            <div>
              <Button onClick={() => { refetch() }} variant='text'>Refresh</Button>
            </div>
            <MUIDataTable
              title='Attendance'
              data={data.topicAttendance}
              columns={columns}
              options={options}
            />
          </div>
      }
    </>
  );
};
