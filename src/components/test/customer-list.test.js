import React from 'react';
import { 
    Button,
    Table
 } from 'react-bootstrap';
import{expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ConfirmModal from '../confirm-modal';
import CustomerList from '../customer-list';
import AddCustomer from '../add-customer';

describe('Display the customer list', () => {
   let component;
    beforeEach(() => {
        component = shallow(<CustomerList show={true}/>);
   });
   it('renders without crashing', () => {
        expect(component).to.not.equal(undefined);
        expect(component.find('#addCustomer')).to.have.length(1);
        expect(component.find('tr')).to.have.length(3);
        expect(component.find(AddCustomer)).to.have.length(0);

   });
   it('when clicked on addCustomer button Add Customer component should be visible', () => {
        component.find('#addCustomer').prop('onClick')();
        expect(component.instance().state.showAddCustomer).to.equal(true);
        expect(component.find(AddCustomer)).to.have.length(1);
   });
   it('when clicked on delete customer button Delete confirm modalshould be visible', () => {
        component.find('.deleteCustomer').at(1).prop('onClick')({target: {value:  102}});
        expect(component.instance().state.showDeleteConfirm).to.equal(true);
        expect(component.find(ConfirmModal)).to.have.length(1);
    });
    it('when clicked on edit customer button AddCustomer modalshould be visible', () => {
        component.find('.editCustomer').at(1).prop('onClick')({target: {value:  102}});
        expect(component.instance().state.showAddCustomer).to.equal(true);
        expect(component.find(AddCustomer)).to.have.length(1);
    });
});