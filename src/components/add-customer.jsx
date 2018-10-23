import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Row,
    Col,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock
} from 'react-bootstrap';
import '../App.css';

export default class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: props.isVisible,
            id: null,
            fname: '',
            lname: '',
            phone: '',
            email: '',
            address: ''
        };
        this.handleOnClose = this.handleOnClose.bind(this);
    }
    
    componentDidMount() {
       this.setState({showModal: this.props.isVisible});
        if(this.props.customerDetails) {
            const { id, fname, lname, address, phone, email } = this.props.customerDetails;
            this.setState({
                id,
                fname,
                lname,
                address,
                phone,
                email
            });
        }
    }

    handleAddCustomer = () => {
        console.log('add a customer');
        const { id, fname, lname, address, phone, email } = this.state;
        const customerDetails = {
            id,
            fname,
            lname,
            address,
            phone,
            email
        }
        this.props.onSave(customerDetails);
    };


    handleOnFirstNameChange = (el) => this.setState({ fname: el.target.value });

    handleOnLastNameChange = (el) => this.setState({ lname: el.target.value });

    handleOnAddressChange = (el) => this.setState({ address: el.target.value });

    handleOnPhoneChange = (el) => this.setState({ phone: el.target.value });

    handleOnEmailChange = (el) => this.setState({ email: el.target.value });

    handleOnClose = (el) => this.props.onClose();


    nameIsEmpty = (fieldName) => {
        let isEmpty = false;
        const { fname, lname } = this.state;
        switch(fieldName) {
            case 'fname': 
                isEmpty = fname.length < 1;
                break;
            case 'lname':
                isEmpty = lname.length < 1;
                break;
            default:
                isEmpty = fname.length < 1 || lname.length < 1;
                break;        
        }
        console.log(fieldName, ': is name empty:', isEmpty, ' fname-lnsame : ', fname,lname);
        return !!isEmpty;
    }

    render() {
        const { onClose, customerDetails, isVisible } = this.props;       
        const { fname, lname, address, phone, email } = this.state;
        const validationStateClass = this.nameIsEmpty() ? 'error' : 'success';
        return (
            <form>
            <Modal animation={false}
                bsSize={'large'}
                show={isVisible}
                backdropClassName='modal-backdrop-override'
                onHide={onClose}>
                <Modal.Header >
                    <Modal.Title>
                        <div className="header">{customerDetails ? `Edit Customer ${fname}, ${lname}` :  'Add a new customer'}</div>
                    </Modal.Title>
                </Modal.Header>    
                <Modal.Body>   
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <ControlLabel>First name*</ControlLabel>
                                <FormControl
                                    id="fname"
                                    type="text"
                                    required={true}
                                    value={fname}
                                    onChange={this.handleOnFirstNameChange.bind(this)} />
                                {this.nameIsEmpty('fname') && <HelpBlock className={validationStateClass}>Customer's first name is required</HelpBlock>}
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup validationState='error'>
                                <ControlLabel>Last name*</ControlLabel>
                                <FormControl
                                    id="lname"
                                    type="text"
                                    required={true}
                                    value={lname}
                                    onChange={this.handleOnLastNameChange.bind(this)} />
                                {this.nameIsEmpty('lname') && <HelpBlock className={validationStateClass}>Customer's last name is required</HelpBlock>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    <Col sm={12}>
                            <FormGroup>
                                <ControlLabel>Address</ControlLabel>
                                <FormControl
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={this.handleOnAddressChange.bind(this)} />
                            </FormGroup>
                        </Col>
                    </Row>   
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <ControlLabel>Phone</ControlLabel>
                                <FormControl
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={this.handleOnPhoneChange.bind(this)} />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={this.handleOnEmailChange.bind(this)} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                        <Button onClick={this.handleOnClose.bind(this)}>Close</Button>
                        <Button onClick={this.handleAddCustomer.bind(this)} bsStyle="primary" disabled={this.nameIsEmpty()} >{customerDetails? 'Update' : 'Save'}</Button>
                </Modal.Footer>
            </Modal>
            </form>
        );
    }
}

AddCustomer.propTypes = {
    onSave: PropTypes.func,
    onClose: PropTypes.func,
    isVisible: PropTypes.bool,
    customerDetails: PropTypes.object
};

