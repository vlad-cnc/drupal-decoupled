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
        <select @click="CheckType" id="type-select" v-model="termVocabulary" >
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
        vocabularies: {},
        termName: '',
        termDescription: '',
        termVocabulary: 'Pick a vocabulary',
        jsonData: {
          data:{
            type: "",
            attributes: {
              name: "",
              description: ""
            }
          }
        },
      }
    },
    methods: {
      AddTerm() {
        axios.post(this.url,{

        }, {
          headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "Authorization": "Bearer " + this.$cookie.get('session_token'),
          }
        })
          .then(response => {
            this.vocabularies = response.data.data;

          });
      },

      CheckType() {
//        let type = $('.type-select option:selected').attr('data-type');
//        let type = getElementById('type-select')
        console.log(this);
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
