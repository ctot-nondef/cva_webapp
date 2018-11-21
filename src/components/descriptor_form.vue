<template>
  <div class="">
    <v-layout justify-end row fill-height>
      <v-flex xs6>
        <v-text-field v-model="descriptor.name" label="Name" @input="returnObject()"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-select
          v-model="descriptor.instanceOf"
          :items="$store.state.api.classes.Descriptor"
          item-text="labels[4].label"
          item-value="_id"
          label="Type"
          @input="returnObject()"
        ></v-select>
      </v-flex>
     </v-layout>
     <v-list>
       <template v-for="(item, index) in descriptor.labels">
         <v-list-tile>
           <v-list-tile-content>
             <v-list-tile-title v-html="item.label"></v-list-tile-title>
             <v-list-tile-sub-title v-html="item.lang"></v-list-tile-sub-title>
           </v-list-tile-content>
           <v-btn fab dark small color="error" @click="removelabel(index)">
             <v-icon dark>delete</v-icon>
           </v-btn>
         </v-list-tile>
       </template>
     </v-list>
    <v-textarea v-model="descriptor.description" label="Description" @input="returnObject()"></v-textarea>
  </div>
</template>
<script>
import autocompdescriptor from './AutocompDescriptor';
import autocompplace from './AutocompPlace';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
export default {
  components: {
    autocompdescriptor,
    autocompplace,
  },
  props: [
    'value',
  ],
  data() {
    return {
      descriptor: {},
      title: '',
      description: '',
      comment: '',
      public: false,
      url: '',
    };
  },
  watch: {
    value(val) {
      this.descriptor = val;
    },
  },
  methods: {
    returnObject() {
      this.$emit('input', this.descriptor);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
