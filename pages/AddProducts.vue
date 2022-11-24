<template>
    <div>
        <v-data-table :headers="headers" :items="ProductsName" class="elevation-1 rounded-xl">
            <template v-slot:top>
                <v-toolbar flat class="rounded-xl">
                    <v-toolbar-title>Products Name</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark class="mb-2 rounded-xl" @click="newProduct()">
                        New Product Name
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
                                            <v-text-field v-model="ProductDetail.Name" :value="ProductDetail.Name"
                                                label="Product name"></v-text-field>
                                        </v-col>
                                        <v-card-actions class="align-center">
                                            <v-btn color="blue darken-1" text @click="addMore()">
                                                Add Variation
                                            </v-btn>
                                        </v-card-actions>
                                    </v-row>
                                    <!--==== Edit Variation ====-->
                                    <div v-for="(DataDetail, index) in ProductVariation" :key="(index)">
                                        <v-card outlined class="pa-2 my-2">
                                            <v-row class="align-center ">
                                                <v-col xs="6">
                                                    <v-text-field v-model="DataDetail.Colour" label="Colour">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="DataDetail.Size" label="Size">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="DataDetail.Quantity" label="Quantity">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="DataDetail.Price" label="Price">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row class="align-center mb-3 ">
                                                <v-col class="d-flex justify-end">
                                                    <v-chip class="align-center mr-2" color="blue" outlined>
                                                        <v-icon small class="" @click="editVariation(item, DataDetail)">
                                                            mdi-pencil
                                                        </v-icon>
                                                    </v-chip>
                                                    <v-chip class="align-center" color="red" outlined
                                                        @click="remove(index, DataDetail, variant = 'old')">
                                                        X
                                                    </v-chip>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                            </v-row>
                                        </v-card>
                                    </div>
                                    <!--==== End of Edit Variation ====-->
                                    <!--==== Add Variation ====-->
                                    <div v-for="(DataDetail, index) in addfield" :key="(index)">
                                        <v-card outlined class="pa-2 my-2">
                                            <v-row>
                                                <v-col>
                                                    <v-text-field v-model="DataDetail.Colour" label="Colour">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="DataDetail.Size" label="Size">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="DataDetail.Quantity" label="Quantity">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field v-model="DataDetail.Price" label="Price">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="d-flex justify-end" cols="12">

                                                    <v-chip class="align-center mr-2" color="green" outlined
                                                        @click="saveVariation(index)">
                                                        <v-icon small class="mr-2">
                                                            mdi-pencil
                                                        </v-icon> save
                                                    </v-chip>
                                                    <v-chip class="align-center" color="red" outlined @click="remove()">
                                                        X
                                                    </v-chip>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </div>
                                    <!--==== End of Add Variation ====-->
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="createProductsName(ProductDetail.Name)">
                                    Update
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogAddNew" max-width="500px" content-class=" rounded-xl">
                        <v-card class="pa-5 rounded-xl">
                            <v-container>
                                <div class="d-flex justify-space-between align-center">
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }}</span>
                                    </v-card-title>
                                    <v-card-actions class="align-center">
                                        <v-btn color="blue darken-1" text @click="addMore()">
                                            Add Variation
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="addfield.Name" label="Product name"></v-text-field>
                                    </v-col>
                                </v-row>
                                <div v-for="(DataDetail, index) in addfield" :key="(index)">
                                    <v-card outlined class="pa-2 my-2 ">
                                        <v-row class="align-center">
                                            <v-col>
                                                <v-text-field v-model="DataDetail.Colour" label="Colour">
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="DataDetail.Size" label="Size">
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="DataDetail.Quantity" label="Quantity">
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="DataDetail.Price" label="Price">
                                                </v-text-field>
                                            </v-col>
                                            <v-col class="">
                                                <v-chip class="" color="red" outlined @click="remove(index)"
                                                    v-show="index != 0">
                                                    X
                                                </v-chip>
                                            </v-col>
                                        </v-row>
                                        <v-row class="align-center mb-3">
                                        </v-row>
                                        <v-row>
                                        </v-row>
                                    </v-card>
                                </div>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="createProductsName()">
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
            addfield: [],
            ProductsName: [],
            ProductDetail: [],
            ProductVariation: [],
            dialogAddNew: false,
            DataDetails: [{
                Name: '',
                Colour: '',
                Size: '',
                Quantity: '',
                Price: '',
                $id: ''
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
            editedItem: {
                Name: '',
                $id: ''
            },
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
                Name: '',
                Size: '',
                Colour: '',
                Quantity: '',
                Price: '',
                $id: ''
            });
        },
        // function to remove variations 
        remove(index, DataDetail, variant) {
            if (variant == 'old') {
                const id = DataDetail.$id
                db.deleteDocument('dash1', 'ProductsDetail', id).then(() => {
                    this.ProductVariation.splice(index, 1)
                })
            } else {
                this.addfield.splice(index, 1)
            }
        },
        deleteProductsName() {
            const _id = this.ProductsID
            db.listDocuments('dash1', 'ProductsDetail', [
                Query.equal('id_', [_id])
            ]).then((data) => {
                const rzlt = data.documents
                rzlt.forEach(element => {
                    const id = element.$id
                    db.deleteDocument('dash1', 'ProductsDetail', id)
                });
                this.ProductsName.splice(this.editedIndex, 1)
                this.closeDelete()
                db.deleteDocument('dash1', 'ProductsName', _id).then(() => { })
            })
        },
        newProduct() {
            this.addfield.push({
                Name: '',
                Size: '',
                Colour: '',
                Quantity: '',
                Price: '',
                $id: ''
            });
            this.dialogAddNew = !this.dialogAddNew
        },
        saveVariation(index) {
            const element = this.addfield.at(index)
            db.createDocument('dash1', 'ProductsDetail', 'unique()', {
                Colour: element.Colour,
                Size: element.Size,
                Quantity: element.Quantity,
                Price: element.Price,
                id_: this.ProductDetail.$id
            }).then((data) => {
                this.addfield.splice(index, 1)
                this.ProductVariation.push({
                    Size: element.Size,
                    Colour: element.Colour,
                    Quantity: element.Quantity,
                    Price: element.Price,
                    $id: element.$id
                });
            }).catch((err) => { alert(err) })
        },
        createProductsName(item) {
            this.ProductDetail.Name = item
            if (this.editedIndex > -1) {
                Object.assign(this.ProductsName[this.editedIndex], this.ProductDetail)
                db.updateDocument('dash1', 'ProductsName', this.ProductDetail.$id,
                    { Name: this.ProductDetail.Name });
            } else {
                db.createDocument('dash1', 'ProductsName', 'unique()', { Name: this.addfield.Name })
                    .then((data) => {
                        const _id = data.$id
                        this.addfield.forEach(element => {
                            db.createDocument('dash1', 'ProductsDetail', 'unique()', {
                                Colour: element.Colour,
                                Size: element.Size,
                                Quantity: element.Quantity,
                                Price: element.Price,
                                id_: _id
                            }).catch((err) => { alert(err) })
                        });
                        this.DataDetails = data
                        this.ProductsName.push(this.DataDetails)
                    })
                    .catch((err) => { alert(err) });
            }
            this.close()
        },
        initialize() {
            db.listDocuments('dash1', 'ProductsName').then((data) => {
                this.ProductsName = data.documents
            })
        },
        editItem(item, DataDetail) {
            this.ProductDetail = item
            this.editedIndex = this.ProductsName.indexOf(item)
            this.DataDetails = Object.assign({}, item)
            this.ProductVariation = []
            db.listDocuments('dash1', 'ProductsDetail', [
                Query.equal('id_', [item.$id])
            ]).then((data) => {
                const rzlt = data.documents
                rzlt.forEach(data => {
                    const items = data
                    this.ProductVariation.push(items)
                })
            })
            this.addfield = []
            this.dialog = true
        },

        deleteItem(item) {
            this.ProductsID = item.$id
            this.editedIndex = this.ProductsName.indexOf(item)
            this.DataDetails = Object.assign({}, item)
            this.dialogDelete = true
        },
        /*  addVariation(item) {
              this.dialogVariation = true
          }, */
        editVariation(item, DataDetail) {
            console.log(DataDetail)
            db.updateDocument('dash1', 'ProductsDetail', DataDetail.$id, {
                Colour: DataDetail.Colour,
                Size: DataDetail.Size,
                Quantity: DataDetail.Quantity,
                Price: DataDetail.Price,
               // id_: _id
            }).catch((err) => { alert(err) })
        },
        close() {
            this.dialog = false,
                this.dialogAddNew = false,
                this.$nextTick(() => {
                    this.DataDetails = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
        },
        closeDelete() {
            this.dialogDelete = false,
                this.dialogAddNew = false,
                this.$nextTick(() => {
                    this.DataDetails = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
        },
        closeVariation() {
            this.dialogVariation = false
            this.$nextTick(() => {
                this.DataDetails = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
    }
}
</script>