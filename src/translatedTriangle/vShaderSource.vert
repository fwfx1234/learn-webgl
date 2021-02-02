attribute vec4 a_Position;
uniform vec4 u_MoveDistance;
uniform float u_Cos, u_Sin;
// x = r cos(b) => r = x / cos(b)
// y = r sin(b) => r = y / sin(b)
// 旋转a 度， x1 = r cos(a + b) y1 = r sin(a + b)
// x1 = r cos(a) * cos(b) - r sin(a)sin(b)
// y1 = r sin(a)cos(b) + r sin(b)cos(a)
// x1 = x cos(a) - y sin(a)
// y1 = x sin(a) + y cos(a)
void main() {
    vec4 Position = a_Position + u_MoveDistance;
    gl_Position.x = u_MoveDistance.x + a_Position.x * u_Cos - a_Position.y * u_Sin;
    gl_Position.y = u_MoveDistance.y + a_Position.x * u_Sin + a_Position.y * u_Cos;
    gl_Position.z = Position.z;
    gl_Position.w = 1.0;
}
