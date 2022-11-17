<template>
    <v-container>
        <v-card
            class="d-xs-block d-sm-flex flex-wrap align-xs-content-center align-center justify-xs-center justify-sm-space-between rounded-xl"
            elevation="0">
            <v-col cols="6">
                <v-card-title>Data Table</v-card-title>
            </v-col>
            <v-col class=" d-flex justify-xs-center justify-sm-end " cols="6">

                <v-btn v-show="AddNew == false" @click="ShowIf()" class=" rounded-xl white--text" color="blue">Add
                    new
                    client</v-btn>
                <v-btn v-show="AddNew" @click="AddNewClient()" class=" rounded-xl ">Add Client</v-btn>
                <v-btn v-show="AddNew" @click="AddNew = !AddNew" class=" rounded-xl white--text" color="red">Close
                </v-btn>

            </v-col>

        </v-card>
        <v-card class="my-2 pa-2 rounded-xl " elevation="5" outlined>
            <v-card-title>
                Add New Client
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle class="d-flex">
                <div >
                    <v-btn type="button"
                        class="flex justify-start ml-2 rounded-md border px-3 py-2 bg-pink-600 text-white"
                        @click="addMore()">
                        Add More
                    </v-btn>
                    <div v-for="(course, index) in courses" :key="index">
                        <div class="d-flex">
                            
                            <v-text-field v-model="course.courseName" placeholder="enter you course name"
                                class="w-full py-2 border border-indigo-500 rounded" />
                            <v-btn type="button" class="ml-2 rounded-md border px-3 py-2 bg-red-600 text-white"
                                @click="remove(index)" v-show="index != 0">
                                Remove
                            </v-btn>
                        </div>
                    </div>
                </div>



            </v-card-subtitle>

        </v-card>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            courses: [
                {
                    courseName: "",
                },
            ],
            counter: []
        }
    },
    methods: {

        addMore() {
            this.courses.push({
                courseName: "",
            });
        },
        remove(index) {
            this.courses.splice(index, 1);
        },


    },
}
</script>