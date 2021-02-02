attribute vec4 a_Position;
uniform mat4 u_Matrix;
uniform mat4 u_RotateMatrix;
// 平移
// x1 = x + dx
// y1 = y + dy
// z1 = z + dz
// x, y, z, w  固定 z = 1, w = 1
//[ 1, 0, 0, dx,    x
//  0, 1, 0, dy,    y
//  0, 0, 1, dz,    z
//  0, 0, 0, 0,     1
//]
// 旋转
// x = r cos(b) => r = x / cos(b)
// y = r sin(b) => r = y / sin(b)
// 旋转a 度， x1 = r cos(a + b) y1 = r sin(a + b)
// x1 = r cos(a) * cos(b) - r sin(a)sin(b)
// y1 = r sin(a)cos(b) + r sin(b)cos(a)
// x1 = x cos(a) - y sin(a)
// y1 = x sin(a) + y cos(a)
//[ cos(a), -sin(a), 0, 0,   x
//  sin(a),  cos(a), 0, 0,   y
//  0,       0,      0, 1,   z
//  0,       0,      0, 1,    1
//]
void main() {
    vec4 Position = u_Matrix * u_RotateMatrix * a_Position ;
    gl_Position = Position;
}
