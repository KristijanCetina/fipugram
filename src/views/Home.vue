<template>
  <div class="d-flex flex-wrap bd-highlight">
    <div class="p-2 flex-grow-1 bd-highlight"><InstagramCard v-for="card in cards" :key="card" :sourceUrl="card"/></div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";

let cards = [
  "https://picsum.photos/id/11/480",
  "https://picsum.photos/id/22/480",
  "https://picsum.photos/id/33/480",
];

export default {
  name: "Home",
  data: function () {
    return {
      cards: cards,
    };
  },
  components: {
    InstagramCard,
  },
};
</script>
