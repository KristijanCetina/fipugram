<template>
  <div>
    <input
      type="checkbox"
      id="showAllUsers"
      v-model="showAllUsers"
      true-value="true"
      false-value="false"
      @click="getPosts()"
    />
    <label for="showAllUsers">Show All Users</label>
    <!-- nova forma za post -->
    <form @submit.prevent="postNewImage" class=" mb-3 justify-content-center">
      <croppa
        :width="400"
        :height="400"
        placehoder="Dovuci sliku"
        v-model="imageReference"
      ></croppa>

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
      <button
        id="buttonPost"
        :disabled="store.pendingRequest"
        type="submit"
        class="btn btn-primary ml-2"
      >
        Post image
      </button>
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
import { db, storage } from "@/firebase";

export default {
  name: "Fipugram",
  data: function() {
    return {
      cards: [],
      store,
      imageReference: null,
      newImageDescription: "",
      errorMessage: "",
      showAllUsers: false,
    };
  },

  methods: {
    clearInputFields() {
      this.imageReference.remove();
      this.newImageDescription = "";
      this.errorMessage = "";
    },
    postNewImage() {
      store.pendingRequest = true;
      this.imageReference.generateBlob((blobData) => {
        const imageName = `posts/${store.currentUser}/${Date.now()}.png`;
        if (blobData != null) {
          storage
            .ref(imageName)
            .put(blobData)
            .then((result) => {
              result.ref.getDownloadURL().then((imageUrl) => {
                const imageTitle = this.newImageDescription;
                if (imageUrl != "" && imageTitle != "") {
                  db.collection("posts")
                    .add({
                      url: imageUrl,
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
              });
            })
            .catch((e) => {
              console.error(e.errorMessage);
            })
            .finally(() => {
              store.pendingRequest = false;
            });
        }
      });
    },
    async getPosts() {
      let cards = [];
      console.log("Loading posts");
      let query = db
        .collection("posts")
        .orderBy("posted_at", "desc")
        .limit(50);

      if (!showAllUsers.checked) {
        query = query.where("email", "==", store.currentUser);
      }

      await query
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

  async mounted() {
    console.log("mounted fipugram. dohvacam podatke");
    await this.getPosts();
    console.log("Gotov mounted fipugram");
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
