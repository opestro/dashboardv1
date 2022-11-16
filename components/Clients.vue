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
                            FullName
                        </th>
                        <th class="text-left">
                            Address
                        </th>
                        <th class="text-left">
                            Wilaya
                        </th>
                        <th class="text-left">
                            PhoneNumber
                        </th>
                        <th class="text-left">
                            Items
                        </th>
                        <th class="text-left">
                            Shiping
                        </th>
                        <th class="text-left">
                            Total
                        </th>
                        <th class="text-left">
                            Status
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in clients" :key="data">
                        <td class="text-caption" >{{ data.$id }}</td>
                        <td class="text-caption" >{{ data.FullName }}</td>
                        <td class="text-caption" >{{ data.Address }}</td>
                        <td class="text-caption" >{{ data.Wilaya }}</td>
                        <td class="text-caption" >{{ data.PhoneNumber }}</td>
                        <td class="text-caption" >{{ data.Items }}</td>
                        <td class="text-caption" >{{ data.Shiping }}</td>
                        <td class="text-caption" >{{ data.Total }}</td>
                        <td class="text-caption" >{{ data.Status }}</td>
                        <td class="text-caption" ><v-btn @click="deleteClient(data)" class="red white--text rounded-xl">delete</v-btn></td>
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
            clients: [],
        }
    },
    methods: {
        deleteClient(data){
            this.$axios.delete('/clients'+data.id).then(()=>{
                alert('Your client has been deleted')
            })
        }
    },
    beforeMount(){
        db.listDocuments('dash1','orders').then((data)=>{
            console.log(data)
            this.clients = data.documents
        })
    }
}
</script>