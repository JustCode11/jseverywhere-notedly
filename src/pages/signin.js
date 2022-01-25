import React, { useEffect } from 'react';
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

import UserForm from "../components/UserForm";
import { isLoggedInVar } from '../cache';

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = props => {
    let navigate = useNavigate();
    useEffect(() => {
        document.title = 'Sign In - Notedly';
    });

    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // store the token
            localStorage.setItem('token', data.signIn);
            // update local cache
            isLoggedInVar(true);
            // redirect the user to the homepage
            navigate("/");
        }
    })

    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {loading && <p>Loading...</p>}
            {error && <p>Error signin in!</p>}
        </React.Fragment>
    );
};

export default SignIn;