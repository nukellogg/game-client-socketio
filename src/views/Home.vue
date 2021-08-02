<template>
  <v-app>
    <v-main>
      <Events />
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Events from "@/components/Events.vue";

export default {
  name: "Home",
  components: {
    Events,
  },
};
</script>
