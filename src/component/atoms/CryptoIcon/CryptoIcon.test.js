import { shallow } from 'enzyme';
import * as React from 'react';
import { CryptoIcon } from './CryptoIcon';
const defaultProps = {
    code: 'BTC',
};
const setup = (props = {}) => shallow(React.createElement(CryptoIcon, Object.assign({}, { ...defaultProps, ...props })));
describe('CryptoIcon', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('base-crypto-icon')).toBeTruthy();
    });
    it('should render children', () => {
        const amount = 123;
        const wrapper = setup({ children: [amount] });
        expect(wrapper.text()).toEqual(` ${amount}`);
    });
    it('should pull icon with the right icon class', () => {
        const icon = setup().children('span');
        expect(icon.hasClass(`base-crypto-font-${defaultProps.code}`))
            .toBeTruthy();
    });
    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });
});
