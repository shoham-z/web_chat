const socket = io('ws://localhost:8000');

socket.on('message', text => {
    const messageItem = document.createElement('li').innerHTML = text;
    document.querySelector('ul').appendChild(messageItem);
    const messagesDiv = document.getElementById("messages");
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message', text);
}
