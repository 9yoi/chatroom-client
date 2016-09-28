// YOUR CODE HERE:
var friendsList = [];
var messages = '';

app = {
  server: 'https://api.parse.com/1/classes/messages',
  init: function () {
    // Event listener for submit button
    $(document).ready(function() {

      $('#send-btn').on('click', function(event) {
        console.log('on click');
        event.preventDefault();
        app.handleSubmit($('#msgBox').val());
      });

      // $('.chat').on('click', '.chat', function() {
      //   console.log('clicking wired correctly');
      //   console.log('username', $('.username').val());
      //   // app.fetchUser();
      // });
    });

    //fetch initial feed
    this.fetch();

  //  setInterval(function() { app.fetch(); }, 1000);
  },
  // send message
  send: function (message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      //dataType: 'json',
      //contentType: 'application/json',
      success: function(data) {
        console.log('Msg sent');
        console.log('data: ', data);
        app.fetch();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  // fetch all messages
  fetch: function (username, room) {

    $.ajax({
      url: this.server,
      type: 'GET',
      dataType: 'json', //what does does jsonp do?
      success: function(responses) {
        messages = responses.results;
        app.renderMessage(messages);
      },
      error: function(data) {
        console.error('error receving message', data);
      },
      data: {
        limit: 30,
        order: '-createdAt',
      },
      contentType: 'application/json',
    });
  },
  // fetch specific user feed - broken, gotta return to fix

  // fetchUser: function(username) {
  //   $.ajax({
  //     url: this.server,
  //     type: 'GET',
  //     dataType: 'json',
  //     success: function(responses) {  
  //       console.log('msg received');
  //       var messages = responses.results;
  //       var userMsg = messages.filter (function (message) {
  //         return message.username === username;
  //       });
  //       app.renderMessage(userMsg);
  //     },
  //     error: function(data) {
  //       console.error('error fetching user feed');
  //     }
  //   });
  // },

  // helper function to clear all messages
  clearMessages: function () {
    $('#chats').html('');
  },
  // helper function to render messages on screen
  renderMessage: function (messages) {
    $('#chats').html('');
    messages.forEach(function(message) {
      var $message = '<div class="chat"><span class="username">' + _.escape(message.username) 
                  + '</span>:<br><span class="message">' + _.escape(message.text) + '</span></div>';
      $('#chats').append($message);
    });
  },

  handleSubmit: function (message) {
    console.log(message);
    var msgObj = {
      username: window.location.search.slice(10),
      text: message,
      roomname: $('.rooms').val()
    };

    app.send(msgObj);

    $('#msgBox').val('');
  },

  // adds room to dropdown list
  renderRoom: function (room) {
    console.log('inside renderRoom');
    $room = $('<option/>').val(room).text(room);
    $('#rooms').append($room);
  },
  
  // filter messages for roomlist
  getRoom: function () {
    console.log ('inside getRoom');
    var rooms = {};
    console.log(messages);
    messages.forEach(function(message) {
      var roomName = message.roomname;
      // if roomName exists on JSON response, and has not been added to rooms yet
      if (roomName && !rooms[roomName]) {
        app.renderRoom(roomName);
        rooms[roomName] = true;
      }
    });
  },

  //get messages for selected room
  handleRoomChange: function () {
    
  }


};

app.init();