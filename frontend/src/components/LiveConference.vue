<template>
  <div class="container flex column">
<!--    <header>-->
<!--      <input type="text" v-model="confName" :disabled="isConnected" />-->
<!--      <button @click="onConnect" v-if="!isConnected">연결하기</button>-->
<!--      <button @click="onDisConnectConference" v-if="isConnected">연결해제하기</button>-->
<!--      <button @click="onCreateLocalScreen" v-if="isConnected && !localScreen">화면공유적용</button>-->
<!--      <button @click="onDestroyLocalScreen" v-if="isConnected && localScreen">화면공유해제</button>-->

<!--      <div style="display:inline-block;" v-if="isConnected">-->
<!--        <select id="camaraSource">-->
<!--          <option v-for="(item, index) in cameraDevices" :key="index" :value="item.deviceId">{{item.label}}</option>-->
<!--        </select>-->
<!--        <button @click="onChangeCamera">카메라변경</button>-->
<!--      </div>-->
<!--    </header>-->

    <div class="flex row">
      <div class="media-list">
        <div class="media-block" v-if="localMedia">
          <div class="participant-id">{{userInfo.deptNm}} {{userInfo.lrnerNm}} {{myId}}</div>
          <div class="local-container"></div>
        </div>

        <div
            class="media-block"
            v-for="(item, i) in remoteParticipants"
            :key="i"
            :id="item.participant.id"
        >
          <div class="participant-id">{{item.participant.lrnerNm}} {{item.participant.id}}</div>
          <voice-meter :level="item.level" />
          <remote-video v-for="(video, j) in item.videos" :key="j" autoplay controls :remoteVideo="video" />
        </div>
      </div>

<!--      <div class="spotlight">-->
<!--        <video id="spotlight-video" autoplay playsInline></video>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import voiceMeter from './connectLive/VoiceMeter.vue';
import remoteVideo from './connectLive/RemoteVideo.vue';
import ConnectLive from '@connectlive/connectlive-web-sdk';
import {ref, nextTick, onMounted, onUnmounted} from "vue";
import {useRoute} from "vue-router";

