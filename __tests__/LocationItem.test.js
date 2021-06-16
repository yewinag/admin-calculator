import React from 'react';
import TestRenderer from 'react-test-renderer';
import LocationItem from '../src/components/LocationItem';
import ResourceContext from '../src/context';
const mockDataItem = {
    name: "NaNa",
    id: 2,
    total_unit: 1500,
    total_cost: 2650
}
describe('location Table item', () => {
    it('should render location item', () => {
        const wrapper = new TestRenderer.create(
            <ResourceContext.Provider value={{state: []}}>
                <LocationItem  item={mockDataItem}/>
            </ResourceContext.Provider>
        );
        expect(wrapper.toJSON().children.length).toBe(4)
        expect(wrapper.toTree().props.item.name).toBe('NaNa')
        expect(wrapper.toTree().props.item.total_unit).toBe(1500)
        expect(wrapper.toTree().props.item.total_cost).toBe(2650)
    });
});