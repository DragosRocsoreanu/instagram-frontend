import store from '../store/module-example/index.js'

export default (to, from, next) => {
	if (!store.getters['example/user']) {
		next({
			path: '/signin'
		});
	} else {
		next();
	}
}

// import store from '../store/index.js';

// export default (to, from, next) => {
// 	if (!store.getters["example/user"]) {
// 		store.watch(
// 			(state, getters) => getters.loading,
// 			(value) => {
// 				if (!value && store.getters["example/user"]) next();
// 				if (!value && !store.getters["example/user"]) next({ path: '/signin' });
// 			}
// 		);
// 	} else {
// 		next();
// 	}
// };