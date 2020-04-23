function easeInOutQuad (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function easeLinear (t, b, c, d) {
    return c * t / d + b;
}

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

export {
  easeInOutQuad,
  easeLinear,
  degToRad
};