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
        :key="card.id"
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
            posted_at: Date.now(),
          })
          .then((doc) => {
            console.log("spremljen post");
            this.clearInputFields();
            this.getPosts();
          })
          .catch((e) => {
            console.error(e.message);
            this.errorMessage = e.message;
          });
      } else {
        this.errorMessage = "Daj budi drug pa popuni sve podatke";
      }
    },
    async getPosts() {
      let cards = [];
      console.log("Loading posts");
      await db
        .collection("posts")
        .orderBy("posted_at", "desc")
        .limit(10)
        .get()
        .then((results) => {
          this.cards = [];
          results.forEach((doc) => {
            const data = doc.data();
            this.cards.push({
              id: data.id,
              url: data.url,
              date: data.posted_at,
              title: data.title,
            });
          });
        })
        .catch((e) => {
          console.error(e.message);
          this.errorMessage = e.message;
        });
    },
  },

  async created() {
    console.log("kreirana instanca fipugram. dohvacam podatke");
    await this.getPosts(); //da li on uopće podrzava await???
    console.log("Gotovo s loadnjem");
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
