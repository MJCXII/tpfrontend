<template>
  <main class="min-h-screen text-gray-100 grid place-items-center">
      <div v-if="eventDetail">
          <detail v-bind="eventDetail.data"/>
      </div>
  </main>
</template>


<script>

    import EventDetailComponent from '@/components/EventDetailComponent.vue'

export default {
    components: {
        'detail': EventDetailComponent,
    },
    name: "get-request",

    data() {
        return {
            eventDetail: null,
        };
    },
    async mounted() {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch(`http://127.0.0.1:8000/api/events/${this.$route.params.eventid}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.eventDetail = result;
            }).catch(error => console.log('error', error));

    }
};

</script>