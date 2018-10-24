import React, { Component } from 'react';
import {
  PageHeader
} from 'react-bootstrap';
import './App.css';
import CustomerList from './components/customer-list';
import Login from './components/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isValidUser: false}
    
  }
  onUserValidation = (isValidUser) => {
    this.setState({ isValidUser: isValidUser});
  }
  render() {
    const { isValidUser } = this.state;
    return (
      <div>
        <PageHeader align="center">
          Plano Accountants Address Book
        </PageHeader>
        <div className="contents">
          {
            (isValidUser === false) && 
            <Login onUserValidation={this.onUserValidation} />
          }
          {isValidUser && <CustomerList/>}
        </div>
      </div>
    );
  }
}

export default App;
