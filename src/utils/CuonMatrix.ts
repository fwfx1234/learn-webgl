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
        const e:Float32Array = this.elements;
        e[0] = 1;   e[4] = 0;   e[8]  = 0;   e[12] = 0;
        e[1] = 0;   e[5] = 1;   e[9]  = 0;   e[13] = 0;
        e[2] = 0;   e[6] = 0;   e[10] = 1;   e[14] = 0;
        e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;
        return this;
    }
    set(src: Matrix4) {
        if (src.elements === this.elements) {
            return;
        }
        for (let i = 0; i < 16; ++i) {
            this.elements[i] = src.elements[i];
        }
        return this;
    }
    multiply (other: Matrix4) {
        let i, e, a, b, ai0, ai1, ai2, ai3;

        e = this.elements;
        a = this.elements;
        b = other.elements;

        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }

        for (i = 0; i < 4; i++) {
            ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
            e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
            e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
            e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
            e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }

        return this;
    }
   transpose() {
        let e:Float32Array;
        let t:number;

        e = this.elements;

        t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
        t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
        t = e[ 3];  e[ 3] = e[12];  e[12] = t;
        t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
        t = e[ 7];  e[ 7] = e[13];  e[13] = t;
        t = e[11];  e[11] = e[14];  e[14] = t;

        return this;
    }
    setRotate(angle: number, x: number, y: number, z: number) {
        this.setIdentity()
        const e: Float32Array = this.elements;
        let s = 1
        let c = 1
        angle = (x + y + z) / Math.abs(x + y + z) * angle
        s = Math.sin(angle)
        c = Math.cos(angle)
        if (x !== 0) {
            // 围绕x轴旋转 x
            e[0] = 1
            e[5] = c; e[6] = -s;
            e[9] = s; e[10] = c
        }
        if (y !== 0) {
            // 围绕y轴旋转
            e[0] = c; e[2] = -s;
            e[8] = s; e[10] = c
        }
        if (z !== 0) {
            // 围绕z轴旋转 z
            e[0] = c; e[1] = -s;
            e[4] = s; e[5] = c
        }
        this.transpose()
        return this
    }
    rotate(angle: number, x: number, y: number, z: number) {
        const m:Matrix4 = new Matrix4()
        m.setRotate(angle, x, y, z)
        return this.multiply(m)
    }
    setTranslate(x: number, y:number, z:number) {
        this.setIdentity()
        const e: Float32Array = this.elements;
        e[3] = x;
        e[7] = y;
        e[11] = z;
        this.transpose()
        return this;
    }
    translate(x: number, y:number, z:number)  {
        const m:Matrix4 = new Matrix4()
        m.setTranslate(x, y, z)
        return this.multiply(m)
    }
    setScale(x: number, y:number, z:number) {
        this.setIdentity()
        const e: Float32Array = this.elements;
        e[0] *= x;
        e[5] *= y;
        e[10] *= z;
        this.transpose()
        return this;
    }
    scale(x: number, y:number, z:number) {
        const m:Matrix4 = new Matrix4()
        m.setScale(x, y, z)
        return this.multiply(m)
    }
}

export default Matrix4;
