const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 프록시 설정
    proxy: {
      '/api/chat': {
        // 프록시 요청을 보낼 서버의 주소
        target: 'http://localhost:3000'
      }
    }
  }
});



// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
