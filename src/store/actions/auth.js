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
		})
		.catch(({ response }) => {
			dispatch(authFail(response.data.error))
		})
}
