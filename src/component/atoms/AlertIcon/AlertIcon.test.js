import { shallow } from 'enzyme';
import * as React from 'react';
import { AlertIcon, ErrorIcon, SuccessIcon } from './AlertIcon';
describe('AlertIcon', () => {
    it('should render success icon', () => {
        const wrapper = shallow(React.createElement(AlertIcon, { type: "success" }));
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(SuccessIcon)).toHaveLength(1);
    });
    it('should render error icon', () => {
        const wrapper = shallow(React.createElement(AlertIcon, { type: "error" }));
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(ErrorIcon)).toHaveLength(1);
    });
});
