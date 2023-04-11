import { shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { FilterInput } from './FilterInput';
const data = [
    {
        active: true,
        address: '0xdeadbeef',
        cryptoAmount: 10,
        cryptoCode: 'BTC',
        fiatAmount: 100,
        fiatCode: 'USD',
        lockedAmount: 0,
    },
    {
        active: false,
        address: '0xdvrervef',
        cryptoAmount: 10,
        cryptoCode: 'ETH',
        fiatAmount: 100,
        fiatCode: 'USD',
        lockedAmount: 0,
    },
];
const defaults = {
    data,
    filter: (item, term) => String(item.cryptoCode).toLowerCase()
        .indexOf(term.toLowerCase()) !== -1,
    onFilter: spy(),
};
const setup = (props = {}) => shallow(React.createElement(FilterInput, Object.assign({}, { ...defaults, ...props })));
describe('FilterInput', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should render 1 input tag', () => {
        const input = wrapper.find('input');
        expect(input.length).toBe(1);
    });
    it('should render 1 div', () => {
        const divs = wrapper.find('div');
        expect(divs.length).toBe(1);
    });
    it('should have correct className', () => {
        expect(wrapper.hasClass('base-search')).toBeTruthy();
    });
    it('should render correct list from data', () => {
        wrapper.find('input').simulate('change', {
            target: {
                value: 'b',
            },
        });
        expect(defaults.onFilter.calledOnceWith([defaults.data[0]])).toBeTruthy();
    });
});
