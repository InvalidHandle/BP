const express=require('express')
const app = express()
const port = 3000
var gpio=require("gpio");
var gpio17=gpio.export(17,{
    direction:gpio.DIRECTION.OUT,
    interval:200
});var gpio27=gpio.export(27,{
    direction:gpio.DIRECTION.OUT,
    interval:200
});
app.use("/", express.static('static'));
app.get('/lampje1', function(req,res){
    console.log('lampje1');
    gpio17.set(1);
    gpio27.set(0);
    res.end();
})
app.get('/lampje2', function(req,res){
    console.log('lampje2');
    gpio17.set(0);
    gpio27.set(1);
    res.end();
})
app.listen(port);