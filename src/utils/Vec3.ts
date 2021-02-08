class Vec3 {
  public x: number
  public y: number
  public z: number

  constructor(arr: Array<number>) {
    ;[this.x, this.y, this.z] = arr
  }
  set(x: number, y: number, z: number): Vec3 {
    this.x = x
    this.y = y
    this.z = z
    return this
  }
  getSize(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }
  normalize(): Vec3 {
    const size = this.getSize()
    this.x = this.x / size
    this.y = this.y / size
    this.z = this.z / size
    return this
  }
  multiply(n: number): Vec3
  multiply(n: Vec3): number
  multiply(n: Vec3 | number): Vec3 | number {
    if (typeof n === 'number') {
      this.x *= n
      this.y *= n
      this.z *= n
    } else {
      return this.x * n.x + this.y * n.y + this.z * n.z
    }
    return this
  }

  add(v: Vec3): Vec3 {
    this.x += v.x
    this.y += v.y
    this.z += v.z
    return this
  }

  crossMultiply(b: Vec3): Vec3 {
    //[i,   j,   k]
    //[ax,  ay,  az]
    //[bx,  by,  bz]

    return new Vec3([this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x])
  }

  clone() {
    return new Vec3([this.x, this.y, this.z])
  }

  log() {
    console.log(`Vec3([${this.x}, ${this.y}, ${this.z}])`)
  }
}

export default Vec3;