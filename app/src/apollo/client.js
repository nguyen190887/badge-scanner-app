import fetch from 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { toIdValue } from 'apollo-utilities';
import dataIdFromObject from './dataIdFromObject';

const cacheInstance = new InMemoryCache({
  addTypename: true,
  dataIdFromObject,
  cacheRedirects: {
    Query: {
      topic: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Topic', topicId: args.topicId })),
    },
  },
});

const cache = (typeof window === 'undefined') ? cacheInstance : cacheInstance.restore(window.__APOLLO_STATE__);

const httpLink = createHttpLink({
  uri: `${process.env.APPSYNC_ENDPOINT}`
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Api-Key': `${process.env.APPSYNC_API_KEY}`,
    }
  }
});

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  authLink.concat(httpLink)
]);

export const client = new ApolloClient({
  link,
  cache,
  fetch,
});
