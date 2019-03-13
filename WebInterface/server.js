const express=require('express')
const app = express()
const port = 3000

app.use("/", express.static('static'));
app.get('/lampje1', function(req,res){
    console.log('lampje1');
    res.end();
})
app.get('/lampje2', function(req,res){
    console.log('lampje2');
    res.end();
})
app.listen(port);