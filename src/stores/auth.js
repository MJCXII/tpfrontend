import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isCookieSet: false,
        expiresIn: null
    }), 
  actions: {
    async logIn(accessToken, refreshToken, expiresIn, isCookieSet) {
    if (accessToken && refreshToken && expiresIn) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.isAuthenticated = true;
        this.isCookieSet = isCookieSet;
        this.expiresIn = expiresIn;
        return true;
    } else {
        return false;
    }

    },
    async logOut() {
        this.accessToken = null;
        this.refreshToken = null;
        this.isAuthenticated = false;
        this.isCookieSet = false;
        this.expiresIn = null;
    }
  },
  persist: true
}

);
