<template>
    <div>
        <v-data-table :headers="headers" :items="ProductsName" class="elevation-1 rounded-xl">
            <template v-slot:top>
                <v-toolbar flat class="rounded-xl">
                    <v-toolbar-title>Products Name</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark class="mb-2 rounded-xl" @click="dialogAddNew = !dialogAddNew">
                        New Product Name
                    </v-btn>
                    <v-dialog v-model="dialog" max-width="500px" content-class=" rounded-xl">
                        <template v-slot:activator="{ on, attrs }">

                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="editedItem.Name" label="Product name"></v-text-field>
                                        </v-col>
                                    </v-row>

                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="createProductsName()">
                                    Create
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogAddNew" max-width="500px" content-class=" rounded-xl">
                        <v-card class="pa-5 rounded-xl">
                            <v-container>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="DataDetails.Name" label="Product name"></v-text-field>
                                    </v-col>
                                </v-row>
                                <div v-for="(Order, index) in addfield" :key="(index)">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field v-model="DataDetails.Colour" label="Product Colour">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field v-model="DataDetails.Size" label="Product Size">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="align-center mb-3">
                                        <v-col>
                                            <v-text-field v-model="DataDetails.Quantity" label="Product Quantity">
                                            </v-text-field>
                                        </v-col>
                                        
                                        <v-chip class="" color="red" outlined @click="remove(index)"
                                            v-show="index != 0">
                                            Delete
                                            X
                                        </v-chip>
                                    </v-row>
                                    <v-row>
                                        <v-col >
                                            
                                        </v-col>
                                    </v-row>
                                </div>

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


                            </v-container>
                        </v-card>

                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px" content-class=" rounded-xl">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteProductsName()">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogVariation" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Product Details</v-card-title>
                            <v-spacer></v-spacer>
                            <div class="d-flex justify-end align-center ma-2">
                                <v-btn>Add variation</v-btn>
                            </div>
                            <div class="d-flex align-center">
                                <v-card-title>Colour : Black</v-card-title>
                                <v-card-title>Size : S</v-card-title>
                                <v-card-title>Quantity : 55</v-card-title>
                                <v-btn>Edite</v-btn>
                            </div>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeVariation">Cancel</v-btn>
                                <v-btn color="blue darken-1" text>OK</v-btn>
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
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
                <v-icon small class="ml-2" @click="addVariation(item)">
                    mdi-eye-settings
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
import { db, Query, ID } from "../appwrite.js"
export default {
    data() {
        return {
            addfield: [{
                Item: '',
                Size: '',
                Colour: '',
            }],
            ProductsName: [],
            ProductDetail: [],
            dialogAddNew: false,
            DataDetails: [],
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: '$id',
                },
                { text: 'Product Name', value: 'Name' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            editedIndex: -1,
            editedItem: {
                Name: '',
                $id: ''
            },
            defaultItem: {
                Name: '',
                $id: ''
            },
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        dialogVariation(val) {
            val || this.closeVariation()
        },
    },

    created() {
        this.initialize()
    },
    methods: {
        addMore() {
            this.addfield.push({
                Item: '',
                Size: '',
                Colour: '',
            });
        },
        // function to remove variations 
        remove(index) {
            this.addfield.splice(index, 1);
        },
        // function to delete Product
        deleteProductsDetail() {
            db.deleteDocument('dash1', 'ProductsDetail', _id).then(() => {
            })
        },
        deleteProductsName() {
            const _id = this.ProductsID
            db.deleteDocument('dash1', 'ProductsName', _id).then(() => {
                this.ProductsName.splice(this.editedIndex, 1)
                this.closeDelete()
            })
        },
        createProductsName() {
            if (this.editedIndex > -1) {
                Object.assign(this.ProductsName[this.editedIndex], this.editedItem)
                db.updateDocument('dash1', 'ProductsName', this.ProductDetail.$id,
                    { Name: this.ProductDetail.Name });


            } else {
                db.createDocument('dash1', 'ProductsName', 'unique()', { Name: this.editedItem.Name })
                    .then((data) => {
                        this.editedItem.$id = data.$id
                        this.ProductsName.push(this.editedItem)
                    })
                    .catch((err) => { console.log(err) });


            }
            this.close()
        },
        initialize() {
            db.listDocuments('dash1', 'ProductsName').then((data) => {
                this.ProductsName = data.documents

            })
        },

        editItem(item) {
            this.ProductDetail = item
            this.editedIndex = this.ProductsName.indexOf(item)
            //  console.log(this.ProductDetail)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.ProductsID = item.$id
            this.editedIndex = this.ProductsName.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        addVariation(item) {
            this.ProductsID = item.$id
            this.editedIndex = this.ProductsName.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogVariation = true
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
        closeVariation() {
            this.dialogVariation = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
    }
}
</script>