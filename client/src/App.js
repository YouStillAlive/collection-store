import './App.css';
import { IntlProvider } from 'react-intl';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import Switcher from './shared/components/Switcher.js';
import { BrowserRouter as Router } from "react-router-dom";
import { locales, localesSet } from './shared/constants/locales.js';
import { useState, useContext, useEffect } from 'react';
import localStorageKeys from './shared/constants/localStorageKeys.js'
import { Spinner } from 'react-bootstrap';
import { Context } from './index.js';
import { check } from './shared/http/userApi.js';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const [currentLocale, setCurrentLocale] = useState(localStorage.getItem(localStorageKeys.LOCALE) || locales.EN);
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      if (!data) {
        user.setUser(null);
        user.setIsAuth(false);
        user.setIsAdmin(false);
      } else {
        user.setUser(data);
        user.setIsAuth(true);
      }
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <Spinner className="container" animation={"grow"} />;
  }

  return (
    <>
      <IntlProvider locale={currentLocale} messages={localesSet[currentLocale]}>
        <Header currentLocale={currentLocale} setCurrentLocale={setCurrentLocale} />
        <Router>
          <Switcher />
        </Router>
        <Footer />
      </IntlProvider>
    </>
  );
});

export default App;
