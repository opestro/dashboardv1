<template>
    <div class="">
        <v-data-table :headers="headers" :items="orders" sort-by="calories" :search="search" class="rounded-xl elevation-1">
            <template v-slot:top>
                <v-toolbar flat class="rounded-xl">
                    
                    <v-toolbar-title>Orders</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                    </v-text-field>
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
                                        <v-col cols="12" sm="3" md="3">
                                            <v-text-field type="number" v-model="addfield.Wilaya" label="Wilaya">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="3" md="3">
                                            <v-text-field v-model="addfield.Commune" label="Commune"></v-text-field>
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
                                                            item-text="Name" item-value="Name" label="Select Items"
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

                                                <div>
                                                    <v-row>
                                                        <v-col class="d-flex align-center ">
                                                            <v-text-field v-model="DataDetail.Quantity"
                                                                label="Quantity">
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col class="d-flex align-center ">
                                                            <v-card-text>Stock :
                                                            </v-card-text>
                                                            <v-card-subtitle v-model="addfield.Stock"
                                                                v-for="qntt in Quantity[index]" :key="qntt">{{
                                                                        qntt.Quantity
                                                                }}
                                                            </v-card-subtitle>
                                                        </v-col>

                                                    </v-row>



                                                    <v-card-subtitle>
                                                        <v-chip class="" color="red" outlined
                                                            @click="remove(index, DataDetail, 'old')"
                                                            v-show="index != 0"> Delete
                                                            X
                                                        </v-chip>
                                                    </v-card-subtitle>
                                                </div>
                                            </v-card>
                                        </div>
                                        <v-col cols="12">
                                            <v-text-field v-model="addfield.Remarque" label="Remarque">
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" sm="6" md="6">
                                            <v-select v-model="addfield.Delivery" :items="deliveryType" item-text="type"
                                                item-value="value" label="Delivery Type">

                                            </v-select>
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
                                            <v-text-field v-model="ordersDetail.FullName" disabled label="Full Name">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="ordersDetail.Address" disabled label="Address">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="ordersDetail.Wilaya" disabled label="Wilaya">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="ordersDetail.Commune" disabled label="Baladiya">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="ordersDetail.PhoneNumber" disabled
                                                label="Phone Number">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>

                                        <v-col cols="12">
                                            <v-text-field v-model="ordersDetail.produit" disabled>
                                            </v-text-field>
                                        </v-col>

                                        <!--  <v-col cols="12" sm="6" md="6">
                                           <v-text-field v-model="ordersDetail.Shiping" label="Shiping">
                                            </v-text-field> 
                                        </v-col> -->
                                        <v-col cols="12">
                                            <v-text-field v-model="ordersDetail.Total" disabled label="Total">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn v-if="editButtons.delete" color="blue darken-1" text
                                    @click="deleteClient(ordersDetail)">
                                    Delete
                                </v-btn>
                                <v-btn v-if="editButtons.reject" color="blue darken-1" text
                                    @click="isRejected(ordersDetail)">
                                    Reject
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancel
                                </v-btn>

                                <v-btn v-if="editButtons.confirm" color="blue darken-1" text
                                    @click="confirmed(ordersDetail)">
                                    Confirm
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
            search: '',
            editButtons: {
                reject: true,
                delete: false,
                confirm: true,
            },
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
            deliveryType: [{ type: 'Home delivery', value: '0' },
            { type: 'Stop Desk', value: '1' }],
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
            ordersDetail: {
                Details: {},
                Activity: {},
                Data: {},
                produit: {}
            },
        }
    },
    methods: {
        isRejected(items) {

            //  console.log(index)
            db.updateDocument('dash1', 'Orders', items.$id,
                { Status: "Rejected" }).then(() => {

                    this.editButtons.delete = true
                    this.editButtons.confirm = true
                    this.editButtons.reject = false
                })
        },
        confirmed(items) {
            this.$axios.post('https://app.noest-dz.com/api/public/valid/order', {
                api_token: 'OiHJO2UfRFlKRNWUJbg5L3hG0CEfQmnkDoW',
                user_guid: 'TALH5G3I',
                tracking: items.Tracking
            }).then(() => {
                db.updateDocument('dash1', 'Orders', items.$id,
                    { Status: "confirmed" }).then(() => {
                        this.editButtons.delete = true
                        this.editButtons.confirm = false
                        this.editButtons.reject = false
                    })
            })
        },
        // function to Create a new Order
        async AddNewClient() {
            let details = ''
            const orderDetails = this.addfield
          
            await orderDetails.forEach(element => {
                details = details + element.Name + ' - ' + element.Colour + ' - ' + element.Size + ' x ' + element.Quantity.toString() + ' | '

            });
            const userid = this.$store.state.auth.user.id
         //   console.log(userID)
            this.$axios.post('https://app.noest-dz.com/api/public/create/order', {
                api_token: 'OiHJO2UfRFlKRNWUJbg5L3hG0CEfQmnkDoW',
                user_guid: 'TALH5G3I',
                reference: '',
                client: this.addfield.Fullname,
                phone: this.addfield.PhoneNumber,
                phone_2: '',
                adresse: this.addfield.Address,
                wilaya_id: this.addfield.Wilaya,
                montant: this.addfield.Total,
                commune: this.addfield.Commune,
                remarque: this.addfield.Remarque,
                produit: details,
                type_id: 1,
                poids: 1,
                stop_desk: 1,
                stock: 0
            }).then((success) => {
                //  console.log(success.data.tracking)
                db.createDocument('dash1', 'orders', "unique()",
                    {
                        "FullName": this.addfield.Fullname,
                        "Address": this.addfield.Address,
                        "Wilaya": this.addfield.Wilaya,
                        "PhoneNumber": this.addfield.PhoneNumber,
                        "Shiping": this.addfield.Shipping,
                        "Total": this.addfield.Total,
                        "Status": "Processing",
                        "userID": this.$store.state.auth.user.id,
                        "Remarque": this.addfield.Remarque,
                        "Commune": this.addfield.Commune,
                        "Tracking": success.data.tracking
                    }).then((id) => {
                        //  console.log(id)
                        const id_ = id.$id
                        this.addfield.forEach(element => {
                            const name = element.Name
                            const colour = element.Colour
                            const size = element.Size

                            //  console.log(name)
                            db.listDocuments('dash1', 'ProductsName', [Query.equal('Name', [name])])
                                .then((data) => {
                                    const detail = data.documents[0].Name
                                    //  console.log(detail)
                                    db.createDocument('dash1', 'ordersDetail', "unique()",
                                        {
                                            "id_": id_,
                                            "Colour": colour,
                                            "Size": size,
                                            "Item": detail,
                                        }).then(() => {

                                        })

                                })
                        })
                        this.orders.push(id)
                    }).catch((err) => { alert(err) })
            }).catch((err) => { //  console.log(err) 
            })
            //  console.log(this.addfield)

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

        getDetails(data, detail, index) {

            if (detail == 'Colour') {
                this.ColourDetail[index] = []
                //     this.ColourDetail = []
                const Name = data
                const i = index
                //   this.ColourDetail[index] = this.ColourDetail[index] || [];
                //    var ColourDetail = this.ColourDetail[index];
                //   console.log(this.ColourDetail)
                db.listDocuments('dash1', 'ProductsName', [Query.equal('Name', [Name])]).then((data) => {
                    const id_ = data.documents[0].$id
                    //  console.log(id_)
                    db.listDocuments('dash1', 'ProductsDetail', [Query.equal('id_', [id_])]).then((dataDer) => {
                        const dataorder = dataDer.documents
                        this.ColourDetail[index] = [...dataorder]
                        this.ColourDetail = [...this.ColourDetail]
                    })

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
                    //  console.log(this.Quantity)
                    //8     console.log(this.Quantity)


                })
            }

        },
        // function to delete order
        deleteClient(data) {
            this.itemDetails = data
            //  console.log(data)
            this.editedIndex = this.orders.indexOf(data)
            this.editedItem = Object.assign({}, data)
            this.dialogDelete = true
        },
        initialize() {

            db.listDocuments('dash1', 'orders').then((data) => {
                //  console.log(data)
                const rzlt = data.documents
                // rzlt.forEach(orders => {});
                const datax = data.documents.filter(data => (data.deletedAt == "null"))
                //  console.log(datax)
                this.orders = datax
                //    console.log(this.orders)
            }),
                db.listDocuments('dash1', 'ProductsName').then((data) => {
                    const prdcts = data.documents
                    prdcts.forEach(data => {
                        const items = data
                        this.itemDetails.push(items)


                    })
                    //  console.log(this.itemDetails)
                })
        },

        editItem(item) {
            //  console.log(item.Tracking)
            const track = item.Tracking
            this.editedIndex = this.orders.indexOf(item)
            this.ordersDetail = Object.assign({}, item)
            this.$axios.post('https://app.noest-dz.com/api/public/get/tracking/info', {
                api_token: 'OiHJO2UfRFlKRNWUJbg5L3hG0CEfQmnkDoW',
                user_guid: 'TALH5G3I',
                tracking: track
            }).then((success) => {
                const ordersData = success.data.OrderInfo
                this.ordersDetail.produit = ordersData.produit
              //  console.log(this.ordersDetail)
                const id = this.ordersDetail.$id
             //   console.log(success)
                db.listDocuments('dash1', 'OrdersDetail', [
                    Query.equal('id_', [id])
                ]).then((data) => {
                    //################################
                    // Const for data of the order
                    const rzlt = data.documents
                    const shippingInfo = success.data.activity
                    //################################
                    // Arrays to using theme later
                    const detail = []
                    const Activity = []
                    //################################
                    rzlt.forEach(data => {
                        const items = data
                        detail.push(items)
                    })
                    shippingInfo.forEach(data => {
                        const items = data
                        Activity.push(items)
                    })
                    this.ordersDetail.Details = detail
                    this.ordersDetail.Activity = Activity
               //     console.log(this.ordersDetail)
                    const status = item.Status
                    if (status === "Processing") {
                        this.editButtons.confirm = true
                        this.editButtons.reject = true
                        this.editButtons.delete = false
                    } else if (status === "confirmed") {
                        this.editButtons.delete = true
                        this.editButtons.confirm = false
                        this.editButtons.reject = false
                    } else if (status === "Rejected") {
                        this.editButtons.confirm = true
                        this.editButtons.reject = false
                        this.editButtons.delete = true
                    } else {
                        this.editButtons.confirm = false
                        this.editButtons.reject = false
                        this.editButtons.delete = false
                    }
                    this.dialogEdit = true

                })
            })


        },
        remove(index) {
            this.addfield.splice(index, 1)
        },
        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
            const data = this.ordersDetail


       //     console.log(data)
        },
        deleteItemConfirm() {
            const data = this.ordersDetail
            const tracking = this.ordersDetail.Tracking
         //   console.log(data.Tracking)
         //   console.log(tracking)
            this.$axios.post('https://app.noest-dz.com/api/public/delete/order', {
                api_token: 'OiHJO2UfRFlKRNWUJbg5L3hG0CEfQmnkDoW',
                user_guid: 'TALH5G3I',
                tracking: tracking
            }).then((deletSatatus) => {
                const success = deletSatatus.data.success
                if (success) {
                    //  console.log(deletSatatus)
                    const idd = this.ordersDetail.$id
                    db.updateDocument('dash1', 'orders', idd, { Status: 'Deleted', deletedAt: new Date() }).then(() => {
                        this.orders.splice(this.editedIndex, 1)
                        this.closeDelete()
                        //  console.log(idd)
                    })

                } else {
               //     console.log('try again')
                }

            }).catch((err) => { console.log(err) })

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
    middleware: 'auth'
}
</script>