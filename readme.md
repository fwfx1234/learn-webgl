
### 着色器
    
#### 顶点着色器

```
    attribute vec4 a_Position; // 定义变量，可以在js中使用
    attribute float a_Size; 
    void main() {
        gl_Position = a_Position; // 顶点的位置
        gl_PositionSize = a_Size; // 顶点尺寸
    }
```
顶点着色器用于描述顶点位置和尺寸相关信息, js里使用该变量的api如下
>  const a_Position = gl.getAttribLocation(program, 'a_Position')
> gl.vertexAttrib3f(a_Position, controller.x, controller.y, controller.z)

#### 片源着色器
```c
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
```
片源着色器用来描述颜色的

在webgl环境下着色器的使用

```ts
    // 创建着色器
    const v_shader:WebGLShader  = gl.createShader(gl.VERTEX_SHADER);
    const f_shader:WebGLShader = gl.createShader(gl.FRAGMENT_SHADER)
    // 添加着色器源码
    gl.shaderSource(v_shader, vShaderSource)
    gl.shaderSource(f_shader, fShaderSource)
    // 编译着色器源码
    gl.compileShader(v_shader)
    gl.compileShader(f_shader)
    if (!gl.getShaderParameter(v_shader, gl.COMPILE_STATUS)) {
        console.warn('linkProgram error', 'v_shader')
    }
    if (!gl.getShaderParameter(f_shader, gl.COMPILE_STATUS)) {
        console.warn('linkProgram error', 'f_shader')
    }
    // 创建程序 和链接着色器
    const program:WebGLProgram = gl.createProgram();
    gl.attachShader(program, v_shader);
    gl.attachShader(program, f_shader);
    // 链接程序
    gl.linkProgram(program);
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
    // 使用程序
    gl.useProgram(program)
    if (!linked) {
        console.warn('linkProgram', linked)
    }
    return program
```
最后使用`gl.drawArrays(gl.TRIANGLES, 0, n)`将点画出来就行
，画多个点的时候可以使用缓冲区
```ts
    // 创建一个缓冲区
    const verticesBuffer: WebGLBuffer = gl.createBuffer()
    if (!verticesBuffer) {
        console.error(verticesBuffer, vertices)
        return -1
    }
    //链接缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer)
    // 填充缓冲区的数据    
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    // 将缓冲区和顶点着色器的变量关联
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    // 启用缓冲区
    gl.enableVertexAttribArray(a_Position)
```
启用之后就可以使用缓冲区里的顶点绘制了
