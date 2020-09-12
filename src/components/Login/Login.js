import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';




firebase.initializeApp(firebaseConfig);

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(response => {

            const {displayName, email} = response.user;
            const googleSignInUser = {name: displayName, email}
            setLoggedInUser(googleSignInUser);
            history.replace(from);

          })
          .catch(error => {

            const errorMessage = error.message;
            console.log(errorMessage);
          });


    }


    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Sign in using Google</button>
        </div>
    );
};

export default Login;