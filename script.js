var size = 25;

var x_center = window.innerWidth/2;
var y_center = window.innerHeight/2;

var get_mouse_pos = true;
var get_touch_pos = false;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


draw();

function draw() {

//         canvas.addEventListener('mousedown', e => {
//         get_mouse_pos = true;
//         getMousePosition(canvas, e)
//         });
          
//         canvas.addEventListener('mouseup', e => {
//         get_mouse_pos = false;
//         });
      
        canvas.addEventListener('mousemove', function(e) {
          if(get_mouse_pos) {
            getMousePosition(canvas, e)
          }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
          
        canvas.addEventListener('touchend', function(e) {
            get_touch_pos = false;
        }, false);
          
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);

    
  
    canvas.style.width = window.innerWidth + 'px'  ;
    canvas.style.height = window.innerHeight + 'px';
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    let min = Math.min(canvas.width, canvas.height);
    
    
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let columns = canvas.width/size;
    let rows = canvas.height/size; 

    let scale_radius = 2.5;

    for (let i = 0; i < columns; i++ ) {
        for (let j = 0; j < rows; j++) {
            
            let dist = Math.sqrt((scale_radius*(size*(i + 0.5) - x_center)/min)**4 + (scale_radius*(size*(j + 0.5) - y_center)/min)**4)/Math.SQRT2;
            let x_shift = dist*(2*Math.random() - 1);
            let y_shift = dist*(2*Math.random() - 1);
            plus(size*(i + 0.5),
                 size*(j + 0.5),
                 x_shift, y_shift,
                 size,
                 3,
                 'hsla(280,100%,60%, 0.7)');
        }
    }

    window.requestAnimationFrame(draw);
}

function plus(x, y, x_shift, y_shift, size, line_width, color) {

    ctx.strokeStyle = color;
    ctx.lineWidth = line_width;
    ctx.beginPath();
    ctx.moveTo(x + x_shift*size/2, y - size/2);
    ctx.lineTo(x + x_shift*size/2, y + size/2);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = color;
    ctx.lineWidth = line_width;
    ctx.beginPath();
    ctx.moveTo(x - size/2, y + y_shift*size/2);
    ctx.lineTo(x + size/2, y + y_shift*size/2);
    ctx.closePath();
    ctx.stroke();
}

function getMousePosition(canvas, event) {
    x_center = event.clientX;
    y_center = event.clientY;
}

function getTouchPosition(canvas, event) {
    var touch = event.touches[0];
    x_center = touch.clientX;
    y_center = touch.clientY;   
}