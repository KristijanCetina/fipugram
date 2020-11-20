<template>
  <div class="d-flex flex-wrap bd-highlight">
    <div class="p-1 flex-grow-1 bd-highlight"><InstagramCard /></div>
    <div class="p-2 flex-grow-1 bd-highlight"><InstagramCard /></div>
    <div class="p-2 flex-grow-1 bd-highlight"><InstagramCard /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";

export default {
  name: "Home",
  components: {
    InstagramCard,
  },
};
</script>
