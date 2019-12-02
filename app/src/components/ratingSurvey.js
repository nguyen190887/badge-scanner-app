import React, { useState } from 'react';

const SurveyTitle = ({ title = 'Dynamic Title' }) => {
  return <h1>{title}</h1>;
};

const Email = ({ email = 'Dynamic Email' }) => {
  return <span>{email}</span>;
};

const Ratings = ({ start, length, rating, setRating }) => {
  return (
    <>
      <h3>Your ratings? *</h3>
      <div>
        <span>
          Min
          <span role="img" aria-label="min">
            &#128554;
          </span>
        </span>
        <ul>
          {Array(length + start - 1)
            .fill(0)
            .map((x, index) => (
              <li key={index}>
                {start + index}
                <input
                  type="radio"
                  name="rating"
                  value={start + index}
                  checked={rating === start + index}
                  onChange={e => setRating(e.target.value)}
                />
              </li>
            ))}
        </ul>
        <span>
          Max
          <span role="img" aria-label="max">
            &#128540;
          </span>
        </span>
      </div>
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

const RatingSurvey = ({ title, email, start = 1, length = 5 }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [isValid, setValidStatus] = useState(true);

  const handleSubmit = () => {
    rating ? console.log('submit form') : setValidStatus(false);
  };

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
      <button onClick={handleSubmit} />
      <sub>* is required field</sub>
    </div>
  );
};

RatingSurvey.name = 'RatingSurvey';

export default RatingSurvey;
