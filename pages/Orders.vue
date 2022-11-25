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
                                            <v-text-field v-model="addfield.Fullname" label="Full Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="addfield.Address" label="Address"></v-text-field>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="addfield.Wilaya" label="Wilaya"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="addfield.PhoneNumber" label="Phone Number">
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
                                                            @change="getDetails(DataDetail.Name, 'Colour', index)">
                                                        </v-select>
                                                    </v-col>
                                                    <v-col>
                                                        <v-select v-model="DataDetail.Colour"
                                                            :items="ColourDetail[index]" item-text="Colour"
                                                            item-value="Colour" label="Select Colour"
                                                            @change="getDetails(DataDetail.Colour, detail = 'Size', index)">
                                                        </v-select>
                                                    </v-col>
                                                    <v-col>
                                                        <v-select v-model="DataDetail.Size" :items="SizeDetail[index]"
                                                            item-text="Size" item-value="Size" label="Select Size"
                                                            @change="getDetails(DataDetail.Size, '', index)">
                                                        </v-select>
                                                    </v-col>
                                                </v-row>

                                                <div class="d-flex">
                                                    <v-card-text>Quantity :
                                                    </v-card-text>
                                                    <v-card-subtitle v-model="addfield.Quantity"
                                                        v-for="qntt in Quantity[index]" :key="qntt">{{ qntt.Quantity }}
                                                    </v-card-subtitle>

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
                                            <v-text-field v-model="addfield.Shipping" label="Shiping">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="addfield.Total" label="Total">
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

                    <!--==View order content==-->
                    <v-dialog v-model="dialogEdit" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">View Order</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="ordersDetail.FullName" label="Full Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="ordersDetail.Address" label="Address"></v-text-field>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="ordersDetail.Wilaya" label="Wilaya"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="ordersDetail.PhoneNumber" label="Phone Number">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                          <div v-for="DataDetail in ordersDetail.Details" :key="DataDetail">
                                            <v-card outlined class="pa-2 my-2">
                                                <v-row>
                                                    <v-col>
                                                        <v-text-field v-model="DataDetail.Item" >
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col>
                                                        <v-text-field v-model="DataDetail.Colour" >
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col>
                                                        <v-text-field v-model="DataDetail.Size" >
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>

                                                <div class="d-flex">
                                                    <v-card-text>Quantity :
                                                    </v-card-text>
                                                    <v-text-field v-model="DataDetail.Quantity"></v-text-field>

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
                                            <v-text-field v-model="ordersDetail.Shiping" label="Shiping">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="ordersDetail.Total" label="Total">
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

                    <!--==ddddddddddddddddddddd==-->
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
            dialogEdit: false,
            addfield: [{
                Item: '',
                Size: '',
                Colour: '',
                Quantity: '',
                id: '',
                Name: '',
                Wilaya: '',
                PhoneNumber: 0,
                Total: 0,
                Shipping: '',
                Status: 0
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
            Quantity: [{ 0: { Quantity: 0 } }],
            changedData: '',
            ordersDetail: [{
                Details: []
            }],
        }
    },
    methods: {
        // function to Create a new Order
        AddNewClient() {
            console.log(this.addfield)
            db.createDocument('dash1', 'orders', "unique()",
                {
                    "FullName": this.addfield.Fullname,
                    "Address": this.addfield.Address,
                    "Wilaya": this.addfield.Wilaya,
                    "PhoneNumber": this.addfield.PhoneNumber,
                    "Shiping": this.addfield.Shipping,
                    "Total": this.addfield.Total,
                    "Status": "Processing"
                }).then((id) => {
                    console.log(id)
                    const id_ = id.$id
                    this.addfield.forEach(element => {
                        const name = element.Name
                        const colour = element.Colour
                        const size = element.Size
                        console.log(name)
                        db.listDocuments('dash1', 'ProductsName', [Query.equal('$id', [name])])
                            .then((data) => {
                                const detail = data.documents[0].Name
                                //  console.log(detail)
                                db.createDocument('dash1', 'ordersDetail', "unique()",
                                    {
                                        "id_": id_,
                                        "Colour": colour,
                                        "Size": size,
                                        "Item": detail,
                                    })

                            })
                    })
                }).catch((err) => { alert(err) })
            this.AddNew = false
            this.Done = true
            this.ShowClient = false
            this.ShowClient = true

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
                this.ColourDetail[index] = []
                //     this.ColourDetail = []
                const id = data
                const i = index
                //   this.ColourDetail[index] = this.ColourDetail[index] || [];
                //    var ColourDetail = this.ColourDetail[index];
                //   console.log(this.ColourDetail)
                db.listDocuments('dash1', 'ProductsDetail', [Query.equal('id_', [id])]).then((data) => {
                    const rzlt = data.documents
                    this.ColourDetail[index] = [...rzlt];
                    this.ColourDetail = [...this.ColourDetail];
                })
            } else if (detail == 'Size') {
                this.SizeDetail[index] = []
                const colour = data
                const id = data
                this.changedData = data
                db.listDocuments('dash1', 'ProductsDetail', [Query.equal('Colour', [colour])]).then((data) => {
                    const rzlt = data.documents
                    this.SizeDetail[index] = [...rzlt];
                    this.SizeDetail = [...this.SizeDetail];


                })
            } else {
                const Size = data
                // console.log(id)

                this.Quantity[index] = []
                db.listDocuments('dash1', 'ProductsDetail', [Query.equal('Colour', [this.changedData]), Query.equal('Size', [Size])]).then((data) => {
                    const rzlt = data.documents
                    //this.Quantity = rzlt
                    this.Quantity[index] = [...rzlt];
                    this.Quantity = [...this.Quantity];
                    console.log(this.Quantity)
                    //8     console.log(this.Quantity)


                })
            }

        },
        // function to delete order
        deleteClient(data) {
            const idd = data
            db.listDocuments('dash1', 'ordersDetail', [
                Query.equal('id_', [data.$id])
            ]).then((data) => {
                const rzlt = data.documents
                rzlt.forEach(element => {
                    const id = element.$id
                    db.deleteDocument('dash1', 'ordersDetail', id)
                });
                this.editedIndex = this.orders.indexOf(data)
                this.editedItem = Object.assign({}, data)
                this.dialogDelete = true
                db.deleteDocument('dash1', 'orders', idd.$id)
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

        //    this.ordersDetail.push({ ...item })
        //    console.log(this.ordersDetail)
            this.editedIndex = this.orders.indexOf(item)
            this.ordersDetail = Object.assign({}, item)
            console.log(this.ordersDetail)
             const id = this.ordersDetail.$id
             console.log(id)
             db.listDocuments('dash1', 'OrdersDetail', [
                 Query.equal('id_', [id])
             ]).then((data) => {
                 const rzlt = data.documents
                 const detail = []
                 rzlt.forEach(data => {
                     const items = data
                     
                     //const details =  this.ordersDetail.Details
                     detail.push(items)
                     
                 })
                 console.log(detail)
                 this.ordersDetail.Dtails = detail
             })
             console.log(this.ordersDetail) 
            this.dialogEdit = true
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