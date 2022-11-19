<template>
    <v-container>
        <v-card
            class="d-xs-block d-sm-flex flex-wrap align-xs-content-center align-center justify-xs-center justify-sm-space-between rounded-xl"
            elevation="0">


        </v-card>
        <v-card class="my-2 pa-2 rounded-xl " elevation="0">
            <div class="d-flex justify-space-between">
                <v-card-title>
                    Add New Product
                </v-card-title>
                <v-btn v-show="AddProduct" @click="AddProduct = !AddProduct">Add variation</v-btn>
                <v-btn v-show="AddProduct == false" @click="AddProduct = !AddProduct">Add Product</v-btn>
            </div>
            <v-spacer></v-spacer>

            <v-card-subtitle class="" v-show="AddProduct">
                <div class="">

                    <div class="">
                        <v-text-field v-model="products.title" placeholder="Title"></v-text-field>
                        <div class="d-flex justify-space-between align-centre">
                            <v-btn class="mr-2 rounded-xl white--text green px-3 py-2 " elevation="0" outlined
                                @click="CreateProductName()">Add Product Name
                            </v-btn>
                        </div>
                    </div>

                </div>
            </v-card-subtitle>
            <v-card-subtitle v-show="AddProduct == false">
                <div class="">
                    <v-select v-model="productID" :items="productsName" item-text="Name" item-value="$id"
                        label="Select Items">
                    </v-select>
                    <v-text-field v-model="products.description" placeholder="Description "></v-text-field>
                    <v-text-field class="mr-3" v-model="products.price" placeholder="Price"></v-text-field>
                    <div v-for="(product, index) in products" :key="index" class="d-flex">
                        <v-text-field class="mr-3" v-model="product.size" placeholder="Size"></v-text-field>
                        <v-text-field class="mr-3" v-model="product.colour" placeholder="Colour"></v-text-field>

                        <v-text-field class="mr-3" v-model="product.ref" placeholder="Ref"></v-text-field>
                        <v-chip class="mx-2 my-1" color="red" outlined @click="remove(index)" v-show="index != 0">
                            X
                        </v-chip>
                    </div>
                    <div class="d-flex justify-space-between align-centre">
                        <v-btn class="ml-2 rounded-xl white--text px-3 py-2 blue text-white" outlined elevation="0"
                            @click="addMore()">
                            Add Variation
                        </v-btn>
                        <v-btn class="mr-2 rounded-xl white--text green px-3 py-2 " elevation="0" outlined
                            @click="CreateProduct(productID)">Create Product
                        </v-btn>
                    </div>
                </div>
            </v-card-subtitle>

        </v-card>

        <Products></Products>
    </v-container>
</template>
<script>
import Products from '../components/Products.vue';
import { ID, account, db, Permission, Role, Query } from "../appwrite.js";
export default {
    component: { Products },
    data() {
        return {
            products: [
                {
                    title: "",
                    description: "",
                    size: "",
                    colour: "",
                    price: "",
                    quantity: "",
                },
            ],
            productsName: [],
            productID: [],
            AddProduct: true,
        }
    },
    methods: {
        // function to addMore variations
        addMore() {
            this.products.push({
                size: "",
                colour: "",
                quantity: ""
            });
        },
        // function to remove variations 
        remove(index) {
            this.products.splice(index, 1);
        },
        // function to create new product
        CreateProductName() {
            const products = this.products
            db.createDocument('dash1', 'ProductsName', "unique()",
                {
                    "Name": products.title,
                }).then((data) => {
                }).catch((err) => { alert(err) })

        },
        CreateProduct(data) {
            const id = data
            const products = this.products
            // loop to send each Deatail to the database and separate the Deatails with their unique size and colour
                for (let i = 0; i < products.length; i++) {
                   db.createDocument('dash1', 'ProductsDetail', "unique()", {
                       "Description": products.description,
                       "Size": products[i].size,
                       "Colour": products[i].colour,
                       "Price": products.price,
                       "Quantity": products[i].quantity,
                       "id_": id,
                   }).catch((err) => { alert(err) })
               } 
        },
        initialize() {
            db.listDocuments('dash1', 'ProductsName').then((data) => {
                const prdcts = data.documents
                prdcts.forEach(data => {
                    const items = data
                    this.productsName.push(items)
                })
                console.log(this.productsName)
            })
        },

    },
    created() {
        this.initialize()
    },
}
</script>