<script>
export default {
  name: "MovieTable",
  props: ['data'],
}

</script>

<template>
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
      <tr v-for="(movie, index) in data" :key="index">
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>{{ movie.cast }}</td>
        <td>{{ movie.genres }}</td>
      </tr>
      </tbody>
    </table>
</template>

<style scoped>

</style>
