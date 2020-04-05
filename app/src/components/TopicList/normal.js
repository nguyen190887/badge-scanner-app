import React, { useState } from 'react';
import { navigate } from 'gatsby';
import MUIDataTable from 'mui-datatables';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  Frontend: {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.primary.main
  },
  Backend: {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main
  },
  DevOps: {
    color: '#000',
    backgroundColor: theme.palette.tertiary.light
  },
  ShortLink: { // TODO: add js to shorten URL text instead of using JS
    fontSize: '14px',

    '& a': {
      display: 'inline-block',
      height: '21px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      verticalAlign: 'bottom',
      width: '150px'
    }
  }
}));

const parseGroups = (topics) => {
  const groups = {};
  topics.forEach(({ smeGroup }) => {
    if (!(smeGroup in groups)) {
      let values = [smeGroup];
      if (smeGroup !== 'N/A') {
        values = smeGroup.split('/');
      }
      values.forEach(v => { groups[v.trim()] = '' });
    }
  })
  return Object.keys(groups);
}

const TopicList = ({ topics: { allTopics = [] } = {} }) => {
  const classes = useStyles();
  const smeGroups = parseGroups(allTopics);
  const [smeState, setSmeState] = useState([]);

  const columns = [
    {
      name: "date", label: "Date", options: { filter: false, sort: true, }
    },
    {
      name: "name", label: "Name", options: { filter: false, sort: true, }
    },
    {
      name: "owner", label: "Owner", options: { filter: true, sort: true, }
    },
    {
      name: "status", label: "Status", options: { filter: false, sort: true, }
    },
    {
      name: "smeGroup", label: "SME Group", options:
      {
        filter: true,
        filterType: 'checkbox',
        filterOptions: {
          names: smeGroups,
        },
        filterList: smeState,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          let values = [value];
          if (value !== 'N/A' && !(value in smeGroups)) {
            values = value.split('/');
          }
          return (
            <>
              {values.map((val, i) => {
                return (
                  <Chip key={`chip_${i}`}
                    size="small" label={val} value={val} clickable
                    className={classes[val]}
                    onClick={(e) => {
                      setSmeState([val])
                      e.stopPropagation();
                    }}
                  />
                )
              })}
            </>
          )
        }
      }
    },
    {
      name: "duration", label: "Duration", options: { filter: false, sort: false, searchable: false }
    },
    {
      name: "notes",
      label: "Notes",
      options: {
        filter: false,
        sort: false,
      customBodyRender: value => (
        <Typography component="div" className={classes.ShortLink} dangerouslySetInnerHTML={{__html: value}}></Typography>
      )}
    },
  ];
  const options = {
    selectableRowsHeader: false,
    selectableRows: 'none',
    customSort: (data, colIndex, order) => {
      // sort by Date
      if (colIndex === 0) {
        return data.sort((a, b) => {
          return (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1 : 1) * (order === 'desc' ? 1 : -1);
        });
      }
      // sort alphabetically
      return data.sort((a, b) => {
        return (a.data[colIndex] < b.data[colIndex] ? -1 : 1) * (order === 'desc' ? 1 : -1);
      });
    },
    onCellClick: (_, { colIndex, dataIndex, event }) => {
      if (colIndex !== 0) {
        event.stopPropagation();
        navigate(`/topic/${allTopics[dataIndex].topicId}`);
      }
    },
    print: false,
    download: false,
    isRowSelectable: false,
    responsive: 'scrollMaxHeight',
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50],
  };

  return (
    <MUIDataTable
      title='Topics'
      data={allTopics}
      columns={columns}
      options={options}
    />
  );
}

export default TopicList;
