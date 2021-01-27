const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: 'https://typpo.github.io/spacekit/src',
});

// Create a background using Yale Bright Star Catalog data.
viz.createStars();

viz.createSphere('moon', {
  textureUrl: './moon.jpg',
  debug: {
    showAxes: true,
  },
});