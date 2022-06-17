<template>
  <div class="kb-cloud" id="kb-cloud">
    <!-- cloud-container -->
    <div class="cloud-container" id="cloud-now">
      <div class="cloud-wrapper">
        <!-- cloud-header -->
        <header class="cloud-header">
          <div class="header-column header-title">
            <a href="javascript:" @click=menuCompHideFunc><h2 class="title">클라우드</h2></a>
            <div class="badge-on">ON</div>
          </div>
          <div class="header-column header-subtitle">
<!--            <h3 class="title">[KB ACE Academy] 자산관리 STEP Ⅳ</h3>-->
<!--            <p class="text">외환 상품/서비스(2022.10.13. 11:00~11:50)</p>-->
          </div>
          <div class="header-column header-util">
            <div class="util-status">
<!--              <span class="text">02:14  학습중</span>-->
            </div>
            <div class="util-my">
              <span class="text">{{userInfo.lrnerNm}}</span>
              <div class="my-avatar">
                <ChatProfileImage :target="userInfo.lrnerId"></ChatProfileImage>
              </div>
            </div>
          </div>
        </header>
        <!-- cloud-body -->
        <div class="cloud-body">
          <!--  강사 질문하기  -->
          <CloudNowTeacherQuestion v-if="showTeacherQstnComp"></CloudNowTeacherQuestion>

          <!-- cloud-player -->
          <div class="cloud-player">
            <!-- player-main -->
            <div class="player-main">
              <!-- main-viewport -->
              <div class="main-viewport">
                <div class="viewport-header">
                  <div class="header-column header-views">
                    <i class="icon-eye"></i>
                    <span class="text">{{connUserCnt}}</span>
                  </div>
                  <div class="header-column header-actions">
                    <button class="btn-viewport">
                      <i class="icon-viewport"></i>
                    </button>
                  </div>
                </div>
                <div class="viewport-video">

                  <LiveCast v-if="isLiveCastShow" :access-type="userInfo.accessType" :user-info="userInfo"/>
                  <CloudOnLiveConference v-if="onLiveConfShow" :access-type="userInfo.accessType" :user-info="userInfo"/>
                  <iframe v-if="isIframeShow" src="https://zep.us/play/8jd49y" width="100%" height="584px"></iframe>

                </div>
              </div>
              <!-- main-actions -->
              <div class="main-actions">
                <!-- menu-container -->
                <div v-if="userInfo.accessType === 'full-access'" class="menu-buttons">
                  <ul class="menu-list">
                    <li class="menu-item dropdown" :class="{'is-active': showLectureMenu}">
                      <button class="btn-menu" :class="{'is-active': showLectureMenu}"
                              @click="toggleMenu('lecture')">
                        <i class="icon-menu-lecture"></i>
                        <span class="text">강의</span>
                      </button>
                      <div class="dropdown-target">
                        <div class="dropdown-box">
                          <article class="dropdown-option-group">
                            <h4 class="option-group-title">학습관리</h4>
                            <ul class="dropdown-option-list">
                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">학습시작</a></li>
                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">학습종료</a></li>
                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">휴식시작</a></li>
                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">휴식종료</a></li>
                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">학습종료 취소</a></li>
                              <li class="dropdown-option-item"><a href="" class="dropdown-option-link">학습종료 확인</a></li>
                            </ul>
                          </article>
                        </div>
                      </div>
                    </li>
                    <li :class="`menu-item ${isLiveCastShow ? 'is-active' : ''}`">
                      <button @click="connectCastFunc('cast')" class="btn-menu">
                        <i class="icon-menu-display"></i>
                        <span class="text">방송</span>
                      </button>
                    </li>
                    <li :class="`menu-item ${isLiveConfShow ? 'is-active' : ''}`">
                      <button @click="connectCastFunc('conf')" class="btn-menu">
                        <i class="icon-menu-display"></i>
                        <span class="text">화상</span>
                      </button>
                    </li>
                    <li :class="`menu-item ${isIframeShow ? 'is-active' : ''}`">
                      <button @click="connectCastFunc('zep')" class="btn-menu">
                        <i class="icon-menu-attendance"></i>
                        <span class="text">ZEP</span>
                      </button>
                    </li>
