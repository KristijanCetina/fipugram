<template>
	<div class="d-flex flex-wrap bd-highlight">
		<div class="p-2 flex-grow-2 bd-highlight">
			<InstagramCard
				v-for="card in filteredCards"
				:key="card.url"
				:info="card"
			/>
		</div>
		<!-- <div class="p-5 bd-highlight flex-grow-4" ><InstagramCard v-for="card in cards" :key="card" :sourceUrl="card"/></div> -->
	</div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";

let cards = [
	{
		url: "https://picsum.photos/id/11/480",
		description: "landscape",
		time: "A long time ago...",
	},
	{
		url: "https://picsum.photos/id/22/480",
		description: "Walking man. It's not Johnnie",
		time: "in a galaxy far, far away...",
	},
	{
		url: "https://picsum.photos/id/33/480",
		description: "green grass of home",
		time: "A student tried to learn vue.js",
	},
];

export default {
	name: "Home",
	data: function () {
		return {
			cards,
			store,
		};
	},
	computed: {
		filteredCards() {
			let termin = this.store.searchTerm;
			return this.cards.filter((card) => card.description.includes(termin));
		},
	},
	components: {
		InstagramCard,
	},
};
</script>
