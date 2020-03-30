import * as actionTypes from './actionTypes.js';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = error => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeOut = expirationTime => {
  console.log('expirationTime', expirationTime);
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    console.log(authData);
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9rBfRHNdViQulSbJROEWsioQs10yXFGc';

    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9rBfRHNdViQulSbJROEWsioQs10yXFGc';
    }

    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(
          authSuccess(
            response.data.idToken,
            response.data.localId
          )
        );
        console.log('****DISPATCHING***');
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
    // API calls for Auth
  };
};