<!--                    <li class="menu-item">-->
<!--                      <button class="btn-menu">-->
<!--                        <i class="icon-menu-attendance"></i>-->
<!--                        <span class="text">출석</span>-->
<!--                      </button>-->
<!--                    </li>-->
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
                    <ChatMessage v-for="(item, idx) in msgArr" :key="idx" :type="item.type" :message="item.message" :lrner-id="item.lrnerId" :lrner-name="item.lrnerNm" :send-date="item.sendDate"></ChatMessage>
                  </ul>
                </div>
                <div class="chat-write">
                  <div class="chat-write-options">
                    <div class="option-column">
                      <button class="btn-emoji"><i class="icon-emoji"></i></button>
                      <button class="btn-file"><i class="icon-file"></i></button>
                    </div>
                    <div v-if="userInfo.accessType !== 'full-access'" class="option-column">
                      <div class="option-menu dropdown" :class="{'is-active': showTeacherQstnMenu}">
                        <button class="btn-menu" @click="toggleMenu('teacher')"><i class="icon-menu"></i></button>
                        <div class="dropdown-target">
                          <div class="dropdown-box">
                            <ul class="dropdown-option-list">
                              <li class="dropdown-option-item">
                                <a href="javascript:" @click="showTeacherQstnCompFunc" class="dropdown-option-link">강사님께 질문하기</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="chat-write-forms">
                    <input type="text" placeholder="메시지 입력"
                           v-model="inputMessage"
                           @keyup.enter="sendMessage"
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
import {onMounted, onUnmounted, ref} from "vue";
import io from 'socket.io-client'
import {useStore} from "vuex";
import {ACT_GET_REDIS_USERS_LIST, ACT_GET_USERS_DECRYPT, ACT_GET_USERS_ENCRYPT} from "@/store/modules/user/users";
import {useRoute} from "vue-router";
import ChatMessage from "@/components/ChatMessage";
import {timestampToDateFormat} from "@/assets/js/common/util";
import ChatProfileImage from "@/components/ChatProfileImage";
import LiveCast from "@/components/LiveCast";
import CloudNowTeacherQuestion from "@/components/CloudNowTeacherQuestion";
import CloudOnLiveConference from "@/components/CloudOnLiveConference";

