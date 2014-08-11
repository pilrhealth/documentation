---
title: API
template: page.hbt
---

# PiLR API Documentation


The API for the PiLR Health platform allows developers to read and
nwrite participant information and data through an HTTP REST interface.
Typically, there are two reasons that an individual would access the API. 

1. A smartphone application or device that participants use to
   generate data can read participant-specific settings and
   configuration values from the API, and write participant data to
   the API.

2. A data processing or analysis tool can access datasets and settings
   and configuration values for multiple participants, and then pass
   the data into a function for analysis.
   
For these two types of use cases, we provide different levels of API
access.  We have split out the sections below to address each
individually. 

## API Versioning

The PiLR API is currently at version 1. API calls will contain the
version number as part of the request. Therefore, API calls contain
the string "v1".




## Security: Authentication and Authorization

All PiLR API calls are subject to an authentication process. To
succesfully access the API, each request the client sends should
provide an access token in the header of the HTTP request.  This
access token must be put in the `authorization` header variable,
immediately after the constant string 'bearer'. For example, if
$access_token is your access token, then the HTTP header should
contain the following field:


````
authorization: "bearer $access_token"
````

To reiterate, the literal word 'bearer' should appear in the field.

How do you get an access token? The client application is known to
PilR as an /API consumer/. Each API consumer is added through the PiLR
web service. When an API consumer is created, an /activation key/ is
set by the project team member creating the consumer. To obtain an
access code, the consumer makes an API call to the /token service/,
and provides the activation key. The token service responds with the
access code.

The token service can be called remotely by submitting a GET request
to the following resource.

### Obtain Access Token


Obtain an access token for a given API consumer, given an activation
key defined in PiLR.

````
GET /api/v1/token
````

- Parameters


Name           | Type   | Description                     | Required 
---------------|--------|---------------------------------|----------
activation_key | string | Activation key obtained in PiLR | true     




## Participant API

###  Overview

For participants who are using an application on a mobile device, the
application will communicate with the platform through the
"Participant API".  These requests are designed to limit the
participant to information about themselves and the instrument the
application is linked to.

IMPORTANT: To access this API, the client device must know the
instrument code.  Without that, it will not be able to access any
information after the activation step.


###  Participant API Documentation
Variable Definitions
- $activation_key :: set for each API consumer created
- $project :: project code
- $participant :: participant code
- $instrument :: instrument code

#### List participant information
Participant and project information

````
GET /api/v1/$project/participant/$participant
````

#### List Participant Periods
List of periods the instrument is scheduled for this participant, with
dates if applicable.

````
GET  /api/v1/$project/instrument/$instrument/
      participant/$participant/period
````

#### List Instrument Settings
List of instrument setting values for that period, including multiple epochs.

````
GET /api/v1/$project/instrument/$instrument 
    /participant/$participant /period/$period/setting
````

#### List Configuration Data
Config data specific to that instrument and period.

````
GET /api/v1/$project/instrument/$instrument/
     participant/$participant/period/$period/config
````

#### List Datasets
List of data sets and schemas linked to the instrument.

````
GET /api/v1/$project/instrument/$instrument 
    /participant/$participant/dataset
````

#### Read Participant Data
Read participant data from a dataset. See Instrument API Parameters.

````
GET /api/v1/$project/instrument/$instrument/
     participant/$participant/
     dataset/$dataset/$schema_version/data
````

#### Write Participant Data
Add new data for that dataset. Data must be in body.

````
POST /api/v1/$project/instrument/$instrument/
      participant/$participant/
      dataset/$dataset/$schema_version/data	
````

### Processing API
###  Overview

The API is for importing participant data to a project repository, or
fetching data with simple query criteria.  The fetching data
capabilities provides a minimal set of criteria parameters (outlined
below).  Complex queries are not for this API, and rather would be
conducted on a separate data export service.

Another way of stating it, is that the IO API is designed for
continuous, daily usage by processing components and analysis
tools. It it not the mechanism for large batch import and fetch type
scenarios, such as after project data analysis applications.

###  Processing API Documentation

#### List projects
List projects on the system

````
GET /api/v1/project
````

#### List datasets
List datasets for a project

````
GET /api/v1/$project/dataset
````

#### List participants
List participants for a project

````
GET /api/v1/$project/participant
````

#### List groups
List groups for a project

````
GET /api/v1/$project/group
````

#### List periods
List periods for a project

````
GET /api/v1/$project/period
````


#### Read Data
Read datasets for a project. See Analysis API Parameters.

````
GET	/api/v1/$project/$dataStream/$schema/data	
See Analysis API Parameters.
````


#### Write Data
Write new data to a project. See Analysis API Parameters. 

````
POST /api/v1/$project/$dataStream/$schema/data	
````

Body: The JSON
value of the data.




