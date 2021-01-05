<template>
	<div>
		<div class="d-flex p-2 flex-wrap justify-content-center">
			<InstagramCard
				v-for="card in filteredCards"
				:key="card.url"
				:info="card"
			/>
		</div>
		<div class="footer text-muted">
			<small
				><a href="https://github.com/KristijanCetina/fipugram">
					ovo je valjda na dnu</a
				></small
			>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";

let cards=[
	{
		url: "https://picsum.photos/id/11/480",
		title: "landscape",
		explanation: "A long time ago...",
		date: "2020-12-12",
	},
	{
		url: "https://picsum.photos/id/22/480",
		title: "Walking man. It's not Johnnie",
		explanation: "in a galaxy far, far away...",
		date: "2020-10-10",
	},
	{
		url: "https://picsum.photos/id/33/480",
		title: "green grass of home",
		explanation: "A student tried to learn vue.js",
		date: "2020-10-10",
	},
];

export default {
	name: "Fipugram",
	data: function () {
		return {
			cards,
			store,
		};
	},
	methods: {},
	async created() {
		console.log("kreirana instanca. dohvacam podatke");
		},

	computed: {
		filteredCards() {
			let termin = this.store.searchTerm;
			return this.cards.filter((card) =>
				card.title.toLowerCase().includes(termin.toLowerCase())
			);
		},
	},
	components: {
		InstagramCard,
	},
};
</script>
