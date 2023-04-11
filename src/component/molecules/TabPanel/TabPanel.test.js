import { shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { TabPanel } from './TabPanel';
const defaultProps = {
    panels: [
        {
            content: (React.createElement("div", null,
                React.createElement("h4", null, "Deposit"),
                React.createElement("p", null, "Some deposit tab content"))),
            label: 'Deposit',
        },
        {
            content: (React.createElement("div", null,
                React.createElement("h4", null, "Withdraw"),
                React.createElement("p", null, "Some withdraw tab content"))),
            label: 'Withdraw',
        },
        {
            content: (React.createElement("div", null,
                React.createElement("h4", null, "Disabled"),
                React.createElement("p", null, "Disabled lorem ipsum dolor sit amet."))),
            label: 'Disabled',
            disabled: true,
        },
    ],
};
const setup = (props = {}) => shallow(React.createElement(TabPanel, Object.assign({}, { ...defaultProps, ...props })));
describe('TabPanel', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        expect(wrapper.hasClass('base-tab-panel')).toBeTruthy();
    });
    it('should have correct fixed className', () => {
        wrapper = setup({ fixed: true });
        expect(wrapper.hasClass('base-tab-panel__fixed')).toBeTruthy();
    });
    it('should render tabs', () => {
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.find('.base-tab')).toHaveLength(3);
    });
    it('should mount all passed content when hideMode is `hide`', () => {
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.find('.base-tab-content')).toHaveLength(3);
    });
    it('should mount only active content when hideMode is `unmount`', () => {
        wrapper = setup({ hideMode: 'unmount' });
        expect(wrapper.find('.base-tab-content')).toHaveLength(1);
    });
    it('should render correct class for active tab', () => {
        wrapper.setState({ currentTabIndex: 1 });
        const activeTab = wrapper.find('.base-tab').at(1);
        expect(activeTab.hasClass('base-tab__active')).toBeTruthy();
    });
    it('should render disabled tab', () => {
        wrapper = setup({
            panels: [
                {
                    content: (React.createElement("p", null, "Deposit")),
                    disabled: true,
                    label: 'Deposit',
                },
            ],
        });
        const disabledTab = wrapper.find('.base-tab').at(0);
        expect(disabledTab.hasClass('base-tab__disabled')).toBeTruthy();
    });
    it('should render hidden tab', () => {
        wrapper = setup({
            panels: [
                {
                    content: (React.createElement("p", null, "Deposit")),
                    hidden: true,
                    label: 'Deposit',
                },
            ],
        });
        const hiddenTab = wrapper.find('.base-tab').at(0);
        expect(hiddenTab.hasClass('base-tab__hidden')).toBeTruthy();
    });
    it('should handle onTabChange callback when a tab is pressed', () => {
        const onTabChange = spy();
        wrapper = setup({ onTabChange });
        const tab = wrapper.find('.base-tab').at(1);
        tab.simulate('click');
        expect(onTabChange.calledOnceWith(1, 'Withdraw')).toBeTruthy();
    });
    it('should handle onTabChange callback when a disable tab is pressed', () => {
        wrapper = setup();
        const secondTab = wrapper.find('.base-tab').at(1);
        const disabledTab = wrapper.find('.base-tab').last();
        disabledTab.simulate('click');
        expect(wrapper.state()).toEqual({ currentTabIndex: 0 });
        secondTab.simulate('click');
        expect(wrapper.state()).toEqual({ currentTabIndex: 1 });
    });
});
