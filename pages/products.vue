<template>
    <div>
        <v-data-table :headers="headers" :items="products" :search="search" class="elevation-1 rounded-xl">
            <template v-slot:top>
                <v-toolbar flat class="">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" hide-details>
                    </v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark class="mb-2" @click="newProduct()">
                        + Create Product
                    </v-btn>
                    <v-dialog v-model="dialog" max-width="500px" content-class=" rounded-xl">
                        <template v-slot:activator="{ on, attrs }">
                        </template>
                        <v-card>
                            <v-card-title class="d-flex justify-space-between">
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field v-model="product.name" :value="product.name"
                                                label="Product name"></v-text-field>

                                        </v-col>
                                        <v-col cols="6">
                                            <v-file-input accept="image/png, image/jpeg, image/bmp"
                                                prepend-icon="mdi-camera" show-size v-model="product.img"
                                                placeholder="Product picture" truncate-length="5"></v-file-input>
                                        </v-col>
                                        <v-card-actions class="align-center">
                                            <v-btn color="primary" text @click="addMore()">
                                                + Create Variation
                                            </v-btn>
                                        </v-card-actions>
                                    </v-row>
                                    <!--==== Edit Variation ====-->
                                    <div v-for="(variation, index) in variations" :key="(index)">
                                        <v-card outlined class="pa-2 my-2">
                                            <v-row class="align-center ">
                                                <v-col xs="6">
                                                    <v-text-field v-model="variation.colour" label="Colour">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="variation.size" label="Size">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="variation.quantity" label="Quantity">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="variation.price" label="Price">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row class="align-center mb-3 ">
                                                <v-col class="d-flex justify-end">
                                                    <div v-if="editedIndex != -1">

                                                        <v-chip v-if="variation.$id != -1" class="align-center mr-2"
                                                            color="blue" outlined @click="editVariation(variation)">
                                                            Edit
                                                        </v-chip>
                                                        <v-chip v-else class="align-center mr-2" color="green" outlined
                                                            @click="saveVariation(index)">
                                                            Save
                                                        </v-chip>
                                                    </div>
                                                    <v-chip class="align-center" color="red" outlined
                                                        @click="remove(index, variation)">
                                                        Delete
                                                    </v-chip>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                            </v-row>
                                        </v-card>
                                    </div>
                                    <!--==== End of Edit Variation ====-->
                                    <!--==== Add Variation ====-->

                                    <!--==== End of Add Variation ====-->
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="primary" text @click="createProduct(product.img)">
                                    {{ (editedIndex != -1) ? 'Update' : 'Create' }}
                                </v-btn>

                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="500px" content-class=" rounded-xl">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="primary" text @click="deleteProduct()">Delete</v-btn>
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
            </template>
            <template v-slot:no-data>
                <div class="">
                    <v-img class="mx-auto" width="300" height="200" :src="require('@/assets/images/empty.svg')"></v-img>
                    <v-btn class="mx-auto my-2" color="" outlined @click="newProduct()">
                        Create Product
                    </v-btn>
                </div>
            </template>
        </v-data-table>
        <v-snackbar v-model="snackbar" :color="snackbarColor">
            {{ snackbarText }}

            <template #action="{ attrs }">
                <v-btn color="" text v-bind="attrs" @click="snackbar = false">
                    close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>
