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
    <v-container fluid>
      <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
        <img :src="imageUrl" height="150" v-if="imageUrl"/>
        <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
        <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        >
      </v-flex>
    </v-container>
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
  		imageFile: ''
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
            console.log(res);
          });
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
