<template>
    <v-container>
        <v-card
            class="d-xs-block d-sm-flex flex-wrap align-xs-content-center align-center justify-xs-center justify-sm-space-between rounded-xl"
            elevation="0">


        </v-card>
        <v-card class="my-2 pa-2 rounded-xl " elevation="5" outlined>
            <v-card-title>
                Add New Product
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn type="button" class="d-flex justify-end ml-2 rounded-md border px-3 py-2 bg-pink-600 text-white"
                @click="addMore()">
                Add Variation
            </v-btn>
            <v-card-subtitle class="d-flex justify-center">
                <div class="">
                    <v-row>
                        <div class="">
                            <v-text-field v-model="products.title" placeholder="Title"></v-text-field>
                            <v-text-field v-model="products.description" placeholder="Description "></v-text-field>
                            <v-text-field class="mr-3" v-model="products.price" placeholder="Price"></v-text-field>
                            <div v-for="(product, index) in products" :key="index" class="d-flex">
                                <v-text-field class="mr-3" v-model="product.size" placeholder="Size"></v-text-field>
                                <v-text-field class="mr-3" v-model="product.colour" placeholder="Colour"></v-text-field>
                               
                                <v-text-field class="mr-3" v-model="product.ref" placeholder="Ref"></v-text-field>
                                <v-btn type="button" class="ml-2 rounded-md border px-3 py-2 bg-red-600 text-white"
                                    @click="remove(index)" v-show="index != 0">
                                    Remove
                                </v-btn>
                            </div>
                            
                            <v-btn @click="CreateProduct(products)">Create Product</v-btn>
                        </div>
                    </v-row>
                </div>



            </v-card-subtitle>

        </v-card>
    </v-container>
</template>
<script>
import { ID, account, db, Permission, Role } from "../appwrite.js";
export default {
    data() {
        return {
            products: [
                {
                    title: "",
                    description: "",
                    size: "",
                    colour: "",
                    price: "",
                    ref: "",
                },
            ],
            counter: []
        }
    },
    methods: {
        addMore() {
            this.products.push({
                size: "",
                colour: "",
                ref: ""
            });
        },
        remove(index) {
            this.products.splice(index, 1);
        },
        CreateProduct() {
            const products = this.products
            for (let i = 0; i < products.length; i++) {
                db.createDocument('dash1', 'products', "unique()",
                {
                    "Title": products.title,
                    "Desc": products.description,
                    "Size": products[i].size,
                    "Colours": products[i].colour,
                    "Price": products.price,
                    "Ref": products[i].ref,
                }).then((data) => {console.log(data)}).catch((err) => { alert(err) })
                
            }
         /*   db.createDocument('dash1', 'products', "unique()",
                {
                    "Title": this.products.title,
                    "Desc": this.products.description,
                    "Size": this.products.size,
                    "Colours": this.products.colour,
                    "Price": this.products.price,
                    "Ref": this.products.ref,
                }).then((data) => {console.log(data)}).catch((err) => { alert(err) })*/
            console.log(this.products)
        },

    },
}
</script>