<template>
  <div class="container">
    <h1>Baza filmów</h1>
  <SearchBar :data="movieData" @resultData="handleResultData"/>
  <MovieTable :data="resultData" />
  <MovieListByGenre :data="sampleMovieData" />
  <MovieListByCast :data="sampleMovieData" />
  </div>
</template>

<script>
import MovieTable from './components/MovieTable.vue';
import movieData from "./assets/movies-2020s.json";
import SearchBar from "@/components/SearchBar.vue";
import MovieListByGenre from "@/components/MovieListByGenre";
import MovieListByCast from "@/components/MovieListByCast";
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'App',
  components: {
    SearchBar,
    MovieTable,
    MovieListByGenre,
    MovieListByCast,
},
  data() {
    return {
      movieData: movieData,
      resultData: [],
      sampleMovieData: []
    };
  },
  watch: {
    data: {
      immediate: true, 
      handler() {
        this.sliceMovieData();
      },
    },
  },
  methods: {
    handleResultData(resultData) {
      this.resultData = resultData;
    },
    sliceMovieData() {
      this.sampleMovieData = this.movieData.slice(0, 100);
    }
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
