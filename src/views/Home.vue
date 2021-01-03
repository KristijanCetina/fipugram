<template>
	<div>
		<div class="d-flex p-2 flex-wrap">
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
//import {format, parseISO} from 'date-fns'
import { displayDateFormat } from "date-fns";
import * as axios from "axios";
import { VUE_APP_NASA_API_KEY } from '@/config.js'

let cards = [];

// let cards=[
// 	{
// 		url: "https://picsum.photos/id/11/480",
// 		description: "landscape",
// 		time: "A long time ago...",
// 	},
// 	{
// 		url: "https://picsum.photos/id/22/480",
// 		description: "Walking man. It's not Johnnie",
// 		time: "in a galaxy far, far away...",
// 	},
// 	{
// 		url: "https://picsum.photos/id/33/480",
// 		description: "green grass of home",
// 		time: "A student tried to learn vue.js",
// 	},
// ];

export default {
	name: "Home",
	data: function () {
		return {
			cards,
			store,
		};
	},
	methods: {},
	async created() {
		console.log("kreirana instanca. dohvacam podatke");
		
		const response = await axios({
			method: "get",
			url: "https://api.nasa.gov/planetary/apod",
			params: {
				count: "5",
				api_key: `${VUE_APP_NASA_API_KEY}`,
			},
		});
		this.cards = response.data; //.map (c =>{c.date = format(c.date, parseISO('DD.MM.YYYY'))});
		// console.log(response.data);
		// console.log(cards);
		// return this.cards;
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
