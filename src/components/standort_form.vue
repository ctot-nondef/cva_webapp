<template>
  <div class="">
    <v-text-field v-model="standort.name" label="Name" @input="returnObject()"></v-text-field>
    <autocompactor v-model="standort.collector" label="Collector" :multiple="true" @input="standort.collector=$event;returnObject();"></autocompactor>
    <autocompplace v-model="standort.place" label="Place" :multiple="true" @input="standort.place=$event;returnObject();"></autocompplace>
    <v-text-field v-model="standort.beginOfExistence" label="Begin of Existence" @input="returnObject()"></v-text-field>
    <v-text-field v-model="standort.endOfExistence" label="End of Existence" @input="returnObject()"></v-text-field>
    <v-textarea v-model="standort.description" label="Description" @input="returnObject()"></v-textarea>
  </div>
</template>
<script>
import autocompactor from './AutocompActor';
import autocompplace from './AutocompPlace';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
export default {
  components: {
    autocompactor,
    autocompplace,
  },
  props: [
    'value',
  ],
  data() {
    return {
      standort: {},
      title: '',
      description: '',
      comment: '',
      public: false,
      url: '',
    };
  },
  watch: {
    value(val) {
      this.standort = val;
    },
  },
  methods: {
    returnObject() {
      this.$emit('input', this.standort);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
