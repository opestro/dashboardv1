<template>
    <div>
        <v-card class="pa-5 ma-5 rounded-xl">
            <div class="px-10">
                <v-card-title>Login</v-card-title>
                <v-text-field v-model="email" type="email" placeholder="Email">Email</v-text-field>
                <v-text-field v-model="pass" type="password" placeholder="Passord">Password</v-text-field>


            </div>
            <div class="d-flex justify-end ">
                <v-btn @click="Login()" class="rounded-xl blue white--text">Login</v-btn>
            </div>

        </v-card>
    </div>

</template>
<script>

import { account, db, Query } from "../appwrite";
export default {
    data() {
        return {
            email: '',
            pass: ''
        }
    },
    methods: {
        // function to Login and get session
        Login() {
            account.createEmailSession(this.email, this.pass)
                .then((session) => {
                    const id = session.userId
                    db.listDocuments('dash1', 'user1', [Query.equal('id_', [id])])
                        .then((data) => {

                            const userData = {
                                id: data.documents[0].id_,
                                email: data.documents[0].Email,
                                fullname: data.documents[0].Username,
                                type: data.documents[0].UserType,
                            }
                            // console.log(userInfo) 
                            this.$store.commit('auth/userInfo', userData)
                            const test = this.$store.state.auth.user
                            console.log(test)

                        })
                        .catch((err) => { alert(err) })
                })
        }
    }
}
</script>