import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { locales } from '../constants/locales';
import localStorageKeys from '../constants/localStorageKeys.js';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index.js';
import routeNames from '../constants/routeNames';
import { useHistory } from 'react-router-dom';

const Header = observer(({ currentLocale, setCurrentLocale }) => {
    const intl = useIntl();
    const history = useHistory();
    const { user } = useContext(Context);

    const Logout = () => {
        try {
            user.setUser(null);
            user.setIsAuth(false);
            localStorage.removeItem(localStorageKeys.TOKEN);
            history.push(routeNames.HOME);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Navbar.Brand href="/" className="me-auto d-none d-sm-none d-md-block">Collection Store</Navbar.Brand>
                    <Nav>
                        <NavDropdown className="mx-2 d-none d-sm-none d-md-block" title={intl.formatMessage({ id: 'navigation-menu.language' })} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={(e) => { localStorage.setItem(localStorageKeys.LOCALE, locales.RU); setCurrentLocale(locales.RU); }}><FormattedMessage id="locale-picker.russian" /></NavDropdown.Item>
                            <NavDropdown.Item onClick={(e) => { localStorage.setItem(localStorageKeys.LOCALE, locales.EN); setCurrentLocale(locales.EN); }}><FormattedMessage id="locale-picker.english" /></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder={intl.formatMessage({ id: 'navigation-menu.search' })}
                            aria-label="Search"
                            className="mr-2"
                        />
                        <Button className="mx-2" variant="outline-info" ><FormattedMessage id="navigation-menu.search.but" /></Button>
                    </Form>
                </Navbar.Collapse>
                {!user.isAuth && <Button variant="outline-primary" href={routeNames.LOGIN}><FormattedMessage id="navigation-menu.sign-in.but" /></Button>}
                {user.isAuth && <Button variant="outline-primary" onClick={Logout} href="/"><FormattedMessage id="navigation-menu.logout.but" /></Button>}
            </Container>
        </Navbar>)
});

export default Header;