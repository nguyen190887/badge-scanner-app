import React, { useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { submitSurvey } from '../graphql/mutations';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';

const useQuestionStyles = makeStyles(theme => ({
  required: {
    '&::before': {
      content: '"*"',
      color: red[700],
      marginRight: '5px'
    }
  },
})); 

const Question = ({ children, isRequired = true }) => {
  const classes = useQuestionStyles();
  return <Typography variant="h6" className={isRequired ? classes.required : ''}>{children}</Typography>
};

const Description = ({ children }) => {
  return <Typography variant="caption">{children}</Typography>
};

const RatingQuestion = ({ question, description, name, handleChange, value }) => {
  return <Grid container direction="column">
    <Question>{question}</Question>
    <Description>{description}</Description>
    <Rating
      name={name}
      value={value}
      onChange={(event, value) => {
        handleChange(value);
      }}
    />
  </Grid> 
};

const RatingSurvey = ({
  title= "Title",
  email,
  start = 1,
  length = 5,
  topicId,
  userId,
}) => {
  const [ratings, setRatings] = useState([3, 3, 3]);
  const [comment, setComment] = useState('');
  const [isValid, setValidStatus] = useState(true);

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   if (!rating || !email || !rating) {
  //     setValidStatus(false);
  //   } else {
  //     try {
  //       await API.graphql(
  //         graphqlOperation(submitSurvey, {
  //           topicId,
  //           email,
  //           rating,
  //           comment,
  //           userId,
  //         })
  //       );

  //       console.log('after summiting');
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // };

  const handleChange = () => {

  };

  const ratingQuestions = [
    {
      question: 'How is the Content?',
      description: 'Relevant to work / Enough deep (in comparison with seniority of presenter) / ... everything about the content',
      name: 'content'
    },
    {
      question: 'How is the Quality of Slide & Presentation Skill of presenter?',
      description: 'Is the slide good? / Is the presenter good at presenting the topic? / ... everything about "UI"',
      name: 'ui'
    },
    {
      question: 'Your overall rating?',
      description: '',
      name: 'overall'
    }
  ];

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" spacing={3}>
        <Grid item>        
          <Typography variant="h3">{title}</Typography>
          <Typography variant="caption" color="error">* is required</Typography>
        </Grid>
        <Grid item>
          <TextField required fullWidth label="Email" />
        </Grid>
          {ratingQuestions.map((x, index) => <Grid item><RatingQuestion question={x.question} description={x.description} name={x.name} value={ratings[index]} handleChange={handleChange} /></Grid>)}
        <Grid item>
          <Question>Any comment/recommendation to make this session better?</Question>
          <TextField
            fullWidth
            margin="normal"
            label="Comment"
            multiline
            rows="4"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" size="large" color="primary">Submit</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RatingSurvey;
