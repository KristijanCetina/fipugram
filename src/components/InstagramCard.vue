<template>
  <div class="card text-center">
    <div class="card-header">{{ info.title }}</div>
    <div class="card-body p-0">
      <a :href="info.hdurl" target="_blank"
        ><img class="card-img-top" :src="info.url"
      /></a>
    </div>
    <div class="card-footer text-muted small">
      {{ info.date | timeAgo }}, {{ info.date | shortDate }}
      <br />
      {{ info.explanation }}
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["info"],
  name: "InstagramCard",

  filters: {
    timeAgo: function(value) {
      return moment(value).fromNow();
    },
    shortDate: function(value) {
      return moment(value).format("DD.MM.YYYY");
    },
  },
};
</script>

<style lang="scss">
.card-header,
.card-footer,
.card {
  text-align: left;
  border: 0;
}
.card {
  padding: 1pt;
  max-width: 940px;
}

// img {
//   border-radius: 10% !important;
// }
</style>
