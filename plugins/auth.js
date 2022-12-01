import { account, db, Query } from "../appwrite";
export default function ({ store, redirect }) {
  // Authentication



  new Promise(async function (resolve, reject) {

    const userData = await account.get()
    store.dispatch('auth/onAuthStateChangedAction', {...userData})

  })




}