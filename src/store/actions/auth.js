import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken,
		userId,
	}
}

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error,
	}
}

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

export const checkAuthTimeout = expirationTime => dispatch => {
	setTimeout(() => {
		dispatch(logout())
	}, expirationTime * 1000)
}

export const auth = (email, password, isSignup) => dispatch => {
	dispatch(authStart())
	const authData = {
		email,
		password,
		returnSecureToken: true,
	}
	const url = isSignup
		? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAUmhfLfX9JNqFezTm_QPnCcTF-aVhsqY'
		: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAUmhfLfX9JNqFezTm_QPnCcTF-aVhsqY'
	axios
		.post(url, authData)
		.then(response => {
			console.log(response)
			dispatch(authSuccess(response.data.idToken, response.data.localId))
			dispatch(checkAuthTimeout(response.data.expiresIn))
		})
		.catch(({ response }) => {
			dispatch(authFail(response.data.error))
		})
}

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	}
}
