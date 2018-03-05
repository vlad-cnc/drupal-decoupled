<template>
  <div id="app">

    <header>
      <h1>Decoupled Drupal 8 with Vue.js</h1>
      <ul class="menu">
        <li><router-link :to="{ path: '/' }">Log In</router-link></li>
        <li><router-link :to="{ path: '/taxonomy' }">Taxonomy</router-link></li>
        <li><router-link :to="{ path: '/abuse' }">Abuse</router-link></li>
        <li><router-link :to="{ path: '/article' }">Create Article</router-link></li>
      </ul>
    </header>
    <main>
      <div class="content">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  import Login from "./components/Login";
  import Taxonomy from "./components/Taxonomy";
  import ArticleCreation from "./components/ArticleCreation"
  import Vue from 'Vue'
  import Vuex from 'vuex'
  Vue.use(Vuex);

  export default {
    components: {
      Taxonomy,
      Login,
      ArticleCreation
    },
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
  max-width: 100%;
}
  button {
    cursor: pointer;
  }
  .menu {
    display: flex;
    padding: 0;
    max-width: 500px;
    margin: auto;
    li {
      text-align: center;
      list-style: none;
      width: 120px;
      height: 40px;
      margin: {
        right: 10px;
      };
      a {
        border: {
          radius: 10px;
        };
        line-height: 40px;
        background: {
          color: #9cb0fc;
        };
        display: block;
        color: white;
        font: {
          weight: 800;
        };
        text-decoration: none;

        &:hover,
        &.router-link-exact-active {
          background: {
            color: #6879ad;
          };
        }
      }
    }
  }
</style>
