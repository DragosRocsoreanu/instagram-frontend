<template>
	<q-layout view="hHh lpR fFf">

		<!-- Header Start -->
		<q-header
		 elevated
		 class="bg-grey-1 text-black"
		>

			<!-- Toolbar Start -->
			<q-toolbar class="row">

				<!-- Drawer Button Start -->
				<q-btn
				 class=""
				 dense
				 flat
				 round
				 icon="menu"
				 @click="drawer = !drawer"
				/>

				<!-- Toolbar Title -->
				<q-toolbar-title class="col-auto">
					<!-- <router-link
					 style="all: unset; cursor: pointer"
					 to="/"
					>VueShare</router-link> -->

					<q-item
					 clickable
					 @click="activeLink = home"
					 :to="home"
					>
						VueShare
					</q-item>
				</q-toolbar-title>

				<q-space />

				<!-- Search Bar Start -->
				<q-input
				 class="col-auto"
				 outlined
				 dense
				 v-model="search"
				 input-class="text-left"
				 label="Search Posts"
				 style="width: 40%"
				>
					<template v-slot:prepend>
						<q-icon
						 v-if="search === ''"
						 name="search"
						/>
						<q-icon
						 v-else
						 name="clear"
						 class="cursor-pointer"
						 @click="search = ''"
						/>
					</template>
				</q-input>

				<q-space />

				<!-- Toolbar Menu Start -->
				<q-list
				 v-for="(menuItem,index) in nav"
				 :key="index"
				 class="col-auto gt-xs"
				>
					<q-item
					 clickable
					 @click="activeLink = menuItem.title"
					 :to="menuItem.link"
					 v-ripple
					>
						<q-item-section
						 avatar
						 class="gt-sm"
						>
							<q-icon :name="menuItem.icon" />
						</q-item-section>
						<q-item-section>
							{{ menuItem.title }}
						</q-item-section>
					</q-item>

					<q-separator v-if="menuItem.separator" />

				</q-list>

				<q-item
				 v-if="user"
				 clickable
				 @click="signoutUser"
				 v-ripple
				>
					<q-item-section
					 avatar
					 class="gt-sm"
					>
						<q-icon name="exit_to_app" />
					</q-item-section>
					<q-item-section>
						Sign Out
					</q-item-section>
				</q-item>

			</q-toolbar>
		</q-header>

		<!-- Side Menu Start -->
		<q-drawer
		 v-model="drawer"
		 :width="200"
		 :breakpoint="500"
		 content-class="bg-grey-1"
		 bordered
		>
			<div class="fit">
				<q-list
				 v-for="(menuItem,index) in nav"
				 :key="index"
				>

					<q-item
					 clickable
					 @click="activeLink = menuItem.title"
					 :to="menuItem.link"
					 v-ripple
					>
						<q-item-section avatar>
							<q-icon :name="menuItem.icon" />
						</q-item-section>
						<q-item-section>
							{{ menuItem.title }}
						</q-item-section>
					</q-item>

					<!-- <q-separator v-if="menuItem.separator" /> -->

				</q-list>
				<q-item
				 v-if="user"
				 clickable
				 @click="signoutUser"
				 v-ripple
				>
					<q-item-section
					 avatar
					 class="gt-sm"
					>
						<q-icon name="exit_to_app" />
					</q-item-section>
					<q-item-section>
						Sign Out
					</q-item-section>
				</q-item>
			</div>
		</q-drawer>

		<!-- Page Content / Router View -->
		<q-page-container>
			<transition
			 appear
			 enter-active-class="animated fadeIn"
			 leave-active-class="animated fadeOut"
			>
				<router-view />
			</transition>
		</q-page-container>
	</q-layout>
</template>

<script>
import { mapGetters } from "vuex";

// const menuList = [
// 	{
// 		icon: "chat",
// 		title: "Posts",
// 		link: "/posts"
// 	},
// 	{
// 		icon: "lock_open",
// 		title: "Sign In",
// 		link: "/signin"
// 	},
// 	{
// 		icon: "create",
// 		title: "Sign Up",
// 		link: "/signup"
// 	}
// ];

// const home = "/";

export default {
	data() {
		return {
			drawer: false,
			activeLink: "VueShare",
			search: "",
			home: "/"
		};
	},

	computed: {
		...mapGetters({ user: "example/user" }),
		nav() {
			let menuList = [
				{
					icon: "chat",
					title: "Posts",
					link: "/posts"
				},
				{
					icon: "lock_open",
					title: "Sign In",
					link: "/signin"
				},
				{
					icon: "create",
					title: "Sign Up",
					link: "/signup"
				}
			];
			if (this.user) {
				menuList = [
					{
						icon: "chat",
						title: "Posts",
						link: "/posts"
					},
					{
						icon: "stars",
						title: "Create Post",
						link: "/post/add"
					},
					{
						icon: "account_box",
						title: "Profile",
						link: "/profile"
					}
					// {
					// 	icon: "exit_to_app",
					// 	title: "SignOut",
					// 	link: "/signout"
					// }
				];
			}
			return menuList;
		}
	},

	methods: {
		signoutUser() {
			this.$store.dispatch("example/signoutUser");
		}
	}
};
</script>