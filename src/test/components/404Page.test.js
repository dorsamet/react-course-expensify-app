import React from 'react';
import { shallow } from 'enzyme';
import { NotFoundPage } from '../../components/404Page';

test('Should render NotFoundPage correctly', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
})