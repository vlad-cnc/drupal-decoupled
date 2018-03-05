<template>
  <div class="article-creation">
    <h3>Create an article</h3>
    <label>Add a title:</label>
    <input type="text" name="title" v-model="articleData.data.attributes.title" />
    <br/>
    <label>Add a body:</label>
    <input type="text" name="body" v-model="articleData.data.attributes.body.value"/><br/>
    <button v-on:click="CreateArticle">Create Article</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "article-creation",
    data() {
      return {
        articleUrl: 'http://localhost:8200/jsonapi/node/article?_format=json',
        articleData: {
          data: {
            type: 'node--article',
            attributes: {
              title: '',
              body: {
                value: '',
                format: 'plain_text'
              },
            }
          }
        },
      }
    },
    methods: {
      // Article creation
      CreateArticle(){
        // Convert object to JSON
        let articleData = JSON.stringify(this.articleData);

        // Get the access token from the cookie
        let authorization = "Bearer "+ this.$cookie.get('session_token');

        // Use axios to make a post request
        axios.post(this.articleUrl, articleData, {
          headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "Authorization": authorization
          }
        })
          .then(response => {
            this.responseArticle = response.data;
          });
      }
    }
  }
</script>

<style scoped>

</style>
