// import something here
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

//Setup ApolloClient
export const defaultClient = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	//include auth token with requests made to backend
	fetchOptions: {
		credentials: 'include'
	},
	request: operation => {
		//if no token with key of 'token in localStorage, add it
		if (!localStorage.token) {
			localStorage.setItem('token', '')
		}
		// operation adds the token to an authorization header, which is sent to backend
		operation.setContext({
			headers: {
				authorization: localStorage.getItem('token')
			}
		})
	},
	onError: ({ graphQLErrors, networkError }) => {
		if (networkError) {
			console.log('[networkError]', networkError);
		}

		if (graphQLErrors) {
			for (let err of graphQLErrors) {
				console.dir(err);
			}
		}
	}
});

const apolloProvider = new VueApollo({ defaultClient });

// leave the export, even if you don't use it
export default ({ app, Vue }) => {
	Vue.use(VueApollo)
	app.apolloProvider = apolloProvider
}


// import { ApolloClient } from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import VueApollo from 'vue-apollo'
// import { createHttpLink } from 'apollo-link-http'

// const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' })

// // Create the apollo client
// const apolloClient = new ApolloClient({
// 	link: httpLink,
// 	cache: new InMemoryCache(),
// 	connectToDevTools: true
// })

// export const apolloProvider = new VueApollo({
// 	defaultClient: apolloClient,
// 	errorHandler({ graphQLErrors, networkError }) {
// 		if (graphQLErrors) {
// 			graphQLErrors.map(({ message, locations, path }) =>
// 				console.log(
// 					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
// 				)
// 			)
// 		}
// 		if (networkError) {
// 			console.log(`[Network error]: ${networkError}`)
// 		}
// 	}
// })

// export default ({ app, Vue }) => {
// 	Vue.use(VueApollo)
// 	app.apolloProvider = apolloProvider
// }