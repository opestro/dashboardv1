<template>
    <div>
        <v-data-table :headers="headers" :items="products" :search="search" class="elevation-1 rounded-xl">
            <template v-slot:top>
                <v-toolbar flat class="">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"  hide-details>
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
                                        <v-col cols="12">
                                            <v-text-field v-model="product.Name" :value="product.Name"
                                                label="Product name"></v-text-field>
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
                                                    <v-text-field v-model="variation.Colour" label="Colour">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="variation.Size" label="Size">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="variation.Quantity" label="Quantity">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="variation.Price" label="Price">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row class="align-center mb-3 ">
                                                <v-col class="d-flex justify-end">
                                                    <div v-if="editedIndex != -1"> 

                                                        <v-chip v-if="variation.$id != -1" class="align-center mr-2" color="blue" outlined>
                                                            <v-icon small class="" @click="editVariation(variation)">
                                                                mdi-pencil
                                                            </v-icon>
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
                                <v-btn  color="primary" text @click="createProduct()">
                                    {{(editedIndex != -1)?'Update':'Create'}}
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
                                <v-btn color="primary" text @click="deleteProduct()">OK</v-btn>
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
    </div>
</template>
<script>
import { db, Query, ID } from "../appwrite.js"
export default {
    data() {
        return {
            search: '',
            products: [],
            variations: [],
            product: [{
                Name: '',
                Colour: '',
                Size: '',
                Quantity: '',
                Price: '',
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
                { text: 'Product Name', value: 'Name' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            editedIndex: -1,
        
            defaultItem: {
                Name: '',
                Colour: '',
                Size: '',
                Quantity: '',
                Price: '',
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
                Name: '',
                Size: '',
                Colour: '',
                Quantity: '',
                Price: '',
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
                Colour: element.Colour,
                Size: element.Size,
                Quantity: element.Quantity,
                Price: element.Price,
                productID: this.product.$id
            }).then((data) => {
                this.variations[index].$id = data.$id    
            }).catch((err) => { alert(err) })
        },
        createProduct() {

            if (this.editedIndex > -1) {
                Object.assign(this.products[this.editedIndex], this.product)
                db.updateDocument('delivered', 'products', this.product.$id,
                    { Name: this.product.Name });
            } else {
                db.createDocument('delivered', 'products', 'unique()', { Name: this.product.Name })
                    .then((data) => {
                        this.variations.forEach(element => {
                            db.createDocument('delivered', 'variations', 'unique()', {
                                colour: element.Colour,
                                size: element.Size,
                                quantity: element.Quantity,
                                price: element.Price,
                                productID: data.$id
                            }).catch((err) => { alert(err) })
                        });
                        this.products.push(data)
                    })
                    .catch((err) => { alert(err) });
            }
            this.close()
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
                Query.equal('id_', [item.$id])
            ]).then((data) => {
                data.documents.forEach(item => {
                    this.variations.push(item)
                })
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
                colour: variation.Colour,
                size: variation.Size,
                quantity: variation.Quantity,
                price: variation.Price,
               // id_: _id
            }).catch((err) => { alert(err) })
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