import React, { Component } from 'react';
import { 
    Button,
    Table
 } from 'react-bootstrap';
 import ConfirmModal from './confirm-modal';
import PropTypes from 'prop-types';
import AddCustomer from './add-customer';

class CustomerList extends Component {
    constructor(props){
        super(props);
        this.handleEditCustomer = this.handleEditCustomer.bind(this);
        this.handleAddCustomer = this.handleAddCustomer.bind(this);
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
        this.handleOnConfirmDelete = this.handleOnConfirmDelete.bind(this);
        this.handleCancelDelete = this.handleCancelDelete.bind(this);
    }
    state = {
        showAddCustomer: false,
        showDeleteConfirm: false,
        customerList: [
            {
                id: 100,
                fname: 'Prabha',
                lname: 'Karavadi',
                address: '7256 Packard Ln, Frisco TX 75035',
                email: 'prabha.karavadi@gmail.com',
                phone: '234-178-9087'
            },
            {
                id: 101,
                fname: 'Prabha 2',
                lname: 'Karavadi',
                address: '7256 Packard Ln, Frisco TX 75035',
                email: 'prabha.karavadi@gmail.com',
                phone: '234-178-9087'
            }
        ]
    };

    handleAddCustomer = () => {
        this.setState({showAddCustomer: true, customerDetails: null});
    };

    handleOnSaveCustomer = (customerDetails) => { 
        const { customerList } = this.state;
        if(!customerDetails.id) {
            const idOfTheNewCustomer = customerList.length + 101;
            customerDetails.id=idOfTheNewCustomer;
            const newCustomerList = customerList;
            newCustomerList.push(customerDetails);
            this.setState({showAddCustomer: false, customerList: newCustomerList});
        } else {
            // find the record and modify the details.
            const editCustomerIndex = customerList.findIndex((item) => item.id === customerDetails.id);
            customerList[editCustomerIndex]=customerDetails;
            this.setState({showAddCustomer: false});
        }
    }
    handleEditCustomer = (e) => {
        this.setState({customerDetails: this.state.customerList[e.target.value],
            showAddCustomer: true});
    }

    handleDeleteCustomer = (e) => {
        console.log('Delete the details of the row', this.state.customerList[e.target.value]);

        this.setState({showDeleteConfirm: true, deleteCustomer: this.state.customerList[e.target.value]});
    }
    handleOnConfirmDelete = (e) => {
        const { customerList, deleteCustomer } = this.state;
        const editCustomerIndex = customerList.findIndex((item) => item.id === deleteCustomer.id);
            customerList.splice(editCustomerIndex,1);
            this.setState({showDeleteConfirm: false, deleteCustomer: null});
    }
    handleCancelDelete = (e) => {
        this.setState({showDeleteConfirm: false, deleteCustomer: null});
    }

    handleOnClose = (e) => {
        this.setState({showAddCustomer: false});
    }
    handleOnSort = (e) => {
        
    }
    render() {
        const { showAddCustomer,
                customerList,
                customerDetails,
                showDeleteConfirm } = this.state;
        const modalConfig = {
            title: 'Delete Accountant',
            body: 'Are you sure you want to delete this accountant?',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        };
        
        return (
            <div className="customer-list">
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.handleAddCustomer}>
                    Add a new customer
                </Button>
                { showDeleteConfirm && <ConfirmModal
                    onConfirm={this.handleOnConfirmDelete}
                    onCancel={this.handleCancelDelete}
                    modalConfig={modalConfig}/>}
                { showAddCustomer && 
                    <AddCustomer 
                        onSave={this.handleOnSaveCustomer}
                        isVisible = {showAddCustomer}
                        customerDetails= {customerDetails}
                        onClose={this.handleOnClose}/>}
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerList.map((row, index) =>  (<tr key={row.id}>
                            <td>{index+1}</td>
                            <td>{row.fname}</td>
                            <td>{row.lname}</td>
                            <td>{row.address}</td>
                            <td>{row.phone}</td>
                            <td><a href={row.email}>{row.email}</a></td>
                            <td><Button key={row.id} bsStyle="link" onClick={this.handleEditCustomer} value={index}>Edit</Button></td>
                            <td><Button key={row.id} bsStyle="link" onClick={this.handleDeleteCustomer} value={index}>Delete</Button></td>
                        </tr>))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default CustomerList;
