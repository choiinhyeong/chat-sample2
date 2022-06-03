<template>
  <div class="home" :style="`text-align:center; ${connected ? 'display:none;' : 'display:block;'}`">
    <h1>Home</h1>
    <button type="button" @click="moveFunc">연결</button>
  </div>
  <div :style="`${connected ? 'display:flex' : 'display:none'}`" >
    <div class="wrap left-wrap">
      <div style="width: 100%; height:97%;">
        <div class="iframe-area" ref="iframeAreaEl"></div>
        <div class="connect-area" ref="connectAreaEl" style="display: none;">
          <ConnectLiveCast v-if="isConnectLiveCast"></ConnectLiveCast>
          <ConnectLive v-if="isConnectLiveCall"></ConnectLive>
          <ConnectLiveConf v-if="isConnectLiveConf"></ConnectLiveConf>
        </div>
      </div>
      <div class="btnarea" ref="btnAreaEl" style="display: none; height:3%;">
        <!--        <button type="button" class="iframe-btn" @click="showIframe">iframe</button>-->
        <button type="button" @click="showQuiz" ref="showQuizEl">퀴즈앤</button>
<!--        <button type="button" class="yt-btn" @click="youtubeFunc">유튜브</button>-->
        <button type="button" @click="connectLiveFunc('call')" style="display: none !important;">커넥트라이브_call</button>
        <button type="button" @click="connectLiveFunc('cast')" style="display: none !important;">커넥트라이브_cast</button>
        <button type="button" @click="connectLiveFunc('conf')">커넥트라이브_conf</button>
        <button type="button" @click="freezeFunc" ref="freezeEl">채팅잠금</button>
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
          <div>
            <input class="inputMessage" ref="inputMessageEl" v-model="inputMessage" @keyup.enter="sendMessage" @keyup="updateTyping" placeholder="메세지를 입력하세요."/>
            <button type="button" @click="sendMessage">전송</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import io from 'socket.io-client'
// import ConnectLiveCall from "@/components/ConnectLiveCall";
import ConnectLiveConf from "@/components/ConnectLiveConf";
import ConnectLiveCast from "@/components/ConnectLiveCast";
import {useStore} from "vuex";
import {ACT_GET_USERS_DECRYPT, ACT_GET_USERS_ENCRYPT} from "@/store/modules/user/users";
import ConnectLive from "@/components/ConnectLive";
import {useRoute, useRouter} from "vue-router";


