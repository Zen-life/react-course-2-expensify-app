import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';



test('should render header correctly', () => {
    const wrapper = shallow(<Header />); // using enzyme to take a snapshot
    expect(wrapper).toMatchSnapshot();
});