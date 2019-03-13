var socket=io();

function Lampje(lampje){
    console.log(lampje);
    // var xhr=new XMLHttpRequest();
    // xhr.open('GET','/lampje'+lampje);
    // xhr.send();
    socket.emit('msg', lampje);
}