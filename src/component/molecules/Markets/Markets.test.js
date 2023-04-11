import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { Markets } from './Markets';
const data = [
    ['ETH / BTC', '0.223100'],
    ['ETH / LTC', '0.223100'],
    ['LTC / BTC', '0.223100'],
];
const onSelect = spy();
const defaultProps = {
    data,
    onSelect,
};
const setup = (props) => shallow(React.createElement(Markets, Object.assign({}, { ...defaultProps, ...props })));
describe('Markets', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should render empty data', () => {
        wrapper = setup({ data: [] });
        expect(wrapper).toMatchSnapshot();
    });
    it('should correctly filter rows', () => {
        expect(wrapper.instance().searchFilter(['ETH / BTC', '0.123'], 'btc')).toBeTruthy();
        expect(wrapper.instance().searchFilter(['ETH / BTC', '0.342'], 'ltc')).toBeFalsy();
    });
    it('should set filtered data to state', () => {
        const component = mount(React.createElement(Markets, { data: data, onSelect: onSelect }));
        const filteredData = [
            ['ETH / BTC', '0.123'],
        ];
        component.instance().handleFilter(filteredData);
        expect(component.state().filteredData).toEqual(filteredData);
    });
    it('should set new data to state', () => {
        const component = mount(React.createElement(Markets, { data: data, onSelect: onSelect }));
        const filteredData = [
            ['ETH / BTC', '0.123'],
        ];
        component.setProps({ data: filteredData });
        expect(component.state().filteredData).toEqual(filteredData);
    });
});
