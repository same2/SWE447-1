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
    
    cone = new Cone( gl, n );
    render();
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.drawArrays(gl.POINTS, 0, 4);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    cone.render();
}

window.onload = init;
