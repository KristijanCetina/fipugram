<template>
  <div>
    <!-- nova forma za post -->
    <form
      @submit.prevent="postNewImage"
      class="form-inline mb-3 justify-content-center"
    >
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input
          v-model="newImageUrl"
          type="text"
          class="form-control ml-2"
          placeholder="Enter the image URL"
          id="imageUrl"
        />
      </div>
      <div class="form-group">
        <label for="imageDescription">Description</label>
        <input
          v-model="newImageDescription"
          type="text"
          class="form-control ml-2"
          placeholder="Enter the image description"
          id="imageDescription"
        />
      </div>
      <button type="submit" class="btn btn-primary ml-2">Post image</button>
      <br />
      <div v-show="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
    </form>
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
import { db } from "@/firebase";
import { format, parseISO } from "date-fns";

// let cards = [
//   {
//     url: "https://picsum.photos/id/11/480",
//     title: "landscape",
//     explanation: "A long time ago...",
//     date: "2020-12-12",
//   },
//   {
//     url: "https://picsum.photos/id/22/480",
//     title: "Walking man. It's not Johnnie",
//     explanation: "in a galaxy far, far away...",
//     date: "2020-10-10",
//   },
//   {
//     url: "https://picsum.photos/id/33/480",
//     title: "green grass of home",
//     explanation: "A student tried to learn vue.js",
//     date: "2020-10-10",
//   },
// ];

export default {
  name: "Fipugram",
  data: function () {
    return {
      cards: [],
      store,
      newImageUrl: "",
      newImageDescription: "",
      errorMessage: "",
    };
  },

  methods: {
    clearInputFields() {
      this.newImageUrl = "";
      this.newImageDescription = "";
      this.errorMessage = "";
    },
    postNewImage() {
      const imageURL = this.newImageUrl;
      const imageTitle = this.newImageDescription;
      if (imageURL != "" && imageTitle != "") {
        db.collection("posts")
          .add({
            url: imageURL,
            title: imageTitle,
            email: store.currentUser,
            datetime: Date(),
            posted_at: Date.now(),
          })
          .then((doc) => {
            console.log("spremljen post");
            this.clearInputFields();
          })
          .catch((e) => {
            console.error(e.message);
            this.errorMessage = e.message;
          });
      } else {
        this.errorMessage = "Daj budi drug pa popuni sve podatke";
      }
    },
    getPosts() {
      let cards = [];
      //... API/Firebase -> sve kartice -> cards
      console.log("Loading posts");
      db.collection("posts")
        .orderBy("datetime", "desc")
        .limit(10)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            let id = doc.id;
            let data = doc.data();
            let card = {
              id: doc.id,
              url: data.url,
              date: data.datetime,
			  title: data.title,
            };
            this.cards.push(card);
          });
        });
    },
  },

  async created() {
    console.log("kreirana instanca fipugram. dohvacam podatke");
	await this.getPosts(); //da li on uopće podrzava await???
	console.log("Gotovo s loadnjem")
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
