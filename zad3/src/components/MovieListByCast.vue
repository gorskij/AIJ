<script>
export default {
  name: "MovieListByCast",
  props: ['data'],
  data() {
    return {
      movieCastMap: {}
    };
  },
  created() {
    this.generateMovieCastMap();
  },
  methods: {
    generateMovieCastMap() {
      this.data.forEach(movie => {
        const cast = movie.cast;
        cast.forEach(actor => {
          if (!this.movieCastMap[actor]) {
            this.movieCastMap[actor] = [];
          }
          this.movieCastMap[actor].push(movie.title);
        });
      });

      const sortedActors = Object.keys(this.movieCastMap).sort();
      const sortedCastMap = {};

      sortedActors.forEach(actor => {
        const sortedTitles = this.movieCastMap[actor].sort();
        sortedCastMap[actor] = sortedTitles;
      });

      this.movieCastMap = sortedCastMap;
    }
  }
}
</script>

<template>
  <div>
    <h1>Filmy wg obsady</h1>
    <ul v-if="Object.keys(movieCastMap).length > 0" class="movie-list">
      <li v-for="(titles, actor) in movieCastMap" :key="actor">
        <strong>{{ actor }}</strong>
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