import { db, Query, ID, storage } from "../appwrite.js"
export default {
    data() {
        return {
            search: '',
            snackbar: false,
            snackbarColor: 'success',
            snackbarText: '',
            products: [],
            variations: [],
            product: [{
                name: '',
                colour: '',
                img: null,
                size: '',
                quantity: '',
                price: '',
                $id: -1
            }],
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: '$id',
                },
                { text: 'Product Name', value: 'name' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            editedIndex: -1,

            defaultItem: {
                name: '',
                colour: '',
                img: '',
                size: '',
                quantity: '',
                price: '',
                $id: ''
            },
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Create Product' : 'Edit Product'
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
    methods: {
        addMore() {
            this.variations.push({
                name: '',
                size: '',
                colour: '',
                quantity: '',
                price: '',
                $id: -1
            });
        },
        // function to remove variations 
        remove(index, variation) {
            if (variation.$id != -1) {
                db.deleteDocument('delivered', 'variations', variation.$id).then(() => {
                    this.variations.splice(index, 1)
                })
            } else {
                this.variations.splice(index, 1)
            }
        },
        deleteProduct() {
            db.listDocuments('delivered', 'variations', [
                Query.equal('productID', [this.ProductID])
            ]).then((data) => {
                const variations = data.documents
                variations.forEach(element => {
                    db.deleteDocument('delivered', 'variations', element.$id)
                });
                this.products.splice(this.editedIndex, 1)
                this.closeDelete()
                db.deleteDocument('delivered', 'products', this.ProductID).then(() => {

                })
            })
        },
        newProduct() {
            this.variations = []
            this.editedIndex = -1
            this.dialog = true
        },
        saveVariation(index) {
            const element = this.variations.at(index)
            db.createDocument('delivered', 'variations', 'unique()', {
                colour: element.colour,
                size: element.size,
                quantity: element.quantity,
                price: element.price,
                productID: this.product.$id
            }).then((data) => {
                this.variations[index].$id = data.$id
            }).catch((err) => {

                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = err
            })
        },
        async createProduct() {
            if (this.editedIndex > -1) {
                Object.assign(this.products[this.editedIndex], this.product)
                const imageId = await storage.createFile('productsimg', 'unique()', this.product.img)
                storage.updateFile('delivered', 'products', this.product.imageID).then(() =>{
                    db.updateDocument('delivered', 'products', this.product.$id, {
                    name: this.product.name,
                    imageID: imageId
                }).then(() => {
                   
                    this.snackbar = true
                    this.snackbarColor = 'success'
                    this.snackbarText = 'success'
                })
                })

            } else {
                let imageId = null
                if (this.product.img) {
                   await storage.createFile('productsimg', 'unique()', this.product.img).then((data)=>{
                     imageId = data.$id
                    })
                } 
                console.log(imageId)
                db.createDocument('delivered', 'products', 'unique()', {
                    name: this.product.name,
                    imageID: imageId
                }).then((data) => {
                    console.log(data)
                    this.variations.forEach(element => {
                        db.createDocument('delivered', 'variations', 'unique()', {
                            colour: element.colour,
                            size: element.size,
                            quantity: element.quantity,
                            price: element.price,
                            productID: data.$id
                        }).catch((err) => {
                            this.snackbar = true
                            this.snackbarColor = 'error'
                            this.snackbarText = err
                        })
                    })
                    this.products.push(data)
                    this.snackbar = true
                    this.snackbarColor = 'success'
                    this.snackbarText = 'success'

                }).catch((err) => {
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = err
                })
                this.close()
            }
        },
        initialize() {
            db.listDocuments('delivered', 'products').then((data) => {
                this.products = data.documents
            })
        },
        editItem(item) {
            this.product = item
            this.editedIndex = this.products.indexOf(item)
            //  this.product = Object.assign({}, item)
            this.variations = []
            db.listDocuments('delivered', 'variations', [
                Query.equal('productID', item.$id)
            ]).then((data) => {
                data.documents.forEach(variation => {
                    this.variations.push(variation)
                })
            }).catch(err => {
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = err
            })
            this.dialog = true
        },

        deleteItem(item) {
            this.ProductID = item.$id
            this.editedIndex = this.products.indexOf(item)
            // this.DataDetails = Object.assign({}, item)
            this.dialogDelete = true
        },

        editVariation(variation) {
            db.updateDocument('delivered', 'variations', variation.$id, {
                colour: variation.colour,
                size: variation.size,
                quantity: variation.quantity,
                price: variation.price,
                // id_: _id
            }).then(() => {
                this.snackbar = true
                this.snackbarColor = 'success'
                this.snackbarText = 'success'
            }).catch((err) => {
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = err
            })
        },
        close() {
            this.dialog = false,
                this.$nextTick(() => {
                    this.product = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
        },
        closeDelete() {
            this.dialogDelete = false,
                this.$nextTick(() => {
                    this.product = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
        },

    },
}
</script>