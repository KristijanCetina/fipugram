<template>
	<div>
		<div class="d-flex p-2 flex-wrap justify-content-center">
			<InstagramCard
				v-for="card in filteredCards"
				:key="card.url"
				:info="card"
			/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { displayDateFormat } from "date-fns";
import * as axios from "axios";
import { VUE_APP_NASA_API_KEY } from "@/config.js";

let cards = [];

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
		console.log("kreirana instanca. dohvacam APOD podatke");
		const parseList = (response) => {
			if (response.status !== 200) throw Error(response.message);
			if (!response.data) return [];
			let list = response.data;
			if (typeof list !== "object") {
				list = [];
			}
			return list;
		};

		try {
			const response = await axios({
				method: "get",
				url: "https://api.nasa.gov/planetary/apod",
				params: {
					count: "6",
					api_key: `${VUE_APP_NASA_API_KEY}`,
				},
			});
			let data = parseList(response);
			this.cards = data;
			
		} catch (error) {
			console.error(error);
			return [];
		}
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
