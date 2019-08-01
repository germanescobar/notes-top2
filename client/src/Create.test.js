import React from 'react';
import Create from './Create';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Create />);
});

it('create notes', done => {
  jest.spyOn(global, 'fetch').mockImplementation((arg, ops) => {
    if(ops.body === '{"title":"test 1","description":"description test 1"}') {
      return Promise.resolve({ json: () => Promise.resolve({ok}) })
    }
    return Promise.reject('No se envió la información esperada')
  });

  const wrapper = shallow(< Create />)
  wrapper.find('#title').simulate('change', { target: { value: 'test 1'}})
  wrapper.find('#description').simulate('change', { target: { value: 'description test 1'}})

  wrapper.find('form').simulate('submit', { preventDefault() {} });

  process.nextTick(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear();
    done();
  })
});

