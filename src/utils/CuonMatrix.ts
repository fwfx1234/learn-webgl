class Matrix4 {
    private elements: Float32Array

    constructor(arr?: Array<number>) {
        if (arr) {
            for (let i = 0; i < 16; i++) {
                this.elements[i] = arr[i]
            }
        } else {
            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
    }
    setIdentity() {
        const e = this.elements;
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
    Matrix4.prototype.transpose = function() {
        var e, t;

        e = this.elements;

        t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
        t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
        t = e[ 3];  e[ 3] = e[12];  e[12] = t;
        t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
        t = e[ 7];  e[ 7] = e[13];  e[13] = t;
        t = e[11];  e[11] = e[14];  e[14] = t;

        return this;
    }

}
