import { account, db, Query } from "../appwrite";
export default async function ({ store, redirect }) {
  // Authentication
    if (store.state.auth.user === 'null') {
        return redirect('/LoginPage')
      }

}