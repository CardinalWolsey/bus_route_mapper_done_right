<!-- TODO: update file -->

[![Build Status](https://travis-ci.org/CardinalWolsey/bus_route_mapper_done_right.svg)](https://travis-ci.org/CardinalWolsey/bus_route_mapper_done_right)
#TODO  

- enable map themes  
- display an error message if a route does not exist  
- menu button that takes user to other pages   
- build favorites page  
- build "add favorites button"  
- build about page  
- make login work and connect user accounts with favorites  
- update package.json file
- review and update LICENSE file
- update travis.yml
- update slugignore
- make sure all files in /app folder are updated
- move off nav and sidebar styling into own css files
- do better unit tests ... look at 401 work for that


# King County Bus Route API

**Spencer Caldwell**  
**Matthew Ringel**  
**Michael Tse**  

**Code Fellows**
**sea-d45-javascript**

This is a project for the JavaScript Full-Stack Development Accelerator at Code Fellows.

The API takes a GET request for a route number in the King County Metro Transit System's transportation network and returns a geojson object for displaying that route on a map.

The API also takes a GET request for a location in lng/lat and a radius for the search and returns a geojson array of all the bus routes that come within the given radius of the given location.

A simple front-end to demonstrate the API can be found at http://bus-route-mapper.herokuapp.com

## Examples
### GET a Bus Route
#### Example Request
Make a GET request to

```
http://bus-route-mapper.herokuapp.com/api/busroutes/[bus_route_number]
```

The response will be an array of geojson objects of all the bus routes under King County Metro with that route number.  This will return more than one geojson object in the array, as multiple service types are listed under one route number.  For example, for route 7 there are 7AS, 7AT, 7AZ, and 7AN service types.  The API will return all of these separate routes in the array.

#### Example Response
(The geometry property has been suppressed for brevity and clarity)

```
[
{
	"_id" : ObjectId("564ab46df5fd9c36c9ba47cf"),
	"type" : "Feature",
	"properties" : {
		"ROUTE" : "7AT",
		"RTE_NUM" : "7",
		"RTE_PART" : null,
		"SVC_TYPE" : "AT",
		"Shape_len" : 60722.283762
	}
},
{
	"_id" : ObjectId("564ab46df5fd9c36c9ba480a"),
	"type" : "Feature",
	"properties" : {
		"ROUTE" : "7AS",
		"RTE_NUM" : "7",
		"RTE_PART" : null,
		"SVC_TYPE" : "AS",
		"Shape_len" : 37938.116758
	}
},
{
	"_id" : ObjectId("564ab46df5fd9c36c9ba481e"),
	"type" : "Feature",
	"properties" : {
		"ROUTE" : "7AZ",
		"RTE_NUM" : "7",
		"RTE_PART" : null,
		"SVC_TYPE" : "AZ",
		"Shape_len" : 48548.282187
	}
},
{
	"_id" : ObjectId("564ab46df5fd9c36c9ba483e"),
	"type" : "Feature",
	"properties" : {
		"ROUTE" : "7AN",
		"RTE_NUM" : "7",
		"RTE_PART" : null,
		"SVC_TYPE" : "AN",
		"Shape_len" : 54778.274339
	}
},
{
	"_id" : ObjectId("564ab46df5fd9c36c9ba48bb"),
	"type" : "Feature",
	"properties" : {
		"ROUTE" : "7",
		"RTE_NUM" : "7",
		"RTE_PART" : null,
		"SVC_TYPE" : null,
		"Shape_len" : 55838.299449
	}
}
]
```
### GET Nearby Bus Routes

#### Example Request
Make a GET request to
```
http://bus-route-mapper.herokuapp.com/api/nearbusroutes/?lng=-122.31&lat=47.6244&radius=200
```

This will return an array of geojson bus route objects that cross within the given radius (in meters) of the given location.  The sample query above will return all bus routes that pass within 200 meters of 47.6244° N, 122.31° W.

#### Example Response
(The geometry property has been suppressed for brevity and clarity)

```
[
{
	"_id" : ObjectId("564ab46df5fd9c36c9ba47d0"),
	"type" : "Feature",
	"properties" : {
		"ROUTE" : "10AS",
		"RTE_NUM" : "10",
		"RTE_PART" : null,
		"SVC_TYPE" : "AS",
		"Shape_len" : 6517.776375
	}
},
{
	"_id" : ObjectId("564ab46df5fd9c36c9ba47e5"),
	"type" : "Feature",
	"properties" : {
		"ROUTE" : "10AZ",
		"RTE_NUM" : "10",
		"RTE_PART" : null,
		"SVC_TYPE" : "AZ",
		"Shape_len" : 11470.560974
	}
},
{
	"_id" : ObjectId("564ab46df5fd9c36c9ba48dc"),
	"type" : "Feature",
	"properties" : {
		"ROUTE" : "10",
		"RTE_NUM" : "10",
		"RTE_PART" : null,
		"SVC_TYPE" : null,
		"Shape_len" : 25949.52311
	}
}
]
```


* Data from [King County Metro](http://www5.kingcounty.gov/gisdataportal/)

* Stored via mongoDB

* This project is under construction
