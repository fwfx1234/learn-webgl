attribute vec4 a_Position;
attribute float a_Size;
attribute vec4 a_Color;
varying vec4 v_Color;

void main() {
    gl_Position = a_Position;
    gl_PointSize = a_Size;
    v_Color = a_Color;
}
