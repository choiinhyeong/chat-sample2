<template>
  <img :src="getProfileImg(target)" @error="setDefaultImag" alt="" />
</template>

<script>
import {getProfileImg} from "@/assets/js/common/util";

export default {
  name: "ChatProfileImage",
  props: {
    target: String
  },
  setup() {
    const setDefaultImag = (e) => {
      e.target.src = require('../assets/images/profile/sample.png');
    }

    return {
      getProfileImg,
      setDefaultImag
    }

  }
}
</script>

<style scoped>

</style>