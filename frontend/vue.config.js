const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/chat' : '/',
  devServer: {
    // 프록시 설정
    proxy: {
      '/api': {
        // 프록시 요청을 보낼 서버의 주소
        target: 'http://localhost:3000'
      }
    }
  },
  outputDir: path.resolve(__dirname, "../backend/public/chat")
});
