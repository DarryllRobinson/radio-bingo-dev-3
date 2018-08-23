import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
//import Home from './Home/Home';
import Landing from './components/Landing';
import Card from './components/Card';
import Card1 from './components/Card_1';
import Card2 from './components/Card_2';
import Card3 from './components/Card_3';
import Test from './components/Test';
import Profile from './Auth/Profile';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/landing" render={(props) => <Landing auth={auth} {...props} />} />
          <Route path="/card" render={(props) => <Card auth={auth} {...props} />} />
          <Route path="/card_1" render={(props) => <Card1 auth={auth} {...props} />} />
          <Route path="/card_2" render={(props) => <Card2 auth={auth} {...props} />} />
          <Route path="/card_3" render={(props) => <Card3 auth={auth} {...props} />} />
          <Route path="/test" render={(props) => <Test auth={auth} {...props} />} />
          <Route path="/profile" render={(props) => <Profile auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
      </Router>
  );
}
