export function setPosts(state, payload) {
	state.posts = payload;
}

export function setUser(state, payload) {
	state.user = payload;
}

export function setLoading(state, payload) {
	state.loading = payload;
}

// export function setError(state, payload) {
// 	state.error = payload
// }

export function clearUser(state) {
	state.user = null
}

// export function clearError(state) {
// 	state.error = null
// }
