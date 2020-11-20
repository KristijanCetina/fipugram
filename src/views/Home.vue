<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-3">
      <InstagramCard />
    </div>
    <div class="col-3">
      <InstagramCard />
    </div>
    <div class="col-3">
      <InstagramCard />
    </div>
    <div class="col-1"></div>
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
