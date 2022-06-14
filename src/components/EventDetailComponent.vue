<template>
    <main class="min-h-screen w-full text-gray-100 place-items-center">
      <div class="max-h-[750px] overflow-hidden w-screen">
          <img :src="image" class="w-full h-full" alt="event image" />
      </div>
        <div class="w-11/12 mx-auto mt-12 flex items-center justify-center grid grid-cols-1 gap-8 text-center max-w-[750px]">
            <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-bold text-black">{{ name }}</h1>
            <p class="text-md lg:text-lg pb-4 text-black"><strong>{{ dateFormat(new Date(startDate*1000)) }}</strong> - <strong>{{ dateFormat(new Date(endDate*1000)) }}</strong></p>
            <p class="text-md lg:text-lg pb-4 text-black h-full">{{ description }}</p>
       </div>
    </main>
</template>

<script>
import moment from 'moment'

export default {
  props: {
        name: {
          type: String,
        },
        startDate: {
          type: Number,
        },
        endDate: {
          type: Number,
        },
        image: {
          type: String,
        },
        description: {
          type: String,
        },
  },
   methods: {
    dateFormat(v) {
    return moment(v).format("DD/MM/YYYY/HH:mm");
    },
  },
}

</script>