---
title: Dashboards
template: page.hbt
---

PiLR Dashboard Template
============

Description
-----------
The pilr_dashboard_panel function in the pilrdash package is called by all dashboards in
order to generate their display. It extracts a specified dataset from the PiLR server, and 
applies the specified function to the dataset. Results can be returned to the dashboard in 
various formats, such as Vega (for ggvis), static images, or a generic HTML format. This template
follows the necessary format for a function to be passed to pilr_dashboard_panel.   

Creating Your Function
----------------------
Custom dashboard functions can be created in R and hosted as a package on GitHub. To begin, clone this
template repo on to your local machine. From there you may write your function in the file "dashtemplate-package.r"  
All custom functions must include these three arguments:  
`data` the dataframe read in from a PiLR project  
`params` a list of all above arguments sent to pilr_dashboard_panel  
`...` a generic that allows any other argument to be passed through  
You may wish to update documentation for your function. If so, you can use the roxygen2 package, 
as well as manually editing the DESCRIPTION file in the template.  

pilr_dashboard_panel arguments
------------------------------
Each of these arguments can be passed into the pilr_dashboard_panel function:  
`package_function` Function to be applied to the dataset  
`package_url` URL pointing to the package on GitHub  
`data` List of arguments for finding the dataset (data_set, schema, project, pilr_api_server)  
`return_type` Type to be returned from the function (r:vega, r:image, or r:html)  
`filter_params` List of parameters for choosing subsets of a dataset (participant, group, date)  
`dashboard_params` Dashboard parameters(?)  

Access Code
-----------
When testing your function locally, pilr_dashboard_panel needs to read in your PiLR API
consumer key from a secure file. Create a text file named "pilrsecret.txt" under the folder
"R" in your function's package. Paste your access code in this file, followed by a blank line. 
Our template provides a .gitignore file which causes "pilrsecret.txt" to not be committed to a repo.  

Return Types
------------
Currently only [Vega](http://trifacta.github.io/vega/) return types are supported. A common package for generating Vega visuals in R is [ggvis](http://ggvis.rstudio.com/).  

Webhooks
--------
In order to allow OpenCPU to update your package each time you push changes to GitHub, you will need to setup a
webhook. To do so, go to your package on GitHub and click on Settings->Webhooks & Services on the sidebar. To read 
more about OpenCPU and webhooks, see the bottom of [this page](https://www.opencpu.org/api.html).  

Importing Dashboard Definition
------------------------------
To import your custom dashboard function into PiLR, you will need to update the parameters in the provided "dash-definition.json" document.   

Private Repo?
-------------
If you wish for your GitHub repo to be private, you will need to add the Github user "pilrhealth" (without quotes)
as a collaborator. This will allow PiLR to see and use your package.
