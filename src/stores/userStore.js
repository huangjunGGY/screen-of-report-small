import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {
      userName: '',
      code: ''
    }
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserInfo(info) {
      this.userInfo = { ...this.userInfo, ...info };
    },
    clearUser() {
      this.token = '';
      this.userInfo = { userName: '', code: '' };
    }
  }
});
