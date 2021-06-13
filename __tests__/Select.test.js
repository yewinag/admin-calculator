import React from 'react'
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Select from '../src/components/Select';

Enzyme.configure({ adapter: new Adapter() });

describe('Select component', () => {    
    it('should render select', () => {
        const wrapper = shallow(<Select />)                           
        expect(wrapper.exists()).toBe(true);                
        console.log(wrapper.children())
        // expect(true).toBe(true)
    });
})