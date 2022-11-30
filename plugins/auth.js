import { account, db, Query } from "../appwrite";
export default function ({ store, redirect }) {
  // Authentication



  // function getUser() {
  new Promise(async function (resolve, reject) {
    const usr = account.get()


    console.log(usr)

    store.commit('auth/userInfo', { ...usr })
    const data = await db.getDocument('dash1', 'user1', usr.$id)
    const userData = {
      id: data.$id,
      email: data.Email,
      fullname: data.Username,
      type: data.UserType,
    }
    console.log(data)
    store.commit('auth/userInfo', { ...usr, ...userData })




  })
  //  }
  // const data = await getUser()
  // If the user is authenticated
  // console.log(data)
  /* const data = await db.getDocument('dash1', 'user1', res.$id)
   console.log(data)
   const userData = {
     id: data.$id,
     email: data.Email,
     fullname: data.Username,
     type: data.UserType,
   }
   store.commit('auth/userInfo', userData)
 
   console.log('test1') */


  /* .catch(() => {
    redirect('/LoginPage')
    console.log('test 2')
  }) */


}