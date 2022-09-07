import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloProvider } from '@apollo/client';
import { Grommet } from 'grommet';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '~/context/Auth';
import App from './App';
import client from './services/apolloClient';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Grommet>
            <Toaster position='top-right' />
            <App />
          </Grommet>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
