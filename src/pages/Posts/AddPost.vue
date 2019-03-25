<template>
	<q-page class="flex flex-center">
		<q-card
		 class="q-pa-md"
		 style="max-width: 600px"
		>
			<form
			 @submit.prevent.stop="addPost"
			 class="q-gutter-md"
			>
				<q-input
				 ref="title"
				 filled
				 type="text"
				 v-model="title"
				 label="Post Title"
				 lazy-rules
				 :rules="[ val => val && val.length > 0 || 'Title is required']"
				/>

				<q-input
				 ref="imageUrl"
				 filled
				 type="text"
				 v-model="imageUrl"
				 label="Image URL"
				 lazy-rules
				 :rules="[ val => val && val.length > 0 || 'Image is required']"
				/>

				<img
				 :src="imageUrl"
				 height="300px"
				>

				<q-select
				 ref="categories"
				 v-model="categories"
				 :options="['Art', 'Education', 'Travel', 'Photography', 'Technology']"
				 label="Categories"
				 lazy-rules
				 :rules="[ val => val && val.length > 0 || 'At least one entry']"
				 multiple
				/>

				<q-input
				 ref="description"
				 filled
				 type="textarea"
				 v-model="description"
				 label="Description"
				 lazy-rules
				 :rules="[ val => val && val.length > 0 || 'Description is required']"
				/>

				<div>
					<q-btn
					 label="Submit"
					 :loading="loading"
					 type="submit"
					 color="primary"
					/>
				</div>

			</form>
		</q-card>
	</q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "AddPost",
	data() {
		return {
			title: null,
			imageUrl: "",
			categories: [],
			description: null,
			accept: true,
			loading: false
		};
	},
	computed: {
		...mapGetters({ user: "example/user" })
	},
	methods: {
		addPost() {
			this.$refs.title.validate();
			this.$refs.imageUrl.validate();
			this.$refs.categories.validate();
			this.$refs.description.validate();

			if (
				this.$refs.title.hasError ||
				this.$refs.imageUrl.hasError ||
				this.$refs.description.hasError ||
				this.$refs.categories.hasError
			) {
				this.formHasError = true;
			} else if (this.accept !== true) {
				this.$q.notify({
					color: "negative",
					message: "Error, please complete all the fields"
				});
			} else {
				this.loading = true;
				this.$store
					.dispatch("example/addPost", {
						title: this.title,
						imageUrl: this.imageUrl,
						categories: this.categories,
						description: this.description,
						creatorId: this.user._id
					})
					.then(user => {
						this.loading = false;
						this.$q.notify({
							icon: "done",
							color: "positive",
							message: "Success"
						});
						// this.$store.dispatch("example/getCurrentUser");
						// this.$router.push("/");
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
		}
	}
};
</script>
