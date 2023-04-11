import { shallow } from 'enzyme';
import * as React from 'react';
import { WalletTradeItem } from './WalletTradeItem';
const defaultProps = {
    balance: 0,
    currency: 'btc',
};
const setup = (props = {}) => shallow(React.createElement(WalletTradeItem, Object.assign({}, { ...defaultProps, ...props })));
describe('WalletTradeItem', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('base-wallet-trades-item')).toBeTruthy();
    });
    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });
});
