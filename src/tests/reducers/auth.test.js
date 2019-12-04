import authReducer from '../../reducers/auth';


test('should set uid for login', () => {
    const uid = '123bca';
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer(uid, action); // we can parse uid or an empty object {}
    expect(state.uid).toBe(uid); // if parse an object above then here use action.uid

});

test('should clear uid for logout', () => {
        const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ uid: 'anything'}, action); // action object should clear the id on logout. so uid can contain anything
    expect(state).toEqual({}); // uid expect to be empty as action object should remove above.
});
