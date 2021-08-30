import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function DecisionModal(props) {
    return (
        <>
            <Modal show={props.show} centered>
                <Modal.Header>
                    <Modal.Title>{props.head}</Modal.Title></Modal.Header>
                <Modal.Body as="div" className="text-center">
                    {props.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.handleClose}>OK</Button>
                    <Button onClick={props.action}></Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DecisionModal;