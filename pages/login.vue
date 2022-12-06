<template>
    <div class="auth-wrapper auth-v1">
      <div class="auth-inner">
  
          <v-card class="auth-card mx-auto my-auto" style="max-width:400px;">
            <!-- logo -->
            <v-card-title class="d-flex align-center justify-center py-7">
              <!-- <nuxt-link to="/" class="d-flex align-center"> -->
                <!-- <v-img :src="require('@/static/favicon.ico')" max-height="30px" max-width="30px" alt="logo" contain
                  class="me-3 "></v-img> -->
  
                <h2 class="">
                  <span style="color:#ffc221;"> La </span> formidable
                </h2>
              <!-- </nuxt-link> -->
            </v-card-title>
  
            <!-- title -->
            <v-card-text>
              <p class="text-2xl font-weight-semibold text--primary mb-2">
                   Welcome to La formidable ! 👋🏻
              </p>
              <p class="mb-2">
                please login
              </p>
            </v-card-text>
  
            <!-- login form -->
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="email" outlined label=" E-mail" placeholder="ex@example.com"
                  hide-details class="mb-3"></v-text-field>
  
                <v-text-field v-model="password" outlined :type="isPasswordVisible ? 'text' : 'password'"
                  label="Password" placeholder="············"
                  :append-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'" hide-details
                  @click:append="isPasswordVisible = !isPasswordVisible"></v-text-field>
  
                <div class="d-flex align-center justify-space-between flex-wrap">
                  <v-checkbox v-model="remember" label="remember me" hide-details class="me-3 mt-1">
                  </v-checkbox>
  
                  <!-- forgot link -->
                  <nuxt-link to="/forget-password" class="mt-1">
                    Forget password?
                  </nuxt-link>
                </div>
  
                <v-btn block color="primary" class="mt-6" style="max-width:80px;" @click="login">
                   Login
                </v-btn>
              </v-form>
            </v-card-text>


          </v-card>
      </div>
  
      <!-- tree -->
      <!-- <v-img class="auth-tree" width="247" height="185" :src="require('@/assets/images/misc/tree.png')"></v-img> -->
  
      <!-- tree  -->
      <!-- <v-img class="auth-tree-3" width="377" height="289" :src="require('@/assets/images/misc/tree-3.png')"></v-img> -->
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarText }}
  
        <template #action="{ attrs }">
          <v-btn color="" text v-bind="attrs" @click="snackbar = false">
            close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
<script>

import { account, db, Query } from "../appwrite.js";
export default {
    layout: "auth",
    data() {
        return {
            email: '',
            password: '',
            snackbar:false,
            remember:true,
            isPasswordVisible:false,
            snackbarText:'',
            snackbarColor:'success'
        }
    },
    methods: {
        // function to Login and get session
        login() {
            account.createEmailSession(this.email, this.password)
                .then((session) => {
                   db.getDocument('delivered', 'users', session.userId)
                        .then((data) => {
                           // setPersistence({email:this.email, password:this.password }, this.remember ? browserLocalPersistence : browserSessionPersistence)
                            const userData = {
                                email: data.email,
                                username: data.username,
                                role: data.role,
                            }

                            this.$store.commit('auth/SET_UserInfo', userData)
                            this.$router.push('/')

                        })
                        .catch((err) => { 
                            this.snackbar = true
                            this.snackbarText = err
                            this.snackbarColor = 'error'

                         })
                }).catch((err) => { 
                            this.snackbar = true
                            this.snackbarText = err
                            this.snackbarColor = 'error'
                         })
        }
    },
   
}
</script>