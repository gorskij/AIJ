<script>
export default {
  name: "MovieListByGenre",
  props: ['data'],
  data() {
    return {
      movieGenreMap: {}
    };
  },
  created() {
    this.generateMovieGenreMap();
  },
  methods: {
    generateMovieGenreMap() {
      this.data.forEach(movie => {
        const genres = movie.genres;
        genres.forEach(genre => {
          if (!this.movieGenreMap[genre]) {
            this.movieGenreMap[genre] = [];
          }
          this.movieGenreMap[genre].push(movie.title);
        });
      });

      const sortedGenres = Object.keys(this.movieGenreMap).sort();
      const sortedGenreMap = {};

      sortedGenres.forEach(genre => {
        const sortedTitles = this.movieGenreMap[genre].sort();
        sortedGenreMap[genre] = sortedTitles;
      });

      this.movieGenreMap = sortedGenreMap;
    }
  }
}
</script>

<template>
  <div>
    <h1>Filmy wg gatunku</h1>
    <ul v-if="Object.keys(movieGenreMap).length > 0" class="movie-list">
      <li v-for="(titles, genre) in movieGenreMap" :key="genre">
        <strong>{{ genre }}</strong>
        <ol>
          <li v-for="(title) in titles" :key="title">{{ title }}</li>
        </ol>
      </li>
    </ul>
    <p v-else>Brak filmów</p>
  </div>
</template>

<style scoped>
h1 {
  text-align: left;
}
.movie-list {
  list-style-type: none;
  padding: 0;
  text-align: left;
}
</style>
