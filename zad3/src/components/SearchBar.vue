<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for=inputTitle>Tytuł</label>
      <input type="text" id=inputTitle class="form-control" placeholder="Podaj tytuł lub fragment tytułu filmu" v-model="formData.title"/>
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="inputProductionFrom">Rok produkcji od:</label>
      <div class="col-sm-8">
        <input type="text" id=inputProductionFrom class="form-control"  placeholder="Liczba naturalna z przedziału 1900-2019"  v-model="formData.productionFrom"/>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-4 col-form-label" for="inputProductionTo">Rok produkcji do:</label>
      <div class="col-sm-8">
        <input type="text" id=inputProductionTo class="form-control" placeholder="Liczba naturalna z przedziału 1900-2019" v-model="formData.productionTo"/>
      </div>
    </div>
    <div class="form-group">
      <label for="inputCast">Obsada</label>
      <input type="text" id="inputCast" class="form-control" placeholder="Imię i nazwisko" v-model="formData.cast"/>
    </div>
    <div class="form-group row">
      <input type="submit" class="btn btn-info col-sm-12" value="Szukaj"/>
    </div>
  </form>
</template>

<script>

import {toRaw} from "vue";

export default {
  name: "SearchBar",
  props: ['data'],
  emits: ['resultData'],
  data() {
    return {
    formData: {
      title: undefined,
      productionFrom: undefined,
      productionTo: undefined,
      cast: undefined,
    }
    }
  },
  methods: {
    handleSubmit() {
      this.resultData = this.filterData(this.formData.title, this.formData.productionFrom, this.formData.productionTo, this.formData.cast)
      this.$emit("resultData", this.resultData);
    },
    filterData(formTitle, formProductionFrom, formProductionTo, formCast) {
      let result = toRaw(this.data);

      if(formTitle)
        result = result.filter(({title}) => title === formTitle);
      if(formProductionFrom)
        result = result.filter(({year}) => formProductionFrom <= year);
      if(formProductionTo)
        result = result.filter(({year}) => formProductionTo >= year);
      if(formCast)
        result = result.filter(({cast}) => cast.findIndex((castPerson) => castPerson === formCast) !== -1);

      return result;
    }
  }
}
</script>


<style scoped>
.row {
  margin-top: 20px;
}
.form-group {
  text-align: left;
}
</style>
