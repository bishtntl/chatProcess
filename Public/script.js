const socket = io();
const clientTotal = document.getElementById('clients-total')
const msgContainer =document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const msgForm = document.getElementById('message-form');
const msgInput = document.getElementById('message-input')
msgForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    sendMessage();
})
socket.on('clients',(data)=>{
    clientTotal.innerText = `Clients: ${data}`
    console.log(data);
})
function sendMessage(){
    console.log(msgInput.value);
    const dateTime = new Date();
   
    const hms = `${dateTime.getHours()}hr:${dateTime.getMinutes()}min:${dateTime.getSeconds()}sec`
    const data = {
        name:nameInput.value,
        message:msgInput.value,
        date:`${hms}`
    }
    socket.emit('message',data);
    addMessageToUI(true,data);
    msgInput.value = '';
}
socket.on('chat-message',(data)=>{
    console.log(data)
    addMessageToUI(false,data)
})
function addMessageToUI(isOwnMsg,data)
{
    const element =`
    <li class='${isOwnMsg ? "Msg_right" : "leftMsg" }'>
    <p class="message">
        ${data.message}
        <span>${data.name} :white_circle: ${moment(data.dateTime).fromNow()} </span>
    </p>
    </li>
    `
    msgContainer.innerHTML += element
}