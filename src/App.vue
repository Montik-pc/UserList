<template>
  <div id="app">
    <ListOfUsers/>
  </div>
</template>

<script>
import ListOfUsers from './components/ListOfUsers.vue'

export default {
  name: 'App',
  components: {
    ListOfUsers
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
position: relative;
right: 0;
text-align: right;
}
</style>