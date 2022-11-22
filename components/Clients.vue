<template>
    <div class="">
        <v-data-table :headers="headers" :items="orders" sort-by="calories" class="rounded-xl elevation-1">
            <template v-slot:top>
                <v-toolbar flat class="rounded-xl">
                    <v-toolbar-title>Orders</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2 rounded-xl" v-bind="attrs" v-on="on">
                                New Item
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="newOrder.Fullname" label="Full Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="newOrder.Address" label="Address"></v-text-field>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="newOrder.Wilaya" label="Wilaya"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="newOrder.PhoneNumber" label="Phone Number">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <div v-for="(DataDetail, index) in addfield" :key="(index)">
                                            <v-card outlined class="pa-2 my-2">
                                                <v-row>
                                                    <v-col>
                                                        <v-select v-model="DataDetail.Name" :items="itemDetails"
                                                            item-text="Name" item-value="$id" label="Select Items"
                                                            @change="getDetails(DataDetail.Name, detail = 'Colour', index)">
                                                        </v-select>
                                                    </v-col>
                                                    <v-col>
                                                        <v-select v-model="DataDetail.Colour" :items="ColourDetail"
                                                            item-text="Colour" item-value="Colour" label="Select Colour"
                                                            @change="getDetails(DataDetail.Colour, detail = 'Size', index)">
                                                        </v-select>
                                                    </v-col>
                                                    <v-col>
                                                        <v-select v-model="DataDetail.Size" :items="SizeDetail"
                                                            item-text="Size" item-value="$id" label="Select Size"
                                                            @change="getDetails(DataDetail.Size, index)">
                                                        </v-select>
                                                    </v-col>
                                                </v-row>

                                                <div class="d-flex">
                                                    <v-text-field v-model="DataDetail.Quantity" :items="Quantity"
                                                        item-text="Quantity" item-value="$id" disabled
                                                        :placeholder="Quantity">
                                                    </v-text-field>
                                                    <v-card-subtitle>
                                                        <v-chip class="" color="red" outlined @click="remove(index)"
                                                            v-show="index != 0"> Delete
                                                            X
                                                        </v-chip>
                                                    </v-card-subtitle>
                                                </div>
                                            </v-card>
                                        </div>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="newOrder.Shipping" label="Shiping">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="newOrder.Total" label="Total">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="blue darken-1" text @click="addMore()">
                                    Add Variation
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="AddNewClient()">
                                    Add Order
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteClient(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>
<script>
import { db, Query } from "../appwrite.js"
export default {
    data() {
        return {
            addfield: [{
                Item: '',
                Size: '',
                Colour: '',
                Quantity: '',
            }],
            newOrder: [],
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: '$id',
                },
                { text: 'Full Name', value: 'FullName' },
                { text: 'Wilaya', value: 'Wilaya' },
                { text: 'Phone Number', value: 'PhoneNumber' },
                { text: 'Total', value: 'Total' },
                { text: 'Status', value: 'Status' },

                { text: 'Actions', value: 'actions', sortable: false },
            ],
            orders: [],
            editedIndex: -1,
            editedItem: {
                id: '',
                FullName: 0,
                Wilaya: 0,
                PhoneNumber: 0,
                Total: 0,
                Status: 0
            },
            defaultItem: {
                id: '',
                FullName: 0,
                Wilaya: 0,
                PhoneNumber: 0,
                Total: 0,
                Status: 0
            },
            itemDetails: [],
            ColourDetail: [],
            SizeDetail: [],
            Quantity: 'Quantity : 0',
        }
    },
    methods: {
        // function to Create a new Order
        AddNewClient() {
            console.log(this.newOrder)
            /*  db.createDocument('dash1', 'orders', "unique()",
                  {
                      "FullName": this.data.Full_Name,
                      "Address": this.data.Address,
                      "Wilaya": this.data.Wilaya,
                      "PhoneNumber": this.data.Phone,
                      "Items": this.data.Items,
                      "Shiping": this.data.Shiping,
                      "Total": this.data.Total,
                      "Status": "Processing"
                  }).then((data) => {
                      //console.log(data)
                  }).catch((err) => { alert(err) })
              this.AddNew = false
              this.Done = true
              this.ShowClient = false
              this.ShowClient = true*/

        },
        addMore() {
            this.addfield.push({
                Item: '',
                Size: '',
                Colour: '',
            });
        },
        // function to remove variations 
        remove(index) {
            this.Orders.splice(index, 1);
        },
        getDetails(data, detail, index) {

            if (detail == 'Colour') {
                //     this.ColourDetail = []
                const id = data
                const i = index
                this.ColourDetail.filter((e) => (e.index === i)).forEach(element => {
                    this.ColourDetail.splice(element)
                });
                
                console.log( this.ColourDetail)
                db.listDocuments('dash1', 'ProductsDetail', [Query.equal('id_', [id])]).then((data) => {
                    const rzlt = data.documents
                    rzlt.forEach(data => {
                        const items = data

                        //this.ColourDetail.findIndex(e=> e.key = index, this.ColourDetail.push({key : index, ...items}))
                        // this.ColourDetail.findIndex(e=> e.key = index, this.ColourDetail.push({key : index, ...items}))
                        this.ColourDetail.push({index, ...items} )
                        //  this.ColourDetail.push({key : index, ...items})
                    })
                    // console.log(this.ColourDetail)
                })
            } else if (detail == 'Size') {
                console.log(data)
                const colour = data
                const id = data

                db.listDocuments('dash1', 'ProductsDetail', [Query.equal('Colour', [colour])]).then((data) => {

                    const rzlt = data.documents
                    this.SizeDetail.forEach(data => {
                        this.SizeDetail.splice(this.SizeDetail.findIndex(e => e.id_ = id))
                    })
                    //   this.SizeDetail = []
                    rzlt.forEach(data => {
                        //console.log('TT : ' + item)
                        const item = data
                        //  console.log(data)
                        this.SizeDetail.push(item)
                    })
                })
            } else {
                const id = data
                console.log(id)
                db.listDocuments('dash1', 'ProductsDetail', [Query.equal('$id', [id])]).then((data) => {
                    this.Quantity = 'Quantity : ' + data.documents[0].Quantity
                    console.log(this.Quantity)


                })
            }

        },
        getDetailsSize(Colour) {

        },
        // function to delete order
        deleteClient(data) {
            db.deleteDocument('dash1', 'orders', data.$id).then(() => {
                this.editedIndex = this.orders.indexOf(data)
                this.editedItem = Object.assign({}, data)
                this.dialogDelete = true
            })
            console.log(data.$id)

        },
        initialize() {
            db.listDocuments('dash1', 'orders').then((data) => {
                //  console.log(data)
                const rzlt = data.documents
                // rzlt.forEach(orders => {});
                this.orders = rzlt
                //    console.log(this.orders)
            }),
                db.listDocuments('dash1', 'ProductsName').then((data) => {
                    const prdcts = data.documents
                    prdcts.forEach(data => {
                        const items = data
                        this.itemDetails.push(items)


                    })
                    console.log(this.itemDetails)
                })
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.orders.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
    },
    beforeMount() {
        // function to get Documents of orders

    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },



}
</script>