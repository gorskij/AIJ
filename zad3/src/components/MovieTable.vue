<script>
export default {
  name: "MovieTable",
  props: ['data'],
  data() {
    return {
      movieData: [],
      itemsToShow: 10,
      visibleData: [],
    }
  },
  watch: {
    data: function() {
      this.movieData = this.data;
      this.initData();
    }
  },
  methods: {
    initData() {
      this.itemsToShow = 10;
      this.visibleData = this.data.slice(0, this.itemsToShow);
    },
    handleShowMore() {
      const endIndex = this.visibleData.length + this.itemsToShow;
      this.visibleData = this.data.slice(0, endIndex);
    }
  }
}

</script>

<template>
  <div>
    Liczba znalezionych: {{movieData.length}},
    Widocznych: {{visibleData.length}}

    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Production Year</th>
        <th>Cast</th>
        <th>Genres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(movie, index) in visibleData" :key="index">
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>{{ movie.cast }}</td>
        <td>{{ movie.genres }}</td>
      </tr>
      </tbody>
    </table>
  <button class="btn btn-info col-sm-2" @click="handleShowMore" v-if="visibleData.length < data.length">Pokaż więcej</button>
  </div>
</template>

<style scoped>

</style>
