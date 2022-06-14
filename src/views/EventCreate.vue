<template>
    <main class="w-11/12 mx-auto min-h-screen text-black">
        <div class="flex items-center justify-content my-12 flex-col gap-4 text-center">
            <h1 class="text-center uppercase font-bold text-2xl lg:text-3xl xl:text-4xl">Create an event</h1>
            <span v-if="successMessage" class="text-green-400 text-xl">{{successMessage}}</span>
            <span v-if="error" class="uppercase font-bold text-red-500 text-xl max-w-[350px]">{{error}}</span>
            <div v-if="errorReasons.length" className="flex items-center justify-center flex-col">
                <p>The fields that errored and their reasons are listed below...</p>
                <ul class="text-left">
                    <li v-for="error in errorReasons">
                        <ul class="text-left list-disc">
                            <li v-for="singleError in error">{{singleError}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="">
            <Form @submit="onSubmit" :validation-schema="schema" enctype="multipart/form-data" class="flex items-center justify-center flex-col w-full gap-10 max-w-[550px] mx-auto">

                <div class="w-full relative">
                    <label class="text-black text-md font-bold mb-2 ml-4" for="eventname">Event Name <span class="text-rose-500">*</span></label>
                    <Field name="eventname" class="w-full border-2 border-gray-200 rounded-3xl px-4 py-4" type="text" placeholder="Event Name" />
                    <ErrorMessage name="eventname" class="mt-2 block text-red-500 absolute -bottom-[26px] left-4" />
                </div>
                <div class="w-full relative">
                    <label class="text-black text-md font-bold mb-2 ml-4" for="eventname">Start Date <span class="text-rose-500">*</span></label>
                    <Field name="startdate" class="w-full border-2 border-gray-200 rounded-3xl px-4 py-4" type="datetime-local" placeholder="Start Date" />
                    <ErrorMessage name="startdate" class="mt-2 block text-red-500 absolute -bottom-[26px] left-4" />

                </div>
                <div class="w-full relative">
                    <label class="text-black text-md font-bold mb-2 ml-4" for="eventname">End Date <span class="text-rose-500">*</span></label>
                    <Field name="enddate" class="w-full border-2 border-gray-200 rounded-3xl px-4 py-4" type="datetime-local" placeholder="End Date" />
                    <ErrorMessage name="enddate" class="mt-2 block text-red-500 absolute -bottom-[26px] left-4" />

                </div>
                <div class="w-full relative">
                    <label class="text-black text-md font-bold mb-2 ml-4" for="eventname">Event Description <span class="text-rose-500">*</span></label>
                    <Field name="eventdescription" class="w-full border-2 border-gray-200 rounded-3xl px-4 py-4" type="textarea" placeholder="Event Description" />
                    <ErrorMessage name="eventdescription" class="mt-2 block text-red-500 absolute -bottom-[26px] left-4" />

                </div>
                <div class="w-full relative">
                    <label class="text-black text-md font-bold mb-2 ml-4" for="eventname">Event Image <span class="text-rose-500">*</span></label>
                    <Field name="image" v-slot="{ handleChange, handleBlur }">
                  <input type="file" class="w-full border-2 border-gray-200 rounded-3xl px-4 py-4" accept="image/*" @change="handleChange" @blur="handleBlur" />
                 </Field>
                </div>
                <input value="Create Event" class="bg-green-400 text-gray-100 active:scale-95 block duration-300 text-base px-5 py-4 w-1/2 mx-auto rounded-full mt-6 mx-auto" type="submit">
            </Form>
        </div>
    </main>
</template>

<script>

import {
    Field,
    ErrorMessage,
    Form
} from "vee-validate";
import * as Yup from "yup";
import {
    useUserStore
} from "@/stores/auth.js";
//  import { watch } from "vue";
import moment from "moment";

export default {
    components: {
        Field,
        Form,
        ErrorMessage,
    },
    setup() {
        const user = useUserStore();
        return {
            user
        }
    },
    data() {

        const schema = Yup.object({
            eventname: Yup.string().required(),
            startdate: Yup.string().required(),
            enddate: Yup.string().required(),
            eventdescription: Yup.string().required(),
        })
        return {
            schema,
            error: "",
            successMessage: "",
            errorReasons: [],
        }
    },
    created() {
        if (!this.user.isAuthenticated) {
            this.$router.push('/');
        }
    },
    methods: {
        handleChange: (event) => {
            console.log('[handleChange]', event);
        },
        handleBlur: (event) => {
            console.log('[handleBlur]', event);
        },
        async onSubmit(values) {
            this.error = "";
            this.successMessage = "";
            this.errorReasons = [];
            console.log(values);
            try {
                var formData = new FormData();

                const {
                    eventname,
                    eventdescription,
                    image,
                    enddate,
                    startdate
                } = values;

                const startDate = new Date(startdate);
                const endDate = new Date(enddate);

                const startDateUnix = Math.floor(startDate.getTime() / 1000); 
                const endDateUnix = Math.floor(endDate.getTime() / 1000); 

                formData.append("name", eventname);
                formData.append("description", eventdescription);
                formData.append("image", image[0], image[0].name);
                formData.append("startDate", Number(startDateUnix));
                formData.append("endDate", Number(endDateUnix));

                var requestOptions = {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + this.user.accessToken,
                    },
                    body: formData,
                };

                await fetch("http://127.0.0.1:8000/api/events", requestOptions).then(response => response.json()).then(result => {
                    this.error = "";
                    if (result.errors) {
                        this.error = "There has been some errors in your submission";
                        Object.values(result.errors).map((err, i) => this.errorReasons.push(err));
                    } else {
                        this.error = "";
                        this.errorReasons = [];
                        this.successMessage = "Your event has been created!";
                    }
                }).catch(err => {
                    this.successMessage = "";
                    this.errorReasons = [];
                    this.error = "There was an error submitting your event."
                });

            } catch (err) {
                this.error = "There was either an error with our API, or you haven't filled any fields.";
                this.errorReasons = [];
            }
        },
    },
}; 
</script>
