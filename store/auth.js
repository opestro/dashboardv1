import { account, db, Query } from "../appwrite"

export const state = () => ({
    User: null
})

export const mutations = {
    SET_UserInfo(state, data) {
        state.User = data
    }

}
export const getters = {

}
export const actions = {


    async onAuthStateChangedAction(state, { authUser }) {
        
        if (!authUser || !authUser.$id) {
          state.commit('SET_UserInfo', null)
          
          this.$router.push({
            path: '/login',
          })
        } else {
            const data = await db.getDocument('dash1', 'user1', authUser.$id)
            const dataDoc = {
              id: data.$id,
              email: data.Email,
              fullname: data.Username,
              type: data.UserType,
            }
            state.commit('SET_UserInfo', { ...authUser, ...dataDoc })

            this.$router.push({
                path: '/dashboard',
             })
          
        }
      },



}
