uniform sampler2D tDiffuse;
uniform float time;
uniform vec2 resolution;
varying vec2 vUv;
uniform vec3 leftLight;
uniform vec3 rightLight;

uniform mat4 cameraWorldMatrix;
uniform mat4 cameraProjectionMatrixInverse;

uniform sampler2D depthTexture;
uniform mat4 projectionMatrixInverse;
uniform mat4 viewMatrixInverse;

uniform vec3 cam;

vec3 worldCoordinatesFromDepth(float depth) {
  float z = depth * 2.0 - 1.0;

  vec4 clipSpaceCoordinate = vec4(vUv * 2.0 - 1.0, z, 1.0);
  vec4 viewSpaceCoordinate = projectionMatrixInverse * clipSpaceCoordinate;

  viewSpaceCoordinate /= viewSpaceCoordinate.w;

  vec4 worldSpaceCoordinates = viewMatrixInverse * viewSpaceCoordinate;

  return worldSpaceCoordinates.xyz;
}

vec3 raymarch(in vec3 ro, in vec3 rd) {
  vec3 bgTexture = texture2D(tDiffuse, vUv).xyz;
  vec3 col = vec3(bgTexture);
  float density = 0.025;
  float stepsize = 0.04;

  vec3 total = ro;

  float depth = texture2D(depthTexture, vUv).x;

  vec3 worldPositionofVoxel = worldCoordinatesFromDepth(depth);

  for (int i = 0; i < 600; i++) {
    vec3 voxelcolor = vec3(0);
    total += rd * stepsize;

    if (dot(vec3(0, 0.1, -1), normalize((leftLight - total))) > 0.98) {
      voxelcolor = density * vec3(1.0 / (length(total)));
    }
    if ((length((leftLight - total)) < 0.2) &&
        (dot(vec3(0, 0.1, -1), normalize((leftLight - total))) > 0.98)) {
      voxelcolor = vec3(bgTexture);
      col += voxelcolor;
      break;
    }

    if (dot(vec3(0, 0.1, -1), normalize((rightLight - total))) > 0.98) {
      voxelcolor = density * vec3(1.0 / (length(total)));
    }
    if ((length((rightLight - total)) < 0.2) &&
        (dot(vec3(0, 0.1, -1), normalize((rightLight - total))) > 0.98)) {
      voxelcolor = vec3(bgTexture);
      col += voxelcolor;
      break;
    }

    col += voxelcolor;
  }
  vec3 normalizedTotal = total;
  vec3 normalisedCam = normalize(cam);
  vec3 normalWorldCoords = normalize(worldPositionofVoxel);
  vec3 normalLeftLight = normalize(leftLight);
  vec3 normalRightLight = normalize(rightLight);

  if (texture2D(depthTexture, vUv).x < 1.0 &&
          distance(normalWorldCoords + vec3(0.2), normalisedCam) <
              distance(normalisedCam, normalLeftLight) &&
          distance(normalWorldCoords + vec3(0.2), normalisedCam) <
              distance(normalisedCam, normalRightLight) ||
      (total.y > 7.0 && total.y < -7.0)) {
    return bgTexture;
  } else {
    return mix(bgTexture, col, 1.0);
  }
}

void main() {
  vec3 tot = vec3(0.0);

  // camera
  float an = 0.5 * time - 5.0 / resolution.x;
  //   vec4 ro = vec4(cam, 1.0);
  //   vec3 rd = vec3(gl_FragCoord.xy / resolution.xy, 1.0);
  vec4 bgTexture = texture2D(tDiffuse, vUv);
  vec3 ta = vec3(0.0);

  //   // camera matrix
  //   vec3 ww = normalize(ta - ro.xyz);
  //   vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
  //   vec3 vv = normalize(cross(uu, ww));

  //   for (int m = 0; m < AA; m++)
  //     for (int n = 0; n < AA; n++) {

  //       vec3 p = vec3((-resolution.xy +
  //                      2.0 * (gl_FragCoord.xy - 0.5 +
  //                             (vec2(float(m), float(n)) + 0.5) / float(AA)))
  //                             /
  //                         resolution.y,
  //                     2.0);

  //       // create view ray

  //       // render scene
  vec2 p = gl_FragCoord.xy / resolution.xy;
  vec2 screenPos = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.xy;
  vec3 ray = (cameraWorldMatrix * cameraProjectionMatrixInverse *
              vec4(screenPos.xy, 1.0, 1.0))
                 .xyz;
  ray = normalize(ray);
  // camera position
  vec3 cPos = cam;
  // Ray Marching Variables
  vec3 ro = cPos; // ray's origin

  vec3 rd = ray;
  vec3 col = raymarch(ro.xyz, rd);

  // vignette
  // col -= 0.2*length(p.xy);

  tot += col;

  //   if (texture2D(tDiffuse, vUv).a < 1.0) {
  //     gl_FragColor = vec4(bgTexture, 1.0);
  //   } else {

  float depth = texture2D(depthTexture, vUv).x;

  vec3 worldPositionofVoxel = worldCoordinatesFromDepth(depth);

  gl_FragColor = vec4(tot, bgTexture.a);
  //   }
  // }
  //   tot /= float(AA * AA);
}