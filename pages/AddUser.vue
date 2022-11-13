<template>
    <v-container>
        <v-card class="pa-2  rounded-xl" elevation="5">
            <div class="d-flex flex-column  ">
                <v-card-title class="">Add user</v-card-title>
                <v-card-subtitle>
                    <v-text-field label="Name"></v-text-field>
                    <v-text-field label="Email" type="email"></v-text-field>
                    <v-text-field label="Password" type="password"></v-text-field>
                    <v-text-field label="Password Confirmation" type="password"></v-text-field>
                    <p>Pick a type</p>
                    <v-radio-group v-model="type" >
                        <v-radio label="Validator" value="Validator"></v-radio>
                        <v-radio label="Affiliate" value="Affiliate"></v-radio>
                        <v-radio label="Admin" value="Admin"></v-radio>
                    </v-radio-group>
                </v-card-subtitle>
            </div>
            <div class=" d-flex justify-end">
                <v-btn class="green white--text rounded-xl">Add user</v-btn>
            </div>

        </v-card>
    </v-container>
</template>
<script>
export default {
    data: {
        type:'',
    }
}
</script>