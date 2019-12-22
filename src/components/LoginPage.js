import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
        <h1 className="box-layout__title">Expensify</h1>
        <p>it's time to get your expenses under control</p>
        <button className="button" onClick={startLogin}>Login with Google</button>
        </div>
        
    </div>
);
    
// the startLogin prop in the object, will dispatch the startlogin action()
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

// exporting the connected version of the component
// 'undefined' represent mapStateToProps, which we don't need this time
// (LoginPage) is calling the mapDispatchToProps connect and parse in the
// component 'LoginPage' that we want to connect
export default connect(undefined, mapDispatchToProps)(LoginPage);