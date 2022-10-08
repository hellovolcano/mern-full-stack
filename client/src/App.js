import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SolitaryPoem from './pages/SolitaryPoem';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {

  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#303b47',
      },
      secondary: {
        main: '#66454f',
      },
      highlight: {
        main: '#666445',
      },
      white: {
        main: 'antiquewhite',
      },
      error: {
        main: '#66454f',
      },
    },
    overrides: {
      MuiButton: {
        root: {
          background: 'linear-gradient(45deg, #66454f 30%, #303b47 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
    typography: {
      h1: {
        fontFamily: 'Amatic SC',
        fontSize: '6.2rem',
      },
      h2: {
        fontFamily: 'Amatic SC',
        fontSize: '3.7rem',
      },
      body1: {
        fontFamily: 'Open Sans',
      },
      body2: {
        fontFamily: 'Open Sans',
      },
      button: {
        fontFamily: 'Open Sans',
      },
      caption: {
        fontFamily: 'Open Sans',
      },
      overline: {
        fontFamily: 'Open Sans',
      },
      subtitle2: {
        fontFamily: 'Open Sans',
      },
      subtitle1: {
        fontFamily: 'Open Sans',
      },
      h6: {
        fontFamily: 'Amatic SC',
        fontSize: '1.6rem',
      },
      h5: {
        fontFamily: 'Amatic SC',
        fontSize: '1.7rem',
      },
      h4: {
        fontFamily: 'Amatic SC',
        fontSize: '2.3rem',
      },
      h3: {
        fontFamily: 'Amatic SC',
        fontSize: '3.2rem',
      },
    },
  })

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
      <Router>
          <div className='flex-column justify-flex-start min-100-vh'>
            <Header />
            <div className='container'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={ <Login /> }/>
                <Route path="/signup" element={ <Signup /> }/>
                <Route path="/profile">
                  <Route path=":username" element={ <Profile /> } />
                  <Route path="" element={ <Profile /> } />
                </Route>
                <Route path="/poem/:id" element={ <SolitaryPoem /> }/>
                <Route path ="*" element={ <NoMatch />} />
              </Routes>

            </div>
            <Footer />
          </div>
      </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

