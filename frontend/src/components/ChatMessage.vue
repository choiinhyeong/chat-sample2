<template>
  <li v-if="type==='my'" class="sent-message message">
    <div class="message-content">
      <div class="message-avatar">
        <ChatProfileImage :target="lrnerId"></ChatProfileImage>
      </div>
      <div class="message-bubble">
        <p class="message-text">{{message}}</p>
        <p class="message-meta"><span class="meta">{{lrnerName}} {{sendDate}}</span></p>
      </div>
    </div>
  </li>
  <li v-else class="incoming-message message">
    <div class="message-content">
      <div class="message-avatar">
        <ChatProfileImage :target="lrnerId"></ChatProfileImage>
      </div>
      <div class="message-bubble">
        <p class="message-text">{{message}}</p>
        <p class="message-meta"><span class="meta">{{lrnerName}}</span><span class="meta">{{sendDate}}</span></p>
      </div>
    </div>
  </li>
</template>

<script>
import {onMounted} from "vue";
import ChatProfileImage from "@/components/ChatProfileImage";

export default {
  name: "MyMessage",
  components: {ChatProfileImage},
  props:{
    type: String,
    message: String,
    lrnerId: String,
    lrnerName: String,
    sendDate: String,
  },setup(){

    // console.log(props.lrnerId,',',props.lrnerName)
    onMounted(() => {
      document.querySelector('.chat-screen').scrollTop = document.querySelector('.chat-screen').scrollHeight;
    });
  }
}
</script>

<style scoped>

</style>