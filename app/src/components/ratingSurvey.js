import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const RatingChoices = styled('ul')`
  text-decoration: none;
  list-style: none;

  > * {
    display: inline-block;
    margin-right: 15px;
  }
`;

const RatingsContainer = styled('div')`
  display: flex;
`;

const Rating = styled('li')`
  > label {
    margin-right: 5px;
  }
`;

const SurveyTitle = ({ title }) => {
  return <h1>{title}</h1>;
};

const Email = ({ email }) => {
  return <span>{email}</span>;
};

const Ratings = ({ start, length, rating, setRating }) => {
  return (
    <>
      <h3>Your ratings? *</h3>
      <RatingsContainer>
        <span>
          Min
          <span role="img" aria-label="min">
            &#128554;
          </span>
        </span>
        <RatingChoices>
          {Array(length + start - 1)
            .fill(0)
            .map((x, index) => {
              const value = start + index;
              const id = `id${value}`;
              const isChecked = parseInt(value) === parseInt(rating);
              return (
                <Rating key={index}>
                  <label htmlFor={id}>{value}</label>
                  <input
                    type="radio"
                    id={id}
                    name="rating"
                    value={value}
                    checked={isChecked}
                    onChange={e => setRating(e.target.value)}
                  />
                </Rating>
              );
            })}
        </RatingChoices>
        <span>
          Max
          <span role="img" aria-label="max">
            &#128540;
          </span>
        </span>
      </RatingsContainer>
    </>
  );
};

const Comment = ({ content, setComment }) => {
  return (
    <>
      <h3>Any comment/recommentdation to make this session better</h3>
      <textarea
        rows="4"
        cols="50"
        value={content}
        onChange={e => setComment(e.target.value)}
      />
    </>
  );
};

const RatingSurvey = ({
  title = 'Dynamic Title',
  email = 'Dynamic Email',
  start = 1,
  length = 5,
}) => {
  const [rating, setRating] = useState(start);
  const [comment, setComment] = useState('');
  const [isValid, setValidStatus] = useState(true);

  const handleSubmit = () => {
    rating ? console.log('submit form') : setValidStatus(false);
  };

  console.log('rating', rating);

  return (
    <div>
      <SurveyTitle title={title} />
      <Email email={email} />
      <Ratings
        start={start}
        length={length}
        setRating={setRating}
        rating={rating}
      />
      <Comment comment={comment} setComment={setComment} />
      {!isValid && 'Please fill in the required fields'}
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <sub>* is required field</sub>
      </div>
    </div>
  );
};

export default RatingSurvey;
