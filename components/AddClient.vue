<template>
    <div class="ma-3">
        <v-card-title>
            Add New Client
        </v-card-title>
            <v-text-field label="Full name" >Full Name</v-text-field>
            <v-text-field label="Address" >Address</v-text-field>
            <v-text-field label="Wilaya" >Wilaya</v-text-field>
            <v-text-field label="Phone number" >Phone number</v-text-field>
            <v-text-field label="Items" >Items</v-text-field>
            <v-text-field label="Shiping" >Shiping</v-text-field>
            <v-text-field label="Total" >Total</v-text-field>
    </div>
</template>
<script>
export default {
    data() {
        return {
            overlay: false,
            zIndex: 0,
        }
    },
}
</script>