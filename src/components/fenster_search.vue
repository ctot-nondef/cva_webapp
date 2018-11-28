<template>
  <div class="">
    <v-card color="grey lighten-2" class="pa-4 mb-3">
      <v-layout justify-end row wrap fill-height>
      <v-flex xs6>
        <v-select v-model="stufefilter" @input="getRecords()" :items="['', 'Fenster','Szene','Scheibe']" label="Stufe"></v-select>
      </v-flex>
      <v-flex xs6>
        <autocompstandort v-model="standortfilter" label="Standort" @input="standortfilter=$event;getRecords()"></autocompstandort>
      </v-flex>
      <v-flex xs12>
        <autocompkeyword v-model="classificationfilter" label="Schlagwort" :multiple="true" @input="classificationfilter=$event;getRecords();"></autocompkeyword>
      </v-flex>
      <v-flex xs12>
        <autocompfenster v-model="fensterfilter" label="Teil von" @input="fensterfilter=$event;getRecords();"></autocompfenster>
      </v-flex>
      <v-flex xs12>
        <v-layout row>
            <v-flex shrink style="width: 60px">
              <v-text-field
                v-model="datefilter[0]"
                class="mt-0"
                hide-details
                single-line
                type="number"
                @input="getRecords();"
              ></v-text-field>
            </v-flex>
            <v-flex class="px-3">
              <v-range-slider
                v-model="datefilter"
                :max="1600"
                :min="1400"
                :step="1"
                @input="getRecords();"
              ></v-range-slider>
            </v-flex>

            <v-flex shrink style="width: 60px">
              <v-text-field
                v-model="datefilter[1]"
                class="mt-0"
                hide-details
                single-line
                type="number"
                @input="getRecords();"
              ></v-text-field>
            </v-flex>
        </v-layout>
      </v-flex>
     </v-layout>
    </v-card>
    <v-data-iterator
      :items="data"
      :loading="loading"
      :total-items="totalHits"
      :pagination.sync="pagination"
      :rows-per-page-items="itemOptions"
      content-tag="v-layout"
      row
      wrap
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <v-flex slot="item" slot-scope="props" xs12 sm6 md4
      >
      <v-card>
        <v-card-media v-if="props.item.images[0]" :src="`https://cvagoose.acdh-dev.oeaw.ac.at/${props.item.images[0].path.split('.')[0]}_thumb.jpg`" style="height: 200px!important;">
        </v-card-media>
         <v-card-title primary-title>
           <div>
             <h3 class="subheading mb-0">{{props.item.name.split(',').slice(-1)[0]}}</h3>
           </div>
         </v-card-title>
         <v-list dense>
          <v-list-tile v-if="props.item.locatedAt">
            <v-list-tile-content>Standort:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.locatedAt.name }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="props.item.creator[0]">
            <v-list-tile-content>Künstler/Werkstatt:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{ props.item.creator[0].name }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="props.item.created">
            <v-list-tile-content>Datierung:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{props.item.created.split('-')[0] }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
         <v-card-actions>
           <v-btn :to="{ name: 'fenstersingle', params: { id:  props.item._id  }}" color="primary">Details</v-btn>
         </v-card-actions>
       </v-card>
      </v-flex>
    </v-data-iterator>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

import fundamentcard from './Fundament/FundamentCard';
import fensterform from './fenster_form';
import autocompstandort from './AutocompStandort';
import autocompkeyword from './AutocompKeyword';
import autocompfenster from './AutocompFenster';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  components: {
    fundamentcard,
    fensterform,
    autocompstandort,
    autocompkeyword,
    autocompfenster,
  },
  data() {
    return {
      data: [],
      cedit: {},
      cedits: {},
      fensterdialog: false,
      loading: false,
      itemOptions: [10, 10, 50],
      totalHits: 0,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Actions', value: 'actions', width: '25%' },
      ],
      pagination: {},
      stufefilter: '',
      standortfilter: null,
      fensterfilter: null,
      classificationfilter: [],
      datefilter: [1400, 1600]
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getRecords();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('api', [
      'get',
      'post',
      'delete',
    ]),
    ...mapMutations('api', [
      'setPage',
      'setSize',
    ]),
    getRecords() {
      this.loading = true;
      let q = {}
      if (this.stufefilter != '') q.stufe = this.stufefilter;
      if (this.standortfilter) q.locatedAt = this.standortfilter._id;
      if (this.fensterfilter) q.isPartOf = this.fensterfilter._id;
      if (this.classificationfilter.length > 0) {
        q.classification = { "$in":[] };
        let idx = this.classificationfilter.length - 1;
        while (idx + 1) {
          q.classification["$in"].push(this.classificationfilter[idx]._id);
          idx -= 1;
        }
      };
      q.created = {
        "$gte" :  new Date(this.datefilter[0], 0),
        "$lt" : new Date(this.datefilter[1], 0)
      }
      this.get({
        type: 'Fenster',
        sort: this.pagination.descending ? `-${this.pagination.sortBy}` : this.pagination.sortBy,
        limit: this.pagination.rowsPerPage,
        skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
        populate: JSON.stringify([
          {"path":"creator"},
          {"path":"funder"},
          {"path":"images"},
          {"path":"locatedAt"},
          {"path":"isPartOf"},
          {"path":"classification"},
        ]),
        query: JSON.stringify(q),
      }).then((res) => {
        this.loading = false;
        this.data = res.data;
        this.totalHits = parseInt(res.headers['x-total-count']);
      }).catch((err) => {
        if (err.response.data && err.response.data.detail === 'Invalid page.') {
          this.pagination.page -= 1;
          this.getRecords();
        }
      });
    },
  },
  created() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
