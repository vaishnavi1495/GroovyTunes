var socket = null;
var isopen = false;
window.onload = function() {
  socket = new WebSocket("ws://127.0.0.1:9000");
  socket.onopen = function() {
    console.log("Connected!");
    isopen = true;
    socket.send('getMusic')
  }
  socket.onmessage = function(e) {
    var json = JSON.parse(e.data);
    console.log(json)
    if (json) {
      dispSongs(json)
    }
  }

  socket.onclose = function(e) {
    console.log("Connection closed.");
    socket = null;
    isopen = false;
  }
};

function dispSongs(_songs) {
  var fields = ['albumartist', 'album', 'genre', 'title', 'length']
  var html = '<table class="table table-hover"><tr>'
  _.each(fields, function(_field){html += '<th>' + _field + '</th>'});
  html += '</tr>'
  _.each(_songs, function(_song) {
    html += '<tr>'
    _.each(fields, function(_field){
      html += '<td onclick="dispPlayer(\'' + _song.src + '\')">' + (_song.meta[_field] || '') + '</td>'
    });
    html += '</tr>'
  });
  html += '</table>'
  $('#songs').html(html);
}

function dispPlayer(_src){
  html = '<audio controls><source src="' + _src + '" type="audio/mpeg">Your browser does not support the audio element.</audio>';
  $('#player').html(html);
}
