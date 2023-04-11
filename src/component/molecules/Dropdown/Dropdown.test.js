import { mount } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { Dropdown } from './Dropdown';
describe('Dropdown', () => {
    const onSelect = spy();
    beforeEach(() => {
        onSelect.resetHistory();
    });
    describe('#render', () => {
        it('should render dropdown', () => {
            const testData = ['Limit', 'Market'];
            const wrapper = mount(React.createElement(Dropdown, { list: testData }));
            expect(wrapper).toMatchSnapshot();
        });
        it('should have default className', () => {
            const testData = ['Limit', 'Market'];
            const wrapper = mount(React.createElement(Dropdown, { list: testData }));
            const className = wrapper.find('div').first().props().className;
            expect(className).toContain('base-dropdown');
        });
        it('should open dropdown on click', () => {
            const testData = ['Limit', 'Market'];
            const wrapper = mount(React.createElement(Dropdown, { list: testData }));
            const input = wrapper.find('div.base-dropdown__input').first();
            input.simulate('click');
            const list = wrapper.find('ul').first().props();
            expect(list.className).toContain('base-dropdown__list');
        });
        it('should change dropdown value', () => {
            const testData = ['Limit', 'Market'];
            const wrapper = mount(React.createElement(Dropdown, { list: testData }));
            const input = wrapper.find('div.base-dropdown__input').first();
            input.simulate('click');
            // @ts-ignore
            const item = wrapper.find('li').first().props().children.props.children;
            expect(item).toBe(testData[0]);
        });
        it('should close dropdown after choose value', () => {
            const testData = ['Limit', 'Market'];
            const wrapper = mount(React.createElement(Dropdown, { list: testData }));
            const input = wrapper.find('div.base-dropdown__input').first();
            const className = wrapper.find('div.base-dropdown__input').first().props().className;
            input.simulate('click');
            const item = wrapper.find('li').first();
            item.simulate('click');
            expect(className).toContain('base-dropdown__input');
        });
        it('should handle onSelect callback', () => {
            const testData = ['Limit', 'Market'];
            const onClick = spy();
            const wrapper = mount(React.createElement(Dropdown, { list: testData, onSelect: onClick }));
            const input = wrapper.find('div.base-dropdown__input').first();
            input.simulate('click');
            const item = wrapper.find('li').last();
            item.simulate('click');
            expect(onClick.calledOnceWith(1)).toBeTruthy();
        });
    });
});
