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
            storeAuthToken();
            history.replace(from);

          })
          .catch(error => {

            const errorMessage = error.message;
            console.log(errorMessage);
          });

    }

    const handleFacebookSignIn = () => {

        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider)
        .then(response => {
           
            const {displayName, email} = response.user;
            const facebookSignInUser = {name: displayName, email}
            setLoggedInUser(facebookSignInUser);
            history.replace(from);
            
          }).catch(error => {

            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }


    const handleGithubSignIn = () => {

        const ghProvider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(ghProvider)
        .then(response => {
           
            const {displayName, email} = response.user;
            const facebookSignInUser = {name: displayName, email}
            setLoggedInUser(facebookSignInUser);
            
            
          }).catch(error => {

            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }


    const storeAuthToken = () => {

      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {

        sessionStorage.setItem("token", idToken)
        history.replace(from);
      }).catch(function(error) {
       
      });

    }


    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Sign in using Google</button>
            <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
            <button onClick={handleGithubSignIn}>Sign in using Github</button>
        </div>
    );
};

export default Login;