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
        <td>{{ movie.cast.toString() }}</td>
        <td>{{ movie.genres.toString() }}</td>
      </tr>
      </tbody>
    </table>
  <button class="btn btn-info col-sm-2" style="margin: 20px" @click="handleShowMore" v-if="visibleData.length < data.length">Pokaż więcej</button><br/>
    Liczba znalezionych: {{movieData.length}},
    Widocznych: {{visibleData.length}}
  </div>
</template>

<style scoped>

</style>
