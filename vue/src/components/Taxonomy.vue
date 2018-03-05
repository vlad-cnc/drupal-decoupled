<template>
    <div class="container">
      <h4>Taxonomy terms:</h4>
      <div class="field">
        <h4>Add a taxonomy term</h4><br/>
        <label>Add a term name:</label><br/>
        <input v-model="jsonData.data.attributes.name" type="text" placeholder="Add a taxonomy term"/>
      </div>
      <div class="field">
        <label>Add a term description</label><br/>
        <input v-model="jsonData.data.attributes.description" type="text" placeholder="Add a description" />
      </div>
      <div class="field">
        <label>Vocabulary</label><br/>
        <select id="type-select" v-model="termVocabulary" >
          <option selected disabled>Pick a vocabulary</option>
          <option  v-for="vocab in vocabularies" :data-type="vocab.attributes.vid">
            {{vocab.attributes.name}}
          </option>
        </select>
      </div>
      <button @click="AddTerm" type="submit">Submit</button>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "taxonomy",
    data() {
      return {
        url: 'http://localhost:8200/jsonapi/taxonomy_vocabulary/taxonomy_vocabulary',
        urlPost: 'http://localhost:8200/jsonapi/taxonomy_term/',
        vocabularies: {},
        termName: "",
        termDescription: "",
        responsePost: "",
        termVocabulary: 'Pick a vocabulary',
        jsonData: {
          data: {
            type: "",
            attributes: {
              langcode: "en",
              name: "",
              description: "",
              weight: "0"
            }
          }
        },
      }
    },
    methods: {

      // Create a term
      AddTerm() {
        let data = JSON.stringify(this.jsonData);
        let targetVocab = this.termVocabulary.replace(" ", "_").toLowerCase();
        axios.post(this.urlPost + targetVocab + "?_format=json",data , {
          headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "Authorization": "Bearer " + this.$cookie.get('session_token'),
          }
        })
          .then(response => {
            this.responsePost = response.data;

          });
      },
    },
    created: function () {

      // Get the vocabularies
      axios.get(this.url, {
        headers: {
          "Accept": "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          "Authorization": "Bearer " + this.$cookie.get('session_token'),
        }
      })
        .then(response => {
          this.vocabularies = response.data.data;
        });
    }

  }
</script>

<style scoped lang="scss">
  .field {
    margin: {
      top: 20px;
    };
  }
</style>
