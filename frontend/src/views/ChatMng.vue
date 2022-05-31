<template>
  <div style="display: flex;">
    <div class="wrap left-wrap">
      <div style="width: 100%; height:100%;">
        <div class="iframe-area" ref="iframeAreaEl"></div>
        <div class="connect-area" ref="connectAreaEl" style="display: none;">
          <ConnectLive v-if="isConnectLive"></ConnectLive>
          <ConnectLiveConf v-if="isConnectLiveConf"></ConnectLiveConf>
          <ConnectLiveOne v-if="isConnectLiveOne"></ConnectLiveOne>
        </div>
      </div>
      <div class="btnarea" ref="btnAreaEl" style="display: none;">
<!--        <button type="button" class="iframe-btn" @click="showIframe">iframe</button>-->
        <button type="button" @click="showQuiz" ref="showQuizEl">퀴즈앤</button>
        <button type="button" @click="connectLiveFunc">커넥트라이브</button>
        <button type="button" @click="connectLiveConfFunc">커넥트라이브_</button>
<!--        <button type="button" class="yt-btn" @click="youtubeFunc">유튜브</button>-->
        <button type="button" @click="freezeFunc" ref="freezeEl">채팅잠금</button>
<!--        <button type="button" @click="getUserFunc">db 회원조회</button>-->
        <button type="button" class="iframe-hide-btn" @click="hideIframe">화면 초기화</button>
        <button type="button" class="exitButtion" @click="sendDisconnect">퇴장</button>
      </div>
    </div>
    <div class="wrap right-wrap">
      <ul class="pages">
        <li class="chat page chatpage" ref="chatPageEl">
          <div class="chatArea">
            <ul class="messages" ref="messagesEl"></ul>
          </div>
          <div style="position: absolute; width: 100%; bottom: 0px;">
            <input class="usernameInput" v-model="userType" type="text" maxlength="14" @keyup="updateType"/>
            <input class="inputMessage" ref="inputMessageEl" v-model="inputMessage" @keyup.enter="sendMessage" @keyup="updateTyping" placeholder="메세지를 입력하세요."/>
            <button type="button" @click="sendMessage">전송</button>
          </div>
        </li>
        <li class="login page loginpage" ref="loginPageEl">
          <div class="form">
            <label>타입</label>
            <input class="usernameInput" v-model="userType" @keyup.enter="sendUserName" type="text" maxlength="14"/>
          </div>
          <div class="form">
            <label>채널</label>
            <input class="usernameInput" v-model="channelNo" @keyup.enter="sendUserName" type="text" maxlength="14"/>
          </div>
          <div class="form">
            <label>닉네임</label>
            <input class="usernameInput" v-model="userName" @keyup.enter="sendUserName" type="text" maxlength="14"/>
          </div>
          <div class="form">
            <button type="button" @click="sendUserName">접속</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import io from 'socket.io-client'
import ConnectLive from "@/components/ConnectLive";
import ConnectLiveOne from "@/components/ConnectLiveOne";
import ConnectLiveConf from "@/components/ConnectLiveConf";
import {useStore} from "vuex";
import {ACT_GET_USERS} from "@/store/modules/user/users";


