/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';
import ToastItem from '../src/toastItem';

describe('Render the Toast Item', () => {
  it('Should be able to render the component', () => {
    const app = shallow(<ToastItem />);
    expect(app.containsMatchingElement(<div />)).toEqual(true);
  });
});
