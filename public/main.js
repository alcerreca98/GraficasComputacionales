// Create the visualization and put it in our div.
const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: 'https://typpo.github.io/spacekit/src'
});

viz.createStars();

viz.createSphere('moon', {
  textureUrl: './moon.jpg',
  debug: {
    showAxes: false,
  },
});
