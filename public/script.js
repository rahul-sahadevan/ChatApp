var socket = io();

let username = "";
const btn = document.getElementById("join-chat");
const usernameInput = document.getElementById("username-input");
const usernameForm = document.querySelector(".form-username");
const chatroomContainer = document.querySelector(".chatroom-container");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-button");
const messagesContainer = document.querySelector(".messages");
const gender = document.querySelector(".gend");
const photo= document.querySelector(".photo");
const header = document.querySelector(".header")



btn.addEventListener("click",(e)=>{
    e.preventDefault();
    username = usernameInput.value;
    const user = document.createElement("i");
  
    // user.style.width = "100%"
    // user.style.height = "100%"
    user.style.color = "blue"
    if(gender.value === "male"){
        console.log(gender.value )
        user.setAttribute("class","fa-solid fa-user")
    }
    else{
        user.setAttribute("class","fa-sharp fa-solid fa-user")
    }
    photo.append(user);
    console.log(photo);

    if(username){
        usernameForm.style.display = "none";
        chatroomContainer.style.display = "block";
        header.innerText = username;
    }
})

sendBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let data = {
        id:socket.id,
        username:  username,
        message: messageInput.value,
    }
    socket.emit("secrete message",data);
    appendMessage(data,"sent");
})

socket.on("secrete message",(data)=>{
    if(data.id !== socket.id){
        appendMessage(data,"recieved");
    }
})
function appendMessage(data,type){
    var msgDiv = document.createElement("div");
    msgDiv.innerText = `${data.username}: ${data.message}`;

    if(type === "sent"){
        msgDiv.setAttribute("class","message sent");
    }
    else{
        msgDiv.setAttribute("class","message");
    }

    messagesContainer.append(msgDiv);
    messageInput.value = "";
}