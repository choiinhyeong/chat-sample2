<template>
  <div class="kb-cloud" id="kb-cloud">
    <!-- cloud-container -->
    <div class="cloud-container" id="cloud-now">
      <div class="cloud-wrapper">
        <!-- cloud-header -->
        <header class="cloud-header">
          <div class="header-column header-title">
            <h2 class="title">클라우드</h2>
            <div class="badge-now">NOW</div>
          </div>
          <div class="header-column header-subtitle">
            <h3 class="title">[KB ACE Academy] 자산관리 STEP Ⅳ</h3>
            <p class="text">외환 상품/서비스(2022.10.13. 11:00~11:50)</p>
          </div>
          <div class="header-column header-util">
            <div class="util-status">
              <span class="text">02:14  학습중</span>
            </div>
            <div class="util-my">
              <span class="text">{{userInfo.lrnerNm}}</span>
              <div class="my-avatar">
                <img src="../assets/images/@tmp/@tmp_mypage_avatar.jpg" alt="임시이미지" />
              </div>
            </div>
          </div>
        </header>
        <!-- cloud-body -->
        <div class="cloud-body">
          <!-- cloud-player -->
          <div class="cloud-player">
            <!-- player-main -->
            <div class="player-main">
              <!-- main-viewport -->
              <div class="main-viewport">
                <div class="viewport-header">
                  <div class="header-column header-views">
                    <i class="icon-eye"></i>
                    <span class="text">1,638</span>
                  </div>
                  <div class="header-column header-actions">
                    <button class="btn-viewport">
                      <i class="icon-viewport"></i>
                    </button>
                  </div>
                </div>
                <div class="viewport-video">
                  <video src="" poster="../assets/images/@tmp/@tmp_cloud_02.jpg"></video>
                </div>
              </div>
              <!-- main-actions -->
              <div class="main-actions">
                <!-- menu-container -->
                <div v-if="userInfo.accessType === 'admin'" class="menu-buttons">
                  <ul class="menu-list">
                    <li class="menu-item dropdown is-active">
                      <button class="btn-menu is-active">
                        <i class="icon-menu-lecture"></i>
                        <span class="text">강의</span>
                      </button>
<!--                      <div class="dropdown-target">-->
<!--                        <div class="dropdown-box">-->
<!--                          <article class="dropdown-option-group">-->
<!--                            <h4 class="option-group-title">학습관리</h4>-->
<!--                            <ul class="dropdown-option-list">-->
<!--                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">학습시작</a></li>-->
<!--                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">학습종료</a></li>-->
<!--                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">휴식시작</a></li>-->
<!--                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">휴식종료</a></li>-->
<!--                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">학습종료 취소</a></li>-->
<!--                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">학습종료 확인</a></li>-->
<!--                            </ul>-->
<!--                          </article>-->
<!--                        </div>-->
<!--                      </div>-->
                    </li>
                    <li class="menu-item">
                      <button class="btn-menu">
                        <i class="icon-menu-display"></i>
                        <span class="text">화면</span>
                      </button>
                    </li>
                    <li class="menu-item">
                      <button class="btn-menu">
                        <i class="icon-menu-attendance"></i>
                        <span class="text">출석</span>
                      </button>
                    </li>
                    <li class="menu-item">
                      <button class="btn-menu">
                        <i class="icon-menu-quiz"></i>
                        <span class="text">퀴즈・투표</span>
                      </button>
                    </li>
                    <li class="menu-item">
                      <button class="btn-menu">
                        <i class="icon-menu-event"></i>
                        <span class="text">이벤트・쿠폰</span>
                      </button>
                    </li>
                    <li class="menu-item">
                      <button class="btn-menu">
                        <i class="icon-menu-qna"></i>
                        <span class="text">Q&A・공지</span>
                      </button>
                    </li>
                  </ul>
                  <ul class="menu-list">
                    <li class="menu-item">
                      <button class="btn-menu">
                        <i class="icon-menu-faq"></i>
                        <span class="text">FAQ</span>
                      </button>
                    </li>
                    <li class="menu-item">
                      <button class="btn-menu">
                        <i class="icon-menu-learners"></i>
                        <span class="text">학습인원</span>
                      </button>
                    </li>
                  </ul>
                </div>
                <!-- //menu-container -->

                <div class="action-buttons">
                  <button class="btn-reconnect"><i class="icon-reconnect"></i><span class="text">재접속</span></button>
                  <button class="btn-exit" @click="sendDisconnect"><i class="icon-exit"></i><span class="text">종료</span></button>
                </div>
              </div>
            </div>
            <!-- //player-main -->
            <!-- player-aside -->
            <div class="player-aside">
              <div class="aside-chat-container">
                <div class="chat-screen">
                  <ul class="chat-screen-messages" ref="chatScreenEl">
                    <!-- my -->
                    <ChatMessage v-for="(item, idx) in msgArr" :key="idx" :type="item.type" :message="item.message" :lrner-name="item.lrnerNm" :send-date="item.sendDate"></ChatMessage>
                  </ul>
                </div>
                <div class="chat-write">
                  <div class="chat-write-options">
                    <div class="option-column">
                      <button class="btn-emoji"><i class="icon-emoji"></i></button>
                      <button class="btn-file"><i class="icon-file"></i></button>
                    </div>
                    <div class="option-column">
                      <div class="option-menu dropdown is-active">
                        <button class="btn-menu"><i class="icon-menu"></i></button>
