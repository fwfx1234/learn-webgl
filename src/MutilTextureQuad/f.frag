precision mediump float;

uniform sampler2D u_Sampler1;
uniform sampler2D u_Sampler2;

varying vec2 v_TexCoord;
void main() {
    vec4 color1 = texture2D(u_Sampler1, v_TexCoord);
    vec4 color2 = texture2D(u_Sampler2, v_TexCoord);
    gl_FragColor =color1 * color2;
}
