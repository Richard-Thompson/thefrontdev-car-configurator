uniform float step;
uniform int blurHSamples;
uniform int blurVSamples;
uniform sampler2D tDiffuse;
uniform vec2 iResolution;
varying vec2 vUv;

void main() {
  float Pi = 6.28318530718; // Pi*2

  // GAUSSIAN BLUR SETTINGS {{{
  float Directions =
      20.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
  float Quality =
      16.0;         // BLUR QUALITY (Default 4.0 - More is better but slower)
  float Size = 4.0; // BLUR SIZE (Radius)
  // GAUSSIAN BLUR SETTINGS }}}

  vec2 Radius = Size / iResolution.xy;

  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  // Pixel colour
  vec4 Color = texture(tDiffuse, uv);

  // Blur calculations
  for (float d = 0.0; d < Pi; d += Pi / Directions) {
    for (float i = 1.0 / Quality; i <= 1.0; i += 1.0 / Quality) {
      Color += texture(tDiffuse, vUv + vec2(cos(d), sin(d)) * Radius * i);
    }
  }

  // Output to screen
  Color /= Quality * Directions - 15.0;
  gl_FragColor = Color;
}