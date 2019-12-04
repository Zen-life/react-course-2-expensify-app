import { login, logout } from '../../actions/auth';

test('should generate login action object with uid', () => {
    const uid = '123bca';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});


test('shoould generate logout action object with no uid', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });

});