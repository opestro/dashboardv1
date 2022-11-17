<template>
  <v-app  >
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app
      class="rounded-br-xl ">
      <v-card class="ma-2 rounded-xl">
        <v-row class="ma-1">
          <v-col cols="8" class="py-3">
            <div class="text-caption">Welcome Back</div>
            <div class="text-h6">Mahdi H.</div>
          </v-col>
          <v-col cols="4" class="py-3">
            <v-card max-height="50" max-width="50" class="rounded-circle">

              <v-card-subtitle class="red  white--text">58</v-card-subtitle>
            </v-card>


          </v-col>
        </v-row>
      </v-card>


      <v-list class="rounded-xl ">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="rounded-br-xl  ">
     
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
     
        <v-icon @click="darkMode">mdi-brightness-4 LOl</v-icon>
      


    </v-app-bar>
    <v-main >
      <v-container>
        <Nuxt />

      </v-container>

    </v-main>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>


  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-account-group',
          title: 'Data Table',
          to: '/DataTable'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Manage Products',
          to: '/AddProducts'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Add User',
          to: '/AddUser'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Login Page',
          to: '/LoginPage'

        }
      ],
      title: 'Dashboard heazlly',
      
    }
  },
  methods: {
    darkMode() {
   this.$vuetify.theme.dark=!this.$vuetify.theme.dark;
   localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
}
  },
  mounted() {
  const theme = localStorage.getItem("useDarkTheme");
      if (theme) {
        if (theme == "true") {
          this.$vuetify.theme.dark = true;
        } else this.$vuetify.theme.dark = false;
      }
}
  
}
</script>
