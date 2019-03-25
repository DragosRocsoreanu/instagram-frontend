<template>
	<q-page class="flex flex-center">
		<q-card
		 class="q-pa-md"
		 style="max-width: 600px"
		>
			<form
			 @submit.prevent.stop="onRegisterSubmit"
			 @reset.prevent.stop="onReset"
			 class="q-gutter-md"
			>
				<q-input
				 ref="username"
				 filled
				 type="text"
				 v-model="username"
				 label="Username"
				 hint="Type in your username"
				 lazy-rules
				 :rules="[ val => val && val.length > 3 || 'Please type something']"
				/>

				<q-input
				 ref="email"
				 filled
				 type="email"
				 v-model="email"
				 label="Email"
				 hint="Type in your email"
				 lazy-rules
				 :rules="[ val => val && val.length > 3 || 'Please type something']"
				/>

				<q-input
				 ref="password"
				 filled
				 type="password"
				 v-model="password"
				 label="Password"
				 hint="Type in your password"
				 lazy-rules
				 :rules="[ val => val && val.length > 3 || 'Please type something']"
				/>

				<q-input
				 ref="passwordConfirmation"
				 filled
				 type="password"
				 v-model="passwordConfirmation"
				 label="Confirm Password"
				 hint="Type in your password"
				 lazy-rules
				 :rules="[ val => val && val === this.password || 'Passwords must match']"
				/>

				<q-toggle
				 v-model="accept"
				 label="I accept the license and terms"
				/>

				<div>
					<q-btn
					 label="Signup"
					 :loading="loading"
					 type="submit"
					 color="primary"
					/>

					<q-btn
					 label="Reset"
					 type="reset"
					 color="primary"
					 flat
					/>
					<!-- <q-btn
					 label="Signup"
					 to="/signup"
					/> -->
				</div>

			</form>
		</q-card>
	</q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "SignUp",
	data() {
		return {
			username: null,
			email: null,
			password: null,
			passwordConfirmation: null,
			accept: false,
			loading: false
		};
	},

	computed: {
		...mapGetters({ user: "example/user" })
	},

	methods: {
		onRegisterSubmit() {
			this.$refs.username.validate();
			this.$refs.email.validate();
			this.$refs.password.validate();
			this.$refs.passwordConfirmation.validate();

			if (
				this.$refs.username.hasError ||
				this.$refs.password.hasError ||
				this.$refs.email.hasError ||
				this.$refs.passwordConfirmation.hasError
			) {
				this.formHasError = true;
			} else if (this.accept !== true) {
				this.$q.notify({
					color: "negative",
					message: "You need to accept the license and terms first"
				});
			} else {
				this.loading = true;
				this.$store
					.dispatch("example/signupUser", {
						username: this.username,
						email: this.email,
						password: this.password
					})
					.then(user => {
						this.loading = false;
						this.$q.notify({
							icon: "done",
							color: "positive",
							message: "Success"
						});
						// this.$store.dispatch("example/getCurrentUser");
						this.$router.push("/");
					})
					.catch(err => {
						this.loading = false;
						this.$q.notify({
							icon: "warning",
							color: "negative",
							message: err.message
						});
					});
			}
		},

		onReset() {
			this.username = null;
			this.email = null;
			this.password = null;
			this.passwordConfirmation = null;

			this.$refs.username.resetValidation();
			this.$refs.email.resetValidation();
			this.$refs.password.resetValidation();
			this.$refs.passwordConfirmation.resetValidation();
		}
	}
};
</script>
