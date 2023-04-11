import { shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { Button } from './Button';
const defaults = {
    label: 'Active',
    onClick: spy(),
};
const setup = (props = {}) => shallow(React.createElement(Button, Object.assign({}, { ...defaults, ...props })));
describe('Button', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        expect(wrapper.hasClass('base-button')).toBeTruthy();
    });
    it('should pass along supplied className', () => {
        const className = 'some-class';
        wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });
    it('should set disable className when disabled', () => {
        wrapper = setup({ disabled: true });
        expect(wrapper.prop('disabled')).toBeTruthy();
        expect(wrapper.hasClass('base-button--disabled')).toBeTruthy();
    });
    it('should set no-margin className', () => {
        wrapper = setup({ noMargin: true });
        expect(wrapper.hasClass('base-button--no-margin')).toBeTruthy();
    });
    it('should render button with label in UPPER_CASE', () => {
        const expected = defaults.label.toLocaleUpperCase();
        const btn = wrapper.find('input');
        expect(btn.prop('value')).toBe(expected);
    });
    it('should call handler on onClick event with label value', () => {
        wrapper.simulate('click');
        expect(defaults.onClick.callCount).toBe(1);
        expect(defaults.onClick.calledOnceWith(defaults.label)).toBeTruthy();
    });
});
