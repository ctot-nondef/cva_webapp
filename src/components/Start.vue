<template>
  <div class="">
      <fundamentjumbo
        src="/static/intro_bg.jpg"
        caption="Corpus Vitrearum"
        subtitle=""
      >
      </fundamentjumbo>
      <v-container grid-list-md v-if="$store.state.app.loggedin">
        <v-layout justify-space-around row wrap>
          <fundamentsectiondiv icon="device_hub" caption="Stats"></fundamentsectiondiv>
          <v-flex xs12>
            <fundamentcard caption="Fenster">
              <div slot="content">
                <v-layout justify-center column fill-height>
                  <v-flex xs12>
                    <fenstersearch ref="fenstersearch"></fenstersearch>
                  </v-flex>
                </v-layout>
              </div>
            </fundamentcard>
          </v-flex>
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
import fenstersearch from './fenster_search';

export default {
  components: {
    fundamentjumbo,
    fundamentcard,
    fundamentsectiondiv,
    fenstersearch,
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
