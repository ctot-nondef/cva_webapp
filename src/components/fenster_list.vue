<template>
  <div class="">
    <v-card color="grey lighten-2" class="pa-4 mb-3">
      <v-layout justify-end row fill-height>
      <v-flex xs6>
        <v-select v-model="stufefilter" @input="getRecords()" :items="['', 'Fenster','Szene','Scheibe']" label="Stufe"></v-select>
      </v-flex>
      <v-flex xs6>
        <autocompstandort v-model="standortfilter" label="Standort" @input="standortfilter=$event;getRecords()"></autocompstandort>
      </v-flex>
     </v-layout>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="data"
      :loading="loading"
      :total-items="totalHits"
      :pagination.sync="pagination"
      :rows-per-page-items="itemOptions"
      class="elevation-1"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props" >
          <td>{{ props.item.name }}</td>
          <td>
            <v-btn fab dark small :to="{ name: 'fenstersingle', params: { id:  props.item._id  }}" color="primary">
              <v-icon dark>collections_bookmark</v-icon>
            </v-btn>
            <v-btn fab dark small color="warning" @click="editfenster(props.item._id)">
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="error" @click="deletefenster(props.item._id)">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </td>
      </template>
    </v-data-table>
    <v-layout column justify-space-between>
      <v-dialog
        v-model="fensterdialog"
        @keydown.esc="fensterdialog=false"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="fensterdialog=false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit fenster</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
              <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-menu>
          </v-toolbar>
          <v-container grid-list-md text-xs-center>
            <v-card color="grey lighten-2" class="pa-4">
              <fensterform :value="cedit" @input="cedits=$event"></fensterform>
              <v-layout justify-end row fill-height>
                <v-btn color="warning" @click="savefenster()">Save</v-btn>
                <v-btn color="primary" flat @click.native="fensterdialog=false">Discard</v-btn>
              </v-layout>
            </v-card>
          </v-container>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

import fundamentcard from './Fundament/FundamentCard';
import fensterform from './fenster_form';
import autocompstandort from './AutocompStandort';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  components: {
    fundamentcard,
    fensterform,
    autocompstandort,
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
      console.log(this.standortfilter);
      let q = {}
      if (this.stufefilter != '') q.stufe = this.stufefilter;
      if (this.standortfilter) q.locatedAt = this.standortfilter._id;
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
    editfenster(_id) {
      this.get({
        type: 'Fenster',
        query: JSON.stringify({
          _id: _id,
        }),
        populate: JSON.stringify([
          {"path":"creator"},
          {"path":"funder"},
          {"path":"images"},
          {"path":"locatedAt"},
          {"path":"isPartOf"},
          {"path":"classification"},
        ]),
      }).then((res) => {
        this.cedit = res.data[0];
        this.fensterdialog = true;
      });
    },
    savefenster() {
      console.log(this.cedits);
      if (this.cedits._id) {
        console.log(this.cedits);
        if(this.cedits.funder) this.cedits.funder.forEach((el, idx, c) => {
          c[idx] = el._id;
        });
        if(this.cedits.creator) this.cedits.creator.forEach((el, idx, c) => {
          c[idx] = el._id;
        });
        if(this.cedits.classification) this.cedits.classification.forEach((el, idx, c) => {
          c[idx] = el._id;
        });
        if(this.cedits.images) this.cedits.images.forEach((el, idx, c) => {
          c[idx] = el._id;
        });
        if(this.cedits.locatedAt) this.cedits.locatedAt = this.cedits.locatedAt._id;
        if(this.cedits.isPartOf) this.cedits.isPartOf = this.cedits.isPartOf._id;
        console.log(this.cedits);
        this.post({ type: 'fenster', id: this.cedits._id, body: this.cedits }).then((res) => {
          this.getRecords();
        });
      }
      this.fensterdialog = false;
    },
    deletefenster(_id) {
      this.delete({ type: 'Fenster', id: _id }).then((res) => {
        this.getRecords();
      })
      .catch((err) => {
        this.getRecords();
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
