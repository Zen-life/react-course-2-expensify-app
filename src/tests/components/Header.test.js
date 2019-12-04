import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';


test('should render header correctly', () => {
    const wrapper = shallow(<Header startLogout={ () => {}} />); // now has a prop
    expect(wrapper).toMatchSnapshot(); // using enzyme to take a snapshot
});

test('should call startLogout on button click', () => {
 const startLogout = jest.fn();
 const wrapper = shallow(<Header startLogout={startLogout} />); // the prop startLogout is set to the spy startLogout created above
 wrapper.find('button').simulate('click');
 expect(startLogout).toHaveBeenCalled();
});