export default {
  name: "LiveConference",
  components: {
    voiceMeter,
    remoteVideo
  },
  setup(){
    const confName = ref();
    const conf = ref(null);
    const localMedia = ref(null);
    const localScreen = ref(null);
    const remoteParticipants = ref([]);
    const isConnected = ref(false);
    const myId = ref('');
    const cameraDevices = ref([]);
    const audioCheckInterval = ref(-1);

    // const key = '1234567890';
    // const serviceId = 'SERVICEID1';
    // const key = '6d03bbd05f18016c1af2baaddab2db521953dfe900223455954d6044227912a2';
    // const serviceId = 'aa3a145e-843a-4702-a0a1-fe3b0dee420b';
    
    const userInfo = ref({});
    const route = useRoute();

    const init = () => {

      userInfo.value = JSON.parse(decodeURIComponent((atob(route.query.params))));
      confName.value = userInfo.value.channelNo+'conf';
      if(conf.value === null) {
        // onConnect();
        if (userInfo.value.accessType === 'full-access') {
          onConnect();
        } else {
          setTimeout(() => {
            onConnect();
          }, 3000)
        }
      }
    }

    onMounted(() => {
      console.log('mounted===>', conf.value)
      init();
    })

    onUnmounted(() => {
      onDisConnectConference();
    })

    const onProvisioning = async() => {
      await ConnectLive.signIn({
        serviceId: '2022KBH0C8AZ',
        serviceKey: '2022KBH0C8AZ42PO',
        secret: 'w7kvrnnCNVjBzjdR'
      });
    };

    const onConnect = async() => {
      await onProvisioning();
      await onCreateLocalMedia();
      await onCreateConference();
      await conf.value.connect(confName.value);

      myId.value = conf.value.localParticipant.id;
      // myId.value = usersInfo.userInfo.lrnerNm;
      isConnected.value = true;
      conf.value.publish([localMedia.value]);

      audioCheckInterval.value = window.setInterval(()=>{
        const audioLevels = conf.value.getRemoteAudioLevels();
        audioLevels.remoteParticipants.forEach((audioParticipant)=>{
          const participant = remoteParticipants.value.find(participant => participant.participant.id === audioParticipant.remoteParticipant.id);
          let level = parseFloat(audioParticipant.level.toFixed(3));
          if(level > 0.15) {
            level = 0.15;
          }
          participant.level = level / 0.15 * 100;
        });
      }, 250);
    }

    const onCreateLocalMedia = async() => {
      localMedia.value = await ConnectLive.createLocalMedia({
        audio: true,
        video: true
      });
      console.log(conf.value)
      // await onCreateLocalMedi aCallback();
      nextTick(async() => {
        const video = localMedia.value.video.attach();
        video.className = 'local-video';
        video.style.width = '100%';
        video.muted = true;
        video.autoplay = true;
        // video.controls = true;
        document.querySelector('.local-container').appendChild(video);

        cameraDevices.value = await localMedia.value.getCameraDevices();
      });
    }

    const onCreateConference = async() => {
      conf.value = ConnectLive.createConference();

      conf.value.on('connected', (evt)=>{
        // 기존 참여자 배열을 순회하며 비디오 구독 및 엘리먼트 생성
        evt.remoteParticipants.forEach(async participant => {
          let remoteVideos = [];
          const unsubscribedVideos = participant.getUnsubscribedVideos();
          if (unsubscribedVideos.length) {
            const videoIds = unsubscribedVideos.map(video => {
              video.getVideoId();
            });

            remoteVideos = await conf.value.subscribe(videoIds);
          }

          remoteParticipants.value.push({
            participant: participant,
            videos: remoteVideos,
            level: 0
          });
          // console.log('connected participant;;;;',participant);
          // console.log('connected remoteParticipants;;;;',remoteParticipants.value);
        });
      });

      conf.value.on('participantEntered', (evt)=>{
        remoteParticipants.value.push({
          participant: evt.remoteParticipant,
          videos: [],
          level: 0
        });
        // console.log('participantEntered remoteParticipants;;;;',remoteParticipants.value);
      });

      conf.value.on('participantLeft', evt => {
        const index = remoteParticipants.value.findIndex(item => item.participant.id === evt.remoteParticipantId);
        remoteParticipants.value.splice(index, 1);
      });

      conf.value.on('remoteVideoPublished', async evt => {
        const remoteVideos = await conf.value.subscribe([evt.remoteVideo.videoId]);
        if (remoteVideos.length) {
          const participant = remoteParticipants.value.find(item => item.participant.id === evt.remoteParticipant.id);
          if(participant) {
            participant.videos = participant.videos.concat(remoteVideos);
            participant.lrnerNm = userInfo.value.lrnerNm;
          }
        }
      });

      conf.value.on('remoteVideoUnpublished', evt => {
        const participant = remoteParticipants.value.find(item => item.participant.id === evt.remoteParticipant.id);
        if(participant) {
          participant.videos = participant.videos.filter((remoteVideo)=>{
            return remoteVideo.videoId !== evt.remoteVideo.videoId;
          });
        }
      });
    };

    const onDisConnectConference = async() => {
      conf.value.disconnect();

      localMedia.value.stop();
      localMedia.value.video.detach();

      localMedia.value = null;

      if(localScreen.value) {
        localScreen.value.stop();
        localScreen.value.video.detach();
        localScreen.value = null;
      }

      isConnected.value = false;
      myId.value = '';
      remoteParticipants.value = [];
      window.clearInterval(audioCheckInterval.value);
      audioCheckInterval.value = -1;

      ConnectLive.signOut();
    };

    // 화면공유
    const onCreateLocalScreen = async() => {
      localScreen.value = await ConnectLive.createLocalScreen({
        audio: true,
        video: true
      });
      localScreen.value.video.setExtraValue('screen');

      const video = localScreen.value.video.attach();
      video.className = 'local-video';
      video.style.width = '100%';
      document.querySelector('.local-container').appendChild(video);
      conf.value.publish([localScreen.value]);
    };
    
    const onDestroyLocalScreen = async() => {
      localScreen.value.video.detach();
      localScreen.value.stop();

      conf.value.unpublish([localScreen.value]);

      localScreen.value = undefined;
    };

    // const onChangeCamera = async() => {
    //   localMedia.value.video.detach();
    //
    //   const camaraSource = document.getElementById('camaraSource');
    //   await localMedia.value.switchCamera(camaraSource.value);
    //
    //   const video = localMedia.value.video.attach();
    //   video.className = 'local-video';
    //   video.style.width = '100%';
    //   document.querySelector('.local-container').appendChild(video);
    // };

    // const onClickSpotlight = async(event) => {
    //   const target = event.target;
    //   const remoteParticipant = conf.value.remoteParticipants.find(participant => participant.id === target.dataset.participantid);
    //   if (remoteParticipant) {
    //     const t = remoteParticipant.getVideo(parseInt(target.dataset.videoid));
    //     t.setQuality('h');
    //   }
    //   document.getElementById('spotlight-video').srcObject = target.srcObject;
    // };

    return {
      userInfo,
      confName,
      conf,
      localMedia,
      localScreen,
      remoteParticipants,
      isConnected,
      myId,
      cameraDevices,
      audioCheckInterval,

      onConnect,
      onProvisioning,
      onCreateLocalMedia,
      onCreateLocalScreen,
      onCreateConference,
      onDisConnectConference,
      onDestroyLocalScreen,
      // onClickSpotlight,
      // onChangeCamera,
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background-color: black;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /*background-color: #101523;*/
  color: #fff;
}

input {
  line-height: 1.5;
  padding: 8px;
  border: 1px solid hsl(0, 0%, 10%);
  color: #fff;
  background: hsl(0, 0%, 14%);
  transition: background-color 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25),
  transform 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25);
}

button {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 0;
  cursor: pointer;
  margin: 10px;
  padding: 10px;
}

video {
  cursor: pointer;
}

/*.flex {*/
/*  display: flex;*/
/*  flex: 1;*/
/*  height: 100%;*/
/*}*/

/*.flex.column {*/
/*  flex-direction: column;*/
/*}*/

/*.flex.row {*/
/*  flex-direction: row;*/
/*}*/

header {
  height: 55px;
  padding: 3px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
}

.spotlight {
  width: 100%;
  padding: 10px;
}

.spotlight video {
  width: 100%;
  height: 100%;
}

.media-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  /*width: 300px;*/
  padding: 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow: auto;
}

.media-list .media-block {
  width: 250px;
  height: fit-content;

  position: relative;
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #c9c9c9;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
}

.participant-id {
  position: absolute;
  bottom: 5px;
  left: 5px;
  color: #fff;
  font-size: 12px;
}
</style>