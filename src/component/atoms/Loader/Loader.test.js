import { shallow } from 'enzyme';
import * as React from 'react';
import { Loader } from './Loader';
describe('Loader', () => {
    it('should render', () => {
        const wrapper = shallow(React.createElement(Loader, null));
        expect(wrapper).toMatchSnapshot();
    });
    it('should have correct className', () => {
        const wrapper = shallow(React.createElement(Loader, null));
        expect(wrapper.hasClass('base-loader')).toBeTruthy();
    });
    it('should have correct size', () => {
        const wrapper = shallow(React.createElement(Loader, null));
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.props().children.props.height).toEqual(30);
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.props().children.props.width).toEqual(30);
    });
    it('should have correct className and size with another props', () => {
        const wrapper = shallow(React.createElement(Loader, Object.assign({}, { size: 45, className: 'test' })));
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.props().children.props.height).toEqual(45);
        // tslint:disable-next-line:no-magic-numbers
        expect(wrapper.props().children.props.width).toEqual(45);
        expect(wrapper.hasClass('base-loader test')).toBeTruthy();
    });
});
