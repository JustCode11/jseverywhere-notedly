import React from 'react';
// import Apollo Client libraries
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    gql
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { cache } from "./cache";

// import global styles
import GlobalStyle from './components/GlobalStyle';
// import routes
import Pages from './pages/index';

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
    }
`;

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });

// check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// configure Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    typeDefs,
    resolvers: {},
    connectToDevTools: true
});

/*const data = {
    isLoggedIn: !!localStorage.getItem('token')
};
cache.modify({ data });*/

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    )
}

export default App;
