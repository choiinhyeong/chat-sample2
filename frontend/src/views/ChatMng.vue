<template>
  <div style="display: flex;">
    <div class="wrap">
      <div class="iframe-area" ref="iframeAreaEl"
           style="width: 100%;
           height: 100%;
           display: none;">
      </div>
    </div>
    <div class="wrap">
      <ul class="pages"
          style="height: 95%;
          position: relative;
          width: 100%;">
        <li class="chat page chatpage" ref="chatPageEl">
          <div class="chatArea">
            <ul class="messages" ref="messagesEl"></ul>
          </div>
          <input class="inputMessage" ref="inputMessageEl" v-model="inputMessage" @keyup.enter="sendMessage" @keyup="updateTyping" placeholder="Type here..."/>
        </li>
        <li class="login page loginpage" ref="loginPageEl">
          <div class="form">
            <h3 class="title">닉네임을 입력하세요.</h3>
            <input class="usernameInput" v-model="userName" @keyup.enter="sendUserName" type="text" maxlength="14"/>
          </div>
        </li>
      </ul>
      <div class="btnarea" ref="btnAreaEl" style="display: none;">
        <button type="button" class="iframe-btn" @click="showIframe">iframe show</button>
        <button type="button" class="iframe-hide-btn" @click="hideIframe">iframe hide</button>
        <button type="button" class="yt-btn" @click="youtubeFunc">유튜브</button>
        <button type="button" @click="showQuiz" ref="showQuizEl">퀴즈앤</button>
        <button type="button" @click="freezeFunc" ref="freezeEl">잠금</button>
        <button type="button" class="exitButtion" style="display: none;" @click="sendDisconnect">퇴장</button>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import io from 'socket.io-client'

export default {
  name: "ChatMng",
  setup(){

    let socketDns = "http://localhost:8081";

    let socket = io(socketDns, { transports: ['websocket'], path:'/websocket' });
    let socket2 = io(socketDns, { transports: ['websocket'], path:'/socket.io' });

    const userName = ref('');
    const socketId = ref('');
    const inputMessage = ref('');

    const connected = ref(false);
    const iframeAreaEl = ref(null);
    const chatPageEl = ref(null);
    const loginPageEl = ref(null);
    const btnAreaEl = ref(null);
    const messagesEl = ref(null);
    const freezeEl = ref(null);
    const inputMessageEl = ref(null);
    const showQuizEl = ref(null);

    onMounted(() => {
      console.log('onmounted;;',chatPageEl.value)
    })


    const sendUserName = () => {
      console.log('sendUserName;;',userName.value)

      let channelNo ="channel1";
      let userId ="userid1";

      let data = {
        sendType:'connection',
        userName : userName.value,
        channelNo : channelNo,
        userId : userId,
        message : "입장"
      }

      socket.emit('chat_channel_connection', data);
      socket2.emit('message_channel_connection', data);
    }

    const sendMessage = () => {
      let channelNo = "channel1";
      let userId = "userid1";
      let message = inputMessage.value
      inputMessage.value = '';

      let data = {
        sendType: 'message',
        socketId: socketId,
        userName: userName.value,
        channelNo: channelNo,
        userId: userId,
        message: message
      }

      // tell server to execute 'new message' and send along one parameter
      socket.emit('message', data);
      messagesEl.value.style.scrollTop = messagesEl.value.style.scrollHeight;
    }

    const sendDisconnect = () => {
      let channelNo = "channel1";
      let userId = "userid1";

      let data = {
        sendType: 'disconnect',
        userName: userName.value,
        channelNo: channelNo,
        userId: userId,
        message: ''
      }
      console.log('sendDisconnect;;', data);
      // tell server to execute 'new message' and send along one parameter
      socket.emit('disconnectCustom', data);
      socket2.emit('disconnectCustom', data);
    }


    socket.on('chat_channel_connection', (data) => {
      console.log('socket chat_channel_connection;;;;')
      let userName = data.userName;
      socketId.value = data.socketId;
      let li = document.createElement('li')
      li.innerText = userName + "님이 채팅채널에 입장 하였습니다.";
      messagesEl.value.append(li);

      chatPageEl.value.style.display='block'
      btnAreaEl.value.style.display='block'
      loginPageEl.value.style.display='none'
    });

    socket.on('message', (data) => {
      let userName = data.userName;
      let message = data.message;
      let li = document.createElement('li')
      li.innerText = userName + "  : " + message;
      messagesEl.value.append(li);
    });

    socket.on('disconnect', (data) => {
      console.log('disconnect;;', data)
      let userName = data.userinfo.userName;
      let li = document.createElement('li')
      li.innerText = userName + "님이 퇴장하였습니다.";
      messagesEl.value.append(li);
    });

    socket.on('disconnectCustom', (data) => {
      console.log('disconnectCustom;;', data.userinfo)
      let userName = data.userinfo.userName;
      let li = document.createElement('li')
      li.innerText = userName + "님이 퇴장하였습니다.";
      messagesEl.value.append(li);
    });

    const showQuiz = () => {

      let url = 'https://quizn.show/p/';
      let channelNo = "channel1";
      let userId = "userid1";
      let data = {
        sendType: 'message',
        socketId: socketId.value,
        userName: userName.value,
        channelNo: channelNo,
        userId: userId,
        messageType: 'quizn',
        url: url
      }

      socket2.emit('message', data)
    }

    const showIframe = () => {
      console.log('iframeBtn;;');
      let channelNo = "channel1";
      let userId = "userid1";
      let data = {
        sendType: 'message',
        socketId: socketId.value,
        userName: userName.value,
        channelNo: channelNo,
        userId: userId,
        messageType: 'iframeShow'
      }

      socket2.emit('message', data)
    }

    const hideIframe = () => {
      console.log('iframeHideBtn;;');
      let channelNo = "channel1";
      let userId = "userid1";
      let data = {
        sendType: 'message',
        socketId: socketId.value,
        userName: userName.value,
        channelNo: channelNo,
        userId: userId,
        messageType: 'iframeHide'
      }

      socket2.emit('message', data)
    }

    const youtubeFunc = () => {
      console.log('ytBtn;;')
      let channelNo = "channel1";
      let userId = "userid1";
      let data = {
        sendType: 'message',
        socketId: socketId.value,
        userName: userName.value,
        channelNo: channelNo,
        userId: userId,
        messageType: 'youtube'
      }

      socket2.emit('message', data)
    }

    const freezeFunc = () => {
      console.log('freezeFunc;;')
      let channelNo = "channel1";
      let userId = "userid1";
      let data = {
        sendType: 'message',
        socketId: socketId.value,
        userName: userName.value,
        channelNo: channelNo,
        userId: userId,
        messageType: 'freeze'
      }

      socket2.emit('message', data)
    }

    socket2.on('message_channel_connection', (data) => {
      console.log('socket2 message_channel_connection;;;;', data)
    });

    socket2.on('message', (data) => {
      console.log('socket2 message;;;;', data);
      if (data.messageType === 'youtube') {
        window.open('https://www.youtube.com/', '_blank');
      } else if (data.messageType === 'iframeShow') {
        iframeAreaEl.value.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/F2bMUR6GyNM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>';
        iframeAreaEl.value.style.display = 'block';
      } else if (data.messageType === 'iframeHide') {
        iframeAreaEl.value.innerHTML = '';
        iframeAreaEl.value.style.display = 'none';
      }else if(data.messageType === 'quizn'){
        iframeAreaEl.value.innerHTML = '<iframe width="100%" height="100%" src="'+data.url+'" title="quizn" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>';
        iframeAreaEl.value.style.display = 'block';
      }else if(data.messageType === 'freeze'){
        if(!inputMessageEl.value.disabled){
          inputMessageEl.value.disabled = true;
          freezeEl.value.innerText = '해제'
        }else{
          inputMessageEl.value.disabled = false;
          freezeEl.value.innerText = '잠금'
        }
      }
    });

    socket2.on('disconnect', () => {
      console.log('socket2 disconnect;;;;')
    });

    socket2.on('disconnectCustom', () => {
      console.log('socket2 disconnectCustom;;;;')
    });

    // events => Updates the typing event
    const updateTyping = () => {
      let typing = true;
      if (connected.value) {
        if (!typing) {
          typing = true;
          socket.emit('typing');
        }
        let lastTypingTime = (new Date()).getTime();

        setTimeout(() => {
          let typingTimer = (new Date()).getTime();
          let timeDiff = typingTimer - lastTypingTime;
          if (timeDiff >= 400 && typing) {
            socket.emit('stop typing');
            typing = false;
          }
        }, 400);
      }
    }

    return {
      userName,
      socketId,
      inputMessage,
      connected,
      iframeAreaEl,
      chatPageEl,
      loginPageEl,
      btnAreaEl,
      messagesEl,
      freezeEl,
      inputMessageEl,
      showQuizEl,

      sendUserName,
      sendMessage,
      sendDisconnect,
      showQuiz,
      showIframe,
      hideIframe,
      youtubeFunc,
      freezeFunc,
      updateTyping,
    }
  }
}
</script>

