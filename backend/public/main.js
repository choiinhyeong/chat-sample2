window.onload = function() {

  // let FADE_TIME = 150; // ms
  let TYPING_TIMER_LENGTH = 400; // ms

  let usernameInput = document.getElementsByClassName('usernameInput')[0]
  let messages = document.getElementsByClassName('messages')[0]
  let inputMessage = document.getElementsByClassName('inputMessage')[0]
  let loginPage = document.getElementsByClassName('loginpage')[0]
  let chatPage = document.getElementsByClassName('chatpage')[0]
  let exitButtion = document.getElementsByClassName('exitButtion')[0]
  let btnArea = document.getElementsByClassName('btn-area')[0]

  // Prompt for setting a username
  let username;
  let socketId;
  let connected = false;
  let typing = false;
  let lastTypingTime;
  // let $currentInput = $usernameInput.focus();

  // let socketDns = "https://nodechat.egosfind.com";
  let socketDns = "http://localhost:8081";

  // TODO - Change your url
  let socket = io(socketDns, {transports: ['websocket'], path: '/websocket'});
  let socket2 = io(socketDns, {transports: ['websocket'], path: '/socket.io'});

  // Sets the client's username
  const setUsername = () => {
    username = usernameInput.value.trim();
    console.log('setUsername;;', loginPage)
    let channelNo = "channel1";
    let userId = "userid1";

    // If the username is valid
    if (username) {
      loginPage.style.display = 'none'
      chatPage.style.display = 'block'
      btnArea.style.display = 'block'
      // loginPage.addEventListener('off', e => {
      //   console.log('off;;', e)
      // })
      // loginPage.off('click')
      // $currentInput = $inputMessage.focus();

      let data = {
        sendType: 'connection',
        userName: username,
        channelNo: channelNo,
        userId: userId,
        message: "입장"
      }
      // Tell the server your username
      socket.emit('chat_channel_connection', data);
      socket2.emit('message_channel_connection', data);
    }
  }

  // Sends a chat message
  const sendMessage = () => {
    let channelNo = "channel1";
    let userId = "userid1";
    let message = inputMessage.value
    inputMessage.value = '';

    let data = {
      sendType: 'message',
      socketId: socketId,
      userName: username,
      channelNo: channelNo,
      userId: userId,
      message: message
    }

    // tell server to execute 'new message' and send along one parameter
    socket.emit('message', data);
    // socket2.emit('message', data);

    messages.scrollTop = messages.scrollHeight;
  }

  const sendDisconnect = () => {
    let channelNo = "channel1";
    let userId = "userid1";

    let data = {
      sendType: 'disconnect',
      userName: username,
      channelNo: channelNo,
      userId: userId,
      message: ''
    }
    console.log('sendDisconnect;;', data);
    // tell server to execute 'new message' and send along one parameter
    socket.emit('disconnectCustom', data);
    socket2.emit('disconnectCustom', data);
  }

  // Whenever the server emits 'new message', update the chat body
  socket.on('chat_channel_connection', (data) => {
    console.log('chat_channel_connection;;;;', data)
    let userName = data.userName;
    socketId = data.socketId;
    let li = document.createElement('li')
    li.innerText = userName + "님이 채팅채널에 입장 하였습니다.";
    messages.append(li);
    // messages.append("<li>" + userName + "님이 입장 하였습니다.</li>");
  });

  socket.on('message', (data) => {
    let userName = data.userName;
    let message = data.message;
    let li = document.createElement('li')
    li.innerText = userName + "  : " + message;
    messages.append(li);
    // messages.append("<li>" + userName + "  : " + message + " </li>");
  });

  socket.on('disconnect', (data) => {
    console.log('disconnect;;', data)
    let userName = data.userinfo.userName;
    let li = document.createElement('li')
    li.innerText = userName + "님이 퇴장하였습니다.";
    messages.append(li);
  });

  socket.on('disconnectCustom', (data) => {
    console.log('data;;', data.userinfo)
    let userName = data.userinfo.userName;
    let li = document.createElement('li')
    li.innerText = userName + "님이 퇴장하였습니다.";
    messages.append(li);
  });


  /**
   * socket2 채팅 외 이벤트 관련
   */
  const ytBtn = document.getElementsByClassName('yt-btn')[0];
  const iframeBtn = document.getElementsByClassName('iframe-btn')[0];
  const iframeHideBtn = document.getElementsByClassName('iframe-hide-btn')[0];

  iframeBtn.addEventListener('click', e => {
    console.log('iframeBtn;;');
    let channelNo = "channel1";
    let userId = "userid1";
    let data = {
      sendType: 'message',
      socketId: socketId,
      userName: username,
      channelNo: channelNo,
      userId: userId,
      messageType: 'iframeShow'
    }

    socket2.emit('message', data)
  })

  iframeHideBtn.addEventListener('click', e => {
    console.log('iframeHideBtn;;');
    let channelNo = "channel1";
    let userId = "userid1";
    let data = {
      sendType: 'message',
      socketId: socketId,
      userName: username,
      channelNo: channelNo,
      userId: userId,
      messageType: 'iframeHide'
    }

    socket2.emit('message', data)
  })

  ytBtn.addEventListener('click', e => {
    console.log('ytBtn;;')
    let channelNo = "channel1";
    let userId = "userid1";
    let data = {
      sendType: 'message',
      socketId: socketId,
      userName: username,
      channelNo: channelNo,
      userId: userId,
      messageType: 'youtube'
    }

    socket2.emit('message', data)
  })

  socket2.on('message_channel_connection', (data) => {
    console.log('socket2 message_channel_connection;;;;', data)
    let userName = data.userName;
    socketId = data.socketId;
    let li = document.createElement('li')
    li.innerText = userName + "님이 message채널에 입장 하였습니다.";
    // messages.append(li);
  });

  socket2.on('message', (data) => {
    console.log('socket2 message;;;;', data);

    if (data.messageType === 'youtube') {
      window.open('https://www.youtube.com/', '_blank');
    } else if (data.messageType === 'iframeShow') {
      let tag = '<iframe width="560" height="315" src="https://www.youtube.com/embed/F2bMUR6GyNM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>';
      document.getElementsByClassName('iframe-area')[0].innerHTML = tag
      document.getElementsByClassName('iframe-area')[0].style.display = 'block';
    } else if (data.messageType === 'iframeHide') {
      document.getElementsByClassName('iframe-area')[0].innerHTML = '';
      document.getElementsByClassName('iframe-area')[0].style.display = 'none';
    }
  });

  socket2.on('disconnect', () => {
    console.log('socket2 disconnect;;;;')
  });

  socket2.on('disconnectCustom', () => {
    console.log('socket2 disconnectCustom;;;;')
  });


  // events => Updates the typing event
  const updateTyping = () => {
    console.log('updateTyping')
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(() => {
        let typingTimer = (new Date()).getTime();
        let timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Keyboard events
  window.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      if (username) {
        sendMessage();
      } else {
        setUsername();
      }
    }
  });

  inputMessage.addEventListener('input', e => {
    updateTyping();
  });

  exitButtion.addEventListener('click', e => {
    sendDisconnect();
  })

}