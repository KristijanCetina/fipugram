<template>
  <div>
    <p>verzija: {{ GitHash }}</p>
  </div>
</template>

<script>
import GitHash from "@/hash.json";
export default {
  name: "Footer",
  data() {
    return {
      GitHash,
    };
  },
};
</script>
