import React from 'react';
import{expect} from 'chai';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import ConfirmModal from '../confirm-modal';
describe('<ConfirmModal>', () => {    
    const modalConfig = {
        body: 'Hello',
        title: 'hru',
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel'
    };
    const onConfirmSpy = sinon.spy();
    const onCancelSpy = sinon.spy();
    const getProps = (props) => {
        if(!props) {
            props = {};
        }
        return {
            onConfirm: onConfirmSpy,
            onCancel: onCancelSpy,
            isVisible: props.isVisible || true,
            modalConfig: props.modalConfig || modalConfig,
            data: props.data || null
        }
    }
    const shallowRenderer= (props) => {
        return shallow(<ConfirmModal {...getProps(props)}/>)
    }

    it('renders without crashing', () => {
        const component = shallowRenderer();          
        const innerHtml = component.html();
        expect(component).to.not.be.undefined; 
        expect(component.html()).to.contain('static-modal');
        expect(component.instance().props.isVisible).equals(true);  
        expect(innerHtml).to.contain(modalConfig.body);
        expect(innerHtml).to.contain(modalConfig.title);
        expect(innerHtml).to.contain(modalConfig.confirmButtonText);
        expect(innerHtml).to.contain(modalConfig.cancelButtonText);
    });

    describe('Button click events Save or Cancel', () => {
        it('when clicked on the save button onConfirmSpy should be called', () => {
            const component = shallowRenderer();
            const confirmButton = component.find('Button').at(1);
            confirmButton.prop('onClick')();
    
            expect(confirmButton.html()).to.contain('Save');
            expect(onConfirmSpy.called).to.be.true;
        });
        
        it('when the data is passed to the component and user clicked on the save button onConfirmSpy should be called along with data', () => {
            const props = {
                data: {
                    fname: 'Prabha'
                }            
            };
            const component = shallowRenderer(props);
            const confirmButton = component.find('Button').at(1);
            confirmButton.prop('onClick')();
    
            expect(confirmButton.html()).to.contain(modalConfig.confirmButtonText);
            expect(onConfirmSpy.called).to.be.true;
            expect(onConfirmSpy.calledWith(props.data)).to.be.true;
        });
    
        it('when clicked on the cancel button onCancelSpy should be called', () => {
            const component = shallowRenderer();
            const confirmButton = component.find('Button').at(0);
            confirmButton.prop('onClick')();
    
            expect(confirmButton.html()).to.contain(modalConfig.cancelButtonText);
            expect(onCancelSpy.called).to.be.true;
        });
    }); 
});
   