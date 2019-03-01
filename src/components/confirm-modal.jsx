import React, { Component } from 'react';
import { 
    Button,
    Modal
 } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.handleOnConfirm = this.handleOnConfirm.bind(this);
    }
    
    handleOnConfirm = () => {
        const { onConfirm, data } = this.props;
        onConfirm(data);
    }

    render() {
        const { onCancel, modalConfig: {title, body, confirmButtonText, cancelButtonText } } = this.props;
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>
                            {title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{body}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onCancel}>{cancelButtonText}</Button>
                        <Button bsStyle="primary" onClick={this.handleOnConfirm}>{confirmButtonText}</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }

}
ConfirmModal.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    modalConfig: PropTypes.object,
    data: PropTypes.object
}