---
title: Data Processing Unit
template: page.hbt
---


Tutorial: Creating your own PiLR R Data Processing Unit
============

This tutorial will guide you through writing a custom R Data
Processing Unit (DPU) for your PiLR study. We have created a simple
template package for you to get started. This tutorial covers all the
steps, from getting a copy of the template to seeing your code live on
PiLR.

An R DPU in 7 Steps
----------------------

Custom R functions can be created and hosted in a Github
repository. When you update your code, your PiLR DPU can automatically
update, too. The following steps rely often on *git*, a popular
distributed version control system. If you're new to git, don't worry,
we'll just be using a few basic features. Try reading the first 2
chapters of Pro Git (http://git-scm.com/book/en/v2), a free online
resource.

1. Fork the pilrdpu-template repo
(https://github.com/pilrhealth/pilrdpu-template.git) into your Github
account. If you don't have a GitHub account, you can create one
now. It's free!

2. Rename the forked repository. Choose a name without any dashes or
underscores. The repo contains a dash character by default, so this
step is necessary. Why can't we use dashes or underscores? It is
because we are creating an R package that we can run from Github.
Those special characters are not allowed in R package names.  For the
purposes of this tutorial, let's rename the repository *dputest*. Now
you'll have a copy of the repo in your Github account.

3. Clone the forked repo to your local machine. 

4. Each DPU is simply an R function. R functions live in R packages,
   and R packages need a name!  We can name an R package by editing the
   DESCRIPTION file. Recall we have to name our package the *same thing*
   as the repo name, in this case, *dputest*.
   
6. Make sure the R Processing Tool is enabled for your project in the
   Marketplace. You should make sure the instrument and filetype defined
   in json/sample-instrument-definition.json and
   json/sample-filetype-definition.json are imported into the PiLR
   system. This may require an administrator.

7. Import the sample-dpu-definition.json file into PiLR through the
   configuration page.

8. Run the job from the Processing in R tool. A dataset with 10
   records and a sample report should be returned and saved for the
   participant.
   
DPU Function Argument List
-------------

All DPU functions must include these three arguments:

`data` a list of data.frame objects

`params` a list of settings 

Return Values
------------

R DPU functions can return both datasets and files. These files might
be PDF reports, for example. See the implementation of test_job for
the format to return these in.

Webhooks
--------

In order to run your latest R code each time you push changes to
GitHub, you will need to setup a webhook. To do so, go to your package
on GitHub and click on Settings->Webhooks & Services on the
sidebar. PiLR uses the OpenCPU system to process jobs. To read more
about OpenCPU and webhooks, see the bottom of
[this page](https://www.opencpu.org/api.html).

Private Github Repos 
-------------

If you wish for your GitHub repo to be private, you will need to add
the Github user _pilrhealth_ as a collaborator. This will allow PiLR
access to your R package. 
