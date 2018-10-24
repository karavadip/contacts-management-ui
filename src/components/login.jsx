import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl, 
    Button,
    Row,
    Col,
    Alert
 } from 'react-bootstrap';
 import ConfirmModal from './confirm-modal';
import AddCustomer from './add-customer';
import AppService from '../services/appService';
import PropTypes from 'prop-types';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.handleOnLoginIdChange = this.handleOnLoginIdChange.bind(this);
        this.handleOnPasswordChange = this.handleOnPasswordChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnWarningClose = this.handleOnWarningClose.bind(this);
        this.appService = new AppService();
        this.state = {
            isValidUser: true,
            loginId: '',
            password: ''
        }        
    }
    handleOnSubmit = () => {  
        const { loginId, password } = this.state;
        const payload = {
            loginId: loginId,
            password: password
        }; 
        this.appService.validateUser(payload).then(response => {  
            const isValidUser = response.data;
            this.setState({isValidUser, showAlert: !isValidUser});
            this.props.onUserValidation(isValidUser);
        }).catch(error => {
            this.setState({isValidUser: false, showAlert: true});
        });
    }
    handleOnLoginIdChange = (e) => this.setState({loginId: e.target.value});
    handleOnPasswordChange = (e) => this.setState({password: e.target.value});
    handleOnWarningClose = () => {
        this.setState({showAlert: false})
    }

    render() {
        const { showAlert, loginId, password } = this.state;
        return (
            <div className="login">
                <h4> Login Module </h4>
                {showAlert && <Alert bsStyle="danger">
                    <strong>Holy guacamole!</strong> Best check yo self, you're not looking too
                    good.
                    <Button bsStyle="danger" onClick={this.handleOnWarningClose}>Close</Button>
                </Alert>}
                <div className="login-input"  width="50%">
                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <ControlLabel>Login</ControlLabel>
                                <FormControl
                                    id="loginId"
                                    type="text"
                                    required={true}
                                    value={loginId}
                                    onChange={this.handleOnLoginIdChange} />
                            </FormGroup>
                        </Col>
                      </Row>
                      <Row>  
                        <Col sm={4}>
                            <FormGroup validationState='error'>
                                <ControlLabel>Password {}</ControlLabel>
                                <FormControl
                                    id="password"
                                    type="password"
                                    required={true}
                                    value={password}
                                    onChange={this.handleOnPasswordChange} />       
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button bsStyle="primary" 
                            onClick={this.handleOnSubmit}
                            disabled={loginId.length < 1 || password.length < 1}>Submit</Button>
                </div>
                
                
            </div>
        );
    }
}

AddCustomer.propTypes = {
    onUserValidation: PropTypes.func.isRequired
};