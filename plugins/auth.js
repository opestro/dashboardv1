import { account, db, Query } from "../appwrite.js";
export default function ({ store, redirect }) {
  // Authentication
  store.commit('auth/SET_UserInfo', localStorage.getItem('cookieFallback'))
  account.get().then(userData => { 
    store.dispatch('auth/onAuthStateChangedAction', {...userData})
    }).catch(err => {
      store.commit('auth/SET_UserInfo', null)
    })


}