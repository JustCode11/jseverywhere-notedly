// import React and routing dependencies
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect,
    Navigate
} from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from '../gql/query';

// import shared layout component
import Layout from '../components/Layout';

// import routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';

// define routes
const Pages = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/mynotes" element={
                        <PrivateRoute>
                            <MyNotes />
                        </PrivateRoute>
                    } />
                    <Route path="/favorites" element={
                        <PrivateRoute>
                            <Favorites />
                        </PrivateRoute>
                    } />
                    <Route path="/note/:id" element={<NotePage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/new" element={
                        <PrivateRoute>
                            <NewNote />
                        </PrivateRoute>
                    } />
                    <Route path="/edit/:id" element={
                        <PrivateRoute>
                            <EditNote />
                        </PrivateRoute>
                    } />
                </Routes>
            </Layout>
        </Router>
    );
};

const PrivateRoute = ({ children }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    return (
        <React.Fragment>
            {data.isLoggedIn === true ? children : <Navigate to="/signin" />}
        </React.Fragment>
    )
}

/*const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    // if the user is logged in, route them to the requested component
    // else redirect them to the sign-in page
    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }}
                    />
                )
            }
        />
    );
};*/

export default Pages;