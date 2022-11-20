<template>
    <div>
        <v-data-table :headers="headers" :items="ProductsName" class="elevation-1 rounded-xl">
            <template v-slot:top>
                <v-toolbar flat class="rounded-xl">
                    <v-toolbar-title>Products Name</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2 rounded-xl" v-bind="attrs" v-on="on">
                                New Product Name
                            </v-btn>
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
                    <v-dialog v-model="dialogDelete" max-width="500px">
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
            ProductsName: [],
            ProductDetail: [],
            DataName: [],
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
            desserts: [],
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
        dialogVariation(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },
    methods: {
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