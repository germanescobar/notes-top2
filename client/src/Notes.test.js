import React from 'react';
import Notes from './Notes';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Notes />);
});

it('renders the notes', () => {
  const wrapper = shallow(<Notes />);
  expect(wrapper.find(".note").length).toBe(0);

  wrapper.setState({ notes: [{ _id: "1", title: "Nota 1", description: "Nota 1" }]});
  expect(wrapper.find(".note").length).toBe(1);

  const n1 = wrapper.find(".note").first();
  expect(n1.childAt(0).text()).toBe("Nota 1");
});

it('loads empty notes', done => {
  const data = [];
  const mockFetch = Promise.resolve({ json: () => Promise.resolve(data) });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);

  const wrapper = shallow(<Notes />);
  expect(global.fetch).toHaveBeenCalledTimes(1);

  process.nextTick(() => {
    expect(wrapper.state()).toEqual({ notes: [] });
    global.fetch.mockClear();
    done();
  });
});

it('loads notes', done => {
  const data = [{ _id: "1", title: "nota 1", description: "nota 1" }];
  const mockFetch = Promise.resolve({ json: () => Promise.resolve(data) });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch);

  const wrapper = shallow(<Notes />);
  expect(global.fetch).toHaveBeenCalledTimes(1);

  process.nextTick(() => {
    expect(wrapper.state()).toEqual({ notes: data });
    global.fetch.mockClear();
    done();
  });
});
