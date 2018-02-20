/////////////////////////////////////////////////////////////////////////////
//
//  Solar.js
//
/////////////////////////////////////////////////////////////////////////////

var canvas;
var gl;

//---------------------------------------------------------------------------
//
//  Declare our array of planets (each of which is a sphere)
//
// The list of planets to render.  Uncomment any planets that you are
// including in the scene. For each planet in this list, make sure to
// set its distance from the Sun, as well its size, color, and orbit
// around the Sun.

var Planets = {
  Sun : undefined,
  Mercury : undefined,
  Venus : undefined,
  Earth : undefined,
  Moon : undefined,
  Mars : undefined,
  Jupiter : undefined,
  Saturn : undefined,
  Uranus : undefined,
  Neptune : undefined,
  Pluto : undefined
};

var V;

var P;
var near = 10;
var far = 440;

var time = 0.0;
var timeDelta = 0.5;

//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
  canvas = document.getElementById("webgl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  for (var name in Planets ) {

    var planet = Planets[name] = new Sphere();

    planet.uniforms = {
      color : gl.getUniformLocation(planet.program, "color"),
      MV : gl.getUniformLocation(planet.program, "MV"),
      P : gl.getUniformLocation(planet.program, "P"),
    };
  }

  resize();

  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//

function render() {
  time += timeDelta;

  var ms = new MatrixStack();
  var rotAxis = [0, 1, 0.5];

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  V = translate(0.0, 0.0, -0.5*(near + far));
  ms.load(V);

  var name, planet, data;

  name = "Sun";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  // Mercury

  name = "Mercury";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*10, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  // Venus

  name = "Venus";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*10, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  // Earth
  name = "Earth";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*10, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();

  // Moon

  name = "Moon";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*1000, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  // Mars

  name = "Mars";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*10, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  // Jupiter

  name = "Jupiter";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*10, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  // Saturn

  name = "Saturn";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*10, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  // Uranus

  name = "Uranus";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*10, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  // Neptune

  name = "Neptune";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*10, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  // Pluto

  name = "Pluto";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(time/data.year, rotAxis);
  ms.translate(data.distance*10, 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 120.0; // degrees
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;
