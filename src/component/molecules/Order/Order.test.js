import { shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { TabPanel } from '../';
import { Order } from './Order';
const defaultProps = {
    feeBuy: 10,
    feeSell: 10,
    onSubmit: spy(),
    priceMarketBuy: 5,
    priceMarketSell: 10,
    from: 'btc',
    to: 'eth',
};
const setup = (props = {}) => shallow(React.createElement(Order, Object.assign({}, { ...defaultProps, ...props })));
describe('Order', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should render tabs', () => {
        const tabPanel = wrapper.find(TabPanel);
        expect(tabPanel).toHaveLength(1);
    });
});
