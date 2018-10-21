<template>
  <div class="">
    <v-container grid-list-md v-if="$store.state.app.loggedin">
      <h3>Collections</h3>
      <v-data-table
        :headers="headers"
        :items="data"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props" >
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.annotations.length }}</td>
            <td>{{ props.item.es_document.length }}</td>
            <td><v-btn :to="{ name: 'collection', params: { id:  props.item.url.split('/').slice(-2)[0]  }}" color="info">Details</v-btn></td>
        </template>
      </v-data-table>
    </v-container>
    <v-container grid-list-md v-if="!$store.state.app.loggedin">
      Bitte loggen Sie sich ein um die Datenbank zu benutzen.
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import HELPERS from '../helpers';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  components: {
  },
  data() {
    return {
      data: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'desc' },
        { text: 'Annotations', value: 'annotations' },
        { text: 'Documents', value: 'documents' },
        { text: 'Actions', value: 'actions' },
      ],
    };
  },
  methods: {
    ...mapActions('api', [
      'get',
      'post',
      'delete',
    ]),
  },
  computed: {
  },
  created() {
    this.get({ type: 'collections' }).then((res) => {
      this.data = res.data.results;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
