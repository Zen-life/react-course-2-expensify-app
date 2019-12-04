
// setting the reducer state to an object
// we will store property uid in the state object when user is logged in
// when the user logout the object will be wiped empty again
// using object enable us to store more things later if req
// the action is what is getting dispatched
export default (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};