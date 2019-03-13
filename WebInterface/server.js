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
    })
})

var gpio17=gpio.export(17,{
    direction:gpio.DIRECTION.OUT,
    interval:200
});var gpio27=gpio.export(27,{
    direction:gpio.DIRECTION.OUT,
    interval:200
});

function lampje(led){
    if(led==1){
        gpio17.set(1);
        gpio27.set(0);
    }else{
        gpio17.set(0);
        gpio27.set(1);
    }
    console.log(led);
}
app.use("/", express.static('static'));