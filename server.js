const express = require('express');

const app = express();

app.use(express.static('./'));

//app.listen(8000);

app.listen(8000, function() {
  console.log('Server up and running on port 8000')
})