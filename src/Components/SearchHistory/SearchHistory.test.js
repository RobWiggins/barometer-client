import React from 'react';
import ReactDOM from 'react-dom';
import SearchHistory from './SearchHistory';
import sampleState from '../../sampleState.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('testing SearchHistory Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchHistory handleSubmitQuery={jest.fn()}
      queries={sampleState.queries} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders a SearchHistory list with queries and handleSubmit props', () => {
    const wrapper = shallow(<SearchHistory handleSubmitQuery={jest.fn()}
      queries={sampleState.queries} />).find('#searchHistory');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('marks the active past search query as pressed', () => {
    const wrapper = shallow(<SearchHistory handleSubmitQuery={jest.fn()}
      activeHistoryQuery="trees"
      queries={sampleState.queries} />);

    expect(wrapper.find('button').at(1).hasClass('activePastSearch')).toBe(true);
    expect(wrapper.find('button').at(1).prop('aria-pressed')).toBe(true);
  });

  it('submits past search queries with a history flag', () => {
    const handleSubmitQuery = jest.fn();
    const wrapper = shallow(<SearchHistory handleSubmitQuery={handleSubmitQuery}
      queries={sampleState.queries} />);

    wrapper.find('button').at(1).simulate('click', { preventDefault: jest.fn() });

    expect(handleSubmitQuery).toHaveBeenCalledWith('trees', true);
  });
});
