import { shallow } from 'enzyme';
import * as React from 'react';
import { OrderInput } from './OrderInput';
const defaultProps = {
    currency: 'eth',
    handleChangeValue: () => undefined,
    value: '',
};
const setup = (props = {}) => shallow(React.createElement(OrderInput, Object.assign({}, { ...defaultProps, ...props })));
describe('InputBlock', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('base-order-input')).toBeTruthy();
    });
    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });
    it('should set correct currency code to the child components', () => {
        const wrapper = setup();
        const { children } = wrapper.find('CryptoIcon').props();
        expect(children).toContain('ETH');
    });
});
