import React from 'react'
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Header from '../src/components/Header';

Enzyme.configure({ adapter: new Adapter() });

describe('Header component', () => {    
    it('should ', () => {
        const wrapper = shallow(<Header />)                           
        expect(wrapper.exists()).toBe(true);                        
    });
})