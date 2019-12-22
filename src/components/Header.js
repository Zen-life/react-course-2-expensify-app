import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    // this is a regular html5 header tag
    //  exact={true} is del as no longer linking to the root '/'
    <header className="header">
        <div className="content-container">  
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Expensify</h1>
                </Link>
                <button className="button button--link" onClick={startLogout}>Logout</button>
            </div>
        </div> 
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

// no state required on this component so undefined for first arg.
export default connect(undefined, mapDispatchToProps)(Header);