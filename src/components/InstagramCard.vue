<template>
  <div class="card text-center">
    <div class="card-header">{{info.description}}</div>
    <div class="card-body p-0">
      <img class="card-img-top" :src="info.url" />
    </div>
    <div class="card-footer text-muted small">{{info.time}}</div>
  </div>
</template>

<script>
export default {
  props: ['info'],
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
