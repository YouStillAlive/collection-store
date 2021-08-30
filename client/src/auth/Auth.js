import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import routeNames from '../shared/constants/routeNames';
import { login } from '../shared/http/userApi.js';
import { observer } from "mobx-react-lite";
import { Context } from '../index.js';

const responseGoogle = (response) => {
  console.log(response);
}

const Auth = observer(() => {
  const intl = useIntl();

  const { user } = useContext(Context);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const signIn = async () => {
    try {
      let data = await login(email, password);
      user.setUser(data);
      user.setIsAuth(true);
      history.push(routeNames.HOME);
    } catch (e) {
      setErrors({
        email: e.response.data.message,
        password: e.response.data.message
      });
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = findFormErrors();
    Object.keys(newErrors).length > 0 ? setErrors(newErrors) : signIn();
  }

  const findFormErrors = () => {
    const newErrors = {};
    if (!email || email === '') newErrors.email = intl.formatMessage({ id: 'auth-page.warning.blank' });
    if (!password || password === '') newErrors.password = intl.formatMessage({ id: 'auth-page.warning.blank' });

    return newErrors;
  }

  return (
    <Container className="content d-inline-block d-flex align-items-center justify-content-center ">
      <div className="shadow-lg auth-bg">
        <Form className="m-5">
          <Form.Group className="form-outline mb-3">
            <Form.Control
              type="text"
              id="loginName"
              autoComplete="no"
              className=""
              placeholder={intl.formatMessage({ id: 'auth-page.email.placeholder' })}
              onChange={e => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email}
            </Form.Control.Feedback>
            <Form.Label>
              <FormattedMessage id="auth-page.email" />
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-outline mb-3">
            <Form.Control
              type="password"
              id="loginPassword"
              autoComplete="no"
              className=""
              placeholder={intl.formatMessage({ id: 'auth-page.password.placeholder' })}
              onChange={e => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
            <Form.Label>
              <FormattedMessage id="auth-page.password" />
            </Form.Label>
          </Form.Group>
          <Button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block" ><FormattedMessage id="auth-page.sign-in.but" /></Button>
          <Link to="/registration">
            <Button className="btn  btn-secondary btn-block" style={{ float: "right" }}><FormattedMessage id="auth-page.registration.but" /></Button>
          </Link>
          <div>
            <GoogleLogin
              clientId="1005117803746-bou66ls0p90atppuv3h963ohgi3ifffd.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              icon={true}
              cookiePolicy={'single_host_origin'}
              className="m-auto mb-3 w-100 rounded mt-3 shadow-none google-icon" ><strong className="text-dark">Sign in with Google</strong></GoogleLogin>
          </div>
          {/* <div><FacebookLogin
            appId="1103844996689309"
            fields="name,email"
            size="small"
            onClick={(e) => { }}
            callback={(e) => { }}
          /></div> */}
        </Form>
      </div>
    </Container>
  )
});

export default Auth;