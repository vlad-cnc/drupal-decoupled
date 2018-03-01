<template>
  <div class="article-preview-wrapper">
    <div class="article-preview" v-for="article in responseArticle">
      <div>
        <div class="article-image">
          <img :src="api+article.field_image"/>
        </div>
        <h3 class="article-title">{{article.Test}}</h3>
        <div v-html="article.body" class="article-body">
          {{article.body}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "abuse",

    data () {
      return {
        api: 'http://localhost:8200',
        url: 'http://localhost:8200/abuse',
        articleTitle: '',
        responseArticle: {},
        responseImage: {},
      }
    },

    created: function () {
      axios.get(this.url, {
        headers: {
          "Accept": "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json"
        }
      })
        .then(response => {
          this.responseArticle = response.data;

        });
    },

    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .article-preview-wrapper {
    margin: {
      top: 20px;
    };
    display: flex;
    flex-direction: row;
    .article-preview {
      padding: 5px;
      box-sizing: border-box;
      background: #83bfd6;
      width: 100%;
      /*height: 200px;*/
      max-width: 200px;
      margin: 0 10px;
      img {
        max-width: 150px;
        height: auto;
      }
    }
  }
</style>
