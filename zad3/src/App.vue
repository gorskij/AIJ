<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Table :data={movieData} />
  {{movieData[0].title}}
<!--  {{JSON.stringify(movieData[0])}}-->

  aa
</template>

<script>
import Table from './components/MovieTable.vue'
import movieData from "./assets/movies-2020s.json"

export default {
  name: 'App',
  components: {
    Table

  },
  props: {
    movieData,
    resultData: String
  }
}

console.log(movieData);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
