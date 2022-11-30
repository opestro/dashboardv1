
import { account, db, Query } from "../appwrite";
export default async function ({ store, redirect, }) {
  // Authentication
 
    const isLogin = store.state.auth.user
    console.log(isLogin)
  

    if (!isLogin) {
      console.log('is not logged in')
      return redirect('/LoginPage')
    } else {
      console.log('is logged in')
    }
    
    
    

}