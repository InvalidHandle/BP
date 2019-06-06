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

var img=document.getElementById("schematicimg");
var canvas=document.getElementById("schematiccanvas");
var ctx=canvas.getContext("2d");
ctx.drawImage(img, 0,0);


var perimeter = new Array();
var complete = false;
var canvas = document.getElementById("schematiccanvas");
var ctx;
var poly=[[296,380]    ,[370,357]
    ,[387,299]
    ,[360,252]
    ,[320,239]
    ,[234,263]
    ,[244,314]
    ,[258,352]];
    var poly2=[[228,256],
    [252, 355],
    [303, 384],
    [293, 440],
    [307, 435],
    [307, 468],
    [259, 479],
    [44, 443],
    [9, 261],
    [85, 173],
    [186, 178],
    [222, 212]];
function drawPoly(){

    ctx.lineWidth = 5;
    ctx.strokeStyle = "green";
    ctx.lineCap = "square";
    ctx.beginPath();

    for(var i=0; i<poly.length; i++){
        if(i==0){
            ctx.moveTo(poly[i][0],poly[i][1]);
        } else {
            ctx.lineTo(poly[i][0],poly[i][1]);
        }
    }
        ctx.lineTo(poly[0][0],poly[0][1]);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";
    ctx.lineCap = "square";
    ctx.beginPath();

    for(var i=0; i<poly2.length; i++){
        if(i==0){
            ctx.moveTo(poly2[i][0],poly2[i][1]);
        } else {
            ctx.lineTo(poly2[i][0],poly2[i][1]);
        }
    }
        ctx.lineTo(poly2[0][0],poly2[0][1]);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fill();
    ctx.stroke();
}
drawPoly();

function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
function point_it(event){
    if(inside([event.offsetX,event.offsetY],poly)){
        console.log("compressor");
        location.href="compressor.html";
    }
    if(inside([event.offsetX,event.offsetY], poly2)){
        location.href="inlaat.html"
    }
}

// function line_intersects(p0, p1, p2, p3) {
//     var s1_x, s1_y, s2_x, s2_y;
//     s1_x = p1['x'] - p0['x'];
//     s1_y = p1['y'] - p0['y'];
//     s2_x = p3['x'] - p2['x'];
//     s2_y = p3['y'] - p2['y'];

//     var s, t;
//     s = (-s1_y * (p0['x'] - p2['x']) + s1_x * (p0['y'] - p2['y'])) / (-s2_x * s1_y + s1_x * s2_y);
//     t = ( s2_x * (p0['y'] - p2['y']) - s2_y * (p0['x'] - p2['x'])) / (-s2_x * s1_y + s1_x * s2_y);

//     if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
//     {
//         // Collision detected
//         return true;
//     }
//     return false; // No collision
// }

// function point(x, y){
//     ctx.fillStyle="green";
//     ctx.strokeStyle = "green";
//     ctx.fillRect(x-2,y-2,4,4);
//     ctx.moveTo(x,y);
// }

// function undo(){
//     ctx = undefined;
//     perimeter.pop();
//     complete = false;
//     start(true);
// }

// function clear_canvas(){
//     ctx = undefined;
//     perimeter = new Array();
//     complete = false;
//     document.getElementById('coordinates').value = '';
//     start();
// }

// function draw(end){
//     ctx.lineWidth = 1;
//     ctx.strokeStyle = "green";
//     ctx.lineCap = "square";
//     ctx.beginPath();
//     console.log(perimeter);
//     for(var i=0; i<perimeter.length; i++){
//         if(i==0){
//             ctx.moveTo(perimeter[i]['x'],perimeter[i]['y']);
//             end || point(perimeter[i]['x'],perimeter[i]['y']);
//         } else {
//             ctx.lineTo(perimeter[i]['x'],perimeter[i]['y']);
//             end || point(perimeter[i]['x'],perimeter[i]['y']);
//         }
//     }
//     if(end){
//         ctx.lineTo(perimeter[0]['x'],perimeter[0]['y']);
//         ctx.closePath();
//         ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
//         ctx.fill();
//         ctx.strokeStyle = 'blue';
//         complete = true;
//     }
//     ctx.stroke();

// }

// function check_intersect(x,y){
//     if(perimeter.length < 4){
//         return false;
//     }
//     var p0 = new Array();
//     var p1 = new Array();
//     var p2 = new Array();
//     var p3 = new Array();

//     p2['x'] = perimeter[perimeter.length-1]['x'];
//     p2['y'] = perimeter[perimeter.length-1]['y'];
//     p3['x'] = x;
//     p3['y'] = y;

//     for(var i=0; i<perimeter.length-1; i++){
//         p0['x'] = perimeter[i]['x'];
//         p0['y'] = perimeter[i]['y'];
//         p1['x'] = perimeter[i+1]['x'];
//         p1['y'] = perimeter[i+1]['y'];
//         if(p1['x'] == p2['x'] && p1['y'] == p2['y']){ continue; }
//         if(p0['x'] == p3['x'] && p0['y'] == p3['y']){ continue; }
//         if(line_intersects(p0,p1,p2,p3)==true){
//             return true;
//         }
//     }
//     return false;
// }

// function point_it(event) {
//     if(complete){
//         alert('Polygon already created');
//         return false;
//     }
//     var rect, x, y;

//     if(event.ctrlKey || event.which === 3 || event.button === 2){
//         if(perimeter.length==2){
//             alert('You need at least three points for a polygon');
//             return false;
//         }
//         x = perimeter[0]['x'];
//         y = perimeter[0]['y'];
//         if(check_intersect(x,y)){
//             alert('The line you are drowing intersect another line');
//             return false;
//         }
//         draw(true);
//         alert('Polygon closed');
// 	event.preventDefault();
//         return false;
//     } else {
//         rect = canvas.getBoundingClientRect();
//         x = event.clientX - rect.left;
//         y = event.clientY - rect.top;
//         if (perimeter.length>0 && x == perimeter[perimeter.length-1]['x'] && y == perimeter[perimeter.length-1]['y']){
//             // same point - double click
//             return false;
//         }
//         if(check_intersect(x,y)){
//             alert('The line you are drowing intersect another line');
//             return false;
//         }
//         perimeter.push({'x':x,'y':y});
//         draw(false);
//         return false;
//     }
// }

// function start(with_draw) {
//     var img = new Image();
//     img.src = canvas.getAttribute('data-imgsrc');

//     img.onload = function(){
//         ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//         if(with_draw == true){
//             draw(false);
//         }
//     }
// }