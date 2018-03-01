<template>
    <div class="login-wrapper">
      <h1>Hello {{sessionData.userName}}</h1>
      <div class="login-container" v-bind:class="{ active : statusCheck }">
        <div class="login">
          <h4 @click="LogIn">Please Log In</h4>
          <input v-model="name" type="text" name="name" placeholder="Enter your username"/>
          <input v-model="pass" type="password" name="pass" placeholder="Enter your password"/><br/>
          <button @click="LogIn" type="submit">Log In</button>
        </div>

        <div class="logout">
          <h4>Log Out</h4>
          <button @click="LogOut" class="logout-btn">Log Out</button>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import {mapMutations} from  'vuex';

  export default {
    name: "login",
    data(){
      return {
        sessionData: {
          userName: '',
          csrfToken: '',
          logoutToken: '',
          accessToken: '',
          refreshToken: '',
          roles: '',
        },
        name: '',
        pass: '',
        url: 'http://localhost:8200/user/login?_format=json',
        url2: 'http://localhost:8200/oauth/token',
        // urlLogout: 'http://example.com/user/logout?_format=json',
        statusCheck: true,
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
            // Set session data
            this.sessionData.csrfToken = response.data.csrf_token;
            this.sessionData.logoutToken = response.data.logout_token;
            this.sessionData.userName = response.data.current_user.name;
            this.sessionData.roles = response.data.current_user.roles;

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
            // Set session data
            this.sessionData.accessToken= response.data.access_token;
            this.sessionData.refreshToken= response.data.refresh_token;

            // Setting the cookie
            let accessToken = response.data.access_token;
            let refreshToken = response.data.refresh_token;
            this.$cookie.set('session_token', accessToken, 1);
            this.$cookie.set('refresh_token', refreshToken, 1);
          });

      },

      ...mapMutations([
        'setSessionData',
      ]),

      // Log out
      LogOut() {
        this.$cookie.delete('name');
        this.$cookie.delete('roles');
        this.$cookie.delete('csrf_token');
        this.$cookie.delete('session_token');
        this.$cookie.delete('refresh_token');
        this.$cookie.delete('logout_token');
        this.sessionData.accessToken = '';
        this.sessionData.refreshToken = '';
        this.sessionData.userName = '';
        this.sessionData.roles = '';
        this.sessionData.csrfToken = '';
        this.sessionData.logoutToken = '';

        // axios.get(this.urlLogout, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   }
        // })
        //   .then(response => {
        //     this.responseArticle = response.data;
        //   });
      },
    },

    created: function () {
      let sessionData = {};
      this.sessionData = sessionData;

      // Cookie checker
      if (this.$cookie.get('session_token')) {

        // Login Status
        this.statusCheck = true;

        // Access Token
        this.sessionData.accessToken = this.$cookie.get('session_token');
        sessionData.session_token = this.sessionData.accessToken;

        // User Name
        this.sessionData.userName = this.$cookie.get('name');
        sessionData.userName = this.sessionData.userName;

        // Logout Token
        this.sessionData.logoutToken = this.$cookie.get('logout_token');
        sessionData.logoutToken = this.sessionData.logoutToken;

        // Refresh Token
        this.sessionData.refreshToken = this.$cookie.get('refresh_token');
        sessionData.refreshToken = this.sessionData.refreshToken;

        // CSRF Token
        this.sessionData.csrfToken = this.$cookie.get('csrf_token');
        sessionData.csrfToken = this.sessionData.csrfToken;

        // User Roles
        this.sessionData.roles = this.$cookie.get('roles');
        sessionData.roles = this.sessionData.roles;

        // Pass the cookie data to state
        this.setSessionData(sessionData)

      }
      else {
        this.statusCheck = false;
      }
    },
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
