import { firebase, googleAuthProvider } from '../firebase/firebase';

// login actions for the auth reducer. parse in the uid on login
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

// we create the googleAuthProvider and we parse in to a function
// inside the isth return, we trying to call a firebase related method
// we use return again for the Promise chain, so other chain can be attached
// signInWithPopup() takes the Provider as its only argument
// it allows us to display a popup for the user to sign in using the google
// provider service authentication ie. a google account details.
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);

    };
};

// logout actions for the auth reducer
export const logout = () => ({
    type: 'LOGOUT'
}); 

export const startLogout = () => {
    // redux thunk enable us to return a function
    return () => {
        return firebase.auth().signOut(); // no argument required. return aids Promise
    };
};