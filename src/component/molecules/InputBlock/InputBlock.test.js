import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Input } from '../../atoms';
import { InputBlock } from './InputBlock';
const defaultProps = {
    handleChangeValue: () => {
        return;
    },
    message: 'Message',
    type: 'text',
    value: '0',
};
const setup = (props = {}) => shallow(React.createElement(InputBlock, Object.assign({}, { ...defaultProps, ...props })));
describe('InputBlock', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('base-input-block')).toBeTruthy();
    });
    it('should pass along supplied className', () => {
        const className = 'some-class';
        const wrapper = setup({ className });
        expect(wrapper.hasClass(className)).toBeTruthy();
    });
    it('should render with correct message', () => {
        const wrapper = setup();
        const { children } = wrapper.props();
        expect(children).toContain('Message');
    });
    it('inner Input component should render with correct type', () => {
        defaultProps.type = 'number';
        const change = defaultProps.handleChangeValue;
        const { type } = mount((React.createElement(Input, { className: "base-input-block__input", type: "number", value: "", onChangeValue: change }))).props();
        expect(type).toContain(defaultProps.type);
    });
});
