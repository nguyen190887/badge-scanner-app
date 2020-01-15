import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputTabs from './InputTabs';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(2, 0)
  },
  box: {
    maxWidth: '400px'
  },
  button: {
    alignSelf: 'flex-end'
  }
}));

export default ({ topicId, addRow }) => {
  const idRef = useRef(null);
  const userNameRef = useRef(null);
  const classes = useStyles();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      addRow({
        variables: { topicId, userId: idRef.current.value, userName: userNameRef.current.value },
        optimisticResponse: {
          __typename: "Mutation",
          addTrackingRow: {
            __typename: "TrackingRow",
            comment: "",
            email: "",
            imagePath: "",
            rating: "",
            topicId: topicId,
            userId: ("0000" + idRef.current.value).slice(-4),
            userName: userNameRef.current.value
          }
        },
      })
      idRef.current.value = '';
      userNameRef.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box display='flex' className={classes.wrapper}>
      <Box className={classes.box}>
        <InputTabs idRef={idRef} userNameRef={userNameRef} />
      </Box>
      <Button onClick={onSubmit} type='submit' variant='text' className={classes.button}>Submit</Button>
    </Box>
  );
};
