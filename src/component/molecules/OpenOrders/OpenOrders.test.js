import { shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { OpenOrders } from './OpenOrders';
const defaultProps = {
    data: [
        ['13:50', 'buy', '1,442.43', '4,323.04', ''],
        ['13:50', 'sell', '1,442.43', '44,323.12', ''],
        ['13:50', 'sell', '1,442.43', '4,323.23', ''],
        ['13:50', 'buy', '1,442.43', '543.33', ''],
    ],
    onCancel: spy(),
};
const setup = (props = {}) => shallow(React.createElement(OpenOrders, Object.assign({}, { ...defaultProps, ...props })));
describe('OpenOrders', () => {
    let wrapper = setup();
    beforeEach(() => {
        wrapper = setup();
    });
    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should render formatted price', () => {
        const instance = wrapper.instance();
        const sideBuy = 'bid';
        const sideSell = 'ask';
        const renderedBuyPrice = (React.createElement("span", { className: "base-open-orders__price base-open-orders__price--buy" }, sideBuy));
        const renderedSellPrice = (React.createElement("span", { className: "base-open-orders__price base-open-orders__price--sell" }, sideSell));
        expect(instance.renderAction(sideBuy)).toEqual(renderedBuyPrice);
        expect(instance.renderAction(sideSell)).toEqual(renderedSellPrice);
    });
    it('should map cells', () => {
        const date = '12:34';
        const dateIndex = 0;
        const price = 123.43;
        const priceIndex = 1;
        const action = 'bid';
        const volume = 12343.4;
        const row = [date, action, price, volume, 'buy'];
        const rowIndex = 1;
        const instance = wrapper.instance();
        expect(instance.renderCell(rowIndex)(date, dateIndex, row)).toBe(date);
        expect(instance.renderCell(rowIndex)(action, priceIndex, row)).toEqual(instance.renderAction(action));
    });
    it('should map rows', () => {
        const price = 5.34;
        const volume = 454.5;
        const rowIndex = 0;
        const row = ['12:50', 'ask', price, volume, ''];
        const instance = wrapper.instance();
        const renderedRow = [
            '12:50',
            instance.renderAction('ask'),
            price,
            volume,
            instance.renderCancelButton(rowIndex),
        ];
        expect(JSON.stringify(instance.renderRow(row, rowIndex))).toBe(JSON.stringify(renderedRow));
    });
    it('should handle cancel function', () => {
        const onCancel = spy();
        wrapper = setup({ onCancel: onCancel });
        // tslint:disable-next-line:no-magic-numbers
        wrapper.props().children.props.data[1][4].props.onClick(1);
        // @ts-ignore
        expect(onCancel.calledOnceWith(1)).toBeTruthy();
    });
});
