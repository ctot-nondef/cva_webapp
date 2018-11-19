<template>
  <div class="">
    <v-container grid-list-md v-if="$store.state.app.loggedin">
      <fundamentcard caption="Fenster">
        <div slot="content">
          <v-layout justify-center column fill-height>
            <v-flex xs12>
              <v-layout justify-end row fill-height>
                <v-btn fab dark small color="warning" @click="fensterdialog=true">
                  <v-icon dark>edit</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <fensterlist ref="fensterlist"></fensterlist>
            </v-flex>
          </v-layout>
        </div>
      </fundamentcard>
      <v-layout column justify-space-between>
        <v-dialog
          v-model="fensterdialog"
          @keydown.esc="fensterdialog=false"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
          >
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click.native="fensterdialog=false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Create fenster</v-toolbar-title>
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
                <fensterform :value="newfenster" @input="newfenster=$event"></fensterform>
                <v-layout justify-end row fill-height>
                  <v-btn color="warning" @click="addfenster()">Save</v-btn>
                  <v-btn color="primary" flat @click.native="fensterdialog=false">Discard</v-btn>
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
import fensterlist from './fenster_list';
import fensterform from './fenster_form';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  components: {
    fundamentcard,
    fensterlist,
    fensterform,
  },
  data() {
    return {
      fensterdialog: false,
      newfenster: {},
    };
  },
  methods: {
    ...mapActions('api', [
      'get',
      'post',
      'delete',
    ]),
    addfenster() {
      console.log(this.newfenster);
      if(this.newfenster.funder) this.newfenster.funder.forEach((el, idx, c) => {
        c[idx] = el._id;
      });
      if(this.newfenster.creator) this.newfenster.creator.forEach((el, idx, c) => {
        c[idx] = el._id;
      });
      if(this.newfenster.classification) this.newfenster.classification.forEach((el, idx, c) => {
        c[idx] = el._id;
      });
      if(this.newfenster.images) this.newfenster.images.forEach((el, idx, c) => {
        c[idx] = el._id;
      });
      if(this.newfenster.locatedAt) this.newfenster.locatedAt = this.newfenster.locatedAt._id;
      if(this.newfenster.isPartOf) this.newfenster.isPartOf = this.newfenster.isPartOf._id;
      console.log(this.newfenster);
      this.post({ type: 'fenster', body: this.newfenster }).then((res) => {
        this.newfenster = {};
        this.fensterdialog = false;
        this.$refs.fensterlist.getRecords();
      });
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
