import Dashboard from './dashboard/Dashboard.js'
import Admin from './admin/Admin.js'
import Auth from './auth/Auth.js';
import Registration from './auth/Registration.js';
import Profile from './profile/Profile.js'
import routeNames from './shared/constants/routeNames.js';
import Collection from './collection/Collection.js';

export const adminRoutes = [
    {
        path: routeNames.ADMIN,
        Component: Admin
    }
]

export const authRoutes = [
    {
        path: routeNames.PROFILE,
        Component: Profile
    }
]

export const publicRoutes = [
    {
        path: routeNames.HOME,
        Component: Dashboard
    },
    {
        path: routeNames.LOGIN,
        Component: Auth
    },
    {
        path: routeNames.SING_UP,
        Component: Registration
    },
    {
        path: routeNames.COLLECTION,
        Component: Collection
    }
]