<!--                        <div class="dropdown-target">-->
<!--                          <div class="dropdown-box">-->
<!--                            <ul class="dropdown-option-list">-->
<!--                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">강사님께 질문하기</a></li>-->
<!--                            </ul>-->
<!--                          </div>-->
<!--                        </div>-->
                      </div>
                    </div>
                  </div>
                  <div class="chat-write-forms">
                    <input type="text" placeholder="메시지 입력"
                           v-model="inputMessage"
                           @keyup.enter="sendMessage"
                           @keyup="updateTyping"
                    />
                    <button class="btn-write" @click="sendMessage"><span class="text">전송</span></button>
                  </div>
                </div>
              </div>
            </div>
            <!-- //player-aside -->
          </div>
          <!-- //cloud-player -->
        </div>
        <!-- //cloud-body -->
      </div>
    </div>
    <!-- //cloud-container -->
  </div>

</template>
<style>
@import "../assets/css/page_common.css";
@import "../assets/css/page_cloud.css";
</style>

<script>
import {onMounted, ref} from "vue";
import io from 'socket.io-client'
import {useStore} from "vuex";
import {ACT_GET_USERS_DECRYPT, ACT_GET_USERS_ENCRYPT} from "@/store/modules/user/users";
import {useRoute} from "vue-router";
import ChatMessage from "@/components/ChatMessage";
import {timestampToDateFormat} from "@/assets/js/common/util";

