<template>
    <div>
        <v-card class="d-xs-block d-sm-flex flex-wrap align-xs-content-center align-center justify-xs-center justify-sm-space-between rounded-xl"  elevation="0" >
            <v-col cols="6" >
                <v-card-title>Data Table</v-card-title>
            </v-col>
            <v-col class=" d-flex justify-xs-center justify-sm-end " cols="6" >
                
                    <v-btn v-show="AddNew == false" @click="ShowIf()" class=" rounded-xl white--text" color="blue">Add
                        new
                        client</v-btn>
                    <v-btn v-show="AddNew" @click="AddNewClient()" class=" rounded-xl ">Add Client</v-btn>
                    <v-btn v-show="AddNew" @click="AddNew = !AddNew" class=" rounded-xl white--text" color="red">Close
                    </v-btn>
              

            </v-col>




        </v-card>
        <v-card class="my-2 green d-flex justify-center rounded-xl white--text" elevation="5" v-if="Done">
            <v-card-title class="">
                Your client has been added
            </v-card-title>
        </v-card>
        <v-card v-show="AddNew" class="my-2 pa-2 rounded-xl " elevation="5" outlined>
            <v-card-title>
                Add New Client
            </v-card-title>
            <v-card-subtitle class="d-flex">
                <v-col cols="6">
                    <v-text-field class="text-caption" v-model="data.Full_Name" label="Full name">Full Name
                    </v-text-field>
                    <v-text-field class="text-caption" v-model="data.Address" label="Address">Address</v-text-field>
                    <v-text-field class="text-caption" v-model="data.Wilaya" label="Wilaya">Wilaya</v-text-field>
                    <v-text-field class="text-caption" v-model="data.Phone" label="Phone number">Phone number
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field class="text-caption" v-model="data.Items" label="Items">Items</v-text-field>
                    <v-text-field class="text-caption" v-model="data.Shiping" label="Shiping">Shiping</v-text-field>
                    <v-text-field class="text-caption" v-model="data.Total" label="Total">Total</v-text-field>
                </v-col>

            </v-card-subtitle>

        </v-card>
        <v-spacer class="py-2"></v-spacer>
        <v-card class="rounded-xl" elevation="5">
            <clients v-if="ShowClient"></clients>
        </v-card>
    </div>
</template>
<script>
import Clients from '../components/Clients.vue'
export default {
    components: { Clients },
    name: 'DataTable',
    data() {
        return {
            AddNew: false,
            data: [],
            Done: false,
            ShowClient: true,

        }
    },
    methods: {
        ShowIf() {
            this.AddNew = true
            this.Done = false
        },
        AddNewClient() {
            this.$axios.post('http://localhost:3001/clients',
                {
                    "UserID": "225",
                    "FullName": this.data.Full_Name + "",
                    "Address": this.data.Address + "",
                    "Wilaya": this.data.Wilaya + "",
                    "PhoneNumber": this.data.Phone + "",
                    "Items": this.data.Items + "",
                    "Shiping": this.data.Shiping + "",
                    "Total": this.data.Total + "",
                    "Status": "Processing" + ""
                })
            this.AddNew = false
            this.Done = true
            this.ShowClient = false
            this.ShowClient = true

        },

    },

}
</script>