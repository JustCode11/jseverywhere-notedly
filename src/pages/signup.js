import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { isLoggedInVar } from '../cache';

import UserForm from "../components/UserForm";

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUp = props => {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = 'Sign Up - Notedly';
    });

    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // store the JWT in localStorage
            localStorage.setItem('token', data.signUp);
            // update the local cache
            isLoggedInVar(true);
            // redirect the user to the homepage
            navigate("/");
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {loading && <p>Loading...</p>}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};

export default SignUp;