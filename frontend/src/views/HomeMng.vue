<template>
  <div class="home">
    <h1>Home</h1>
    <button type="button" @click="moveFunc">Chat</button>
  </div>
</template>

<script>
export default {
  name: "HomeMng",
  setup(){

    const moveFunc = () => {
      window.open('http://localhost:8082/chat');
    }

    return{
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