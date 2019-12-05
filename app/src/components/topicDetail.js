import React from 'react';
import styled from '@emotion/styled';

const TopicTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const TopicRow = styled.div`
  display: flex;
`;

const FieldName = styled.div`
  flex-grow: 1;
  font-style: italic;
`;
const FieldDetail = styled.div`
  flex-basis: 70%;
`;

const topicDetail = ({ data: { data: { topic } = {} } = {} }) => {
  return (
    <TopicTable>
      <TopicRow>
        <FieldName>Date:</FieldName>
        <FieldDetail>{topic.date}</FieldDetail>
      </TopicRow>
      <TopicRow>
        <FieldName>Topic:</FieldName>
        <FieldDetail>{topic.name}</FieldDetail>
      </TopicRow>
      <TopicRow>
        <FieldName>Owner:</FieldName>
        <FieldDetail>{topic.owner}</FieldDetail>
      </TopicRow>
      <TopicRow>
        <FieldName>Status:</FieldName>
        <FieldDetail>{topic.status}</FieldDetail>
      </TopicRow>
      <TopicRow>
        <FieldName>SME Group:</FieldName>
        <FieldDetail>{topic.smeGroup}</FieldDetail>
      </TopicRow>
      <TopicRow>
        <FieldName>Duration:</FieldName>
        <FieldDetail>{topic.duration}</FieldDetail>
      </TopicRow>
      <TopicRow>
        <FieldName>Note:</FieldName>
        <FieldDetail>{topic.notes}</FieldDetail>
      </TopicRow>
    </TopicTable>
  );
};

export default topicDetail;
