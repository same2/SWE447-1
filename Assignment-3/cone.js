var gl = null;
var cone = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    
    gl.clearColor( 0.0, 1.0, 0.0, 1.0 );
    
    cone = new Cone(gl);
    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    cone.render();
}

function keydown(event) {
    state.ui.pressedKeys[event.keyCode] = true;
}

function keyup(event) {
    state.ui.pressedKeys[event.keyCode] = false;
}

function mousedown(event) {
    var x = event.clientX;
    var y = event.clientY;
    var rect = event.target.getBoundingClientRect();
    // If we're within the rectangle, mouse is down within canvas.
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      state.ui.mouse.lastX = x;
      state.ui.mouse.lastY = y;
      state.ui.dragging = true;
    }
}

function mouseup(event) {
    state.ui.dragging = false;
}

function mousemove(event) {
    var x = event.clientX;
    var y = event.clientY;
    if (state.ui.dragging) {
      // The rotation speed factor
      // dx and dy here are how for in the x or y direction the mouse moved
      var factor = 10/state.canvas.height;
      var dx = factor * (x - state.ui.mouse.lastX);
      var dy = factor * (y - state.ui.mouse.lastY);

      // update the latest angle
      state.app.angle.x = state.app.angle.x + dy;
      state.app.angle.y = state.app.angle.y + dx;
    }
    // update the last mouse position
    state.ui.mouse.lastX = x;
    state.ui.mouse.lastY = y;
  }
})(window || this);

window.onload = init;
