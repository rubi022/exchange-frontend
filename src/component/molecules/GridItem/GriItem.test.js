import { shallow } from 'enzyme';
import * as React from 'react';
import { GridItem } from './GridItem';
const defaultProps = {
    children: 'Children',
};
const setup = (props = {}) => shallow(React.createElement(GridItem, Object.assign({}, { ...defaultProps, ...props })));
describe('GridItem', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('base-grid-item')).toBeTruthy();
    });
    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });
});
