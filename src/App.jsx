import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import Elements from './components/pages/Elements';
import { AUTHENTICATED } from './actions/types';
import requireAuth from './components/hoc/RequireAuth';
import noRequireAuth from './components/hoc/RequireNotAuth';
import Menu from './components/Menu'
import { Grid } from 'react-bootstrap'
import Home from './components/pages/Home'
import logger from 'redux-logger'
import './stylesheets/App.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers);

const user = localStorage.getItem('token');

if(user) {
  store.dispatch({ type: AUTHENTICATED });
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Menu />
                <Grid>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Home" component={Home} />
                    <Route path="/signin" component={noRequireAuth(SignIn)} />
                    <Route path="/signup" component={noRequireAuth(SignUp)} />
                    <Route path="/elements" component={requireAuth(Elements)} />
                    <Route path="/signout" component={SignOut} />
                  </Switch>
                </Grid>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;


