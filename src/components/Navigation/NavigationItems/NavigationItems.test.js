import React from 'react';
import { configure, shallow } from 'enzyme'; // shallow allow us rendering component. Shallow rendering. Content of
// nested componennts is not rendered
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });
// describe takes 2 arguments 1- Test bundle this file holds, i.e. kind of tests 2- Testing function
// it - also takes 2 arguments, 1- description that appears in console 2 - Testing function describing actual test
// Enzyme allows us to render just the NavigationItems component standalone, instead of rendering the whole App. Allows isolated tests
describe('<NavigationItems/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render 2 <NavigationItem/>> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render 3 <NavigationItem/>> elements if authenticated', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render 3 <NavigationItem/>> elements if authenticated', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(
        <NavigationItem link='/logout'>
          Log out
        </NavigationItem>
      )
    ).toEqual(true);
  });
});
