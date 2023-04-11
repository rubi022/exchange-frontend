import { shallow } from 'enzyme';
import * as React from 'react';
import { Alert } from './Alert';
const defaultProps = {
    description: '34.233 BTC',
    title: 'Successful deposit',
    type: 'success',
};
const setup = (props = {}) => shallow(React.createElement(Alert, Object.assign({}, { ...defaultProps, ...props })));
describe('Alert', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });
    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should render success message', () => {
        wrapper = setup({ type: 'success' });
        const container = wrapper.find('.base-alert');
        expect(container.hasClass('base-alert--success')).toBeTruthy();
    });
    it('should render error message', () => {
        wrapper = setup({ type: 'error' });
        const container = wrapper.find('.base-alert');
        expect(container.hasClass('base-alert--error')).toBeTruthy();
    });
});
