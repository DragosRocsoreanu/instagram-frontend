import AuthGuard from './AuthGuard'

const routes = [
	{
		path: '/',
		component: () => import('layouts/MyLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Index.vue') },
			{ path: '/posts', component: () => import('pages/Posts/Posts.vue') },
			{ path: '/post/add', component: () => import('pages/Posts/AddPost.vue') },
			{ path: '/profile', component: () => import('pages/Auth/Profile.vue'), beforeEnter: AuthGuard },
			{ path: '/signup', component: () => import('pages/Auth/SignUp.vue') },
			{ path: '/signin', component: () => import('pages/Auth/SignIn.vue') },
		]
	}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	})
}

export default routes
