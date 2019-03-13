var socket=io();

function Lampje(lampje){
    console.log(lampje);
    // var xhr=new XMLHttpRequest();
    // xhr.open('GET','/lampje'+lampje);
    // xhr.send();
    document.getElementById('lampje').innerText=lampje;
    document.getElementById('fototje').src=lampje==1?"turbine-1.jpg": "turbine-2.jpg";    
    socket.emit('msg', lampje);
}
socket.on("btnpress",function(msg){
    document.getElementById('lampje').innerText=msg;
})