export default {
  name: "CloudOn",
  components:{
    CloudOnLiveConference,
    CloudNowTeacherQuestion,
    LiveCast,
    ChatProfileImage,
    ChatMessage,
  },
  setup(){

    const store = useStore();
    let socketDns = '';
    socketDns = 'localhost:3000'; //
    // socketDns = 'http://devlxp.kbstar.com'

    let socket = io(socketDns, { transports: ['websocket'], path:'/websocket/chat' }); //채팅소켓
    let domSocket = io(socketDns, { transports: ['websocket'], path:'/websocket/system' }); // 컨트롤소켓

    const inputMessage = ref();
    const msgArr = ref([]);
    const showLectureMenu = ref(false);
    const showTeacherQstnMenu = ref(false);
    const showTeacherQstnComp = ref(false);

    const chatScreenEl = ref();
    const isLiveCastShow = ref(false); // 캐스트 여부
    const onLiveConfShow = ref(false); // 컨퍼런스 방송여부
    const isLiveConfShow = ref(false); // 컨퍼런스 노출여부
    const isIframeShow = ref(false);
    const cloudType = ref('');

    const connUserCnt = ref(0); // 접속유저 카운트

    onMounted(() => {
      console.log('onMounted====>',socket.connected,',',domSocket.connected);
      route.query.cloud === 'now' ? cloudType.value = 'now' : cloudType.value = 'on';
      document.body.classList.add('notscroll');
      if(!route.query.params){
        console.log('재접속 해주세요.')
      }else{
        // localStorage.setItem('info', route.query.params)
        userInfo.value = JSON.parse(decodeURIComponent((atob(route.query.params))));
        initUserData();
      }
    })

    onUnmounted(() => {
      console.log('onUnmounted====>',socket.connected,',',domSocket.connected);
      if(socket.connected || domSocket.connected){
        socket.disconnect();
        domSocket.disconnect();
      }
      isLiveCastShow.value = false;
      isLiveConfShow.value = false;
      onLiveConfShow.value = false;
    })

    const userInfo = ref({})

    const initUserData = () => {
      userInfo.value.sendType='';
      userInfo.value.message='';
      userInfo.value.messageType=''; // dom변경 타입
      userInfo.value.socketId='';
      userInfo.value.socketId2='';
      userInfo.value.channelNo='channel1'; // 채널 구분은 아마 객체 시퀀스로 할듯;
      userInfo.value.accessType = 'viewer' // access type도 어떻게 할건지?
      // 관리자 하드코딩
      if(userInfo.value.lrnerId === 'S017330') userInfo.value.accessType = 'full-access';
      userInfo.value.isCast = false;
      userInfo.value.isConf = false;
      socket.emit('chat_channel_connection', userInfo.value);
      domSocket.emit('domSocket_channel_connection', userInfo.value);
    }

    /**
     * 클라이언트 이벤트
     */
    const sendMessage = () => {
      if(inputMessage.value === undefined || inputMessage.value === '') return;
      userInfo.value.sendType = 'message';
      userInfo.value.message = inputMessage.value;
      inputMessage.value = '';

      socket.emit('message', userInfo.value);
    }

    const sendDisconnect = () => {
      console.log('sendDisconnect =======> ');
      userInfo.value.sendType = 'disconnect';

      isLiveCastShow.value = false;
      isLiveConfShow.value = false;
      onLiveConfShow.value = false;
      socket.disconnect();
      domSocket.disconnect();
    }

    /**
     * socket이벤트
     */
    socket.on('chat_channel_connection', (data) => {
      console.log('chat connection success ========> ',data.socketId)
      userInfo.value.socketId = data.socketId;
      getRedisUsersList();
    });

    socket.on('message', (data) => {
      console.log('chat messsage===>',data)
      let type = '';
      let lrnerNm = data.lrnerNm;
      if(data.lrnerId === userInfo.value.lrnerId) {
        type = 'my';
        lrnerNm = '';
      }
      let curDate = timestampToDateFormat(data.connectDate, '(A) hh:mm')
      msgArr.value.push({type, 'message': data.message, 'lrnerId': data.lrnerId, lrnerNm, 'sendDate': curDate});
    });

    socket.on('disconnect', (data) => {
      console.log('disconnect ========> ', data)
      getRedisUsersList();
      // window.localStorage.removeItem('info');
      // location.reload(true);
    });

    socket.on('disconnectCustom', (data) => {
      console.log('disconnectCustom ========> ', data)
    });

    /**
     * domSocket
     */
    domSocket.on('domSocket_channel_connection', (data) => {
      console.log('domSocket connection success ========> ', data.socketId2)
      userInfo.value.socketId2 = data.socketId2;
    });

    domSocket.on('disconnect', () => {
      console.log('domSocket disconnect ========> ')
    });

    domSocket.on('disconnectCustom', () => {
      console.log('domSocket disconnectCustom ========> ')
    });

    domSocket.on('message', (data) => {
      console.log('domSocket message ========> ', data.messageType);
      if (data.messageType === 'liveCast') {
        isLiveCastShow.value ? isLiveCastShow.value = false : isLiveCastShow.value = true;
      }else if(data.messageType === 'liveConf'){
        onLiveConfShow.value ? onLiveConfShow.value = false : onLiveConfShow.value = true;
      }
    });

    /**
     * 기능 함수들
     */
    const connectCastFunc = (liveType) => {
      userInfo.value.sendType='message';
      if(liveType === 'cast'){
        if(isLiveConfShow.value) {
          alert('방송과 화상을 동시에 진행하실 수 없습니다.');
          return;
        }
        userInfo.value.messageType = 'liveCast'
        domSocket.emit('message', userInfo.value);
      }else if(liveType === 'conf'){
        if(isLiveCastShow.value){
          alert('방송과 화상을 동시에 진행하실 수 없습니다.');
          return;
        }
        userInfo.value.messageType = 'liveConf';
        domSocket.emit('message', userInfo.value);
        isLiveConfShow.value ? isLiveConfShow.value = false : isLiveConfShow.value = true;
      }else if(liveType === 'zep'){
        isIframeShow.value ? isIframeShow.value = false : isIframeShow.value = true;
      }
    }

    /**
     * 기타 이벤트함수들
     */
    const toggleMenu = (showType) => {
      if(showType === 'lecture') showLectureMenu.value = !showLectureMenu.value;
      else if(showType === 'teacher') showTeacherQstnMenu.value = !showTeacherQstnMenu.value;
    }

    const showTeacherQstnCompFunc = () => {
      showTeacherQstnComp.value = !showTeacherQstnComp.value;
    }

    const menuCompHideFunc = () => {
      showLectureMenu.value = false;
      showTeacherQstnMenu.value = false;
      showTeacherQstnComp.value = false;
    }

    // 레디스에서 회원정보 가져와서 카운트 체크
    const getRedisUsersList = () => {
      store.dispatch(`users/${ACT_GET_REDIS_USERS_LIST}`, userInfo.value.channelNo)
          .then((res) => {
            console.log('getRedisUsersList====>',res)
            if (res.status === 200) {
              console.log('status 200 ==> ',connUserCnt.value)
            }
          }).catch(e => {
        console.error(e);
      });
    }

    // 유저 정보 복호화 후 세팅
    const getUsersDecryptFunc = () => {
      store.dispatch(`users/${ACT_GET_USERS_DECRYPT}`, localStorage.getItem('info'))
          .then((res) => {
            if (res.status === 200) {
              // userInfo.value.lrnerNm = res.data.lrnerNm;
              // userInfo.value.userSn = res.data.userSn;
              // userInfo.value.lrnerId = res.data.lrnerId;
              // userInfo.value.accTy = res.data.accTy;
              // userInfo.value.channelNo = res.data.lrnerId; // 방장의 아이디가 채널아이디(임시)
            }
          }).catch(e => {
        console.error(e);
      });
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
      userInfo,
      chatScreenEl,
      msgArr,
      isLiveCastShow,
      onLiveConfShow,
      isLiveConfShow,
      isIframeShow,
      showLectureMenu,
      showTeacherQstnMenu,
      showTeacherQstnComp,
      connUserCnt,

      sendMessage,
      sendDisconnect,
      getUsersEncryptFunc,
      getUsersDecryptFunc,
      getRedisUsersList,
      connectCastFunc,
      showTeacherQstnCompFunc,
      toggleMenu,
      menuCompHideFunc,
    }
  }
}
</script>

<style scoped>

</style>