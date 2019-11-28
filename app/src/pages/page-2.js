import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const SecondPage = ({ data }) => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    
    {data.posts.allPosts.map(post => (
      <div key={post.id}>
        {post.id} - {post.title}
      </div>
    ))}
  </Layout>
);

export const query = graphql`
  query getAllPosts {
    posts {
      allPosts {
        id
        title
      }
    }
  }
`;


export default SecondPage;
