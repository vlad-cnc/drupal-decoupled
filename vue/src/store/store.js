import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    sessionData: {
      userName: '',
      csrfToken: '',
      logoutToken: '',
      accessToken: '',
      refreshToken: '',
      roles: '',
      statusCheck: '',
    },
  },


  mutations: {
    setSessionData(newSessionData, payload) {

      this.state.sessionData = payload;
    }
  },

});
