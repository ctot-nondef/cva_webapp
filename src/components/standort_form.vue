<template>
  <div class="">
    <v-text-field v-model="standort.name" label="Name" @input="returnObject()"></v-text-field>
    <autocompactor v-model="standort.creator" label="Stifter" :multiple="true" @input="standort.creator=$event;returnObject();"></autocompactor>
    <autocompplace v-model="standort.place" label="Ort" :multiple="true" @input="standort.place=$event;returnObject();"></autocompplace>
    <v-text-field v-model="standort.street" label="Strasse" @input="returnObject()"></v-text-field>
    <v-text-field v-model="standort.postalcode" label="PLZ" @input="returnObject()"></v-text-field>
    <v-text-field v-model="standort.beginOfExistence" label="Begin of Existence" @input="returnObject()"></v-text-field>
    <v-text-field v-model="standort.endOfExistence" label="End of Existence" @input="returnObject()"></v-text-field>
    <v-textarea v-model="standort.description" label="Description" @input="returnObject()"></v-textarea>
    <v-list two-line>
      <template v-for="(item, index) in standort.images">
        <v-list-tile :key="item._id" avatar  @click="">
          <v-list-tile-avatar>
            <img :src="`https://cvagoose.acdh-dev.oeaw.ac.at/${item.path}`">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.path"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-btn fab dark small color="error" @click="removeimage(index)">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </v-list-tile>
      </template>
    </v-list>
    <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
    <input type="file" style="display: none"  ref="image"  accept="image/*"  @change="onFilePicked">
    <v-list two-line>
      <template v-for="(item, index) in standort.references">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.ref"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.pageno"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-btn fab dark small color="error" @click="removereference(index)">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </v-list-tile>
      </template>
    </v-list>
    <v-text-field label="Reference" v-model='newreference.ref'></v-text-field>
    <v-text-field label="PageNo" v-model='newreference.pageno'></v-text-field>
    <v-btn fab dark small color="warning" @click="addreference()">
      <v-icon dark>edit</v-icon>
    </v-btn>
    <v-list>
      <template v-for="(item, index) in standort.comments">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-html="item"></v-list-tile-title>
          </v-list-tile-content>
          <v-btn fab dark small color="error" @click="removecomment(index)">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </v-list-tile>
      </template>
    </v-list>
    <v-text-field label="Reference" v-model='newcomment'></v-text-field>
    <v-btn fab dark small color="warning" @click="addcomment()">
      <v-icon dark>edit</v-icon>
    </v-btn>
  </div>
</template>
<script>
import axios from 'axios';
import autocompactor from './AutocompActor';
import autocompplace from './AutocompPlace';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
export default {
  components: {
    autocompactor,
    autocompplace,
  },
  props: [
    'value',
  ],
  data() {
    return {
      standort: {},
      title: '',
      description: '',
      comment: '',
      public: false,
      url: '',
      imageName: '',
  		imageUrl: '',
  		imageFile: '',
      newreference: {},
      newcomment: '',
    };
  },
  watch: {
    value(val) {
      this.standort = val;
    },
  },
  methods: {
    returnObject() {
      this.$emit('input', this.standort);
    },
    pickFile () {
      this.$refs.image.click ()
    },
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
          console.log(this.imageFile);
          var formData = new FormData();
          formData.append('image', this.imageFile);
          axios.post('https://cvagoose.acdh-dev.oeaw.ac.at/api/v1/upload/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
          }).then((res) => {
            if(!this.standort.images) this.standort.images = [];
            this.standort.images.push(res.data);
            this.returnObject();
            this.imageName = '';
            this.imageFile = '';
            this.imageUrl = '';
          });
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
    removeimage(index) {
      this.standort.images.splice(index, 1);
      this.returnObject();
    },
    removereference(index) {
      this.standort.references.splice(index, 1);
      this.returnObject();
    },
    addreference() {
      if(!this.standort.references) this.standort.references = [];
      this.standort.references.push(this.newreference);
      this.returnObject();
      this.newreference = {};
    },
    removecomment(index) {
      this.standort.comments.splice(index, 1);
      this.returnObject();
    },
    addcomment() {
      if(!this.standort.comments) this.standort.comments = [];
      this.standort.comments.push(this.newcomment);
      this.returnObject();
      this.newcomment = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
