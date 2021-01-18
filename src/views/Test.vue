<template>
  <h1>Još ne delam</h1>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  //valjda dođe tu. forši da pogledam dokumentaciju
  name: "TS_test",
  data: function() {
    return {
      time: Date
    };
  }
});

function writeTime() {
  document.body.innerHTML = "<h1>" + Date() + "</h1>";
}

setInterval(writeTime, 1000);
</script>

<style>
body {
  background-color: black;
}
h1 {
  text-align: center;
  font-size: 200px;
  color: #888888;
}
</style>
