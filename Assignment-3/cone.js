var gl = null;
var cone = null;
var state = {
    gl: null,
    program: null,
    ui: {
        dragging: false,
        mouse: {
          lastX: -1,
          lastY: -1,
      },
        pressedKeys: {},
    },
    animation: {},
    app: {
        angle: {
          x: 0,
          y: 0,
      },
        eye: {
          x:2.,
          y:2.,
          z:7.,
      },
    },
};

function init() {
    state.canvas = document.getElementById( "webgl-canvas" );
    gl = WebGLUtils.setupWebGL( state.canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    
    gl.clearColor( 0.0, 1.0, 0.0, 1.0 );
    initCallbacks();
    cone = new Cone(gl);
    render();
    animate()
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    cone.render();
}

function initCallbacks() {
    document.onkeydown = keydown;
    document.onkeyup = keyup;
    state.canvas.onmousedown = mousedown;
    state.canvas.onmouseup = mouseup;
    state.canvas.onmousemove = mousemove;
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

function animate() {
      state.animation.tick = function() {
        updateState();
        draw();
        requestAnimationFrame(state.animation.tick);
    };
      state.animation.tick();
}

function updateState() {
      var speed = 0.2;
      if (state.ui.pressedKeys[37]) {
      // left
        state.app.eye.x += speed;
    } else if (state.ui.pressedKeys[39]) {
      // right
        state.app.eye.x -= speed;
    } else if (state.ui.pressedKeys[40]) {
      // down
        state.app.eye.y += speed;
    } else if (state.ui.pressedKeys[38]) {
      // up
        state.app.eye.y -= speed;
    }
}

function draw(args) {
    var v = (args && args.v) ? args.v : DEFAULT_VERT;
    var vi = (args && args.vi) ? args.vi : DEFAULT_INDICES;
    var uMVPMatrix = state.gl.getUniformLocation(state.program, 'uMVPMatrix');
    var n = initVertexBuffers(v, vi).indices.length;
    var mvm = mat4.create();
    var pm = mat4.create();
    var mvp = mat4.create();

    mat4.perspective(pm,
                 20, 1/1, 1, 100
                );
    mat4.lookAt(mvm,
            vec3.fromValues(state.app.eye.x,state.app.eye.y,state.app.eye.z),
            vec3.fromValues(0,0,0),
            vec3.fromValues(0,1,0)
           );
    mat4.copy(mvp, pm);
    mat4.multiply(mvp, mvp, mvm);
    mat4.rotateX(mvp, mvp, state.app.angle.x);
    mat4.rotateY(mvp, mvp, state.app.angle.y);

    state.gl.useProgram(state.program);
    state.gl.clear(state.gl.COLOR_BUFFER_BIT | state.gl.DEPTH_BUFFER_BIT);
    state.gl.uniformMatrix4fv(uMVPMatrix, false, mvp);
    state.gl.drawElements(state.gl.TRIANGLES, n, state.gl.UNSIGNED_BYTE, 0);
}

function initVertexBuffers(v, i) {
      var vertices = new Float32Array(v);
      vertices.stride = 8;
      vertices.attributes = [
        {name:'aPosition', size:3, offset:0},
        {name:'aColor',    size:3, offset:4},
    ];
      vertices.n = vertices.length/vertices.stride;
      vertices.indices = i;
      state.program.renderBuffers(vertices, i);
      return vertices;
}
window.onload = init;
