// pilrdocs build file

var MetalSmith = require('metalsmith');

Metalsmith(__dirname)
    .destination('./build')
    .build();



