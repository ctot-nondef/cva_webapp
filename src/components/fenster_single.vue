<template>
  <div class="">
    <v-parallax dark :src="`https://cvagoose.acdh-dev.oeaw.ac.at${view.images[0].path.split('.')[0]}_preview.jpg`">
      <v-layout align-center column justify-center>
        <div class="layer"></div>
        <h1 class="display-2 font-weight-thin mb-3">{{view.name.split(',').slice(-1)[0]}}</h1>
        <h4 class="subheading">{{ view.locatedAt.name }}</h4>
      </v-layout>
    </v-parallax>
    <v-container grid-list-md>
      <v-layout align-center justify-center row wrap>
        <v-flex xs6>
          <fundamentsectiondiv icon="place" caption="Standort"></fundamentsectiondiv>
        </v-flex>
        <v-flex xs6>
          <fundamentsectiondiv icon="device_hub" caption="Teil von"></fundamentsectiondiv>
         </v-flex>
        <v-flex xs6>
          <fundamentcard :caption="view.locatedAt.name" v-if="view.locatedAt.name">
            <div slot="content">
              <v-layout justify-center column fill-height>
                <v-flex xs12>
                  <v-list dense>
                   <v-list-tile v-if="view.locatedAt.beginOfExistence && view.locatedAt.endOfExistence">
                     <v-list-tile-content>Bauzeit:</v-list-tile-content>
                     <v-list-tile-content class="align-end">{{view.locatedAt.beginOfExistence.split('-')[0] }} - {{view.locatedAt.endOfExistence.split('-')[0] }}</v-list-tile-content>
                   </v-list-tile>
                   <v-list-tile>
                     <v-list-tile-content>Ort:</v-list-tile-content>
                     <v-list-tile-content class="align-end">{{ view.locatedAt.street }}, {{ view.locatedAt.postalcode }}</v-list-tile-content>
                   </v-list-tile>
                 </v-list>
                </v-flex>
                <v-flex xs12>
                  <v-layout justify-end row fill-height>
                    <v-btn :to="{ name: 'standort', params: { lang: 'en', id: view.locatedAt._id  }}" color="primary">Details</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
          </fundamentcard>
        </v-flex>
        <v-flex xs6>
          <fundamentcard :caption="view.isPartOf.name.split(',').slice(-1)[0]" v-if="view.isPartOf">
            <div slot="content">
              <div slot="content">
                <v-layout justify-center column fill-height>
                  <v-flex xs12>
                    <v-list dense>
                     <v-list-tile>
                       <v-list-tile-content>Datierung:</v-list-tile-content>
                       <v-list-tile-content class="align-end">{{view.isPartOf.created.split('-')[0] }}</v-list-tile-content>
                     </v-list-tile>
                     <v-list-tile>
                       <v-list-tile-content>Kommentare:</v-list-tile-content>
                       <v-list-tile-content class="align-end">{{ view.isPartOf.comments.join(", ") }}</v-list-tile-content>
                     </v-list-tile>
                   </v-list>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout justify-end row fill-height>
                      <v-btn :to="{ name: 'fenstersingle', params: { lang: 'en', id: view.isPartOf._id }}" color="primary">Details</v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </fundamentcard>
         </v-flex>
         <v-flex xs12 v-if="view.classification.length > 0">
           <fundamentsectiondiv icon="device_hub" caption="Klassifizierung"></fundamentsectiondiv>
           <v-list two-line>
             <template v-for="(item, index) in view.classification">
               <v-list-tile :key="item._id">
                 <v-list-tile-content>
                   <v-list-tile-title v-html="item.name"></v-list-tile-title>
                   <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                 </v-list-tile-content>
               </v-list-tile>
             </template>
           </v-list>
        </v-flex>
        <v-flex xs12 v-if="view.images.length > 0">
          <fundamentsectiondiv icon="image" caption="Bilder"></fundamentsectiondiv>
          <v-list two-line>
            <template v-for="(item, index) in view.images">
              <a :href="`https://cvagoose.acdh-dev.oeaw.ac.at/${item.path.split('.')[0]}_preview.jpg`" target="_blank">
              <v-list-tile :key="item._id" avatar  @click="">
                <v-list-tile-avatar>
                  <img :src="`https://cvagoose.acdh-dev.oeaw.ac.at/${item.path.split('.')[0]}_thumb.jpg`">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.path"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              </a>
            </template>
          </v-list>
       </v-flex>
         <v-flex xs12 v-if="data.length > 0">
           <fundamentsectiondiv icon="device_hub" caption="Teile"></fundamentsectiondiv>
           <v-data-table
             :headers="headers"
             :items="data"
             class="elevation-1"
           >
             <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
             <template slot="items" slot-scope="props" >
                 <td>{{ props.item.name }}</td>
                 <td>
                   <v-btn fab dark small :to="{ name: 'fenstersingle', params: { id:  props.item._id  }}" color="primary">
                     <v-icon dark>collections_bookmark</v-icon>
                   </v-btn>
                 </td>
             </template>
           </v-data-table>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import fundamentsectiondiv from './Fundament/FundamentSectionDiv';
import fundamentcard from './Fundament/FundamentCard';

import HELPERS from '../helpers';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  components: {
    fundamentcard,
    fundamentsectiondiv,
  },
  data() {
    return {
      view: {},
      data: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Actions', value: 'actions', width: '25%' },
      ],
    };
  },
  methods: {
    ...mapActions('api', [
      'get',
      'post',
      'delete',
    ]),
    getRecords(id) {
      this.get({
        type: 'Fenster',
        populate: JSON.stringify([
          {"path":"creator"},
          {"path":"funder"},
          {"path":"images"},
          {"path":"locatedAt"},
          {"path":"isPartOf"},
          {"path":"classification"},
        ]),
        query: JSON.stringify({
          "_id":id.params.id,
        }),
      }).then((res) => {
        this.view = res.data[0];
      });
      this.get({ type: 'Fenster', query: `{"isPartOf":"${id.params.id}"}` }).then((res) => {
        this.data = res.data;
      });
    },
  },
  computed: {
  },
  created() {
    this.getRecords(this.$route);
  },
  watch: {
    '$route':'getRecords',
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layer {
		background-color: rgba(0, 50, 99, 0.5);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
}
</style>
