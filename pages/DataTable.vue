<template>
    <div>
        <v-card
            class="d-xs-block d-sm-flex flex-wrap align-xs-content-center align-center justify-xs-center justify-sm-space-between rounded-xl"
            elevation="0">
            <v-col cols="6">
                <v-card-title>Data Table</v-card-title>
            </v-col>
            <v-col class=" d-flex justify-xs-center justify-sm-end " cols="6">

                <v-btn v-show="AddNew == false" @click="ShowIf()" class=" rounded-xl white--text blue" outlined>
                    Add
                    new
                    client</v-btn>
                <v-btn v-show="AddNew" @click="AddNewClient()" class="green white--text mx-2 rounded-xl " outlined>Add
                    Client</v-btn>
                <v-btn v-show="AddNew" @click="AddNew = !AddNew" class=" rounded-xl red white--text" outlined>
                    Close
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
            <v-card-subtitle class="d-md-flex d-sm-block ">
                <v-col sm="12" md="6">
                    <v-text-field class="text-caption" v-model="data.Full_Name" label="Full name">Full Name
                    </v-text-field>
                    <v-text-field class="text-caption" v-model="data.Address" label="Address">Address</v-text-field>
                    <v-text-field class="text-caption" v-model="data.Wilaya" label="Wilaya">Wilaya</v-text-field>
                    <v-text-field class="text-caption" v-model="data.Phone" label="Phone number">Phone number
                    </v-text-field>
                </v-col>
                <v-col sm="12" md="6">
                    <div v-for="(Order, index) in Orders" :key="(index)">
                        <div class="d-flex">
                            <v-select v-model="Order.Item" :items="ProductTitles" label="Select Items"
                                @change="getDetailsColour(Order.Item)">
                            </v-select>
                            <v-select v-model="Order.Colour" :items="detailsColour" label="Select Size"
                                @change="getDetailsSize(Order.Colour)">
                            </v-select>
                            <v-select v-model="Order.Size" :items="detailsSize" label="Select Size">
                            </v-select>
                        </div>
                        <div class="d-flex">
                            <v-text-field v-model="Order.Qnt" placeholder="Quantity"></v-text-field>
                            <v-chip class="mx-2 my-1" color="red" outlined @click="remove(index)" v-show="index != 0">
                                X
                            </v-chip>
                        </div>
                    </div>
                    <v-btn class="ml-2 rounded-xl white--text px-3 py-2 blue text-white" outlined elevation="0"
                        @click="addMore()">
                        Add Item
                    </v-btn>
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
import Clients from '../components/Clients.vue';
import { ID, account, db, Permission, Role } from "../appwrite.js";
export default {
    components: { Clients },
    name: 'DataTable',

    data() {
        return {
            AddNew: false,
            data: [],
            Done: false,
            ShowClient: true,
            ProductTitles: [],
            Products: [],
            Orders: [
                {
                    Item: '',
                    Colour: '',
                    Size: '',
                    Qnt: '',
                }
            ],
            allData: '',
            detailsColour: [],
            detailsSize: [],
            detailsStock: [],


        }
    },
    methods: {
        ShowIf() {
            this.AddNew = true
            this.Done = false
        },
        // function to Create a new Order
        AddNewClient() {
            db.createDocument('dash1', 'orders', "unique()",
                {
                    "FullName": this.data.Full_Name + "",
                    "Address": this.data.Address + "",
                    "Wilaya": this.data.Wilaya + "",
                    "PhoneNumber": this.data.Phone + "",
                    "Items": this.data.Items + "",
                    "Shiping": this.data.Shiping + "",
                    "Total": this.data.Total + "",
                    "Status": "Processing" + ""
                }).then((data) => {
                    //console.log(data)
                }).catch((err) => { alert(err) })
            this.AddNew = false
            this.Done = true
            this.ShowClient = false
            this.ShowClient = true

        },
        addMore() {
            this.Orders.push({

                name: '',
                _id: '',

            });
        },
        // function to remove variations 
        remove(index) {
            this.Orders.splice(index, 1);
        },
        async getDetailsColour(title) {
            await db.listDocuments('dash1', 'products').then((data) => {
                this.allData = data;
            })
            const data = this.allData
            const Itemtitle = title
            const rzlt = data.documents.map(item => ({ Title: item.Title, Colours: item.Colours })).filter(item => (item.Title == Itemtitle))
            console.log(rzlt)
            rzlt.forEach(item => {
                this.detailsColour.push(item.Colours)
            })
        },
        async getDetailsSize(Colour) {
            await db.listDocuments('dash1', 'products').then((data) => {
                this.allData = data;
            })
            const data = this.allData

            const Clr = Colour
            this.detailsSize = []
            const rzlt = data.documents.map(item => ({ Colours: item.Colours, Size: item.Size })).filter(item => (item.Colours == Clr))
            rzlt.forEach(item => {

                this.detailsSize.push(item.Size)
            })
        },
        /* async getDetailsStock(Size) {
             await db.listDocuments('dash1', 'products').then((data) => {
                 this.allData = data;
             })
             const data = this.allData
             const Itemtitle = title
             const rzlt = data.documents.map(item => ({Stock: item.Ref })).filter(item => (item.Size == Size))
             rzlt.forEach(item => {
                 this.detailsStock.push(item.Stock)
             })
         }*/

    },
    beforeMount() {
        // function to get Documents of Products from the database
        // still need some work 


        db.listDocuments('dash1', 'products').then((data) => {

            const prdcts = data.documents

            prdcts.forEach(item => {
                var product = item.Title
                //  this.Products.push(product)
                this.ProductTitles.push(product)
                this.Products.push(
                    {
                        title: item.Title,
                        colours: item.Colours,
                        size: item.Size,
                        price: item.Price,
                    }

                )

            })
            console.log(...this.Products)
            /*   for (let i = 0; i < prdcts.length; i++) {
                   this.Item.push( prdcts[i].Title)
                   this.size.push( prdcts[i].Size)
                   this.colour.push( prdcts[i].Colours)
                   this.Price.push( prdcts[i].Price)
                   console.log(prdcts);
               }*/


        })

    }

}
</script>