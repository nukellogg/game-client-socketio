<template>
  <v-container>
    <h1>socketid: {{ socketid }}</h1>
    <v-btn @click="pingServer">Say hi to everyone!</v-btn>
    <h2 v-if="timer >= 0">Time Left: {{ timer }}</h2>
    <h3>Conversations List:</h3>
    <ul>
      <li v-for="(topic, index) in allTopics" :key="index">
        <v-btn @click="joinConversation(topic)">{{ topic }}</v-btn>
        <v-btn @click="removeConversation(topic)">-</v-btn>
        </li>
    </ul>
    <h3>Create Conversation</h3>
    <v-text-field
      v-model="newTopic"
      label="New Topic"
    ></v-text-field>
    <v-btn
      @click="createConversation"
      success
    >Create</v-btn>
    <h3>My Conversations:</h3>
    <ul>
      <li v-for="(topic, index) in myTopics" :key="index">
        {{ topic }}
        <v-btn @click="leaveConversation(topic)">Leave</v-btn>
      </li>
    </ul>
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
      allTopics: [],
      myTopics: [],
      newTopic: '',
    };
  },
  created() {
    this.$socket.$subscribe("connect", () => {
      console.log("socket connected");
    });
    this.$socket.$subscribe("server:timer", (val) => {
      console.log(`New timer value from server: ${val}`);
      this.timer = val;
    });
    this.$socket.$subscribe("server:message", (msg) => {
      console.log(`Server: ${msg}`);
    });
    this.$socket.$subscribe("server:ping", (msg) => {
      sprinkleEmojis({ emoji: msg });
    });
    this.$socket.$subscribe("server:identify", (id) => {
      this.socketid = id;
    });
    this.$socket.$subscribe("server:conversation:list:all", (topics) => {
      console.log("Received server:conversation:list:all event.");
      this.allTopics = topics;
    })
    this.$socket.$subscribe("server:conversation:list:personal", (topics) => {
      console.log("Received server:conversation:list:personal event.");
      this.myTopics = topics;
    });
  },
  methods: {
    pingServer() {
      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit("client:ping");
    },
    joinConversation(topic) {
      this.$socket.client.emit("client:conversation:join", topic);
    },
    leaveConversation(topic) {
      this.$socket.client.emit("client:conversation:leave", topic);
    },
    createConversation() {
      this.$socket.client.emit("client:conversation:create", this.newTopic);
      this.newTopic = '';
    },
    removeConversation(topic) {
      this.$socket.client.emit("client:conversation:remove", topic);
    },
  },
});
</script>
