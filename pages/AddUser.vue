<template>
    <v-container>
        <v-card class="pa-2  rounded-xl" elevation="5">
            <div class="d-flex flex-column  ">
                <v-card-title class="">Add user</v-card-title>
                <v-card-subtitle>
                    <v-text-field v-model="name" label="Name"></v-text-field>
                    <v-text-field v-model="email" label="Email" type="email"></v-text-field>
                    <v-text-field v-model="pass0" label="Password" type="password"></v-text-field>
                    <v-text-field v-model="pass" label="Password Confirmation" type="password"></v-text-field>
                    <p>Pick a type</p>
                    <v-radio-group v-model="type">
                        <v-radio label="Validator" value="Validator"></v-radio>
                        <v-radio label="Affiliate" value="Affiliate"></v-radio>
                        <v-radio label="Admin" value="Admin"></v-radio>
                    </v-radio-group>
                </v-card-subtitle>
            </div>
            <div class=" d-flex justify-end">
                <v-btn @click="AddUser()" class="green white--text rounded-xl">Add user</v-btn>
                <v-btn @click="GetDoc()" class="green white--text rounded-xl">Get user</v-btn>
            </div>

        </v-card>
    </v-container>
</template>
<script>
import { ID, account, db, Permission, Role } from "../appwrite.js";
export default {
    data: {
        type: '',
        name: '',
        pass0: '',
        pass: '',
        email: '',
    },
    methods: {
        AddUser() {
            if (this.pass0 == this.pass) {
                account.create(ID.unique(), this.email, this.pass, this.name)
                    .then((data) => {
                        console.log(data)
                        const userID = data.$id
                        if (this.type == 'Validator') {
                            db.createDocument('dash1', 'user1', userID, { 'UserType': 'Validator','Username': this.name , 'Email':this.email });
                        } else if (this.type == 'Affiliate') {
                            db.createDocument('dash1', 'user1', userID, { 'UserType': 'Affiliate','Username': this.name , 'Email':this.email });
                        } else {
                            db.createDocument('dash1', 'user1', userID, { 'UserType': 'Admin','Username': this.name , 'Email':this.email });
                        }
                        //  const dbcUsers = db.createDocument('dash1', 'user1', '[DOCUMENT_ID]', {});


                    })
                    .catch((err) => { alert(err) })
            } else {
                alert('Your password is not correct')
            }

        },
        GetDoc() {
            db.listDocuments('dash1', 'user1').then((data) => {
                console.log(data)
            });
        }
    },
}
</script>