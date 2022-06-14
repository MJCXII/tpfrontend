<template>
  <main class="min-h-screen text-black grid place-items-center">
      <div class="w-11/12 mx-auto max-w-screen-xl py-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-screen-xl">
            <list :events="events"></list>
      </div>
      <pagination class=" bottom-0" :events="events"></pagination>
  </main>
</template>

<script>

import EventListComponent from '@/components/EventListComponent.vue'
import {
    useUserStore
} from "@/stores/auth.js";
import Pagination from '@/components/Pagination.vue'

export default {
    data() {
        return {
            events: [],
        }
    },
    components: {
        'list': EventListComponent,
        'pagination': Pagination
    },
    setup() {
        const user = useUserStore();
        return {
            user
        }
    },
    watch: {
        $route(to, from) {
            this.fetchEvents();
        },
    },
    methods: {
        async fetchEvents() {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            await fetch(`http://127.0.0.1:8000/api/events?page=${this.$route.query.page}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.events = result;
                }).catch(error => console.log('error', error));
        }
    },

    async mounted() {
        this.$router.push('/events?page=1');
        await this.fetchEvents();
    },
}

</script>