<template>
  <div class="home">
    <img alt="Vue logo" src="https://scontent-vie1-1.xx.fbcdn.net/v/t31.0-8/21125653_1242892189155781_2868652093013795518_o.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_ohc=PSEZTakL32AAX_DkZRq&_nc_ht=scontent-vie1-1.xx&oh=037dc955f626064ad622b412c2065474&oe=5FCEF418" width="256">
    <HelloWorld msg="Welcome to fipugram by Kristijan Cetina"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>
