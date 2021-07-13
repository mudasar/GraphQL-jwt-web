import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { getAccessToken } from './accessToken';
import {setContext} from '@apollo/client/link/context'
import { App } from './App';
import jwt_decode from 'jwt-decode';
import { getAccessTokenWithRefreshToken } from './GetRefreshToken';
//import { onError } from "apollo-link-error";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const authLink = setContext(async(_, { headers }) => {
  // get the authentication token from local storage if it exists##
  //   const token = localStorage.getItem('token');
  let token = getAccessToken();
  if (token) {
    //console.log(token);
    const payload = jwt_decode(token) as any;
    //console.log(payload);
    const expiry = payload.exp;
    const now = new Date();
    //console.log('calling the link');
    if( now.getTime() > expiry * 1000 ) {
      //console.log('token expired');
      await getAccessTokenWithRefreshToken();
      token = getAccessToken();
      //console.log('new token is', token);
    }
  }else{
    // push to login page or create a new token from refresh token
    await getAccessTokenWithRefreshToken();
    token = getAccessToken();
  }
  // TODO: check if token is about to expire or expired request a new token and continue with the request
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
  });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
