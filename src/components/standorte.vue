<template>
  <div class="">
    <v-container grid-list-md v-if="$store.state.app.loggedin">
      <fundamentcard caption="Standorte">
        <div slot="content">
          <v-layout justify-center column fill-height>
            <v-flex xs12>
              <v-layout justify-end row fill-height>
                <v-btn fab dark small color="warning" @click="standortdialog=true">
                  <v-icon dark>edit</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <standortlist ref="standortlist"></standortlist>
            </v-flex>
          </v-layout>
        </div>
      </fundamentcard>
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
              <v-toolbar-title>Create standort</v-toolbar-title>
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
                  <v-btn color="warning" @click="addstandort()">Save</v-btn>
                  <v-btn color="primary" flat @click.native="standortdialog=false">Discard</v-btn>
                </v-layout>
              </v-card>
            </v-container>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
    <v-container grid-list-md v-if="!$store.state.app.loggedin">
      Bitte loggen Sie sich ein um die Datenbank zu benutzen.
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import fundamentcard from './Fundament/FundamentCard';
import standortlist from './standort_list';
import standortform from './standort_form';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  components: {
    fundamentcard,
    standortlist,
    standortform,
  },
  data() {
    return {
      standortdialog: false,
      cedit: {},
      cedits: {},
    };
  },
  methods: {
    ...mapActions('api', [
      'get',
      'post',
      'delete',
    ]),
    addstandort() {
      if(this.cedits.place) this.cedits.place.forEach((el, idx, c) => {
        c[idx] = el._id;
      });
      if(this.cedits.creator) this.cedits.creator.forEach((el, idx, c) => {
        c[idx] = el._id;
      });
      if(this.cedits.images) this.cedits.images.forEach((el, idx, c) => {
        c[idx] = el._id;
      });
      this.post({ type: 'standort', body: this.cedits }).then((res) => {
        this.cedit = {};
        this.standortdialog = false;
        this.$refs.standortlist.getRecords();
      });
    },
    createstandort() {
      this.cedit = {name: "", images: []};
      this.standortdialog = true;
    },
  },
  computed: {
  },
  created() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
