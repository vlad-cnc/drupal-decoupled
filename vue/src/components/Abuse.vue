<template>
  <div class="article-preview-wrapper">
    <div class="article-preview" v-for="article in responseArticle">
      <div>
        <div class="article-image">
          <img :src="findImage(article.field_image)"/>
          <img :src="api+article.field_image"/>
          <!--{{article.field_image}}-->
        </div>
        <h3 class="article-title">{{article.Test}}</h3>
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

      findImage(imageLink) {

        let string = imageLink.substring(imageLink.lastIndexOf("src=\"/")+5,imageLink.lastIndexOf("jpg")+3);

        return this.api+string;
      },
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
      background: #83bfd6;
      width: 100%;
      height: 200px;
      max-width: 200px;
      margin: 0 10px;
      img {
        max-width: 150px;
        height: auto;
      }
    }
  }
</style>
