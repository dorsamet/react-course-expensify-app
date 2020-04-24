import { shallow } from 'enzyme';
import React from 'react';
import LoadingPage from '../../components/LoadingPage';

test('should render the render page', () => {
    const wrapper = shallow(<LoadingPage/>);
    expect(wrapper).toMatchSnapshot();
})
