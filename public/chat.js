$(function(){
    
    //make connection
    var myUsername = "Anonymous"
    var socket=io.connect('http://localhost:3000')

    //buttons and inputs 
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    

    //Emit message
    send_message.click(function(){
        socket.emit('new_message', {message : message.val()})
    })

    ///Listen on new_message
    socket.on("new_message", (data) => {
        if (myUsername == data.username){
            chatroom.append('       <div class="card bg-primary rounded w-75 z-depth-0 float-right  mb-1 message-text"><div class="card-body p-2"><p class="card-text black-text">' + data.message + '</p></div></div>')
        } else {
            chatroom.append('       <div class="card bg-light rounded w-75 z-depth-0 mb-1 message-text"><div class="card-body p-2"><p class="card-text black-text">' + data.message + '</p></div></div>')
        }
    })


    //emit a username
    send_username.click(function(){
        console.log(username.val());
        socket.emit('change_username', {username:username.val()})
        myUsername=(username.val());
    })
    //emit typing
    message.bind("keypress",() =>{
        socket.emit('typing')
    })

    //listen on typing
    socket.on('typing',(data)=>{
        feedback.html("<p><i>"+data.username+"is typing a message....."+"</i></p>")
        setTimeout(function(){feedback.html("")},1000)
    })
});