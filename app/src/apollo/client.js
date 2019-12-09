import fetch from 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { toIdValue } from 'apollo-utilities';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

const cacheInstance = new InMemoryCache({
  addTypename: true,
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Topic': return `Topic:${object.topicId}`;
      default: return defaultDataIdFromObject(object); // fall back to default handling
    }
  },
  cacheRedirects: {
    Query: {
      topic: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Topic', topicId: args.topicId })),
    },
  },
});

const cache = (typeof window === 'undefined') ?
  cacheInstance :
  cacheInstance.restore(window.__APOLLO_STATE__);

const url = `${process.env.APPSYNC_ENDPOINT}`;

const httpLink = createHttpLink({
  uri: url,
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
  createAuthLink({
    url,
    region: `${process.env.REGION}`,
    auth: {
      type: 'API_KEY',
      apiKey: `${process.env.APPSYNC_API_KEY}`
    }
  }),
  createSubscriptionHandshakeLink(url, httpLink)
]);

export const client = new ApolloClient({
  link,
  cache,
  fetch,
});