export default {
  name: "ChatMng",
  components:{
    ConnectLiveCast,
    ConnectLiveConf,
    ConnectLive,
  },
  setup(){

    const store = useStore();

    let socketDns = "http://localhost:3000";
    // let socketDns = 'http://devlxp.kbstar.com'

    let socket = io(socketDns, { transports: ['websocket'], path:'/websocket/chat' }); //채팅소켓
    let socket2 = io(socketDns, { transports: ['websocket'], path:'/websocket/system' }); // 컨트롤소켓

    const inputMessage = ref();
    const iframeAreaEl = ref();
    const connectAreaEl = ref();
    const chatPageEl = ref();
    const btnAreaEl = ref();
    const messagesEl = ref();
    const freezeEl = ref();
    const inputMessageEl = ref();
    const showQuizEl = ref();
    const connected = ref(false);
    const isConnectLiveCast = ref(false);
    const isConnectLiveCall = ref(false);
    const isConnectLiveConf = ref(false);

    onMounted(() => {
      // sendUserName();
      console.log('mounted==>',localStorage.getItem('info'))
      if(localStorage.getItem('info')===null ||
          localStorage.getItem('info') ===undefined){
        getUsersEncryptFunc();
      }else{
        getUsersDecryptFunc();
        initUserData();
        iframeHideFunc();
      }
    })

    const userInfo = ref({
      sendType:'',
      socketId:'',
      socketId2:'',
      userName : '',
      userSn: '',
      channelNo : '',
      lrnerId : '',
      accTy: '',
      message : '',
      messageType : '',
      url: '',
    })

    const initUserData = () => {
      userInfo.value.sendType='';
      userInfo.value.message='';
      userInfo.value.messageType='';
      userInfo.value.url='';
    }

    /**
     * 클라이언트 이벤트
     */
    const sendUserName = () => {
      // 퇴장클릭시 소켓 끊김으로 재연결
      // if(socket.disconnected){
      //   socket.connect();
      //   socket2.connect();
      // }
      userInfo.value.sendType = 'connection'
      userInfo.value.message = '입장'

      socket.emit('chat_channel_connection', userInfo.value);
      socket2.emit('message_channel_connection', userInfo.value);
    }

    const sendMessage = () => {
      userInfo.value.sendType = 'message';
      userInfo.value.message = inputMessage.value;

      socket.emit('message', userInfo.value);
      inputMessage.value = '';
    }

    const sendDisconnect = () => {
      console.log('sendDisconnect-----------');
      userInfo.value.sendType = 'disconnect';

      socket.emit('disconnectCustom', userInfo.value);
      socket2.emit('disconnectCustom', userInfo.value);
      socket.disconnect();
      socket2.disconnect();
    }

    /**
     * socket이벤트
     */
    socket.on('chat_channel_connection', (data) => {
      console.log('socket chat_channel_connection-----------',data)
      userInfo.value.socketId = data.socketId;
      let li = document.createElement('li')
      li.innerText = data.userName + "("+data.accTy+")님이 \""+data.channelNo+"\"채널에 입장했습니다.";
      messagesEl.value.append(li);
      connected.value = true;

      chatPageEl.value.style.display='flex'
      if(data.accTy === 'admin') btnAreaEl.value.style.display='block'
    });

    socket.on('message', (data) => {
      console.log('messsage===>',data)
      let li = document.createElement('li')
      li.innerText = data.userName + "  : " + data.message;
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
      messagesEl.value.append(li);
    });

    socket.on('disconnect', (data) => {
      console.log('disconnect-----------', data)
      window.localStorage.removeItem('info');
      connected.value = false;
      location.reload(true);
      // window.close();
    });

    socket.on('disconnectCustom', (data) => {
      console.log('disconnectCustom--------------', data)
      let li = document.createElement('li')
      li.innerText = data.userinfo.userName + "님이 퇴장하였습니다.";
      window.localStorage.removeItem('info');
      connected.value = false;
      messagesEl.value.append(li);
    });

    /**
     * socket2(system)
     */
    socket2.on('message_channel_connection', (data) => {
      console.log('socket2 message_channel_connection----------------', data)
      userInfo.value.socketId2 = data.socketId2;
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
        iframeHideFunc();
      }else if(data.messageType === 'quizn'){
        // iframeAreaEl.value.innerHTML = '<iframe width="100%" height="100%" src="'+data.url+'" title="quizn" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>';
        window.open(data.url)
      }else if(data.messageType === 'freeze'){
        if(!inputMessageEl.value.disabled){
          inputMessageEl.value.disabled = true;
          freezeEl.value.innerText = '해제'
        }else{
          inputMessageEl.value.disabled = false;
          freezeEl.value.innerText = '잠금'
        }
      }else if(data.messageType === 'connectLiveCast'){
        isConnectLiveCast.value = true;
        connectLiveShowFunc();
      }else if(data.messageType === 'connectLiveCall'){
        isConnectLiveCall.value = true;
        connectLiveShowFunc();
      }else if(data.messageType === 'connectLiveConf') {
        isConnectLiveConf.value = true;
        connectLiveShowFunc();
      }else if(data.messageType === 'getUser'){
        alert(data.res)
      }
    });

    /**
     * 기능 함수들
     */
    const connectLiveFunc = (type) => {
      userInfo.value.sendType='message';
      if(type === 'call'){
        isConnectLiveCall.value = true;
        userInfo.value.messageType='connectLiveCall'
      }else if(type === 'conf'){
        isConnectLiveConf.value = true;
        userInfo.value.messageType='connectLiveConf'
      }else if(type === 'cast'){
        isConnectLiveCast.value = true;
        userInfo.value.messageType='connectLiveCast'
      }

      socket2.emit('message', userInfo.value);
    }

    const showQuiz = () => {
      userInfo.value.sendType='message';
      userInfo.value.messageType='quizn'
      userInfo.value.url = 'https://quizn.show/p/'

      socket2.emit('message', userInfo.value);
    }

    const showIframe = () => {
      userInfo.value.sendType='message';
      userInfo.value.messageType='iframeShow'

      socket2.emit('message', userInfo.value);
    }

    const hideIframe = () => {
      userInfo.value.sendType='message';
      userInfo.value.messageType='iframeHide'

      socket2.emit('message', userInfo.value);
    }

    const youtubeFunc = () => {
      userInfo.value.sendType='message';
      userInfo.value.messageType='youtube'

      socket2.emit('message', userInfo.value);
    }

    const freezeFunc = () => {
      userInfo.value.sendType='message';
      userInfo.value.messageType='freeze'

      socket2.emit('message', userInfo.value);
    }

    /**
     * 기타 이벤트함수들
     */
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

    const iframeShowFunc = () => {
      iframeAreaEl.value.style.display = 'block';
      connectAreaEl.value.style.display = 'none';
    }

    const connectLiveShowFunc = () => {
      iframeAreaEl.value.style.display = 'none';
      connectAreaEl.value.style.display = 'block';
    }

    const iframeHideFunc = () => {
      iframeAreaEl.value.innerHTML = '';
      iframeAreaEl.value.style.display = 'none';
      connectAreaEl.value.style.display = 'none';
      isConnectLiveCast.value = false;
      isConnectLiveCall.value = false;
      isConnectLiveConf.value = false;
    }

    // 유저 정보 복호화 후 세팅
    const getUsersDecryptFunc = () => {
      store.dispatch(`users/${ACT_GET_USERS_DECRYPT}`, localStorage.getItem('info'))
          .then((res) => {
            // console.log('res====>',res)
            if (res.status === 200) {
              console.log('200=>',res.data)
              userInfo.value.userName = res.data.lrnerNm;
              userInfo.value.userSn = res.data.userSn;
              userInfo.value.lrnerId = res.data.lrnerId;
              userInfo.value.accTy = res.data.accTy;
              userInfo.value.channelNo = res.data.lrnerId; // 방장의 아이디가 채널아이디(임시)

              sendUserName();
            }
          }).catch(e => {
        console.error(e);
      });
    }

    /**
     * HomeMng.vue함수
     */
    const route = useRoute();
    const router = useRouter();
    const moveFunc = () => {
      console.log('moveFunc')
      localStorage.setItem('info', route.params.encrypt);
      // window.open(rou.href);
      // window.open('/chat')

      let rou = router.resolve({name: 'ChatMng'})
      location.href = rou.href
    }
    const getUsersEncryptFunc = () => {
      store.dispatch(`users/${ACT_GET_USERS_ENCRYPT}`, {
        accTy:'admin',
        userSn:'65795',
        lrnerId:'S017347',
        lrnerNm: '김상민'
        // 추가정보들 더 들어가야됨
      }).then((res) => {
        if (res.status === 200) {
          route.params.encrypt = res.data;
        }
      }).catch(e => {
        console.error(e);
      });
    }

    return {
      inputMessage,
      iframeAreaEl,
      connectAreaEl,
      chatPageEl,
      btnAreaEl,
      messagesEl,
      freezeEl,
      inputMessageEl,
      showQuizEl,
      isConnectLiveCast,
      isConnectLiveCall,
      isConnectLiveConf,
      userInfo,

      sendUserName,
      sendMessage,
      sendDisconnect,
      showQuiz,
      showIframe,
      hideIframe,
      youtubeFunc,
      freezeFunc,
      getUsersEncryptFunc,
      getUsersDecryptFunc,
      connectLiveFunc,
      updateTyping,

      moveFunc,
      connected,

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
  display: flex;
  flex-direction: column;
  /*flex-direction: row;*/
  height: 100vh;
  border: 2px solid lightgray;
  border-radius: 5px;
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

/* Chat page */

.chat.page {
  /*display: none;*/
  flex-direction: column;
}

/* Font */

.messages {
  font-size: 100%;
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
  height: 91%;
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
  width: 85%;
}


</style>