<template>
  <div class="">
      <fundamentjumbo
        src="/static/intro_bg.jpg"
        caption="DBÖ Annotations App"
        subtitle=""
      >
      </fundamentjumbo>
      <v-container grid-list-md v-if="$store.state.app.loggedin">
        <v-layout justify-space-around row wrap>
          <fundamentsectiondiv icon="description" caption="Collection Data"></fundamentsectiondiv>
          <v-flex xs12 sm6>
            <fundamentcard
              caption="Create a new Collection."
            >
              <p class="card-text">
                <v-btn @click="openCreateDialog('inventory')" color="info">Create</v-btn>
              </p>
            </fundamentcard>
          </v-flex>
          <v-flex xs12 sm6>
            <fundamentcard
              caption="Launch a new Query to ElasticSearch."
              :link="{ name: 'query', params: { lang: 'en' }}"
            >
              <p class="card-text"></p>
            </fundamentcard>
          </v-flex>
          <fundamentsectiondiv icon="device_hub" caption="Stats"></fundamentsectiondiv>
        </v-layout>
      </v-container>
      <v-container grid-list-md v-if="!$store.state.app.loggedin">
        Bitte loggen Sie sich ein um die Datenbank zu benutzen.
      </v-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import fundamentjumbo from './Fundament/FundamentJumbo';
import fundamentcard from './Fundament/FundamentCard';
import fundamentsectiondiv from './Fundament/FundamentSectionDiv';

export default {
  components: {
    fundamentjumbo,
    fundamentcard,
    fundamentsectiondiv,
  },
  name: 'start',
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations('dialogs', [
      'openCreateDialog',
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
