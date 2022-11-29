import { account, db, Query } from "../appwrite";
export default  function ({ store, redirect }) {
  // Authentication

 account.get().then((userPref) => {
    const id = userPref.$id

    // If the user is authenticated

    db.getDocument('dash1', 'user1', id)
      .then((data) => {
        const userData = {
          id: data.$id,
          email: data.Email,
          fullname: data.Username,
          type: data.UserType,
        }
        store.commit('auth/userInfo', userData)

      })
      console.log('test1')

  }).catch(()=>{
    redirect('/LoginPage')
    console.log('test 2')
  })
  
  
}