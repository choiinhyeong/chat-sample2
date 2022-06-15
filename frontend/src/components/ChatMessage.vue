<template>
  <li v-if="type==='my'" class="sent-message message">
    <div class="message-content">
      <div class="message-avatar">
        <img src="../assets/images/@tmp/@tmp_profile.jpg" />
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
        <img src="../assets/images/@tmp/@tmp_profile_02.jpg" />
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

export default {
  name: "MyMessage",
  props:{
    type: String,
    message: String,
    lrnerName: String,
    sendDate: String,
  },setup(props){

    onMounted(() => {
      document.querySelector('.chat-screen').scrollTop = document.querySelector('.chat-screen').scrollHeight;
    });
    console.log('props;;',props.message,',',props.lrnerName,',',props.sendDate,',',props.type)
  }
}
</script>

<style scoped>

</style>