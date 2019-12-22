import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../components/LoadingPage';

test('should render loading image', () =>{
    const wrapper = shallow(<LoadingPage />); // to get instance of LoadingPage
    expect(wrapper).toMatchSnapshot();
});