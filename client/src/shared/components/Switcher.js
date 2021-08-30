import React, { useContext } from 'react'
import { Context } from '../../index.js';
import { Switch, Route, Redirect } from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from '../../routes.js';
import routeNames from '../constants/routeNames.js';

const Switcher = () => {
    const { user } = useContext(Context);
    return (
        <Switch>
            {user.isAuth && user.user.role === 'ADMIN' && adminRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {<Redirect to={routeNames.HOME} />}
        </Switch>
    );
}

export default Switcher;