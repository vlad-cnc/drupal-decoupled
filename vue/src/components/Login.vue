<template>
    <div class="login-wrapper">
      <h1>Hello {{userName}}</h1>
      <div class="login-container" v-bind:class="{ active : statusCheck }">
        <div class="login">
          <h4>Please Log In</h4>
          <input v-model="name" type="text" name="name" placeholder="Enter your username"/>
          <input v-model="pass" type="password" name="pass" placeholder="Enter your password"/><br/>
          <button @click="LogIn" type="submit">Log In</button>
        </div>

        <div class="logout">
          <h4>Log Out</h4>
          <button @click="LogOut" class="logout-btn">Log Out</button>
        </div>
      </div>
      <div class="response">
        <p>{{response}}</p><br/>
        <p>{{responseAuth}}</p><br/>
      </div>

      <div class="article-creation">
        <h3>Creat an article</h3>
        <label>Add a title:</label>
        <input type="text" name="title" v-model="articleData.data.attributes.title" />
        <br/>
        <label>Add a body:</label>
        <input type="text" name="body" v-model="articleData.data.attributes.body.value"/><br/>
        <p>{{responseArticle}}</p>
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
        userName: '',
        name: '',
        pass: '',
        url: 'http://localhost:8200/user/login?_format=json',
        articleUrl: 'http://localhost:8200/jsonapi/node/article?_format=json',
        url2: 'http://localhost:8200/oauth/token',
        urlLogout: 'http://example.com/user/logout?_format=json',
        response: '',
        responseAuth: '',
        csrfToken: '',
        logoutToken: '',
        accessToken: '',
        refreshToken: '',
        roles: '',
        statusCheck: true,
        responseArticle: '',
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

    methods:{

      LogIn(){

        //Prepare JSON data for RESTful
        let data = JSON.stringify({
          name: this.name,
          pass: this.pass
        });

        //Posts data to RESTful
        axios.post(this.url , data, {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
          .then(response => {
            this.response = response.data;
            this.csrfToken = response.data.csrf_token;
            this.logoutToken = response.data.logout_token;

            // Setting name in the cookies.
            let userName = response.data.current_user.name;
            let logoutToken = response.data.logout_token;
            let csrfToken = response.data.csrf_token;
            let userRoles = response.data.current_user.roles;
            this.$cookie.set('name', userName, 1);
            this.$cookie.set('logout_token', logoutToken, 1);
            this.$cookie.set('csrf_token', csrfToken, 1);
            this.$cookie.set('roles', userRoles, 1);
          });

        //Prepare form data for OAuth
        let authData = {
          grant_type: "password",
          client_id: "bf6b9790-064d-413e-8029-635c17170346",
          client_secret: "app",
          username: this.name,
          password: this.pass
        };

        let form_data = new FormData();

        for ( let key in authData ) {
          form_data.append(key, authData[key]);
        }

        //Post data to OAuth
        axios.post(this.url2 , form_data, {
          headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
          },
        },
        )
          .then(response => {
            this.accessToken= response.data.access_token;
            this.responseAuth = response.data;

            // Setting the cookie
            let accessToken = response.data.access_token;
            let refreshToken = response.data.refresh_token;
            this.$cookie.set('session_token', accessToken, 1);
            this.$cookie.set('refresh_token', refreshToken, 1);
          });
      },

      // Log out
      LogOut() {
        this.$cookie.delete('name');
        this.$cookie.delete('roles');
        this.$cookie.delete('csrf_token');
        this.$cookie.delete('session_token');
        this.$cookie.delete('refresh_token');
        this.$cookie.delete('logout_token');
        this.accessToken = '';
        this.refreshToken = '';
        this.userName = '';
        this.roles = '';
        this.csrfToken = '';
        this.logoutToken = '';

        axios.get(this.urlLogout, {
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then(response => {
            this.responseArticle = response.data;
          });

      },

      // Article creation
      CreateArticle(){
        let articleData = JSON.stringify(this.articleData);
        let authorization = "Bearer "+this.accessToken;

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
    },

    created: function () {

      // Cookie checker
      if (this.$cookie.get('session_token')) {
        this.statusCheck = true;
        this.accessToken = this.$cookie.get('session_token')
      }
      else {
        this.statusCheck = false;
      }

      if (this.$cookie.get('name')) {
        this.userName = this.$cookie.get('name')
      }
      else {
        this.userName = ''
      }

      if (this.$cookie.get('logout_token')) {
        this.logoutToken = this.$cookie.get('logout_token')
      }
      else {
        this.logoutToken = ''
      }

      if (this.$cookie.get('refresh_token')) {
        this.refreshToken = this.$cookie.get('refresh_token')
      }
      else {
        this.refreshToken = ''
      }

      if (this.$cookie.get('csrf_token')) {
        this.csrfToken = this.$cookie.get('csrf_token')
      }
      else {
        this.csrfToken = ''
      }

      if (this.$cookie.get('roles')) {
        this.roles = this.$cookie.get('roles')
      }
      else {
        this.roles = ''
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
    .logout {
      display: none;
    }
    &.active {
      .login {
        display: none;
      }
      .logout {
        display: block;
      }
    }
    button {
      margin: 10px 0;
    }
  }
</style>
