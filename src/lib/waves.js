export default {
  waves: function () {
    "use strict";

    function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[ Symbol.hasInstance ]) { return right[ Symbol.hasInstance ](left); } else { return left instanceof right; } }

    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

    function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[ i ] = arr[ i ]; } return arr2; } }

    function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[ i ]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

    var ShaderProgram =
      /*#__PURE__*/
      function () {
        function ShaderProgram(holder) {
          var _this = this;

          var options = arguments.length > 1 && arguments[ 1 ] !== undefined ? arguments[ 1 ] : {};

          _classCallCheck(this, ShaderProgram);

          options = Object.assign({
            antialias: false,
            depthTest: false,
            mousemove: false,
            autosize: true,
            side: 'front',
            vertex: "\n                  precision highp float;\n          \n                  attribute vec4 a_position;\n                  attribute vec4 a_color;\n          \n                  uniform float u_time;\n                  uniform vec2 u_resolution;\n                  uniform vec2 u_mousemove;\n                  uniform mat4 u_projection;\n          \n                  varying vec4 v_color;\n          \n                  void main() {\n          \n                    gl_Position = u_projection * a_position;\n                    gl_PointSize = (10.0 / gl_Position.w) * 100.0;\n          \n                    v_color = a_color;\n          \n                  }",
            fragment: "\n                  precision highp float;\n          \n                  uniform sampler2D u_texture;\n                  uniform int u_hasTexture;\n          \n                  varying vec4 v_color;\n          \n                  void main() {\n          \n                    if ( u_hasTexture == 1 ) {\n          \n                      gl_FragColor = vec4(0.1, 1, 0.5, 0.15) * texture2D(u_texture, gl_PointCoord);\n          \n                    } else {\n          \n                      gl_FragColor = v_color;\n          \n                    }\n          \n                  }",
            uniforms: {},
            buffers: {},
            camera: {},
            texture: null,
            onUpdate: function onUpdate() { },
            onResize: function onResize() { }
          }, options);
          var uniforms = Object.assign({
            time: {
              type: 'float',
              value: 0
            },
            hasTexture: {
              type: 'int',
              value: 0
            },
            resolution: {
              type: 'vec2',
              value: [ 0, 0 ]
            },
            mousemove: {
              type: 'vec2',
              value: [ 0, 0 ]
            },
            projection: {
              type: 'mat4',
              value: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]
            }
          }, options.uniforms);
          var buffers = Object.assign({
            position: {
              size: 3,
              data: []
            },
            color: {
              size: 4,
              data: []
            }
          }, options.buffers);
          var camera = Object.assign({
            fov: 60,
            near: 1,
            far: 10000,
            aspect: 1,
            z: 100,
            perspective: true
          }, options.camera);
          var canvas = document.createElement('canvas');
          var gl = canvas.getContext('webgl', {
            antialias: options.antialias
          });
          if (!gl) return false;
          this.count = 0;
          this.gl = gl;
          this.canvas = canvas;
          this.camera = camera;
          this.holder = holder;
          this.onUpdate = options.onUpdate;
          this.onResize = options.onResize;
          this.data = {};
          holder.appendChild(canvas);
          this.createProgram(options.vertex, options.fragment);
          this.createBuffers(buffers);
          this.createUniforms(uniforms);
          this.updateBuffers();
          this.updateUniforms();
          this.createTexture(options.texture);
          gl.enable(gl.BLEND);
          gl.enable(gl.CULL_FACE);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
          gl[ options.depthTest ? 'enable' : 'disable' ](gl.DEPTH_TEST);
          if (options.autosize) window.addEventListener('resize', function (e) {
            return _this.resize(e);
          }, false);
          if (options.mousemove) window.addEventListener('mousemove', function (e) {
            return _this.mousemove(e);
          }, false);
          this.resize();
          this.update = this.update.bind(this);
          this.time = {
            start: performance.now(),
            old: performance.now()
          };
          this.update();
        }

        _createClass(ShaderProgram, [ {
          key: "mousemove",
          value: function mousemove(e) {
            var x = e.pageX / this.width * 2 - 1;
            var y = e.pageY / this.height * 2 - 1;
            this.uniforms.mousemove = [ x, y ];
          }
        }, {
          key: "resize",
          value: function resize(e) {
            var holder = this.holder;
            var canvas = this.canvas;
            var gl = this.gl;
            var width = this.width = holder.offsetWidth;
            var height = this.height = holder.offsetHeight;
            var aspect = this.aspect = width / height;
            var dpi = this.dpi = devicePixelRatio;
            canvas.width = width * dpi;
            canvas.height = height * dpi;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            gl.viewport(0, 0, width * dpi, height * dpi);
            gl.clearColor(0, 0, 0, 0);
            this.uniforms.resolution = [ width, height ];
            this.uniforms.projection = this.setProjection(aspect);
            this.onResize(width, height, dpi);
          }
        }, {
          key: "setProjection",
          value: function setProjection(aspect) {
            var camera = this.camera;

            if (camera.perspective) {
              camera.aspect = aspect;
              var fovRad = camera.fov * (Math.PI / 180);
              var f = Math.tan(Math.PI * 0.5 - 0.5 * fovRad);
              var rangeInv = 1.0 / (camera.near - camera.far);
              var matrix = [ f / camera.aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (camera.near + camera.far) * rangeInv, -1, 0, 0, camera.near * camera.far * rangeInv * 2, 0 ];
              matrix[ 14 ] += camera.z;
              matrix[ 15 ] += camera.z;
              return matrix;
            } else {
              return [ 2 / this.width, 0, 0, 0, 0, -2 / this.height, 0, 0, 0, 0, 1, 0, -1, 1, 0, 1 ];
            }
          }
        }, {
          key: "createShader",
          value: function createShader(type, source) {
            var gl = this.gl;
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
              return shader;
            } else {
              console.log(gl.getShaderInfoLog(shader));
              gl.deleteShader(shader);
            }
          }
        }, {
          key: "createProgram",
          value: function createProgram(vertex, fragment) {
            var gl = this.gl;
            var vertexShader = this.createShader(gl.VERTEX_SHADER, vertex);
            var fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragment);
            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
              gl.useProgram(program);
              this.program = program;
            } else {
              console.log(gl.getProgramInfoLog(program));
              gl.deleteProgram(program);
            }
          }
        }, {
          key: "createUniforms",
          value: function createUniforms(data) {
            var _this2 = this;

            var gl = this.gl;
            var uniforms = this.data.uniforms = data;
            var values = this.uniforms = {};
            Object.keys(uniforms).forEach(function (name) {
              var uniform = uniforms[ name ];
              uniform.location = gl.getUniformLocation(_this2.program, 'u_' + name);
              Object.defineProperty(values, name, {
                set: function set(value) {
                  uniforms[ name ].value = value;

                  _this2.setUniform(name, value);
                },
                get: function get() {
                  return uniforms[ name ].value;
                }
              });
            });
          }
        }, {
          key: "setUniform",
          value: function setUniform(name, value) {
            var gl = this.gl;
            var uniform = this.data.uniforms[ name ];
            uniform.value = value;

            switch (uniform.type) {
              case 'int':
                {
                  gl.uniform1i(uniform.location, value);
                  break;
                }

              case 'float':
                {
                  gl.uniform1f(uniform.location, value);
                  break;
                }

              case 'vec2':
                {
                  gl.uniform2f.apply(gl, [ uniform.location ].concat(_toConsumableArray(value)));
                  break;
                }

              case 'vec3':
                {
                  gl.uniform3f.apply(gl, [ uniform.location ].concat(_toConsumableArray(value)));
                  break;
                }

              case 'vec4':
                {
                  gl.uniform4f.apply(gl, [ uniform.location ].concat(_toConsumableArray(value)));
                  break;
                }

              case 'mat2':
                {
                  gl.uniformMatrix2fv(uniform.location, false, value);
                  break;
                }

              case 'mat3':
                {
                  gl.uniformMatrix3fv(uniform.location, false, value);
                  break;
                }

              case 'mat4':
                {
                  gl.uniformMatrix4fv(uniform.location, false, value);
                  break;
                }
            } // ivec2       : uniform2i,
            // ivec3       : uniform3i,
            // ivec4       : uniform4i,
            // sampler2D   : uniform1i,
            // samplerCube : uniform1i,
            // bool        : uniform1i,
            // bvec2       : uniform2i,
            // bvec3       : uniform3i,
            // bvec4       : uniform4i,

          }
        }, {
          key: "updateUniforms",
          value: function updateUniforms() {
            var _this3 = this;

            var gl = this.gl;
            var uniforms = this.data.uniforms;
            Object.keys(uniforms).forEach(function (name) {
              var uniform = uniforms[ name ];
              _this3.uniforms[ name ] = uniform.value;
            });
          }
        }, {
          key: "createBuffers",
          value: function createBuffers(data) {
            var _this4 = this;

            var gl = this.gl;
            var buffers = this.data.buffers = data;
            var values = this.buffers = {};
            Object.keys(buffers).forEach(function (name) {
              var buffer = buffers[ name ];
              buffer.buffer = _this4.createBuffer('a_' + name, buffer.size);
              Object.defineProperty(values, name, {
                set: function set(data) {
                  buffers[ name ].data = data;

                  _this4.setBuffer(name, data);

                  if (name == 'position') _this4.count = buffers.position.data.length / 3;
                },
                get: function get() {
                  return buffers[ name ].data;
                }
              });
            });
          }
        }, {
          key: "createBuffer",
          value: function createBuffer(name, size) {
            var gl = this.gl;
            var program = this.program;
            var index = gl.getAttribLocation(program, name);
            var buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribPointer(index, size, gl.FLOAT, false, 0, 0);
            return buffer;
          }
        }, {
          key: "setBuffer",
          value: function setBuffer(name, data) {
            var gl = this.gl;
            var buffers = this.data.buffers;
            if (name == null && !gl.bindBuffer(gl.ARRAY_BUFFER, null)) return;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers[ name ].buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
          }
        }, {
          key: "updateBuffers",
          value: function updateBuffers() {
            var gl = this.gl;
            var buffers = this.buffers;
            Object.keys(buffers).forEach(function (name) {
              return buffers[ name ] = buffer.data;
            });
            this.setBuffer(null);
          }
        }, {
          key: "createTexture",
          value: function createTexture(src) {
            var gl = this.gl;
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([ 0, 0, 0, 0 ]));
            this.texture = texture;

            if (src) {
              this.uniforms.hasTexture = 1;
              this.loadTexture(src);
            }
          }
        }, {
          key: "loadTexture",
          value: function loadTexture(src) {
            var gl = this.gl;
            var texture = this.texture;
            var textureImage = new Image();

            textureImage.onload = function () {
              gl.bindTexture(gl.TEXTURE_2D, texture);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // gl.generateMipmap( gl.TEXTURE_2D )
            };

            textureImage.src = src;
          }
        }, {
          key: "update",
          value: function update() {
            var gl = this.gl;
            var now = performance.now();
            var elapsed = (now - this.time.start) / 5000;
            var delta = now - this.time.old;
            this.time.old = now;
            this.uniforms.time = elapsed;

            if (this.count > 0) {
              gl.clear(gl.COLORBUFFERBIT);
              gl.drawArrays(gl.POINTS, 0, this.count);
            }

            this.onUpdate(delta);
            requestAnimationFrame(this.update);
          }
        } ]);

        return ShaderProgram;
      }();

    var pointSize = 2.5;
    var waves = new ShaderProgram(document.querySelector('.waves'), {
      texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8v0wLRAAAAJHRSTlMAC/goGvDhmwcExrVjWzrm29TRqqSKenRXVklANSIUE8mRkGpv+HOfAAABCElEQVQ4y4VT13LDMAwLrUHteO+R9f/fWMfO6dLaPeKVEECRxOULWsEGpS9nULDwia2Y+ALqUNbAWeg775zv+sA4/FFRMxt8U2FZFCVWjR/YrH4/H9sarclSKdPMWKzb8VsEeHB3m0shkhVCyNzeXeAQ9Xl4opEieX2QCGnwGbj6GMyjw9t1K0fK9YZunPXeAGsfJtYjwzxaBnozGGorYz0ypK2HzQSYx1y8DgSRo2ewOiyh2QWOEk1Y9OrQV0a8TiBM1a8eMHWYnRMy7CZ4t1CmyRkhSUvP3gRXyHOCLBxNoC3IJv//ZrJ/kxxUHPUB+6jJZZHrpg6GOjnqaOmzp4NDR48OLxn/H27SRQ08S0ZJAAAAAElFTkSuQmCC',
      uniforms: {
        size: {
          type: 'float',
          value: pointSize
        },
        field: {
          type: 'vec3',
          value: [ 0, 0, 0 ]
        },
        speed: {
          type: 'float',
          value: 5
        }
      },
      vertex: "\n              #define M_PI 3.1415926535897932384626433832795\n          \n              precision highp float;\n          \n              attribute vec4 a_position;\n              attribute vec4 a_color;\n          \n              uniform float u_time;\n              uniform float u_size;\n              uniform float u_speed;\n              uniform vec3 u_field;\n              uniform mat4 u_projection;\n          \n              varying vec4 v_color;\n          \n              void main() {\n          \n                vec3 pos = a_position.xyz;\n          \n                pos.y += (\n                  cos(pos.x / u_field.x * M_PI * 8.0 + u_time * u_speed) +\n                  sin(pos.z / u_field.z * M_PI * 8.0 + u_time * u_speed)\n                ) * u_field.y;\n          \n                gl_Position = u_projection * vec4( pos.xyz, a_position.w );\n                gl_PointSize = ( u_size / gl_Position.w ) * 100.0;\n          \n                v_color = a_color;\n          \n              }",
      fragment: "\n              precision highp float;\n          \n              uniform sampler2D u_texture;\n          \n              varying vec4 v_color;\n          \n              void main() {\n          \n                gl_FragColor = vec4(0.1, 1, 0.5, 0.15) * texture2D(u_texture, gl_PointCoord);\n          \n              }",
      onResize: function onResize(w, h, dpi) {
        var position = [],
          color = [];
        var width = 400 * (w / h);
        var depth = 500;
        var height = 5;
        var distance = 5;

        for (var x = 0; x < width; x += distance) {
          for (var z = 0; z < depth; z += distance) {
            position.push(-width / 2 + x, -50, -depth / 3 + z);
            color.push(0, 1 - x / width * 1, 0.5 + x / width * 0.5, z / depth);
          }
        }

        this.uniforms.field = [ width, height, depth ];
        this.buffers.position = position;
        this.buffers.color = color;
        this.uniforms.size = h / 400 * pointSize * dpi;
      }
    });
  }
}