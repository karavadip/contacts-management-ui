import React, { Component } from 'react';
import {
  PageHeader,
  Button
} from 'react-bootstrap';
import './App.css';
import CustomerList from './components/customer-list';
import Login from './components/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {showCustomerList: false}
    
  }
  onUserValidation = (isValidUser) => {this.setState({ showCustomerList: isValidUser});}

  handleOnLogOut =() => {
    this.setState({ showCustomerList: false});
  }
  
  render() {
    const { showCustomerList } = this.state;
    return (
      <div>
        <PageHeader align="center">
          Plano Accountants Address Book         
        </PageHeader>
        <div className="contents">
          <Button className={showCustomerList? 'd-block float-right': 'd-none'} bsStyle="danger" onClick={this.handleOnLogOut.bind(this)} >Log out</Button>
          <Login onUserValidation={this.onUserValidation} show={!showCustomerList} />         
          <CustomerList show={showCustomerList}/>
        </div>
      </div>
    );
  }
}

export default App;
