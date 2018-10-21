<template>
  <div class="">
    <v-container grid-list-md v-if="$store.state.app.loggedin">
      <v-form >
        <v-select
          v-model="db"
          :items="dboptions"
          :rules="[v => !!v || 'Item is required']"
          value="ElasticSearch"
          label="Database"
          required
        ></v-select>
        <v-text-field
          v-model="query"
          label="Query"
          required
        ></v-text-field>
        <v-btn
          @click="getRecords"
        >
          submit
        </v-btn>
      </v-form>
      <h3>Query Results</h3>
      <v-data-table
        :headers="headers"
        :items="tabledata"
        class="elevation-1"
        :loading="loading"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox
              :input-value="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item._id }}</td>
          <td>{{ props.item._source.Hauptlemma }}</td>
          <td>{{ props.item._source.Kontext }}</td>
          <td>{{ props.item._source.Lautung }}</td>
        </tr>
        </template>
      </v-data-table>
      <v-btn @click="importRecords">IMPORT</v-btn>
      <div class="">
        <v-select
          v-model="target"
          :items="collections"
          item-text="title"
          label="Target Collection"
          required
        ></v-select>
        Imported {{ done }} of {{ tabledata.length }} records.
      </div>
    </v-container>
    <v-container grid-list-md v-if="!$store.state.app.loggedin">
      Bitte loggen Sie sich ein um die Datenbank zu benutzen.
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import HELPERS from '../helpers';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  components: {
  },
  data() {
    return {
      target: '',
      done: 0,
      db: 'ElasticSearch',
      query: '',
      loading: false,
      dboptions: ['ElasticSearch'],
      tabledata: [],
      selected: [],
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Hauptlemma', value: 'Hauptlemma' },
        { text: 'Kontext', value: 'Kontext' },
        { text: 'Lautung', value: 'Lautung' },
      ],
      collections: [],
    };
  },
  computed: {
    ...mapGetters('api', [
      'f',
      'types',
    ]),
  },
  methods: {
    ...mapActions('api', [
      'get',
      'post',
      'delete',
    ]),
    getRecords() {
      this.loading = true;
      this.f('api_dboe_query_list')({q: this.query}).then((res) => {
        this.loading = false;
        this.tabledata = res.data.results.hits.hits;
      });
    },
    importRecords() {
      for (let i = 0; i < this.tabledata.length; i++) {
        // first check if it's already there
        const r = this.tabledata[i];
        this.checkIfPresent(this.target, this.db, r.priref[0])
        .then((res) => {
          if (res.data.length === 0) {
            const mr = this.mapRecord(this.db, this.target, r);
            this.post({
              type: this.target,
              body: mr,
            });
          }
        }, r);
      }
    },
    checkIfPresent(type, source, priref) {
      return this.get({
        type,
        query: `{"adlib":"${source}_${priref}"}`,
      });
    },
  },
  created() {
    this.get({ type: 'collections' }).then((res) => {
      this.collections = res.data.results;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