export default {
  name: "ChatMng",
  components:{
    ChatMessage,
  },
  setup(){

    const store = useStore();

    let socketDns = "";
    // let socketDns = 'http://devlxp.kbstar.com'

    let socket = io(socketDns, { transports: ['websocket'], path:'/websocket/chat' }); //채팅소켓
    let domSocket = io(socketDns, { transports: ['websocket'], path:'/websocket/system' }); // 컨트롤소켓

    const inputMessage = ref();
    const btnAreaEl = ref();
    const connected = ref(false);
    const msgArr = ref([]);

    const chatScreenEl = ref();

    onMounted(() => {
      console.log('mounted====>')
      if(!route.query.params){
        alert('서버 오류입니다.')
        window.close();
      }else{
        localStorage.setItem('info', route.query.params)
        userInfo.value = JSON.parse(decodeURIComponent((atob(route.query.params))));
        initUserData();
      }
    })

    const userInfo = ref({})

    const initUserData = () => {
      userInfo.value.sendType='';
      userInfo.value.message='';
      userInfo.value.messageType='';
      userInfo.value.url='';
      userInfo.value.socketId='';
      userInfo.value.socketId2='';
      userInfo.value.channelNo='channel1';
      userInfo.value.accessType = 'normal'
      if(userInfo.value.lrnerId === 'S017330'){
        userInfo.value.accessType = 'admin';
      }

      socket.emit('chat_channel_connection', userInfo.value);
      domSocket.emit('message_channel_connection', userInfo.value);
    }

    /**
     * 클라이언트 이벤트
     */
    const sendUserName = () => {
      // 퇴장클릭시 소켓 끊김으로 재연결
      // if(socket.disconnected){
      //   socket.connect();
      //   domSocket.connect();
      // }
      userInfo.value.sendType = 'connection'
      userInfo.value.message = '입장'

      socket.emit('chat_channel_connection', userInfo.value);
      domSocket.emit('message_channel_connection', userInfo.value);
    }

    const sendMessage = () => {
      if(inputMessage.value === undefined || inputMessage.value === '') return;
      userInfo.value.sendType = 'message';
      userInfo.value.message = inputMessage.value;

      socket.emit('message', userInfo.value);
      inputMessage.value = '';
    }

    const sendDisconnect = () => {
      console.log('sendDisconnect-----------');
      userInfo.value.sendType = 'disconnect';

      socket.emit('disconnectCustom', userInfo.value);
      domSocket.emit('disconnectCustom', userInfo.value);
      socket.disconnect();
      domSocket.disconnect();
    }

    /**
     * socket이벤트
     */
    socket.on('chat_channel_connection', (data) => {
      console.log('socket chat_channel_connection-----------',data)
      userInfo.value.socketId = data.socketId;
      connected.value = true;
      getRedisUsersList();

    });

    socket.on('message', (data) => {
      console.log('messsage===>',data)
      let type = '';
      let lrnerNm = data.lrnerNm;
      if(data.lrnerId === userInfo.value.lrnerId) {
        type = 'my';
        lrnerNm = '';
      }
      let curDate = timestampToDateFormat(data.connectDate, '(A) hh:mm')
      msgArr.value.push({type: type, message:data.message, lrnerNm: lrnerNm, sendDate: curDate})
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
      getRedisUsersList();
    });

    /**
     * domSocket)
     */
    domSocket.on('domSocket_channel_connection', (data) => {
      console.log('domSocket message_channel_connection----------------', data.lrnerNm)
      userInfo.value.socketId2 = data.socketId2;
    });

    domSocket.on('disconnect', () => {
      console.log('domSocket disconnect---------------')
    });

    domSocket.on('disconnectCustom', () => {
      console.log('domSocket disconnectCustom--------------')
    });

    domSocket.on('message', (data) => {
      console.log('domSocket message-------------------');

      if (data.messageType === 'youtube') {
        window.open('https://www.youtube.com/', '_blank');
      }

    });

    /**
     * 기능 함수들
     */
    const youtubeFunc = () => {
      userInfo.value.sendType='message';
      userInfo.value.messageType='youtube'

      domSocket.emit('message', userInfo.value);
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

    // 유저 정보 복호화 후 세팅
    const getUsersDecryptFunc = () => {
      store.dispatch(`users/${ACT_GET_USERS_DECRYPT}`, localStorage.getItem('info'))
          .then((res) => {
            // console.log('res====>',res)
            if (res.status === 200) {
              console.log('200=>',res.data);
              // userInfo.value.lrnerNm = res.data.lrnerNm;
              // userInfo.value.userSn = res.data.userSn;
              // userInfo.value.lrnerId = res.data.lrnerId;
              // userInfo.value.accTy = res.data.accTy;
              // userInfo.value.channelNo = res.data.lrnerId; // 방장의 아이디가 채널아이디(임시)
              sendUserName();
            }
          }).catch(e => {
        console.error(e);
      });
    }

    // 레디스에서 회원정보를 가져온다.
    const getRedisUsersList = () => {
      // store.dispatch(`users/${ACT_GET_REDIS_USERS_LIST}`, userInfo.value.channelNo)
      //     .then((res) => {
      //       console.log('getRedisUsersList====>',res)
      //       // if (res.status === 200) {}
      //     }).catch(e => {
      //   console.error(e);
      // });
    }

    const route = useRoute();
    const getUsersEncryptFunc = () => {
      store.dispatch(`users/${ACT_GET_USERS_ENCRYPT}`, {
        accTy:'admin',
        userSn:'65795',
        lrnerId:'S017347',
        lrnerNm: '김상민',
        deptCd: '',
        deptNm: '',
        // 추가정보들 더 들어가야됨
      }).then((res) => {
        if (res.status === 200) {
          route.params.encrypt = res.data;
          // localStorage.setItem('info', route.params.encrypt);
          // let rou = router.resolve({name: 'ChatMng'})
          // location.href = rou.href
        }
      }).catch(e => {
        console.error(e);
        alert('창을 닫고 재접속 해주세요.')
      });
    }

    return {
      inputMessage,
      btnAreaEl,
      userInfo,
      chatScreenEl,
      msgArr,

      sendUserName,
      sendMessage,
      sendDisconnect,
      youtubeFunc,
      getUsersEncryptFunc,
      getUsersDecryptFunc,
      updateTyping,
      getRedisUsersList,

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