import React, { Component } from 'react';
import {
  PageHeader
} from 'react-bootstrap';
import './App.css';
import CustomerList from './components/customer-list';

class App extends Component {
  render() {
    return (
      <div>
        <PageHeader align="center">
          Plano Accountants Address Book
        </PageHeader>
        <div className="contents">
          <CustomerList/>
        </div>
      </div>
    );
  }
}

export default App;
