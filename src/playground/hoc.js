import React from 'react';
import ReactDOM from 'react-dom';

// regular component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// As 'withAdminWarning' can be used on other component, use a generic name (WrappedComponent), 
// instead of the component name being parsed e.g. Info
// it is common to use WrappedComponent, note component naming conversion; uppercase.
const withAdminWarning = (WrappedComponent) => {
// this is where a new component (hoc) is returned. Inside return, an instance 
// of the regular component 'e.g. Info' (being represent with WrappedComponent, is rendered
    return (props) => (
        <div>
        {props.isAdmin && <p>This is private info. Please do not share</p>}
        <WrappedComponent {...props} /> 
        </div>
    );
};

const requireAuthenticaion = (WrappedComponent) => {
// this is where a new component (hoc) is returned. Inside return, an instance 
// of the regular component 'e.g. Info' (being represent with WrappedComponent, is rendered
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to see private info.</p>}
            
        </div>
    );
};

// parsing the Info component. NB. more components can be parse in here
// what we get back is stored in the AdminInfo component
// spreading the the props allows it to all the key/value data in this case info and display it
const AdminInfo = withAdminWarning(Info); 
const AuthInfo = requireAuthenticaion(Info);

// higher order component (hoc)

// ReactDOM.render(<AdminInfo isAdmin={false} info="Here are the details" />, document.getElementById('app'));

ReactDOM.render(<AuthInfo isAuthenticated={true} info="Here are the details" />, document.getElementById('app'));