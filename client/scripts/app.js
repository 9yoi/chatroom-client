// YOUR CODE HERE:
var friendsList = [];

$(document).ready(function() {
  $('#send-btn').on('click', function(event) {
    console.log('on click');
    event.preventDefault();
    var msg = $('#msgBox').val();
    app.send(_.escape(msg));
    $('#msgBox').val('');

  });

});

app = {
  server: 'https://api.parse.com/1/classes/messages',
  init: function () {
    this.fetch();
  //  setInterval(function() { app.fetch(); }, 1000);

  },

  send: function (message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      //dataType: 'json',
      //contentType: 'application/json',
      success: function(data, a, b) {
        console.log('Msg sent');
        console.log('data: ', data, a, b);
        $('#chats').html(data);
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
        var arr = responses.results;
        arr.forEach(function(response) {
          var $message = '<li><span class="chat username">' + _.escape(response.username) + '</span>: ' + _.escape(response.text) + '</li>';
          app.renderMessage($message);
        });
      },
      error: function(data) {
        console.error('error receving message', data);
      },
      data: {
        limit: 30,
        order: '-createdAt'
      },
      contentType: 'application/json',
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