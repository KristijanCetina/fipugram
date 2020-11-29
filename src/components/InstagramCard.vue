<template>
  <div class="card text-center">
    <div class="card-header">Author name: </div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="sourceUrl" />
    </div>
    <div class="card-footer text-muted small">2 days ago</div>
  </div>
</template>

<script>
export default {
  props: ['sourceUrl'],
  name: "InstagramCard",
};
</script>

<style lang="scss" >
.card-header,
.card-footer,
.card {
  text-align: left;
  border: 0;
}
img {
  border-radius: 10% !important;
}
</style>
