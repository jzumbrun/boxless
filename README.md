# Supercontainer

![Supercontainer](https://github.com/jzumbrun/Supercontainer-app/blob/master/public/assets/images/logo.svg?sanitize=1)

Supercontainer is a logic-less MySQL paralell request api, using plain SQL statements built by handlebar templates, validated by json schema.
Supercontainer's goal is to simplify Single Page Application server data retrieval and storage.

Supercontainer, inspired by GraphQL, can wrap up multiple resource requests and mutations into one api call. Thus reducing
the chattiness of SPAs. Similart to GraphQL, all requests are POSTS regardless of the query actions.

#### Examples

## Client request
Each query request requires a name, and an optional properties object (as defined by the query definition).

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
Expression: The expression is a simple SQL statement managed by handlebars. Handlebars will take care of sql injections.
    We have take the liberty to add all lodash functions to handlebars for convenience. That are defined as `_trim`, etc.
    Each property from the clien request will be available to use in the query statement as well as a user object
    that is provided by Supercontainer via a signin gateway and JWT tokens.
Access: The access array is a whitelist for authorized access to each query.
Inbound Schema: Inbound schema utilizes json schema and validates inbound data.
Outbound Schema: Outbound schema utilizes json schema and validates data coming from the database response.
    If properties are not defined, they will be removed form the outbound response.
```
{
    "name": "greetings.insert",
    "expression": "INSERT INTO greetings (description, words, user_id) VALUES ('{{description}}', '{{words}}', {{user.id}})",
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
    "name": "greetings.select",
    "expression": "SELECT {{select}} FROM greetings WHERE user_id={{user.id}} LIMIT {{limit}}",
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
