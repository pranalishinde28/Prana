const socket = io('https://localhost:5500');
//gets DOM elements in js variables jo humne declare kiye the 
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
//this is the audio that will play when somebody recieves the msg:
var audio = new Audio('ting.mp3');

//append function will append event info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append('messageElement');
    if (position == 'left') {
        audio.play();
    }
}
//ye command prompt will ask the new user it's name bfore entering the chat room
const name = prompt("enter your name to join");

//if a new user joins, this command recieves the event from server
socket.emit('new-user-joined', name)
//this command gives info to the already present in the room,abt the joined person, post the above event
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')//user-joining info will be displayed to right
})

socket.on('recieve', data => {
    append(`${data.name}:${data.message}`, 'left')//recieving message will be on left
})

socket.on('left', name => {
    append(`${name} left the chat`, 'right') //this will appear on right
})
//for sending the message
form.addEventListener('submit', (e) => { //event listener hai for eg. submit button click karne par kya action hona chahiye
    e.preventDefault(); //isse page reload nahi hoga submit karne par bhi
    const message = messageInput.value;
    append(`You:${message}`, right);//your sent messages will appear on right
    socket.emit('send', message);
    messageInput.value = ''
})