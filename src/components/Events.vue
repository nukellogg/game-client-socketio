<template>
  <v-container>
    <h1>We are {{ socketid }}</h1>
    <v-btn @click="pingServer">Say hi to the server!</v-btn>
    <h2 v-if="timer >= 0">Time Left: {{ timer }}</h2>
  </v-container>
</template>

<script>
import Vue from "vue";
import { sprinkleEmojis } from "emoji-sprinkle";

export default Vue.extend({
  name: "Events",
  data() {
    return {
      timer: -1,
      socketid: "",
    };
  },
  created() {
    this.$socket.$subscribe("connect", () => {
      console.log("socket connected");
    });
    this.$socket.$subscribe("ServerTimer", (val) => {
      console.log(`New timer value from server: ${val}`);
      this.timer = val;
    });
    this.$socket.$subscribe("ServerMessage", (msg) => {
      console.log(`Server: ${msg}`);
    });
    this.$socket.$subscribe("ServerPing", (msg) => {
      sprinkleEmojis({ emoji: msg });
    });
    this.$socket.$subscribe("ServerIdentify", (id) => {
      this.socketid = id;
    });
  },
  methods: {
    pingServer() {
      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit("ClientPing");
    },
  },
});
</script>
