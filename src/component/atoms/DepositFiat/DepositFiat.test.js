import { mount } from 'enzyme';
import * as React from 'react';
import { DepositFiat } from './DepositFiat';
describe('DepositFiat', () => {
    const title = 'You can deposit in any bank';
    const description = 'Please use the information below.';
    const testData = [
        {
            key: 'Bank Name',
            value: 'Diamant Bank',
        },
        {
            key: 'Account number',
            value: '1036272',
        },
        {
            key: 'Account name',
            value: 'p2pd2b',
        },
        {
            key: 'Phone Number',
            value: '+290 2929 12',
        },
        {
            key: 'Your Reference code',
            value: '123456',
        },
    ];
    describe('#render', () => {
        it('renders title and description', () => {
            const wrapper = mount(React.createElement(DepositFiat, { data: [], description: description, title: title }));
            const renderedTitle = wrapper.find('.base-deposit-fiat__title').text();
            const renderedDescription = wrapper.find('.base-deposit-fiat__description').text();
            expect(renderedTitle).toBe(title);
            expect(renderedDescription).toBe(description);
        });
        it('renders list of details', () => {
            const wrapper = mount(React.createElement(DepositFiat, { data: testData, description: description, title: title }));
            const children = wrapper.find('.base-deposit-fiat-detail');
            // tslint:disable-next-line:no-magic-numbers
            expect(children).toHaveLength(5);
        });
    });
});
