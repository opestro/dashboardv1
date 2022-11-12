<template>
    <v-container>
        <v-card class="d-flex justify-space-between ">
            <v-card-title>Data Table</v-card-title>
            <v-btn @click="overlay = !overlay" class="my-5 px-5 mx-4">Add new client</v-btn>
        </v-card>
        <v-overlay :value="overlay">
            <v-row align="center" justify="center" >
                <v-card class=""  max-width="600">
                    <AddClient></AddClient>
                    <v-btn class="mx-4 my-2"  @click="overlay = !overlay"> Add New </v-btn>
                    <v-btn class="mx-4 my-2 "  @click="overlay = !overlay"> Close </v-btn>
                </v-card>
            </v-row>
        </v-overlay>
        <v-spacer></v-spacer>
        <v-card class="mt-5">
            <v-data-table dense :headers="headers" :items="desserts" item-key="name" class="elevation-1"></v-data-table>
        </v-card>
    </v-container>
</template>
<script>
import AddClient from '../components/AddClient.vue'
export default {
    components: { AddClient },
    name: 'DataTable',
    data() {
        return {
            overlay: false,
          
        }
    },

}
</script>