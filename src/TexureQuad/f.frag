precision mediump float;

uniform sampler2D u_Samper;
varying vec2 v_TexCoord;
void main() {
    gl_FragColor = texture2D(u_Samper, v_TexCoord);
}
