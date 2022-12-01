import { account, db, Query } from "../appwrite";
export default function ({ store, redirect }) {
  // Authentication



  new Promise(async function (resolve, reject) {

    const userData = account.get()
    store.dispatch('onAuthStateChangedAction', {...userData})

  })




}