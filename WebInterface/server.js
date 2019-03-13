const express=require('express')
const app = express()
const port = 3000

var http=require('http').Server(app);

var gpio=require("gpio");
var server=app.listen(port);
var io=require('socket.io').listen(server);

io.on('connection',function(socket){
    console.log('Connected');
    socket.on('msg', function(msg){
        console.log(msg);
        lampje(msg);
    })
})

var led1=gpio.export(17,{
    direction:gpio.DIRECTION.OUT,
    interval:200
});var led2=gpio.export(27,{
    direction:gpio.DIRECTION.OUT,
    interval:200
});
var btn1=gpio.export(21,{
    direction:gpio.DIRECTION.IN,
    interval:200
});var btn2=gpio.export(20,{
    direction:gpio.DIRECTION.IN,
    interval:200
});
btn1.on("change",function(){
    lampje(1);
    });btn2.on("change",function(){
        lampje(2);
        });

function lampje(led){
    console.log("btn"+led);
    io.emit('btnpress',led);
    if(led=="1"){
        led1.set(1);
        led2.set(0);
    }else{
        led1.set(0);
        led2.set(1);
    }
}
app.use("/", express.static('static'));