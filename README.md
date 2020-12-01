# Nodejs REST-API with MongoDB

## Description

This project is consists of a single endpoint that fetches the 'Record' data from provided MongoDB collection and returns the manipulated data as response using Express.

## Getting started

Live Amazon AWS endpoint: http://ec2-18-216-227-80.us-east-2.compute.amazonaws.com:3000/

Root path is the only implemented route for the application. It is a POST method expecting four parameters which are:
startDate, endDate, minCount and maxCount.

It requires all of these four parameters to respond successfully. Otherwise, It generates 422 http error code. Request format should be JSON and response is also provided as JSON format.

To connect and manage queries "mongoose" library was used.

"Jest" test library used to test this endpoint

### Sample Request and Response:

#### 1st:
##### Request:
{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}

##### Response:
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "_id": "5ee21587e07f053f990ceb74",
            "key": "kOCLyeUi",
            "createdAt": "2016-12-27T12:31:59.635Z",
            "totalCount": 2088
        },
        .
        .
    ]
}

#### 2nd:
##### Request:
Missing endDate
{
    "startDate": "2016-01-26",
    "minCount": 2700,
    "maxCount": 3000
}
or
Invalid maxCount data type
{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": "random string"
}

##### Response:
{
    "code": 422,
    "msg": "Invalid or missing Parameter",
    "records": []
}