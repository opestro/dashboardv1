import { account, db, Query } from "../appwrite.js"

export const state = () => ({
    user: null
})

export const mutations = {
    SET_UserInfo(state, data) {
        state.user = data
    }

}
export const getters = {

}
export const actions = {

    async onAuthStateChangedAction(state, authUser) {
      

            if (!authUser || !authUser.$id) {
              state.commit('SET_UserInfo', null)
              // this.$router.push({
              //   path: '/login',
              // })
            } else {
                const data = await db.getDocument('delivered', 'users', authUser.$id)
                const dataDoc = {
                  email: data.email,
                  username: data.username,
                  role: data.role,
                }
                state.commit('SET_UserInfo', { ...authUser, ...dataDoc })
      
                // if(this.$router.currentRoute.path == '/login'){ 
                //   this.$router.push({
                //     path: '/orders',
                //   })
                // }
              
            }
        },
    
        
}