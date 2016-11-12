# Rest API Boilerplate

## Setup

Make sure you have MongoDB on your machine.
For ubuntu use: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
Or update config js with any online mongodb db.

Clone the project. Go into your project directory. Run:

`npm install`

And run the server:

`node server`

### Current endpoints

#### Insert a new user:
**POST /rest/api/v1/users**
```javascript
{
  "facebookId": "somefacebookId",
  "clubs": [
  	{
      "name": "cucko",
      "eventId": "asd123"
    }
  ]
}
```

#### Update an user: (refer to facebookId)
**POST /rest/api/v1/users**
```javascript
{
  "facebookId": "somefacebookId",
  "clubs": [
  	{
      "name": "cucko",
      "eventId": "asd123"
    }
  ]
}
```

#### Delete an user:
**DELETE /rest/api/v1/users/{facebookId}**


#### Get user by id:
**GET /rest/api/v1/users/{facebookId}**


#### Get all users:
**GET /rest/api/v1/users**


#### Get token:
**GET /rest/api/v1/getToken/{facebookId}**
