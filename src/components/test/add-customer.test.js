import React from 'react';
import{expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import AddCustomer from '../add-customer';

describe('Add customer with details', () => { 
  const onSaveSpy = sinon.spy();
  const onCloseSpy = sinon.spy();

  const getProps = (props) => {
    const localProps = props || {};
    return {
      onSave: onSaveSpy,
      onClose: onCloseSpy,
      isVisible: localProps.isVisible && true,
      customerDetails: localProps.customerDetails || {}
    }
  };
  const shallowRenderer = (props) => {
    return shallow(<AddCustomer {...getProps(props)}/>);
  }
    it('renders without crashing', () => {
        const component = shallowRenderer();
        expect(component).to.not.equal(undefined);
      });
     describe('handler functions', () => {
       it('on first name change', () => {          
          const component = shallowRenderer();
          const newName = 'new Name'
          const fnameTextBox = component.find('#fname');
          fnameTextBox.prop('onChange')({target: {value: newName}});
          expect(component.instance().state.fname).to.equal(newName);
       });
       it('on last name change', () => {          
        const component = shallowRenderer();
        const newName = 'new Name'
        const lnameTextBox = component.find('#lname');
        lnameTextBox.prop('onChange')({target: {value: newName}});
        expect(component.instance().state.lname).to.equal(newName);
      });
      it('on Email change', () => {          
        const component = shallowRenderer();
        const newName = 'new Name'
        const emailTextBox = component.find('#email');
        emailTextBox.prop('onChange')({target: {value: newName}});
        expect(component.instance().state.email).to.equal(newName);
      });
      it('on Phone change', () => {          
        const component = shallowRenderer();
        const newName = 'new Name'
        const phoneTextBox = component.find('#phone');
        phoneTextBox.prop('onChange')({target: {value: newName}});
        expect(component.instance().state.phone).to.equal(newName);
      });

     }) 
     describe('button actions save/cancel', () => {
      
     });
});

