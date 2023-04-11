import { shallow } from 'enzyme';
import * as React from 'react';
import { Withdraw } from './Withdraw';
const defaultProps = {
    currency: 'BTC',
    fee: 0.1,
    onClick: () => undefined,
};
const setup = (props = {}) => shallow(React.createElement(Withdraw, Object.assign({}, { ...defaultProps, ...props })));
describe('Withdraw', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('base-withdraw')).toBeTruthy();
    });
    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });
    it('should change address in state', () => {
        const wrapper = setup();
        const children = wrapper.children();
        const address = children.first().children().first().children().first().children().last();
        const props = address.props();
        props.onChangeValue('potato');
        expect(wrapper.state()).toEqual({ address: 'potato', amount: 0, total: 0, otpCode: '' });
    });
    it('should change amount and total in state', () => {
        const wrapper = setup();
        const children = wrapper.children();
        // tslint:disable-next-line:no-magic-numbers
        const address = children.first().children().at(2).children().first().children().last();
        const props = address.props();
        props.onChangeValue(1);
        expect(wrapper.state()).toEqual({ address: '', amount: 1, total: 0.9, otpCode: '' });
    });
    it('should change amount and total in state', () => {
        const wrapper = setup();
        const children = wrapper.children();
        // tslint:disable-next-line:no-magic-numbers
        const address = children.first().children().at(2).children().first().children().last();
        const props = address.props();
        // tslint:disable-next-line:no-magic-numbers
        props.onChangeValue(-5);
        expect(wrapper.state()).toEqual({ address: '', amount: -5, total: 0, otpCode: '' });
    });
});
