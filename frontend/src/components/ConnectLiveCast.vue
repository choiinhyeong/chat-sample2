<template>
  <div>
    <div id="wingleft"></div>
    <div id="mymain">
      <h2>방송</h2>
      <video id="localVideo" class="remote-video " autoplay muted></video>
      <br>
      <button ref="startEl" @click="connectStart" class="btn btn-main">Start</button>
      <button id="stopEl" @click="connectClose" class="btn btn-main" disabled>Stop</button>
    </div>
    <div id="wingright"></div>
  </div>
</template>

<script>
import Remon from "@remotemonster/sdk"
import {onMounted, ref} from "vue";

export default {
  name: "ConnectLiveCast",
  setup(){

    let remon;
    const startEl = ref();
    const stopEl = ref();

    const config = {
      credential: {
        serviceId: 'SERVICEID1',
        key: '1234567890'
      },
      view: {
        local: '#localVideo'
      }
    };

    const listener = {
      onCreate(chid) {
        console.log('EVENT FIRED: onCreate:',chid);
        startEl.value.disable = true;
        stopEl.value.disable = false;
      },
      onJoin(chid) {
        console.log('EVENT FIRED: onJoin:',chid);
      },
      onClose() {
        console.log('EVENT FIRED: onClose');
        startEl.value.disable = false;
        stopEl.value.disable = true;
        remon.close();
        remon = new Remon({ config, listener });
      },
      onError(error) { console.log('EVENT FIRED: onError:',error); },
      onStat(result) { console.log('EVENT FIRED: onStat:',result); }
    };

    const connectStart = () => {
      // createCast의 인자는 방송채널의 ID입니다. 실제 서비스에서는 동일한 방송채널의 ID가 아닌, 고유하고 예측이 어려운 ID를 사용해야합니다.
      remon.createCast("my-first-livestreaming");
    }

    const connectStop = () => {
      remon.close();
    }

    const init = () => {
      remon = new Remon({ config, listener });
    }

    onMounted(() => {
      init();
    })

    return{
      startEl,
      stopEl,

      connectStart,
      connectStop,
    }
  }
}
</script>

<style scoped>
  #mymain {
    margin-left: auto; margin-right: auto; width: 320px;
  }
  #wingleft {
  }
  #wingright {
  }
  #localVideo {
    width: 320px; height: 240px; background-color: black;
  }
</style>