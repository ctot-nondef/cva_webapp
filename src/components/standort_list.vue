<template>
  <div class="">
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
            <v-btn fab dark small :to="{ name: 'standortsingle', params: { id:  props.item._id  }}" color="primary">
              <v-icon dark>collections_bookmark</v-icon>
            </v-btn>
            <v-btn fab dark small color="warning" @click="editstandort(props.item._id)">
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="error" @click="deletestandort(props.item._id)">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </td>
      </template>
    </v-data-table>
    <v-layout column justify-space-between>
      <v-dialog
        v-model="standortdialog"
        @keydown.esc="standortdialog=false"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="standortdialog=false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit standort</v-toolbar-title>
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
              <standortform :value="cedit" @input="cedits=$event"></standortform>
              <v-layout justify-end row fill-height>
                <v-btn color="warning" @click="savestandort()">Save</v-btn>
                <v-btn color="primary" flat @click.native="standortdialog=false">Discard</v-btn>
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
import standortform from './standort_form';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  components: {
    fundamentcard,
    standortform,
  },
  data() {
    return {
      data: [],
      cedit: {},
      cedits: {},
      standortdialog: false,
      loading: false,
      itemOptions: [10, 10, 50],
      totalHits: 0,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Actions', value: 'actions', width: '25%' },
      ],
      pagination: {},
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
      console.log(this.pagination);
      this.get({
        type: 'Standort',
        sort: this.pagination.descending ? `-${this.pagination.sortBy}` : this.pagination.sortBy,
        limit: this.pagination.rowsPerPage,
        skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
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
    editstandort(_id) {
      this.get({
        type: 'Standort',
        query: JSON.stringify({
          _id: _id,
        }),
        populate: JSON.stringify([
          {"path":"creator"},
          {"path":"place"},
          {"path":"images"},
        ]),
      }).then((res) => {
        this.cedit = res.data[0];
        this.standortdialog = true;
      });
    },
    savestandort() {
      if (this.cedits._id) {
        if(this.cedits.place) this.cedits.place.forEach((el, idx, c) => {
          c[idx] = el._id;
        });
        if(this.cedits.creator) this.cedits.creator.forEach((el, idx, c) => {
          c[idx] = el._id;
        });
        if(this.cedits.images) this.cedits.images.forEach((el, idx, c) => {
          c[idx] = el._id;
        });
        this.post({ type: 'standort', id: this.cedits._id, body: this.cedits }).then((res) => {
          this.getRecords();
        });
      }
      this.standortdialog = false;
    },
    deletestandort(_id) {
      this.delete({ type: 'Standort', id: _id }).then((res) => {
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
