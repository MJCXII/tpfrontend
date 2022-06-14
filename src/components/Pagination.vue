<template>
<div>
  <ul class="flex flex-row gap-2">
    <li>
      <button @click="(onFirstPageClick())">First</button>
    </li>
    <li>
      <button @click="(onPreviousPageClick())">&lt</button>
    </li>
    <li>
      <button @click="(onNextPageClick())">&gt</button>
    </li>
    <li>
      <button @click="(onLastPageClick())">Last</button>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    events: {
        type: Object,
        required: false,
        default: [],
    },
  },
  methods: {
    onFirstPageClick() {
      this.$router.push("/events?page=1"); 
    },
    onPreviousPageClick() {
      if(this.$route.query.page > 1) {
        this.$router.push("/events?page=" + (this.events.meta.current_page - 1));
      }
    },
    onNextPageClick() {
      if(this.$route.query.page < this.events.meta.last_page) {
        this.$router.push("/events?page=" + (this.events.meta.current_page + 1));
      }
    },
    onLastPageClick() {
      this.$router.push("/events?page=" + this.events.meta.last_page);
    },

  }
  
}
</script>

<style scoped>
 button {
     @apply bg-green-400 px-4 py-2 rounded-3xl text-white border-2;
 }
</style>