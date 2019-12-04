import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should correctly render the LoginPage', () => {
    const wrapper = shallow(<LoginPage />); // get instance of LoginPage
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
const startLogin = jest.fn();
const wrapper = shallow(<LoginPage startLogin={startLogin}/>); // the prop startLogout is set to the spy startLogout created above
wrapper.find('button').simulate('click');
expect(startLogin).toHaveBeenCalled();
});