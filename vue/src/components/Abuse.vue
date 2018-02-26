<template>

</template>

<script>
  import axios from 'axios';

  export default {
    name: "abuse",
    data () {
      return {
        url: 'http://localhost:8200/abuse',
        articleTitle: '',

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
    }
  }
</script>

<style scoped>

</style>
