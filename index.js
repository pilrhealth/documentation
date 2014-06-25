// pilrdocs build file

var MetalSmith = require('metalsmith'),
    markdown   = requrie('metalsmith-markdown');

Metalsmith(__dirname)
    .use(markdown())
    .destination('./build')
    .build();



