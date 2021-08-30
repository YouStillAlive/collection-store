import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import NotificationModal from '../shared/modals/NotificationModal.js';
import routeNames from '../shared/constants/routeNames.js';
import { registration } from '../shared/http/userApi.js';

function Registration() {
    const intl = useIntl();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const record = async () => {
        try {
            await registration(name, email, password);
            handleShow();
        } catch (e) {
            setErrors({
                email: e.response.data.message,
                password: ''
            });
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            record();
        }
    }

    const findFormErrors = () => {
        const newErrors = {};
        if (!name || name === '') newErrors.name = intl.formatMessage({ id: 'registration-page.warning.blank' });
        else if (name.length >= 30) newErrors.name = intl.formatMessage({ id: 'registration-page.warning.name.long' });
        if (!email || email === '') newErrors.email = intl.formatMessage({ id: 'registration-page.warning.blank' });
        else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            newErrors.email = intl.formatMessage({ id: 'registration-page.warning.email' });
        if (!password || password === '') newErrors.password = intl.formatMessage({ id: 'registration-page.warning.blank' });
        else if (repeatPassword !== password) newErrors.repeatPassword = intl.formatMessage({ id: 'registration-page.warning.repeate.password' });;

        return newErrors;
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && !show) {
            handleSubmit(e);
        }
    }

    return (<main className="content d-flex align-items-center justify-content-center align-items-center">
        <div className="tab-content auth-bg  shadow-lg">
            <Form onKeyPress={handleEnterPress} className="m-5">
                <Form.Group className="form-outline mb-3">
                    <Form.Control
                        type="text"
                        id="registerName"
                        autoComplete="no"
                        className="form-control"
                        placeholder={intl.formatMessage({ id: 'registration.name.placeholder' })}
                        onChange={e => setName(e.target.value)}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                    <Form.Label><FormattedMessage id="registration.name" /></Form.Label>
                </Form.Group>
                <Form.Group className="form-outline mb-3">
                    <Form.Control
                        type="text"
                        id="registerEmail"
                        autoComplete="no"
                        className="form-control"
                        placeholder={intl.formatMessage({ id: 'auth-page.email.placeholder' })}
                        onChange={e => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                    <Form.Label><FormattedMessage id="auth-page.email" /></Form.Label>
                </Form.Group>
                <Form.Group className="form-outline mb-3">
                    <Form.Control
                        type="password"
                        id="registerPassword"
                        autoComplete="no"
                        className="form-control"
                        placeholder={intl.formatMessage({ id: 'auth-page.password.placeholder' })}
                        onChange={e => setPassword(e.target.value)}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                    <Form.Label><FormattedMessage id="auth-page.password" /></Form.Label>
                </Form.Group>
                <Form.Group className="form-outline mb-3 ">
                    <Form.Control
                        type="password"
                        id="registerRepeatPassword"
                        autoComplete="no"
                        className="form-control form-control"
                        placeholder={intl.formatMessage({ id: 'registration.repeat.password.placeholder' })}
                        onChange={e => setRepeatPassword(e.target.value)}
                        isInvalid={!!errors.repeatPassword}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.repeatPassword}
                    </Form.Control.Feedback>
                    <Form.Label><FormattedMessage id="registration.repeat.password" /></Form.Label>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}><FormattedMessage id="registration.enter.but" /></Button>
                <Link to={routeNames.LOGIN}>
                    <NotificationModal
                        show={show}
                        handleShow={handleShow}
                        handleClose={handleClose}
                        head={intl.formatMessage({ id: 'registration-success.title' })}
                        body={intl.formatMessage({ id: 'registration-success.body' })}
                    >
                    </NotificationModal>
                </Link>
                <Link to={routeNames.LOGIN}>
                    <Button variant="secondary" className="btn btn-block registrationBut" style={{ float: "right" }}><FormattedMessage id="registration.previous.but" /></Button>
                </Link>
            </Form>
        </div>
    </main>);
}

export default Registration;