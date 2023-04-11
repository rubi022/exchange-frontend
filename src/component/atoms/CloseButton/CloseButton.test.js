import { shallow } from 'enzyme';
import * as React from 'react';
import { spy } from 'sinon';
import { CloseButton } from './CloseButton';
const onClickSpy = spy();
const defaultProps = {
    onClick: onClickSpy,
};
const setup = (props = {}) => shallow(React.createElement(CloseButton, Object.assign({}, { ...defaultProps, ...props })));
describe('Close Button', () => {
    let wrapper;
    beforeEach(() => {
        onClickSpy.resetHistory();
        wrapper = setup({ onClick: onClickSpy });
    });
    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should call onClick callback', () => {
        wrapper.find('.base-close-button').simulate('click');
        expect(onClickSpy.calledOnce).toBeTruthy();
    });
});
