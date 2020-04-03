import React from 'react';
import { BurgerBuilder } from './BurgerBuilder';
import { configure, shallow } from 'enzyme'; // shallow allow us rendering component. Shallow rendering. Content of
// nested componennts is not rendered
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BurgerBuilder onInitIngredients={() => {}} />
    );
  });
  it('should render <BuildControls/> when receiving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
