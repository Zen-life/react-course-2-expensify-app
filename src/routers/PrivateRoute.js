import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// using instance of Route and parse in props
// destructuring for the func arg
// component is destructured from Route in AppRouter and renamed for rendering
// parse the props 'isAuthenticated, component: Component' to component
export const PrivateRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

// implicitly return an object
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});
// isAuthenticaed can be called anything e.g. isLogin
// the auth.uid exist in the state. if uid exist, logged in else not logged in

export default connect(mapStateToProps)(PrivateRoute);
// no need for a 2nd arg, as nothing will be dispacthed, so no mapDispatchToProps