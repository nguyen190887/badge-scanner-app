import React from 'react'
import { wrapRootElement as ApolloWrapRootElement } from './apollo';
import { Layout } from './components';

export const wrapRootElement = ({ element }) => (
  <ApolloWrapRootElement>
    <Layout>{element}</Layout>
  </ApolloWrapRootElement>
)

