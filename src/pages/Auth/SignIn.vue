<template>
	<q-page class="flex flex-center">
		<q-card
		 class="q-pa-md"
		 style="max-width: 600px"
		>
			<form
			 @submit.prevent.stop="onSubmit"
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
				 :rules="[ val => val && val.length > 0 || 'Please type something']"
				/>

				<q-input
				 ref="password"
				 filled
				 type="password"
				 v-model="password"
				 label="Password"
				 hint="Type in your password"
				 lazy-rules
				 :rules="[ val => val && val.length > 0 || 'Please type something']"
				/>

				<q-toggle
				 v-model="accept"
				 label="I accept the license and terms"
				/>

				<div>
					<q-btn
					 label="Submit"
					 type="submit"
					 color="primary"
					/>
					<q-btn
					 label="Reset"
					 type="reset"
					 color="primary"
					 flat
					/>
					<q-btn
					 label="Signup"
					 to="/signup"
					/>
				</div>

			</form>
		</q-card>
	</q-page>
</template>

<script>
export default {
	name: "SignIn",
	data() {
		return {
			username: null,
			password: null,

			accept: false
		};
	},

	methods: {
		// handleSigninUser() {
		// 	this.$store.dispatch("signinUser", {
		// 		username: this.username,
		// 		password: this.password
		// 	});
		// },
		onSubmit() {
			this.$refs.username.validate();
			this.$refs.password.validate();

			if (this.$refs.username.hasError || this.$refs.password.hasError) {
				this.formHasError = true;
			} else if (this.accept !== true) {
				this.$q.notify({
					color: "negative",
					message: "You need to accept the license and terms first"
				});
			} else {
				this.$store.dispatch("example/signinUser", {
					username: this.username,
					password: this.password
				});
				this.$q.notify({
					icon: "done",
					color: "positive",
					message: "Submitted"
				});
			}
		},
		onReset() {
			this.username = null;
			this.password = null;

			this.$refs.username.resetValidation();
			this.$refs.password.resetValidation();
		}
	}
};
</script>
