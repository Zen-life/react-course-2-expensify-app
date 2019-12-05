import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


// using instance of Route and parse in 'rest' of props
// destructuring for the func arg
// component is destructured from Route in AppRouter and renamed for rendering
// parse the props 'isAuthenticated, component: Component' to component
export const PublicRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to="/dashboard" />
        ) : (
            <Component {...props} />
        )
    )} />
);

// implicitly return an object
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});
// isAuthenticaed can be called anything e.g. isLogin
// the auth.uid exist in the state. if uid exist, logged in else not logged in

export default connect(mapStateToProps)(PublicRoute);
// no need for a 2nd arg, as nothing will be dispacthed, so no mapDispatchToProps