export default {
  name: "ChatMng",
  components:{
    ConnectLiveConf,
    ConnectLiveOne,
    ConnectLive
  },
  setup(){

    const store = useStore();

    let socketDns = "http://localhost:3000";

    let socket = io(socketDns, { transports: ['websocket'], path:'/websocket/chat' }); //채팅소켓
    let socket2 = io(socketDns, { transports: ['websocket'], path:'/websocket/system' }); // 컨트롤소켓

    const userName = ref('');
    const channelNo = ref('');
    const userType = ref('');
    const socketId = ref('');
    const socketId2 = ref('');
    const inputMessage = ref('');
    const iframeAreaEl = ref();
    const connectAreaEl = ref();
    const chatPageEl = ref();
    const loginPageEl = ref();
    const btnAreaEl = ref();
    const messagesEl = ref();
    const freezeEl = ref();
    const inputMessageEl = ref();
    const showQuizEl = ref();
    const connected = ref(false);
    const isConnectLive = ref(false);
    const isConnectLiveOne = ref(false);
    const isConnectLiveConf = ref(false);

    onMounted(() => {
      // console.log('onmounted-----',socket.disconnected,',',socket.disconnected);
      sendUserName();
    })

    let userId ="userId1";
    channelNo.value = 'ch1';
    userName.value = 'choi';
    userType.value = 'admin'

    /**
     * 클라이언트 이벤트
     */
    const sendUserName = () => {
      if(channelNo.value==='' || userName.value ===''){
        alert('채널과 닉네임을 입력해주세요.')
        return false;
      }

      // 퇴장클릭시 소켓 끊김으로 재연결
      if(socket.disconnected){
        socket.connect();
        socket2.connect();
      }

      let data = {
        sendType:'connection',
        userName : userName.value,
        channelNo : channelNo.value,
        userId : userId,
        message : "입장"
      }

      socket.emit('chat_channel_connection', data);
      socket2.emit('message_channel_connection', data);
    }

    const sendMessage = () => {
      let data = {
        sendType: 'message',
        socketId: socketId,
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        message: inputMessage.value
      }

      // tell server to execute 'new message' and send along one parameter
      socket.emit('message', data);
      messagesEl.value.style.scrollTop = messagesEl.value.style.scrollHeight;
      inputMessage.value = '';
    }

    const sendDisconnect = () => {
      console.log('sendDisconnect-----------');
      let data = {
        sendType: 'disconnect',
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        message: ''
      }

      socket.emit('disconnectCustom', data);
      socket2.emit('disconnectCustom', data);

      chatPageEl.value.style.display='none'
      btnAreaEl.value.style.display='none'
      loginPageEl.value.style.display='block'

      socket.disconnect();
      socket2.disconnect();
    }

    /**
     * socket이벤트들
     */
    socket.on('chat_channel_connection', (data) => {
      console.log('socket chat_channel_connection-----------',data)
      socketId.value = data.socketId;
      let li = document.createElement('li')
      li.innerText = data.userName + "("+userType.value+")님이 \""+channelNo.value+"\"채널에 입장했습니다.";
      messagesEl.value.append(li);

      chatPageEl.value.style.display='block'
      loginPageEl.value.style.display='none'
      if(userType.value === 'admin'){
        btnAreaEl.value.style.display='block'
      }
    });

    socket.on('message', (data) => {
      let li = document.createElement('li')
      li.innerText = data.userName + "  : " + data.message;
      console.log('messagesEl;;',messagesEl)
      messagesEl.value.append(li);
    });

    socket.on('disconnect', (data) => {
      console.log('disconnect-----------', data)
    });

    socket.on('disconnectCustom', (data) => {
      console.log('disconnectCustom--------------', data)
      let li = document.createElement('li')
      li.innerText = data.userinfo.userName + "님이 퇴장하였습니다.";
      messagesEl.value.append(li);
    });

    /**
     * socket2 이벤트
     */
    socket2.on('message_channel_connection', (data) => {
      console.log('socket2 message_channel_connection----------------', data)
      socketId2.value = data.socketId;
    });

    socket2.on('disconnect', () => {
      console.log('socket2 disconnect---------------')
    });

    socket2.on('disconnectCustom', () => {
      console.log('socket2 disconnectCustom--------------')
    });

    socket2.on('message', (data) => {
      console.log('socket2 message-------------------', data);
      if (data.messageType === 'youtube') {
        window.open('https://www.youtube.com/', '_blank');
      } else if (data.messageType === 'iframeShow') {
        iframeAreaEl.value.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/F2bMUR6GyNM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>';
        iframeShowFunc();
      } else if (data.messageType === 'iframeHide') {
        iframeAreaEl.value.innerHTML = '';
        iframeAreaEl.value.style.display = 'none';
        connectAreaEl.value.style.display = 'none';
        isConnectLive.value = false;
        isConnectLiveOne.value = false;
        isConnectLiveConf.value = false;
      }else if(data.messageType === 'quizn'){
        iframeAreaEl.value.innerHTML = '<iframe width="100%" height="100%" src="'+data.url+'" title="quizn" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>';
        iframeShowFunc();
      }else if(data.messageType === 'freeze'){
        if(!inputMessageEl.value.disabled){
          inputMessageEl.value.disabled = true;
          freezeEl.value.innerText = '해제'
        }else{
          inputMessageEl.value.disabled = false;
          freezeEl.value.innerText = '잠금'
        }
      }else if(data.messageType === 'connectLive'){
        isConnectLive.value = true;
        connectLiveShowFunc();
      }else if(data.messageType === 'connectLiveOne'){
        isConnectLiveOne.value = true;
        connectLiveShowFunc();
      }else if(data.messageType === 'connectLiveConf') {
        isConnectLiveConf.value = true;
        connectLiveShowFunc();
      }else if(data.messageType === 'getUser'){
        alert(data.res)
      }
    });

    const iframeShowFunc = () => {
      iframeAreaEl.value.style.display = 'block';
      connectAreaEl.value.style.display = 'none';
    }

    const connectLiveShowFunc = () => {
      iframeAreaEl.value.style.display = 'none';
      connectAreaEl.value.style.display = 'block';
    }

    /**
     * 기능 함수들
     */
    const connectLiveFunc = () => {
      console.log('connectLiveFunc-----------');
      let data = {
        sendType: 'message',
        socketId: socketId2.value,
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        messageType: 'connectLive',
      }
      socket2.emit('message', data);
    }

    const connectLiveOneFunc = () => {
      console.log('connectLiveOneFunc-----------');
      let data = {
        sendType: 'message',
        socketId: socketId2.value,
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        messageType: 'connectLiveOne',
      }
      socket2.emit('message', data);
    }

    const connectLiveConfFunc = () => {
      console.log('connectLiveFunc-----------');
      let data = {
        sendType: 'message',
        socketId: socketId2.value,
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        messageType: 'connectLiveConf',
      }
      socket2.emit('message', data);
    }

    const showQuiz = () => {
      let url = 'https://quizn.show/p/';
      let data = {
        sendType: 'message',
        socketId: socketId2.value,
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        messageType: 'quizn',
        url: url
      }

      socket2.emit('message', data)
    }

    const showIframe = () => {
      let data = {
        sendType: 'message',
        socketId: socketId2.value,
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        messageType: 'iframeShow'
      }

      socket2.emit('message', data)
    }

    const hideIframe = () => {
      let data = {
        sendType: 'message',
        socketId: socketId2.value,
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        messageType: 'iframeHide'
      }

      socket2.emit('message', data)
    }

    const youtubeFunc = () => {
      let data = {
        sendType: 'message',
        socketId: socketId2.value,
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        messageType: 'youtube'
      }

      socket2.emit('message', data)
    }

    const freezeFunc = () => {
      let data = {
        sendType: 'message',
        socketId: socketId2.value,
        userName: userName.value,
        channelNo: channelNo.value,
        userId: userId,
        messageType: 'freeze'
      }

      socket2.emit('message', data)
    }

    const getUserFunc = () => {
      let userSn = prompt("회원번호를 입력하세요.");
      console.log('userSn===>',userSn)
      store.dispatch(`users/${ACT_GET_USERS}`, userSn)
          .then((res) => {
            console.log('res====>',res.data[0])
            if (res.status === 200) {
              let data = {
                sendType: 'message',
                socketId: socketId2.value,
                userName: userName.value,
                channelNo: channelNo.value,
                userId: userId,
                messageType: 'getUser',
                res: JSON.stringify(res.data[0])
              }
              socket2.emit('message', data)
            }
          }).catch(e => {
        console.error(e);
      });
    }

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

    const updateType = () => {
      if(userType.value === 'admin'){
        btnAreaEl.value.style.display='block';
      }else{
        btnAreaEl.value.style.display='none';
      }
    }

    return {
      userName,
      channelNo,
      userType,
      socketId,
      socketId2,
      inputMessage,
      connected,
      iframeAreaEl,
      connectAreaEl,
      chatPageEl,
      loginPageEl,
      btnAreaEl,
      messagesEl,
      freezeEl,
      inputMessageEl,
      showQuizEl,
      isConnectLive,
      isConnectLiveOne,
      isConnectLiveConf,

      sendUserName,
      sendMessage,
      sendDisconnect,
      showQuiz,
      showIframe,
      hideIframe,
      youtubeFunc,
      freezeFunc,
      getUserFunc,
      connectLiveFunc,
      connectLiveOneFunc,
      connectLiveConfFunc,
      updateTyping,
      updateType,
      connectLiveShowFunc,
      iframeShowFunc
    }
  }
}
</script>

<style scoped>

/* add css */
.iframe-area, .connect-area{
  width: 100%;
  height: 100%;
  position: relative;
  /*display: none;*/
}

.wrap{
  flex-direction: row;
  height: 100vh;
  border: 2px solid lightgray;
  border-radius: 5px;
}

.btnarea{
  display: block;
  position: absolute;
  bottom: 0;
}

.left-wrap{
  width: 60%;
}

.right-wrap{
  width:40%;
}


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
  position: relative;
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
  /*height: 100px;*/
  /*margin-top: -100px;*/
  /*position: absolute;*/

  text-align: center;
  top: 45%;
  width: 100%;
  position: relative;
  margin: 30px 0;
}

.login.page .form .usernameInput {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #000;
  outline: none;
  /*padding-bottom: 15px;*/
  text-align: center;
  /*width: 400px;*/
  width:60%;
  margin-left: 20px;
}

.login.page .title {
  font-size: 200%;
}

.login.page .usernameInput {
  font-size: 150%;
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
  position: absolute;
  width: 100%;
  height: 100%;
  /*padding-bottom: 60px;*/
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
  margin-right: 5px;
  right: 0;
  width: 90%;
}


</style>