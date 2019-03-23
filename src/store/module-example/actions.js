import { gql } from "apollo-boost";
import { defaultClient as apolloClient } from "../../boot/apollo";

import { GET_CURRENT_USER, GET_POSTS, SIGNIN_USER } from './queries';
import router from "../../router/index";
// import Vue from 'vue';

export function getCurrentUser({ commit }) {
	commit('setLoading', true);
	apolloClient
		.query({
			query: GET_CURRENT_USER
		})
		.then(({ data }) => {
			commit('setLoading', false)
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

export function signinUser({ commit }, payload) {
	apolloClient
		.mutate({
			mutation: SIGNIN_USER,
			variables: payload
		})
		.then(({ data }) => {
			// console.log(data.signinUser);
			localStorage.setItem('token', data.signinUser.token);
			// to make sure created method is run in App.js (we run getCurrentUser), reload the page
			// Router.go();
			this.$routes.go();
			// router.go();
		})
		.catch(err => {
			console.error(err);
		})
}