<script>
export default {
  name: "MovieTable",
  props: ['data'],
  data() {
    return {
      itemsToShow: 10,
      visibleData: [],
    }
  },
  watch: {
    data: function() {
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
        <td>{{ movie.cast }}</td>
        <td>{{ movie.genres }}</td>
      </tr>
      </tbody>
    </table>
  <button @click="handleShowMore" v-if="visibleData.length < data.length">Pokaż więcej</button>
  </div>
</template>

<style scoped>

</style>
