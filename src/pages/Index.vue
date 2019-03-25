<template>
	<q-page>
		<q-page-container v-if="loading">
			<q-inner-loading :showing="loading">
				<q-spinner-gears
				 size="70px"
				 color="primary"
				/>
			</q-inner-loading>
		</q-page-container>

		<q-page-container
		 style="padding: 0.5em"
		 v-if="!loading && posts.length > 0"
		>
			<q-carousel
			 arrows
			 animated
			 infinite
			 v-model="slide"
			>
				<q-carousel-slide
				 v-for="(post,index) in posts"
				 :name="index"
				 :key="index"
				 :img-src="post.imageUrl"
				>
					<div class="absolute-bottom custom-caption">
						<div class="text-h2">{{ post.title }}</div>
						<div class="text-subtitle1">{{ post.description }}</div>
					</div>
				</q-carousel-slide>

			</q-carousel>
		</q-page-container>

		<!-- <ApolloQuery :query="getPostsQuery">
			<template slot-scope="{result: { loading, error, data, networkStatus } }">
				<div v-if="loading">Loading...</div>
				<div v-else-if="error">Error! {{ error.message }}</div>
				<div v-else-if="!loading">Network Status: {{ networkStatus }}</div>
				<ul
				 v-else
				 v-for="post in data.getPosts"
				 :key="post.createdBy._id"
				>
					<li>
						{{ post.title }}
						{{ post.imageUrl }}
						{{ post.description }}
					</li>
				</ul>
			</template>
		</ApolloQuery> -->
		<!--
		<div v-if="$apollo.loading">Loading...</div>
		<q-list
		 v-else
		 v-for="post in posts"
		 :key="post.createdBy._id"
		>
			<q-item>
				<q-item-section>
					<q-item-label>
						{{ post.title }}
					</q-item-label>
					<q-item-label>
						{{ post.imageUrl }}
					</q-item-label>
					<q-item-label>
						{{ post.description }}
					</q-item-label>
				</q-item-section>
			</q-item>
			<q-item>
				<q-item-label>
					{{ post.likes }}
				</q-item-label>
			</q-item>
		</q-list> -->
	</q-page>
</template>

<style lang="stylus" scoped>
.custom-caption {
	text-align: center;
	padding: 12px;
	color: white;
	background-color: rgba(0, 0, 0, 0.3);
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
	name: "PageIndex",
	created() {
		this.handleGetCarouselPosts();
	},
	data() {
		return {
			slide: 1
		};
	},
	computed: {
		...mapGetters("example", ["posts", "loading"])
		// posts() {
		// 	return this.$store.getters["example/posts"];
		// },
		// loading() {
		// 	return this.$store.getters["example/loading"];
		// }
	},
	methods: {
		handleGetCarouselPosts() {
			//reach out to Vuex store, fire action that gets posts for carousel
			this.$store.dispatch("example/getPosts");
		}
	}
};
</script>