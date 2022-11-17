<template>
    <v-container>
        <v-card
            class="d-xs-block d-sm-flex flex-wrap align-xs-content-center align-center justify-xs-center justify-sm-space-between rounded-xl"
            elevation="0">
            <v-col cols="6">
                <v-card-title>Data Table</v-card-title>
            </v-col>
            <v-col class=" d-flex justify-xs-center justify-sm-end " cols="6">

                <v-btn v-show="AddNew == false" @click="ShowIf()" class=" rounded-xl white--text" color="blue">Add
                    new
                    client</v-btn>
                <v-btn v-show="AddNew" @click="AddNewClient()" class=" rounded-xl ">Add Client</v-btn>
                <v-btn v-show="AddNew" @click="AddNew = !AddNew" class=" rounded-xl white--text" color="red">Close
                </v-btn>

            </v-col>

        </v-card>
        <v-card v-show="AddNew" class="my-2 pa-2 rounded-xl " elevation="5" outlined>
            <v-card-title>
                Add New Client
            </v-card-title>
            <v-card-subtitle class="d-flex">

                <v-text-field class="text-caption" label="Full name">Full Name</v-text-field>
                <v-text-field class="text-caption" label="Address">Address</v-text-field>
                <div v-for="(field, counter) in fields" :key="counter" class="d-flex algin-center text-centre">
                    <v-chip class="mx-2 my-1" color="red" outlined @click="deleteField(counter)">x</v-chip>
                </div>


            </v-card-subtitle>

        </v-card>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            fields: [
                {
                    grad: '',
                    spiciality: ''
                }
            ],
            counter: []
        }
    },
    methods: {
        addField() {
            this.fields.push({
                grad: '',
                spiciality:''
      })
        },
        deleteField(counter) {
            this.fields.splice(counter, 1)
        },
    },
}
</script>