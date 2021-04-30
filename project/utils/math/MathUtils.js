const degreeToRad = (degree) => Math.PI*degree/180;
const random = (min, max) => Math.floor(Math.random() * (max || 1)) + (min || 0);

export {
    degreeToRad,
    random,
}
