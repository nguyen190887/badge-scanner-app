import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: `${process.env.APPSYNC_ENDPOINT}`,
  request: (operation) => {
    operation.setContext({
      headers: {
        'X-Api-Key': `${process.env.APPSYNC_API_KEY}`
      }
    })
  },
  fetch,
});
