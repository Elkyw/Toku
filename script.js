// 初始化 firebase API
var kdata = new Firebase('radiant-torch-9350.firebaseapp.com'); 
                         // https://moeshi.firebaseio.com/
                         // https://radiant-torch-9350.firebaseapp.com

// 信息输入框回车发送消息事件
$('#messageInput').on('keypress', function(e) {
  if (e.keyCode == 13) {
    sendMessage(e);
  }
});
$('#btnSendMessage').on('click', function(e) {
  sendMessage(e);
});

function sendMessage() {

  var name = $('#nameInput').val();
  var text = $('#messageInput').val();

  if (name == '' || text == '') {
    return false;
  }

  saveNickName(name);
  kdata.push({
    name: name,
    text: text
  });
  $('#messageInput').val('');

}

function saveNickName(nickname) {
  localStorage.setItem('nickname', nickname)
}

function loadNickName() {
  var nickname = localStorage.getItem('nickname');
  if (nickname) {
    $('#nameInput').val(nickname);
  }
}

// 有新信息时, 在消息框里显示新消息
kdata.on('child_added', function(snapshot) {
  var message = snapshot.val();
  $('<div/>').text(message.text).prepend($('<em/>').text(message.name + ': ')).prependTo($('#messagesDiv'));
});

$(function() {

  loadNickName();

});