const express=require('express')
const app = express()
const port = 3000

// var http=require('http').Server(app);

var gpio=require("gpio");
// var server=app.listen(port);
// var io=require('socket.io').listen(server);

// io.on('connection',function(socket){
//     console.log('Connected');
//     socket.on('msg', function(msg){
//         console.log(msg);
//         lampje(msg);
//     })
// })

// var led1=gpio.export(17,{
//     direction:gpio.DIRECTION.OUT,
//     interval:200
// });var led2=gpio.export(27,{
//     direction:gpio.DIRECTION.OUT,
//     interval:200
// });
// var btn1=gpio.export(21,{
//     direction:gpio.DIRECTION.IN,
//     interval:200
// });var btn2=gpio.export(20,{
//     direction:gpio.DIRECTION.IN,
//     interval:200
// });

// btn1.on("change",function(){
//     lampje(1);
//     });btn2.on("change",function(){
//         lampje(2);
//         });

// function lampje(led){
//     console.log("btn"+led);
//     io.emit('btnpress',led);
//     if(led=="1"){
//         led1.set(1);
//         led2.set(0);
//     }else{
//         led1.set(0);
//         led2.set(1);
//     }

// }

var ws281x = require('rpi-ws281x-native');
/*
LEDS 1-9:
2 3 4 17 27 22 10 9 11 


Buttons 1-4:
 6 13 19 26
*/ 
const channels = ws281x.init(5,{
    dma: 10,
    freq: 800000,
    channels: [ { gpio:2,invert:false,brightness:255,stripType: 'ws2812'},
      { gpio:3,invert:false,brightness:255,stripType: 'ws2812'},
      { gpio:4,invert:false,brightness:255,stripType: 'ws2812'},
      { gpio:17,invert:false,brightness:255,stripType: 'ws2812'},
      { gpio:27,invert:false,brightness:255,stripType: 'ws2812'},
      { gpio:22,invert:false,brightness:255,stripType: 'ws2812'},
      { gpio:10,invert:false,brightness:255,stripType: 'ws2812'},
      { gpio:9,invert:false,brightness:255,stripType: 'ws2812'},
      { gpio:11,invert:false,brightness:255,stripType: 'ws2812'}
    
    ]

  });



var GPIOPINS= {
    btn1:gpio.export(6, {direction:gpio.DIRECTION.IN, interval:200}),
    btn2:gpio.export(13, {direction:gpio.DIRECTION.IN, interval:200}), 
    btn3:gpio.export(19, {direction:gpio.DIRECTION.IN, interval:200}),
    btn4:gpio.export(26, {direction:gpio.DIRECTION.IN, interval:200})
}
GPIOPINS.btn1.on("change",DisplayFunctions.LightLed.bind(1));
GPIOPINS.btn2.on("change",DisplayFunctions.LightLed.bind(2));
GPIOPINS.btn3.on("change",DisplayFunctions.LightLed.bind(3));
GPIOPINS.btn4.on("change",DisplayFunctions.LightLed.bind(4));
var DisplayFunctions={
    LedStates:{
        "compressor":{
            0:"#0000FF",
            1:"#0000FF",
            2:"#FFFFFF",
            3:"#FFFFFF",
            4:"#FFFFFF",
            5:"#FFFFFF",
            6:"#FFFFFF",
            7:"#FFFFFF",
            8:"#FFFFFF",
            9:"#FFFFFF"
        },
        "verbrandingskamer":{
            0:"#FFFFFF",
            1:"#FFFFFF",
            2:"#f4b042",
            3:"#f4b042",
            4:"#FF0000",
            5:"#FF0000",
            6:"#FFFFFF",
            7:"#FFFFFF",
            8:"#FFFFFF",
            9:"#FFFFFF"
        },
        "uitlaat":{
            0:"#FFFFFF",
            1:"#FFFFFF",
            2:"#FFFFFF",
            3:"#FFFFFF",
            4:"#FFFFFF",
            5:"#FFFFFF",
            6:"#FFFFFF",
            7:"#FFFFFF",
            8:"#FFFFFF",
            9:"#FFFFFF"
        },
        "inactive":{
            0:"#FFFFFF",
            1:"#FFFFFF",
            2:"#FFFFFF",
            3:"#FFFFFF",
            4:"#FFFFFF",
            5:"#FFFFFF",
            6:"#FFFFFF",
            7:"#FF0000",
            8:"#FF0000",
            9:"#FF0000"
        }
    },
    ShowPart:function(part){
        var LedState=DisplayFunctions.LedStates[part];
        for(var LedStrip in Object.keys(LedState)){
            console.log(LedStrip, DisplayFunctions.LedStates[LedStrip]);
            DisplayFunctions.LightLed(GPIOPINS["led"+LedStrip+"ch"], DisplayFunctions.LedStates[LedStrip]);
        }
    },
    LightLed:function(led,color){
        var colors=led.array;
        for(let i=0;i<led.count;i++){
            colors[i]=color;
        }
    }
};

var StepperFunctions={
    Rotate:function(delay){
        gpio.export(17,{
    direction:gpio.DIRECTION.OUT,
    interval:200
});
    }
}

app.use("/", express.static('static'));