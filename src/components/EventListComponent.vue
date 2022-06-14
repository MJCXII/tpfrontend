<template>
    <div class="border-2 rounded-3xl max-w-[450px] mx-auto w-full p-6 lg:p-6 text-center flex flex-col grid grid-rows-12 grid-cols-1 items-center justify-center" v-for="event in events.data">
        <img :src="event.image" class="w-full h-52 rounded-3xl row-span-6" alt="event image">
        <h1 class="text-xl font-bold row-span-2 my-2 leading-6">{{ event.name }}</h1>
        <p class="text-sm pb-4 row-span-2">{{ dateFormat(new Date(event.startDate*1000)) }}</p>
        <router-link :to="'/events/details/' + event.id" class="border-2 bg-green-400 text-white border-gray-200 rounded-3xl py-3 px-8 row-span-2">View Event</router-link>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    events: {
        type: Object,
        required: false,
        default: [],
    },
  },
   methods: {
    dateFormat(v) {
      return moment(v).format("DD/MM/YYYY");
    },
  },
};
</script>