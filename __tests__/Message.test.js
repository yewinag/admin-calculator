import React from 'react';
import TestRenderer from 'react-test-renderer';
import ResourceContext from '../src/context';
import Message from '../src/components/Message';


describe('Message Alert component', () => {
    it('should render two error message', () => {
        const mockDate = {
            cart: null,
            error: [{msg:'You need to select valid Date'}, {msg:'You need to select product'}]
        }
        const wrapper = new TestRenderer.create(
            <ResourceContext.Provider value={{state: mockDate}}>
                <Message />
            </ResourceContext.Provider>
        );
        expect(wrapper.toJSON().length).toBe(2)        
    });
    it('should render two error and one success alert', () => {
        const mockDate = {
            cart: {code: 200},
            error: [{msg:'You need to select valid Date'}, {msg:'You need to select product'}]
        }
        const wrapper = new TestRenderer.create(
            <ResourceContext.Provider value={{state: mockDate}}>
                <Message />
            </ResourceContext.Provider>
        );
        expect(wrapper.toJSON().length).toBe(3)    
    });
});
