<template>
  <div class="d-flex flex-wrap bd-highlight">
    <div class="p-2 flex-grow-2 bd-highlight" ><InstagramCard v-for="card in cards" :key="card" :data="card"/></div>
    <!-- <div class="p-5 bd-highlight flex-grow-4" ><InstagramCard v-for="card in cards" :key="card" :sourceUrl="card"/></div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";

let cards = [
  {url: "https://picsum.photos/id/11/480", description: "landscape", time: "A long time ago..."},
  {url: "https://picsum.photos/id/22/480", description: "Walking men. It's not Johnnie", time: "in a galaxy far, far away..."},
  {url: "https://picsum.photos/id/33/480", description: "green grass of home", time: "A student tried to learn vue.js"},
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
