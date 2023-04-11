import { shallow } from 'enzyme';
import * as React from 'react';
import { Button } from '../';
import { Modal } from './Modal';
const defaults = {
    show: true,
    header: React.createElement("div", null, "Title"),
    content: React.createElement("div", null, "Some content"),
    footer: React.createElement(Button, { label: 'Ok', onClick: jest.fn() }),
};
const setup = (props = {}) => shallow(React.createElement(Modal, Object.assign({}, { ...defaults, ...props })));
describe('Basic Modal', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        expect(wrapper.hasClass('base-modal')).toBeTruthy();
    });
    it('should pass along supplied className', () => {
        const className = 'new-class';
        const wrapper = setup({ className }); //tslint:disable-line
        expect(wrapper.hasClass(className)).toBeTruthy();
    });
    it('should render 1 div', () => {
        const divs = wrapper.find('div');
        expect(divs.length).toBe(7); //tslint:disable-line
    });
    it('should render 1 button', () => {
        const btn = wrapper.find('Button');
        expect(btn.length).toBe(1);
    });
});
