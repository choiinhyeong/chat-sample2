<template>
  <video id="localVideo" style="height:584px;" autoplay muted></video>
</template>

<script>
import Remon from "@remotemonster/sdk"
import {onMounted, onUnmounted, reactive} from "vue";

export default {
  name: "LiveCast",
  props:{
    accessType: String,
    userInfo: {
      type: Object
    }
  },
  setup(props){

    let remon;
    const key = '1234567890';
    const serviceId = 'SERVICEID1';
    let isConnected = false;
    let isCaster = false;
    const channelId = reactive(props.userInfo.channelNo+'-cast');
    // const key = '6d03bbd05f18016c1af2baaddab2db521953dfe900223455954d6044227912a2';
    // const serviceId = 'aa3a145e-843a-4702-a0a1-fe3b0dee420b';

    const config = {
      credential: {
        key, serviceId
      },
      view: {
        local: '#localVideo'
      }
    };

    const listener = {
      onCreate(chid) {
        console.log('EVENT FIRED: onCreate:',chid);
      },
      onJoin(chid) {
        console.log('EVENT FIRED: onJoin:',chid);
      },
      onDisconnectChannel() {
        // is called when other peer hang up.
        remon.close();
        isConnected = false;
        // setViewsViaParameters(false, 'hidden', 'CREATE', 'visible');
      },
      onClose() {
        console.log('EVENT FIRED: onClose');
        remon.close();
        // setViewsViaParameters(false, 'hidden', 'CREATE', 'visible');
      },
      onError(error) { console.log('EVENT FIRED: onError:',error); },
      onStat(result) { console.log('EVENT FIRED: onStat:',result); }
    };

    // let waitingLoop = '';
    // const setViewsViaParameters = (runWaitLoop) => {
    //   if (runWaitLoop) {
    //     waitingLoop = setInterval(async () => {
    //       console.log('wait........')
    //     },1000)
    //   } else {
    //     clearInterval(waitingLoop);
    //   }
    // }

    const connectStart = () => {
      // createCast의 인자는 방송채널의 ID입니다. 실제 서비스에서는 동일한 방송채널의 ID가 아닌, 고유하고 예측이 어려운 ID를 사용해야합니다.
      if (isConnected) {
        isConnected = false;
        isCaster = false;
        // setViewsViaParameters(false);
        remon.close();
      } else {
        isConnected = true;
        isCaster = (props.accessType === 'full-access') ? true : false;
        console.log('connectStart isCaster========>', isCaster)
        // setViewsViaParameters(true);
        if (!isCaster) {
          config.view.remote = '#localVideo';
        }
        remon = new Remon({config, listener});
        isCaster? remon.createCast(channelId) : remon.joinCast(channelId);
      }
    }

    let waitingInterval='';
    const startSearchLoop = () => {
      waitingInterval = setInterval(async function () {
        remon.config.credential.serviceId = serviceId;
        remon.config.credential.key = key;
        let searchResult = await remon.fetchCasts();

        searchResult.forEach((ch) => {
          console.log('searchResult======>',ch,',',ch.status,',',ch.id)
          if (ch.status === 'COMPLETE') {
            connectStart(true);
            clearInterval(waitingInterval);
            console.log('else remon;;;;',remon.context.state);
          }
        });
      }, 3000);
    }

    // async function findRoom(){
    //   remon.config.credential.serviceId = serviceId;
    //   remon.config.credential.key = key;
    //   let searchResult = await remon.fetchCasts();
    //   searchResult.forEach((ch) => {
    //     ch.type = 'BROADCAST';
    //     console.log("------------------- find my channel -----------------",ch.id ,',', channelId);
    //     if (ch.status === 'COMPLETE' && ch.id === channelId) {
    //       remon.joinCast(channelId);
    //     }
    //   });
    // }

    const connectStop = () => {
      remon.close();
    }

    const init = () => {
      console.log('init==>',props.accessType, props.userInfo.channelNo);
      remon = new Remon({ config, listener });
      // 관리자이고 complete아닐때는 방송생성, 그외는 대기루프
      if(props.accessType === 'full-access'){
        if(remon.context.state === 'COMPLETE') startSearchLoop();
        else connectStart();
      }else{
        // findRoom();
        startSearchLoop();
      }
    }

    onUnmounted(() => {
      console.log('cast unmounted')
      connectStop()
    })

    onMounted(() => {
      console.log('cast mounted')
      init();
    })

    return{
      connectStart,
      connectStop,
    }
  }
}
</script>

<style scoped>

</style>