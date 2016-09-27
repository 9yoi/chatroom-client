// YOUR CODE HERE:
var friendsList = [];

$(document).ready(function() {
  $('#send-btn').on('click', function() {
    var msg = $('#msgBox').val();
    app.send(msg);
    $('#msgBox').val('');

   // app.send($('.msgBox'));
  });

});

app = {
  server: 'https://api.parse.com/1/classes/messages',
  init: function () {
    // setInterval(function() { app.fetch(); }, 1000);

  },

  send: function (message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('Msg sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function (callback) {
    $.ajax({
      url: this.server,
      type: 'GET',
      dataType: 'json', //what does does jsonp do?
      success: function(responses) {
        console.log('msg received');
        console.log(responses);
        app.handleMessages(responses.results);
      },
      error: function(data) {
        console.error('error receving message', data);
      },
      contentType: 'application/json',
    });
  },

  handleMessages: function (responses) {
    responses.forEach(function(response) {
      var $str = '<li><span class="message">' + response.username + ': ' + response.text + '</span></li>';
      $('#chats').append($str);
    });
  },

  clearMessages: function () {
    $('#chats').html('');
  },

  renderMessage: function (message) {
    $message = $('<div class="message">' + message + '</div>');
    $('#chats').append($message);
  },

  renderRoom: function (room) {
    $roomName = $('<div id="' + room + '"></div>');
    $('#roomSelect').append($roomName);
  }


};

app.init();