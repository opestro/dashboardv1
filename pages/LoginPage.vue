<template>
    <div>
        <v-card class="pa-5 ma-5 rounded-xl">
            <div class="px-10">
                <v-card-title>Login</v-card-title>
                <v-text-field v-model="email" placeholder="Email">Email</v-text-field>
                <v-text-field v-model="pass" placeholder="Passord">Password</v-text-field>
               

            </div>
            <div class="d-flex justify-end ">
                <v-btn @click="Login()" class="rounded-xl blue white--text">Login</v-btn>
            </div>

        </v-card>
    </div>

</template>
<script>

import {account} from "../appwrite";
export default {
    data() {
        return {
            email:'',
            pass:''
        }
    },
    methods : {
        Login() {
            account.createEmailSession(this.email , this.pass)
            .then((data)=>{console.log('Done' + data)})
            .catch((err)=> {alert(err)})
    }
    }
}
</script>