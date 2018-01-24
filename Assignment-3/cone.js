var gl = null;
var cone = null;
attribute vec4 vPosition;

void main() 
{
    gl_Position = vPosition;
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.0, 1.0, 0.0, 1.0 );
    cone = new Cone( gl, n );
    cone.render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
}

window.onload = init;
