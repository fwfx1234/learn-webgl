class Vec2 {
  public x: number
  public y: number
  constructor(arr: Array<number>) {
    ;[this.x, this.y] = arr
  }
  set(x: number, y: number): Vec2 {
    this.x = x
    this.y = y
    return this;
  }
  getSize(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  normalize(): Vec2 {
    const size = this.getSize()
    this.x = this.x / size
    this.y = this.y / size
    return this
  }
  multiply(n: number): Vec2
  multiply(n: Vec2): number
  multiply(n: Vec2 | number): Vec2| number {
    if (typeof n === 'number') {
      this.x *= n
      this.y *= n
    } else {
     return  this.x * n.x + this.y * n.y
    }
    return this
  }

  add(v: Vec2): Vec2 {
    this.x += v.x
    this.y += v.y
    return this
  }

  getDistanceFrom(b: Vec2): number {
    return b.add(this.multiply(-1)).getSize()
  }

  getAngle(b: Vec2): number {
    return Math.acos(this.multiply(b) / (this.getSize() + b.getSize()))
  }

  crossMultiply(b: Vec2):Vec2 {

    return this;
  }

  clone() {
    return new Vec2([this.x, this.y])
  }
  horizontalProjectTo(n: Vec2): Vec2 {
    n = n.clone().normalize()
    return n.multiply(this.multiply(n))
  }
  verticalProjectTo(n: Vec2): Vec2 {
    n.normalize()
    return this.add(this.horizontalProjectTo(n).multiply(-1))
  }
  log() {
    console.log(`Vec2([${this.x}, ${this.y}])`)
  }

}
let v = new Vec2([3, 3])
let n = new Vec2([1, 0])

v.horizontalProjectTo(n).log()
v.verticalProjectTo(n).log()

