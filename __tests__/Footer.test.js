import React from 'react'
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Footer from '../src/components/Footer';

Enzyme.configure({ adapter: new Adapter() });



describe('Header component', () => {    
    it('should ', () => {
        const wrapper = shallow(<Footer />)                           
        expect(wrapper.exists()).toBe(true);                
        
    });
})