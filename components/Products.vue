<template>
    <div >
        <v-simple-table class="rounded-xl">
            <template v-slot:default  >
                <thead >
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
                            Stock
                        </th>
                        <th class="text-left">
                            Price
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in Products" :key="data">
                        <td class="text-caption" >{{ data.$id }}</td>
                        <td class="text-caption" >{{ data.Title }}</td>
                        <td class="text-caption" >{{ data.Desc }}</td>
                        <td class="text-caption" >{{ data.Size }}</td>
                        <td class="text-caption" >{{ data.Colours }}</td>
                        <td class="text-caption" >{{ data.Price }} DA</td>
                        <td class="text-caption" >{{ data.Ref }} </td>
                        <td class="text-caption" ><v-btn @click="deleteClient(data)" outlined class="red white--text rounded-xl">delete</v-btn></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>
<script>
import { db } from "../appwrite.js"
export default {
    data() {
        return {
            Products: [],
        }
    },
    methods: {
        deleteClient(data){
           db.deleteDocument('dash1','products', data.$id).then(()=>{
                alert('Your client has been deleted')
            })
        }
    },
    beforeMount(){
        db.listDocuments('dash1','products').then((data)=>{
            console.log(data)
            this.Products = data.documents
        })
    }
}
</script>