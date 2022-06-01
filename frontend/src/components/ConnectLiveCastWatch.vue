<template>
  <div>
    <div id="wingleft"></div>
    <div id="mymain">
      <h2>시청</h2>
      <video id="remoteVideo" class="remote-video " autoplay muted></video>
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
      onCreate(chid) { console.log('EVENT FIRED: onCreate: ${chid}',chid); },
      onJoin(chid) {
        console.log('EVENT FIRED: onJoin: ${chid}',chid);
        startEl.value.disable = true;
        stopEl.value.disable = false;
      },
      onClose() {
        console.log('EVENT FIRED: onClose');
        startEl.value.disable = false;
        stopEl.value.disable = true;
        remon.close();
        remon = new Remon({ config, listener });
      },
      onError(error) { console.log('EVENT FIRED: onError: ${error}',error); },
      onStat(result) { console.log('EVENT FIRED: onStat: ${result}',result); }
    };

    const connectStart = () => {
      remon.joinCast("my-first-livestreaming");
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
  #remoteVideo {
    width: 320px; height: 240px; background-color: black;
  }
</style>