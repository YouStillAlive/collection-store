import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

function CollectionModal({
    show, setShow,
    name, setName,
    description, setDescription,
    onSuccess }) {

    return (
        <>
            <Modal
                show={show}
                onHide={() => { setShow(false) }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="bg-secondary text-white">
                    <Modal.Title><FormattedMessage id="modal.collection.title" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                            <label forHtml="collection-name" className="d-inline w-100"><FormattedMessage id="modal.collection.name.control" /></label>
                            <input value={name} type="text" autoComplete="off" onChange={(e) => setName(e.target.value)} className="w-100" id="collection-name" />
                        </div>
                        <div>
                            <label forHtml="message-text"><FormattedMessage id="modal.collection.description.control" /></label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-100" id="message-text"></textarea>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        if (show && description) {
                            onSuccess();
                            setShow(false);
                        }
                    }}><FormattedMessage id="modal.collection.save.but" /></Button>
                    <Button variant="secondary" onClick={() => {
                        setShow(false);
                    }}>
                        <FormattedMessage id="modal.collection.close.but" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CollectionModal;