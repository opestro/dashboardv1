<template>
    <div>
        <v-simple-table class="rounded-xl">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-left">
                            Title
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in ProductsName" :key="data">
                        <td class="text-caption">{{ data.$id }}</td>
                        <td class="text-caption">{{ data.Name }}</td>
                        <td class="text-caption">
                            <v-btn @click="deleteProductsName(data)" outlined class="red white--text rounded-xl">delete
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-spacer class="my-4"></v-spacer>
        <v-simple-table class="rounded-xl">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-left">
                            Title
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                        <th class="text-left">
                            Size
                        </th>
                        <th class="text-left">
                            Colour
                        </th>
                        <th class="text-left">
                            Price
                        </th>
                        <th class="text-left">
                            Quantity
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data, detail in Products" :key="(data, detail)">
                        <td class="text-caption">{{ data.$id }}</td>
                        <td class="text-caption">{{ data.Title }}</td>
                        <td class="text-caption">{{ data.Description }}</td>
                        <td class="text-caption">{{ data.Size }}</td>
                        <td class="text-caption">{{ data.Colour }}</td>
                        <td class="text-caption">{{ data.Price }} DA</td>
                        <td class="text-caption">{{ data.Quanitity }} </td>
                        <td class="text-caption">
                            <v-btn @click="deleteProducts(data)" outlined class="red white--text rounded-xl">delete
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>
<script>
import { db, Query } from "../appwrite.js"
export default {
    data() {
        return {
            ProductsName: [],
            Products: [],
            DataName:[],
            DataDetails:[]
        }
    },
    methods: {
        // function to delete Product
        deleteProducts(data) {
            db.deleteDocument('dash1', 'ProductsDetail', data.$id).then(() => {
                alert('Your client has been deleted')
            })
        },
        deleteProductsName(data) {
            db.deleteDocument('dash1', 'ProductsName', data.$id).then(() => {
                alert('Your client has been deleted')
            })
        }
    },
    beforeMount() {
        // function to get Documents of Products
        db.listDocuments('dash1', 'ProductsName').then((data) => {
            this.ProductsName = data.documents
            const id = data.documents
           
            id.forEach(element => {
               
                console.log(element.$id)
                const id_ = element.$id
                const name = element.Name
                 db.listDocuments(
                    "dash1", "ProductsDetail",
                    [
                        Query.equal('id_', id_)
                    ]
                ).then((data)=>{
                    const detail = data.documents
                    detail.forEach(element => {
                        this.Products.push({ Title: name, ...element })
                    });
                    console.log(this.Products)
                }).catch((err) => { console.log(err) });
            });
        })
      /*  db.listDocuments('dash1', 'ProductsDetail').then((data) => {
            const id = data.documents
            const fullname =  id.forEach(element => {
                console.log(element.id_)
                const id_ = element.id_
                 db.listDocuments(
                    "dash1", "ProductsName",
                    [
                        Query.equal('$id', id_)
                    ]
                ).then((data)=>{
                    
                    this.DataName.push(data.documents)
                    this.DataDetails.push(element)
                }).catch((err) => { console.log(err) });
              
                this.Products.push({ Title: this.DataName, ...id })
                
            });
            console.log(this.Products)          

            
        })*/
    }
}
</script>