<style scoped>
/* add css */
.wrap{
  flex-direction: row;
  width: 100%;
  height: 100vh;
  border: 2px solid lightgray;
  border-radius: 5px;
}

/* Fix user-agent */

* {
  box-sizing: border-box;
}

html {
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}

html, input {
  font-family:
      "HelveticaNeue-Light",
      "Helvetica Neue Light",
      "Helvetica Neue",
      Helvetica,
      Arial,
      "Lucida Grande",
      sans-serif;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  word-wrap: break-word;
}

/* Pages */

.pages {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

.page {
  height: 100%;
  position: absolute;
  width: 100%;
}

/* Login Page */

.login.page {
  /*background-color: #000;*/
}

.login.page .form {
  height: 100px;
  margin-top: -100px;
  position: absolute;

  text-align: center;
  top: 50%;
  width: 100%;
}

.login.page .form .usernameInput {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #000;
  outline: none;
  padding-bottom: 15px;
  text-align: center;
  width: 400px;
}

.login.page .title {
  font-size: 200%;
}

.login.page .usernameInput {
  font-size: 200%;
  letter-spacing: 3px;
}

.login.page .title, .login.page .usernameInput {
  color: #000;
  font-weight: 100;
}

/* Chat page */

.chat.page {
  display: none;
}

/* Font */

.messages {
  font-size: 150%;
}

.inputMessage {
  font-size: 100%;
}

.log {
  color: gray;
  font-size: 70%;
  margin: 5px;
  text-align: center;
}

/* Messages */

.chatArea {
  height: 100%;
  padding-bottom: 60px;
}

.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;
}

.message.typing .messageBody {
  color: gray;
}

.username {
  font-weight: 700;
  overflow: hidden;
  padding-right: 15px;
  text-align: right;
}

/* Input */

.inputMessage {
  border: 1px solid gray;
  bottom: 0;
  height: 60px;
  left: 0;
  outline: none;
  padding-left: 10px;
  position: absolute;
  right: 0;
  width: 100%;
}


</style>