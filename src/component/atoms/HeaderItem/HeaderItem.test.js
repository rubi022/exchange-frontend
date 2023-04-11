import { shallow } from 'enzyme';
import * as React from 'react';
import { HeaderItem } from './HeaderItem';
const defaultProps = {
    amount: 12.1,
    label: '24 hour price',
    currency: 'btc',
};
const setup = (props = {}) => shallow(React.createElement(HeaderItem, Object.assign({}, { ...defaultProps, ...props })));
describe('HeaderItem', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('base-header-item')).toBeTruthy();
    });
    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });
    it('should render correct label', () => {
        const wrapper = setup();
        const { className } = wrapper.find('div').last().props();
        expect(className).toContain('base-header-item__label');
    });
    it('should render correctly with currency', () => {
        const wrapper = setup();
        expect(wrapper.find('div').get(1).props.className)
            .toContain('base-header-item__amount-default');
    });
    it('should render correctly with plus sign', () => {
        const wrapper = setup({ currency: undefined, sign: '+' });
        expect(wrapper.find('div').get(1).props.className)
            .toContain('base-header-item__amount-plus');
    });
    it('should render correctly with minus sign', () => {
        const wrapper = setup({ currency: undefined, sign: '-' });
        expect(wrapper.find('div').get(1).props.className)
            .toContain('base-header-item__amount-minus');
    });
    it('should render correctly without currency', () => {
        const wrapper = setup({ currency: undefined });
        expect(wrapper.props().children[0].props.children[0]).toEqual(undefined);
    });
});
