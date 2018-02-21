<template>
    <div class="login-wrapper">
      <div class="login-container">
        <h4>Please log in</h4>
        <input v-model="name" type="text" name="name" placeholder="Enter your username"/>
        <input v-model="pass" type="password" name="pass" placeholder="Enter your password"/><br/>
        <button v-on:click="LogIn" type="submit">Log In</button>
      </div>
      <div class="response">
        <p>{{response}}</p>
      </div>
      <button v-on:click="CreateArticle">Create Article</button>
    </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "login",
    data(){
      return {
        name: '',
        pass: '',
        url: 'http://localhost:8200/user/login?_format=json',
        url2: 'http://localhost:8200/jsonapi/node/article?_format=json',
        response: '',
        csrfToken: '',
        logoutToken: '',

        articleBody: {
          "data": {
            "type": "node--article",
            "attributes": {
              "title": "My custom title",
              "body": {
                "value": "Custom value",
                "format": "plain_text"
              }
            }
          }
        }
      }
    },
    methods:{
      LogIn(){
        console.log('login clicked');
        let data = JSON.stringify({
          name: this.name,
          pass: this.pass
        });

        axios.post(this.url , data, {
          credentials: "same-origin",
            headers: {
              'Content-Type': 'application/json',
            },
          },

        )
          .then(response => {
            this.response = response.data;
            this.csrfToken = response.data.csrf_token;
            this.logoutToken = response.data.logout_token;
          });
      },
      CreateArticle(){
        let atr = JSON.stringify(
          this.articleBody
        );
        let config = {
            headers: {
              "X-CSRF-Token": this.csrfToken,
              "Authorization": "basic",
              "Content-Type": "application/vnd.api+json",
              "Accept": "application/vnd.api+json"
            }
          };
        console.log(atr);
        console.log(config);
        axios.post(this.url2, {
          "data": {
            "type": "node--article",
            "attributes": {
              "title": "My custom tiSSSSStle",
              "body": {
                "value": "Custom vaZZZZlue",
                "format": "plain_text"
              }
            }
          }
        }, config)
          .then(response => {
            this.response = response.data;
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-container {
    box-sizing: border-box;
    padding: 10px;
    max-width: 500px;
    text-align: center;
    margin: auto;
    background: {
      color: rgba(0, 250, 250, 0.11);
    };
    button {
      margin: 10px 0;
    }
  }
</style>
