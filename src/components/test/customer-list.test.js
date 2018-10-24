import React from 'react';
import ReactDOM from 'react-dom';
import CustomerList from '../customer-list';

describe('Add customer with details', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CustomerList/>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
});