import './App.css';
// import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

import Navbar from './components/Navbar';
// import { saveBook } from './utils/API';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path = '/' Component={SearchBooks} />
            <Route exact path = '/saved' Component={SavedBooks} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
