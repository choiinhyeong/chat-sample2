<template>

  <div>
    <button type="button" @click="start">연결하기</button>
  </div>
  <div>
    <video id="localVideo" class="video" autoplay muted></video>
    <video id="localVideo1" class="video" autoplay muted></video>
  </div>
  <div>
    <video id="remoteVideo" class="video" autoplay></video>
    <video id="remoteVideo1" class="video" autoplay></video>
  </div>

</template>

<script>
import Remon from "@remotemonster/sdk"
import {onMounted} from "vue";

export default {
  name: "ConnectLiveCall",
  setup() {

    let remon;
    let myChannelId;
    let isConnected = false;
    const serviceId = '4c6df6ad-c417-41c4-8c81-fb58eac6a4b1';
    const key = 'c2a0d857651d4ad04ca3a818a50b55ba8ae237ca077f737efa53bf2c391c9671'

    const config = {
      credential: {
        serviceId, // 콘솔에서 획득한 Service ID
        key        // 콘솔에서 획득한 Service Key
      },
      view: {
        local: '#localVideo', // 로컬(자신) 비디오 태그 지정
        remote: '#remoteVideo', // 리모트(상대방) 비디오 태그 지정
      },
      media: {
        video: true, // true로 설정 시 비디오를 사용함
        audio: true // true로 설정 시 오디오를 사용함
      }
    }

    const listener = {
      onInit(token) {
        // UI 처리등 Remon 클래스가 초기화 되었을 때 처리하여야 할 작업
        console.log('onInit',token);
      },
      onDisconnectChannel() {
        console.log('EVENT FIRED: onDisconnectChannel');
        remon.close();
        isConnected = false;
        // setViewsViaParameters('hidden', false, 'hidden', 'CONNECT', 'visible');
      },
      onConnect(chid) {
        // Caller가 통화 생성 후 대기 중
        console.log(`EVENT FIRED: onConnect: ${chid}`);
      },
      onComplete() {
        // Caller와 Callee가 정상적으로 연결되어 통화 시작
        console.log('onComplete');
      },
      onClose() {
        // 종료
        console.log('EVENT FIRED: onClose');
        remon.close();
        isConnected = false;
        // setViewsViaParameters('hidden', false, 'hidden', 'CONNECT', 'visible');
      },
      onError(error) {
        console.log(`EVENT FIRED: onError: ${error}`);
      },
      onStat(result) {
        console.log(`EVENT FIRED: onStat: ${result}`);
      }
    }


    const init = () => {
      console.log('init==>');
      remon = new Remon({ config, listener });
      createDummyRemonForSearchLoop();
      // callList();
    }

    const start = () => {
      if (isConnected) {
        isConnected = false;
        // setViewsViaParameters('hidden', false, 'hidden', 'CONNECT', 'visible');
        remon.close();
      } else {
        isConnected = true;
        // setViewsViaParameters('visible', true, 'visible', 'CLOSE', 'hidden');
        // myChannelId = channelNameInput.value ? channelNameInput.value : getRandomId()
        myChannelId = getRandomId();
        remon = new Remon({config, listener});
        remon.connectCall(myChannelId);
      }
    }

    const getRandomId = () => {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return Date.now() + "_" + text;
    }

    const createDummyRemonForSearchLoop = () => {
      if (remon) remon.close();
      let cfg = {
        credential: {key: key, serviceId: serviceId},
        view: {local: '#localVideo1', remote: '#remoteVideo1'},
        media: {audio: false, video: false}
      };
      remon = new Remon({config: cfg});
    }

    onMounted(() => {
      console.log('ConnectLiveCall mount========>')
      init();
    })

    return {
      start,
    }
  }
}

</script>

<style scoped>

.video{
  width: 50%;
  height: 50%;
  border: 1px solid black;
}

</style>