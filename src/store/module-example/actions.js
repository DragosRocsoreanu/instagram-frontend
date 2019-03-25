// import { gql } from "apollo-boost";
import { defaultClient as apolloClient } from "../../boot/apollo";

import { GET_CURRENT_USER, GET_POSTS, ADD_POST, SIGNIN_USER, SIGNUP_USER } from './queries';
// import router from "../../router/index";
// import Vue from 'vue';

export function getCurrentUser({ commit }) {
	commit('setLoading', true);
	apolloClient
		.query({
			query: GET_CURRENT_USER
		})
		.then(({ data }) => {
			commit('setLoading', false)
			//Add user data to state
			commit('setUser', data.getCurrentUser);
			console.log(data.getCurrentUser);
		})
		.catch(err => {
			commit('setLoading', false);
			console.error(err);
		})
}

export function getPosts({ commit }) {
	commit('setLoading', true)
	// use ApolloClient to fire getPosts query
	apolloClient
		.query({
			query: GET_POSTS
		}).then(({ data }) => {
			// Get data from actions to state via mutations
			// Commit passes data from actions to mutation functions
			commit('setPosts', data.getPosts);
			commit('setLoading', false);
		}).catch(err => {
			commit('setLoading', false)
			console.error(err);
		})
}

export function addPost({ commit }, payload) {
	apolloClient
		.mutate({
			mutation: ADD_POST,
			variables: payload
		})
		.then(({ data }) => {
			console.log(data.addPost)
		})
		.catch(err => {
			console.error(err);
		})
}


export function signinUser({ commit, dispatch }, payload) {
	// commit('clearError')
	//clear token to prevent errors (if malformed)
	return new Promise((resolve, reject) => {
		localStorage.setItem("token", "")
		apolloClient
			.mutate({
				mutation: SIGNIN_USER,
				variables: payload
			})
			.then(({ data }) => {
				localStorage.setItem('token', data.signinUser.token);
				// to make sure created method is run in App.js (we run getCurrentUser), reload the page
				dispatch("getCurrentUser")
				// this.$router.go();
				resolve(data.signinUser) // resolve to the whole user
			})
			.catch(err => {
				// commit('setError', err);
				console.error(err);
				reject(err)
			})
	})
}

export function signupUser({ commit, dispatch }, payload) {
	// commit('clearError')
	//clear token to prevent errors (if malformed)
	return new Promise((resolve, reject) => {
		localStorage.setItem("token", "")
		apolloClient
			.mutate({
				mutation: SIGNUP_USER,
				variables: payload
			})
			.then(({ data }) => {
				localStorage.setItem('token', data.signupUser.token);
				// to make sure created method is run in App.js (we run getCurrentUser), reload the page
				dispatch("getCurrentUser")
				// this.$router.go();
				resolve(data.signinUser) // resolve to the whole user
			})
			.catch(err => {
				// commit('setError', err);
				console.error(err);
				reject(err)
			})
	})
}

export async function signoutUser({ commit }) {
	// clear user in state
	commit('clearUser');
	// remove token in localStorage
	localStorage.setItem('token', '');
	// end session
	await apolloClient.resetStore();
	// redirect home - kick users out of private pages (i.e. profile)
	this.$router.push('/')
}

// export function signinUser({ commit, dispach }, payload) {
// 	return new Promise((resolve, reject) => {
// 		apolloClient
// 			.mutate({
// 				mutation: SIGNIN_USER,
// 				variables: payload
// 			})
// 			.then(({ data }) => {
// 				// console.log(data.signinUser);
// 				localStorage.setItem('token', data.signinUser.token);
// 				// to make sure created method is run in App.js (we run getCurrentUser), reload the page
// 				this.dispatch('example/getCurrentUser')
// 				resolve(data.signinUser) // resolve to the whole user
// 			})
// 			.catch(err => {
// 				console.error(err);
// 				reject(err)
// 			})
// 	})
// }