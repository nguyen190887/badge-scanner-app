import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import UserInfo from '../components/userInfo';
import TopicList from '../components/topicList';

console.log('Index', new Date().toISOString());
const IndexPage = ({data}) => {
  return (
  <Layout>
    <SEO title="Scan your badge!" />
    <UserInfo />
    <TopicList data={data}/>
  </Layout>
)};

// todo: update to user client query
export const query = graphql`
  query getAllTopics {
    topics {
      allTopics {
        no
        date
        name
        owner
        status
        smeGroup
        duration
        notes
      }
    }
  }
`;

export default IndexPage;
