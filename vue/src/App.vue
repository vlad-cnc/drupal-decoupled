<template>
  <div id="app">

    <header>
      <h1>Decoupled Drupal 8 with Vue.js</h1>
    </header>
    <main>
      <div class="content">
        <login/>
      </div>
      <taxonomy/>
    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  import Login from "./components/Login";
  import Taxonomy from "./components/Taxonomy";
  import Vue from 'Vue'

  export default {
    components: {
      Taxonomy,
      Login},
    data () {
      return {

      }
    },

    created() {
    },

    methods: {

    }
  }


</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  button {
    cursor: pointer;
  }
</style>
