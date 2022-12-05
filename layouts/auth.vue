<template>
    <v-app>
      <v-main>
        <v-container>
            <div class="">
              <Nuxt />
            </div>
        </v-container>
      </v-main>
    </v-app>
</template>
<script>

export default {
    middleware: 'guest'
}
</script>
