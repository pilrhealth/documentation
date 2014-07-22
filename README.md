PiLR Health Documentation
=========================

This repository contains the source files for generating the PiLR
Health documentation. The live version can be found at
http://pilrhealth.github.io/documentation.

## Contribute

Fork the repository, clone it, make your modifications, and submit a
pull request.

## Local build environment

If you'd like to build a local copy of the documentation, or see how
your changes will look on the live site, you can use the gulp build
system.

## Prerequisites

If you'd like to build the docs locally, you should have the following
programs installed and available in your PATH: git, node, and
npm. Instructions on how to install these programs vary by OS. 

## gulp

Gulp (http://gulpjs.com/) is a streaming build system built on the
node.js platform. If you have node and npm installed already, just
follow these simple instructions to build a local copy of the PiLR
Health documentation.

### One-time setup

````
$ git clone git@github.com:pilrhealth/documentation.git
$ cd documentation
$ npm install -g gulp
$ npm install -g bower
$ npm install
$ bower install
````

After the one-time setup, you have a few options to build the docs.

### gulp tasks

To build the docs, you can run one of several gulp tasks.

Simply build the docs locally. 

````
$ gulp
````

Build the docs, launch a local web server, and watch source files for
changes, at which point your browser will automatically refresh
(requires livereload browser extension) 

```` 
$ gulp server 
````

Build the docs, commit them to the gh-pages branch in the
documentation repository, and push to Github where they will be
automatically published.

````
$ gulp deploy
````

Delete the build directory completely. This is safe as it can always
be rebuilt using one of the gulp commands above.

````
$ gulp clean
````


