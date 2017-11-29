/**
* Generates number of random geolocation points given a center and a radius.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @param {number} count Number of points to generate.
* @param {current} current Needs Definition in JSDoc.
* @return {array} Array of Objects with lat and lng attributes.
*/
export const generateRandomPoints = (center, radius, count, current) => {
  const points = [];

  for (let i = current; i < current + count; i++)
    points.push({
      id: `pin${i}`,
      location: generateRandomPoint(center, radius),
    });

  return points;
};

/**
* Generates number of random geolocation points given a center and a radius.
* Reference URL: http://goo.gl/KWcPE.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @return {Object} The generated random points as JS object with lat and lng attributes.
*/
export const generateRandomPoint = (center, radius) => {
  const x0 = center.longitude;
  const y0 = center.latitude;

  // Convert Radius from meters to degrees.
  const rd = radius / 111300;

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const xp = x / Math.cos(y0);

  // Resulting point.
  return {
    latitude: y + y0,
    longitude: xp + x0,
  };
};

// Usage Example.
// Generates 100 points that is in a 1km radius from the given lat and lng point.
// const randomGeoPoints = generateRandomPoints(
//   { lat: 24.23, lng: 23.12 },
//   1000,
//   100,
// );
