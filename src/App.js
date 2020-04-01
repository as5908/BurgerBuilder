import React, { Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
import {
  Route,
  Switch,
  withRouter,
  Redirect
} from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';

const Auth = React.lazy(() =>
  import('./containers/Auth/Auth')
);
const Orders = React.lazy(() =>
  import('./containers/Orders/Orders')
);
const Checkout = React.lazy(() =>
  import('./containers/Checkout/Checkout')
);
class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route
          path='/auth'
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Auth />
            </Suspense>
          )}
        />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route
            path='/checkout'
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Checkout />
              </Suspense>
            )}
          />
          <Route
            path='/orders'
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </Suspense>
            )}
          />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route
            path='/auth'
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Auth />
              </Suspense>
            )}
          />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () =>
      dispatch(actions.authCheckState())
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
