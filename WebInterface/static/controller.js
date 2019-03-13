var socket=io();

function Lampje(lampje){
    console.log(lampje);
    // var xhr=new XMLHttpRequest();
    // xhr.open('GET','/lampje'+lampje);
    // xhr.send();
    document.getElementById('lampje').innerText=lampje;
    socket.emit('msg', lampje);
}
socket.on("btnpress",function(msg){
    document.getElementById('fototje').src=msg==1?"turbine-1.jpg": "turbine-2.jpg";    
    
    document.getElementById('lampje').innerText=msg;
})