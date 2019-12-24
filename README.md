# Supercontainer

![Supercontainer](https://github.com/jzumbrun/Supercontainer-app/blob/master/public/assets/images/logo.svg?sanitize=1)

Supercontainer is a logic-less MySQL paralell request api, using plain SQL statements built by handlebar templates, validated by json schema.
Supercontainer's goal is to simplify Single Page Application server data retrieval and storage.

Supercontainer, inspired by GraphQL, can wrap up multiple resource requests and mutations into one api call. Thus reducing
the chattiness of SPAs. Similart to GraphQL, all requests are POSTS regardless of the query actions.

#### Examples

## Client request
Each query request requires a name, an optional id, sync and properties object (as defined by the query definition).

id: Required if querying for same query name multiple times, or if accessing previous query response history.
name: The name is used to find the defined query name.
properties: Data values supplied to the expression query string.
sync: Sync will force an async/await on the query. All synced queries will load first no matter the request order.

```
{
    "queries" : [{
        "name": "greetings.insert",
        "properties": {
            "description": "british",
            "words": "Ello govna"
        }
    },
    {
        "name": "greetings.select",
        "properties": {
            "select": ["id", "words"],
            "limit": 20
        }
    }]
}
```

## Server defined queries
Each query is given a name, an SQL expression, an access list, and an inbound schema.

Name: Name should reflect the resource and action. This is only a convention. But it must be unique.
expression: The expression is a simple SQL statement managed by handlebars. Handlebars will take care of sql injections.
    We have take the liberty to add all lodash functions to handlebars for convenience. That are defined as `_trim`, etc.
    Each property from the client request will be available to use in the query statement as well as a user object
    that is provided by Supercontainer via a signin gateway and JWT tokens.
    All successfull query responses within a client request will be available to subseqent queries in the $history object.
    An id is required on the query request inorder to access it in the $history object. Also the sync must be set to true, in
    order to ensure the previous query is run in proper order.
access: The access array is a whitelist for authorized access to each query.
inboundSchema: Inbound schema utilizes json schema and validates inbound data.
outboundSchema: Outbound schema utilizes json schema and validates data coming from the database response.
    If properties are not defined, they will be removed form the outbound response.
```
{
    "id": "greetings.insert",
    "name": "greetings.insert",
    sync: true,
    "expression": "INSERT INTO greetings (description, words, user_id) VALUES ('{{description}}', '{{words}}', {{$user.id}})",
    "access": ["user"],
    "inboundSchema": {
        "type": "object",
        "properties": {
            "description": {
                "type": "string",
                "default": ""
            },
            "words": {
                "type": "string",
                "default": ""
            }
        },
        "additionalProperties": false
    }
},
{
    "name": "greetings.select.byId",
    sync: true,
    "expression": "SELECT {{select}} FROM greetings WHERE user_id={{$user.id}} AND id={{$history.[greetings.insert].id}} LIMIT {{limit}}",
    "access": ["user"],
    "inboundSchema": {
        "type": "object",
        "properties": {
            "select": {
                "type": "array",
                "default": ["*"]
            },
            "limit": {
                "type": "number",
                "maximum": 200,
                "default": 200
            }
        },
        "additionalProperties": false
    },
    "outboundSchema": {
        "type": "array",
        "items": { 
            "type": "object",
            "properties": {
                "id": { "type": "number"},
                "description": { "type": "string"},
                "words": { "type": "string"}
            }
        }
    }
}

```

## Why?
I wanted to make the simplest version for accessing and saving server data. Now developers can simply create a SQL statement without the
need of creating access layers, controllers, and database models. But still have the control of user access, data validation and simple data controls.

## What about data aggregation and complex relationships?
More and more logic is being added to the client side of SPAs, leaving the developer to essentially maintain two applications, the client and server sides.
Simplifying the server logic helps alleviate the strain. Many SPAs are now requesting simpler data from the server and managing the aggregations and complex relationships on the client side. Supercontainer is here to support that.

## Intallation
make start
Note: It is encouraged to use watchan to watch file changes on the host side, thus reducing CPU usage within docker.
To install watchman visit https://facebook.github.io/watchman/docs/install.html

## Tests
make test/all
This runs both the funtional and unit tests.
