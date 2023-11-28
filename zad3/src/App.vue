<template>
  <div class="container">
    <h1>Baza filmów</h1>
  <SearchBar :data="movieData"/>
  <Table :data={resultData} />
<!--  {{JSON.stringify(movieData[0])}}-->

  </div>
</template>

<script>
import Table from './components/MovieTable.vue'
import movieData from "./assets/movies-2020s.json"
import SearchBar from "@/components/SearchBar.vue";
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'App',
  components: {
    SearchBar,
    Table
  },
  data() {
    return {
      movieData: movieData
    };
  },
  props: {
    resultData: String
  }
}

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
