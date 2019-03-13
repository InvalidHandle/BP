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

var led1=gpio.export(12,{
    direction:gpio.DIRECTION.OUT,
    interval:200
});var led2=gpio.export(16,{
    direction:gpio.DIRECTION.OUT,
    interval:200
});

function lampje(led){
    if(led==1){
        led1.set(1);
        led2.set(0);
    }else{
        led1.set(0);
        led2.set(1);
    }
    console.log(led);
}
app.use("/", express.static('static'));