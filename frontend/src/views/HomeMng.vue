<template>
  <div class="home">
    <h1>Home</h1>
    <button type="button" @click="moveFunc">연결</button>
  </div>
</template>

<script>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {ACT_GET_USERS_ENCRYPT} from "@/store/modules/user/users";
import {useStore} from "vuex";

export default {
  name: "HomeMng",
  setup(){

    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const queryString = ref();

    const init = () => {
      console.log(route.query.param);
      if(route.query.param === '' ||  route.query.param === undefined){
        store.dispatch(`users/${ACT_GET_USERS_ENCRYPT}`, {
          accTy:'admin',
          userSn:'65795',
          lrnerId:'S017347',
          lrnerNm: '김상민'
          // 추가정보들 더 들어가야됨
        })
            .then((res) => {
              console.log('res====>',res)
              if (res.status === 200) {
                console.log('res====>',res.data);
                queryString.value = res.data;
                route.params.encrypt = res.data;
              }
            }).catch(e => {
              console.error(e);
            });
      }
    }

    init();
    // router.push({name: 'Main', params: {path: 'vn', path2: 'main'}});
    const moveFunc = () => {
      console.log('moveFunc')
      localStorage.setItem('info', queryString.value)
      let rou = router.resolve({name: 'ChatMng'})
      window.open(rou.href);
      // window.open('/chat')
    }

    return{
      queryString,
      moveFunc
    }
  }

}
</script>

<style scoped>
.home{
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-45%, -50%);
}

</style>