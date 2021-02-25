import Vec3 from './Vec3'
class Matrix4 {
  public elements: Float32Array
  //  0,  1,  2,  3    x
  //  4,  5,  6,  7    y
  //  8,  9,  10, 11   z
  //  12, 13, 14, 15   w
  constructor(arr?: Array<number>) {
    this.elements = new Float32Array(16)
    if (arr) {
      for (let i = 0; i < 16; i++) {
        this.elements[i] = arr[i]
      }
    } else {
      this.setIdentity()
    }
  }
  setIdentity() {
    const e: Float32Array = this.elements
    e[0] = 1
    e[4] = 0
    e[8] = 0
    e[12] = 0
    e[1] = 0
    e[5] = 1
    e[9] = 0
    e[13] = 0
    e[2] = 0
    e[6] = 0
    e[10] = 1
    e[14] = 0
    e[3] = 0
    e[7] = 0
    e[11] = 0
    e[15] = 1
    return this
  }
  set(src: Matrix4) {
    if (src.elements === this.elements) {
      return
    }
    for (let i = 0; i < 16; ++i) {
      this.elements[i] = src.elements[i]
    }
    return this
  }
  multiply(other: Matrix4) {
    let i, e, a, b, ai0, ai1, ai2, ai3

    e = this.elements
    a = this.elements
    b = other.elements

    if (e === b) {
      b = new Float32Array(16)
      for (i = 0; i < 16; ++i) {
        b[i] = e[i]
      }
    }

    for (i = 0; i < 4; i++) {
      ai0 = a[i]
      ai1 = a[i + 4]
      ai2 = a[i + 8]
      ai3 = a[i + 12]
      e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3]
      e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7]
      e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11]
      e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15]
    }

    return this
  }
  transpose() {
    let e: Float32Array
    let t: number

    e = this.elements

    t = e[1]
    e[1] = e[4]
    e[4] = t
    t = e[2]
    e[2] = e[8]
    e[8] = t
    t = e[3]
    e[3] = e[12]
    e[12] = t
    t = e[6]
    e[6] = e[9]
    e[9] = t
    t = e[7]
    e[7] = e[13]
    e[13] = t
    t = e[11]
    e[11] = e[14]
    e[14] = t

    return this
  }
  setRotate(angle: number, x: number, y: number, z: number) {
    this.setIdentity()
    const e: Float32Array = this.elements
    let s = 1
    let c = 1
    angle = ((x + y + z) / Math.abs(x + y + z)) * angle
    s = Math.sin(angle)
    c = Math.cos(angle)
    if (x !== 0) {
      // 围绕x轴旋转 x
      e[0] = 1
      e[5] = c
      e[6] = -s
      e[9] = s
      e[10] = c
    }
    if (y !== 0) {
      // 围绕y轴旋转
      e[0] = c
      e[2] = -s
      e[8] = s
      e[10] = c
    }
    if (z !== 0) {
      // 围绕z轴旋转 z
      e[0] = c
      e[1] = -s
      e[4] = s
      e[5] = c
    }
    this.transpose()
    return this
  }
  rotate(angle: number, x: number, y: number, z: number) {
    const m: Matrix4 = new Matrix4()
    m.setRotate(angle, x, y, z)
    return this.multiply(m)
  }
  setTranslate(x: number, y: number, z: number) {
    this.setIdentity()
    const e: Float32Array = this.elements
    e[3] = x
    e[7] = y
    e[11] = z
    this.transpose()
    return this
  }
  translate(x: number, y: number, z: number) {
    const m: Matrix4 = new Matrix4()
    m.setTranslate(x, y, z)
    return this.multiply(m)
  }
  setScale(x: number, y: number, z: number) {
    this.setIdentity()
    const e: Float32Array = this.elements
    e[0] *= x
    e[5] *= y
    e[10] *= z
    this.transpose()
    return this
  }
  scale(x: number, y: number, z: number) {
    const m: Matrix4 = new Matrix4()
    m.setScale(x, y, z)
    return this.multiply(m)
  }
  setLookAt(
    eyeX: number,
    eyeY: number,
    eyeZ: number,
    atX: number,
    atY: number,
    atZ: number,
    upX: number,
    upY: number,
    upZ: number
  ): Matrix4 {
    //http://www.360doc.com/content/14/1028/10/19175681_420515511.shtml
    // 该函数将物体从世界坐标系转化到相机坐标系 uvn相机系统
    // 相机位置，或者叫做视点(eyepoint):
    // 观察参考点 (View Reference Point)
    // 相机镜头方向，通过观察平面的法向量指定:
    // 观察平面法向量VPN (View Plane Normal)  forward  +z
    // 相机顶部正朝向:VUV (View Up Vector) 理解为相机侧面 size x
    const forward = new Vec3([atX - eyeX, atY - eyeY, atZ - eyeZ]).normalize()
    const side = forward.crossMultiply(new Vec3([upX, upY, upZ])).normalize()
    const up = side.crossMultiply(forward)

    // 将一个坐标系的基可以看做另一个坐标系的一个向量的分解 u = Mv
    // 相机坐标是在世界坐标里算出来的
    const e = this.elements
    e[0] = side.x
    e[1] = up.x
    e[2] = -forward.x
    e[3] = 0
    e[4] = side.y
    e[5] = up.y
    e[6] = -forward.y
    e[7] = 0
    e[8] = side.z
    e[9] = up.z
    e[10] = -forward.z
    e[11] = 0
    e[12] = 0
    e[13] = 0
    e[14] = 0
    e[15] = 1
    return this.translate(-eyeX, -eyeY, -eyeZ)
  }
  setOrtho(
      left: number, 
      right: number, 
      top: number, 
      bottom: number, 
      near: number, 
      far: number): Matrix4 {
          // 正交矩阵，做归一化就完了
          // 假设矩阵的点(ex,ey,ez)
          // 规范化的设备坐标(nx,ny,nz)
          const e = this.elements;
          const rw = 1 / (right - left);
          const rh = 1 / (top - bottom);
          const rd = 1/ (far - near);
          e[0] = 2 * rw; e[1] = 0;  e[2] = 0; e[3] = 0;
          e[4] = 0; e[5] = 2 * rh;  e[6] = 0;  e[7] = 0;
          e[8] = 0; e[9] = 0; e[10] = -2 * rd; e[11] = 0;
          e[12] = -(right + left) * rw;
          e[13] = -(top + bottom) * rh;
          e[14] = -(far + near) * rd;
          e[15] = 1;
  
    return this
  }
  public setFrustum (left: number, 
    right: number, 
    top: number, 
    bottom: number, 
    near: number, 
    far: number)
    {
        let e, rw, rh, rd;

        if (left === right || top === bottom || near === far)
        {
            throw "null frustum";
        }
        if (near <= 0)
        {
            throw "near <= 0";
        }
        if (far <= 0)
        {
            throw "far <= 0";
        }

        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);

        e = this.elements;

        e[0] = 2 * near * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;

        e[4] = 0;
        e[5] = 2 * near * rh;
        e[6] = 0;
        e[7] = 0;

        e[8] = (right + left) * rw;
        e[9] = (top + bottom) * rh;
        e[10] = -(far + near) * rd;
        e[11] = -1;

        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;

        return this;
    }


    public setPerspective (fovy: number, aspect:number, near:number, far:number)
    {
        let e, rd, s, ct;

        if (near === far || aspect === 0)
        {
            throw "null frustum";
        }
        if (near <= 0)
        {
            throw "near <= 0";
        }
        if (far <= 0)
        {
            throw "far <= 0";
        }

        fovy = Math.PI * fovy / 180 / 2;
        s = Math.sin(fovy);
        if (s === 0)
        {
            throw "null frustum";
        }

        rd = 1 / (far - near);
        ct = Math.cos(fovy) / s;

        e = this.elements;

        e[0] = ct / aspect;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;

        e[4] = 0;
        e[5] = ct;
        e[6] = 0;
        e[7] = 0;

        e[8] = 0;
        e[9] = 0;
        e[10] = -(far + near) * rd;
        e[11] = -1;

        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;

        return this;
    }
}

export default Matrix4
